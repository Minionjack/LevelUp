/**
 * Habits Screen
 * Main screen for viewing and managing habits
 *
 * @module app/(tabs)/habits
 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Habit } from "@/types";
import { getHabits, deleteHabit, completeHabit } from "@/services/habitService";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Typography, Spacing } from "@/constants";

/**
 * Habits screen component
 */
export default function HabitsScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Load habits
   */
  const loadHabits = async () => {
    try {
      const data = await getHabits();
      // Ensure habits is always an array, never null
      setHabits(Array.isArray(data) ? data : []);
    } catch (error: any) {
      // On error, set empty array instead of showing alert (for offline mode)
      setHabits([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadHabits();
    }
  }, [isAuthenticated]);

  /**
   * Handle habit completion
   */
  const handleComplete = async (habitId: string) => {
    try {
      await completeHabit(habitId);
      await loadHabits();
      Alert.alert("Success", "Habit completed!");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to complete habit");
    }
  };

  /**
   * Handle habit deletion
   */
  const handleDelete = (habitId: string, habitName: string) => {
    Alert.alert(
      "Delete Habit",
      `Are you sure you want to delete "${habitName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteHabit(habitId);
              await loadHabits();
            } catch (error: any) {
              Alert.alert("Error", error.message || "Failed to delete habit");
            }
          },
        },
      ]
    );
  };

  /**
   * Render habit item
   */
  const renderHabit = ({ item }: { item: Habit }) => (
    <Card style={styles.habitCard}>
      <View style={styles.habitHeader}>
        <View style={styles.habitInfo}>
          <Text style={[styles.habitName, { color: theme.text }]}>
            {item.name}
          </Text>
          {item.description && (
            <Text
              style={[styles.habitDescription, { color: theme.textSecondary }]}
            >
              {item.description}
            </Text>
          )}
        </View>
        {item.category && (
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: item.category.color || theme.primary },
            ]}
          >
            <Text style={[styles.categoryText, { color: theme.text }]}>
              {item.category.name}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.habitStats}>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: theme.primary }]}>
            {item.currentStreak}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            Day Streak
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: theme.secondary }]}>
            {item.totalCompletions}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            Total
          </Text>
        </View>
      </View>

      <View style={styles.habitActions}>
        <Button
          title="Complete"
          onPress={() => handleComplete(item.id)}
          variant="primary"
          size="small"
          style={styles.actionButton}
        />
        <Button
          title="Delete"
          onPress={() => handleDelete(item.id, item.name)}
          variant="outline"
          size="small"
          style={styles.actionButton}
        />
      </View>
    </Card>
  );

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.emptyText, { color: theme.text }]}>
          Please log in to view your habits
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Habits</Text>
        <Button
          title="+ Add Habit"
          onPress={() => router.push("/habit/create")}
          variant="primary"
          size="small"
        />
      </View>

      {loading && (!habits || habits.length === 0) ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Loading habits...
          </Text>
        </View>
      ) : !habits || habits.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No habits yet. Create your first habit!
          </Text>
          <Button
            title="Create Habit"
            onPress={() => router.push("/habit/create")}
            variant="primary"
            style={styles.createButton}
          />
        </View>
      ) : (
        <FlatList
          data={habits}
          renderItem={renderHabit}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                loadHabits();
              }}
              tintColor={theme.primary}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  title: {
    ...Typography.heading.h2,
  },
  list: {
    padding: Spacing.md,
  },
  habitCard: {
    marginBottom: Spacing.md,
  },
  habitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    ...Typography.heading.h4,
    marginBottom: Spacing.xs,
  },
  habitDescription: {
    ...Typography.body.small,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  categoryText: {
    ...Typography.label.small,
  },
  habitStats: {
    flexDirection: "row",
    gap: Spacing.lg,
    marginBottom: Spacing.md,
  },
  stat: {
    alignItems: "flex-start",
  },
  statValue: {
    ...Typography.heading.h3,
  },
  statLabel: {
    ...Typography.caption,
  },
  habitActions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  emptyText: {
    ...Typography.body.large,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  createButton: {
    marginTop: Spacing.md,
  },
});
