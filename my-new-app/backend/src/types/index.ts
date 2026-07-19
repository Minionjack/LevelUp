/**
 * Backend Types
 * TypeScript types specific to backend
 *
 * @module types
 */

import { FastifyRequest } from "fastify";

/**
 * JWT payload shape, mirrored from ../../../shared/types.
 * Defined locally (not imported) because backend's tsconfig `rootDir`
 * is scoped to `src/`, and reaching outside it breaks `tsc` emit.
 */
export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Authenticated request with user information
 */
export interface AuthenticatedRequest extends FastifyRequest {
  user: JWTPayload;
}

/**
 * Database query result
 */
export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
}

/**
 * Service response wrapper
 */
export interface ServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}
