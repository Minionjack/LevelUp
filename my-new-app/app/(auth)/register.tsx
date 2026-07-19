import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { registerUser } from "@/store/slices/authSlice";

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useTypedSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const canSubmit =
    email.trim().length > 0 &&
    password.length >= 8 &&
    username.trim().length >= 3 &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    !isLoading;

  const handleRegister = async () => {
    const result = await dispatch(
      registerUser({
        email: email.trim(),
        password,
        username: username.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      })
    );
    if (registerUser.fulfilled.match(result)) {
      router.replace("/(tabs)/habits");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create your account</Text>

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
          placeholder="Username"
          placeholderTextColor="#757575"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          testID="username-input"
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.rowInput]}
            placeholder="First name"
            placeholderTextColor="#757575"
            value={firstName}
            onChangeText={setFirstName}
            testID="first-name-input"
          />
          <TextInput
            style={[styles.input, styles.rowInput]}
            placeholder="Last name"
            placeholderTextColor="#757575"
            value={lastName}
            onChangeText={setLastName}
            testID="last-name-input"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password (min. 8 characters)"
          placeholderTextColor="#757575"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          testID="password-input"
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={!canSubmit}
          testID="register-button"
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => router.back()}>
          <Text style={styles.linkText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#0f0f1e",
  },
  container: {
    flexGrow: 1,
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
  row: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 320,
    justifyContent: "space-between",
  },
  rowInput: {
    width: "48%",
    maxWidth: "48%",
  },
  error: {
    color: "#FF6B6B",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
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
    color: "#FFFFFF",
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
