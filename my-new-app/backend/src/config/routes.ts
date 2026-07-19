/**
 * Route Registration
 * Registers all API routes
 *
 * @module config/routes
 */

import { FastifyInstance } from "fastify";
import { config } from "@/config/env";
import { logger } from "@/utils/logger";
import { healthRoutes } from "@/routes/health";

/**
 * Register all routes with Fastify instance
 *
 * @param fastify - Fastify instance
 */
export async function registerRoutes(fastify: FastifyInstance): Promise<void> {
  // Health check routes
  await fastify.register(healthRoutes);

  // API version info
  fastify.get(config.API_PREFIX, async (request, reply) => {
    return {
      version: "1.0.0",
      name: "LevelUp API",
      description:
        "LevelUp App Backend API - Transform your goals into an adventure",
      endpoints: {
        auth: `${config.API_PREFIX}/auth`,
        habits: `${config.API_PREFIX}/habits`,
        categories: `${config.API_PREFIX}/categories`,
        health: "/health",
      },
    };
  });

  // TODO: Register route modules
  // await fastify.register(authRoutes, { prefix: `${config.API_PREFIX}/auth` });
  // await fastify.register(habitRoutes, { prefix: `${config.API_PREFIX}/habits` });
  // await fastify.register(categoryRoutes, { prefix: `${config.API_PREFIX}/categories` });

  logger.info(`✅ Routes registered with prefix: ${config.API_PREFIX}`);
}
