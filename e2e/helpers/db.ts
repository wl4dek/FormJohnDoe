import pg from "pg";

const { Pool } = pg;

export async function clearUsers(): Promise<void> {
  const pool = new Pool({
    connectionString:
      process.env.DATABASE_URL ??
      "postgres://postgres:postgres@localhost:5432/form_john_doe_test",
  });

  try {
    await pool.query("DELETE FROM users");
  } finally {
    await pool.end();
  }
}
