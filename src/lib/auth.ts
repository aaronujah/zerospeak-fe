import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import { authApi } from "./api";

// No placeholder accounts - all authentication goes through backend API

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Authenticate with backend API
          const response = await authApi.login({
            email: credentials.email,
            password: credentials.password,
          });

          // Store the token for API calls
          if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", response.token);
            // Note: Backend doesn't return refresh token yet
          }

          return {
            id: response.id,
            email: response.email,
            name: `${response.firstName} ${response.lastName}`,
            image: response.imageUrl,
            hasCompletedOnboarding: response.hasCompletedOnboarding,
            dailyGoal: response.dailyGoal,
            backendToken: response.token, // Include the backend JWT token
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.hasCompletedOnboarding = user.hasCompletedOnboarding;
        token.dailyGoal = user.dailyGoal;
        // Store the backend JWT token in the NextAuth token
        token.backendToken = user.backendToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.hasCompletedOnboarding = token.hasCompletedOnboarding;
        session.user.dailyGoal = token.dailyGoal;
        // Include the backend token in the session
        (session as any).backendToken = token.backendToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Handle redirects after sign in
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  debug: false,
};
