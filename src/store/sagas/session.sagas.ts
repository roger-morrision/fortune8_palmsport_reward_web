/* eslint-disable @typescript-eslint/no-unused-vars */
import { sleep } from "@/src/common/utils/validation-helper";
import { SagaIterator } from "redux-saga";
import { call, cancel, cancelled, fork, put, select, take } from "redux-saga/effects";
import { authActions, selectAuthExpiresIn, selectedAuthRefreshToken } from "../slices/auth.slice";
import { selecedtUserIdle, userActions } from "../slices/user.slice";
import { AuthService } from "@/src/api/services/auth.service";

function* refreshTokenWorker(): SagaIterator {
  try {
    const refreshtoken = yield select(selectedAuthRefreshToken);

    // Make an API call to refresh the token
    const result = yield call(AuthService.refreshToken, refreshtoken);

    // Dispatch an action to update the token in the Redux store
    yield put(authActions.refreshToken(result)); // Replace 'UPDATE_TOKEN' with your actual action type
  } catch (error: any) {
    yield put(authActions.logout());
    yield put(authActions.setErrorMessage("Session Expired"));
  }
}

function* countdownLoop(): SagaIterator {
  try {
    while (true) {
      const isIdle = yield select(selecedtUserIdle);
      const expiresIn = yield select(selectAuthExpiresIn);
      const refreshtoken = yield select(selectedAuthRefreshToken);

      // Stop if no session
      if (!refreshtoken) break;

      if (!isIdle) {
        if (expiresIn > 600) {
          yield call(sleep, 1000); // check every minute
          yield put(authActions.tickExpiresIn());
        } else {
          yield call(refreshTokenWorker);
        }
      } else {
        yield call(sleep, 1000); // check every minute
      }
    }
  } finally {
    if (yield cancelled()) {
      console.log("Countdown loop cancelled");
    }
  }
}

export default function* authSessionSaga(): SagaIterator {
  let task;

  while (true) {
    const action = yield take([authActions.logout.type, userActions.fetchUserDetails.type]);

    if (action.type === "user/fetchUserDetails") {
      if (task) yield cancel(task);
      task = yield fork(countdownLoop);
    } else if (action.type === "auth/logout") {
      if (task) yield cancel(task);
    }
  }
}
