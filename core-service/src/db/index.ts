import { drizzle } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import { neon } from '@neondatabase/serverless';

const isProd = process.env.NODE_ENV === 'production';

export const db = isProd
  ? (() => {
      throw new Error('Production database not configured yet.');
    })()
  : drizzle(new PGlite('/data/pglite'));

