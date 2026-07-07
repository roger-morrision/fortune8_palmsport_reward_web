// DUCKS pattern
import { createAction, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import * as Types from "../types";

interface AuthState {
  loading: boolean;
  otpRequest: boolean;
  isLoggedIn: boolean;
  error: any;
  session: Types.SessionValue;
  expiresAt: number; // absolute timestamp (ms) — NOT a countdown
  errorMessage: string | { message: string };
  isFirstLogin: boolean;
}

export const initialState: AuthState = {
  loading: false,
  otpRequest: false,
  isLoggedIn: false,
  errorMessage: "",
  isFirstLogin: false,
} as AuthState;

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.errorMessage = "";
      state.error = {} as any;
    },
    loginGoogleRequest: (state) => {
      state.loading = true;
    },
    loginFBRequest: (state) => {
      state.loading = true;
    },
    otpRequest: (state, action) => {
      state.loading = false;
      state.otpRequest = true;
      state.session = action.payload;
    },
    otpVerify: (state, action: PayloadAction<Partial<string>>) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.session = action.payload;
      const seconds = action.payload.expiresIn ?? 0;
      state.expiresAt = Date.now() + seconds * 1000;
      state.error = {} as any;
      state.loading = false;
      state.isLoggedIn = true;
      state.isFirstLogin = true;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetFirstLogin: (state) => {
      state.isFirstLogin = false;
    },
    resetLoading: (state) => {
      state.loading = false;
    },
    logout: () => {
      return initialState;
    },
    refreshToken: (state, action) => {
      state.session = action.payload;
      const seconds = action.payload.expiresIn ?? 0;
      state.expiresAt = Date.now() + seconds * 1000;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    syncAuthState: (state, action: PayloadAction<Partial<AuthState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Actions
export const authActions = {
  loginRequest: createAction(`${authSlice.name}/loginRequest`, (params: Types.Login) => ({
    payload: params,
  })),
  loginGoogleRequest: createAction(`${authSlice.name}/loginGoogleRequest`, (params: string) => ({
    payload: params,
  })),
  loginFBRequest: createAction(`${authSlice.name}/loginFBRequest`, (params: string) => ({
    payload: params,
  })),
  loginSuccess: authSlice.actions.loginSuccess,
  otpRequest: authSlice.actions.otpRequest,
  otpVerify: authSlice.actions.otpVerify,
  loginFailure: authSlice.actions.loginFailure,
  logout: authSlice.actions.logout,
  resetFirstLogin: authSlice.actions.resetFirstLogin,
  resetLoading: authSlice.actions.resetLoading,
  setErrorMessage: authSlice.actions.setErrorMessage,
  refreshToken: authSlice.actions.refreshToken,
  syncAuthState: authSlice.actions.syncAuthState,
};

// Selectors
export const selectAuthLoggingIn = (state: RootState) => state.auth.loading;
export const selectAuthLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthOTPRequest = (state: RootState) => state.auth.otpRequest;
export const selectAuthSession = (state: RootState) => state.auth.session;
export const selectAuthExpiresAt = (state: RootState) => state.auth.expiresAt;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthFirstLogin = (state: RootState) => state.auth.isFirstLogin;

export const selectAuthLogInFailed = createSelector(
  (state: RootState) => state.auth.error,
  (error) => (typeof error === "object" ? error?.message : error),
);
export const selectErrorMessage = createSelector(
  (state: RootState) => state.auth.errorMessage,
  (error) => (typeof error === "object" ? error?.message : error),
);

export const selectedErrorCode = createSelector(
  (state: RootState) => state.auth.error,
  (error) => (typeof error === "object" ? error?.code : error),
);

export const selectedEmailVerificationUserId = createSelector(
  (state: RootState) => state.auth.error,
  (error) => (typeof error === "object" ? error?.details?.userId : error),
);

export const selectedAuthToken = createSelector(
  (state: RootState) => state.auth.session,
  (session) => session?.accessToken,
);

export const selectedAuthRefreshToken = createSelector(
  (state: RootState) => state.auth.session,
  (session) => session?.refreshToken,
);

// Reducer
export default authSlice.reducer;
