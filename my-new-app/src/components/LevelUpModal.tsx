/**
 * Level Up Modal Component
 * Epic level up celebration screen
 */

import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setLevelUpComplete } from "@/store/slices/characterSlice";

/**
 * Level Up Modal Component
 */
export const LevelUpModal: React.FC = () => {
  const { character, isLevelingUp } = useSelector(
    (state: RootState) => state.character
  );
  const dispatch = useDispatch();

  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);
  const glow = useSharedValue(0);

  React.useEffect(() => {
    if (isLevelingUp) {
      scale.value = withSpring(1, { damping: 10 });
      rotation.value = withRepeat(
        withTiming(360, { duration: 2000 }),
        -1,
        false
      );
      glow.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
    } else {
      scale.value = withSpring(0);
    }
  }, [isLevelingUp]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  const handleContinue = () => {
    dispatch(setLevelUpComplete());
  };

  if (!isLevelingUp || !character) return null;

  return (
    <Modal
      visible={isLevelingUp}
      transparent
      animationType="fade"
      onRequestClose={handleContinue}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <Animated.View style={[styles.glow, animatedGlowStyle]} />

          <Text style={styles.levelUpText}>LEVEL UP!</Text>
          <Text style={styles.levelText}>Level {character.level}</Text>
          <Text style={styles.rankText}>{character.rank}</Text>

          <View style={styles.rewardsContainer}>
            <Text style={styles.rewardsTitle}>Rewards:</Text>
            <Text style={styles.rewardItem}>+5 Stat Points</Text>
            <Text style={styles.rewardItem}>+100 Coins</Text>
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#1a1a2e",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#64C8FF",
    minWidth: 300,
    position: "relative",
  },
  glow: {
    position: "absolute",
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: 40,
    backgroundColor: "rgba(100, 200, 255, 0.3)",
    shadowColor: "#64C8FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  levelUpText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#64C8FF",
    marginBottom: 16,
    textShadowColor: "#64C8FF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  levelText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  rankText: {
    fontSize: 20,
    color: "#64C8FF",
    textTransform: "uppercase",
    marginBottom: 24,
  },
  rewardsContainer: {
    width: "100%",
    marginTop: 16,
    padding: 16,
    backgroundColor: "#0f0f1e",
    borderRadius: 12,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  rewardItem: {
    fontSize: 16,
    color: "#4CAF50",
    marginVertical: 4,
  },
  continueButton: {
    marginTop: 24,
    backgroundColor: "#64C8FF",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
