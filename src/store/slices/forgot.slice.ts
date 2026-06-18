// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ErrorValue, ForgotValue, ResetPasswordInput } from "../types";

export interface StateValue {
  loading: boolean;
  data: ForgotValue;
  forgotSuccess: boolean;
  resetSuccess: boolean;
  error: ErrorValue;
}

export const initialState: StateValue = {
  loading: false,
  data: {} as ForgotValue,
  forgotSuccess: false,
  resetSuccess: false,
  error: {} as ErrorValue,
};

// Slice
export const forgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
    forgotRequest: (state) => {
      state.loading = true;
      state.forgotSuccess = false;
      state.error = {} as ErrorValue;
    },
    forgotSuccess: (state, action) => {
      state.data = action.payload;
      state.error = {} as ErrorValue;
      state.forgotSuccess = true;
      state.loading = false;
    },
    forgotFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.data = {} as ForgotValue;
      state.forgotSuccess = false;
    },

    resetRequest: (state) => {
      state.loading = true;
      state.resetSuccess = false;
      state.error = {} as ErrorValue;
    },
    resetSuccess: (state, action) => {
      state.data = action.payload;
      state.error = {} as ErrorValue;
      state.resetSuccess = true;
      state.loading = false;
    },
    resetFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.resetSuccess = false;
    },
  },
});

// Actions
export const forgotActions = {
  forgotRequest: createAction(`${forgotSlice.name}/forgotRequest`, (email: string) => ({
    payload: email,
  })),
  forgotSuccess: forgotSlice.actions.forgotSuccess,
  forgotFailed: forgotSlice.actions.forgotFailed,

  resetRequest: createAction(`${forgotSlice.name}/resetRequest`, (params: ResetPasswordInput) => ({
    payload: params,
  })),
  resetSuccess: forgotSlice.actions.resetSuccess,
  resetFailed: forgotSlice.actions.resetFailed,
};

// Selectors
export const selectForgotLoad = (state: RootState) => state.forgot.loading;
export const selectForgotFailed = (state: RootState) => state.forgot.error;
export const selectForgotData = (state: RootState) => state.forgot.data;
export const selectResetPasswordSuccess = (state: RootState) => state.forgot.resetSuccess;
export const selectForgotSuccess = (state: RootState) => state.forgot.forgotSuccess;
export const selectResetSuccess = (state: RootState) => state.forgot.resetSuccess;

// Reducer
export default forgotSlice.reducer;
