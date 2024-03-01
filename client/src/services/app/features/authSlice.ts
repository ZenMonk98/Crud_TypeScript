import { createSlice } from "@reduxjs/toolkit";

import { signIn } from "../actions/authActions";
import { signUp } from "../actions/authActions";
import { userInfo } from "../actions/authActions";

export interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  message: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  message: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userInfo.pending, (state) => {
      state.user = null;
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(userInfo.fulfilled, (state, action) => {
      state.user = action.payload.name;
      state.loading = false;
      state.isAuthenticated = true;
      
    });
    builder.addCase(userInfo.rejected, (state) => {
      state.user = null;
      state.loading = false;
    });

    builder.addCase(signIn.pending, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = null;
      state.loading = false;
      action.payload.success !== true
        ? (state.isAuthenticated = false)
        : (state.isAuthenticated = true);
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    });

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
