import { useApi, useApiMutation } from "./useApi";
import { usersApi } from "@/lib/api/users";
import { User, UserLanguage, UserActivity, Achievement } from "@/types/users";

export function useCurrentUser() {
  return useApi(() => usersApi.getCurrentUser());
}

export function useUpdateUser() {
  return useApiMutation(usersApi.updateUser);
}

export function useDeleteUser() {
  return useApiMutation(usersApi.deleteUser);
}

export function useCompleteOnboarding() {
  return useApiMutation(usersApi.completeOnboarding);
}

export function useUserLanguages() {
  return useApi(() => usersApi.getUserLanguages());
}

export function useAddUserLanguage() {
  return useApiMutation(usersApi.addUserLanguage);
}

export function useRemoveUserLanguage() {
  return useApiMutation(usersApi.removeUserLanguage);
}

export function useUserActivities() {
  return useApi(() => usersApi.getUserActivities());
}

export function useUserAchievements() {
  return useApi(() => usersApi.getUserAchievements());
}

export function useUserAnalytics(startDate?: string, endDate?: string) {
  return useApi(() => usersApi.getUserAnalytics(startDate, endDate));
}
