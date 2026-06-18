import { useRef, useState, useCallback, useEffect } from "react";

type Options = {
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
};

export const useApi = (apiFn: any, options?: Options) => {
  const controllerRef = useRef<AbortController | null>(null);

  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (params?: any) => {
    // 🚨 Abort previous request if still running
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setState((p) => ({ ...p, loading: true, error: null }));

      const result = await apiFn(params, {
        signal: controller.signal, // 👈 pass signal
      });

      setState({
        data: result,
        loading: false,
        error: null,
      });

      options?.onSuccess?.(result);
      return result;
    } catch (err: any) {
      if (err.name === "AbortError") {
        // ❌ silently ignore aborted requests
        return;
      }

      const message = err?.message || err?.data?.message || "Something went wrong";

      setState({
        data: null,
        loading: false,
        error: message,
      });

      options?.onError?.(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🧹 cleanup on unmount
  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return {
    ...state,
    execute,
    abort: () => controllerRef.current?.abort(),
  };
};
