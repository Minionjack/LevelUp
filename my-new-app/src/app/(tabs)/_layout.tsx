/**
 * Tabs Layout
 * Bottom tab navigation layout
 *
 * @module app/(tabs)/_layout
 */

import { Tabs } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
        },
      }}
    >
      <Tabs.Screen
        name="habits"
        options={{
          title: "Habits",
          tabBarLabel: "Habits",
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarLabel: "Categories",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
