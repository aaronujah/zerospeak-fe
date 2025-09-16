import { useState, useEffect, useCallback } from "react";
import { ApiError } from "@/lib/api/config";

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = {}
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const { immediate = true, onSuccess, onError } = options;

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      onError?.(apiError);
    } finally {
      setLoading(false);
    }
  }, [apiCall, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
}

export function useApiMutation<T, P = any>(
  apiCall: (params: P) => Promise<T>,
  options: UseApiOptions = {}
): UseApiState<T> & { mutate: (params: P) => Promise<void> } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const { onSuccess, onError } = options;

  const mutate = useCallback(
    async (params: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiCall(params);
        setData(result);
        onSuccess?.(result);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        onError?.(apiError);
      } finally {
        setLoading(false);
      }
    },
    [apiCall, onSuccess, onError]
  );

  return {
    data,
    loading,
    error,
    mutate,
  };
}
