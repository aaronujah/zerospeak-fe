export interface ProgressItem {
  id: string;
  userId: string;
  contentId: string;
  contentType: "lesson" | "flashcard" | "content";
  attempts: number;
  isFavorite: boolean;
  streak: number;
  reviewHistory: any[];
  exerciseScores: number[];
  bookmarks: number[];
  learningNotes: string[];
  progressPercentage: number;
  averageScore: number;
  timeSpentFormatted: string;
  daysSinceStarted: number;
  daysSinceCompleted: number;
  views: number;
  watchTimeFormatted: string;
  engagementScore: number;
  daysSinceFirstView: number;
  daysSinceLastView: number;
  isDueForReview: boolean;
  isOverdue: boolean;
  daysUntilReview: number;
  priority: number;
  daysSinceFirstReview: number;
  daysSinceLastReview: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressAnalytics {
  totalProgress: number;
  averageScore: number;
  totalTimeSpent: string;
  totalViews: number;
  totalAttempts: number;
  streak: number;
  topContent: Array<{
    id: string;
    title: string;
    progressPercentage: number;
    averageScore: number;
    timeSpent: string;
  }>;
  recentActivity: Array<{
    id: string;
    contentId: string;
    contentType: string;
    action: string;
    timestamp: string;
  }>;
  weeklyProgress: Array<{
    date: string;
    progress: number;
    timeSpent: number;
    attempts: number;
  }>;
}
