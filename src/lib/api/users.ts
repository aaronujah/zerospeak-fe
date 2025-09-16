import { apiClient } from "./config";

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

export interface AddUserLanguageDto {
  languageId: string;
  proficiencyLevel: "beginner" | "intermediate" | "advanced";
  isPrimary: boolean;
}

export interface CompleteOnboardingDto {
  targetLanguage: string;
  currentLevel: string;
  dailyGoal: number;
  interests: string[];
  learningStyle: string;
  motivation: string;
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

export const usersApi = {
  // User Management
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>("/users/me");
  },

  updateUser: async (data: Partial<User>): Promise<User> => {
    return apiClient.put<User>("/users/me", data);
  },

  deleteUser: async (): Promise<void> => {
    return apiClient.delete<void>("/users/me");
  },

  // Onboarding
  completeOnboarding: async (data: CompleteOnboardingDto): Promise<User> => {
    return apiClient.post<User>("/users/onboarding", data);
  },

  // User Languages
  getUserLanguages: async (): Promise<UserLanguage[]> => {
    return apiClient.get<UserLanguage[]>("/users/languages");
  },

  addUserLanguage: async (data: AddUserLanguageDto): Promise<UserLanguage> => {
    return apiClient.post<UserLanguage>("/users/languages", data);
  },

  removeUserLanguage: async (languageId: string): Promise<void> => {
    return apiClient.delete<void>(`/users/languages/${languageId}`);
  },

  // User Activities
  getUserActivities: async (): Promise<UserActivity[]> => {
    return apiClient.get<UserActivity[]>("/users/activities");
  },

  // Achievements
  getUserAchievements: async (): Promise<Achievement[]> => {
    return apiClient.get<Achievement[]>("/users/achievements");
  },

  // Analytics
  getUserAnalytics: async (
    startDate?: string,
    endDate?: string
  ): Promise<any> => {
    const params = new URLSearchParams();
    if (startDate) params.append("start", startDate);
    if (endDate) params.append("end", endDate);

    const queryString = params.toString();
    const endpoint = `/users/analytics${queryString ? `?${queryString}` : ""}`;
    return apiClient.get<any>(endpoint);
  },
};
