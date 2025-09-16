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
    return apiClient.get<FlashCardDeck[]>("/flashcards/decks");
  },

  getDeck: async (id: string): Promise<FlashCardDeck> => {
    return apiClient.get<FlashCardDeck>(`/flashcards/decks/${id}`);
  },

  createDeck: async (data: CreateFlashcardDeckDto): Promise<FlashCardDeck> => {
    return apiClient.post<FlashCardDeck>("/flashcards/decks", data);
  },

  updateDeck: async (
    id: string,
    data: UpdateFlashcardDeckDto
  ): Promise<FlashCardDeck> => {
    return apiClient.put<FlashCardDeck>(`/flashcards/decks/${id}`, data);
  },

  deleteDeck: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/flashcards/decks/${id}`);
  },

  // Flashcards
  getFlashcards: async (deckId: string): Promise<FlashCard[]> => {
    return apiClient.get<FlashCard[]>(`/flashcards/decks/${deckId}/cards`);
  },

  getFlashcard: async (id: string): Promise<FlashCard> => {
    return apiClient.get<FlashCard>(`/flashcards/${id}`);
  },

  createFlashcard: async (data: CreateFlashcardDto): Promise<FlashCard> => {
    return apiClient.post<FlashCard>("/flashcards", data);
  },

  updateFlashcard: async (
    id: string,
    data: UpdateFlashcardDto
  ): Promise<FlashCard> => {
    return apiClient.put<FlashCard>(`/flashcards/${id}`, data);
  },

  deleteFlashcard: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/flashcards/${id}`);
  },

  // Study Sessions
  getStudySessions: async (deckId?: string): Promise<StudySession[]> => {
    const endpoint = deckId
      ? `/flashcards/study-sessions?deckId=${deckId}`
      : "/flashcards/study-sessions";
    return apiClient.get<StudySession[]>(endpoint);
  },

  createStudySession: async (data: StudySessionDto): Promise<StudySession> => {
    return apiClient.post<StudySession>("/flashcards/study-sessions", data);
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
    const endpoint = `/flashcards/decks/${deckId}/analytics${
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
