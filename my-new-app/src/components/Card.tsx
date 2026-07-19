/**
 * Card Component
 * Reusable card component for displaying content
 *
 * @module components/Card
 */

import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { BorderRadius, Spacing } from "@/constants";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: boolean;
  elevation?: boolean;
}

/**
 * Card component
 */
export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = true,
  elevation = true,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderRadius: BorderRadius.lg,
          padding: padding ? Spacing.md : 0,
          ...(elevation && {
            shadowColor: theme.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // Base card styles are applied inline with theme
  },
});
