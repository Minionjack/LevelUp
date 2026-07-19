/**
 * Plugin Registration
 * Registers all Fastify plugins
 *
 * @module config/plugins
 */

import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { config } from "@/config/env";
import { logger } from "@/utils/logger";

/**
 * Register all plugins with Fastify instance
 *
 * @param fastify - Fastify instance
 */
export async function registerPlugins(fastify: FastifyInstance): Promise<void> {
  // CORS configuration
  await fastify.register(cors, {
    origin: config.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
  });

  // Security headers
  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  });

  // JWT authentication
  await fastify.register(jwt, {
    secret: config.JWT_SECRET,
    sign: {
      expiresIn: config.JWT_EXPIRES_IN,
    },
  });

  // Rate limiting
  await fastify.register(rateLimit, {
    max: 100, // Maximum 100 requests
    timeWindow: "1 minute", // Per minute
    errorResponseBuilder: (request, context) => {
      return {
        success: false,
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many requests, please try again later.",
        },
      };
    },
  });

  // Swagger/OpenAPI documentation
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: "LevelUp API",
        description: "LevelUp Backend API Documentation",
        version: "1.0.0",
      },
      host: `${config.HOST}:${config.PORT}`,
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "auth", description: "Authentication endpoints" },
        { name: "habits", description: "Habit management endpoints" },
        { name: "categories", description: "Category management endpoints" },
        { name: "health", description: "Health check endpoints" },
      ],
      securityDefinitions: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "JWT token in format: Bearer <token>",
        },
      },
    },
  });

  // Swagger UI
  await fastify.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });

  logger.info("✅ All plugins registered successfully");
}
