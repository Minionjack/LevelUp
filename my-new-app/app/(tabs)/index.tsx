/**
 * Dashboard Tab
 * Main dashboard screen
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { DashboardScreen } from "@/screens/DashboardScreen";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function DashboardTab() {
  return (
    <ErrorBoundary>
      <View style={styles.wrapper}>
        <DashboardScreen />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#0f0f1e",
  },
});
