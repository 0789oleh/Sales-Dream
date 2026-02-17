import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { clients, deals } from './schema';

export const clientSelectSchema = createSelectSchema(clients);
export const clientInsertSchema = createInsertSchema(clients);

export const dealSelectSchema = createSelectSchema(deals);
export const dealInsertSchema = createInsertSchema(deals);