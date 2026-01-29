// import {
//   pgTable,
//   uuid,
//   varchar,
//   timestamp,
//   boolean,
// } from 'drizzle-orm/pg-core';

// export const users = pgTable('users', {
//   id: uuid('id').defaultRandom().primaryKey(),
//   email: varchar('email', { length: 255 }).notNull().unique(),
//   passwordHash: varchar('password_hash', { length: 255 }).notNull(),
//   isActive: boolean('is_active').default(true).notNull(),
//   createdAt: timestamp('created_at', { withTimezone: true })
//     .defaultNow()
//     .notNull(),
// });

// export const sessions = pgTable('sessions', {
//   id: uuid('id').defaultRandom().primaryKey(),
//   userId: uuid('user_id')
//     .references(() => users.id, { onDelete: 'cascade' })
//     .notNull(),
//   refreshToken: varchar('refresh_token', { length: 255 }).notNull(),
//   expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
//   createdAt: timestamp('created_at', { withTimezone: true })
//     .defaultNow()
//     .notNull(),
// });
import {
  sqliteTable,
  text,
  integer,
} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  isActive: integer('is_active', { mode: 'boolean' })
    .notNull()
    .default(true),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  refreshToken: text('refresh_token').notNull(),
  expiresAt: text('expires_at').notNull(),
});
