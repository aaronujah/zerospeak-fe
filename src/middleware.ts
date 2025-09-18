import { withAuth } from "next-auth/middleware";
import { isPublicRoute } from "./lib/auth-utils";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // If it's a public route, allow access
        if (isPublicRoute(pathname)) {
          return true;
        }

        // For all other routes, require authentication
        return !!token;
      },
    },
  }
);

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
