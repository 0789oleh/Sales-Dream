# Sales dream

TL;DR
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




### Instructions for launch (auth-service only)

1. Migrations

```bash
docker run --rm   -v $(pwd)/data:/data   -e PGLITE_DIR=/data/pglite   auth-service   pnpm db:migrate:pglite
```


2. Launch 
```bash

docker run   -p 3000:3000   -v $(pwd)/data:/data   auth-service
```