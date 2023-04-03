import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "../helper";
import Cookies from "js-cookie";

let user 
if(Cookies.get("user")===undefined){
user =  {fullName: null, email: null , token: null}
}else{
  user =  JSON.parse(Cookies.get("user") as string)
}
const { fullName, email, token } = user;

type InitialState = {
  fullName: string | null,
  email: string | null,
  message: string | null,
  token: string | null,
}
const initialState: InitialState = {
  fullName: fullName || null,
  email: email || null,
  message: null,
  token: token || null,
};
type DataGetAuth = {
  fullName: string, 
  email: string,
  password: string
}
type DataGetLogin = {
  email: string, 
  password: string
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

export const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.fullName = null;
      state.message = null;
    },
    userUpdate(state, action) {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.message = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuth.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.token = action.payload.token;
      Cookies.set("user", JSON.stringify({
        email: action.payload.email,
        token: action.payload.token,
        fullName: action.payload.fullName,
      }));
    })
    .addCase(getLogin.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.token = action.payload.token;
      Cookies.set("user", JSON.stringify({
        email: action.payload.email,
        token: action.payload.token,
        fullName: action.payload.fullName,
      }));
    });
  },
});
export const { removeUser, userUpdate } = Auth.actions;
export default Auth.reducer;
