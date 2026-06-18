import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const LobbyService = {
  restriction: (payload: string) => apiClient.get(API_ENDPOINTS.LOBBY.RESTRICTION(payload)),
  jadeAccumulation: (userId: string) =>
    apiClient.get(API_ENDPOINTS.LOBBY.JADE_ACCUMULATION(userId)),
  randomRewards: (userId: string) => apiClient.get(API_ENDPOINTS.LOBBY.RANDOM_REWARDS(userId)),
  missions: (userId: string) => apiClient.get(API_ENDPOINTS.LOBBY.MISSIONS(userId)),

  checkDailyReward: async ({
    params,
    signal,
  }: {
    params?: { userId: string };
    signal?: AbortSignal;
  }) => {
    if (!params?.userId) {
      throw new Error("userId is required");
    }

    // 1️⃣ check reward
    const result = await apiClient.get(`/api/v1/rewards/${params.userId}/isClaimed`, { signal });

    if (result?.data) {
      // 2️⃣ get remaining time
      const server = await apiClient.get("/utils/day/remaining-time", { signal });

      return server.remainingTimeInSeconds;
    }

    return 0;
  },

  dailyServerTime: () => apiClient.get(API_ENDPOINTS.LOBBY.DAILY_SERVER_TIME),
  checkWeeklyMissions: (userId: string) =>
    apiClient.get(API_ENDPOINTS.LOBBY.CHECK_WEEKLY_MISSION(userId)),
  check3hoursReward: (userId: string) =>
    apiClient.get(API_ENDPOINTS.LOBBY.CHECK_3HOURS_REWARD(userId)),
  claimDailyReward: (payload: { userId: string; rewardName: string }) =>
    apiClient.post(API_ENDPOINTS.LOBBY.CLAIM_DAILY_REWARD(payload)),
  claim3hoursReward: (userId: string) =>
    apiClient.post(API_ENDPOINTS.LOBBY.CLAIM_3HOURS_REWARD(userId)),
};
