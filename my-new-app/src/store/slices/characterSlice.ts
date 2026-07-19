/**
 * Character Slice
 * Redux slice for character/RPG system state
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, CharacterStats, CharacterRank } from "@/types";

/**
 * Calculate XP required for next level
 */
function calculateNextLevelXP(level: number): number {
  // Exponential growth: base * (multiplier ^ level)
  const base = 100;
  const multiplier = 1.5;
  return Math.floor(base * Math.pow(multiplier, level - 1));
}

/**
 * Calculate rank from level
 */
function calculateRank(level: number): CharacterRank {
  if (level >= 100) return "Mythic";
  if (level >= 75) return "Legend";
  if (level >= 50) return "Grandmaster";
  if (level >= 35) return "Master";
  if (level >= 25) return "Expert";
  if (level >= 15) return "Adept";
  if (level >= 5) return "Apprentice";
  return "Novice";
}

/**
 * Initial character state
 * Start with some base stats and XP to make the UI more engaging
 */
const initialCharacter: Character = {
  level: 1,
  xp: 25, // Start with some XP to show progress
  nextLevelXP: calculateNextLevelXP(2),
  rank: "Novice",
  stats: {
    STR: 10, // Base stats for a new character
    AGI: 10,
    INT: 10,
    VIT: 10,
    CHA: 10,
    LUK: 10,
  },
  availableStatPoints: 5, // Give 5 stat points to allocate
  totalXP: 25,
};

interface CharacterState {
  character: Character;
  isLevelingUp: boolean;
}

const initialState: CharacterState = {
  character: initialCharacter,
  isLevelingUp: false,
};

/**
 * Character slice
 */
const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    /**
     * Add XP to character
     */
    addXP: (state, action: PayloadAction<number>) => {
      const { character } = state;
      const xpGained = action.payload;

      character.xp += xpGained;
      character.totalXP += xpGained;

      // Check for level up
      while (character.xp >= character.nextLevelXP) {
        character.xp -= character.nextLevelXP;
        character.level += 1;
        character.nextLevelXP = calculateNextLevelXP(character.level + 1);
        character.availableStatPoints += 5; // +5 stat points per level
        character.rank = calculateRank(character.level);
        state.isLevelingUp = true;
      }
    },

    /**
     * Allocate stat point
     */
    allocateStatPoint: (
      state,
      action: PayloadAction<{ stat: keyof CharacterStats; points: number }>
    ) => {
      const { stat, points } = action.payload;
      const { character } = state;

      if (character.availableStatPoints >= points) {
        character.stats[stat] += points;
        character.availableStatPoints -= points;
      }
    },

    /**
     * Set level up animation complete
     */
    setLevelUpComplete: (state) => {
      state.isLevelingUp = false;
    },

    /**
     * Set character data (from API)
     */
    setCharacter: (state, action: PayloadAction<Character>) => {
      state.character = action.payload;
    },

    /**
     * Update character stats
     */
    updateStats: (state, action: PayloadAction<Partial<CharacterStats>>) => {
      state.character.stats = {
        ...state.character.stats,
        ...action.payload,
      };
    },

    /**
     * Reset character (for testing)
     */
    resetCharacter: (state) => {
      state.character = initialCharacter;
      state.isLevelingUp = false;
    },
  },
});

export const {
  addXP,
  allocateStatPoint,
  setLevelUpComplete,
  setCharacter,
  updateStats,
  resetCharacter,
} = characterSlice.actions;

export default characterSlice.reducer;
