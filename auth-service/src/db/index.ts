import { drizzle } from 'drizzle-orm';
import { PGlite } from '@electric-sql/pglite';
import { neon } from '@neondatabase/serverless';

const isProd = process.env.NODE_ENV === 'production';

export const db = isProd
  ? drizzle(neon(process.env.DATABASE_URL!))
  : drizzle(new PGlite('/data/pglite'));

