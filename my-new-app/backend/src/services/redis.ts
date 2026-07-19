/**
 * Redis Service
 * Redis connection and cache management
 *
 * @module services/redis
 */

import { createClient, RedisClientType } from "redis";

import { config } from "@/config/env";
import { logger } from "@/utils/logger";

/**
 * Redis client instance
 */
let client: RedisClientType | null = null;

/**
 * Initialize Redis connection
 */
export async function initRedis(): Promise<RedisClientType> {
  // Check if client exists and is connected
  if (client) {
    try {
      // Try to ping to check if connection is alive
      await client.ping();
      return client;
    } catch (error) {
      // Connection is dead, create new one
      client = null;
    }
  }

  const redisUrl =
    config.REDIS_URL || `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`;

  client = createClient({
    url: redisUrl,
  });

  client.on("error", (err: Error) => {
    logger.error("Redis client error:", err);
  });

  client.on("connect", () => {
    logger.info("✅ Redis connection established");
  });

  client.on("disconnect", () => {
    logger.warn("Redis client disconnected");
  });

  await client.connect();

  return client;
}

/**
 * Get Redis client instance
 */
export async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    return initRedis();
  }

  // Verify connection is alive
  try {
    await client.ping();
    return client;
  } catch (error) {
    // Connection is dead, reinitialize
    logger.warn("Redis connection lost, reinitializing...");
    return initRedis();
  }
}

/**
 * Cache operations
 */
export const cache = {
  /**
   * Get value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const redis = await getRedisClient();
      const value = await redis.get(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      logger.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  },

  /**
   * Set value in cache
   */
  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    try {
      const redis = await getRedisClient();
      const serialized = JSON.stringify(value);
      if (ttlSeconds) {
        await redis.setEx(key, ttlSeconds, serialized);
      } else {
        await redis.set(key, serialized);
      }
    } catch (error) {
      logger.error(`Cache set error for key ${key}:`, error);
    }
  },

  /**
   * Delete value from cache
   */
  async del(key: string): Promise<void> {
    try {
      const redis = await getRedisClient();
      await redis.del(key);
    } catch (error) {
      logger.error(`Cache delete error for key ${key}:`, error);
    }
  },

  /**
   * Check if key exists
   */
  async exists(key: string): Promise<boolean> {
    try {
      const redis = await getRedisClient();
      const result = await redis.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`Cache exists error for key ${key}:`, error);
      return false;
    }
  },
};

/**
 * Close Redis connection
 */
export async function closeRedis(): Promise<void> {
  if (client) {
    try {
      await client.quit();
      logger.info("Redis connection closed");
    } catch (error) {
      logger.warn("Error closing Redis connection:", error);
    } finally {
      client = null;
    }
  }
}
