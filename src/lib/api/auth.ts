import { apiClient } from "./config";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
  dailyGoal?: number;
  hasCompletedOnboarding: boolean;
  token: string;
  createdAt: string;
  updatedAt: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export const authApi = {
  // Authentication
  login: async (data: LoginDto): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/v1/login", data);
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/v1/signup", data);
  },

  logout: async (): Promise<void> => {
    // Clear tokens from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
    }
    // Note: Backend logout endpoint not implemented yet
  },

  // Password Reset
  requestPasswordReset: async (email: string): Promise<void> => {
    return apiClient.post<void>("/v1/password-reset-otp", { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    return apiClient.post<void>("/v1/verify-password-reset-otp", {
      token,
      password,
    });
  },

  // Email Verification
  requestEmailVerification: async (): Promise<void> => {
    return apiClient.post<void>("/v1/auth/verify-email");
  },

  verifyEmail: async (token: string): Promise<void> => {
    return apiClient.post<void>("/v1/auth/verify-email", { token });
  },
};
