import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import transactionSlice from "./transactionSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "redux";

// Combine all reducers
const rootReducer = combineReducers({
  user: userSlice,
  tran: transactionSlice,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "tran"], // only persist these slices
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
