/**
 * Logger Utility
 * Centralized logging configuration using Pino
 *
 * @module utils/logger
 */

import pino from "pino";
import { config } from "@/config/env";

/**
 * Create Pino logger instance
 * Configured based on environment variables
 */
export const logger = pino({
  level: config.LOG_LEVEL,
  transport:
    config.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        }
      : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    env: config.NODE_ENV,
  },
});

/**
 * Log levels for reference
 */
export const LogLevel = {
  FATAL: "fatal",
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
  DEBUG: "debug",
  TRACE: "trace",
} as const;
