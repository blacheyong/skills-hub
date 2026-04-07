import { invalidateCache } from '@/lib/store';

async function readError(response: Response): Promise<string> {
  try {
    const body = await response.json();
    if (typeof body.error === 'string' && body.error) {
      return body.error;
    }
  } catch {}

  return 'Une erreur est survenue';
}

export async function login(username: string, password: string) {
  const response = await fetch('/api/auth/login', {
    body: JSON.stringify({ username, password }),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  invalidateCache();
}

export async function logout() {
  await fetch('/api/auth/logout', {
    cache: 'no-store',
    method: 'POST',
  });

  invalidateCache();
}
