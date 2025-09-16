const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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
      const token = localStorage.getItem("auth_token");
      return token;
    }
    return null;
  }

  private async refreshToken(): Promise<string | null> {
    if (typeof window !== "undefined") {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) return null;

      try {
        const response = await fetch(`${this.baseURL}/auth/refresh`, {
          method: "POST",
          headers: this.defaultHeaders,
          body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("auth_token", data.token);
          localStorage.setItem("refresh_token", data.refreshToken);
          return data.token;
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        // Clear invalid tokens
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
      }
    }
    return null;
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const token = await this.getAuthToken();
    return {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
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
