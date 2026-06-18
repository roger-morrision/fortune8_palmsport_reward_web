import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const LookupService = {
  provinces: () => apiClient.get(API_ENDPOINTS.LOOKUP.PROVINCES),
};
