# Cборник анекдотов

Этот конфиг

```typescript

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', // Path to your schema file(s)
  out: './drizzle',             // Directory for generated migrations
  dialect: 'sqlite',            // Specify the dialect
  dbCredentials: {
    // URL to your database file
    // Use 'url: ":memory:"' for in-memory DB or 'url: "file:sqlite.db"' for a file
    url: process.env.DB_FILE_NAME || './sqlite.db', 
  },
} satisfies Config);

```

Позволяет проводить генерацию, но байдинги не дают провести миграцию. Принято решение перейти на pglite.
