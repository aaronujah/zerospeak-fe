import { apiClient } from "./config";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
    dailyGoal: number;
    isOnboarded: boolean;
  };
  token: string;
  refreshToken: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export const authApi = {
  // Authentication
  login: async (data: LoginDto): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/login", data);
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/register", data);
  },

  logout: async (): Promise<void> => {
    return apiClient.post<void>("/auth/logout");
  },

  refreshToken: async (data: RefreshTokenDto): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/refresh", data);
  },

  // Password Reset
  requestPasswordReset: async (email: string): Promise<void> => {
    return apiClient.post<void>("/auth/forgot-password", { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    return apiClient.post<void>("/auth/reset-password", { token, password });
  },

  // Email Verification
  requestEmailVerification: async (): Promise<void> => {
    return apiClient.post<void>("/auth/verify-email");
  },

  verifyEmail: async (token: string): Promise<void> => {
    return apiClient.post<void>("/auth/verify-email", { token });
  },
};
