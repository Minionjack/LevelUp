/**
 * Validation Utilities
 * Common validation functions
 *
 * @module utils/validation
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
  // At least 6 characters
  return password.length >= 6;
};

/**
 * Validate required field
 */
export const isRequired = (value: string | undefined | null): boolean => {
  return value !== undefined && value !== null && value.trim() !== "";
};

/**
 * Get password strength level
 */
export const getPasswordStrength = (
  password: string
): "weak" | "medium" | "strong" => {
  if (password.length < 6) {
    return "weak";
  }
  if (password.length < 10) {
    return "medium";
  }
  return "strong";
};
