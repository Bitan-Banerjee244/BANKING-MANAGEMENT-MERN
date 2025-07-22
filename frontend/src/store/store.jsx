import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import transactionSlice from "./transactionSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    tran: transactionSlice,
  },
});

export default store;
