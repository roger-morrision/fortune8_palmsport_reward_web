// DUCKS pattern
import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import * as Types from "../types";

export interface SignupState {
  loading: boolean;
  signupSuccess: boolean;
  signupData: any;
  error: Types.ErrorValue;
}

export const initialState: SignupState = {
  loading: false,
  signupSuccess: false,
  signupData: {},
  error: {} as Types.ErrorValue,
};

// Slice
export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.loading = true;
      state.error = {} as Types.ErrorValue;
    },
    signupSuccess: (state, action) => {
      state.signupSuccess = true;
      state.signupData = action.payload;
      state.error = {} as Types.ErrorValue;
      state.loading = false;
    },
    signupFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.signupSuccess = false;
    },
  },
});

// Actions
export const signupActions = {
  signupRequest: createAction(`${signupSlice.name}/signupRequest`, (params: Types.Signup) => ({
    payload: params,
  })),
  signupSuccess: signupSlice.actions.signupSuccess,
  signupFailure: signupSlice.actions.signupFailure,
};

// Selectors
export const selectedSigningIn = (state: RootState) => state.signup.loading;
export const selectedSigningFailed = (state: RootState) => state.signup.error;
export const selectedSigningSuccess = (state: RootState) => state.signup.signupSuccess;
export const selectedSigningDataID = createSelector(
  (state: RootState) => state.signup.signupData,
  (session) => session.id,
);

export const selectedSignupErrorMessage = createSelector(
  (state: RootState) => state.signup.error,
  (error) => error.message,
);

export const selectedSignupErrorCode = createSelector(
  (state: RootState) => state.signup.error,
  (error) => error?.code,
);

// Reducer
export default signupSlice.reducer;
