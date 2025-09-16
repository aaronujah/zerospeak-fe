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
  // Progress Tracking
  getProgress: async (
    contentId?: string,
    contentType?: string
  ): Promise<ProgressItem[]> => {
    const params = new URLSearchParams();
    if (contentId) params.append("contentId", contentId);
    if (contentType) params.append("contentType", contentType);

    const queryString = params.toString();
    const endpoint = `/progress${queryString ? `?${queryString}` : ""}`;
    return apiClient.get<ProgressItem[]>(endpoint);
  },

  getProgressItem: async (id: string): Promise<ProgressItem> => {
    return apiClient.get<ProgressItem>(`/progress/${id}`);
  },

  createProgress: async (data: CreateProgressDto): Promise<ProgressItem> => {
    return apiClient.post<ProgressItem>("/progress", data);
  },

  updateProgress: async (
    id: string,
    data: UpdateProgressDto
  ): Promise<ProgressItem> => {
    return apiClient.put<ProgressItem>(`/progress/${id}`, data);
  },

  deleteProgress: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/progress/${id}`);
  },

  // Lesson Progress
  getLessonProgress: async (lessonId?: string): Promise<ProgressItem[]> => {
    const endpoint = lessonId
      ? `/progress/lessons/${lessonId}`
      : "/progress/lessons";
    return apiClient.get<ProgressItem[]>(endpoint);
  },

  updateLessonProgress: async (
    lessonId: string,
    data: UpdateProgressDto
  ): Promise<ProgressItem> => {
    return apiClient.put<ProgressItem>(`/progress/lessons/${lessonId}`, data);
  },

  // Content Progress
  getContentProgress: async (contentId?: string): Promise<ProgressItem[]> => {
    const endpoint = contentId
      ? `/progress/content/${contentId}`
      : "/progress/content";
    return apiClient.get<ProgressItem[]>(endpoint);
  },

  updateContentProgress: async (
    contentId: string,
    data: UpdateProgressDto
  ): Promise<ProgressItem> => {
    return apiClient.put<ProgressItem>(`/progress/content/${contentId}`, data);
  },

  // Flashcard Progress
  getFlashcardProgress: async (deckId?: string): Promise<ProgressItem[]> => {
    const endpoint = deckId
      ? `/progress/flashcards/${deckId}`
      : "/progress/flashcards";
    return apiClient.get<ProgressItem[]>(endpoint);
  },

  updateFlashcardProgress: async (
    deckId: string,
    data: UpdateProgressDto
  ): Promise<ProgressItem> => {
    return apiClient.put<ProgressItem>(`/progress/flashcards/${deckId}`, data);
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
    const endpoint = `/progress/analytics${
      queryString ? `?${queryString}` : ""
    }`;
    return apiClient.get<any>(endpoint);
  },
};
