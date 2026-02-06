import { db } from '../../db/client';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { loginResponseSchema, meResponseSchema, userResponseSchema } from './auth.schemas';
import { verify } from 'argon2';
import { AuthError } from '../errors/auth.errors';

export class AuthService {
  constructor(private jwtService: any){};

  async register(email: string, passwordHash: string) {
    // 1. Проверяем, существует ли пользователь
    const existing = await this.findByEmail(email);


    if (existing) {
      throw new AuthError('USER_ALREADY_EXISTS');
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

  async login(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new AuthError('INVALID_CREDENTIALS');
    }

    const isValidPassword = await verify(user.passwordHash, password);

    if (!isValidPassword) {
      throw new AuthError('INVALID_CREDENTIALS');
    }

    if (!user.isActive) {
      throw new AuthError('USER_INACTIVE');
    }

    return loginResponseSchema.parse({
      accessToken: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
      tokenType: 'Bearer',
      expiresIn: 900,
    });
  }

  async getMe(userId: string) {
  const user = await this.findById(userId);

    if (!user) {
      throw new AuthError('USER_NOT_FOUND');
    }

    // Ban chack (me be added in future)
    if (!user.isActive) {
      throw new AuthError('USER_INACTIVE');
    }
    
    return meResponseSchema.parse(user);
  }


  findById(userId: string) {
    return db.query.users.findFirst({
      where: eq(users.id, userId),
    });
  }

  async findByEmail(email: string) {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }
}
