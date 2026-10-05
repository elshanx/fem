export interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
}

async function request<T>(init?: RequestInit): Promise<T> {
  const res = await fetch('/api/links', init).catch(() => {
    throw new Error("Can't reach the server. Check your connection and try again.");
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      data.error ?? 'Something went wrong on our side. Please try again in a moment.'
    );
  }
  return data;
}

export const fetchLinks = () => request<Link[]>();

export const shorten = (url: string) =>
  request<Link>({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
