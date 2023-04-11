import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage, ProductsType } from "../helper";

const initialState = {
  products: localStorage.getItem("products") === undefined || localStorage.getItem("products") === null ? [] : JSON.parse(localStorage.getItem("products") as string).products  as Array<ProductsType>,
  allProducts: [] as Array<ProductsType>,
  product: localStorage.getItem("product") === undefined || localStorage.getItem("product") === null  ? [] : JSON.parse(localStorage.getItem("product") as string).product as Array<ProductsType>,
  message: null,
};
interface GetProducts {
  page: number;
};
interface GetCategoryProducts {
  page: number;
  category: string
};
interface GetTitleProducts {
  brand: string;
  page: number;
};
interface GetBrandCategoryProducts{
  brand: string;
  page: number;
  category: string
}
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
export const getCategoryProducts = createAsyncThunk(
  "categoryProducts/getCategoryProducts",
  async(data: GetCategoryProducts, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/sortProductsCategory?limit=${data.page}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({category: data.category}),
      });
      const dataRes = await response.json();
      return dataRes;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  });
  export const getBrandProducts = createAsyncThunk(
    "products/getBrandProducts",
    async (data: GetTitleProducts, { rejectWithValue, dispatch }) => {
      try {
        const response = await fetch(`http://localhost:4000/api/sortProductsBrand?limit=${data.page}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({brand: data.brand}),
        });
        const dataRes = await response.json();
        return dataRes;
      } catch (error) {
        return rejectWithValue({ message: getErrorMessage(error) });
      }
    }
  );
  export const getBrandCategoryProducts = createAsyncThunk(
    "products/getBrandCategoryProducts",
    async (data: GetBrandCategoryProducts, { rejectWithValue, dispatch }) => {
      try {
        const response = await fetch(`http://localhost:4000/api/sortBrandCategoryProducts?limit=${data.page}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({brand: data.brand, category: data.category}),
        });
        const dataRes = await response.json();
        return dataRes;
      } catch (error) {
        return rejectWithValue({ message: getErrorMessage(error) });
      }
    }
  );
export const Products = createSlice({
  name: "products",
  initialState,
  reducers: {
    findProduct: (state, action) => {
      state.product = state.products.filter((el) => el.id === action.payload);
      localStorage.setItem(
        "product",
        JSON.stringify({
          product: state.products.filter((el) => el.id === action.payload),
        })
      );
    },
    clearProducts: (state) =>{
      state.products = []
      localStorage.removeItem("products");
    }
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
