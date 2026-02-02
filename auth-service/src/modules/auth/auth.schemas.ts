import { z } from 'zod';
import { userSelectSchema } from '../../db/zod';

export const userResponseSchema = userSelectSchema.pick({
  id: true,
  email: true,
  isActive: true,
});

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const registerResponseSchema = userResponseSchema;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export const meResponseSchema = userResponseSchema;