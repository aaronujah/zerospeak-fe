import { Session } from "next-auth";

export function hasCompletedOnboarding(session: Session | null): boolean {
  // Check localStorage first for immediate updates
  if (typeof window !== "undefined") {
    const localComplete = localStorage.getItem("onboardingComplete");
    if (localComplete === "true") {
      return true;
    }
  }

  // Fallback to session data
  return session?.user?.hasCompletedOnboarding === true;
}

export function getRedirectPath(session: Session | null): string {
  if (!session) {
    return "/auth/signin";
  }

  return hasCompletedOnboarding(session) ? "/dashboard" : "/onboarding";
}

export function shouldRedirectToOnboarding(
  session: Session | null,
  currentPath: string
): boolean {
  if (!session) return false;

  // Don't redirect if already on onboarding pages
  if (currentPath.startsWith("/onboarding")) return false;

  // Don't redirect if already completed onboarding
  if (hasCompletedOnboarding(session)) return false;

  // Redirect to onboarding if not completed and not on auth pages
  return !currentPath.startsWith("/auth");
}

export function shouldRedirectToDashboard(
  session: Session | null,
  currentPath: string
): boolean {
  if (!session) return false;

  // Don't redirect if not completed onboarding
  if (!hasCompletedOnboarding(session)) return false;

  // Redirect to dashboard if on onboarding pages but already completed
  return currentPath.startsWith("/onboarding");
}

// Function to mark onboarding as complete
export async function markOnboardingComplete(userId: string): Promise<void> {
  // Mark in localStorage for immediate effect
  if (typeof window !== "undefined") {
    localStorage.setItem("onboardingComplete", "true");
    localStorage.setItem("onboardingCompletedAt", new Date().toISOString());
  }

  // In production, you'd update the database and refresh the session
}
