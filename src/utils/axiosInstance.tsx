import axios from "axios";
import { getUserToken } from "../shared/SharedService/StorageService";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getUserToken() || "";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      const url = error.response.config.url;
      // Redirect to login page
      if (typeof window !== "undefined" && url !== "/users/login") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
