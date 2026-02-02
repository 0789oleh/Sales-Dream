import { db } from '../../db/client';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { userResponseSchema } from './auth.schemas';

export class AuthService {
  async register(email: string, passwordHash: string) {
    // 1. Проверяем, существует ли пользователь
    const existing = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existing) {
      throw new Error('USER_ALREADY_EXISTS');
    }

    // 2. Создаём пользователя
    const [user] = await db
      .insert(users)
      .values({
        id: randomUUID(),
        email,
        passwordHash,
      })
      .returning();

    // 3. Возвращаем public DTO
    return userResponseSchema.parse(user);
  }

  async findByEmail(email: string) {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }
}
