/**
 * Database Service
 * PostgreSQL connection pool management
 *
 * @module services/database
 */

import { Pool, PoolClient } from "pg";

import { config } from "@/config/env";
import { logger } from "@/utils/logger";

/**
 * PostgreSQL connection pool
 */
let pool: Pool | null = null;

/**
 * Initialize database connection pool
 */
export function initDatabase(): Pool {
  if (pool) {
    return pool;
  }

  pool = new Pool({
    connectionString: config.DATABASE_URL,
    max: 20, // Maximum pool size
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  // Handle pool errors
  pool.on("error", (err) => {
    logger.error("Unexpected database pool error:", err);
  });

  // Test connection
  pool
    .query("SELECT NOW()")
    .then(() => {
      logger.info("✅ Database connection established");
    })
    .catch((err) => {
      logger.error("❌ Database connection failed:", err);
      throw err;
    });

  return pool;
}

/**
 * Get database pool instance
 */
export function getPool(): Pool {
  if (!pool) {
    return initDatabase();
  }
  return pool;
}

/**
 * Execute a query with automatic connection management
 *
 * @param query - SQL query string
 * @param params - Query parameters
 */
export async function query<T = unknown>(
  query: string,
  params?: unknown[]
): Promise<T[]> {
  const pool = getPool();
  const result = await pool.query(query, params);
  return result.rows as T[];
}

/**
 * Execute a transaction
 *
 * @param callback - Transaction callback function
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Close database connection pool
 */
export async function closeDatabase(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    logger.info("Database connection pool closed");
  }
}
