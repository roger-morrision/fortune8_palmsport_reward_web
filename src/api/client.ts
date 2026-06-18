import { authActions } from "@/src/store/slices/auth.slice";
import store from "@/src/store/store";
import { API_BASE_URL } from "@/src/constants/Config";

type RequestConfig = {
  method?: string;
  headers?: Record<string, any>;
  body?: any;
  params?: Record<string, any>;
  isMultipart?: boolean;
  signal?: AbortSignal;
};

type Interceptor<T> = (data: T) => Promise<T> | T;

class APIClient {
  private baseURL: string;
  private token?: string;
  private refreshToken?: string;

  private isRefreshing = false;
  private refreshPromise: Promise<any> | null = null;
  private requestQueue: ((token: string) => void)[] = [];

  private requestInterceptors: Interceptor<RequestConfig>[] = [];
  private responseInterceptors: Interceptor<any>[] = [];

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // ------------------------
  // TOKEN MANAGEMENT
  // ------------------------
  setTokens(accessToken: string, refreshToken?: string) {
    this.token = accessToken;
    this.refreshToken = refreshToken;
  }

  // ------------------------
  // INTERCEPTORS
  // ------------------------
  addRequestInterceptor(fn: Interceptor<RequestConfig>) {
    this.requestInterceptors.push(fn);
  }

  addResponseInterceptor(fn: Interceptor<any>) {
    this.responseInterceptors.push(fn);
  }

  // ------------------------
  // REQUEST METHODS
  // ------------------------
  get(url: string, config?: RequestConfig) {
    return this.request(url, { ...config, method: "GET" });
  }

  post(url: string, body?: any, config?: RequestConfig) {
    return this.request(url, { ...config, method: "POST", body });
  }

  patch(url: string, body?: any, config?: RequestConfig) {
    return this.request(url, { ...config, method: "PATCH", body });
  }

  put(url: string, body?: any, config?: RequestConfig) {
    return this.request(url, { ...config, method: "PUT", body });
  }

  delete(url: string, config?: RequestConfig) {
    return this.request(url, { ...config, method: "DELETE" });
  }

  // ------------------------
  // CORE REQUEST
  // ------------------------
  private async request(url: string, config: RequestConfig) {
    let finalConfig: RequestConfig = {
      method: config.method || "GET",
      headers: {
        Accept: "application/json",
        ...(config.headers || {}),
      },
      body: config.body,
      params: config.params,
      isMultipart: config.isMultipart,
      signal: config.signal,
    };

    if (this.token) {
      finalConfig.headers!.Authorization = `Bearer ${this.token}`;
    }

    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      finalConfig = await interceptor(finalConfig);
    }

    // Build URL
    let fullUrl = `${this.baseURL}${url}`;
    if (finalConfig.params) {
      fullUrl += `?${new URLSearchParams(finalConfig.params).toString()}`;
    }

    const options: RequestInit = {
      method: finalConfig.method,
      headers: finalConfig.isMultipart
        ? { Authorization: `Bearer ${this.token}` }
        : {
            "Content-Type": "application/json",
            ...finalConfig.headers,
          },
      body:
        finalConfig.method !== "GET"
          ? finalConfig.isMultipart
            ? finalConfig.body
            : JSON.stringify(finalConfig.body)
          : undefined,
      signal: finalConfig.signal,
    };

    const response = await fetch(fullUrl, options);

    // ------------------------
    // HANDLE 401 + QUEUE
    // ------------------------
    if (response.status === 401 && this.refreshToken) {
      return this.handle401(fullUrl, options);
    }

    return this.handleResponse(response);
  }

  // ------------------------
  // HANDLE RESPONSE
  // ------------------------
  private async handleResponse(response: Response) {
    let data;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.message ?? data?.error?.message ?? "Request failed",
        data: data?.error ?? data,
      };
    }

    for (const interceptor of this.responseInterceptors) {
      data = await interceptor(data);
    }

    return data;
  }

  // ------------------------
  // HANDLE 401 WITH QUEUE (AXIOS STYLE)
  // ------------------------
  private async handle401(url: string, options: RequestInit) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      this.refreshPromise = this.refreshTokenRequest();

      try {
        const data = await this.refreshPromise;
        this.processQueue(data.accessToken);
      } catch (err) {
        this.clearQueue();
        this.logout();
        throw err;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    }

    return new Promise((resolve, reject) => {
      this.requestQueue.push((token: string) => {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };

        fetch(url, options).then(this.handleResponse.bind(this)).then(resolve).catch(reject);
      });
    });
  }

  private processQueue(token: string) {
    this.requestQueue.forEach((cb) => cb(token));
    this.requestQueue = [];
  }

  private clearQueue() {
    this.requestQueue = [];
  }

  // ------------------------
  // REFRESH TOKEN
  // ------------------------
  private async refreshTokenRequest() {
    const res = await fetch(`${this.baseURL}/api/v1/user/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: this.refreshToken }),
    });

    if (!res.ok) throw new Error("Session expired");

    const data = await res.json();

    this.token = data.accessToken;
    this.refreshToken = data.refreshToken;

    store.dispatch(authActions.refreshToken(data));

    return data;
  }

  // ------------------------
  // LOGOUT
  // ------------------------
  private logout() {
    this.token = undefined;
    this.refreshToken = undefined;

    store.dispatch(authActions.logout());
    store.dispatch(authActions.setErrorMessage("Session expired"));
  }
}

export const apiClient = new APIClient(API_BASE_URL);
