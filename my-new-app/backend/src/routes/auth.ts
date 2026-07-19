/**
 * Auth Routes
 * Registration, login, session, and token refresh
 *
 * @module routes/auth
 */

import { JWT } from "@fastify/jwt";
import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import { authenticate } from "@/middleware/auth";
import { AppError } from "@/middleware/error-handler";
import { query } from "@/services/database";
import { AuthenticatedRequest, JWTPayload } from "@/types";

/**
 * The refresh-token @fastify/jwt instance is registered with
 * `namespace: "refresh"` (see config/plugins.ts). At runtime that
 * decorates fastify.jwt.refresh with a synchronous sign/verify API --
 * despite what @fastify/jwt's own FastifyJwtNamespace type helper
 * implies (top-level refreshJwtSign/refreshJwtVerify), which does not
 * match the actual decorator shape in jwt.js. Cast once here instead of
 * fighting the upstream types.
 */
function getRefreshJwt(fastify: FastifyInstance): JWT {
  return (fastify.jwt as unknown as { refresh: JWT }).refresh;
}

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).max(50),
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

interface UserRow {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

function toPublicUser(row: UserRow) {
  return {
    id: row.id,
    email: row.email,
    username: row.username,
    first_name: row.first_name,
    last_name: row.last_name,
    is_active: row.is_active,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * Register auth routes
 *
 * @param fastify - Fastify instance
 */
export async function authRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post("/register", async (request, reply) => {
    const body = registerSchema.parse(request.body);

    const existing = await query<{ id: string }>(
      "SELECT id FROM users WHERE email = $1 OR username = $2",
      [body.email, body.username]
    );
    if (existing.length > 0) {
      throw new AppError(
        409,
        "USER_EXISTS",
        "An account with that email or username already exists"
      );
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const [user] = await query<UserRow>(
      `INSERT INTO users (email, username, password_hash, first_name, last_name)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [body.email, body.username, passwordHash, body.first_name, body.last_name]
    );

    const payload: JWTPayload = { userId: user.id, email: user.email };
    const token = fastify.jwt.sign(payload);
    const refreshToken = getRefreshJwt(fastify).sign(payload);

    return reply.status(201).send({
      success: true,
      data: { user: toPublicUser(user), token, refreshToken },
    });
  });

  fastify.post("/login", async (request, reply) => {
    const body = loginSchema.parse(request.body);

    const [user] = await query<UserRow>(
      "SELECT * FROM users WHERE email = $1",
      [body.email]
    );
    if (!user) {
      throw new AppError(
        401,
        "INVALID_CREDENTIALS",
        "Invalid email or password"
      );
    }

    const passwordMatches = await bcrypt.compare(
      body.password,
      user.password_hash
    );
    if (!passwordMatches) {
      throw new AppError(
        401,
        "INVALID_CREDENTIALS",
        "Invalid email or password"
      );
    }

    const payload: JWTPayload = { userId: user.id, email: user.email };
    const token = fastify.jwt.sign(payload);
    const refreshToken = getRefreshJwt(fastify).sign(payload);

    return reply.send({
      success: true,
      data: { user: toPublicUser(user), token, refreshToken },
    });
  });

  fastify.get("/me", { preHandler: authenticate }, async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;

    const [user] = await query<UserRow>("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", "User not found");
    }

    return reply.send({ success: true, data: toPublicUser(user) });
  });

  fastify.post("/refresh", async (request, reply) => {
    const body = refreshSchema.parse(request.body);

    let payload: JWTPayload;
    try {
      payload = getRefreshJwt(fastify).verify<JWTPayload>(body.refreshToken);
    } catch {
      throw new AppError(
        401,
        "INVALID_REFRESH_TOKEN",
        "Invalid or expired refresh token"
      );
    }

    const [user] = await query<UserRow>("SELECT * FROM users WHERE id = $1", [
      payload.userId,
    ]);
    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", "User not found");
    }

    const newPayload: JWTPayload = { userId: user.id, email: user.email };
    const token = fastify.jwt.sign(newPayload);
    const refreshToken = getRefreshJwt(fastify).sign(newPayload);

    return reply.send({
      success: true,
      data: { user: toPublicUser(user), token, refreshToken },
    });
  });

  fastify.post(
    "/logout",
    { preHandler: authenticate },
    async (_request, reply) => {
      // Access tokens are short-lived and stateless (no server-side session to
      // clear); the client is responsible for discarding both tokens.
      return reply.send({ success: true, message: "Logged out successfully" });
    }
  );
}
