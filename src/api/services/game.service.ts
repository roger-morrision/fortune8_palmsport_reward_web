import * as Types from "@/src/store/types";
import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const GameService = {
  url: (payload: Types.GameMode) => apiClient.get(API_ENDPOINTS.GAME.URL(payload)),
  games: (payload: string) => apiClient.get(API_ENDPOINTS.GAME.GAMES(payload)),
  featureGames: (payload: string) => apiClient.get(API_ENDPOINTS.GAME.FEATURE_GAMES(payload)),
  favouriteGames: (payload: string) => apiClient.get(API_ENDPOINTS.GAME.FAVOURITE_GAMES(payload)),
  saveFavouriteGame: (payload: Types.Favourite) =>
    apiClient.post(API_ENDPOINTS.GAME.SAVE_FAVOURITE_GAME, payload),
  deleteFavouriteGame: (payload: Types.Favourite) =>
    apiClient.post(API_ENDPOINTS.GAME.DELETE_FAVOURITE_GAME, payload),
};
