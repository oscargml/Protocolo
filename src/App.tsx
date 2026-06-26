import React from "react";
import Sidebar from "./components/Sidebar";
import LessonView from "./components/LessonView";
import QuizView from "./components/QuizView";
import SimulatorView from "./components/SimulatorView";
import ProgressDashboard from "./components/ProgressDashboard";
import { UserProgress } from "./types";
import { GraduationCap, Award, Compass, BookOpen, HelpCircle } from "lucide-react";

export default function App() {
  const [currentTab, setTab] = React.useState("lessons");
  const [userName, setUserName] = React.useState(() => {
    return localStorage.getItem("protocolo_user_name") || "Especialista";
  });

  // Track initial quick-link actions for direct page redirections
  const [activeQuizId, setActiveQuizId] = React.useState<string | undefined>(undefined);
  const [activeScenarioId, setActiveScenarioId] = React.useState<string | undefined>(undefined);

  // Initialize progress state from localStorage
  const [progress, setProgress] = React.useState<UserProgress>(() => {
    const saved = localStorage.getItem("protocolo_user_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all properties exist
        return {
          readLessons: parsed.readLessons || [],
          completedQuizzes: parsed.completedQuizzes || {},
          completedSimulations: parsed.completedSimulations || [],
          streak: parsed.streak || 1,
          lastActive: parsed.lastActive || new Date().toISOString().split("T")[0]
        };
      } catch (e) {
        console.error("Error parsing progress", e);
      }
    }
    return {
      readLessons: [],
      completedQuizzes: {},
      completedSimulations: [],
      streak: 1,
      lastActive: new Date().toISOString().split("T")[0]
    };
  });

  // Save progress changes to localStorage
  React.useEffect(() => {
    localStorage.setItem("protocolo_user_progress", JSON.stringify(progress));
  }, [progress]);

  // Save userName changes to localStorage
  React.useEffect(() => {
    localStorage.setItem("protocolo_user_name", userName);
  }, [userName]);

  // Handle daily streak updating on startup
  React.useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    const lastActiveStr = progress.lastActive;

    if (lastActiveStr !== todayStr) {
      const today = new Date(todayStr);
      const lastActive = new Date(lastActiveStr);
      const diffTime = Math.abs(today.getTime() - lastActive.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let newStreak = progress.streak;
      if (diffDays === 1) {
        // Active on consecutive days
        newStreak += 1;
      } else if (diffDays > 1) {
        // Streak broken
        newStreak = 1;
      }

      setProgress((prev) => ({
        ...prev,
        streak: newStreak,
        lastActive: todayStr
      }));
    }
  }, []);

  // Set lessons read state
  const markLessonRead = (id: string) => {
    if (progress.readLessons.includes(id)) return;
    setProgress((prev) => ({
      ...prev,
      readLessons: [...prev.readLessons, id]
    }));
  };

  // Set quiz result scores
  const saveQuizScore = (quizId: string, score: number, total: number) => {
    const todayStr = new Date().toISOString().split("T")[0];
    setProgress((prev) => {
      const currentScores = { ...prev.completedQuizzes };
      const previousBest = currentScores[quizId]?.score || 0;
      
      // Update score only if it's better or wasn't taken yet
      if (!currentScores[quizId] || score > previousBest) {
        currentScores[quizId] = {
          score,
          total,
          date: todayStr
        };
      }

      return {
        ...prev,
        completedQuizzes: currentScores
      };
    });
  };

  // Set simulation completed
  const saveSimulationSuccess = (scenarioId: string) => {
    if (progress.completedSimulations.includes(scenarioId)) return;
    setProgress((prev) => ({
      ...prev,
      completedSimulations: [...prev.completedSimulations, scenarioId]
    }));
  };

  const resetProgress = () => {
    const initialProgress = {
      readLessons: [],
      completedQuizzes: {},
      completedSimulations: [],
      streak: 1,
      lastActive: new Date().toISOString().split("T")[0]
    };
    setProgress(initialProgress);
    localStorage.removeItem("protocolo_user_progress");
  };

  // Helper callbacks to jump between modules
  const startQuizByCategory = (category: string) => {
    let targetQuizId = "q_fundamentos";
    if (category === "Eventos y Conmemoraciones") {
      targetQuizId = "q_visitas";
    } else if (category === "Normativa Internacional") {
      targetQuizId = "q_precedencia";
    }
    setActiveQuizId(targetQuizId);
    setTab("quizzes");
  };

  const startSimulationByType = (type: string) => {
    let targetId = "sc_vehiculo";
    if (type === "estrado") {
      targetId = "sc_estrado";
    } else if (type === "mesa_trabajo") {
      targetId = "sc_mesa_trabajo";
    } else if (type === "mesa_social") {
      targetId = "sc_mesa_social";
    }
    setActiveScenarioId(targetId);
    setTab("simulators");
  };

  return (
    <div className="min-h-screen bg-diplomatic-cream flex flex-col lg:flex-row relative">
      {/* Sidebar navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setTab={(tab) => {
          setTab(tab);
          // Clear active jump queries
          setActiveQuizId(undefined);
          setActiveScenarioId(undefined);
        }}
        progress={progress}
        userName={userName}
        setUserName={setUserName}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 pt-20 lg:pt-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {currentTab === "lessons" && (
          <div className="animate-fadeIn">
            <LessonView 
              progress={progress} 
              markLessonRead={markLessonRead} 
              startQuizByCategory={startQuizByCategory}
              startSimulationByType={startSimulationByType}
            />
          </div>
        )}

        {currentTab === "simulators" && (
          <div className="animate-fadeIn">
            <SimulatorView 
              progress={progress} 
              saveSimulationSuccess={saveSimulationSuccess} 
              setTab={setTab}
              initialScenarioId={activeScenarioId}
            />
          </div>
        )}

        {currentTab === "quizzes" && (
          <div className="animate-fadeIn">
            <QuizView 
              progress={progress} 
              saveQuizScore={saveQuizScore} 
              setTab={setTab}
              initialQuizId={activeQuizId}
            />
          </div>
        )}

        {currentTab === "progress" && (
          <div className="animate-fadeIn">
            <ProgressDashboard 
              progress={progress} 
              userName={userName} 
              resetProgress={resetProgress}
              setTab={setTab}
            />
          </div>
        )}
      </main>
    </div>
  );
}
