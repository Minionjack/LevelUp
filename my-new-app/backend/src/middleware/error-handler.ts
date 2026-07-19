/**
 * Error Handler Middleware
 * Centralized error handling for Fastify
 *
 * @module middleware/error-handler
 */

import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { logger } from "@/utils/logger";

/**
 * Custom error types
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error handler for Fastify
 *
 * @param error - Fastify error
 * @param request - Fastify request
 * @param reply - Fastify reply
 */
export async function errorHandler(
  error: FastifyError | AppError | ZodError | Error,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  // Log error
  logger.error({
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    request: {
      method: request.method,
      url: request.url,
      headers: request.headers,
    },
  });

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return reply.status(400).send({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
        details: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      },
    });
  }

  // Handle custom AppError
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
  }

  // Handle Fastify errors
  if ("statusCode" in error) {
    const fastifyError = error as FastifyError;
    return reply.status(fastifyError.statusCode || 500).send({
      success: false,
      error: {
        code: fastifyError.code || "INTERNAL_SERVER_ERROR",
        message: fastifyError.message || "An unexpected error occurred",
      },
    });
  }

  // Handle unknown errors
  return reply.status(500).send({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
}
