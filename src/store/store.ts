import { NODE_ENVIRONMENT } from "@/src/constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import logger from "redux-logger";
import { PERSIST, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer";
import rootSaga from "./sagas";

const createSagaMiddleware = require("redux-saga").default;

const persistConfig = {
  key: `rewards.gambly.casino-${NODE_ENVIRONMENT}`,
  storage: Platform.OS === "web" ? storage : AsyncStorage,
  whitelist: ["auth", "sound", "settings", "lobby"],
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
