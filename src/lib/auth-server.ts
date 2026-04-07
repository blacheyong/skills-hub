import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';

export const AUTH_COOKIE_NAME = 'skills-hub-session';

const AUTH_COOKIE_MAX_AGE = 60 * 60 * 12;
const SESSION_PAYLOAD = 'skills-hub-authenticated';

type AuthEnvKey = 'AUTH_PASSWORD_HASH' | 'AUTH_SESSION_SECRET' | 'AUTH_USERNAME';

function readRequiredEnv(name: AuthEnvKey): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function isHex(value: string): boolean {
  return value.length % 2 === 0 && /^[0-9a-f]+$/i.test(value);
}

function safeHexCompare(left: string, right: string): boolean {
  if (!isHex(left) || !isHex(right)) {
    return false;
  }

  const leftBuffer = Buffer.from(left, 'hex');
  const rightBuffer = Buffer.from(right, 'hex');

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function parsePasswordHash() {
  const value = readRequiredEnv('AUTH_PASSWORD_HASH');

  const parts = value.includes(':') ? value.split(':') : value.split('$');
  const [algorithm, salt, hash] = parts;

  if (algorithm !== 'scrypt' || !salt || !hash || !isHex(hash)) {
    throw new Error('AUTH_PASSWORD_HASH must use the format "scrypt:<salt>:<hex-hash>"');
  }

  return { salt, hash };
}

export function verifyCredentials(username: string, password: string): boolean {
  if (username !== readRequiredEnv('AUTH_USERNAME')) {
    return false;
  }

  const { salt, hash } = parsePasswordHash();
  const derivedHash = scryptSync(password, salt, 64).toString('hex');

  return safeHexCompare(hash, derivedHash);
}

export function createSessionToken(): string {
  return createHmac('sha256', readRequiredEnv('AUTH_SESSION_SECRET'))
    .update(SESSION_PAYLOAD)
    .digest('hex');
}

export function isValidSessionToken(token: string | null | undefined): boolean {
  if (!token) {
    return false;
  }

  return safeHexCompare(token, createSessionToken());
}

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: AUTH_COOKIE_MAX_AGE,
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
};

export const EXPIRED_AUTH_COOKIE_OPTIONS = {
  ...AUTH_COOKIE_OPTIONS,
  maxAge: 0,
};
