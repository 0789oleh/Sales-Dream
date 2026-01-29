import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dialect: 'sqlite',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} as Config;
