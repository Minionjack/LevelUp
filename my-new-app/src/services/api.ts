/**
 * API Service
 * Axios-based API client with interceptors
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { store } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { ApiResponse } from '@/types';

/**
 * API base URL
 */
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

/**
 * Create axios instance
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - Add auth token
 */
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handle errors and token refresh
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { token, refreshToken: newRefreshToken } = response.data.data;

          // Update store with new tokens
          // Note: You'll need to create a refreshToken action
          // store.dispatch(refreshToken({ token, refreshToken: newRefreshToken }));

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * API methods
 */
export const api = {
  /**
   * Get request
   */
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await apiClient.get<ApiResponse<T>>(url);
    return response.data;
  },

  /**
   * Post request
   */
  post: async <T>(url: string, data?: unknown): Promise<ApiResponse<T>> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data);
    return response.data;
  },

  /**
   * Put request
   */
  put: async <T>(url: string, data?: unknown): Promise<ApiResponse<T>> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data);
    return response.data;
  },

  /**
   * Delete request
   */
  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await apiClient.delete<ApiResponse<T>>(url);
    return response.data;
  },
};

export default apiClient;
