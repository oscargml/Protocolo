export interface LessonSection {
  title: string;
  subtitle?: string;
  content: string; // Markdown or plain text
  highlight?: string; // Important highlight quote
  bulletPoints?: string[];
  viennaArticle?: {
    num: string;
    text: string;
  };
  tableLayoutType?: string; // 'rectangular_work' | 'circular_work' | 'horseshoe' | 'rectangular_social' | 'circular_social'
}

export interface Lesson {
  id: string;
  title: string;
  category: "fundamentos" | "aplicaciones" | "precedencia" | "practica";
  description: string;
  readTime: string;
  sections: LessonSection[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  articleReference?: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  questions: QuizQuestion[];
}

export interface PlacementItem {
  id: string;
  name: string;
  role: string;
  iconName?: string;
  gender: "M" | "F" | "neutral";
  delegation?: "A" | "IH" | "other"; // Anfitrión, Invitado de Honor, etc.
}

export interface SeatingScenario {
  id: string;
  title: string;
  description: string;
  type: "vehicle" | "estrado" | "mesa_trabajo" | "mesa_social";
  context: string;
  itemsToPlace: PlacementItem[];
  correctOrder: string[]; // List of placement item IDs in order of positions (from left-to-right or index-based)
  positions: {
    id: string;
    name: string;
    description: string;
    correctItemId: string;
  }[];
  hint: string;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export interface UserProgress {
  readLessons: string[]; // List of completed lesson IDs
  completedQuizzes: Record<string, { score: number; total: number; date: string }>;
  completedSimulations: string[]; // List of completed scenario IDs
  streak: number;
  lastActive: string; // YYYY-MM-DD
}
