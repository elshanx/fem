// The only module that knows where links are stored. Swap localStorage for API calls when a DB exists.

export type Link = { id: string; originalUrl: string; shortUrl: string };

const STORAGE_KEY = 'shortly:links';

export async function shorten(url: string): Promise<Link> {
  const res = await fetch('/api/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Something went wrong');
  return { id: crypto.randomUUID(), ...data };
}

export function loadLinks(): Link[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function saveLinks(links: Link[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch {
    // storage full or blocked; the list still works for this session
  }
}
