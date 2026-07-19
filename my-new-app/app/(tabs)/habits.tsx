/**
 * Habits Tab
 * Habits list and management screen
 */

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
  completeHabitThunk,
  createHabitThunk,
  fetchHabits,
} from "@/store/slices/habitSlice";

export default function HabitsTab() {
  const dispatch = useAppDispatch();
  const { habits, isLoading, error } = useTypedSelector(
    (state) => state.habits
  );
  const [newHabitName, setNewHabitName] = useState("");
  const [creating, setCreating] = useState(false);
  const [completingId, setCompletingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const handleCreate = async () => {
    const name = newHabitName.trim();
    if (!name) return;

    setCreating(true);
    const result = await dispatch(
      createHabitThunk({ name, frequency: "daily" })
    );
    setCreating(false);
    if (createHabitThunk.fulfilled.match(result)) {
      setNewHabitName("");
    }
  };

  const handleComplete = async (habitId: string) => {
    setCompletingId(habitId);
    await dispatch(completeHabitThunk(habitId));
    setCompletingId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habits</Text>

      <View style={styles.addRow}>
        <TextInput
          style={styles.addInput}
          placeholder="New habit name"
          placeholderTextColor="#666"
          value={newHabitName}
          onChangeText={setNewHabitName}
          onSubmitEditing={handleCreate}
          testID="new-habit-input"
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            (!newHabitName.trim() || creating) && styles.buttonDisabled,
          ]}
          onPress={handleCreate}
          disabled={!newHabitName.trim() || creating}
          testID="add-habit-button"
        >
          {creating ? (
            <ActivityIndicator color="#0f0f1e" size="small" />
          ) : (
            <Text style={styles.addButtonText}>Add</Text>
          )}
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {isLoading && habits.length === 0 ? (
        <ActivityIndicator
          style={styles.loading}
          color="#64C8FF"
          size="large"
        />
      ) : habits.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No habits yet.</Text>
          <Text style={styles.emptySubtext}>Add one above to get started.</Text>
        </View>
      ) : (
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => dispatch(fetchHabits())}
              tintColor="#64C8FF"
            />
          }
          renderItem={({ item }) => (
            <View style={styles.habitCard} testID={`habit-${item.id}`}>
              <View style={styles.habitInfo}>
                <Text style={styles.habitName}>{item.name}</Text>
                <Text style={styles.habitMeta}>
                  🔥 {item.current_streak} streak · {item.total_completions}{" "}
                  completions
                </Text>
              </View>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => handleComplete(item.id)}
                disabled={completingId === item.id}
                testID={`complete-habit-${item.id}`}
              >
                {completingId === item.id ? (
                  <ActivityIndicator color="#0f0f1e" size="small" />
                ) : (
                  <Text style={styles.completeButtonText}>Complete</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1e",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  addRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  addInput: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#2a2a3e",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 15,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#64C8FF",
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: "#0f0f1e",
    fontWeight: "600",
    fontSize: 15,
  },
  error: {
    color: "#FF6B6B",
    fontSize: 14,
    marginBottom: 12,
  },
  loading: {
    marginTop: 48,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
  },
  list: {
    paddingBottom: 24,
  },
  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1a1a2e",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  habitInfo: {
    flex: 1,
    marginRight: 12,
  },
  habitName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  habitMeta: {
    fontSize: 13,
    color: "#999",
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 90,
    alignItems: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});
