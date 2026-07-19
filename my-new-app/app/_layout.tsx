/**
 * Root Layout
 * Main app layout with providers
 */

import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store, persistor } from "@/store";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <View style={styles.container}>
              <StatusBar style="light" />
              <Stack
                screenOptions={{
                  headerStyle: {
                    backgroundColor: "#1a1a2e",
                  },
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                  contentStyle: {
                    backgroundColor: "#0f0f1e",
                  },
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              </Stack>
            </View>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1e",
  },
});
