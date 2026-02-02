import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', // Path to your schema files
  out: './drizzle',             // Output directory for migrations
  dialect: 'postgresql',        // Use the postgresql dialect
  dbCredentials: {
    // Specify the URL for PGlite connection (e.g., a file path)
    url: '/data/pglite', 
  },
  driver: 'pglite', // Explicitly use the pglite driver for Drizzle Kit
});
