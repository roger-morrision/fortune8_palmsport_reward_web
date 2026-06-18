import useAppDispatch from "@/src/common/hooks/useAppDispatch";
import { useCallback } from "react";

// Types
import { settingsActions, Theme } from "../slices/settings.slice";

type SettingServiceOperators = {
  updateTheme: (params: Theme) => void;
  updatePopupOffers: (params: boolean) => void;
  checkingGeoLocationRequest: () => void;
};

export const useSettingService = (): Readonly<SettingServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    updateTheme: useCallback((theme) => dispatch(settingsActions.updateTheme(theme)), [dispatch]),
    updatePopupOffers: useCallback(
      (value) => dispatch(settingsActions.updateOffers(value)),
      [dispatch],
    ),
    checkingGeoLocationRequest: useCallback(
      () => dispatch(settingsActions.checkingGeoLocationRequest()),
      [dispatch],
    ),
  };
};

export default useSettingService;
