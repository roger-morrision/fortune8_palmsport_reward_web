import { PERSIST, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NODE_ENVIRONMENT } from "@/src/constants/Config";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { Platform } from "react-native";
import rootReducer from "./reducer";
import logger from "redux-logger";
import rootSaga from "./sagas";

const createSagaMiddleware = require("redux-saga").default;

const persistConfig = {
  key: `rewards.palmsplay.com-${NODE_ENVIRONMENT}`,
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
