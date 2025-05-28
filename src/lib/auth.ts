import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

// Placeholder accounts for demo purposes
const placeholderAccounts = [
  {
    id: "1",
    email: "test@zerospeak.com",
    password: "password123",
    name: "Test User",
    image: null,
    hasCompletedOnboarding: true, // This user has completed onboarding
  },
  {
    id: "2",
    email: "demo@zerospeak.com",
    password: "demo123",
    name: "Demo Learner",
    image: null,
    hasCompletedOnboarding: false, // This user needs onboarding
  },
  {
    id: "3",
    email: "admin@zerospeak.com",
    password: "admin123",
    name: "Admin User",
    image: null,
    hasCompletedOnboarding: true, // This user has completed onboarding
  },
];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
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

        // Check placeholder accounts first
        const user = placeholderAccounts.find(
          (account) =>
            account.email === credentials.email &&
            account.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            hasCompletedOnboarding: user.hasCompletedOnboarding,
          };
        }

        // In a real app, you would validate against your backend here
        return null;
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
  secret:
    process.env.NEXTAUTH_SECRET ||
    "fallback-secret-for-development-only-change-in-production",
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.hasCompletedOnboarding = user.hasCompletedOnboarding;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.hasCompletedOnboarding = token.hasCompletedOnboarding;
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
  debug: process.env.NODE_ENV === "development",
};
