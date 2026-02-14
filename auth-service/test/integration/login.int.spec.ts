import { describe, it, expect, vi } from 'vitest';
import { AuthService } from '../../src/modules/auth/auth.service';
import { createTestDb } from '../setup/integration';


describe('AuthService.login (integration)', () => {
  it('register → login → returns JWT', async () => {
  const { db, client } = await createTestDb();

  const jwtService = {
    sign: () => 'integration-jwt',
  };

  const service = new AuthService(db, jwtService);

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

  await client.close();
});

  
});
