import 'server-only';
import { cookies } from 'next/headers';
import env from '@/lib/env';
import { idSchema } from '@/lib/todos';

const COOKIE = 'todo_owner';
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function getOwnerId() {
  const parsed = idSchema.safeParse((await cookies()).get(COOKIE)?.value);
  return parsed.success ? parsed.data : null;
}

export async function ensureOwnerId() {
  const existing = await getOwnerId();
  if (existing) return existing;
  const id = crypto.randomUUID();
  (await cookies()).set(COOKIE, id, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    maxAge: ONE_YEAR,
    path: '/',
  });
  return id;
}
