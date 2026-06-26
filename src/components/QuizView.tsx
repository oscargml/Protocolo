import React from "react";
import { quizzes } from "../data/quizzes";
import { Quiz, QuizQuestion, UserProgress } from "../types";
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Award, 
  FileText, 
  Flame, 
  ListOrdered 
} from "lucide-react";

interface QuizViewProps {
  progress: UserProgress;
  saveQuizScore: (quizId: string, score: number, total: number) => void;
  setTab: (tab: string) => void;
  initialQuizId?: string;
}

export default function QuizView({ progress, saveQuizScore, setTab, initialQuizId }: QuizViewProps) {
  // If an initial quiz ID is specified (e.g. from a quick link), start with it.
  const [selectedQuizId, setSelectedQuizId] = React.useState<string | null>(initialQuizId || null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState<number | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [quizCompleted, setQuizCompleted] = React.useState(false);

  // Sync state if initialQuizId changes
  React.useEffect(() => {
    if (initialQuizId) {
      setSelectedQuizId(initialQuizId);
      resetQuizState();
    }
  }, [initialQuizId]);

  const activeQuiz = quizzes.find((q) => q.id === selectedQuizId);

  const resetQuizState = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleSelectQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleOptionClick = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOptionIndex(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || isAnswered || !activeQuiz) return;
    
    setIsAnswered(true);
    const question = activeQuiz.questions[currentQuestionIndex];
    if (selectedOptionIndex === question.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!activeQuiz) return;
    
    setSelectedOptionIndex(null);
    setIsAnswered(false);

    if (currentQuestionIndex + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
      saveQuizScore(activeQuiz.id, score, activeQuiz.questions.length);
    }
  };

  // If no quiz is selected, show list of available quizzes
  if (!activeQuiz) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 py-4">
          <HelpCircle className="w-12 h-12 text-diplomatic-gold mx-auto" />
          <h1 className="font-serif text-3xl text-diplomatic-navy tracking-wide font-light">
            Cuestionarios Prácticos
          </h1>
          <p className="text-slate-600 text-sm font-serif">
            Evalúa tu nivel de asimilación del protocolo y ceremonial diplomático mexicano. Al obtener un puntaje perfecto (100%), desbloquearás medallas exclusivas de especialización legal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {quizzes.map((quiz) => {
            const result = progress.completedQuizzes[quiz.id];
            const hasScore = result !== undefined;
            const isPerfect = hasScore && result.score === result.total;

            return (
              <div 
                key={quiz.id} 
                className="bg-white rounded-none border border-diplomatic-border p-6 flex flex-col justify-between hover:bg-diplomatic-panel transition duration-250 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 bg-diplomatic-navy text-diplomatic-accent text-[9px] font-sans tracking-widest uppercase font-semibold">
                      {quiz.category}
                    </span>
                    {hasScore && (
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 border border-diplomatic-border bg-white text-slate-700 ${
                        isPerfect ? "text-emerald-700 border-emerald-300 bg-emerald-50" : ""
                      }`}>
                        Record: {result.score}/{result.total}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg text-diplomatic-navy font-semibold leading-snug">
                    {quiz.title}
                  </h3>
                  <p className="text-slate-600 text-xs mt-2 leading-relaxed font-serif italic">
                    {quiz.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-diplomatic-border flex items-center justify-between">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-slate-500">
                    {quiz.questions.length} Preguntas
                  </span>
                  <button
                    onClick={() => handleSelectQuiz(quiz.id)}
                    className="px-4 py-2 bg-diplomatic-navy hover:bg-slate-850 text-diplomatic-accent text-xs font-sans font-bold tracking-widest uppercase rounded-none transition-all"
                  >
                    {hasScore ? "Reintentar" : "Iniciar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Quiz execution layout
  const question: QuizQuestion = activeQuiz.questions[currentQuestionIndex];
  const percentProgress = Math.round(((currentQuestionIndex) / activeQuiz.questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Quiz Screen */}
      {!quizCompleted ? (
        <div className="bg-white rounded-none border border-diplomatic-border p-6 sm:p-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-diplomatic-border pb-4 mb-6">
            <div>
              <button 
                onClick={() => setSelectedQuizId(null)} 
                className="text-xs text-[#A68F68] font-sans font-bold tracking-wider uppercase hover:underline mb-1 flex items-center gap-1"
              >
                ← Volver al listado
              </button>
              <h2 className="font-serif text-2xl text-diplomatic-navy font-light tracking-wide mt-1">
                {activeQuiz.title}
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500 bg-diplomatic-panel p-2.5 border border-diplomatic-border">
              <span>Pregunta <strong>{currentQuestionIndex + 1}</strong> de <strong>{activeQuiz.questions.length}</strong></span>
              <span>•</span>
              <span>Puntaje: <strong className="text-amber-700">{score}</strong></span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#D4C5B3] h-[3px] overflow-hidden mb-8">
            <div 
              className="bg-diplomatic-navy h-full transition-all duration-300"
              style={{ width: `${percentProgress}%` }}
            />
          </div>

          {/* Question text */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl text-diplomatic-navy leading-relaxed font-light">
              {question.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3">
              {question.options.map((option, idx) => {
                let optionStyle = "border-diplomatic-border hover:border-diplomatic-navy bg-white hover:bg-diplomatic-panel text-slate-800";
                let statusIcon = null;

                if (isAnswered) {
                  const isCurrentOption = idx === selectedOptionIndex;
                  const isCorrectAnswer = idx === question.correctAnswerIndex;

                  if (isCorrectAnswer) {
                    optionStyle = "border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold";
                    statusIcon = <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
                  } else if (isCurrentOption) {
                    optionStyle = "border-rose-600 bg-rose-50 text-rose-950 font-semibold";
                    statusIcon = <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
                  } else {
                    optionStyle = "border-slate-200 bg-white text-slate-400 opacity-60";
                  }
                } else if (selectedOptionIndex === idx) {
                  optionStyle = "border-diplomatic-navy bg-diplomatic-panel text-slate-900 font-bold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnswered}
                    className={`w-full flex items-center justify-between gap-4 p-4 rounded-none border text-left transition text-sm sm:text-base cursor-pointer ${optionStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-none flex items-center justify-center text-xs font-mono font-bold border flex-shrink-0 ${
                        selectedOptionIndex === idx && !isAnswered
                          ? "bg-diplomatic-navy text-white border-diplomatic-navy"
                          : "bg-white text-slate-500 border-diplomatic-border"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {statusIcon}
                  </button>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="pt-6 border-t border-diplomatic-border flex items-center justify-end">
              {!isAnswered ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOptionIndex === null}
                  className={`px-8 py-4 font-sans font-bold text-xs uppercase tracking-widest transition-all rounded-none ${
                    selectedOptionIndex === null
                      ? "bg-slate-100 text-slate-450 cursor-not-allowed border border-diplomatic-border"
                      : "bg-diplomatic-navy text-diplomatic-accent hover:bg-slate-850 cursor-pointer shadow-sm"
                  }`}
                >
                  Enviar Respuesta
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-4 bg-diplomatic-navy hover:bg-slate-850 text-diplomatic-accent rounded-none font-sans font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  {currentQuestionIndex + 1 < activeQuiz.questions.length ? "Siguiente Pregunta" : "Finalizar Cuestionario"}
                  <ArrowRight className="w-4 h-4 text-diplomatic-accent" />
                </button>
              )}
            </div>

            {/* Explanation box */}
            {isAnswered && (
              <div className="bg-diplomatic-navy text-slate-100 p-6 rounded-none border-l-4 border-diplomatic-gold mt-6 animate-fadeIn space-y-3">
                <div className="flex items-center gap-2 text-diplomatic-accent font-sans text-xs font-bold uppercase tracking-widest">
                  <FileText className="w-4 h-4 text-diplomatic-accent" />
                  Sustento y Explicación Protocolaria
                </div>
                <p className="text-sm leading-relaxed text-slate-300 font-serif italic">
                  {question.explanation}
                </p>
                {question.articleReference && (
                  <p className="text-xs text-slate-400 font-mono mt-1 italic uppercase tracking-wider">
                    Referencia: {question.articleReference}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results summary screen */
        <div className="bg-white rounded-none border border-diplomatic-border p-10 text-center space-y-8">
          <Award className="w-16 h-16 text-diplomatic-gold mx-auto" />
          
          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-light text-diplomatic-navy tracking-wide">
              ¡Cuestionario Completado!
            </h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto font-serif">
              Has evaluado tus conocimientos en <strong>{activeQuiz.title}</strong>. Tu resultado se ha registrado con éxito en tu panel de estudio.
            </p>
          </div>

          {/* Score metrics */}
          <div className="max-w-xs mx-auto bg-diplomatic-panel border border-diplomatic-border p-6 relative rounded-none">
            <p className="text-[10px] font-sans text-slate-500 uppercase tracking-widest">Puntuación Obtenida</p>
            <p className="text-5xl font-light text-diplomatic-navy mt-2 font-serif tracking-tight">
              {score} <span className="text-xl text-slate-400 font-normal">/ {activeQuiz.questions.length}</span>
            </p>
            <div className="mt-4 w-full bg-[#D4C5B3] h-[3px] overflow-hidden">
              <div 
                className="bg-diplomatic-navy h-full animate-pulse" 
                style={{ width: `${(score / activeQuiz.questions.length) * 100}%` }}
              />
            </div>
            <p className="text-xs font-semibold text-slate-700 mt-4 leading-relaxed font-serif italic">
              {score === activeQuiz.questions.length 
                ? "¡Excelente! Puntaje Perfecto (100%)" 
                : score >= Math.ceil(activeQuiz.questions.length * 0.7) 
                ? "¡Buen trabajo! Aprobaste con éxito" 
                : "Te recomendamos repasar las lecciones e intentar de nuevo"}
            </p>
          </div>

          {/* Quick Stats list */}
          <div className="max-w-md mx-auto grid grid-cols-2 gap-4 text-left pt-2 font-mono text-xs">
            <div className="bg-diplomatic-panel p-3 border border-diplomatic-border flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-700 fill-amber-700/10" />
              <div>
                <p className="text-slate-500 text-[10px] leading-tight font-sans uppercase tracking-wider">Racha de Estudio</p>
                <p className="font-bold text-slate-800 mt-0.5">{progress.streak} {progress.streak === 1 ? 'Día' : 'Días'}</p>
              </div>
            </div>
            <div className="bg-diplomatic-panel p-3 border border-diplomatic-border flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-diplomatic-gold" />
              <div>
                <p className="text-slate-500 text-[10px] leading-tight font-sans uppercase tracking-wider">Lecciones Leídas</p>
                <p className="font-bold text-slate-800 mt-0.5">{progress.readLessons.length} / 4</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-diplomatic-border">
            <button
              onClick={resetQuizState}
              className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-diplomatic-panel text-slate-700 border border-diplomatic-border rounded-none font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              Reintentar
            </button>
            <button
              onClick={() => setTab("lessons")}
              className="w-full sm:w-auto px-5 py-3 bg-diplomatic-navy hover:bg-slate-800 text-diplomatic-accent rounded-none font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <BookOpen className="w-4 h-4 text-diplomatic-accent" />
              Lecciones
            </button>
            <button
              onClick={() => setSelectedQuizId(null)}
              className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-diplomatic-panel text-slate-700 border border-diplomatic-border rounded-none font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              Otros Tests
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
