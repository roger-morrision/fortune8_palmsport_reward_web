import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const PurchaseService = {
  products: () => apiClient.get(API_ENDPOINTS.PURCHASE.PRODUCTS),
  subscriptions: () => apiClient.get(API_ENDPOINTS.PURCHASE.SUBSCRIPTIONS),
};
