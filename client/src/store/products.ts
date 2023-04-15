import { createSlice } from "@reduxjs/toolkit";
import {  ProductsType } from "../helper";
import { getAllProducts, getBrandCategoryProducts, getBrandProducts, getCategoryProducts, getProducts } from "./api";

const initialState = {
  products: localStorage.getItem("products") === undefined || localStorage.getItem("products") === null ? [] : JSON.parse(localStorage.getItem("products") as string).products  as Array<ProductsType>,
  allProducts: [] as Array<ProductsType>,
  product: localStorage.getItem("product") === undefined || localStorage.getItem("product") === null  ? [] : JSON.parse(localStorage.getItem("product") as string).product as Array<ProductsType>,
  message: null,
  order: [] as Array<ProductsType>
};

export const Products = createSlice({
  name: "products",
  initialState,
  reducers: {
    findProduct: (state, action) => {
      state.product = state.products.filter((el) => el.id === action.payload);
      localStorage.setItem(
        "product",
        JSON.stringify({
          product: state.products.filter((el) => el.id === action.payload)
        })
      );
    },
    clearProducts: (state) =>{
      state.products = []
      localStorage.removeItem("products");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        localStorage.setItem(
          "products",
          JSON.stringify({ products: action.payload })
        );
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.allProducts = action.payload;
        localStorage.setItem(
          "products",
          JSON.stringify({ products: action.payload })
        );
      })
      .addCase(getBrandProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.allProducts = action.payload;
        localStorage.setItem(
          "products",
          JSON.stringify({ products: action.payload })
        );
      })   
      .addCase(getBrandCategoryProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.allProducts = action.payload;
        localStorage.setItem(
          "products",
          JSON.stringify({ products: action.payload })
        );
      })   
  },
});
export const { findProduct, clearProducts } = Products.actions;
export default Products.reducer;
