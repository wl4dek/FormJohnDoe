import 'dotenv/config';

export const env = {
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/form_john_doe',
  port: Number(process.env.PORT) || 3000,
  corsOrigin: (process.env.CORS_ORIGIN ?? 'http://localhost:5173').split(','),
};
