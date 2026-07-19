/**
 * Category Routes
 * CRUD for a user's habit categories
 *
 * @module routes/categories
 */

import { FastifyInstance } from "fastify";
import { z } from "zod";

import { authenticate } from "@/middleware/auth";
import { AppError } from "@/middleware/error-handler";
import { query } from "@/services/database";
import { AuthenticatedRequest } from "@/types";

const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  icon: z.string().max(50).optional(),
});

const updateCategorySchema = createCategorySchema.partial();

interface CategoryRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  created_at: Date;
  updated_at: Date;
}

async function getOwnedCategory(
  id: string,
  userId: string
): Promise<CategoryRow> {
  const [category] = await query<CategoryRow>(
    "SELECT * FROM categories WHERE id = $1 AND user_id = $2",
    [id, userId]
  );
  if (!category) {
    throw new AppError(404, "CATEGORY_NOT_FOUND", "Category not found");
  }
  return category;
}

/**
 * Register category routes
 *
 * @param fastify - Fastify instance
 */
export async function categoryRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.addHook("preHandler", authenticate);

  fastify.get("/", async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;
    const categories = await query<CategoryRow>(
      "SELECT * FROM categories WHERE user_id = $1 ORDER BY created_at ASC",
      [userId]
    );
    return reply.send({ success: true, data: categories });
  });

  fastify.get("/:id", async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;
    const { id } = request.params as { id: string };
    const category = await getOwnedCategory(id, userId);
    return reply.send({ success: true, data: category });
  });

  fastify.post("/", async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;
    const body = createCategorySchema.parse(request.body);

    const existing = await query<{ id: string }>(
      "SELECT id FROM categories WHERE user_id = $1 AND name = $2",
      [userId, body.name]
    );
    if (existing.length > 0) {
      throw new AppError(
        409,
        "CATEGORY_EXISTS",
        "A category with that name already exists"
      );
    }

    const [category] = await query<CategoryRow>(
      `INSERT INTO categories (user_id, name, description, color, icon)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        userId,
        body.name,
        body.description ?? null,
        body.color ?? null,
        body.icon ?? null,
      ]
    );

    return reply.status(201).send({ success: true, data: category });
  });

  fastify.put("/:id", async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;
    const { id } = request.params as { id: string };
    const body = updateCategorySchema.parse(request.body);

    await getOwnedCategory(id, userId);

    const [category] = await query<CategoryRow>(
      `UPDATE categories
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           color = COALESCE($3, color),
           icon = COALESCE($4, icon)
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [
        body.name ?? null,
        body.description ?? null,
        body.color ?? null,
        body.icon ?? null,
        id,
        userId,
      ]
    );

    return reply.send({ success: true, data: category });
  });

  fastify.delete("/:id", async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;
    const { id } = request.params as { id: string };

    await getOwnedCategory(id, userId);
    await query("DELETE FROM categories WHERE id = $1 AND user_id = $2", [
      id,
      userId,
    ]);

    return reply.status(204).send();
  });
}
