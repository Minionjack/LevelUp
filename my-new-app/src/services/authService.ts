/**
 * Auth Service
 * Authentication API service
 */

import { api } from './api';
import { LoginCredentials, RegistrationData, AuthTokens, User } from '../../../shared/types';
import { ApiResponse } from '@/types';

/**
 * Auth service
 */
export const authService = {
  /**
   * Register new user
   */
  register: async (data: RegistrationData): Promise<AuthTokens & { user: User }> => {
    const response = await api.post<AuthTokens & { user: User }>('/auth/register', data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Registration failed');
    }
    return response.data;
  },

  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthTokens & { user: User }> => {
    const response = await api.post<AuthTokens & { user: User }>('/auth/login', credentials);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Login failed');
    }
    return response.data;
  },

  /**
   * Get current user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to get user');
    }
    return response.data;
  },

  /**
   * Refresh token
   */
  refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
    const response = await api.post<AuthTokens>('/auth/refresh', { refreshToken });
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Token refresh failed');
    }
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};
