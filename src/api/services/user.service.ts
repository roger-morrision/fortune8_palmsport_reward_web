import * as Types from "@/src/store/types";
import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { PARTNER_ID } from "@/src/constants/Config";

export const UserService = {
  profile: () => apiClient.get(API_ENDPOINTS.USER.PROFILE),
  forgot: (email: string) =>
    apiClient.post(API_ENDPOINTS.USER.FORGOT_PASSWORD, {
      email,
      partnerId: PARTNER_ID,
    }),
  resetPassword: (payload: Types.ResetPasswordInput) =>
    apiClient.post(API_ENDPOINTS.USER.RESET_PASSWORD, payload),
  wallet: (userId: string) => apiClient.get(API_ENDPOINTS.USER.WALLET(userId)),
  userRank: (userId: string) => apiClient.get(API_ENDPOINTS.USER.USER_RANK(userId)),
  avatar: (userId: string) => apiClient.get(API_ENDPOINTS.USER.AVATAR(userId)),
  tierUpgrade: (userId: string) => apiClient.get(API_ENDPOINTS.USER.TIER_UPGRADE(userId)),
};
