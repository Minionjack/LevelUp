/**
 * Frontend Types
 * TypeScript types for the frontend application
 */

import { User, Category, Habit } from "../../../shared/types";
export { User, Category, Habit, HabitCompletion } from "../../../shared/types";

/**
 * Character Stats (RPG System)
 */
export interface CharacterStats {
  STR: number; // Strength - Physical habits
  AGI: number; // Agility - Consistency, streaks
  INT: number; // Intelligence - Learning, mental habits
  VIT: number; // Vitality - Health, wellness
  CHA: number; // Charisma - Social habits
  LUK: number; // Luck - Random bonuses
}

/**
 * Character Data
 */
export interface Character {
  level: number;
  xp: number;
  nextLevelXP: number;
  rank: CharacterRank;
  stats: CharacterStats;
  availableStatPoints: number;
  totalXP: number;
  title?: string;
}

/**
 * Character Ranks
 */
export type CharacterRank =
  | "Novice"
  | "Apprentice"
  | "Adept"
  | "Expert"
  | "Master"
  | "Grandmaster"
  | "Legend"
  | "Mythic";

/**
 * Skill
 */
export interface Skill {
  id: string;
  name: string;
  description: string;
  category: "action" | "support" | "passive";
  level: number;
  maxLevel: number;
  unlocked: boolean;
  prerequisites?: string[];
  levelRequired?: number;
  effects: SkillEffect[];
}

/**
 * Skill Effect
 */
export interface SkillEffect {
  type:
    | "xp-boost"
    | "coin-boost"
    | "streak-shield"
    | "time-extension"
    | "stat-growth";
  value: number;
  description: string;
}

/**
 * Objective (Quest)
 */
export interface Objective {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "achievement";
  progress: number;
  target: number;
  rewards: Rewards;
  deadline?: Date;
  status: "pending" | "in-progress" | "completed" | "expired";
  habitIds?: string[];
}

/**
 * Challenge (Daily Challenge)
 */
export interface Challenge {
  id: string;
  name: string;
  difficulty: "Easy" | "Normal" | "Hard" | "Elite";
  level: number;
  objectives: Objective[];
  rewards: Rewards;
  progress: number;
  completed: boolean;
  date: Date;
}

/**
 * Rewards
 */
export interface Rewards {
  xp: number;
  coins: number;
  statPoints?: number;
  skillPoints?: number;
  items?: Item[];
  title?: string;
}

/**
 * Item
 */
export interface Item {
  id: string;
  name: string;
  description: string;
  type: "potion" | "freeze" | "elixir" | "coin" | "boost";
  effect: string;
  quantity: number;
}

/**
 * Inventory
 */
export interface Inventory {
  coins: number;
  items: Item[];
}

/**
 * App State
 */
export interface AppState {
  user: User | null;
  character: Character | null;
  habits: Habit[];
  categories: Category[];
  objectives: Objective[];
  challenge: Challenge | null;
  inventory: Inventory;
  skills: Skill[];
  loading: boolean;
  error: string | null;
}

/**
 * API Response
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  message?: string;
}
