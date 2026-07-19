import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(tabs)/habits")}
      >
        <Text style={styles.buttonText}>Login (Demo)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => router.push("/(auth)/register")}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#757575",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    minWidth: 200,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    color: "#2196F3",
    fontSize: 14,
  },
});
