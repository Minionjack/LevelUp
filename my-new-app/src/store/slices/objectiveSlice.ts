/**
 * Objective Slice
 * Redux slice for objectives/quests state
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Objective, Challenge } from "@/types";

interface ObjectiveState {
  objectives: Objective[];
  challenge: Challenge | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ObjectiveState = {
  objectives: [],
  challenge: null,
  isLoading: false,
  error: null,
};

const objectiveSlice = createSlice({
  name: "objectives",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setObjectives: (state, action: PayloadAction<Objective[]>) => {
      state.objectives = action.payload;
      state.error = null;
    },

    addObjective: (state, action: PayloadAction<Objective>) => {
      state.objectives.push(action.payload);
    },

    updateObjective: (state, action: PayloadAction<Objective>) => {
      const index = state.objectives.findIndex(
        (o) => o.id === action.payload.id
      );
      if (index !== -1) {
        state.objectives[index] = action.payload;
      }
    },

    completeObjective: (state, action: PayloadAction<string>) => {
      const objective = state.objectives.find((o) => o.id === action.payload);
      if (objective) {
        objective.status = "completed";
        objective.progress = objective.target;
      }
    },

    setChallenge: (state, action: PayloadAction<Challenge | null>) => {
      state.challenge = action.payload;
    },

    updateChallengeProgress: (state, action: PayloadAction<number>) => {
      if (state.challenge) {
        state.challenge.progress = action.payload;
        if (state.challenge.progress >= state.challenge.objectives.length) {
          state.challenge.completed = true;
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
  setObjectives,
  addObjective,
  updateObjective,
  completeObjective,
  setChallenge,
  updateChallengeProgress,
  setError,
} = objectiveSlice.actions;

export default objectiveSlice.reducer;
