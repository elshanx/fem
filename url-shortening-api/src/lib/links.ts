// Client-side API for links. Links live in Postgres, scoped to this browser by an httpOnly cookie.

export type Link = { id: string; originalUrl: string; shortUrl: string };

async function request<T>(init?: RequestInit): Promise<T> {
  const res = await fetch('/api/links', init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? 'Something went wrong');
  return data;
}

export const fetchLinks = () => request<Link[]>();

export const shorten = (url: string) =>
  request<Link>({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
