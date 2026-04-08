import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, isValidSessionToken } from '@/lib/auth-server';

export async function GET(request: Request) {
  const sessionToken = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (!isValidSessionToken(sessionToken)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 });

  const token = process.env.GITHUB_TOKEN || '';
  const filename = path.split('/').pop();
  const cmd = `curl -sL -H "Authorization: Bearer ${token}" https://raw.githubusercontent.com/blacheyong/skills-library/main/${path} -o ~/.claude/commands/${filename}`;

  return NextResponse.json({ cmd });
}
