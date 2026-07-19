/**
 * Character Tab
 * Character details and stat allocation screen
 */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import { CharacterStats } from '@/components/CharacterStats';
import { StatAllocation } from '@/components/StatAllocation';

export default function CharacterTab() {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <CharacterAvatar />
        <CharacterStats />
        <StatAllocation />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  content: {
    paddingBottom: 32,
  },
});

