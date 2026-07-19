/**
 * Habit Service
 * Habit API service
 */

import { api } from './api';
import { Habit, HabitCompletion } from '../../../shared/types';
import { ApiResponse, PaginatedResponse } from '@/types';

/**
 * Habit service
 */
export const habitService = {
  /**
   * Get all habits
   */
  getHabits: async (): Promise<Habit[]> => {
    const response = await api.get<Habit[]>('/habits');
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to get habits');
    }
    return Array.isArray(response.data) ? response.data : [];
  },

  /**
   * Get habit by ID
   */
  getHabit: async (id: string): Promise<Habit> => {
    const response = await api.get<Habit>(`/habits/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to get habit');
    }
    return response.data;
  },

  /**
   * Create habit
   */
  createHabit: async (habit: Partial<Habit>): Promise<Habit> => {
    const response = await api.post<Habit>('/habits', habit);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to create habit');
    }
    return response.data;
  },

  /**
   * Update habit
   */
  updateHabit: async (id: string, habit: Partial<Habit>): Promise<Habit> => {
    const response = await api.put<Habit>(`/habits/${id}`, habit);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to update habit');
    }
    return response.data;
  },

  /**
   * Delete habit
   */
  deleteHabit: async (id: string): Promise<void> => {
    const response = await api.delete(`/habits/${id}`);
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to delete habit');
    }
  },

  /**
   * Complete habit
   */
  completeHabit: async (id: string, completion: Partial<HabitCompletion>): Promise<HabitCompletion> => {
    const response = await api.post<HabitCompletion>(`/habits/${id}/complete`, completion);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to complete habit');
    }
    return response.data;
  },
};
