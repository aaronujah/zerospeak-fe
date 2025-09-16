import { useApi, useApiMutation } from "./useApi";
import { flashcardsApi } from "@/lib/api/flashcards";
import { FlashCardDeck, FlashCard, StudySession } from "@/types/flashcards";

export function useFlashcardDecks() {
  return useApi(() => flashcardsApi.getDecks());
}

export function useFlashcardDeck(id: string) {
  return useApi(() => flashcardsApi.getDeck(id), { immediate: !!id });
}

export function useCreateFlashcardDeck() {
  return useApiMutation(flashcardsApi.createDeck);
}

export function useUpdateFlashcardDeck() {
  return useApiMutation(
    (params: { id: string; data: Record<string, unknown> }) =>
      flashcardsApi.updateDeck(params.id, params.data)
  );
}

export function useDeleteFlashcardDeck() {
  return useApiMutation(flashcardsApi.deleteDeck);
}

export function useFlashcards(deckId: string) {
  return useApi(() => flashcardsApi.getFlashcards(deckId), {
    immediate: !!deckId,
  });
}

export function useFlashcard(id: string) {
  return useApi(() => flashcardsApi.getFlashcard(id), { immediate: !!id });
}

export function useCreateFlashcard() {
  return useApiMutation(flashcardsApi.createFlashcard);
}

export function useUpdateFlashcard() {
  return useApiMutation(
    (params: { id: string; data: Record<string, unknown> }) =>
      flashcardsApi.updateFlashcard(params.id, params.data)
  );
}

export function useDeleteFlashcard() {
  return useApiMutation(flashcardsApi.deleteFlashcard);
}

export function useStudySessions(deckId?: string) {
  return useApi(() => flashcardsApi.getStudySessions(deckId));
}

export function useCreateStudySession() {
  return useApiMutation(flashcardsApi.createStudySession);
}

export function useDeckAnalytics(
  deckId: string,
  startDate?: string,
  endDate?: string
) {
  return useApi(
    () => flashcardsApi.getDeckAnalytics(deckId, startDate, endDate),
    {
      immediate: !!deckId,
    }
  );
}
