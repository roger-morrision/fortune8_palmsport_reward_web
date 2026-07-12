import { SagaIterator } from "@redux-saga/core";
import { router } from "expo-router";
import * as Location from "expo-location";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { authActions, selectAuthLoginInput, selectAuthSession } from "../slices/auth.slice";
import { forgotActions } from "../slices/forgot.slice";
import { userActions } from "../slices/user.slice";
import { apiClient } from "@/src/api/client";
import { AuthService } from "@/src/api/services/auth.service";
import * as Types from "@/src/store/types";
import { UserService } from "@/src/api/services/user.service";
import { lobbyActions } from "../slices/lobby.slice";

function* handleSignin(): SagaIterator {
  try {
    const loginInput = yield select(selectAuthLoginInput);
    const { status } = yield call(Location.requestForegroundPermissionsAsync);
    const payload = {
      username: loginInput.email,
      password: loginInput.password,
    } as Types.Login;

    if (status === "granted") {
      const location = yield call(Location.getCurrentPositionAsync, {
        accuracy: Location.Accuracy.Highest,
      });

      payload.latitude = location.coords.latitude;
      payload.longitude = location.coords.longitude;
      payload.accuracy = location.coords.accuracy;
    }
    yield call(AuthService.login, {params: payload});

    yield put(authActions.otpRequest({email: loginInput.email}));
  } catch (error: any) {
    yield put(authActions.loginFailure(error));
    yield put(authActions.setErrorMessage(error?.message));
  }
}

function* handleOTPVerify(action: { type: string; payload: string }): SagaIterator {
  try {
    const payload = action.payload;
    const auth = yield select(selectAuthSession);

    const session = yield call(AuthService.otpVerify, { email: auth?.email, otpCode: payload});

    yield put(authActions.loginSuccess(session));
  } catch (error: any) {
    yield put(authActions.loginFailure(error));
    yield put(authActions.setErrorMessage(error?.message));
  }
}

function* handleSignInWithGoogle(action: { type: string; payload: string }): SagaIterator {
  try {
    const params = {
      socialProvider: "GOOGLE",
      token: action.payload,
    } as any;
    const { status } = yield call(Location.requestForegroundPermissionsAsync);

    if (status === "granted") {
      const location = yield call(Location.getCurrentPositionAsync, {
        accuracy: Location.Accuracy.Highest,
      });

      params.latitude = location.coords.latitude;
      params.longitude = location.coords.longitude;
      params.accuracy = location.coords.accuracy;
    }

    const session = yield call(AuthService.social, params);

    yield put(authActions.loginSuccess(session));
  } catch (error: any) {
    console.log("errorerror", error);
    yield put(authActions.loginFailure(error?.error ?? error));

    if (error?.code === "INCOMPLETE_PROFILE") {
      router.replace("/(modal)/auth/complete-signup");
      return;
    }

    const message = error.message || error?.error?.message || "Something went wrong";
    yield put(authActions.setErrorMessage(message));
  }
}

function* handleSignInWithFacebook(action: { type: string; payload: string }): SagaIterator {
  try {
    const params = {
      socialProvider: "FACEBOOK",
      token: action.payload,
    } as any;
    const { status } = yield call(Location.requestForegroundPermissionsAsync);

    if (status === "granted") {
      const location = yield call(Location.getCurrentPositionAsync, {
        accuracy: Location.Accuracy.Highest,
      });

      params.latitude = location.coords.latitude;
      params.longitude = location.coords.longitude;
      params.accuracy = location.coords.accuracy;
    }

    const session = yield call(AuthService.social, params);

    yield put(authActions.loginSuccess(session));
  } catch (error: any) {
    console.log("errorerror", error);
    yield put(authActions.loginFailure(error?.error ?? error));

    if (error?.code === "INCOMPLETE_PROFILE") {
      router.replace("/(modal)/auth/complete-signup");
      return;
    }

    const message = error.message || error?.error?.message || "Something went wrong";
    yield put(authActions.setErrorMessage(message));
  }
}

function* handleForgotpassword(action: { type: string; payload: string }): SagaIterator {
  try {
    const result = yield call(UserService.forgot, action.payload);

    yield put(forgotActions.forgotSuccess({ ...result.data, email: action.payload }));
  } catch (error: any) {
    let message = error?.error?.message ?? "Something went wrong";
    message = message.replace("Invalid User/Email or Password", "Invalid email address");
    yield put(forgotActions.forgotFailed(message));
    yield put(authActions.setErrorMessage(message));
  }
}

function* handleResetpassword(action: {
  type: string;
  payload: Types.ResetPasswordInput;
}): SagaIterator {
  try {
    const user = yield call(UserService.resetPassword, action.payload);

    yield put(forgotActions.resetSuccess(user.data));
  } catch (error: any) {
    const message = error?.error?.message ?? "Something went wrong";

    yield put(forgotActions.resetFailed({ message: message }));
    yield put(authActions.setErrorMessage(message));
  }
}

function* handleLogout(): SagaIterator {
  yield put(userActions.resetUserDetails());
  yield put(lobbyActions.logout());
}

function* handleLoginSuccess(action: { type: string; payload: any }): SagaIterator {
  const { accessToken, refreshToken } = action.payload ?? {};
  if (accessToken) {
    apiClient.setTokens(accessToken, refreshToken);
  }
}

// Watcher Saga
function* authWatcherSaga(): SagaIterator {
  yield takeEvery(authActions.loginSuccess.type, handleLoginSuccess);
  yield takeEvery(authActions.refreshToken.type, handleLoginSuccess);
  yield takeEvery(authActions.loginRequest.type, handleSignin);
  yield takeEvery(authActions.otpVerify.type, handleOTPVerify);
  yield takeEvery(authActions.loginGoogleRequest.type, handleSignInWithGoogle);
  yield takeEvery(authActions.loginFBRequest.type, handleSignInWithFacebook);
  yield takeEvery(forgotActions.forgotRequest.type, handleForgotpassword);
  yield takeEvery(forgotActions.resetRequest.type, handleResetpassword);
  yield takeEvery(authActions.logout.type, handleLogout);
}

export default authWatcherSaga;
