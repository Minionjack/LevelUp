/**
 * Login Screen
 * User login screen
 *
 * @module app/(auth)/login
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
 * Login screen component
 */
export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  /**
   * Handle login
   */
  const handleLogin = async () => {
    // Reset errors
    setErrors({});

    // Validation
    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!password) {
      setErrors({ password: "Password is required" });
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace("/(tabs)/habits");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate to register screen
   */
  const handleRegister = () => {
    router.push("/(auth)/register");
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
            Welcome Back
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Sign in to continue your journey
          </Text>

          <View style={styles.form}>
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
              autoComplete="password"
              error={errors.password}
            />

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              style={styles.loginButton}
            />

            <View style={styles.registerContainer}>
              <Text
                style={[styles.registerText, { color: theme.textSecondary }]}
              >
                Don't have an account?{" "}
              </Text>
              <Text
                style={[styles.registerLink, { color: theme.primary }]}
                onPress={handleRegister}
              >
                Sign Up
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
  loginButton: {
    marginTop: Spacing.md,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.lg,
  },
  registerText: {
    ...Typography.body.medium,
  },
  registerLink: {
    ...Typography.body.medium,
    fontWeight: "600",
  },
});
