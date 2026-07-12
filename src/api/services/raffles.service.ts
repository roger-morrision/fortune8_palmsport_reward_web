import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import * as Types from "@/src/store/types";

export const RaffleService = {
  redeem: async ({ params, signal }: { params?: { id: number; numTickets: number; }; signal?: AbortSignal }) => {
    if (!params?.id) {
      throw new Error("id is required");
    }

    return await apiClient.post(API_ENDPOINTS.RAFFLES.REDEEM(params.id), params, { signal });
  },
  redemptions: ({ params }: { params?: Types.Redemption }) =>
    apiClient.get(API_ENDPOINTS.RAFFLES.REDEMPTIONS, { params }),
  ongoing: () => apiClient.get(API_ENDPOINTS.RAFFLES.ONGOING),
  results: () => apiClient.get(API_ENDPOINTS.RAFFLES.RESULTS),
};
