declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      hasCompletedOnboarding?: boolean;
    };
  }

  interface User {
    id: string;
    hasCompletedOnboarding?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    hasCompletedOnboarding?: boolean;
  }
}
