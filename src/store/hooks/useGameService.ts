import useAppDispatch from "@/src/common/hooks/useAppDispatch";
import { useCallback } from "react";
import { gamesActions } from "../slices/games.slice";

type ServiceOperators = {
  onCategoryChange: (value: number | string) => void;
  onCurrencyChange: (value: boolean) => void;
  addFavouriteGames: (value: any) => void;
  fetchFavouriteGames: () => void;
};

export const useGameService = (): Readonly<ServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    onCategoryChange: useCallback((id) => dispatch(gamesActions.fetchingGames(id)), [dispatch]),
    onCurrencyChange: useCallback(
      (value) => dispatch(gamesActions.fetchGoldGames(value)),
      [dispatch],
    ),
    addFavouriteGames: useCallback(
      (item) => dispatch(gamesActions.addFavouriteGames(item)),
      [dispatch],
    ),
    fetchFavouriteGames: useCallback(
      () => dispatch(gamesActions.fetchFavouriteGames()),
      [dispatch],
    ),
  };
};

export default useGameService;
