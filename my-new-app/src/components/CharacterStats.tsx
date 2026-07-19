/**
 * Character Stats Component
 * Display all character stats with animated bars
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { StatBar } from './StatBar';
import { CharacterStats as CharacterStatsType } from '@/types';

/**
 * Stat colors
 */
const STAT_COLORS: Record<keyof CharacterStatsType, string> = {
  STR: '#FF6B6B', // Red - Strength
  AGI: '#4ECDC4', // Cyan - Agility
  INT: '#95E1D3', // Teal - Intelligence
  VIT: '#F38181', // Pink - Vitality
  CHA: '#AA96DA', // Purple - Charisma
  LUK: '#FFD93D', // Yellow - Luck
};

/**
 * Stat icons
 */
const STAT_ICONS: Record<keyof CharacterStatsType, string> = {
  STR: '💪',
  AGI: '⚡',
  INT: '🧠',
  VIT: '❤️',
  CHA: '✨',
  LUK: '🍀',
};

/**
 * Stat labels
 */
const STAT_LABELS: Record<keyof CharacterStatsType, string> = {
  STR: 'Strength',
  AGI: 'Agility',
  INT: 'Intelligence',
  VIT: 'Vitality',
  CHA: 'Charisma',
  LUK: 'Luck',
};

/**
 * Character Stats Component
 */
export const CharacterStats: React.FC = () => {
  const { character } = useSelector((state: RootState) => state.character);
  
  if (!character) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Character Stats</Text>
        <Text style={{ color: '#666', textAlign: 'center', padding: 20 }}>
          Loading character stats...
        </Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Character Stats</Text>
      
      <ScrollView style={styles.statsContainer}>
        {(Object.keys(character.stats) as Array<keyof CharacterStatsType>).map(
          (statKey) => (
            <StatBar
              key={statKey}
              label={STAT_LABELS[statKey]}
              value={character.stats[statKey]}
              maxValue={100}
              color={STAT_COLORS[statKey]}
              icon={STAT_ICONS[statKey]}
            />
          )
        )}
      </ScrollView>
      
      {character.availableStatPoints > 0 && (
        <View style={styles.statPointsContainer}>
          <Text style={styles.statPointsText}>
            Available Stat Points: {character.availableStatPoints}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  statsContainer: {
    maxHeight: 400,
  },
  statPointsContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#2a2a3e',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#64C8FF',
  },
  statPointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64C8FF',
    textAlign: 'center',
  },
});

