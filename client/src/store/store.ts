import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth";
import ProductsReducer from "./products"
import CartReducer from "./cart"


export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    products: ProductsReducer,
    cart: CartReducer,
  
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
