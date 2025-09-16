import { useApi } from "./useApi";
import { languagesApi } from "@/lib/api/languages";
import { Language, LanguageAnalytics } from "@/types/languages";

export function useLanguages() {
  return useApi(() => languagesApi.getLanguages());
}

export function useLanguage(id: string) {
  return useApi(() => languagesApi.getLanguage(id), { immediate: !!id });
}

export function useLanguageAnalytics(startDate?: string, endDate?: string) {
  return useApi(() => languagesApi.getLanguageAnalytics(startDate, endDate));
}
