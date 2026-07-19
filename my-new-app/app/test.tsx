/**
 * Test Screen
 * Simple test screen to verify app loads
 */

import { View, Text, StyleSheet } from "react-native";

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LevelUp App is Working! 🎉</Text>
      <Text style={styles.subtext}>If you see this, the app is loading correctly.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 16,
    textAlign: "center",
  },
  subtext: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
  },
});

