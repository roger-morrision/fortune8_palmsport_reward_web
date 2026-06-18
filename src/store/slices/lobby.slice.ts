// DUCKS pattern
import { getAvailableHotDealsProducts } from "@/src/common/utils/transform-helper";
import { createAction, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ErrorValue, KYCValue, Product } from "../types";

export interface InitialState {
  loading: boolean;
  lobbysuccess: boolean;
  error: ErrorValue;
  products: Product[];

  kycLoading: boolean;
  kycSuccess: any;
  kycFailed: ErrorValue;
  kycInput: KYCValue;
}

export const initialState: InitialState = {
  loading: false,
  lobbysuccess: false,
  error: {} as ErrorValue,
  popupScreenToDisplay: [] as any,
  products: [] as any,

  kycLoading: false,
  kycSuccess: {} as any,
  kycFailed: {} as ErrorValue,
  kycInput: { currentScreen: 0 } as KYCValue,
} as InitialState;

// Slice
export const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    lobbyRequest: (state) => {
      state.loading = true;
      state.lobbysuccess = false;
      state.error = {} as ErrorValue;
    },
    lobbySuccess: (state) => {
      state.error = {} as ErrorValue;
      state.loading = false;
      state.lobbysuccess = true;
    },
    lobbyFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    lobbyReset: () => {
      return initialState;
    },

    products: (state, action) => {
      state.products = action.payload;
    },

    kycRequest: (state) => {
      state.kycLoading = true;
      state.kycFailed = {} as ErrorValue;
    },
    kycSuccess: (state, action) => {
      state.kycSuccess = action.payload;
      state.kycLoading = false;
      state.kycFailed = {} as ErrorValue;
      state.kycInput = { currentScreen: 0 } as KYCValue;
    },
    kycFailure: (state, action) => {
      state.kycFailed = action.payload;
      state.kycLoading = false;
    },

    kycInputs: <K extends keyof KYCValue>(
      state: InitialState,
      action: PayloadAction<{ type: K; value: KYCValue[K] }>,
    ) => {
      state.kycInput[action.payload.type] = action.payload.value;
    },

    clearKYCInputs: (state) => {
      state.kycInput = { currentScreen: 0 } as KYCValue;
    },

    logout: () => {
      return initialState;
    },
  },
});

// Actions
export const lobbyActions = {
  lobbyRequest: createAction(`${lobbySlice.name}/lobbyRequest`),
  lobbySuccess: lobbySlice.actions.lobbySuccess,
  lobbyFailure: lobbySlice.actions.lobbyFailure,
  lobbyReset: lobbySlice.actions.lobbyReset,

  kycRequest: lobbySlice.actions.kycRequest,
  kycSuccess: lobbySlice.actions.kycSuccess,
  kycFailure: lobbySlice.actions.kycFailure,

  products: lobbySlice.actions.products,
  kycInputs: lobbySlice.actions.kycInputs,
  clearKYCInputs: lobbySlice.actions.clearKYCInputs,
  logout: lobbySlice.actions.logout,
};

// Selectors
export const selectedLobbyLoading = (state: RootState) => state.lobby.loading;
export const selectedLobbyFailed = (state: RootState) => state.lobby.error;
export const selectedLobbySuccess = (state: RootState) => state.lobby.lobbysuccess;
export const selectedProducts = (state: RootState) => state.lobby.products;
export const selectKYCInputs = (state: RootState) => state.lobby.kycInput;
export const selectedKYCLoading = (state: RootState) => state.lobby.kycLoading;
export const selectedKYCData = (state: RootState) => state.lobby.kycSuccess;

export const selectedHotDealsProduct = createSelector(
  (state: RootState) => state.lobby.products,
  (state) => getAvailableHotDealsProducts(state),
);

export const selectedKYCCurrentScreen = createSelector(
  (state: RootState) => state.lobby.kycInput,
  (redeem) => redeem.currentScreen || 0,
);

// Reducer
export default lobbySlice.reducer;
