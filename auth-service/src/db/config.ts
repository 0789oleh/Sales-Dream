export const DB_DRIVER = process.env.DB_DRIVER ?? 'sqlite';
export const DB_FILE = process.env.DB_FILE ?? 'dev.db';
export const DATABASE_URL = process.env.DATABASE_URL ?? `file:${DB_FILE}`;