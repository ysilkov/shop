import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});