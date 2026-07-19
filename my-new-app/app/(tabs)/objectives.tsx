/**
 * Objectives Tab
 * Objectives/quests screen
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ObjectivesScreen } from '@/screens/ObjectivesScreen';

export default function ObjectivesTab() {
  return (
    <View style={styles.wrapper}>
      <ObjectivesScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
});

