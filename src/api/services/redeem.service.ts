import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import * as Types from "@/src/store/types";

export const RedeemService = {
  ids: async ({ params, signal }: { params?: { userId: string }; signal?: AbortSignal }) => {
    if (!params?.userId) {
      throw new Error("userId is required");
    }

    return await apiClient.get(API_ENDPOINTS.REDEEM.IDS(params.userId), { signal });
  },
  save: ({ params }: { params?: Types.Redeem }) =>
    apiClient.post(API_ENDPOINTS.REDEEM.SAVE, params),
  upload: (payload: any) =>
    apiClient.post(API_ENDPOINTS.REDEEM.UPLOAD, payload, { isMultipart: true }),
  saveIDs: (params: any) => apiClient.post(API_ENDPOINTS.REDEEM.SAVE_IDS, params),

  deleteId: async ({ params }: { params?: { id: number } }) => {
    if (!params?.id) throw new Error("id is required");

    return apiClient.post(API_ENDPOINTS.REDEEM.DELETE_ID, undefined, {
      params: { id: params.id },
    });
  },
  feedback: async ({ params }: { params?: Types.FeedBack }) =>
    apiClient.post(API_ENDPOINTS.REDEEM.FEEDBACK, params),
  transactions: ({ params }: { params?: Types.Transactions }) =>
    apiClient.post(API_ENDPOINTS.REDEEM.TRANSACTIONS, params),
  resendVerificationCode: ({
    params,
    signal,
  }: {
    params?: { requestId: number; userId: number };
    signal?: AbortSignal;
  }) => apiClient.post(API_ENDPOINTS.REDEEM.RESEND_VERIFICATION_CODE, params, { signal }),
  emailVerification: ({
    params,
    signal,
  }: {
    params?: Types.RedeemEmailVerification;
    signal?: AbortSignal;
  }) => apiClient.post(API_ENDPOINTS.REDEEM.EMAIL_VERIFICATION, params, { signal }),

  validateAmount: async ({ params }: { params?: { amount: number } }) => {
    if (!params?.amount) throw new Error("amount is required");

    return apiClient.get(API_ENDPOINTS.REDEEM.VALIDATE_AMOUNT, {
      params: { goldAmount: params.amount },
    });
  },
};
