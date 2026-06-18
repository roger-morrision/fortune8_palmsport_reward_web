import { apiClient } from "./client";

export const setupInterceptors = () => {
  apiClient.addRequestInterceptor((config) => {
    console.log("🚀 Request:", config);
    return config;
  });

  apiClient.addResponseInterceptor((response) => {
    console.log("✅ Response:", response);
    return response;
  });
};
