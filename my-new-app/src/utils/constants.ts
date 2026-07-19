/**
 * App Constants
 * Application-wide constants
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000/api/v1",
  TIMEOUT: 10000,
};

/**
 * RPG Configuration
 */
export const RPG_CONFIG = {
  BASE_XP: 10,
  XP_MULTIPLIER: 1.5,
  STAT_POINTS_PER_LEVEL: 5,
  COIN_RATIO: 0.1, // 10% of XP
  STREAK_BONUS: 0.1, // 10% per streak day
};

/**
 * Stat Colors
 */
export const STAT_COLORS = {
  STR: "#FF6B6B", // Red
  AGI: "#4ECDC4", // Cyan
  INT: "#95E1D3", // Teal
  VIT: "#F38181", // Pink
  CHA: "#AA96DA", // Purple
  LUK: "#FFD93D", // Yellow
} as const;

/**
 * Stat Icons
 */
export const STAT_ICONS = {
  STR: "💪",
  AGI: "⚡",
  INT: "🧠",
  VIT: "❤️",
  CHA: "✨",
  LUK: "🍀",
} as const;

/**
 * Stat Labels
 */
export const STAT_LABELS = {
  STR: "Strength",
  AGI: "Agility",
  INT: "Intelligence",
  VIT: "Vitality",
  CHA: "Charisma",
  LUK: "Luck",
} as const;

/**
 * Rank Thresholds
 */
export const RANK_THRESHOLDS = {
  Novice: 1,
  Apprentice: 5,
  Adept: 15,
  Expert: 25,
  Master: 35,
  Grandmaster: 50,
  Legend: 75,
  Mythic: 100,
} as const;

/**
 * Theme Colors
 */
export const COLORS = {
  background: "#0f0f1e",
  surface: "#1a1a2e",
  surfaceLight: "#2a2a3e",
  primary: "#64C8FF",
  secondary: "#4CAF50",
  accent: "#FFD700",
  text: "#ffffff",
  textSecondary: "#666666",
  error: "#FF6B6B",
  success: "#4CAF50",
  warning: "#FFD93D",
} as const;
