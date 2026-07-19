/**
 * Health Check Routes
 * System health and status endpoints
 *
 * @module routes/health
 */

import { FastifyInstance } from "fastify";

import { config } from "@/config/env";
import { getPool } from "@/services/database";
import { getRedisClient } from "@/services/redis";

/**
 * Register health check routes
 *
 * @param fastify - Fastify instance
 */
export async function healthRoutes(fastify: FastifyInstance): Promise<void> {
  /**
   * Basic health check
   */
  fastify.get("/health", async (_request, _reply) => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.NODE_ENV,
      version: "1.0.0",
    };
  });

  /**
   * Detailed health check with service status
   */
  fastify.get("/health/detailed", async (_request, reply) => {
    const health = {
      status: "ok" as "ok" | "degraded" | "down",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.NODE_ENV,
      version: "1.0.0",
      services: {
        database: "unknown" as "ok" | "error" | "unknown",
        redis: "unknown" as "ok" | "error" | "unknown",
      },
    };

    // Check database connection
    try {
      const pool = getPool();
      await pool.query("SELECT 1");
      health.services.database = "ok";
    } catch (error) {
      health.services.database = "error";
      health.status = "degraded";
    }

    // Check Redis connection
    try {
      const redis = await getRedisClient();
      await redis.ping();
      health.services.redis = "ok";
    } catch (error) {
      health.services.redis = "error";
      health.status = "degraded";
    }

    // If any critical service is down, mark as down
    if (health.services.database === "error") {
      health.status = "down";
    }

    const statusCode =
      health.status === "down" ? 503 : health.status === "degraded" ? 200 : 200;
    return reply.status(statusCode).send(health);
  });
}
