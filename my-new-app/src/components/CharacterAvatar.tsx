/**
 * Character Avatar Component
 * Animated character avatar with level and rank display
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

/**
 * Character Avatar Component
 */
export const CharacterAvatar: React.FC = () => {
  const { character, isLevelingUp } = useSelector(
    (state: RootState) => state.character
  );
  
  const floatY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const glow = useSharedValue(0);
  
  // Idle floating animation
  useEffect(() => {
    floatY.value = withRepeat(
      withTiming(10, { duration: 2000 }),
      -1,
      true
    );
  }, []);
  
  // Level up animation
  useEffect(() => {
    if (isLevelingUp) {
      scale.value = withSpring(1.2, { damping: 8 });
      rotation.value = withTiming(360, { duration: 1000 });
      glow.value = withRepeat(
        withTiming(1, { duration: 500 }),
        4,
        true
      );
      
      setTimeout(() => {
        scale.value = withSpring(1, { damping: 8 });
        rotation.value = withTiming(0);
        glow.value = withTiming(0);
      }, 2000);
    }
  }, [isLevelingUp]);
  
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: floatY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));
  
  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [{ scale: 1 + glow.value * 0.2 }],
  }));
  
  if (!character) {
    return (
      <View style={styles.container}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>?</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.rankText}>Loading...</Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.avatarContainer, animatedContainerStyle]}>
        <Animated.View style={[styles.glow, animatedGlowStyle]} />
        
        {/* Placeholder for character image */}
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {character.rank.charAt(0)}
          </Text>
        </View>
        
        {/* Character level badge */}
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>Lv.{character.level}</Text>
        </View>
      </Animated.View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.rankText}>{character.rank}</Text>
        {character.title && (
          <Text style={styles.titleText}>{character.title}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(100, 200, 255, 0.3)',
    shadowColor: '#64C8FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  avatarPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#2a2a3e',
    borderWidth: 4,
    borderColor: '#64C8FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#64C8FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  avatarText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#64C8FF',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  levelBadgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#64C8FF',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
});

