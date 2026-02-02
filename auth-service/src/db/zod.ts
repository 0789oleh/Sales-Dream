import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users, sessions } from './schema';

export const userSelectSchema = createSelectSchema(users);
export const userInsertSchema = createInsertSchema(users);

export const sessionSelectSchema = createSelectSchema(sessions);
export const sessionInsertSchema = createInsertSchema(sessions);
