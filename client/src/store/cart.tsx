import { createSlice } from "@reduxjs/toolkit";
import { OrderType, ProductsType } from "../helper";
const initialState = {
  products:[] as Array<ProductsType>,
  order: localStorage.getItem("order") === undefined ||
  localStorage.getItem("order") === null
    ? []
    : (JSON.parse(localStorage.getItem("order") as string)
    ).order  as Array<OrderType>,
};

export const Cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
   orderProducts:(state, action) =>{
    state.products = action.payload
   },
   orderProduct: (state, action) => {
   const productToAdd = state.products.find(
      (el) => el.id === action.payload.id
    );
    if (productToAdd) {
      const existingProductIndex = state.order.findIndex(
        (el) => el.id === productToAdd.id
      );
      if (existingProductIndex >= 0) {
        state.order[existingProductIndex].count = action.payload.count;
      } else {
        state.order.push({ ...productToAdd, count: action.payload.count });
      }
      localStorage.setItem("order", JSON.stringify({ order: state.order }));
    }
   },
   changeCountProduct: (state, action) => {
      state.order = state.order.map((el)=>{
         if (el.id === action.payload.id) {
            return { ...el, count: parseInt(action.payload.count) };
          } else {
            return el;
          }
         })
         localStorage.setItem("order", JSON.stringify({ order: state.order }));
      },
    removeOrder: (state, action) => {
      state.order = state.order.filter((el) => el.id !== action.payload);
      localStorage.setItem("order", JSON.stringify({ order: state.order }));
    },
  },
});
export const { orderProduct, orderProducts, removeOrder, changeCountProduct } = Cart.actions;
export default Cart.reducer;
