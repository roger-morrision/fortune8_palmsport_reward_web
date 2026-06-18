import * as Types from "@/src/store/types";
import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const AuthService = {
  token: (payload: { username: string; password: string }) =>
    apiClient.post(API_ENDPOINTS.AUTH.TOKEN, payload),
  login: (payload: Types.Login) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, payload),
  social: (payload: Types.Login) => apiClient.post(API_ENDPOINTS.AUTH.SOCIAL, payload),
  signOut: () => apiClient.post(API_ENDPOINTS.AUTH.SIGN_OUT),
  resendEmail: (userId: string) => apiClient.post(API_ENDPOINTS.AUTH.RESEND_EMAIL(userId)),
  refreshToken: (refreshToken: string) =>
    apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken }),
};
