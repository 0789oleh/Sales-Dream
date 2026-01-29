// import { drizzle } from 'drizzle-orm/neon-http';
// import { neon } from '@neondatabase/serverless';

// const sql = neon(process.env.DATABASE_URL!);

// export const db = drizzle(sql);
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { DB_DRIVER } from './config.js';

let db: any;

if (DB_DRIVER === 'sqlite') {
  const sqlite = new Database('dev.db');
  db = drizzle(sqlite);
} else {
  throw new Error('Postgres driver not enabled in dev yet');
}

export { db };
