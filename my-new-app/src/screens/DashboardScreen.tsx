/**
 * Dashboard Screen
 * Main screen showing character, stats, and daily progress
 */

import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { XPBar } from "@/components/XPBar";
import { CharacterAvatar } from "@/components/CharacterAvatar";
import { CharacterStats } from "@/components/CharacterStats";
import { LevelUpModal } from "@/components/LevelUpModal";
import { DailyChallenge } from "@/components/DailyChallenge";
import { setChallenge } from "@/store/slices/objectiveSlice";
import { initializeSampleData } from "@/utils/sampleData";

/**
 * Dashboard Screen
 * Main dashboard showing character, stats, and daily progress
 */
export const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { character } = useSelector((state: RootState) => state.character);
  const { habits } = useSelector((state: RootState) => state.habits);
  const { challenge } = useSelector((state: RootState) => state.objectives);

  // Initialize challenge if none exists
  useEffect(() => {
    if (!challenge && character) {
      const sampleData = initializeSampleData(character.level);
      dispatch(setChallenge(sampleData.challenge));
    }
  }, [challenge, character, dispatch]);

  const completedToday = habits.filter(
    (h) => h.is_active && h.total_completions > 0
  ).length;
  const bestStreak = habits.reduce(
    (max, h) => Math.max(max, h.current_streak || 0),
    0
  );

  // Ensure we always have a character (should be initialized in store)
  if (!character) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>
          Loading character...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome, Hunter!</Text>
        <Text style={styles.welcomeSubtitle}>
          Start your journey by creating habits and completing objectives
        </Text>
      </View>

      {/* Character Avatar */}
      <CharacterAvatar />

      {/* XP Bar */}
      <XPBar />

      {/* Daily Challenge */}
      {challenge ? (
        <DailyChallenge challenge={challenge} />
      ) : (
        <View style={styles.challengeContainer}>
          <Text style={styles.challengeTitle}>Daily Challenge</Text>
          <Text style={styles.challengeName}>No active challenge</Text>
          <Text style={styles.challengeProgress}>
            Complete objectives to unlock challenges
          </Text>
        </View>
      )}

      {/* Character Stats */}
      <CharacterStats />

      {/* Quick Stats */}
      <View style={styles.quickStatsContainer}>
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>{habits.length}</Text>
          <Text style={styles.quickStatLabel}>Total Habits</Text>
        </View>
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>{completedToday}</Text>
          <Text style={styles.quickStatLabel}>Completed Today</Text>
        </View>
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>{bestStreak}</Text>
          <Text style={styles.quickStatLabel}>Best Streak</Text>
        </View>
      </View>

      {/* Level Up Modal */}
      <LevelUpModal />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1e",
  },
  content: {
    paddingBottom: 32,
  },
  welcomeContainer: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 20,
    margin: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#2a2a3e",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#64C8FF",
    marginBottom: 8,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    lineHeight: 20,
  },
  challengeContainer: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: "#64C8FF",
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64C8FF",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  challengeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  challengeProgress: {
    fontSize: 16,
    color: "#fff",
  },
  quickStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 16,
    padding: 16,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
  },
  quickStat: {
    alignItems: "center",
  },
  quickStatValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#64C8FF",
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
});
