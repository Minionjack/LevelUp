/**
 * XP Bar Component
 * Animated XP progress bar with level display
 */

import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

/**
 * XP Bar Component
 */
export const XPBar: React.FC = () => {
  const { character } = useSelector((state: RootState) => state.character);

  const progress = useSharedValue(0);
  const xpGained = useSharedValue(0);

  useEffect(() => {
    if (character) {
      const progressValue = character.xp / character.nextLevelXP;
      progress.value = withSpring(progressValue, { damping: 15 });
    }
  }, [character?.xp, character?.nextLevelXP]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const animatedXPTextStyle = useAnimatedStyle(() => ({
    opacity: xpGained.value > 0 ? 1 : 0,
    transform: [{ translateY: xpGained.value }],
  }));

  if (!character) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.levelText}>Level 1</Text>
          <Text style={styles.rankText}>Loading...</Text>
        </View>
        <View style={styles.xpBarContainer}>
          <View style={styles.xpBarBackground}>
            <View style={[styles.xpBarFill, { width: "0%" }]} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.levelText}>Level {character.level}</Text>
        <Text style={styles.rankText}>{character.rank}</Text>
      </View>

      <View style={styles.xpBarContainer}>
        <View style={styles.xpBarBackground}>
          <Animated.View style={[styles.xpBarFill, animatedProgressStyle]}>
            <View style={styles.xpBarGlow} />
          </Animated.View>
        </View>

        <View style={styles.xpTextContainer}>
          <Text style={styles.xpText}>
            {character.xp.toLocaleString()} /{" "}
            {character.nextLevelXP.toLocaleString()} XP
          </Text>
        </View>
      </View>

      <Animated.View style={[styles.xpGainedText, animatedXPTextStyle]}>
        <Text style={styles.xpGainedTextContent}>+{xpGained.value} XP</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    margin: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  levelText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  rankText: {
    fontSize: 14,
    color: "#64C8FF",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  xpBarContainer: {
    position: "relative",
  },
  xpBarBackground: {
    height: 20,
    backgroundColor: "#0f0f1e",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a2a3e",
  },
  xpBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    position: "relative",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  xpBarGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
  },
  xpTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  xpText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  xpGainedText: {
    position: "absolute",
    top: -30,
    right: 0,
  },
  xpGainedTextContent: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
