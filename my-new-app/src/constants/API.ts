/**
 * API Configuration
 * Centralized API configuration and endpoints
 *
 * @module constants/API
 */

import Constants from "expo-constants";

/**
 * Get API URL from environment or use default
 */
const getApiUrl = (): string => {
  const apiUrl = Constants.expoConfig?.extra?.apiUrl || process.env.API_URL;
  return apiUrl || "http://localhost:4000";
};

/**
 * API base configuration
 */
export const API_CONFIG = {
  baseURL: getApiUrl(),
  prefix: "/api/v1",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const;

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },
  // Habits
  habits: {
    list: "/habits",
    create: "/habits",
    get: (id: string) => `/habits/${id}`,
    update: (id: string) => `/habits/${id}`,
    delete: (id: string) => `/habits/${id}`,
    complete: (id: string) => `/habits/${id}/complete`,
  },
  // Categories
  categories: {
    list: "/categories",
    create: "/categories",
    get: (id: string) => `/categories/${id}`,
    update: (id: string) => `/categories/${id}`,
    delete: (id: string) => `/categories/${id}`,
  },
  // Health
  health: "/health",
} as const;

/**
 * Full API URL helper
 */
export const getApiEndpoint = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}${API_CONFIG.prefix}${endpoint}`;
};
