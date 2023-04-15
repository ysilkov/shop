import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { getAuth, getLogin } from "./api";

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
