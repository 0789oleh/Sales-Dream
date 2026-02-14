import { drizzle, type PgliteDatabase } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';
import path from 'node:path'; // Добавь для надежности путей
import * as schema from '../../src/db/schema';

export async function createTestDb() {
  const client = new PGlite('memory://');
  // Передаем схему обязательно, иначе db.query будет undefined
  const db = drizzle(client, { schema }); 

  await migrate(db, { migrationsFolder: 'drizzle' });

  // Возвращаем объектом!
  return { db, client }; 
}