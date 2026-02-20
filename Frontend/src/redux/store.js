// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice.js";

// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//   },
// });



// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice.js";

// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };
// const rootReducer = combineReducers({
//   user: userSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export default store;

// redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";

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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);