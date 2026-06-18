// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define the possible themes as 'dark', 'light', or 'auto'
export type Theme = "dark" | "light";

export type SettingsState = {
  theme: Theme;
  popupOffers: boolean;
  geoLocationAllowed: boolean;
};

export const themes: Theme[] = ["dark", "light"];

const initialState: SettingsState = {
  theme: themes[0], // Default theme is 'auto'
  popupOffers: true,
  geoLocationAllowed: true,
};

// Slice
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateTheme(state, { payload }: { payload: Theme }) {
      state.theme = payload;
    },
    updateOffers(state, { payload }: { payload: boolean }) {
      state.popupOffers = payload;
    },
    updateGeoLocationStatus(state, { payload }: { payload: boolean }) {
      state.geoLocationAllowed = payload;
    },
  },
});

// Actions
export const settingsActions = {
  updateTheme: settingsSlice.actions.updateTheme,
  updateOffers: settingsSlice.actions.updateOffers,
  updateGeoLocationStatus: settingsSlice.actions.updateGeoLocationStatus,
  checkingGeoLocationRequest: createAction(`${settingsSlice.name}/checkingGeoLocationRequest`),
};

// Selectors
export const selectedTheme = (state: RootState) => state.settings.theme as Theme;
export const selectedPopupOffers = (state: RootState) => state.settings.popupOffers as boolean;
export const selectedGeoLocationStatus = (state: RootState) =>
  state.settings.geoLocationAllowed as boolean;

// Reducer
export default settingsSlice.reducer;
