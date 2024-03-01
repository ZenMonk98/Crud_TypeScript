import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";

type UserInfo = {
  userId?: string;
  name: string;
  age: string;
  email: string;
};

export const getAllUsers = createAsyncThunk(
  "/user/list",
  async (_, thunkApi) => {
    try {
      const fetch = await axiosInstance.get("/get/user");
      const data = fetch.data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk(
  "/create/user",
  async (userData: UserInfo, thunkApi) => {
    try {
      const fetch = await axiosInstance.post("/add/user", userData);

      const data = fetch.data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "/delete/user",
  async (userId, thunkApi) => {
    try {
      const fetch = await axiosInstance.delete(`/delete/user/${userId}`);
      const data = fetch.data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "/update/user",
  async (userData: UserInfo, thunkApi) => {
    try {
      const fetch = await axiosInstance.patch(
        `/update/user/${userData.userId}`,
        userData
      );
      const data = fetch.data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
