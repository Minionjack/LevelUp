/**
 * Loading Screen Component
 * Shows a loading state while data is being fetched
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface LoadingScreenProps {
  message?: string;
}

/**
 * Loading Screen Component
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#64C8FF" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#64C8FF',
    textAlign: 'center',
  },
});

