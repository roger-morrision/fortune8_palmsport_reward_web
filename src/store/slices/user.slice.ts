// DUCKS pattern
import {
  forceUpdateWalletBalances,
  getSilverGold,
  updateWalletBalances,
  userRewardsUpdate,
} from "@/src/common/utils/transform-helper";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment";
import type { RootState } from "../store";
import { TierBonus } from "../types";

interface UserState {
  userDetails: any;
  wallets: any[];
  balanceUpdate: any[];
  walletAnimation: boolean;
  tierUpgrade: TierBonus[];
  isIdle: boolean;
  gameEntered: boolean;
}

export const initialState: UserState = {
  userDetails: {},
  wallets: [],
  balanceUpdate: [],
  walletAnimation: false,
  tierUpgrade: [],
  isIdle: false,
  gameEntered: false,
} as UserState;

// Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.wallets = action.payload.userBalanceList;
    },
    updateProfile: (state, action) => {
      state.userDetails["firstName"] = action.payload.firstName;
      state.userDetails["lastName"] = action.payload.lastName;
      state.userDetails["dateOfBirth"] = action.payload.dateOfBirth;
      state.userDetails["userDetail"] = action.payload.userDetail;
    },
    updateWallet: (state, action) => {
      state.balanceUpdate = action.payload;
      state.wallets = updateWalletBalances(state.wallets, action.payload);
    },
    mergeWallet: (state, action) => {
      state.walletAnimation = true;
      state.wallets = forceUpdateWalletBalances(state.wallets, state.balanceUpdate, action.payload);
    },
    walletAnimation: (state, action) => {
      state.walletAnimation = action.payload;
    },
    updateUserRewards: (state, action) => {
      state.userDetails["userRewards"] = userRewardsUpdate(
        state?.userDetails?.userRewards ?? [],
        action.payload,
      );
    },
    updateUserTier: (state, action) => {
      state.userDetails["tier"] = action.payload;
    },
    updateKYCStatus: (state, action) => {
      state.userDetails["kycStatus"] = action.payload;
    },
    fetchTierUpgrade: (state, action) => {
      state.tierUpgrade = action.payload;
    },
    setIdle: (state, action: PayloadAction<boolean>) => {
      state.isIdle = action.payload;
    },
    setGameStatus: (state, action: PayloadAction<boolean>) => {
      state.gameEntered = action.payload;
    },
    resetUserDetails: () => {
      return initialState;
    },
  },
});

// Actions
export const userActions = {
  fetchUserDetails: userSlice.actions.fetchUserDetails,
  updateWallet: userSlice.actions.updateWallet,
  mergeWallet: userSlice.actions.mergeWallet,
  updateUserRewards: userSlice.actions.updateUserRewards,
  updateUserTier: userSlice.actions.updateUserTier,
  updateProfile: userSlice.actions.updateProfile,
  updateKYCStatus: userSlice.actions.updateKYCStatus,
  resetUserDetails: userSlice.actions.resetUserDetails,
  walletAnimation: userSlice.actions.walletAnimation,
  fetchTierUpgrade: userSlice.actions.fetchTierUpgrade,
  setIdle: userSlice.actions.setIdle,
  setGameStatus: userSlice.actions.setGameStatus,
};

// Selectors
export const selectUserSession = (state: RootState) => state.user.userDetails;
export const selectUserWalletAnimation = (state: RootState) => state.user.walletAnimation;
export const selecedtUserIdle = (state: RootState) => state.user.isIdle;
export const selectedUpgradeTier = (state: RootState) => state.user.tierUpgrade;

export const selectedUserSession = createSelector(
  (state: RootState) => state.user.userDetails,
  (session) => ({
    userId: session.id,
    token: session.token,
  }),
);
export const selectedUserName = createSelector(
  (state: RootState) => state.user.userDetails,
  (session) => `${session.firstName?.trim() || " "} ${session.lastName?.trim() || " "}`?.trim(),
);
export const selectedDisplayname = createSelector(
  (state: RootState) => state.user.userDetails,
  (session) => session.displayName?.trim() || " ",
);
export const selectedKYCStatus = createSelector(
  (state: RootState) => state.user.userDetails,
  (session) => session.kycStatus,
);
export const selectedTierProgress = createSelector(
  (state: RootState) => state.user.userDetails,
  (session) => (session?.tier?.id / 4) * 100,
);
export const selectedTierID = createSelector(
  (state: RootState) => state.user.userDetails,
  (session) => session?.tier?.id,
);
export const selectedTierName = createSelector(
  (state: RootState) => state.user.userDetails,
  (session) => session?.tier?.name,
);
export const selectedUserEmail = createSelector(
  (state: RootState) => state.user.userDetails,
  (session) => session.emailAddress,
);
export const selectedUserUserID = createSelector(
  (state: RootState) => state.user.userDetails,
  (session) => session.id,
);
export const selectedUserCoins = createSelector(
  (state: RootState) => state.user.wallets,
  (state) => getSilverGold(state || []),
);
export const selectedSilverCoins = createSelector(
  (state: any) => state.user.wallets,
  (state) => {
    const silver = _.find(state, (item) => {
      return item.coinType.name === "SILVER";
    });

    return silver?.amount <= 100000;
  },
);
export const selectedUserNewUser = createSelector(
  (state: any) => state.user.userDetails,
  (state) => {
    const userRewards = state?.userRewards ?? [];
    const newUSerReward = userRewards.find(
      (item: any) => item?.rewards?.name === "New User Rewards" && item.status === "CLAIMABLE",
    );

    return newUSerReward;
  },
);
export const selectedUserProfile = createSelector(
  (state: RootState) => state.user.userDetails,
  (session) => ({
    firstName: session.firstName,
    lastName: session.lastName,
    country: session?.userDetail?.country?.name ?? "",
    gender: session?.userDetail?.gender?.name ?? "",
    month: session.dateOfBirth ? moment(session.dateOfBirth).format("MMMM") : "",
    day: session.dateOfBirth ? moment(session.dateOfBirth).format("D") : "",
    year: session.dateOfBirth ? moment(session.dateOfBirth).format("YYYY") : "",
  }),
);

// Reducer
export default userSlice.reducer;
