import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { getErrorMessage, ProductsType } from "../helper";

let productCookie;
if (Cookies.get("product") === undefined) {
  productCookie = [];
} else {
  const { product } = JSON.parse(Cookies.get("product") as string);
  productCookie = product;
}
let productsCookie;
if (Cookies.get("products") === undefined) {
  productsCookie = [];
} else {
  const { products } = JSON.parse(Cookies.get("products") as string);
  productsCookie = products;
}
const initialState = {
  products: productsCookie as Array<ProductsType>,
  allProducts: [] as Array<ProductsType>,
  product: productCookie as Array<ProductsType>,
  message: null,
};
type GetProducts = {
  page: number;
};
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (data: GetProducts, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/products?limit=${data.page}`
      );
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/allProducts`);
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);
type GetCategoryProducts= {
  page: number;
  category: string
};
export const getCategoryProducts = createAsyncThunk(
  "categoryProducts/getCategoryProducts",
  async(data: GetCategoryProducts, { rejectWithValue, dispatch }) => {
    console.log(data)
    try {
      const response = await fetch(`http://localhost:4000/api/sortProducts?limit=${data.page}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({category: data.category}),
      });
      const dataRes = await response.json();
      console.log(dataRes)
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  })

export const Products = createSlice({
  name: "products",
  initialState,
  reducers: {
    findProduct: (state, action) => {
      state.product = state.products.filter((el) => el.id === action.payload);
      Cookies.set(
        "product",
        JSON.stringify({
          product: state.products.filter((el) => el.id === action.payload),
        })
      );
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
      });
  },
});
export const { findProduct } = Products.actions;
export default Products.reducer;
