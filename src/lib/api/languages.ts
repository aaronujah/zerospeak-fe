import { apiClient } from "./config";

export interface Language {
  id: string;
  name: string;
  code: string;
  flag: string;
  isAsianLanguage: boolean;
  isRightToLeft: boolean;
  displayInfo: string;
  createdAt: string;
  updatedAt: string;
}

export interface LanguageAnalytics {
  totalUsers: number;
  totalContent: number;
  totalLessons: number;
  totalFlashcards: number;
  topLanguages: Language[];
  growthRate: number;
  averageProgress: number;
}

export const languagesApi = {
  // Languages
  getLanguages: async (): Promise<Language[]> => {
    return apiClient.get<Language[]>("/languages");
  },

  getLanguage: async (id: string): Promise<Language> => {
    return apiClient.get<Language>(`/languages/${id}`);
  },

  // Analytics
  getLanguageAnalytics: async (
    startDate?: string,
    endDate?: string
  ): Promise<LanguageAnalytics> => {
    const params = new URLSearchParams();
    if (startDate) params.append("start", startDate);
    if (endDate) params.append("end", endDate);

    const queryString = params.toString();
    const endpoint = `/languages/analytics${
      queryString ? `?${queryString}` : ""
    }`;
    return apiClient.get<LanguageAnalytics>(endpoint);
  },
};
