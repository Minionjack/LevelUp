/**
 * Database Seed Script
 * Seeds the database with initial data
 *
 * @module scripts/seed
 */

import bcrypt from "bcrypt";

import { query } from "../services/database";
import { logger } from "../utils/logger";

/**
 * Seed the database with initial data
 */
async function seed(): Promise<void> {
  try {
    logger.info("Starting database seeding...");

    // Check if users already exist
    const existingUsers = await query<{ count: string }>(
      "SELECT COUNT(*) as count FROM users"
    );

    if (parseInt(existingUsers[0].count) > 0) {
      logger.info("Database already seeded, skipping...");
      return;
    }

    // Hash password for test user
    const passwordHash = await bcrypt.hash("password123", 10);

    // Create test user
    const userResult = await query<{ id: string }>(
      `INSERT INTO users (email, username, password_hash, first_name, last_name)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      ["test@example.com", "testuser", passwordHash, "Test", "User"]
    );

    const userId = userResult[0].id;
    logger.info(`✅ Created test user: ${userId}`);

    // Create sample categories
    const categories = [
      {
        name: "Health & Fitness",
        description: "Physical health and exercise habits",
        color: "#4CAF50",
        icon: "fitness",
      },
      {
        name: "Learning",
        description: "Educational and skill-building habits",
        color: "#2196F3",
        icon: "book",
      },
      {
        name: "Productivity",
        description: "Work and productivity habits",
        color: "#FF9800",
        icon: "briefcase",
      },
    ];

    const categoryIds: string[] = [];
    for (const category of categories) {
      const result = await query<{ id: string }>(
        `INSERT INTO categories (user_id, name, description, color, icon)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [
          userId,
          category.name,
          category.description,
          category.color,
          category.icon,
        ]
      );
      categoryIds.push(result[0].id);
      logger.info(`✅ Created category: ${category.name}`);
    }

    // Create sample habits
    const habits = [
      {
        name: "Morning Exercise",
        description: "30 minutes of exercise every morning",
        frequency: "daily",
        targetValue: 1,
        targetUnit: "times",
        categoryId: categoryIds[0],
      },
      {
        name: "Read Books",
        description: "Read for 30 minutes daily",
        frequency: "daily",
        targetValue: 30,
        targetUnit: "minutes",
        categoryId: categoryIds[1],
      },
      {
        name: "Meditation",
        description: "10 minutes of meditation",
        frequency: "daily",
        targetValue: 10,
        targetUnit: "minutes",
        categoryId: categoryIds[0],
      },
    ];

    for (const habit of habits) {
      await query(
        `INSERT INTO habits (user_id, category_id, name, description, frequency, target_value, target_unit)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          userId,
          habit.categoryId,
          habit.name,
          habit.description,
          habit.frequency,
          habit.targetValue,
          habit.targetUnit,
        ]
      );
      logger.info(`✅ Created habit: ${habit.name}`);
    }

    logger.info("✅ Database seeding completed");
  } catch (error) {
    logger.error("Seeding failed:", error);
    process.exit(1);
  }
}

// Run seeding if script is executed directly
seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    logger.error("Seed error:", error);
    process.exit(1);
  });

export { seed };
