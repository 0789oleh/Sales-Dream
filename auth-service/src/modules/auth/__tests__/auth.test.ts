import { describe, it, expect, beforeAll } from 'vitest';
import { AuthService } from '../auth.service';
import { registerSchema, loginSchema, loginResponseSchema, meResponseSchema } from '../auth.schemas';
import { db } from '../../../db/client';
import 

describe('AuthService.login', () => {
  let service: AuthService;

  beforeAll(() => {
    service = new AuthService(db);
  });

  it('returns access token for valid credentials', async () => {
    // arrange
    await service.register({
      email: 'unit@test.com',
      password: '12345678',
    });

    // act
    const result = await service.login(
      'unit@test.com',
      '12345678'
    );

    // assert
    expect(result.accessToken).toBeDefined();
    expect(result.tokenType).toBe('Bearer');
    expect(result.expiresIn).toBeGreaterThan(0);
  });

  async getMe(userId: string) {
  const user = await this.findById(userId);

  if (!user) {
    throw new AuthError('USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AuthError('USER_INACTIVE');
  }

  return meResponseSchema.parse(user);
}
  
});
