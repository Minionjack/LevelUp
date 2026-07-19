/**
 * Daily Challenge Component
 * Displays the daily dungeon/challenge with objectives
 * Based on Solo Leveling design document
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Challenge } from '@/types';

interface DailyChallengeProps {
  challenge: Challenge;
}

/**
 * Get difficulty color
 */
const getDifficultyColor = (
  difficulty: Challenge['difficulty']
): string => {
  switch (difficulty) {
    case 'Easy':
      return '#4CAF50'; // Green
    case 'Normal':
      return '#64C8FF'; // Blue
    case 'Hard':
      return '#FF9800'; // Orange
    case 'Elite':
      return '#AA96DA'; // Purple
    default:
      return '#64C8FF';
  }
};

/**
 * Daily Challenge Component
 */
export const DailyChallenge: React.FC<DailyChallengeProps> = ({
  challenge,
}) => {
  const difficultyColor = getDifficultyColor(challenge.difficulty);
  const progressPercentage = Math.min(
    (challenge.progress / challenge.objectives.length) * 100,
    100
  );

  // Get day name for challenge name
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayName = dayNames[new Date(challenge.date).getDay()];

  return (
    <View style={styles.container}>
      {/* Challenge Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.dungeonIcon}>🏰</Text>
          <View style={styles.headerText}>
            <Text style={styles.challengeTitle}>Daily Challenge</Text>
            <Text style={styles.challengeName}>
              {challenge.name || `${dayName}'s Training Grounds`}
            </Text>
          </View>
        </View>

        {/* Difficulty Badge */}
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: difficultyColor + '20', borderColor: difficultyColor },
          ]}
        >
          <Text style={[styles.difficultyText, { color: difficultyColor }]}>
            {challenge.difficulty}
          </Text>
          <Text style={[styles.levelText, { color: difficultyColor }]}>
            Lv.{challenge.level}
          </Text>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Challenge Progress</Text>
          <Text style={styles.progressValue}>
            {challenge.progress} / {challenge.objectives.length}
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${progressPercentage}%`,
                  backgroundColor: difficultyColor,
                },
              ]}
            >
              <View style={styles.progressBarGlow} />
            </View>
          </View>
        </View>
      </View>

      {/* Objectives List */}
      <View style={styles.objectivesSection}>
        <Text style={styles.objectivesTitle}>Objectives</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.objectivesList}
        >
          {challenge.objectives.map((objective, index) => (
            <View
              key={objective.id}
              style={[
                styles.objectiveItem,
                objective.status === 'completed' && styles.objectiveCompleted,
              ]}
            >
              <Text style={styles.objectiveIcon}>
                {objective.status === 'completed' ? '✅' : '⚔️'}
              </Text>
              <Text style={styles.objectiveText} numberOfLines={2}>
                {objective.title}
              </Text>
              <View style={styles.objectiveProgress}>
                <Text style={styles.objectiveProgressText}>
                  {objective.progress}/{objective.target}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Rewards Section */}
      <View style={styles.rewardsSection}>
        <Text style={styles.rewardsTitle}>Challenge Rewards</Text>
        <View style={styles.rewardsGrid}>
          {challenge.rewards.xp > 0 && (
            <View style={styles.rewardCard}>
              <Text style={styles.rewardIcon}>⭐</Text>
              <Text style={styles.rewardAmount}>
                +{challenge.rewards.xp} XP
              </Text>
            </View>
          )}
          {challenge.rewards.coins > 0 && (
            <View style={styles.rewardCard}>
              <Text style={styles.rewardIcon}>💰</Text>
              <Text style={styles.rewardAmount}>
                +{challenge.rewards.coins} Coins
              </Text>
            </View>
          )}
          {challenge.rewards.statPoints &&
            challenge.rewards.statPoints > 0 && (
              <View style={styles.rewardCard}>
                <Text style={styles.rewardIcon}>💪</Text>
                <Text style={styles.rewardAmount}>
                  +{challenge.rewards.statPoints} Stat
                </Text>
              </View>
            )}
        </View>
      </View>

      {/* Completion Status */}
      {challenge.completed && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>🎉 CHALLENGE COMPLETED!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    borderWidth: 2,
    borderColor: '#64C8FF',
    shadowColor: '#64C8FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dungeonIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64C8FF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  challengeName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64C8FF',
    textTransform: 'uppercase',
  },
  progressValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressBarContainer: {
    position: 'relative',
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#0f0f1e',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
    position: 'relative',
  },
  progressBarGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
  },
  objectivesSection: {
    marginBottom: 16,
  },
  objectivesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64C8FF',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  objectivesList: {
    flexDirection: 'row',
  },
  objectiveItem: {
    backgroundColor: '#0f0f1e',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  objectiveCompleted: {
    borderColor: '#4CAF50',
    backgroundColor: '#1a2e1a',
  },
  objectiveIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  objectiveText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  objectiveProgress: {
    alignItems: 'flex-end',
  },
  objectiveProgressText: {
    fontSize: 10,
    color: '#64C8FF',
    fontWeight: '600',
  },
  rewardsSection: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  rewardsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64C8FF',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rewardCard: {
    backgroundColor: '#0f0f1e',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  rewardIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  rewardAmount: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  completedBadge: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  completedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

