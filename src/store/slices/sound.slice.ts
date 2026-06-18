// DUCKS pattern
import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface StateValue {
  background: {
    soundEnabled: boolean;
    soundPlaying: boolean;
  };
}

export const initialState: StateValue = {
  background: {
    soundEnabled: true,
    soundPlaying: false,
  },
} as StateValue;

// Slice
export const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    bgsoundEnable: (state) => {
      state.background.soundEnabled = true;
      state.background.soundPlaying = true;
    },
    bgsoundDisable: (state) => {
      state.background.soundEnabled = false;
      state.background.soundPlaying = false;
    },
    bgsoundPlay: (state) => {
      state.background.soundPlaying = true;
    },
    bgsoundPause: (state) => {
      state.background.soundPlaying = false;
    },
  },
});

// Actions
export const soundActions = {
  bgsoundEnable: createAction(`${soundSlice.name}/bgsoundEnable`),
  bgsoundDisable: createAction(`${soundSlice.name}/bgsoundDisable`),
  bgsoundPlay: createAction(`${soundSlice.name}/bgsoundPlay`),
  bgsoundPause: createAction(`${soundSlice.name}/bgsoundPause`),
  clickSoundToggle: createAction(`${soundSlice.name}/clickSoundToggle`),
  claimSoundToggle: createAction(`${soundSlice.name}/claimSoundToggle`),
  rewardSoundToggle: createAction(`${soundSlice.name}/rewardSoundToggle`),

  goldenBallIntroToggle: createAction(`${soundSlice.name}/goldenBallIntroToggle`),
  goldenBallOpeningChestToggle: createAction(`${soundSlice.name}/goldenBallOpeningChestToggle`),
  unloadGoldenBallSound: createAction(`${soundSlice.name}/unloadGoldenBallSound`),

  promotionSoundToggle: createAction(`${soundSlice.name}/promotionSoundToggle`, (params: any) => ({
    payload: params,
  })),
  unloadPromotionSound: createAction(`${soundSlice.name}/unloadPromotionSound`),
};

// Selectors

export const selectSoundEnabled = createSelector(
  (state: RootState) => state.sound.background,
  (background) => background.soundEnabled,
);
export const selectSoundPlaying = createSelector(
  (state: RootState) => state.sound.background,
  (background) => background.soundPlaying,
);

// Reducer
export default soundSlice.reducer;
