import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const RewardService = {
  homePage: () => apiClient.get(API_ENDPOINTS.REWARDS.HOME_PAGE),
  rafflePage: () => apiClient.get(API_ENDPOINTS.REWARDS.RAFFLE_PAGE),
  resultPage: () => apiClient.get(API_ENDPOINTS.REWARDS.RESULT_PAGE),
};
