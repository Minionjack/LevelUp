import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function CategoriesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Organize your habits</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health & Fitness</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Learning</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Productivity</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212121",
  },
});
