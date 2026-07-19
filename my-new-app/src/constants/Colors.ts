/**
 * Color System
 * Comprehensive color palette for the LevelUp app
 * Based on the design system from the style guide
 *
 * @module constants/Colors
 */

/**
 * Color palette following Material Design principles
 */
export const Colors = {
  // Primary Brand Colors
  primary: {
    50: "#E3F2FD",
    100: "#BBDEFB",
    200: "#90CAF9",
    300: "#64B5F6",
    400: "#42A5F5",
    500: "#2196F3", // Main primary
    600: "#1E88E5",
    700: "#1976D2",
    800: "#1565C0",
    900: "#0D47A1",
  },

  // Secondary Brand Colors
  secondary: {
    50: "#E8F5E8",
    100: "#C8E6C9",
    200: "#A5D6A7",
    300: "#81C784",
    400: "#66BB6A",
    500: "#4CAF50", // Main secondary
    600: "#43A047",
    700: "#388E3C",
    800: "#2E7D32",
    900: "#1B5E20",
  },

  // Accent Colors
  accent: {
    gold: "#FFD700", // XP and achievements
    violet: "#8A2BE2", // Premium features
    cyan: "#00BCD4", // Information and tips
    orange: "#FF9800", // Warnings and alerts
  },

  // Neutral Colors
  neutral: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },

  // Semantic Colors
  semantic: {
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    info: "#2196F3",
  },

  // Background Colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F8F9FA",
    tertiary: "#F1F3F4",
    dark: "#1A1A1A",
  },

  // Text Colors
  text: {
    primary: "#212121",
    secondary: "#757575",
    tertiary: "#9E9E9E",
    inverse: "#FFFFFF",
    disabled: "#BDBDBD",
  },
} as const;

/**
 * Light theme colors
 */
export const lightTheme = {
  background: Colors.background.primary,
  surface: Colors.background.secondary,
  text: Colors.text.primary,
  textSecondary: Colors.text.secondary,
  border: Colors.neutral[300],
  primary: Colors.primary[500],
  secondary: Colors.secondary[500],
  error: Colors.semantic.error,
  success: Colors.semantic.success,
  warning: Colors.semantic.warning,
  info: Colors.semantic.info,
};

/**
 * Dark theme colors
 */
export const darkTheme = {
  background: Colors.background.dark,
  surface: Colors.neutral[800],
  text: Colors.text.inverse,
  textSecondary: Colors.neutral[400],
  border: Colors.neutral[700],
  primary: Colors.primary[400],
  secondary: Colors.secondary[400],
  error: Colors.semantic.error,
  success: Colors.semantic.success,
  warning: Colors.semantic.warning,
  info: Colors.semantic.info,
};

export type Theme = typeof lightTheme;
