// redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import productSlice from "./productSlice.js";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Import your custom storage instead
import customStorage from "./customStorage.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage: customStorage, // Use custom storage
};

const rootReducer = combineReducers({
  user: userSlice,
  product: productSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
