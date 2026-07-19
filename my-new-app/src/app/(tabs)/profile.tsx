/**
 * Profile Screen
 * User profile and settings screen
 *
 * @module app/(tabs)/profile
 */

import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Typography, Spacing } from "@/constants";

/**
 * Profile screen component
 */
export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, themeMode, setThemeMode, toggleTheme } = useTheme();

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            router.replace("/(auth)/login");
          } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to logout");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <Text style={[styles.avatarText, { color: theme.text }]}>
              {user?.name?.[0]?.toUpperCase() ||
                user?.email?.[0]?.toUpperCase() ||
                "U"}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: theme.text }]}>
              {user?.name || "User"}
            </Text>
            <Text style={[styles.email, { color: theme.textSecondary }]}>
              {user?.email}
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.settingsCard}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Appearance
        </Text>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>
            Theme
          </Text>
          <View style={styles.themeButtons}>
            <Button
              title="Light"
              onPress={() => setThemeMode("light")}
              variant={themeMode === "light" ? "primary" : "outline"}
              size="small"
              style={styles.themeButton}
            />
            <Button
              title="Dark"
              onPress={() => setThemeMode("dark")}
              variant={themeMode === "dark" ? "primary" : "outline"}
              size="small"
              style={styles.themeButton}
            />
            <Button
              title="Auto"
              onPress={() => setThemeMode("auto")}
              variant={themeMode === "auto" ? "primary" : "outline"}
              size="small"
              style={styles.themeButton}
            />
          </View>
        </View>
      </Card>

      <Card style={styles.actionsCard}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          fullWidth
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  profileCard: {
    marginBottom: Spacing.md,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  avatarText: {
    ...Typography.heading.h2,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    ...Typography.heading.h3,
    marginBottom: Spacing.xs,
  },
  email: {
    ...Typography.body.medium,
  },
  settingsCard: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.heading.h4,
    marginBottom: Spacing.md,
  },
  settingRow: {
    marginBottom: Spacing.md,
  },
  settingLabel: {
    ...Typography.body.medium,
    marginBottom: Spacing.sm,
  },
  themeButtons: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  themeButton: {
    flex: 1,
  },
  actionsCard: {
    marginTop: Spacing.md,
  },
});
