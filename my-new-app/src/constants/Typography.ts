/**
 * Typography System
 * Comprehensive typography scale for the LevelUp app
 * Based on the design system from the style guide
 *
 * @module constants/Typography
 */

import { TextStyle } from "react-native";

/**
 * Font weight constants
 */
export const FontWeights = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

/**
 * Typography scale following Material Design principles
 */
export const Typography = {
  // Display styles
  display: {
    large: {
      fontSize: 48,
      fontWeight: FontWeights.bold,
      lineHeight: 56,
      letterSpacing: -0.5,
    } as TextStyle,
    medium: {
      fontSize: 36,
      fontWeight: FontWeights.bold,
      lineHeight: 44,
      letterSpacing: -0.25,
    } as TextStyle,
    small: {
      fontSize: 24,
      fontWeight: FontWeights.semibold,
      lineHeight: 32,
      letterSpacing: 0,
    } as TextStyle,
  },

  // Heading styles
  heading: {
    h1: {
      fontSize: 32,
      fontWeight: FontWeights.bold,
      lineHeight: 40,
      letterSpacing: -0.25,
    } as TextStyle,
    h2: {
      fontSize: 28,
      fontWeight: FontWeights.semibold,
      lineHeight: 36,
      letterSpacing: -0.25,
    } as TextStyle,
    h3: {
      fontSize: 24,
      fontWeight: FontWeights.semibold,
      lineHeight: 32,
      letterSpacing: 0,
    } as TextStyle,
    h4: {
      fontSize: 20,
      fontWeight: FontWeights.semibold,
      lineHeight: 28,
      letterSpacing: 0,
    } as TextStyle,
    h5: {
      fontSize: 18,
      fontWeight: FontWeights.semibold,
      lineHeight: 24,
      letterSpacing: 0,
    } as TextStyle,
    h6: {
      fontSize: 16,
      fontWeight: FontWeights.semibold,
      lineHeight: 24,
      letterSpacing: 0,
    } as TextStyle,
  },

  // Body text styles
  body: {
    large: {
      fontSize: 18,
      fontWeight: FontWeights.regular,
      lineHeight: 28,
      letterSpacing: 0,
    } as TextStyle,
    medium: {
      fontSize: 16,
      fontWeight: FontWeights.regular,
      lineHeight: 24,
      letterSpacing: 0,
    } as TextStyle,
    small: {
      fontSize: 14,
      fontWeight: FontWeights.regular,
      lineHeight: 20,
      letterSpacing: 0.25,
    } as TextStyle,
  },

  // Label styles
  label: {
    large: {
      fontSize: 16,
      fontWeight: FontWeights.medium,
      lineHeight: 24,
      letterSpacing: 0.15,
    } as TextStyle,
    medium: {
      fontSize: 14,
      fontWeight: FontWeights.medium,
      lineHeight: 20,
      letterSpacing: 0.1,
    } as TextStyle,
    small: {
      fontSize: 12,
      fontWeight: FontWeights.medium,
      lineHeight: 16,
      letterSpacing: 0.5,
    } as TextStyle,
  },

  // Button text styles
  button: {
    large: {
      fontSize: 16,
      fontWeight: FontWeights.semibold,
      lineHeight: 24,
      letterSpacing: 0.5,
    } as TextStyle,
    medium: {
      fontSize: 14,
      fontWeight: FontWeights.semibold,
      lineHeight: 20,
      letterSpacing: 0.25,
    } as TextStyle,
    small: {
      fontSize: 12,
      fontWeight: FontWeights.semibold,
      lineHeight: 16,
      letterSpacing: 0.5,
    } as TextStyle,
  },

  // Caption styles
  caption: {
    fontSize: 12,
    fontWeight: FontWeights.regular,
    lineHeight: 16,
    letterSpacing: 0.4,
  } as TextStyle,

  // Overline styles
  overline: {
    fontSize: 10,
    fontWeight: FontWeights.medium,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
  } as TextStyle,
} as const;

/**
 * Minimum font size for accessibility (14pt)
 */
export const MIN_FONT_SIZE = 14;
