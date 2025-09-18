import { apiClient } from "./config";
import { FlashCardDeck, FlashCard, StudySession } from "@/types/flashcards";

export interface CreateFlashcardDeckDto {
  title: string;
  description: string;
  languageId: string;
  difficultyLevel: number;
  tags?: string[];
}

export interface UpdateFlashcardDeckDto {
  title?: string;
  description?: string;
  difficultyLevel?: number;
  tags?: string[];
}

export interface CreateFlashcardDto {
  deckId: string;
  front: string;
  back: string;
  difficultyLevel?: number;
  tags?: string[];
}

export interface UpdateFlashcardDto {
  front?: string;
  back?: string;
  difficultyLevel?: number;
  tags?: string[];
}

export interface StudySessionDto {
  deckId: string;
  cardsStudied: number;
  correctAnswers: number;
  timeSpent: number;
  difficultyLevel: number;
}

export const flashcardsApi = {
  // Flashcard Decks
  getDecks: async (): Promise<FlashCardDeck[]> => {
    return apiClient.get<FlashCardDeck[]>("/v1/flashcard-decks");
  },

  getDeck: async (id: string): Promise<FlashCardDeck> => {
    return apiClient.get<FlashCardDeck>(`/v1/flashcard-decks/${id}`);
  },

  createDeck: async (data: CreateFlashcardDeckDto): Promise<FlashCardDeck> => {
    return apiClient.post<FlashCardDeck>("/v1/flashcard-decks", data);
  },

  updateDeck: async (
    id: string,
    data: UpdateFlashcardDeckDto
  ): Promise<FlashCardDeck> => {
    return apiClient.put<FlashCardDeck>(`/v1/flashcard-decks/${id}`, data);
  },

  deleteDeck: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/v1/flashcard-decks/${id}`);
  },

  // Flashcards
  getFlashcards: async (deckId: string): Promise<FlashCard[]> => {
    return apiClient.get<FlashCard[]>(`/v1/flashcards/deck/${deckId}`);
  },

  getFlashcard: async (id: string): Promise<FlashCard> => {
    return apiClient.get<FlashCard>(`/v1/flashcards/${id}`);
  },

  createFlashcard: async (data: CreateFlashcardDto): Promise<FlashCard> => {
    return apiClient.post<FlashCard>("/v1/flashcards", data);
  },

  updateFlashcard: async (
    id: string,
    data: UpdateFlashcardDto
  ): Promise<FlashCard> => {
    return apiClient.put<FlashCard>(`/v1/flashcards/${id}`, data);
  },

  deleteFlashcard: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/v1/flashcards/${id}`);
  },

  // Study Sessions
  getStudySessions: async (deckId?: string): Promise<StudySession[]> => {
    const endpoint = deckId
      ? `/v1/flashcards/study-sessions?deckId=${deckId}`
      : "/v1/flashcards/study-sessions";
    return apiClient.get<StudySession[]>(endpoint);
  },

  createStudySession: async (data: StudySessionDto): Promise<StudySession> => {
    return apiClient.post<StudySession>("/v1/flashcards/study-sessions", data);
  },

  // Analytics
  getDeckAnalytics: async (
    deckId: string,
    startDate?: string,
    endDate?: string
  ): Promise<{
    totalCards: number;
    studiedCards: number;
    accuracy: number;
    studyTime: number;
    streak: number;
  }> => {
    const params = new URLSearchParams();
    if (startDate) params.append("start", startDate);
    if (endDate) params.append("end", endDate);

    const queryString = params.toString();
    const endpoint = `/v1/flashcard-decks/${deckId}/analytics${
      queryString ? `?${queryString}` : ""
    }`;
    return apiClient.get<{
      totalCards: number;
      studiedCards: number;
      accuracy: number;
      studyTime: number;
      streak: number;
    }>(endpoint);
  },
};
