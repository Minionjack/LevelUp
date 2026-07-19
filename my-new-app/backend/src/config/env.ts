/**
 * Environment Configuration
 * Loads and validates environment variables
 *
 * @module config/env
 */

import { config as dotenvConfig } from "dotenv";
import { z } from "zod";

// Load environment variables
dotenvConfig();

/**
 * Environment variable schema validation
 */
const envSchema = z.object({
  // Server Configuration
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().transform(Number).pipe(z.number().int().positive()),
  HOST: z.string().default("localhost"),

  // Database Configuration
  DATABASE_URL: z.string().url(),
  DB_HOST: z.string().optional(),
  DB_PORT: z
    .string()
    .transform(Number)
    .pipe(z.number().int().positive())
    .optional(),
  DB_NAME: z.string().optional(),
  DB_USER: z.string().optional(),
  DB_PASSWORD: z.string().optional(),

  // Redis Configuration
  REDIS_URL: z.string().optional(),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z
    .string()
    .transform(Number)
    .pipe(z.number().int().positive())
    .default("6379"),

  // JWT Configuration
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  // API Configuration
  API_VERSION: z.string().default("v1"),
  API_PREFIX: z.string().default("/api/v1"),

  // CORS Configuration
  CORS_ORIGIN: z
    .string()
    .default("http://localhost:3000,http://localhost:19006"),

  // Logging
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
});

/**
 * Validated environment configuration
 */
export const config = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || "4000",
  HOST: process.env.HOST || "localhost",
  DATABASE_URL: process.env.DATABASE_URL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  API_VERSION: process.env.API_VERSION,
  API_PREFIX:
    process.env.API_PREFIX || `/api/${process.env.API_VERSION || "v1"}`,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  LOG_LEVEL: process.env.LOG_LEVEL,
});

/**
 * Type-safe configuration export
 */
export type Config = typeof config;
