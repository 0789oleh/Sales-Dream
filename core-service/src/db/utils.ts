import { timestamp } from 'drizzle-orm/pg-core';

// Хелпер для таймстампов, который мы будем "подмешивать" в таблицы
export const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
};