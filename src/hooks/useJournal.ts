import { useApi, useApiMutation } from "./useApi";
import { journalApi } from "@/lib/api/journal";
// Types are used in the function signatures

export function useJournalEntries(languageId?: string) {
  return useApi(() => journalApi.getEntries(languageId));
}

export function useJournalEntry(id: string) {
  return useApi(() => journalApi.getEntry(id), { immediate: !!id });
}

export function useCreateJournalEntry() {
  return useApiMutation(journalApi.createEntry);
}

export function useUpdateJournalEntry() {
  return useApiMutation(
    (params: { id: string; data: Record<string, unknown> }) =>
      journalApi.updateEntry(params.id, params.data)
  );
}

export function useDeleteJournalEntry() {
  return useApiMutation(journalApi.deleteEntry);
}

export function useJournalPrompts(category?: string, difficulty?: string) {
  return useApi(() => journalApi.getPrompts(category, difficulty));
}

export function useJournalPrompt(id: string) {
  return useApi(() => journalApi.getPrompt(id), { immediate: !!id });
}

export function useCreateJournalPrompt() {
  return useApiMutation(journalApi.createPrompt);
}

export function useUpdateJournalPrompt() {
  return useApiMutation(
    (params: { id: string; data: Record<string, unknown> }) =>
      journalApi.updatePrompt(params.id, params.data)
  );
}

export function useDeleteJournalPrompt() {
  return useApiMutation(journalApi.deletePrompt);
}

export function useJournalAnalytics(startDate?: string, endDate?: string) {
  return useApi(() => journalApi.getJournalAnalytics(startDate, endDate));
}
