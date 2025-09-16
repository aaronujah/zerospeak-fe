import { useApi, useApiMutation } from "./useApi";
import { lessonsApi } from "@/lib/api/lessons";
// Types are used in the function signatures

export function useLessons(languageId?: string, level?: string) {
  return useApi(() => lessonsApi.getLessons(languageId, level));
}

export function useLesson(id: string) {
  return useApi(() => lessonsApi.getLesson(id), { immediate: !!id });
}

export function useCreateLesson() {
  return useApiMutation(lessonsApi.createLesson);
}

export function useUpdateLesson() {
  return useApiMutation(
    (params: { id: string; data: Record<string, unknown> }) =>
      lessonsApi.updateLesson(params.id, params.data)
  );
}

export function useDeleteLesson() {
  return useApiMutation(lessonsApi.deleteLesson);
}

export function useExercises(lessonId: string) {
  return useApi(() => lessonsApi.getExercises(lessonId), {
    immediate: !!lessonId,
  });
}

export function useExercisesByType(lessonId: string, type: string) {
  return useApi(() => lessonsApi.getExercisesByType(lessonId, type), {
    immediate: !!lessonId && !!type,
  });
}

export function useExercise(id: string) {
  return useApi(() => lessonsApi.getExercise(id), { immediate: !!id });
}

export function useCreateExercise() {
  return useApiMutation(lessonsApi.createExercise);
}

export function useUpdateExercise() {
  return useApiMutation(
    (params: { id: string; data: Record<string, unknown> }) =>
      lessonsApi.updateExercise(params.id, params.data)
  );
}

export function useDeleteExercise() {
  return useApiMutation(lessonsApi.deleteExercise);
}

export function useValidateExercise() {
  return useApiMutation(lessonsApi.validateExercise);
}

export function useLessonAnalytics(
  languageId?: string,
  startDate?: string,
  endDate?: string
) {
  return useApi(() =>
    lessonsApi.getLessonAnalytics(languageId, startDate, endDate)
  );
}

export function useExerciseStats(exerciseId: string) {
  return useApi(() => lessonsApi.getExerciseStats(exerciseId), {
    immediate: !!exerciseId,
  });
}
