/**
 * Database Migration Script
 * Runs database migrations
 *
 * @module scripts/migrate
 */

import { readdir, readFile } from "fs/promises";
import { join } from "path";

import { getPool, query } from "../services/database";
import { logger } from "../utils/logger";

/**
 * Create migrations table if it doesn't exist
 */
async function ensureMigrationsTable(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

/**
 * Get executed migrations
 */
async function getExecutedMigrations(): Promise<string[]> {
  const result = await query<{ name: string }>(
    "SELECT name FROM migrations ORDER BY id"
  );
  return result.map((row) => row.name);
}

/**
 * Execute a migration file
 */
async function executeMigration(name: string, sql: string): Promise<void> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("INSERT INTO migrations (name) VALUES ($1)", [name]);
    await client.query("COMMIT");
    logger.info(`✅ Migration executed: ${name}`);
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error(`❌ Migration failed: ${name}`, error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Run migrations
 */
async function migrate(): Promise<void> {
  try {
    logger.info("Starting database migrations...");

    // Initialize database connection
    getPool();

    // Ensure migrations table exists
    await ensureMigrationsTable();

    // Get executed migrations
    const executed = await getExecutedMigrations();
    logger.info(`Found ${executed.length} executed migrations`);

    // Get migration files
    const migrationsDir = join(__dirname, "../migrations");
    let files: string[];
    try {
      files = await readdir(migrationsDir);
    } catch (error) {
      logger.error(
        `Failed to read migrations directory: ${migrationsDir}`,
        error
      );
      throw error;
    }
    const migrationFiles = files.filter((file) => file.endsWith(".sql")).sort();

    // Execute pending migrations
    for (const file of migrationFiles) {
      if (!executed.includes(file)) {
        logger.info(`Executing migration: ${file}`);
        const sql = await readFile(join(migrationsDir, file), "utf-8");
        await executeMigration(file, sql);
      } else {
        logger.info(`Skipping already executed migration: ${file}`);
      }
    }

    logger.info("✅ All migrations completed");
  } catch (error) {
    logger.error("Migration failed:", error);
    process.exit(1);
  }
}

// Run migrations if script is executed directly
migrate()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    logger.error("Migration error:", error);
    process.exit(1);
  });

export { migrate };
