/**
 * API Client
 * Shared axios instance for talking to the backend
 */

import axios from "axios";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Pull a human-readable message out of an API error response, falling
 * back to the raw error message for network/unexpected failures.
 */
export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { error?: { message?: string } }
      | undefined;
    return data?.error?.message ?? error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}
