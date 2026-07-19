/**
 * Objective Card Component
 * Displays a quest/objective with progress, rewards, and status
 * Based on Solo Leveling design document
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Objective } from '@/types';

interface ObjectiveCardProps {
  objective: Objective;
  onPress?: () => void;
}

/**
 * Get difficulty color based on objective type
 */
const getTypeColor = (type: Objective['type']): string => {
  switch (type) {
    case 'daily':
      return '#4ECDC4'; // Cyan
    case 'weekly':
      return '#FF9800'; // Orange
    case 'achievement':
      return '#AA96DA'; // Purple
    default:
      return '#64C8FF';
  }
};

/**
 * Get status icon
 */
const getStatusIcon = (status: Objective['status']): string => {
  switch (status) {
    case 'completed':
      return '✅';
    case 'in-progress':
      return '⚔️';
    case 'expired':
      return '❌';
    default:
      return '🎯';
  }
};

/**
 * Objective Card Component
 */
export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  objective,
  onPress,
}) => {
  const progressPercentage = Math.min(
    (objective.progress / objective.target) * 100,
    100
  );
  const typeColor = getTypeColor(objective.type);
  const statusIcon = getStatusIcon(objective.status);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        objective.status === 'completed' && styles.completedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.statusIcon}>{statusIcon}</Text>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{objective.title}</Text>
            <View
              style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}
            >
              <Text style={[styles.typeText, { color: typeColor }]}>
                {objective.type.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{objective.description}</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progressPercentage}%`,
                backgroundColor: typeColor,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {objective.progress} / {objective.target}
        </Text>
      </View>

      {/* Rewards */}
      <View style={styles.rewardsContainer}>
        <Text style={styles.rewardsLabel}>Rewards:</Text>
        <View style={styles.rewardsList}>
          {objective.rewards.xp > 0 && (
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>⭐</Text>
              <Text style={styles.rewardText}>
                +{objective.rewards.xp} XP
              </Text>
            </View>
          )}
          {objective.rewards.coins > 0 && (
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>💰</Text>
              <Text style={styles.rewardText}>
                +{objective.rewards.coins} Coins
              </Text>
            </View>
          )}
          {objective.rewards.statPoints && objective.rewards.statPoints > 0 && (
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>💪</Text>
              <Text style={styles.rewardText}>
                +{objective.rewards.statPoints} Stat Point
                {objective.rewards.statPoints > 1 ? 's' : ''}
              </Text>
            </View>
          )}
          {objective.rewards.skillPoints &&
            objective.rewards.skillPoints > 0 && (
              <View style={styles.rewardItem}>
                <Text style={styles.rewardIcon}>🎯</Text>
                <Text style={styles.rewardText}>
                  +{objective.rewards.skillPoints} Skill Point
                  {objective.rewards.skillPoints > 1 ? 's' : ''}
                </Text>
              </View>
            )}
        </View>
      </View>

      {/* Deadline */}
      {objective.deadline && objective.status !== 'completed' && (
        <Text style={styles.deadline}>
          Deadline: {new Date(objective.deadline).toLocaleDateString()}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  completedContainer: {
    borderColor: '#4CAF50',
    opacity: 0.8,
  },
  header: {
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 12,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#0f0f1e',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#64C8FF',
    fontWeight: '600',
    textAlign: 'right',
  },
  rewardsContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  rewardsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64C8FF',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  rewardsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0f1e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rewardIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  rewardText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  deadline: {
    fontSize: 11,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

