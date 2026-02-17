// core-service/src/db/schema.ts
import { pgTable, uuid, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';
import { timestamps } from 'drizzle-orm/gel-core';
import { time } from 'drizzle-orm/mysql-core';

// 1. Статусы лида (для типизации в коде и БД)
export const leadStatusEnum = pgEnum('lead_status', [
  'new', 
  'contacted', 
  'qualified', 
  'lost', 
  'converted'
]);

// 2. Таблица Лидов
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Связь с юзером из Auth-Service (храним только ID)
  ownerId: uuid('owner_id').notNull(), 
  
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  email: text('email').notNull(),
  phone: text('phone'),
  
  source: text('source'), // Откуда пришел (сайт, реклама, LinkedIn)
  status: leadStatusEnum('status').default('new').notNull(),
  
  timestamps,
});

// 3. Таблица Клиентов (Converted Leads)
export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: uuid('owner_id').notNull(),
  
  // Ссылка на лида, из которого вырос клиент (опционально)
  leadId: uuid('lead_id').references(() => leads.id),
  
  companyName: text('company_name'),
  industry: text('industry'),
  
  // Контактные данные (могут отличаться от лида)
  contactName: text('contact_name').notNull(),
  contactEmail: text('contact_email').notNull(),
  
  timestamps,
});

// 4. Сделки (Deals) — чтобы Core был полноценным
export const deals = pgTable('deals', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: uuid('owner_id').notNull(),
  clientId: uuid('client_id').references(() => clients.id).notNull(),
  
  title: text('title').notNull(),
  amount: integer('amount').notNull(), // Храним в копейках/центах (integer)
  currency: text('currency').default('USD').notNull(),
  stage: text('stage').default('negotiation').notNull(), // negotiation, closed_won, closed_lost
  
  timestamps,
});