import { randomUUID } from 'crypto';
import { drizzle, type PgliteDatabase } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';

export async function createTestDb(): Promise<PgliteDatabase> {
  const dir = `/tmp/pglite-test-${randomUUID()}`;
  const client = new PGlite(dir);
  const db = drizzle(client);

  await migrate(db, { migrationsFolder: 'drizzle' });

  return db;
}
