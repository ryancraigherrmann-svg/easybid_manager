import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

// Default token lifetime is 1 hour for user sessions
export function signToken(payload: object, expiresIn: string | number = '1h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as any);
}

export function verifyToken<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (e) {
    return null;
  }
}
