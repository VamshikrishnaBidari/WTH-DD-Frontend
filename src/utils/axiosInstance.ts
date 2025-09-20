import axios from "axios";
import { store } from "../app/store";
import { refreshAccessToken, logout } from "../features/authSlice";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  withCredentials: true, // Allow cookies (for refresh token)
});

// Interceptor to attach access token to requests
api.interceptors.request.use((config) => {
  const state = store.getState();
  if (state.auth.accessToken) {
    config.headers.Authorization = `Bearer ${state.auth.accessToken}`;
  }
  return config;
});

// Interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const state = store.getState();
        if (state.auth.status) {
          let refreshUrl = "/users/refresh-token";

          if (state.auth.role === "operator") {
            refreshUrl = "/operator/refresh-token";
          } else if (state.auth.role === "instructor") {
            refreshUrl = "/teachers/refresh-token";
          } else if (state.auth.role === "school") {
            refreshUrl = "/driving/refresh-token";
          }

          const response = await axios.post(
            `${API_BASE_URL}/api/v1${refreshUrl}`,
            {},
            { withCredentials: true },
          );

          store.dispatch(refreshAccessToken(response.data.accessToken));
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    // Handle rate limiting (HTTP 429)
    if (error.response?.status === 429) {
      const message =
        error.response.data?.message ||
        "Too many requests. Please try again later.";
      toast.error(message);
    }
    return Promise.reject(error);
  },
);

export default api;
