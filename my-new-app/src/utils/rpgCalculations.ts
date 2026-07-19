/**
 * RPG Calculations
 * Utility functions for RPG system calculations
 */

import { CharacterStats, Habit } from "@/types";

/**
 * Calculate XP reward for habit completion
 */
export function calculateHabitXP(
  habit: Habit,
  streak: number,
  skills: { xpBoost: number } = { xpBoost: 0 }
): number {
  const baseXP = 10;
  const streakMultiplier = 1 + streak * 0.1; // 10% per streak day
  const categoryBonus = getCategoryBonus(habit.category_id);
  const skillBonus = 1 + skills.xpBoost / 100;

  const xp = Math.floor(baseXP * streakMultiplier * categoryBonus * skillBonus);

  return xp;
}

/**
 * Calculate coin reward for habit completion
 */
export function calculateHabitCoins(xp: number): number {
  return Math.floor(xp * 0.1); // 10% of XP
}

/**
 * Calculate stat points reward
 */
export function calculateStatPointsReward(streak: number): number {
  if (streak >= 30) return 2;
  if (streak >= 7) return 1;
  return 0;
}

/**
 * Get category bonus multiplier
 */
function getCategoryBonus(_categoryId: string | null): number {
  // Different categories give different bonuses
  // This is a placeholder - implement based on your category system
  return 1.0;
}

/**
 * Calculate which stat to increase based on habit category
 */
export function getStatForCategory(
  categoryId: string | null,
  categoryName?: string
): keyof CharacterStats | null {
  // Map categories to stats
  const categoryLower = categoryName?.toLowerCase() || "";

  if (
    categoryLower.includes("exercise") ||
    categoryLower.includes("fitness") ||
    categoryLower.includes("physical")
  ) {
    return "STR";
  }
  if (
    categoryLower.includes("learning") ||
    categoryLower.includes("reading") ||
    categoryLower.includes("study")
  ) {
    return "INT";
  }
  if (
    categoryLower.includes("health") ||
    categoryLower.includes("wellness") ||
    categoryLower.includes("self-care")
  ) {
    return "VIT";
  }
  if (
    categoryLower.includes("social") ||
    categoryLower.includes("communication")
  ) {
    return "CHA";
  }

  // Default: AGI for consistency/streaks
  return "AGI";
}

/**
 * Calculate XP required for level
 */
export function calculateLevelXP(level: number): number {
  const base = 100;
  const multiplier = 1.5;
  return Math.floor(base * Math.pow(multiplier, level - 1));
}

/**
 * Calculate rank from level
 */
export function calculateRank(level: number): string {
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
 * Calculate rewards for habit completion
 */
export function calculateRewards(
  habit: Habit,
  streak: number,
  skills: { xpBoost: number } = { xpBoost: 0 }
) {
  const xp = calculateHabitXP(habit, streak, skills);
  const coins = calculateHabitCoins(xp);
  const statPoints = calculateStatPointsReward(streak);
  const stat = getStatForCategory(habit.category_id);

  return {
    xp,
    coins,
    statPoints,
    stat,
  };
}
