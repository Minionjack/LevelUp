/**
 * Register Screen
 * User registration screen
 *
 * @module app/(auth)/register
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Typography, Spacing } from "@/constants";

/**
 * Register screen component
 */
export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  /**
   * Handle registration
   */
  const handleRegister = async () => {
    // Reset errors
    setErrors({});

    // Validation
    if (!name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!password) {
      setErrors({ password: "Password is required" });
      return;
    }

    if (password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters" });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password, name.trim());
      router.replace("/(tabs)/habits");
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.message || "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate to login screen
   */
  const handleLogin = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Start your journey to self-improvement
          </Text>

          <View style={styles.form}>
            <Input
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              error={errors.name}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              error={errors.password}
              helperText="Must be at least 6 characters"
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              error={errors.confirmPassword}
            />

            <Button
              title="Create Account"
              onPress={handleRegister}
              loading={loading}
              fullWidth
              style={styles.registerButton}
            />

            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: theme.textSecondary }]}>
                Already have an account?{" "}
              </Text>
              <Text
                style={[styles.loginLink, { color: theme.primary }]}
                onPress={handleLogin}
              >
                Sign In
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: Spacing.lg,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    ...Typography.heading.h1,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    ...Typography.body.medium,
    marginBottom: Spacing.xl,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  registerButton: {
    marginTop: Spacing.md,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.lg,
  },
  loginText: {
    ...Typography.body.medium,
  },
  loginLink: {
    ...Typography.body.medium,
    fontWeight: "600",
  },
});
