import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const NotificationService = {
  notifications: (userId: string) =>
    apiClient.get(API_ENDPOINTS.NOTIFICATION.NOTIFICATIONS(userId)),
  read: (notificationId: string) => apiClient.post(API_ENDPOINTS.NOTIFICATION.READ(notificationId)),
  readAll: (payload: { status: "string"; typeIds: any[] }) =>
    apiClient.patch(API_ENDPOINTS.NOTIFICATION.READ_ALL, payload),
  delete: (notificationId: string) =>
    apiClient.post(API_ENDPOINTS.NOTIFICATION.DELETE(notificationId)),
  deleteAll: (userId: string) => apiClient.post(API_ENDPOINTS.NOTIFICATION.DELETE_ALL(userId)),
  claimBonus: (payload: { userId: string; notificationId: string }) =>
    apiClient.post(API_ENDPOINTS.NOTIFICATION.CLAIM_BONUS(payload)),
};
