import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:1009/api",
  withCredentials: true,
});
