import { apiClient } from "./config";

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

export interface CreateProgressDto {
  contentId: string;
  contentType: "lesson" | "flashcard" | "content";
  attempts?: number;
  isFavorite?: boolean;
  streak?: number;
  reviewHistory?: any[];
  exerciseScores?: number[];
  bookmarks?: number[];
  learningNotes?: string[];
}

export interface UpdateProgressDto {
  attempts?: number;
  isFavorite?: boolean;
  streak?: number;
  reviewHistory?: any[];
  exerciseScores?: number[];
  bookmarks?: number[];
  learningNotes?: string[];
}

export const progressApi = {
  // Overall Progress
  getOverallProgress: async (): Promise<any> => {
    return apiClient.get<any>("/v1/progress/overall");
  },

  getProgressAnalytics: async (
    startDate?: string,
    endDate?: string
  ): Promise<any> => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const queryString = params.toString();
    const endpoint = `/v1/progress/analytics${
      queryString ? `?${queryString}` : ""
    }`;
    return apiClient.get<any>(endpoint);
  },

  // Lesson Progress
  getLessonProgress: async (lessonId?: string): Promise<ProgressItem[]> => {
    const endpoint = lessonId
      ? `/v1/progress/lessons/${lessonId}`
      : "/v1/progress/lessons";
    return apiClient.get<ProgressItem[]>(endpoint);
  },

  updateLessonProgress: async (
    lessonId: string,
    data: UpdateProgressDto
  ): Promise<ProgressItem> => {
    return apiClient.put<ProgressItem>(
      `/v1/progress/lessons/${lessonId}`,
      data
    );
  },

  // Content Progress
  getContentProgress: async (contentId?: string): Promise<ProgressItem[]> => {
    const endpoint = contentId
      ? `/v1/progress/content/${contentId}`
      : "/v1/progress/content";
    return apiClient.get<ProgressItem[]>(endpoint);
  },

  updateContentProgress: async (
    contentId: string,
    data: UpdateProgressDto
  ): Promise<ProgressItem> => {
    return apiClient.put<ProgressItem>(
      `/v1/progress/content/${contentId}`,
      data
    );
  },

  // Flashcard Progress
  getFlashcardProgress: async (deckId?: string): Promise<ProgressItem[]> => {
    const endpoint = deckId
      ? `/v1/progress/flashcards/${deckId}`
      : "/v1/progress/flashcards";
    return apiClient.get<ProgressItem[]>(endpoint);
  },

  updateFlashcardProgress: async (
    deckId: string,
    data: UpdateProgressDto
  ): Promise<ProgressItem> => {
    return apiClient.put<ProgressItem>(
      `/v1/progress/flashcards/${deckId}`,
      data
    );
  },

  // Analytics
  getProgressAnalytics: async (
    startDate?: string,
    endDate?: string
  ): Promise<any> => {
    const params = new URLSearchParams();
    if (startDate) params.append("start", startDate);
    if (endDate) params.append("end", endDate);

    const queryString = params.toString();
    const endpoint = `/v1/progress/analytics${
      queryString ? `?${queryString}` : ""
    }`;
    return apiClient.get<any>(endpoint);
  },
};
