import { PARTNER_ID } from "@/src/constants/Config";
import * as Types from "@/src/store/types";

export const API_ENDPOINTS = {
  AUTH: {
    TOKEN: "/authenticate",
    LOGIN: "/api/v1/user/authenticate",
    SOCIAL: "/api/v1/user/social/authenticate",
    REGISTER: `/api/v1/user?type=1&partnerId=${PARTNER_ID}`,
    ACCOUNT_VERIFY: "/api/v1/user/verify",
    REFRESH_TOKEN: "/api/v1/user/refresh-token",
    SIGN_OUT: "/api/v1/user/sign-out",
    RESEND_EMAIL: (userId: string) => `/api/v1/user/${userId}/verification/resend-email`,
  },
  USER: {
    PROFILE: "/api/v1/user/details",
    FORGOT_PASSWORD: "/api/v1/user/reset-password/send-email",
    RESET_PASSWORD: "/api/v1/user/reset-password/update",
    CHANGE_PASSWORD: "/api/v1/user/password",
    WALLET: (userId: string) => `/api/v1/user/${userId}/wallet`,
    USER_RANK: (userId: string) => `/api/v1/leaderboard/score/${userId}`,
    AVATAR: (userId: string) => `/api/v1/evo/avatartier/${userId}`,
    TIER_UPGRADE: (userId: string) => `/api/v1/user/${userId}/tier-bonuses`,
  },
  LOBBY: {
    RESTRICTION: (payload: string) => `/api/v1/geo/restriction?${payload}`,
    JADE_ACCUMULATION: (userId: string) => `/api/v1/user/${userId}/jade`,
    RANDOM_REWARDS: (userId: string) => `/api/v1/rewards/${userId}?rewardsId=2`,
    MISSIONS: (userId: string) => `/api/v1/user/${userId}/missions`,
    CHECK_DAILY_REWARD: (userId: string) => `/api/v1/rewards/${userId}/isClaimed`,
    DAILY_SERVER_TIME: "/utils/day/remaining-time",
    CHECK_WEEKLY_MISSION: (userId: string) => `/api/v1/rewards/${userId}/isClaimed?rewardID=12`,
    CHECK_3HOURS_REWARD: (userId: string) => `/api/v1/user/${userId}/checkcollect`,
    CLAIM_DAILY_REWARD: (payload: { userId: string; rewardName: string }) =>
      `/api/v1/rewards/${payload.userId}?rewardName=${payload.rewardName}`,
    CLAIM_3HOURS_REWARD: (userId: string) => `/api/v1/user/${userId}/collect`,
  },
  NOTIFICATION: {
    NOTIFICATIONS: (userId: string) => `/api/v1/${userId}/notifications?app=REWARD`, // GET
    READ: (notificationId: string) =>
      `/api/v1/${notificationId}/notifications?app=REWARD&action=READ`, // POST
    READ_ALL: "/api/v1/notifications/status", // PATCH
    DELETE: (notificationId: string) =>
      `/api/v1/${notificationId}/notifications?app=REWARD&action=DELETE`, // POST
    DELETE_ALL: (userId: string) => `/api/v1/notifications/delete-all?userId=${userId}`, // POST
    CLAIM_BONUS: (payload: { userId: string; notificationId: string }) =>
      `/api/v1/${payload.userId}/notifications/${payload.notificationId}/claim-coin-bonus`, // POST
  },
  PURCHASE: {
    PRODUCTS: "/api/v1/products/get",
    SUBSCRIPTIONS: "/api/v1/subscription",
  },
  PROMOTION: {
    VALIDATE_REFERRAL_CODE: (code: string) => `/api/v1/promotions/validate?code=${code}&type=REF`,
  },
  GAME: {
    URL: (payload: Types.GameMode) =>
      `/api/v1/game/${payload.gamecode}/redirect?userId=${payload.userId}&gameTypeID=${payload.gameTypeId}&currency=${payload.currency}`,
    GAMES: (payload: string) => `/api/v1/games?${payload}`,
    FEATURE_GAMES: (payload: string) => `/api/v1/game/featured?${payload}`,
    FAVOURITE_GAMES: (payload: string) => `/api/v1/game/favourite?${payload}`,
    SAVE_FAVOURITE_GAME: "/api/v1/user/createUserFavouriteGames", // POST
    DELETE_FAVOURITE_GAME: "/api/v1/user/deleteUserFavouriteGames", // POST
  },
  KYC: {
    UPLOAD: "/api/v1/files/upload?storageType=TEMP",
    VERIFY: "/api/v1/kyc/verify",
    VALIDATE: "/api/v1/kyc/personal-info/validate",
  },
  LOOKUP: {
    PROVINCES: "/api/v1/lookup/provinces",
  },
  REDEEM: {
    TRANSACTIONS: "/api/v1/redeem/get",
    SAVE: "/api/v1/redeem/save",
    UPLOAD: "/api/v1/redeem/upload/files",
    SAVE_IDS: "/api/v1/redeem/userDocument/save",
    IDS: (userId: string) => `/api/v1/redeem/userDocument/get?userid=${userId}`,
    DELETE_ID: "/api/v1/redeem/userDocument/delete",
    FEEDBACK: "/api/v1/redeem/feedback",
    RESEND_VERIFICATION_CODE: "/api/v1/redeem/resendVerifyCode",
    EMAIL_VERIFICATION: "/api/v1/redeem/request/emailVerification",
    VALIDATE_AMOUNT: "/api/v1/redeem/cashout/validate",
  },
  PAYMENT: {
    LOOKUP: "/api/v1/payment/masspay/user/lookup",
    INSTANT_PAY_LINK: "/api/v1/payment/masspay/attribute/instant-pay/link", // POST
    INSTANT_PAY_INSTRUMENT: "/api/v1/payment/masspay/attribute/instant-pay", // POST
    PAYOUT_INSTRUMENT: (id: number) => `/api/v1/payment/masspay/payout-instrument/users/${id}`,
    PAYOUT_SEND_OTP: "/api/v1/payment/masspay/payout/otp/send",
    PAYOUT_PROCESS: "/api/v1/payment/masspay/payout/process",

    PAYOUT_TRANSACTION_CANCEL: (id: number) =>
      `/api/v1/payment/masspay/cashback-redeem-requests/${id}/cancel`,
    PAYOUT_TRANSACTIONS: "/api/v1/payment/masspay/payout-transactions",
    PAYOUT_TRANSACTIONS_SEARCH: "/api/v1/payment/masspay/payout-transactions/search",
  },
};
