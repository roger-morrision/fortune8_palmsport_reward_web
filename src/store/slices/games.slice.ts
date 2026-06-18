// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type GameCategory =
  | "LOBBY"
  | "TOP"
  | "NEW"
  | "TABLE"
  | "INSTANT"
  | "ARCADE"
  | "SLOTS"
  | "PUZZLE"
  | "FEATURE"
  | "FAVORITES";

export interface InitialState {
  games: any[];
  gameCategory: GameCategory;
  enableGoldGames: boolean;
  featuredList: any[];
  favouriteList: any[];
  fetchingGames: boolean;
  fetchGamesCompleted: boolean;
  categoriesAvailability: any[];
  fetchingFavouriteGames: boolean;
}

export const initialState = {
  games: [] as any,
  fetchingGames: false,
  gameCategory: "LOBBY",
  enableGoldGames: false,
  featuredList: [] as any,
  favouriteList: [] as any,
  fetchGamesCompleted: false,
  categoriesAvailability: [],
  fetchingFavouriteGames: false,
} as InitialState;

// Slice
export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    fetchGoldGames: (state, action) => {
      state.enableGoldGames = action.payload;
      state.games = [];
      state.fetchingGames = true;
      state.fetchGamesCompleted = false;
    },
    fetchingGames: (state, action) => {
      state.games = [];
      state.fetchingGames = true;
      state.fetchGamesCompleted = false;
      state.gameCategory = action.payload;
    },
    fetchedGames: (state, action) => {
      state.games = action.payload;
      state.fetchingGames = false;
      state.fetchGamesCompleted = true;
    },
    fetchingGamesFailed: (state) => {
      state.fetchingGames = false;
      state.fetchGamesCompleted = false;
    },
    fetchedFeatureGames: (state, action) => {
      state.featuredList = action.payload;
    },
    fetchedCategoryAvailability: (state, action) => {
      state.categoriesAvailability = action.payload;
    },
    fetchFavouriteGames: (state) => {
      state.fetchingFavouriteGames = true;
    },
    favouriteGames: (state, action) => {
      state.fetchingFavouriteGames = false;
      state.favouriteList = action.payload;
    },
  },
});

// Actions
export const gamesActions = {
  fetchGoldGames: gamesSlice.actions.fetchGoldGames,
  fetchingGames: gamesSlice.actions.fetchingGames,
  fetchedGames: gamesSlice.actions.fetchedGames,
  fetchingGamesFailed: gamesSlice.actions.fetchingGamesFailed,
  fetchedFeatureGames: gamesSlice.actions.fetchedFeatureGames,
  fetchedCategoryAvailability: gamesSlice.actions.fetchedCategoryAvailability,
  addFavouriteGames: createAction(`${gamesSlice.name}/addFavouriteGames`, (params: any) => ({
    payload: params,
  })),
  fetchFavouriteGames: createAction(`${gamesSlice.name}/fetchFavouriteGames`),
  favouriteGames: gamesSlice.actions.favouriteGames,
};

// Selectors
export const selectedFetchingGames = (state: RootState) => state.games.fetchingGames;
export const selectedFetchGamesCompleted = (state: RootState) => state.games.fetchGamesCompleted;
export const selectedFetchGames = (state: RootState) => state.games.games;
export const selectedGameCategory = (state: RootState) => state.games.gameCategory;
export const selectedEnableGoldGames = (state: RootState) => state.games.enableGoldGames;
export const selectedFeatureGames = (state: RootState) => state.games.featuredList;
export const selectedCategoryAvailability = (state: RootState) =>
  state.games.categoriesAvailability;
export const selectedFetchingFavouriteGames = (state: RootState) =>
  state.games.fetchingFavouriteGames;
export const selectedFavouriteGames = (state: RootState) => state.games.favouriteList;

// Reducer
export default gamesSlice.reducer;
