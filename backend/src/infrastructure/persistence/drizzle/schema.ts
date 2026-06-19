import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  cpf: varchar('cpf', { length: 11 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull(),
  color: varchar('color', { length: 50 }).notNull(),
  observation: text('observation'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
