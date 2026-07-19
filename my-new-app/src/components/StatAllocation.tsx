/**
 * Stat Allocation Component
 * Allows users to allocate stat points to character stats
 * Based on Solo Leveling design document
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { allocateStatPoint } from '@/store/slices/characterSlice';
import { CharacterStats } from '@/types';

/**
 * Stat colors matching CharacterStats component
 */
const STAT_COLORS: Record<keyof CharacterStats, string> = {
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
const STAT_ICONS: Record<keyof CharacterStats, string> = {
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
const STAT_LABELS: Record<keyof CharacterStats, string> = {
  STR: 'Strength',
  AGI: 'Agility',
  INT: 'Intelligence',
  VIT: 'Vitality',
  CHA: 'Charisma',
  LUK: 'Luck',
};

/**
 * Stat Allocation Component
 */
export const StatAllocation: React.FC = () => {
  const dispatch = useDispatch();
  const { character } = useSelector((state: RootState) => state.character);

  if (!character || character.availableStatPoints === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Stat Allocation</Text>
          <Text style={styles.subtitle}>
            {character?.availableStatPoints === 0
              ? 'No stat points available'
              : 'Allocate your stat points'}
          </Text>
        </View>
        {character?.availableStatPoints === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💪</Text>
            <Text style={styles.emptyText}>
              Level up to earn more stat points!
            </Text>
          </View>
        )}
      </View>
    );
  }

  const handleAllocateStat = (stat: keyof CharacterStats) => {
    if (character.availableStatPoints > 0) {
      dispatch(allocateStatPoint({ stat, points: 1 }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stat Allocation</Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>Available Points:</Text>
          <Text style={styles.pointsValue}>
            {character.availableStatPoints}
          </Text>
        </View>
      </View>

      <Text style={styles.instruction}>
        Tap a stat to allocate 1 point
      </Text>

      <View style={styles.statsGrid}>
        {(Object.keys(character.stats) as Array<keyof CharacterStats>).map(
          (statKey) => {
            const statValue = character.stats[statKey];
            const color = STAT_COLORS[statKey];
            const icon = STAT_ICONS[statKey];
            const label = STAT_LABELS[statKey];

            return (
              <TouchableOpacity
                key={statKey}
                style={[styles.statCard, { borderColor: color + '40' }]}
                onPress={() => handleAllocateStat(statKey)}
                activeOpacity={0.7}
                disabled={character.availableStatPoints === 0}
              >
                <View style={styles.statHeader}>
                  <Text style={styles.statIcon}>{icon}</Text>
                  <Text style={styles.statLabel}>{label}</Text>
                </View>
                <View style={styles.statValueContainer}>
                  <Text style={[styles.statValue, { color }]}>
                    {statValue}
                  </Text>
                  <View
                    style={[
                      styles.addButton,
                      {
                        backgroundColor: color + '20',
                        opacity: character.availableStatPoints > 0 ? 1 : 0.5,
                      },
                    ]}
                  >
                    <Text style={[styles.addButtonText, { color }]}>+1</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💡 Stat Information</Text>
        <Text style={styles.infoText}>
          • STR: Physical habits (exercise, fitness)
        </Text>
        <Text style={styles.infoText}>
          • AGI: Consistency and streaks
        </Text>
        <Text style={styles.infoText}>
          • INT: Learning and mental habits
        </Text>
        <Text style={styles.infoText}>
          • VIT: Health and wellness habits
        </Text>
        <Text style={styles.infoText}>
          • CHA: Social and communication habits
        </Text>
        <Text style={styles.infoText}>
          • LUK: Random bonuses and multipliers
        </Text>
      </View>
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#0f0f1e',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#64C8FF',
  },
  pointsLabel: {
    fontSize: 14,
    color: '#64C8FF',
    fontWeight: '600',
    marginRight: 8,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#64C8FF',
  },
  instruction: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#0f0f1e',
    borderRadius: 8,
    padding: 12,
    minWidth: '30%',
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
  },
  statHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#0f0f1e',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64C8FF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
    lineHeight: 18,
  },
});

