/**
 * Stat Bar Component
 * Individual stat display with animated progress bar
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  icon?: string;
}

/**
 * Stat Bar Component
 */
export const StatBar: React.FC<StatBarProps> = ({
  label,
  value,
  maxValue = 100,
  color,
  icon,
}) => {
  const progress = useSharedValue(0);
  
  useEffect(() => {
    const progressValue = Math.min(value / maxValue, 1);
    progress.value = withSpring(progressValue, { damping: 15 });
  }, [value, maxValue]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.value}>{value}</Text>
      </View>
      
      <View style={styles.barContainer}>
        <View style={[styles.barBackground, { borderColor: color + '40' }]}>
          <Animated.View
            style={[
              styles.barFill,
              { backgroundColor: color },
              animatedStyle,
            ]}
          >
            <View style={[styles.barGlow, { backgroundColor: color + '40' }]} />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    marginRight: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64C8FF',
  },
  barContainer: {
    position: 'relative',
  },
  barBackground: {
    height: 12,
    backgroundColor: '#0f0f1e',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  barGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 6,
  },
});

