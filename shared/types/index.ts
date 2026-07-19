/**
 * Shared Types
 * Common TypeScript types shared between frontend and backend
 *
 * @module shared/types
 */

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * User entity
 */
export interface User extends BaseEntity {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

/**
 * Category entity
 */
export interface Category extends BaseEntity {
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  user_id: string;
}

/**
 * Habit entity
 */
export interface Habit extends BaseEntity {
  name: string;
  description: string | null;
  frequency: "daily" | "weekly" | "monthly";
  target_value: number;
  target_unit: string;
  category_id: string | null;
  user_id: string;
  is_active: boolean;
  current_streak: number;
  longest_streak: number;
  total_completions: number;
}

/**
 * Habit completion entity
 */
export interface HabitCompletion extends BaseEntity {
  habit_id: string;
  user_id: string;
  completed_at: Date;
  notes: string | null;
  value: number;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  message?: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

/**
 * Authentication tokens
 */
export interface AuthTokens {
  token: string;
  refreshToken: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data
 */
export interface RegistrationData {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
}

/**
 * JWT payload
 */
export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}
