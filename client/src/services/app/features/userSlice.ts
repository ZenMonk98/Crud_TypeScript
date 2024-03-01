import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "./authSlice";

import {
  getAllUsers,
  updateUser,
  deleteUser,
  createUser,
} from "../actions/userActions";

interface UserState {
  userList: null;
  loading: boolean;
}

const initialState: UserState = {
  userList: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.userList = null;
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.userList = action.payload.users;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.loading = false;
      state.userList = null;
    });

    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.userList = null;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.loading = false;
      state.userList = null;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.loading = false;
      state.userList = null;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.userList = null;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.loading = false;
      state.userList = null;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.loading = false;
      state.userList = null;
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.userList = null;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.userList = null;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.loading = false;
      state.userList = null;
    });

    builder.addCase(logOut, (state) => {
      state.userList = null;
    });
  },
});

export default userSlice.reducer;
