import { eq } from 'drizzle-orm';
import {z}  from 'zod';


const createClientSchema = z.object({
  ownerId: z.uuid(),
  leadId: z.uuid().optional(),
  companyName: z.string().min(1).optional(),
  industry: z.string().optional(),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
});

export type CreateClientDto = z.infer<typeof createClientSchema>;


export const updateClientSchema = z.object({
  companyName: z.string().min(1).optional(),
  industry: z.string().optional(),
  contactName: z.string().min(1).optional(),
  contactEmail: z.string().email().optional(),
}); 

export type UpdateClientDto = z.infer<typeof updateClientSchema>;

export const clientResponseSchema = z.object({
  id: z.uuid(),
  ownerId: z.uuid(),
  leadId: z.uuid().nullable(),
  companyName: z.string().nullable(),
  industry: z.string().nullable(),
  contactName: z.string(),
  contactEmail: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ClientResponseDto = z.infer<typeof clientResponseSchema>;