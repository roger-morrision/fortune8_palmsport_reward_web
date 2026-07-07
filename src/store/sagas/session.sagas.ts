import { sleep } from "@/src/common/utils/validation-helper";
import { SagaIterator } from "redux-saga";
import { call, cancel, cancelled, fork, put, select, take } from "redux-saga/effects";
import {
  authActions,
  selectAuthExpiresAt,
  selectAuthLoggedIn,
  selectedAuthRefreshToken,
} from "../slices/auth.slice";
import { selecedtUserIdle, userActions } from "../slices/user.slice";
import { AuthService } from "@/src/api/services/auth.service";

// How often the loop wakes up to re-check idle/logged-in state and whether
// it's time to refresh. Cheap to check, so this can stay short without the
// per-second Redux dispatch the old tickExpiresIn-based loop used.
const RECHECK_INTERVAL_MS = 30 * 1000;
// Refresh proactively once we're within this many ms of the real expiry,
// computed from the absolute `expiresAt` timestamp rather than a ticking
// counter so it stays correct across idle periods and app restarts.
const REFRESH_BUFFER_MS = 10 * 60 * 1000;

function* refreshTokenWorker(): SagaIterator {
  try {
    const refreshtoken = yield select(selectedAuthRefreshToken);

    // Make an API call to refresh the token
    const result = yield call(AuthService.refreshToken, refreshtoken);

    // Dispatch an action to update the token in the Redux store
    yield put(authActions.refreshToken(result));
  } catch (error) {
    yield put(authActions.logout());
    yield put(authActions.setErrorMessage("Session Expired"));
  }
}

function* countdownLoop(): SagaIterator {
  try {
    while (true) {
      const isLoggedIn = yield select(selectAuthLoggedIn);
      const refreshtoken = yield select(selectedAuthRefreshToken);

      // Stop if no session
      if (!isLoggedIn) break;
      if (!refreshtoken) break;

      const isIdle = yield select(selecedtUserIdle);

      if (!isIdle) {
        const expiresAt = yield select(selectAuthExpiresAt);

        if (Date.now() >= expiresAt - REFRESH_BUFFER_MS) {
          yield call(refreshTokenWorker);
          continue;
        }
      }

      yield call(sleep, RECHECK_INTERVAL_MS);
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
