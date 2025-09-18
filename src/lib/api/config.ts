const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  details?: any;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async getAuthToken(): Promise<string | null> {
    if (typeof window !== "undefined") {
      // First try to get token from localStorage (for direct API login)
      const localToken = localStorage.getItem("auth_token");
      if (localToken) {
        return localToken;
      }

      // If no local token, try to get from NextAuth session
      try {
        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        if (session && (session as any).backendToken) {
          return (session as any).backendToken;
        }
      } catch (error) {
        // Silently handle session retrieval errors
      }
    }
    return null;
  }

  private async refreshToken(): Promise<string | null> {
    // For now, refresh token functionality is not implemented in the backend
    // Clear invalid tokens and redirect to login
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      // Redirect to login page
      window.location.href = "/auth/signin";
    }
    return null;
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const token = await this.getAuthToken();
    const headers = { ...this.defaultHeaders };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401) {
        const newToken = await this.refreshToken();
        if (newToken) {
          // Retry the original request with new token
          const retryResponse = await fetch(response.url, {
            method: response.headers.get("x-original-method") || "GET",
            headers: {
              ...this.defaultHeaders,
              Authorization: `Bearer ${newToken}`,
            },
            body: response.headers.get("x-original-body") || undefined,
          });

          if (retryResponse.ok) {
            return retryResponse.json();
          }
        }
      }

      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.message || "An error occurred",
        status: response.status,
        details: errorData,
      } as ApiError;
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
