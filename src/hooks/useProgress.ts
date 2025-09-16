import { useApi, useApiMutation } from "./useApi";
import { progressApi } from "@/lib/api/progress";
import { ProgressItem } from "@/types/progress";

export function useProgress(contentId?: string, contentType?: string) {
  return useApi(() => progressApi.getProgress(contentId, contentType));
}

export function useProgressItem(id: string) {
  return useApi(() => progressApi.getProgressItem(id), { immediate: !!id });
}

export function useCreateProgress() {
  return useApiMutation(progressApi.createProgress);
}

export function useUpdateProgress() {
  return useApiMutation(progressApi.updateProgress);
}

export function useDeleteProgress() {
  return useApiMutation(progressApi.deleteProgress);
}

export function useLessonProgress(lessonId?: string) {
  return useApi(() => progressApi.getLessonProgress(lessonId));
}

export function useUpdateLessonProgress() {
  return useApiMutation(progressApi.updateLessonProgress);
}

export function useContentProgress(contentId?: string) {
  return useApi(() => progressApi.getContentProgress(contentId));
}

export function useUpdateContentProgress() {
  return useApiMutation(progressApi.updateContentProgress);
}

export function useFlashcardProgress(deckId?: string) {
  return useApi(() => progressApi.getFlashcardProgress(deckId));
}

export function useUpdateFlashcardProgress() {
  return useApiMutation(progressApi.updateFlashcardProgress);
}

export function useProgressAnalytics(startDate?: string, endDate?: string) {
  return useApi(() => progressApi.getProgressAnalytics(startDate, endDate));
}
