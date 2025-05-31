export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: "excited" | "confident" | "neutral" | "frustrated" | "tired";
  tags: string[];
  language: "spanish" | "english" | "mixed";
  wordCount: number;
  readingTime: number; // in minutes
  createdAt: string;
  updatedAt: string;
  prompt?: JournalPrompt;
  reflection?: {
    whatLearned: string;
    challenges: string;
    improvements: string;
    goals: string;
  };
  studySession?: {
    duration: number; // minutes
    activities: string[];
    wordsLearned: number;
    lessonsCompleted: number;
  };
}

export interface JournalPrompt {
  id: string;
  title: string;
  question: string;
  category:
    | "reflection"
    | "vocabulary"
    | "culture"
    | "goals"
    | "daily"
    | "practice";
  level: "beginner" | "intermediate" | "advanced";
  language: "spanish" | "english";
  tags: string[];
  example?: string;
}

export interface JournalStats {
  totalEntries: number;
  totalWords: number;
  currentStreak: number;
  longestStreak: number;
  averageMood: number; // 1-5 scale
  entriesThisMonth: number;
  wordsThisMonth: number;
  favoritePrompts: string[];
  topTags: { tag: string; count: number }[];
  progressMetrics: {
    vocabularyGrowth: number;
    confidenceLevel: number;
    consistencyScore: number;
  };
}

export interface JournalFilters {
  mood?: JournalEntry["mood"];
  language?: JournalEntry["language"];
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  promptCategory?: JournalPrompt["category"];
  sortBy: "newest" | "oldest" | "wordCount" | "mood";
}
