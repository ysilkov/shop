import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAuth = createAsyncThunk(
    "auth/getAuth",
    async(data, { rejectWithValue, dispatch }) => {
        try{
        const response = await fetch(
            "http://localhost:4000/api/auth/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }
          );
          const dataRes = await response.json();
          return dataRes;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);

export const Auth = createSlice({
name:"auth",
initialState:{
    fullName: null,
    email: null,
    loading: false,
    error: null, 
    id: null
},
reducers: {},
[getAuth.pending]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [getAuth.fulfilled]: (state, action) => {
    state.loading = false;
    state.fullName = action.payload.fullName;
    state.email = action.payload.email;
  },
  [getAuth.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
})

export default Auth.reducer;
