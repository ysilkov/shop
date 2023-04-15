import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "../helper";

interface DataGetAuth {
   fullName: string, 
   email: string,
   password: string
 }
 interface DataGetLogin {
   email: string, 
   password: string
 }
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
 export const getAuth = createAsyncThunk(
   "auth/getAuth",
   async (data: DataGetAuth, { rejectWithValue, dispatch }) => {
     try {
       const response = await fetch("http://localhost:4000/api/auth/", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
       });
       const dataRes = await response.json();
 
       return dataRes;
     } catch (error) {
       return rejectWithValue({message: getErrorMessage(error)});
     }
   }
 );
 export const getLogin = createAsyncThunk(
   "auth/getLogin",
   async (data: DataGetLogin, { rejectWithValue, dispatch }) => {
     try {
       const response = await fetch("http://localhost:4000/api/login/", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
       });
       const dataRes = await response.json();
       return dataRes;
     } catch (error) {
       return rejectWithValue({message: getErrorMessage(error)});
     }
   }
 );
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