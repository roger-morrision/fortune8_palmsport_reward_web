// store/sagas/idleSagas.ts
import { sleep } from "@/src/common/utils/validation-helper";
import { eventChannel, SagaIterator } from "redux-saga";
import { call, cancel, fork, put, race, select, take, takeLatest } from "redux-saga/effects";
import { authActions } from "../slices/auth.slice";
import { selecedtUserIdle, userActions } from "../slices/user.slice";

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 min idle timeout

function createActivityChannel() {
  return eventChannel((emit) => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    const activityHandler = () => emit(Date.now());

    events.forEach((event) => window.addEventListener(event, activityHandler));

    return () => {
      events.forEach((event) => window.removeEventListener(event, activityHandler));
    };
  });
}

function* idleWatcher(): SagaIterator {
  const activityChannel = yield call(createActivityChannel);

  try {
    while (true) {
      // User activity happened
      yield take(activityChannel);

      // Check if currently idle
      const isIdle = yield select(selecedtUserIdle);
      if (isIdle) {
        yield put(userActions.setIdle(false)); // Only dispatch if idle before
      }

      // Race: either timeout or new activity
      const to: any = sleep(IDLE_TIMEOUT);
      const { timeout } = yield race({
        timeout: to,
        activity: take(activityChannel),
      });

      if (timeout) {
        yield put(userActions.setIdle(true)); // user is active
      }
    }
  } finally {
    activityChannel.close();
  }
}

// Starts idle watcher only after login, stops on logout
function* startIdleWatcher(): SagaIterator {
  const task = yield fork(idleWatcher);

  // Stop idle watcher on logout
  yield take(authActions.logout.type);
  yield cancel(task);
}

export function* idleRootSaga() {
  // Start/stop watcher when login/logout
  yield takeLatest(userActions.fetchUserDetails.type, startIdleWatcher);
}

export default idleRootSaga;
