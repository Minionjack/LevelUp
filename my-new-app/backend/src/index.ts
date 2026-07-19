/**
 * LevelUp Backend API
 * Main entry point for the Fastify server
 *
 * @module index
 * @description Initializes and starts the Fastify server with all plugins and routes
 */

import Fastify from "fastify";
import { config } from "@/config/env";
import { logger } from "@/utils/logger";
import { registerPlugins } from "@/config/plugins";
import { registerRoutes } from "@/config/routes";
import { errorHandler } from "@/middleware/error-handler";
import { initDatabase, closeDatabase } from "@/services/database";
import { initRedis, closeRedis } from "@/services/redis";

/**
 * Create Fastify instance with configuration
 */
const fastify = Fastify({
  logger: logger,
  requestIdLogLabel: "reqId",
  disableRequestLogging: false,
  requestIdHeader: "x-request-id",
});

/**
 * Register plugins, routes, and error handlers
 */
async function build() {
  // Initialize services
  initDatabase();
  await initRedis();

  // Register plugins (CORS, Helmet, JWT, etc.)
  await registerPlugins(fastify);

  // Register error handler
  fastify.setErrorHandler(errorHandler);

  // Register routes
  await registerRoutes(fastify);

  return fastify;
}

/**
 * Start the server
 */
async function start() {
  try {
    const app = await build();

    // Start listening
    await app.listen({
      port: config.PORT,
      host: config.HOST,
    });

    logger.info(`🚀 Server listening on http://${config.HOST}:${config.PORT}`);
    logger.info(
      `📚 API Documentation: http://${config.HOST}:${config.PORT}/docs`
    );
    logger.info(`🏥 Health Check: http://${config.HOST}:${config.PORT}/health`);

    // Graceful shutdown handlers
    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}, shutting down gracefully...`);
      try {
        await app.close();
        await closeDatabase();
        await closeRedis();
        logger.info("Server closed successfully");
        process.exit(0);
      } catch (error) {
        logger.error("Error during shutdown:", error);
        process.exit(1);
      }
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));

    return app;
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
}

// Start server if this file is run directly
if (require.main === module) {
  start();
}

export { build, start };
