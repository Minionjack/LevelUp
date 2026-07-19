import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { loginUser } from "@/store/slices/authSlice";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useTypedSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit =
    email.trim().length > 0 && password.length > 0 && !isLoading;

  const handleLogin = async () => {
    const result = await dispatch(loginUser({ email: email.trim(), password }));
    if (loginUser.fulfilled.match(result)) {
      router.replace("/(tabs)/habits");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#757575"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        testID="email-input"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#757575"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        testID="password-input"
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={!canSubmit}
        testID="login-button"
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => router.push("/(auth)/register")}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f1e",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#64C8FF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#757575",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#2a2a3e",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },
  error: {
    color: "#FF6B6B",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#64C8FF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    minWidth: 200,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#0f0f1e",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    color: "#64C8FF",
    fontSize: 14,
  },
});
