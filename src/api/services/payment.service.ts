import { CreatePayoutInstrument, PayoutProcess, PayoutTransactions } from "@/src/store/types";
import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const PaymentService = {
  lookup: (payload: { email: string }) =>
    apiClient.get(API_ENDPOINTS.PAYMENT.LOOKUP, { params: payload }),
  instantPayLink: ({ params, signal }: { params?: { user_id: number }; signal?: AbortSignal }) =>
    apiClient.post(API_ENDPOINTS.PAYMENT.INSTANT_PAY_LINK, params, { signal }),
  instantPayInstrument: ({
    params,
    signal,
  }: {
    params?: { user_id: number; attribute_token: string };
    signal?: AbortSignal;
  }) => apiClient.post(API_ENDPOINTS.PAYMENT.INSTANT_PAY_INSTRUMENT, params, { signal }),
  createPayoutInstrument: (id: number, payload: CreatePayoutInstrument) =>
    apiClient.post(API_ENDPOINTS.PAYMENT.PAYOUT_INSTRUMENT(id), payload),
  payoutSendOTP: ({
    params,
    signal,
  }: {
    params?: { user_id: number; payout_instrument_id: number };
    signal?: AbortSignal;
  }) => apiClient.post(API_ENDPOINTS.PAYMENT.PAYOUT_SEND_OTP, params, { signal }),
  payoutProcess: ({ params, signal }: { params?: PayoutProcess; signal?: AbortSignal }) =>
    apiClient.post(API_ENDPOINTS.PAYMENT.PAYOUT_PROCESS, params, { signal }),

  payoutTransactions: ({ params, signal }: { params?: PayoutTransactions; signal?: AbortSignal }) =>
    apiClient.get(API_ENDPOINTS.PAYMENT.PAYOUT_TRANSACTIONS, { params, signal }),
  payoutTransactionsSearch: ({
    params,
    signal,
  }: {
    params?: PayoutTransactions;
    signal?: AbortSignal;
  }) => apiClient.get(API_ENDPOINTS.PAYMENT.PAYOUT_TRANSACTIONS_SEARCH, { params, signal }),
  payoutTransactionCancel: ({
    params,
    signal,
  }: {
    params?: { id: number };
    signal?: AbortSignal;
  }) =>
    apiClient.delete(API_ENDPOINTS.PAYMENT.PAYOUT_TRANSACTION_CANCEL(params?.id ?? -1), { signal }),
};
