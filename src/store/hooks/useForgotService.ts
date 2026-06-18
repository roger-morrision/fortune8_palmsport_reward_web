import { useCallback } from "react";
import useAppDispatch from "@/src/common/hooks/useAppDispatch";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import {
  forgotActions,
  selectForgotLoad,
  selectForgotFailed,
  selectForgotSuccess,
  selectResetSuccess,
} from "../slices/forgot.slice";

// Types
import * as Types from "../types";

type ServiceOperators = {
  failed: Types.ErrorValue;
  isLoading: boolean;
  resetSuccess: boolean;
  forgotSuccess: boolean;
  onForgot: (email: string) => void;
  onReset: (email: Types.ResetPasswordInput) => void;
};

export const useForgotService = (): Readonly<ServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    failed: useAppSelector(selectForgotFailed),
    isLoading: useAppSelector(selectForgotLoad),
    forgotSuccess: useAppSelector(selectForgotSuccess),
    resetSuccess: useAppSelector(selectResetSuccess),
    onForgot: useCallback(
      (email) => {
        dispatch(forgotActions.forgotRequest(email));
      },
      [dispatch],
    ),
    onReset: useCallback(
      (params: Types.ResetPasswordInput) => {
        dispatch(forgotActions.resetRequest(params));
      },
      [dispatch],
    ),
  };
};

export default useForgotService;
