/**
 * Button Component
 * Reusable button component with multiple variants
 *
 * @module components/Button
 */

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { Typography, BorderRadius, Spacing } from "@/constants";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Button component
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BorderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    };

    // Size styles
    switch (size) {
      case "small":
        baseStyle.paddingVertical = Spacing.sm;
        baseStyle.paddingHorizontal = Spacing.md;
        break;
      case "medium":
        baseStyle.paddingVertical = Spacing.md;
        baseStyle.paddingHorizontal = Spacing.lg;
        break;
      case "large":
        baseStyle.paddingVertical = Spacing.lg;
        baseStyle.paddingHorizontal = Spacing.xl;
        break;
    }

    // Variant styles
    switch (variant) {
      case "primary":
        baseStyle.backgroundColor = theme.primary;
        break;
      case "secondary":
        baseStyle.backgroundColor = theme.secondary;
        break;
      case "outline":
        baseStyle.backgroundColor = "transparent";
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = theme.primary;
        break;
      case "text":
        baseStyle.backgroundColor = "transparent";
        break;
    }

    if (disabled) {
      baseStyle.opacity = 0.5;
    }

    if (fullWidth) {
      baseStyle.width = "100%";
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...Typography.button[size],
    };

    switch (variant) {
      case "primary":
      case "secondary":
        baseStyle.color = theme.text;
        break;
      case "outline":
        baseStyle.color = theme.primary;
        break;
      case "text":
        baseStyle.color = theme.primary;
        break;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "primary" || variant === "secondary"
              ? theme.text
              : theme.primary
          }
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Additional styles can be added here if needed
});
