import { drizzle } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import * as schema from './schema';
import { config } from 'dotenv';
config();

const dbPath = process.env.DATABASE_URL ?? '/data/pglite';

console.log('[DB] PGlite dir:', process.env.DATABASE_URL);
export const client = new PGlite({
  dataDir: dbPath,
});
export const db = drizzle(client, { schema });
