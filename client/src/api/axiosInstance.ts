import axios from "axios";
import { BASE_URL } from "../constants";

const token: any = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
