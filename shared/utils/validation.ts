/**
 * Shared Validation Utilities
 * Common validation schemas and functions
 *
 * @module shared/utils/validation
 */

import { z } from "zod";

/**
 * Email validation schema
 */
export const emailSchema = z.string().email("Invalid email address");

/**
 * Password validation schema
 * Minimum 8 characters, at least one uppercase, one lowercase, one number
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

/**
 * Username validation schema
 * 3-20 characters, alphanumeric and underscores only
 */
export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be at most 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
  );

/**
 * UUID validation schema
 */
export const uuidSchema = z.string().uuid("Invalid UUID format");

/**
 * Pagination schema
 */
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

/**
 * Common validation helpers
 */
export const validators = {
  /**
   * Validate email
   */
  email: (email: string): boolean => {
    return emailSchema.safeParse(email).success;
  },

  /**
   * Validate password strength
   */
  password: (password: string): boolean => {
    return passwordSchema.safeParse(password).success;
  },

  /**
   * Validate username
   */
  username: (username: string): boolean => {
    return usernameSchema.safeParse(username).success;
  },

  /**
   * Validate UUID
   */
  uuid: (id: string): boolean => {
    return uuidSchema.safeParse(id).success;
  },
};
