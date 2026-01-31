import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './src/db/schema.ts', // Path to your schema files
  out: './drizzle/migrations',   // Directory for generated migrations
  dialect: 'sqlite',             // Specifies the database type
  driver: 'better-sqlite',       // The driver to use (for local file access)
  dbCredentials: {
    url: './sqlite.db',          // The path to your SQLite database file
  },
};

export default config;