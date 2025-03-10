import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      console.error("No refresh token found in localStorage");
      throw new Error("No refresh token available");
    }

    const response = await axios.post(`${API_BASE_URL}auth/refresh-token`, {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();

    if (token && isTokenExpired(token)) {
      token = await refreshAccessToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error("No access token available");
      // Redirect to login page only if the current route is not the login page
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const token = await refreshAccessToken();
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest); // Retry the original request
      } else {
        console.error("Failed to refresh token, redirecting to login");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Redirect to login page only if the current route is not the login page
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
