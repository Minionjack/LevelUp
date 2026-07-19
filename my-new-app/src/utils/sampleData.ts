/**
 * Sample Data Utility
 * Provides sample objectives and challenges for development/demo
 * Based on Solo Leveling design document
 */

import { Objective, Challenge } from "@/types";

/**
 * Generate sample daily objectives
 */
export const generateSampleDailyObjectives = (): Objective[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(23, 59, 59, 999);

  return [
    {
      id: "daily-1",
      title: "Morning Warrior",
      description: "Complete 3 habits before 10 AM",
      type: "daily",
      progress: 1,
      target: 3,
      rewards: {
        xp: 50,
        coins: 10,
      },
      deadline: tomorrow,
      status: "in-progress",
    },
    {
      id: "daily-2",
      title: "Consistency Master",
      description: "Maintain a 5-day streak",
      type: "daily",
      progress: 3,
      target: 5,
      rewards: {
        xp: 100,
        coins: 20,
      },
      deadline: tomorrow,
      status: "in-progress",
    },
    {
      id: "daily-3",
      title: "Category Champion",
      description: "Complete all habits in Health & Fitness category",
      type: "daily",
      progress: 0,
      target: 3,
      rewards: {
        xp: 150,
        coins: 30,
        statPoints: 1,
      },
      deadline: tomorrow,
      status: "pending",
    },
  ];
};

/**
 * Generate sample weekly objectives
 */
export const generateSampleWeeklyObjectives = (): Objective[] => {
  const today = new Date();
  const nextSunday = new Date(today);
  const daysUntilSunday = 7 - today.getDay();
  nextSunday.setDate(today.getDate() + daysUntilSunday);
  nextSunday.setHours(23, 59, 59, 999);

  return [
    {
      id: "weekly-1",
      title: "Weekly Champion",
      description: "Complete 20 habits this week",
      type: "weekly",
      progress: 8,
      target: 20,
      rewards: {
        xp: 500,
        coins: 100,
      },
      deadline: nextSunday,
      status: "in-progress",
    },
    {
      id: "weekly-2",
      title: "Perfect Week",
      description: "Complete all daily habits 7 days in a row",
      type: "weekly",
      progress: 3,
      target: 7,
      rewards: {
        xp: 1000,
        coins: 200,
        skillPoints: 1,
      },
      deadline: nextSunday,
      status: "in-progress",
    },
  ];
};

/**
 * Generate sample achievement objectives
 */
export const generateSampleAchievementObjectives = (): Objective[] => {
  return [
    {
      id: "achievement-1",
      title: "Rising Star",
      description: "Reach Level 10",
      type: "achievement",
      progress: 1,
      target: 10,
      rewards: {
        xp: 500,
        coins: 100,
        skillPoints: 1,
        title: "Rising Star",
      },
      status: "in-progress",
    },
    {
      id: "achievement-2",
      title: "Habit Master",
      description: "Complete 100 habits total",
      type: "achievement",
      progress: 23,
      target: 100,
      rewards: {
        xp: 1000,
        coins: 200,
        statPoints: 5,
      },
      status: "in-progress",
    },
    {
      id: "achievement-3",
      title: "Streak Legend",
      description: "Achieve a 30-day streak",
      type: "achievement",
      progress: 5,
      target: 30,
      rewards: {
        xp: 2000,
        coins: 500,
        skillPoints: 2,
        title: "Streak Legend",
      },
      status: "in-progress",
    },
  ];
};

/**
 * Generate sample daily challenge
 */
export const generateSampleDailyChallenge = (level: number = 1): Challenge => {
  const today = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[today.getDay()];

  // Determine difficulty based on level
  let difficulty: Challenge["difficulty"] = "Easy";
  if (level >= 25) difficulty = "Elite";
  else if (level >= 15) difficulty = "Hard";
  else if (level >= 5) difficulty = "Normal";

  const challengeObjectives: Objective[] = [
    {
      id: "challenge-obj-1",
      title: "Complete Morning Exercise",
      description: "Start your day with physical activity",
      type: "daily",
      progress: 0,
      target: 1,
      rewards: { xp: 20, coins: 5 },
      status: "pending",
    },
    {
      id: "challenge-obj-2",
      title: "Read for 30 minutes",
      description: "Expand your knowledge",
      type: "daily",
      progress: 0,
      target: 1,
      rewards: { xp: 20, coins: 5 },
      status: "pending",
    },
    {
      id: "challenge-obj-3",
      title: "Meditate",
      description: "Take time for mindfulness",
      type: "daily",
      progress: 0,
      target: 1,
      rewards: { xp: 20, coins: 5 },
      status: "pending",
    },
    {
      id: "challenge-obj-4",
      title: "Drink 8 glasses of water",
      description: "Stay hydrated",
      type: "daily",
      progress: 0,
      target: 1,
      rewards: { xp: 20, coins: 5 },
      status: "pending",
    },
    {
      id: "challenge-obj-5",
      title: "Journal entry",
      description: "Reflect on your day",
      type: "daily",
      progress: 0,
      target: 1,
      rewards: { xp: 20, coins: 5 },
      status: "pending",
    },
  ];

  return {
    id: `challenge-${today.toISOString().split("T")[0]}`,
    name: `${dayName}'s Training Grounds`,
    difficulty,
    level,
    objectives: challengeObjectives,
    rewards: {
      xp: 150,
      coins: 50,
      statPoints: 1,
    },
    progress: 0,
    completed: false,
    date: today,
  };
};

/**
 * Initialize all sample data
 */
export const initializeSampleData = (level: number = 1) => {
  return {
    dailyObjectives: generateSampleDailyObjectives(),
    weeklyObjectives: generateSampleWeeklyObjectives(),
    achievementObjectives: generateSampleAchievementObjectives(),
    challenge: generateSampleDailyChallenge(level),
  };
};
