import useAppDispatch from "@/src/common/hooks/useAppDispatch";
import { useCallback } from "react";
import { lobbyActions } from "../slices/lobby.slice";
import { userActions } from "../slices/user.slice";
import { notificationActions } from "../slices/notification.slice";
import { KYCValue } from "../types";

type ServiceOperators = {
  onLobbyRequest: () => void;
  onUpdateWallet: (payload?: any) => void;
  onWalletAnimation: (value: boolean) => void;
  onReadAllNotification: () => void;
  onKYCInputUpdate: (type: keyof KYCValue) => (value: KYCValue[typeof type]) => void;
  onClearKYCInput: () => void;
  onKYCRequest: (value: any) => void;
};

export const useLobbyService = (): Readonly<ServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    onLobbyRequest: useCallback(() => dispatch(lobbyActions.lobbyRequest()), [dispatch]),
    onUpdateWallet: useCallback(
      (payload) => dispatch(userActions.mergeWallet(payload)),
      [dispatch],
    ),
    onWalletAnimation: useCallback(
      (value) => dispatch(userActions.walletAnimation(value)),
      [dispatch],
    ),
    onReadAllNotification: useCallback(
      () => dispatch(notificationActions.readAllNotifications()),
      [dispatch],
    ),
    onKYCInputUpdate: useCallback(
      (type: keyof KYCValue) => (value: KYCValue[typeof type]) => {
        dispatch(lobbyActions.kycInputs({ type, value }));
      },
      [dispatch],
    ),
    onClearKYCInput: useCallback(() => dispatch(lobbyActions.clearKYCInputs()), [dispatch]),
    onKYCRequest: useCallback((value) => dispatch(lobbyActions.kycRequest(value)), [dispatch]),
  };
};

export default useLobbyService;
