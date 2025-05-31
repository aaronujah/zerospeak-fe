export interface FlashCard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  createdAt: string;
  updatedAt: string;
  // Spaced repetition data
  interval: number; // days until next review
  repetition: number; // number of times reviewed
  easeFactor: number; // ease factor for spaced repetition
  nextReview: string; // next review date
  lastReviewed?: string;
}

export interface FlashCardDeck {
  id: string;
  name: string;
  description: string;
  category: "vocabulary" | "grammar" | "phrases" | "culture" | "custom";
  level: "beginner" | "intermediate" | "advanced" | "mixed";
  cards: FlashCard[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  // Progress tracking
  totalCards: number;
  newCards: number;
  learningCards: number;
  reviewCards: number;
  masteredCards: number;
}

export interface StudySession {
  deckId: string;
  cardsStudied: number;
  correctAnswers: number;
  duration: number; // in minutes
  date: string;
}

export interface FlashCardStats {
  totalDecks: number;
  totalCards: number;
  cardsStudiedToday: number;
  studyStreak: number;
  averageAccuracy: number;
  totalStudyTime: number; // in minutes
  deckStats: {
    [deckId: string]: {
      name: string;
      totalCards: number;
      masteredCards: number;
      accuracy: number;
      lastStudied?: string;
    };
  };
}

export interface ReviewResult {
  cardId: string;
  difficulty: "again" | "hard" | "good" | "easy";
  responseTime: number; // in seconds
}
