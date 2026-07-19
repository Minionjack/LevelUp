/**
 * Spacing System
 * Consistent spacing scale for the LevelUp app
 *
 * @module constants/Spacing
 */

/**
 * Spacing scale based on 8px grid system
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

/**
 * Border radius values
 */
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

/**
 * Common spacing combinations
 */
export const Layout = {
  padding: {
    xs: Spacing.xs,
    sm: Spacing.sm,
    md: Spacing.md,
    lg: Spacing.lg,
    xl: Spacing.xl,
  },
  margin: {
    xs: Spacing.xs,
    sm: Spacing.sm,
    md: Spacing.md,
    lg: Spacing.lg,
    xl: Spacing.xl,
  },
  gap: {
    xs: Spacing.xs,
    sm: Spacing.sm,
    md: Spacing.md,
    lg: Spacing.lg,
    xl: Spacing.xl,
  },
} as const;
