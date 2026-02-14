import { sessions, users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { registerSchema, loginSchema, loginResponseSchema, meResponseSchema, userResponseSchema } from './auth.schemas';
import { verify, hash } from 'argon2';
import { AuthError } from '../errors/auth.errors';
import z from 'zod';
import { sessionInsertSchema, userInsertSchema } from '../../db/zod';
import { addDays } from 'date-fns';

export class AuthService {
  constructor(
    private readonly db: typeof import('../../db/client').db,
    private readonly jwtService: any,
  ) {}

  async register(register: registerSchema) {
    const existing = await this.findByEmail(register.email);
    if (existing) {
      throw new AuthError('USER_ALREADY_EXISTS');
    }

    const passwordHash = await this.hashPassword(register.password);

    const data = userInsertSchema.parse({
      id: randomUUID(),
      email: register.email,
      passwordHash,
    });

    const [user] = await this.db
      .insert(users)
      .values(data)
      .returning();

    return userResponseSchema.parse(user);
  }


  async login(login: loginSchema) {
    const user = await this.findByEmail(login.email);

    if (!user) {
      throw new AuthError('INVALID_CREDENTIALS');
    }

    const isValidPassword = await verify(user.passwordHash, login.password);

    if (!isValidPassword) {
      throw new AuthError('INVALID_CREDENTIALS');
    }

    if (!user.isActive) {
      throw new AuthError('USER_INACTIVE');
    }

    const sessionData = sessionInsertSchema.parse({
      id: randomUUID(),
      userId: user.id,
      refreshToken: randomUUID(), // или jwt
      expiresAt: addDays(new Date(), 7),
    });

    await this.db.insert(sessions).values(sessionData);

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
    return this.db.query.users.findFirst({
      where: eq(users.id, userId),
    });
  }

  async findByEmail(email: string) {
    return this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async hashPassword(password: string): Promise<string> {
    const hashed = await hash(password);
    return hashed;
  }

}
