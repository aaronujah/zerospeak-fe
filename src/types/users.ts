export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  dailyGoal: number;
  isOnboarded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserLanguage {
  id: string;
  userId: string;
  languageId: string;
  proficiencyLevel: "beginner" | "intermediate" | "advanced";
  isPrimary: boolean;
  startedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  activityType: string;
  contentId: string;
  duration: number;
  createdAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  level: "beginner" | "intermediate" | "advanced";
  isUnlocked: boolean;
  unlockedAt?: string;
  createdAt: string;
}

export interface UserAnalytics {
  totalTimeSpent: string;
  totalLessons: number;
  totalFlashcards: number;
  totalJournalEntries: number;
  streak: number;
  level: string;
  progress: number;
  weeklyActivity: Array<{
    date: string;
    timeSpent: number;
    lessons: number;
    flashcards: number;
    journalEntries: number;
  }>;
  topLanguages: Array<{
    languageId: string;
    languageName: string;
    progress: number;
    timeSpent: string;
  }>;
  recentAchievements: Achievement[];
}
