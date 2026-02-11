import { describe, it, expect } from 'vitest';
import { AuthService } from '../../src/modules/auth/auth.service';
import { createTestDb } from '../setup/integration';


describe('AuthService.login (integration)', () => {
  it('register → login → returns JWT', async () => {
    const { db: testDb } = await createTestDb(); // Назови переменную иначе
    const service = new AuthService(testDb);

    await service.register({
      email: 'int@test.com',
      password: '12345678',
    });

    const result = await service.login({
      email: 'int@test.com',
      password: '12345678',
    });

    expect(result.accessToken).toBeDefined();
    expect(result.tokenType).toBe('Bearer');
    expect(result.expiresIn).toBeGreaterThan(0);
  });
});
