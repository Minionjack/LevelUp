# LevelUp: Enhanced Style Guide & Component Library

## Overview

This enhanced style guide provides comprehensive design system implementation details, component patterns, and practical examples for the LevelUp application. It extends our existing style guide with specific code examples, accessibility guidelines, and implementation patterns.

---

## 🎨 Design System Implementation

### Color System

#### Primary Color Palette

```typescript
// src/constants/Colors.ts
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
};
```

#### Color Usage Guidelines

```typescript
// Color usage examples
const colorUsage = {
  // Primary actions (buttons, links)
  primaryAction: Colors.primary[500],

  // Secondary actions
  secondaryAction: Colors.secondary[500],

  // Success states
  success: Colors.semantic.success,

  // Warning states
  warning: Colors.semantic.warning,

  // Error states
  error: Colors.semantic.error,

  // XP and achievements
  xp: Colors.accent.gold,

  // Premium features
  premium: Colors.accent.violet,

  // Information
  info: Colors.accent.cyan,
};
```

### Typography System

#### Font Scale

```typescript
// src/constants/Typography.ts
export const Typography = {
  // Display styles
  display: {
    large: {
      fontSize: 48,
      fontWeight: "bold",
      lineHeight: 56,
      letterSpacing: -0.5,
    },
    medium: {
      fontSize: 36,
      fontWeight: "bold",
      lineHeight: 44,
      letterSpacing: -0.25,
    },
    small: {
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 32,
      letterSpacing: 0,
    },
  },

  // Heading styles
  heading: {
    h1: {
      fontSize: 32,
      fontWeight: "bold",
      lineHeight: 40,
      letterSpacing: -0.25,
    },
    h2: {
      fontSize: 28,
      fontWeight: "600",
      lineHeight: 36,
      letterSpacing: -0.25,
    },
    h3: {
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 32,
      letterSpacing: 0,
    },
    h4: {
      fontSize: 20,
      fontWeight: "600",
      lineHeight: 28,
      letterSpacing: 0,
    },
    h5: {
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 24,
      letterSpacing: 0,
    },
    h6: {
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 24,
      letterSpacing: 0,
    },
  },

  // Body text styles
  body: {
    large: {
      fontSize: 18,
      fontWeight: "normal",
      lineHeight: 28,
      letterSpacing: 0.15,
    },
    medium: {
      fontSize: 16,
      fontWeight: "normal",
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    small: {
      fontSize: 14,
      fontWeight: "normal",
      lineHeight: 20,
      letterSpacing: 0.25,
    },
  },

  // Caption styles
  caption: {
    large: {
      fontSize: 12,
      fontWeight: "normal",
      lineHeight: 16,
      letterSpacing: 0.4,
    },
    small: {
      fontSize: 10,
      fontWeight: "normal",
      lineHeight: 14,
      letterSpacing: 0.4,
    },
  },

  // Button text styles
  button: {
    large: {
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    medium: {
      fontSize: 14,
      fontWeight: "600",
      lineHeight: 20,
      letterSpacing: 0.5,
    },
    small: {
      fontSize: 12,
      fontWeight: "600",
      lineHeight: 16,
      letterSpacing: 0.5,
    },
  },
};
```

#### Typography Usage

```typescript
// Typography usage examples
const typographyUsage = {
  // Page titles
  pageTitle: Typography.heading.h1,

  // Section headers
  sectionHeader: Typography.heading.h3,

  // Card titles
  cardTitle: Typography.heading.h4,

  // Body text
  bodyText: Typography.body.medium,

  // Captions and metadata
  caption: Typography.caption.large,

  // Button text
  buttonText: Typography.button.medium,
};
```

### Spacing System

#### Spacing Scale

```typescript
// src/constants/Spacing.ts
export const Spacing = {
  // Base spacing unit (4px)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  // Component-specific spacing
  component: {
    padding: {
      small: 12,
      medium: 16,
      large: 24,
    },
    margin: {
      small: 8,
      medium: 16,
      large: 24,
    },
    gap: {
      small: 8,
      medium: 12,
      large: 16,
    },
  },

  // Layout spacing
  layout: {
    screen: {
      padding: 16,
      margin: 0,
    },
    section: {
      padding: 24,
      margin: 16,
    },
    card: {
      padding: 16,
      margin: 8,
    },
  },
};
```

