import axios from "axios";
import { getAdminToken } from "../shared/SharedService/StorageService";
import showErrorToast from "../components/showErrorToast";

const adminAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Request interceptor
adminAxiosInstance.interceptors.request.use(
  (config) => {
    // Add any custom headers here, e.g., for authentication
    const token = getAdminToken();
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
adminAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    showErrorToast(error);
    if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      const url = error.response.config.url;
      // Redirect to login page
      if (typeof window !== "undefined" && url !== "/shop-dashboard-login") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default adminAxiosInstance;
