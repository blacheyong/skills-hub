import { NextResponse } from 'next/server';
import {
  AUTH_COOKIE_NAME,
  EXPIRED_AUTH_COOKIE_OPTIONS,
} from '@/lib/auth-server';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, '', EXPIRED_AUTH_COOKIE_OPTIONS);
  return response;
}