---

## 🧩 Component Library

### Button Components

#### Primary Button

```typescript
// src/components/ui/Button/PrimaryButton.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { Typography } from "../../constants/Typography";
import { Spacing } from "../../constants/Spacing";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  size = "medium",
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const buttonStyle = [
    styles.base,
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      accessible={true}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.text.inverse} size="small" />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary[500],
  },
  small: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },
  medium: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 48,
  },
  large: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },
  disabled: {
    backgroundColor: Colors.neutral[300],
  },
  text: {
    color: Colors.text.inverse,
    fontWeight: "600",
  },
  textSmall: {
    ...Typography.button.small,
  },
  textMedium: {
    ...Typography.button.medium,
  },
  textLarge: {
    ...Typography.button.large,
  },
  textDisabled: {
    color: Colors.text.disabled,
  },
});
```

#### Secondary Button

```typescript
// src/components/ui/Button/SecondaryButton.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { Typography } from "../../constants/Typography";
import { Spacing } from "../../constants/Spacing";

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  size = "medium",
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const buttonStyle = [
    styles.base,
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text style={textStyleCombined}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  small: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },
  medium: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 48,
  },
  large: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },
  disabled: {
    borderColor: Colors.neutral[300],
  },
  text: {
    color: Colors.primary[500],
    fontWeight: "600",
  },
  textSmall: {
    ...Typography.button.small,
  },
  textMedium: {
    ...Typography.button.medium,
  },
  textLarge: {
    ...Typography.button.large,
  },
  textDisabled: {
    color: Colors.text.disabled,
  },
});
```

### Card Components

#### Base Card

```typescript
// src/components/ui/Card/Card.tsx
import React from "react";
import { View, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import { Spacing } from "../../constants/Spacing";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const cardStyle = [styles.base, style];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        disabled={disabled}
        accessible={true}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={cardStyle}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: Spacing.layout.card.padding,
    margin: Spacing.layout.card.margin,
    shadowColor: Colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
```

#### Habit Card

```typescript
// src/components/ui/Card/HabitCard.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import { Typography } from "../../constants/Typography";
import { Spacing } from "../../constants/Spacing";
import { Card } from "./Card";
import { Icon } from "../Icon/Icon";

interface HabitCardProps {
  habit: {
    id: string;
    title: string;
    description?: string;
    category: {
      name: string;
      color: string;
      icon: string;
    };
    currentStreak: number;
    targetCount: number;
    xpReward: number;
    isCompleted: boolean;
  };
  onPress: () => void;
  onComplete: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onPress,
  onComplete,
}) => {
  return (
    <Card
      style={styles.container}
      onPress={onPress}
      accessibilityLabel={`${habit.title} habit card`}
      accessibilityHint="Tap to view habit details"
    >
      <View style={styles.header}>
        <View style={styles.categoryContainer}>
          <View
            style={[
              styles.categoryIcon,
              { backgroundColor: habit.category.color },
            ]}
          >
            <Icon
              name={habit.category.icon}
              size={16}
              color={Colors.text.inverse}
            />
          </View>
          <Text style={styles.categoryName}>{habit.category.name}</Text>
        </View>

        <View style={styles.streakContainer}>
          <Icon name="flame" size={16} color={Colors.accent.orange} />
          <Text style={styles.streakText}>{habit.currentStreak}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{habit.title}</Text>
        {habit.description && (
          <Text style={styles.description}>{habit.description}</Text>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.xpContainer}>
          <Icon name="star" size={16} color={Colors.accent.gold} />
          <Text style={styles.xpText}>+{habit.xpReward} XP</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.completeButton,
            habit.isCompleted && styles.completedButton,
          ]}
          onPress={onComplete}
          disabled={habit.isCompleted}
          accessible={true}
          accessibilityLabel={
            habit.isCompleted ? "Habit completed" : "Complete habit"
          }
          accessibilityHint="Tap to mark habit as complete"
          accessibilityRole="button"
          accessibilityState={{ disabled: habit.isCompleted }}
        >
          <Text
            style={[
              styles.completeButtonText,
              habit.isCompleted && styles.completedButtonText,
            ]}
          >
            {habit.isCompleted ? "Completed" : "Complete"}
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  categoryName: {
    ...Typography.body.small,
    color: Colors.text.secondary,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    ...Typography.body.small,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  content: {
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.heading.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.body.small,
    color: Colors.text.secondary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  xpText: {
    ...Typography.body.small,
    color: Colors.accent.gold,
    fontWeight: "600",
    marginLeft: Spacing.xs,
  },
  completeButton: {
    backgroundColor: Colors.primary[500],
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 6,
  },
  completedButton: {
    backgroundColor: Colors.semantic.success,
  },
  completeButtonText: {
    ...Typography.button.small,
    color: Colors.text.inverse,
  },
  completedButtonText: {
    color: Colors.text.inverse,
  },
});
```

