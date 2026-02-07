import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { AuthService } from '../auth.service';
import { db } from '../../../db/client';
import { sessions, users } from '../../../db/schema';
import { AuthError } from '../../errors/auth.errors';

describe('AuthService.login', () => {
  let service: AuthService;

  beforeEach(async () => {
    await db.delete(sessions);
    await db.delete(users);
    service = new AuthService(db);
  });

  it('returns access token for valid credentials', async () => {
    // arrange
    await service.register({
      email: 'unit@test.com',
      password: '12345678',
    });

    // act
    const result = await service.login({
      email: 'unit@test.com',
     password: '12345678',
    });

    // assert
    expect(result.accessToken).toBeDefined();
    expect(result.tokenType).toBe('Bearer');
    expect(result.expiresIn).toBeGreaterThan(0);
  });  

  it('throws INVALID_CREDENTIALS for wrong password', async () => {
    await service.register({ email: 'a@a.com', password: '12345678' });

    await expect(
      service.login({ email: 'a@a.com', password: 'wrongpass' })
    ).rejects.toThrow(AuthError);
  });

});
