/**
 * Habits Tab
 * Habits list and management screen
 */

import { View, Text, StyleSheet } from 'react-native';

export default function HabitsTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habits</Text>
      <Text style={styles.subtitle}>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
