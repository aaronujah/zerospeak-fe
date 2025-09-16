import { useApi, useApiMutation } from "./useApi";
import { contentApi } from "@/lib/api/content";
import { ContentItem } from "@/types/content";

export function useContent(type?: string, level?: string, languageId?: string) {
  return useApi(() => contentApi.getContent(type, level, languageId));
}

export function useContentItem(id: string) {
  return useApi(() => contentApi.getContentItem(id), { immediate: !!id });
}

export function useCreateContent() {
  return useApiMutation(contentApi.createContent);
}

export function useUpdateContent() {
  return useApiMutation(contentApi.updateContent);
}

export function useDeleteContent() {
  return useApiMutation(contentApi.deleteContent);
}

export function useLikeContent() {
  return useApiMutation(contentApi.likeContent);
}

export function useUnlikeContent() {
  return useApiMutation(contentApi.unlikeContent);
}

export function useBookmarkContent() {
  return useApiMutation(contentApi.bookmarkContent);
}

export function useUnbookmarkContent() {
  return useApiMutation(contentApi.unbookmarkContent);
}

export function useContentAnalytics(startDate?: string, endDate?: string) {
  return useApi(() => contentApi.getContentAnalytics(startDate, endDate));
}
