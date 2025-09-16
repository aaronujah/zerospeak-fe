import { apiClient } from "./config";
import { JournalEntry, JournalPrompt } from "@/types/journal";

export interface CreateJournalEntryDto {
  title: string;
  content: string;
  languageId: string;
  tags?: string[];
  isPublic?: boolean;
}

export interface UpdateJournalEntryDto {
  title?: string;
  content?: string;
  tags?: string[];
  isPublic?: boolean;
}

export interface CreateJournalPromptDto {
  promptText: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags?: string[];
  isActive?: boolean;
}

export interface UpdateJournalPromptDto {
  promptText?: string;
  category?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  tags?: string[];
  isActive?: boolean;
}

export const journalApi = {
  // Journal Entries
  getEntries: async (languageId?: string): Promise<JournalEntry[]> => {
    const endpoint = languageId
      ? `/journal/entries?languageId=${languageId}`
      : "/journal/entries";
    return apiClient.get<JournalEntry[]>(endpoint);
  },

  getEntry: async (id: string): Promise<JournalEntry> => {
    return apiClient.get<JournalEntry>(`/journal/entries/${id}`);
  },

  createEntry: async (data: CreateJournalEntryDto): Promise<JournalEntry> => {
    return apiClient.post<JournalEntry>("/journal/entries", data);
  },

  updateEntry: async (
    id: string,
    data: UpdateJournalEntryDto
  ): Promise<JournalEntry> => {
    return apiClient.put<JournalEntry>(`/journal/entries/${id}`, data);
  },

  deleteEntry: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/journal/entries/${id}`);
  },

  // Journal Prompts
  getPrompts: async (
    category?: string,
    difficulty?: string
  ): Promise<JournalPrompt[]> => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (difficulty) params.append("difficulty", difficulty);

    const queryString = params.toString();
    const endpoint = `/journal/prompts${queryString ? `?${queryString}` : ""}`;
    return apiClient.get<JournalPrompt[]>(endpoint);
  },

  getPrompt: async (id: string): Promise<JournalPrompt> => {
    return apiClient.get<JournalPrompt>(`/journal/prompts/${id}`);
  },

  createPrompt: async (
    data: CreateJournalPromptDto
  ): Promise<JournalPrompt> => {
    return apiClient.post<JournalPrompt>("/journal/prompts", data);
  },

  updatePrompt: async (
    id: string,
    data: UpdateJournalPromptDto
  ): Promise<JournalPrompt> => {
    return apiClient.put<JournalPrompt>(`/journal/prompts/${id}`, data);
  },

  deletePrompt: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/journal/prompts/${id}`);
  },

  // Analytics
  getJournalAnalytics: async (
    startDate?: string,
    endDate?: string
  ): Promise<any> => {
    const params = new URLSearchParams();
    if (startDate) params.append("start", startDate);
    if (endDate) params.append("end", endDate);

    const queryString = params.toString();
    const endpoint = `/journal/analytics${
      queryString ? `?${queryString}` : ""
    }`;
    return apiClient.get<any>(endpoint);
  },
};
