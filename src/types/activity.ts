export type ActivityType =
  | "lesson_completed"
  | "flashcard_studied"
  | "journal_entry"
  | "content_viewed";

export interface UserActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: Date;
  metadata?: {
    lessonId?: string;
    lessonTitle?: string;
    deckId?: string;
    deckName?: string;
    entryId?: string;
    contentId?: string;
    contentTitle?: string;
    cardsStudied?: number;
    wordsWritten?: number;
    streakDays?: number;
    achievementName?: string;
    score?: number;
    timeSpent?: number; // in minutes
  };
  icon: string; // emoji or icon identifier
  color: "emerald" | "blue" | "orange" | "purple" | "pink" | "yellow";
}

export interface ActivityFilters {
  type?: ActivityType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

export interface ActivityStats {
  totalActivities: number;
  todayActivities: number;
  thisWeekActivities: number;
  topActivity: ActivityType;
  learningStreak: number;
}
