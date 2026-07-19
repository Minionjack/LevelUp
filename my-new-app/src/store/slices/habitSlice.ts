/**
 * Habit Slice
 * Redux slice for habits state
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Habit } from "../../../../shared/types";

interface HabitState {
  habits: Habit[];
  selectedHabit: Habit | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  selectedHabit: null,
  isLoading: false,
  error: null,
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setHabits: (state, action: PayloadAction<Habit[]>) => {
      state.habits = action.payload;
      state.error = null;
    },

    addHabit: (state, action: PayloadAction<Habit>) => {
      state.habits.push(action.payload);
    },

    updateHabit: (state, action: PayloadAction<Habit>) => {
      const index = state.habits.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        state.habits[index] = action.payload;
      }
    },

    deleteHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
    },

    selectHabit: (state, action: PayloadAction<Habit | null>) => {
      state.selectedHabit = action.payload;
    },

    completeHabit: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (habit) {
        habit.total_completions += 1;
        habit.current_streak += 1;
        if (habit.current_streak > habit.longest_streak) {
          habit.longest_streak = habit.current_streak;
        }
      }
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setHabits,
  addHabit,
  updateHabit,
  deleteHabit,
  selectHabit,
  completeHabit,
  setError,
} = habitSlice.actions;

export default habitSlice.reducer;
