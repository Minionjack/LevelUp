/**
 * Habit Routes
 * CRUD + completion tracking for a user's habits
 *
 * @module routes/habits
 */

import { FastifyInstance } from "fastify";
import { z } from "zod";

import { authenticate } from "@/middleware/auth";
import { AppError } from "@/middleware/error-handler";
import { query } from "@/services/database";
import { AuthenticatedRequest } from "@/types";

const frequencyEnum = z.enum(["daily", "weekly", "monthly"]);

const createHabitSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  frequency: frequencyEnum,
  target_value: z.number().positive().optional(),
  target_unit: z.string().max(50).optional(),
  category_id: z.string().uuid().optional(),
});

const updateHabitSchema = createHabitSchema.partial();

const completeHabitSchema = z.object({
  notes: z.string().max(1000).optional(),
  value: z.number().positive().optional(),
});

interface HabitRow {
  id: string;
  user_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  frequency: "daily" | "weekly" | "monthly";
  target_value: string;
  target_unit: string;
  is_active: boolean;
  current_streak: number;
  longest_streak: number;
  total_completions: number;
  created_at: Date;
  updated_at: Date;
}

async function getOwnedHabit(id: string, userId: string): Promise<HabitRow> {
  const [habit] = await query<HabitRow>(
    "SELECT * FROM habits WHERE id = $1 AND user_id = $2",
    [id, userId]
  );
  if (!habit) {
    throw new AppError(404, "HABIT_NOT_FOUND", "Habit not found");
  }
  return habit;
}

/**
 * Register habit routes
 *
 * @param fastify - Fastify instance
 */
export async function habitRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.addHook("preHandler", authenticate);

  fastify.get("/", async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;
    const habits = await query<HabitRow>(
      "SELECT * FROM habits WHERE user_id = $1 ORDER BY created_at ASC",
      [userId]
    );
    return reply.send({ success: true, data: habits });
  });

  fastify.get("/:id", async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;
    const { id } = request.params as { id: string };
    const habit = await getOwnedHabit(id, userId);
    return reply.send({ success: true, data: habit });
  });

  fastify.post("/", async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;
    const body = createHabitSchema.parse(request.body);

    if (body.category_id) {
      const [category] = await query<{ id: string }>(
        "SELECT id FROM categories WHERE id = $1 AND user_id = $2",
        [body.category_id, userId]
      );
      if (!category) {
        throw new AppError(404, "CATEGORY_NOT_FOUND", "Category not found");
      }
    }

    const [habit] = await query<HabitRow>(
      `INSERT INTO habits (user_id, category_id, name, description, frequency, target_value, target_unit)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        userId,
        body.category_id ?? null,
        body.name,
        body.description ?? null,
        body.frequency,
        body.target_value ?? 1,
        body.target_unit ?? "times",
      ]
    );

    return reply.status(201).send({ success: true, data: habit });
  });

  fastify.put("/:id", async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;
    const { id } = request.params as { id: string };
    const body = updateHabitSchema.parse(request.body);

    await getOwnedHabit(id, userId);

    const [habit] = await query<HabitRow>(
      `UPDATE habits
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           frequency = COALESCE($3, frequency),
           target_value = COALESCE($4, target_value),
           target_unit = COALESCE($5, target_unit),
           category_id = COALESCE($6, category_id)
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [
        body.name ?? null,
        body.description ?? null,
        body.frequency ?? null,
        body.target_value ?? null,
        body.target_unit ?? null,
        body.category_id ?? null,
        id,
        userId,
      ]
    );

    return reply.send({ success: true, data: habit });
  });

  fastify.delete("/:id", async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;
    const { id } = request.params as { id: string };

    await getOwnedHabit(id, userId);
    await query("DELETE FROM habits WHERE id = $1 AND user_id = $2", [
      id,
      userId,
    ]);

    return reply.status(204).send();
  });

  fastify.post("/:id/complete", async (request, reply) => {
    const { userId } = (request as AuthenticatedRequest).user;
    const { id } = request.params as { id: string };
    const body = completeHabitSchema.parse(request.body ?? {});

    await getOwnedHabit(id, userId);

    await query(
      `INSERT INTO habit_completions (habit_id, user_id, notes, value)
       VALUES ($1, $2, $3, $4)`,
      [id, userId, body.notes ?? null, body.value ?? 1]
    );

    // Simple streak model: every completion extends the current streak.
    // Break/reset-on-missed-day logic is out of scope for this pass -- see
    // Phase 3 roadmap notes on habit analytics.
    const [habit] = await query<HabitRow>(
      `UPDATE habits
       SET total_completions = total_completions + 1,
           current_streak = current_streak + 1,
           longest_streak = GREATEST(longest_streak, current_streak + 1)
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, userId]
    );

    return reply.send({ success: true, data: habit });
  });
}
