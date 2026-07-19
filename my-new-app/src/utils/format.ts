/**
 * Formatting Utilities
 * Common formatting functions
 *
 * @module utils/format
 */

import { format, formatDistanceToNow } from "date-fns";

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date): string => {
  return format(new Date(date), "MMM dd, yyyy");
};

/**
 * Format date and time
 */
export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), "MMM dd, yyyy 'at' h:mm a");
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Format streak text
 */
export const formatStreak = (days: number): string => {
  if (days === 0) {
    return "No streak";
  }
  if (days === 1) {
    return "1 day";
  }
  return `${days} days`;
};
