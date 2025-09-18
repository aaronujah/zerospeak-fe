import { apiClient } from "./config";
import { ContentItem } from "@/types/content";

export interface CreateContentDto {
  title: string;
  description: string;
  type: "video" | "audio" | "story" | "podcast";
  level: "beginner" | "intermediate" | "advanced";
  languageId: string;
  duration: number;
  url: string;
  thumbnail: string;
  audioUrl?: string;
  subtitles?: Array<{
    language: string;
    url: string;
  }>;
  topics: string[];
  isActive?: boolean;
}

export interface UpdateContentDto {
  title?: string;
  description?: string;
  type?: "video" | "audio" | "story" | "podcast";
  level?: "beginner" | "intermediate" | "advanced";
  duration?: number;
  url?: string;
  thumbnail?: string;
  audioUrl?: string;
  subtitles?: Array<{
    language: string;
    url: string;
  }>;
  topics?: string[];
  isActive?: boolean;
}

export const contentApi = {
  // Content Management
  getContent: async (
    type?: string,
    level?: string,
    languageId?: string
  ): Promise<ContentItem[]> => {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (level) params.append("level", level);
    if (languageId) params.append("languageId", languageId);

    const queryString = params.toString();
    const endpoint = `/v1/content${queryString ? `?${queryString}` : ""}`;
    return apiClient.get<ContentItem[]>(endpoint);
  },

  getContentItem: async (id: string): Promise<ContentItem> => {
    return apiClient.get<ContentItem>(`/v1/content/${id}`);
  },

  createContent: async (data: CreateContentDto): Promise<ContentItem> => {
    return apiClient.post<ContentItem>("/v1/content", data);
  },

  updateContent: async (
    id: string,
    data: UpdateContentDto
  ): Promise<ContentItem> => {
    return apiClient.put<ContentItem>(`/v1/content/${id}`, data);
  },

  deleteContent: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/v1/content/${id}`);
  },

  // Content Interactions
  likeContent: async (id: string): Promise<void> => {
    return apiClient.post<void>("/v1/interactions/content", {
      contentId: id,
      actionType: "like",
    });
  },

  unlikeContent: async (id: string): Promise<void> => {
    return apiClient.post<void>("/v1/interactions/content", {
      contentId: id,
      actionType: "unlike",
    });
  },

  bookmarkContent: async (id: string): Promise<void> => {
    return apiClient.post<void>("/v1/interactions/content", {
      contentId: id,
      actionType: "bookmark",
    });
  },

  unbookmarkContent: async (id: string): Promise<void> => {
    return apiClient.post<void>("/v1/interactions/content", {
      contentId: id,
      actionType: "unbookmark",
    });
  },

  // Analytics
  getContentAnalytics: async (
    startDate?: string,
    endDate?: string
  ): Promise<any> => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const queryString = params.toString();
    const endpoint = `/v1/content/analytics${
      queryString ? `?${queryString}` : ""
    }`;
    return apiClient.get<any>(endpoint);
  },
};
