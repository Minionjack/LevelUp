/**
 * Authentication Middleware
 * JWT token verification middleware
 *
 * @module middleware/auth
 */

import { FastifyRequest, FastifyReply } from "fastify";
import { AuthenticatedRequest } from "@/types";
import { JWTPayload } from "../../../shared/types";
import { AppError } from "./error-handler";

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    // Verify JWT token
    await request.jwtVerify();

    // Attach user to request
    (request as AuthenticatedRequest).user = request.user as JWTPayload;
  } catch (error) {
    throw new AppError(
      401,
      "UNAUTHORIZED",
      "Authentication required. Please provide a valid token.",
      { error: error instanceof Error ? error.message : "Unknown error" }
    );
  }
}

/**
 * Optional authentication middleware
 * Attaches user if token is present, but doesn't require it
 */
export async function optionalAuthenticate(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    await request.jwtVerify();
    (request as AuthenticatedRequest).user = request.user as JWTPayload;
  } catch (error) {
    // Ignore authentication errors for optional auth
    // User will be undefined if token is invalid or missing
  }
}
