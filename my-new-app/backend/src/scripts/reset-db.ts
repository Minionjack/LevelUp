/**
 * Database Reset Script
 * Resets the database by dropping all tables and re-running migrations and seeds
 *
 * @module scripts/reset-db
 */

import { getPool } from "../services/database";
import { logger } from "../utils/logger";
import { migrate } from "./migrate";
import { seed } from "./seed";

/**
 * Reset the database
 */
async function resetDatabase(): Promise<void> {
  try {
    logger.info("Starting database reset...");

    const pool = getPool();
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Drop all tables in reverse order of dependencies
      logger.info("Dropping tables...");
      await client.query("DROP TABLE IF EXISTS habit_completions CASCADE");
      await client.query("DROP TABLE IF EXISTS habits CASCADE");
      await client.query("DROP TABLE IF EXISTS categories CASCADE");
      await client.query("DROP TABLE IF EXISTS users CASCADE");
      await client.query("DROP TABLE IF EXISTS migrations CASCADE");

      // Drop functions and extensions
      await client.query("DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE");
      await client.query("DROP EXTENSION IF EXISTS uuid-ossp CASCADE");

      await client.query("COMMIT");
      logger.info("✅ All tables dropped");

      // Re-run migrations
      logger.info("Running migrations...");
      await migrate();

      // Re-run seeds
      logger.info("Running seeds...");
      await seed();

      logger.info("✅ Database reset completed");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    logger.error("Database reset failed:", error);
    process.exit(1);
  }
}

// Run reset if script is executed directly
resetDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    logger.error("Reset error:", error);
    process.exit(1);
  });

export { resetDatabase };

