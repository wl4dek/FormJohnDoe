import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/infrastructure/persistence/drizzle/schema.ts',
  out: './src/infrastructure/persistence/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/form_john_doe',
  },
});
