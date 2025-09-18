declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      hasCompletedOnboarding?: boolean;
      dailyGoal?: number;
    };
    backendToken?: string;
  }

  interface User {
    id: string;
    hasCompletedOnboarding?: boolean;
    dailyGoal?: number;
    backendToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    hasCompletedOnboarding?: boolean;
    dailyGoal?: number;
    backendToken?: string;
  }
}
