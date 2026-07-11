import { useCallback } from "react";
import { authActions } from "../slices/auth.slice";

// Types
import useAppDispatch from "@/src/common/hooks/useAppDispatch";
import { signupActions } from "../slices/signup.slice";
import * as Types from "@/src/store/types";

type AuthServiceOperators = {
  login: () => void;
  signup: (params: Types.Signup) => void;
  logout: () => void;
  signWithGoogle: (params: string) => void;
  signWithFacebook: (params: string) => void;
  resetFirstLogin: () => void;
};

export const useAuthService = (): Readonly<AuthServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    login: useCallback(() => dispatch(authActions.loginRequest()), [dispatch]),
    signup: useCallback((params) => dispatch(signupActions.signupRequest(params)), [dispatch]),
    signWithGoogle: useCallback(
      (params) => dispatch(authActions.loginGoogleRequest(params)),
      [dispatch],
    ),
    signWithFacebook: useCallback(
      (params) => dispatch(authActions.loginFBRequest(params)),
      [dispatch],
    ),
    resetFirstLogin: useCallback(() => dispatch(authActions.resetFirstLogin()), [dispatch]),
    logout: useCallback(() => dispatch(authActions.logout()), [dispatch]),
  };
};

export default useAuthService;
