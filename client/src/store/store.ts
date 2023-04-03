import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth";
import ProductsReducer from "./products"


export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    products: ProductsReducer,
  
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
