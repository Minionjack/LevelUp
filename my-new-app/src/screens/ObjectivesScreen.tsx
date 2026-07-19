/**
 * Objectives Screen
 * Displays daily, weekly, and achievement objectives/quests
 * Based on Solo Leveling design document
 */

import React, { useMemo, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { ObjectiveCard } from '@/components/ObjectiveCard';
import { DailyChallenge } from '@/components/DailyChallenge';
import {
  completeObjective,
  setObjectives,
  setChallenge,
} from '@/store/slices/objectiveSlice';
import { addXP } from '@/store/slices/characterSlice';
import { initializeSampleData } from '@/utils/sampleData';

/**
 * Objectives Screen Component
 */
export const ObjectivesScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { objectives, challenge } = useSelector(
    (state: RootState) => state.objectives
  );
  const { character } = useSelector((state: RootState) => state.character);

  // Initialize sample data if none exists
  useEffect(() => {
    if (objectives.length === 0 || !challenge) {
      const sampleData = initializeSampleData(character?.level || 1);
      const allObjectives = [
        ...sampleData.dailyObjectives,
        ...sampleData.weeklyObjectives,
        ...sampleData.achievementObjectives,
      ];
      dispatch(setObjectives(allObjectives));
      dispatch(setChallenge(sampleData.challenge));
    }
  }, [objectives.length, challenge, character?.level, dispatch]);

  // Filter objectives by type
  const dailyObjectives = useMemo(
    () => objectives.filter((obj) => obj.type === 'daily'),
    [objectives]
  );
  const weeklyObjectives = useMemo(
    () => objectives.filter((obj) => obj.type === 'weekly'),
    [objectives]
  );
  const achievementObjectives = useMemo(
    () => objectives.filter((obj) => obj.type === 'achievement'),
    [objectives]
  );

  const handleObjectivePress = (objectiveId: string) => {
    // In a real app, this would navigate to objective details
    // For now, we'll just handle completion
    const objective = objectives.find((obj) => obj.id === objectiveId);
    if (objective && objective.status === 'in-progress') {
      // Check if objective can be completed
      if (objective.progress >= objective.target) {
        dispatch(completeObjective(objectiveId));
        // Award rewards
        if (objective.rewards.xp > 0) {
          dispatch(addXP(objective.rewards.xp));
        }
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      bounces={true}
    >
      {/* Daily Challenge Section */}
      {challenge && (
        <View style={styles.section}>
          <DailyChallenge challenge={challenge} />
        </View>
      )}

      {/* Daily Objectives Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⚔️ Daily Objectives</Text>
          <Text style={styles.sectionSubtitle}>
            Complete these quests today
          </Text>
        </View>
        {dailyObjectives.length > 0 ? (
          dailyObjectives.map((objective) => (
            <ObjectiveCard
              key={objective.id}
              objective={objective}
              onPress={() => handleObjectivePress(objective.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎯</Text>
            <Text style={styles.emptyText}>No daily objectives available</Text>
            <Text style={styles.emptySubtext}>
              Complete habits to unlock objectives
            </Text>
          </View>
        )}
      </View>

      {/* Weekly Objectives Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🏆 Weekly Objectives</Text>
          <Text style={styles.sectionSubtitle}>
            Complete these quests this week
          </Text>
        </View>
        {weeklyObjectives.length > 0 ? (
          weeklyObjectives.map((objective) => (
            <ObjectiveCard
              key={objective.id}
              objective={objective}
              onPress={() => handleObjectivePress(objective.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏆</Text>
            <Text style={styles.emptyText}>No weekly objectives available</Text>
            <Text style={styles.emptySubtext}>
              Complete daily objectives to unlock weekly quests
            </Text>
          </View>
        )}
      </View>

      {/* Achievement Objectives Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⭐ Achievements</Text>
          <Text style={styles.sectionSubtitle}>
            One-time achievements to unlock
          </Text>
        </View>
        {achievementObjectives.length > 0 ? (
          achievementObjectives.map((objective) => (
            <ObjectiveCard
              key={objective.id}
              objective={objective}
              onPress={() => handleObjectivePress(objective.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⭐</Text>
            <Text style={styles.emptyText}>No achievements available</Text>
            <Text style={styles.emptySubtext}>
              Reach milestones to unlock achievements
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  content: {
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 32,
    marginHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