### Input Components

#### Text Input

```typescript
// src/components/ui/Input/TextInput.tsx
import React, { forwardRef } from "react";
import {
  TextInput as RNTextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { Typography } from "../../constants/Typography";
import { Spacing } from "../../constants/Spacing";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextInput = forwardRef<RNTextInput, CustomTextInputProps>(
  (
    {
      label,
      error,
      helperText,
      containerStyle,
      leftIcon,
      rightIcon,
      style,
      ...props
    },
    ref
  ) => {
    const inputContainerStyle = [
      styles.inputContainer,
      error && styles.inputContainerError,
      containerStyle,
    ];

    const inputStyle = [
      styles.input,
      leftIcon && styles.inputWithLeftIcon,
      rightIcon && styles.inputWithRightIcon,
      style,
    ];

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={inputContainerStyle}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

          <RNTextInput
            ref={ref}
            style={inputStyle}
            placeholderTextColor={Colors.text.tertiary}
            {...props}
          />

          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>

        {(error || helperText) && (
          <Text style={[styles.helperText, error && styles.errorText]}>
            {error || helperText}
          </Text>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.body.small,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Spacing.md,
    minHeight: 48,
  },
  inputContainerError: {
    borderColor: Colors.semantic.error,
  },
  input: {
    flex: 1,
    ...Typography.body.medium,
    color: Colors.text.primary,
    paddingVertical: Spacing.md,
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.sm,
  },
  inputWithRightIcon: {
    paddingRight: Spacing.sm,
  },
  leftIcon: {
    marginRight: Spacing.sm,
  },
  rightIcon: {
    marginLeft: Spacing.sm,
  },
  helperText: {
    ...Typography.caption.large,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  errorText: {
    color: Colors.semantic.error,
  },
});
```

---

## ♿ Accessibility Implementation

### Accessibility Guidelines

#### Screen Reader Support

```typescript
// Accessibility patterns for components
const accessibilityPatterns = {
  // Button accessibility
  button: {
    accessible: true,
    accessibilityRole: "button",
    accessibilityLabel: "Descriptive label",
    accessibilityHint: "What happens when pressed",
    accessibilityState: { disabled: false },
  },

  // Input accessibility
  input: {
    accessible: true,
    accessibilityLabel: "Input field label",
    accessibilityHint: "What to enter",
    accessibilityRole: "text",
  },

  // Image accessibility
  image: {
    accessible: true,
    accessibilityLabel: "Description of image",
    accessibilityRole: "image",
  },

  // List accessibility
  list: {
    accessible: true,
    accessibilityLabel: "List description",
    accessibilityRole: "list",
  },
};
```

#### Keyboard Navigation

```typescript
// Keyboard navigation support
const keyboardNavigation = {
  // Focus management
  focusManagement: {
    returnKeyType: "next",
    blurOnSubmit: false,
    onSubmitEditing: () => nextInput.focus(),
  },

  // Tab navigation
  tabNavigation: {
    tabIndex: 0,
    accessible: true,
    accessibilityRole: "tab",
  },
};
```

### Accessibility Testing

#### Accessibility Test Examples

```typescript
// src/__tests__/accessibility/Button.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import { PrimaryButton } from "../../components/ui/Button/PrimaryButton";

describe("PrimaryButton Accessibility", () => {
  it("should have proper accessibility props", () => {
    const { getByRole } = render(
      <PrimaryButton
        title="Test Button"
        onPress={() => {}}
        accessibilityLabel="Test button for accessibility"
        accessibilityHint="Press to test accessibility"
      />
    );

    const button = getByRole("button");
    expect(button.props.accessibilityLabel).toBe(
      "Test button for accessibility"
    );
    expect(button.props.accessibilityHint).toBe("Press to test accessibility");
    expect(button.props.accessibilityRole).toBe("button");
  });

  it("should indicate disabled state", () => {
    const { getByRole } = render(
      <PrimaryButton
        title="Disabled Button"
        onPress={() => {}}
        disabled={true}
      />
    );

    const button = getByRole("button");
    expect(button.props.accessibilityState.disabled).toBe(true);
  });
});
```

