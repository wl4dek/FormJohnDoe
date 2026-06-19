import { Provider } from '@nestjs/common';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema.js';
import { env } from '../../config/env.js';

const { Pool } = pg;

export const DRIZZLE = 'DRIZZLE';

export type DrizzleDb = NodePgDatabase<typeof schema>;

export const drizzleProvider: Provider = {
  provide: DRIZZLE,
  useFactory: () => {
    const pool = new Pool({ connectionString: env.databaseUrl });
    return drizzle(pool, { schema }) as DrizzleDb;
  },
};
