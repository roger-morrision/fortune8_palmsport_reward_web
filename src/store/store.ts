import { PERSIST, REGISTER, REHYDRATE, createMigrate, persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NODE_ENVIRONMENT } from "@/src/constants/Config";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { Platform } from "react-native";
import rootReducer from "./reducer";
import logger from "redux-logger";
import rootSaga from "./sagas";
import { initialState as authInitialState } from "./slices/auth.slice";

const createSagaMiddleware = require("redux-saga").default;

// Bump version when slice shapes change to wipe stale persisted state.
// Version 1 → 2: reset auth.loginInput after shape change.
const migrations: any = {
  2: (state: any) => ({
    ...state,
    auth: { ...authInitialState, ...state.auth, loginInput: authInitialState.loginInput },
  }),
};

const persistConfig = {
  key: `rewards.palmsplay.com-${NODE_ENVIRONMENT}`,
  version: 2,
  storage: Platform.OS === "web" ? storage : AsyncStorage,
  whitelist: ["auth", "sound", "settings", "lobby"],
  migrate: createMigrate(migrations, { debug: false }),
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST, REGISTER],
      },
    }).concat(sagaMiddleware);

    if (NODE_ENVIRONMENT === "development") {
      return defaultMiddleware.concat(logger);
    }

    return defaultMiddleware;
  },
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
