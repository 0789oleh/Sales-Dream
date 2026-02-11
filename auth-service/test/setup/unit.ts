// test/setup/unit.ts
import { vi } from 'vitest';
import { AuthService } from '../../src/modules/auth/auth.service';

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



vi.mock('argon2', () => ({
  verify: vi.fn(),
}));


const service = new AuthService(mockDb as any, mockJwt);

