import * as Types from "@/src/store/types";
import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const KYCService = {
  upload: (payload: any) =>
    apiClient.post(API_ENDPOINTS.KYC.UPLOAD, payload, { isMultipart: true }),
  verify: (payload: Types.KYCValue) => apiClient.post(API_ENDPOINTS.KYC.VERIFY, payload),
  validate: (payload: Types.KYCValue) => apiClient.post(API_ENDPOINTS.KYC.VALIDATE, payload),
};
