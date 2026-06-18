import { EventChannel, eventChannel } from "redux-saga";
import { call, put, take } from "redux-saga/effects";
import { authActions } from "../slices/auth.slice";
import { sleep } from "@/src/common/utils/validation-helper";
interface PersistedState {
  auth?: {
    isLoggedIn?: boolean;
    session?: {
      id?: string;
      accessToken?: string;
    };
  };
}

// Helper: safely parse persisted data
const parsePersistedAuth = (): PersistedState["auth"] | null => {
  try {
    const persisted = localStorage.getItem("persist:gambly.casino");
    if (!persisted) return null;
    const parsed = JSON.parse(persisted);
    if (!parsed.auth) return null;

    // The auth slice may be double-stringified by redux-persist
    const authData = JSON.parse(parsed.auth);
    return authData;
  } catch (error) {
    console.warn("Failed to parse persisted auth", error);
    return null;
  }
};

// Create event channel to listen to storage changes
function createPersistStorageChannel(): EventChannel<StorageEvent> {
  return eventChannel((emit) => {
    const handler = (event: StorageEvent) => {
      if (event.key === "persist:gambly.casino") emit(event);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  });
}

const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

// Watcher Saga to keep auth state synced across tabs
function* watchPersistSync() {
  const channel: EventChannel<StorageEvent> = yield call(createPersistStorageChannel);
  let previousAuth = parsePersistedAuth();

  while (true) {
    yield take(channel);

    // Debounce bursts of writes (redux-persist can fire 3–4x)
    yield call(sleep, 250);

    const newAuth = parsePersistedAuth();
    if (!newAuth) continue;

    const changed = !isEqual(previousAuth?.isLoggedIn, newAuth?.isLoggedIn);
    if (changed) {
      yield put(authActions.syncAuthState(newAuth));
      previousAuth = newAuth;
    }
  }
}

export default watchPersistSync;
