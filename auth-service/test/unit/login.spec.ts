import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../../src/modules/auth/auth.service';
import { AuthError } from '../../src/modules/errors/auth.errors';
import { verify } from 'argon2';

describe('AuthService.login (unit)', () => {
  let service: AuthService;

  const mockDb = {
    query: {
      users: {
        findFirst: vi.fn(),
      },
    },
    insert: vi.fn(() => ({
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{ id: 'session-1' }]),
    })),
  };

  const mockJwt = {
    sign: vi.fn(() => 'fake-jwt'),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AuthService(mockDb as any, mockJwt as any);
  });

  it('returns token for valid credentials', async () => {
    mockDb.query.users.findFirst.mockResolvedValue({
      id: '11111111-1111-4111-8111-111111111111',
      email: 'a@a.com',
      passwordHash: 'hashed-password',
      isActive: true,
    });

    vi.mocked(verify).mockResolvedValue(true);

    const result = await service.login({
      email: 'a@a.com',
      password: 'password123',
    });

    expect(result.accessToken).toBe('fake-jwt');
    expect(result.tokenType).toBe('Bearer');
    expect(mockJwt.sign).toHaveBeenCalled();
  });

  it('throws INVALID_CREDENTIALS if user not found', async () => {
    mockDb.query.users.findFirst.mockResolvedValue(null);

    await expect(
      service.login({ email: 'notfound@a.com', password: 'any' })
    ).rejects.toThrow(AuthError);
  });

  it('throws USER_INACTIVE if user disabled', async () => {
    mockDb.query.users.findFirst.mockResolvedValue({
      id: 'user-2',
      email: 'x@x.com',
      passwordHash: 'hashed',
      isActive: false,
    });

    vi.mocked(verify).mockResolvedValue(true);

    await expect(
      service.login({ email: 'inactive@a.com', password: 'any' })
    ).rejects.toThrow(AuthError);
  });
});