---

## 🎭 Animation & Micro-interactions

### Animation Guidelines

#### Animation Principles

```typescript
// Animation configuration
export const AnimationConfig = {
  // Duration
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  // Easing
  easing: {
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },

  // Scale
  scale: {
    small: 0.95,
    normal: 1.0,
    large: 1.05,
  },
};
```

#### Button Press Animation

```typescript
// src/components/ui/Button/AnimatedButton.tsx
import React, { useRef } from "react";
import { Animated, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { Typography } from "../../constants/Typography";

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  style?: any;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary[500],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...Typography.button.medium,
    color: Colors.text.inverse,
  },
});
```

---

## 📱 Responsive Design

### Screen Size Breakpoints

```typescript
// src/constants/Breakpoints.ts
export const Breakpoints = {
  // Screen sizes
  screen: {
    small: 320,
    medium: 375,
    large: 414,
    xlarge: 768,
  },

  // Component breakpoints
  component: {
    small: 280,
    medium: 320,
    large: 400,
  },
};

// Responsive utilities
export const isSmallScreen = (width: number) =>
  width < Breakpoints.screen.medium;
export const isMediumScreen = (width: number) =>
  width >= Breakpoints.screen.medium && width < Breakpoints.screen.large;
export const isLargeScreen = (width: number) =>
  width >= Breakpoints.screen.large;
```

### Responsive Components

```typescript
// src/components/ui/ResponsiveContainer.tsx
import React from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { Breakpoints } from "../../constants/Breakpoints";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: any;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  style,
}) => {
  const { width } = useWindowDimensions();

  const containerStyle = [
    styles.container,
    width < Breakpoints.screen.medium && styles.small,
    width >= Breakpoints.screen.medium &&
      width < Breakpoints.screen.large &&
      styles.medium,
    width >= Breakpoints.screen.large && styles.large,
    style,
  ];

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  small: {
    paddingHorizontal: 16,
  },
  medium: {
    paddingHorizontal: 24,
  },
  large: {
    paddingHorizontal: 32,
    maxWidth: 600,
    alignSelf: "center",
  },
});
```

---

## 🎨 Dark Mode Support

### Dark Mode Colors

```typescript
// src/constants/Theme.ts
export const LightTheme = {
  colors: {
    background: Colors.background.primary,
    surface: Colors.background.secondary,
    text: Colors.text.primary,
    textSecondary: Colors.text.secondary,
    primary: Colors.primary[500],
    secondary: Colors.secondary[500],
  },
};

export const DarkTheme = {
  colors: {
    background: Colors.neutral[900],
    surface: Colors.neutral[800],
    text: Colors.text.inverse,
    textSecondary: Colors.neutral[400],
    primary: Colors.primary[400],
    secondary: Colors.secondary[400],
  },
};
```

### Theme Hook

```typescript
// src/hooks/useTheme.ts
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "../constants/Theme";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? DarkTheme : LightTheme;
};
```

---

## 📋 Style Guide Checklist

### Implementation Checklist

- [ ] Color palette implemented and consistent
- [ ] Typography scale applied throughout
- [ ] Spacing system used consistently
- [ ] Component library created and documented
- [ ] Accessibility features implemented
- [ ] Responsive design considerations
- [ ] Dark mode support added
- [ ] Animation guidelines followed
- [ ] Performance optimizations applied
- [ ] Testing coverage for components

### Quality Assurance

- [ ] Design tokens extracted and documented
- [ ] Component documentation complete
- [ ] Accessibility testing performed
- [ ] Cross-platform consistency verified
- [ ] Performance benchmarks met
- [ ] Code review completed
- [ ] User testing conducted

---

_This enhanced style guide provides comprehensive implementation details and patterns for maintaining design consistency and accessibility throughout the LevelUp application._
