import { apiClient } from "./config";
import { Lesson, Exercise } from "@/types/lessons";

export interface CreateLessonDto {
  title: string;
  description: string;
  languageId: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: number;
  tags?: string[];
  isActive?: boolean;
}

export interface UpdateLessonDto {
  title?: string;
  description?: string;
  level?: "beginner" | "intermediate" | "advanced";
  duration?: number;
  tags?: string[];
  isActive?: boolean;
}

export interface CreateExerciseDto {
  lessonId: string;
  type: "multiple-choice" | "fill-in-blank" | "translation" | "listening";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  difficulty: number;
  timeLimit?: number;
}

export interface UpdateExerciseDto {
  type?: "multiple-choice" | "fill-in-blank" | "translation" | "listening";
  question?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  difficulty?: number;
  timeLimit?: number;
}

export interface ExerciseValidationDto {
  exerciseId: string;
  userAnswer: string;
  timeSpent: number;
}

export const lessonsApi = {
  // Lessons
  getLessons: async (
    languageId?: string,
    level?: string
  ): Promise<Lesson[]> => {
    const params = new URLSearchParams();
    if (languageId) params.append("languageId", languageId);
    if (level) params.append("level", level);

    const queryString = params.toString();
    const endpoint = `/lessons${queryString ? `?${queryString}` : ""}`;
    return apiClient.get<Lesson[]>(endpoint);
  },

  getLesson: async (id: string): Promise<Lesson> => {
    return apiClient.get<Lesson>(`/lessons/${id}`);
  },

  createLesson: async (data: CreateLessonDto): Promise<Lesson> => {
    return apiClient.post<Lesson>("/lessons", data);
  },

  updateLesson: async (id: string, data: UpdateLessonDto): Promise<Lesson> => {
    return apiClient.put<Lesson>(`/lessons/${id}`, data);
  },

  deleteLesson: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/lessons/${id}`);
  },

  // Exercises
  getExercises: async (lessonId: string): Promise<Exercise[]> => {
    return apiClient.get<Exercise[]>(`/lessons/${lessonId}/exercises`);
  },

  getExercisesByType: async (
    lessonId: string,
    type: string
  ): Promise<Exercise[]> => {
    return apiClient.get<Exercise[]>(
      `/lessons/${lessonId}/exercises?type=${type}`
    );
  },

  getExercise: async (id: string): Promise<Exercise> => {
    return apiClient.get<Exercise>(`/exercises/${id}`);
  },

  createExercise: async (data: CreateExerciseDto): Promise<Exercise> => {
    return apiClient.post<Exercise>("/exercises", data);
  },

  updateExercise: async (
    id: string,
    data: UpdateExerciseDto
  ): Promise<Exercise> => {
    return apiClient.put<Exercise>(`/exercises/${id}`, data);
  },

  deleteExercise: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/exercises/${id}`);
  },

  // Exercise Validation
  validateExercise: async (data: ExerciseValidationDto): Promise<any> => {
    return apiClient.post<any>("/exercises/validate", data);
  },

  // Analytics
  getLessonAnalytics: async (
    languageId?: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> => {
    const params = new URLSearchParams();
    if (languageId) params.append("languageId", languageId);
    if (startDate) params.append("start", startDate);
    if (endDate) params.append("end", endDate);

    const queryString = params.toString();
    const endpoint = `/lessons/analytics${
      queryString ? `?${queryString}` : ""
    }`;
    return apiClient.get<any>(endpoint);
  },

  getExerciseStats: async (exerciseId: string): Promise<any> => {
    return apiClient.get<any>(`/exercises/${exerciseId}/stats`);
  },
};
