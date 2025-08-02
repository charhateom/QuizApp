export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizQuestion extends Question {
  id: number;
  choices: string[];
  userAnswer?: string;
  isVisited: boolean;
  isAttempted: boolean;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: { [key: number]: string };
  timeRemaining: number;
  isCompleted: boolean;
  userEmail: string;
  startTime: Date | null;
}

export interface QuizResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  choices: string[];
}