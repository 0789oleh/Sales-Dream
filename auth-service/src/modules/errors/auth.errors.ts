export type AuthErrorCode =
    'USER_ALREADY_EXISTS'
  | 'INVALID_CREDENTIALS'
  | 'USER_INACTIVE'
  | 'USER_NOT_FOUND';

export class AuthError extends Error {
  constructor(public readonly code: AuthErrorCode) {
    super(code);
    this.name = 'AuthError';
  }
}

export const authErrorMap: Record<AuthErrorCode, { status: number; message: string }> = {
  USER_ALREADY_EXISTS: {
    status: 409,
    message: 'User already exists',
  },
  INVALID_CREDENTIALS: {
    status: 401,
    message: 'Invalid email or password',
  },
  USER_INACTIVE: {
    status: 403,
    message: 'User account is inactive',
  },
  USER_NOT_FOUND: {
    status: 404,
    message: 'User not found',
  },
};