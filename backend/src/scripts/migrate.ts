import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { env } from "../infrastructure/config/env.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;
const pool = new Pool({ connectionString: env.databaseUrl });
const db = drizzle(pool);

await migrate(db, {
  migrationsFolder: path.join(__dirname, "../infrastructure/persistence/drizzle/migrations"),
});

await pool.end();
