/**
 * Habit Slice
 * Redux slice for habits state
 */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiClient, extractErrorMessage } from "@/services/api";

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

interface AuthTokenState {
  auth: { token: string | null };
}

interface CreateHabitData {
  name: string;
  description?: string;
  frequency: "daily" | "weekly" | "monthly";
  target_value?: number;
  target_unit?: string;
  category_id?: string;
}

export const fetchHabits = createAsyncThunk<
  Habit[],
  void,
  { state: AuthTokenState }
>("habits/fetchAll", async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await apiClient.get("/habits", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data as Habit[];
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const createHabitThunk = createAsyncThunk<
  Habit,
  CreateHabitData,
  { state: AuthTokenState }
>("habits/create", async (data, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await apiClient.post("/habits", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data as Habit;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const completeHabitThunk = createAsyncThunk<
  Habit,
  string,
  { state: AuthTokenState }
>("habits/complete", async (habitId, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await apiClient.post(
      `/habits/${habitId}/complete`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data as Habit;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Failed to load habits";
      })
      .addCase(createHabitThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createHabitThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits.push(action.payload);
      })
      .addCase(createHabitThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Failed to create habit";
      })
      .addCase(completeHabitThunk.fulfilled, (state, action) => {
        const index = state.habits.findIndex((h) => h.id === action.payload.id);
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })
      .addCase(completeHabitThunk.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "Failed to complete habit";
      });
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
