import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";

type User = {
  username: string;
  password: string;
};

type NewUser = User & {
  name: string;
};

export const signIn = createAsyncThunk(
  "/login",
  async (credentials: User, { rejectWithValue }) => {
    try {
      const fetch = await axiosInstance.post("/user/signin", credentials);

      const data = fetch.data;
      const token = data.token;
      localStorage.setItem("token", token);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signUp = createAsyncThunk(
  "/signup",
  async (credentials: NewUser, { rejectWithValue }) => {
    try {
      const fetch = await axiosInstance.post("/user/signup", credentials);

      const data = fetch.data;

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const userInfo = createAsyncThunk("user", async () => {
  const fetch = await axiosInstance.get("/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = fetch.data;
  return data;
});
