/**
 * Utility functions for authentication and route protection
 */

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
  "/",
  "/auth/signin",
  "/auth/signup",
  "/api/auth",
] as const;

// Routes that require authentication
export const PROTECTED_ROUTES = [
  "/dashboard",
  "/flashcards",
  "/journal",
  "/progress",
  "/settings",
  "/lessons",
  "/content",
  "/feed",
  "/bookmarked",
  "/liked",
  "/history",
  "/help",
  "/onboarding",
] as const;

/**
 * Check if a route is public (doesn't require authentication)
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route)
  );
}

/**
 * Check if a route is protected (requires authentication)
 */
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route)
  );
}

/**
 * Get the redirect URL for unauthenticated users
 */
export function getAuthRedirectUrl(): string {
  return "/auth/signin";
}

/**
 * Get the default redirect URL after successful authentication
 */
export function getDefaultRedirectUrl(): string {
  return "/dashboard";
}
