/**
 * Backend Types
 * TypeScript types specific to backend
 *
 * @module types
 */

import { FastifyRequest } from "fastify";
import { JWTPayload } from "../../../shared/types";

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
