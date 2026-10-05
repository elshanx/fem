// Backend seam: proxies Clean URI (no CORS headers, so the browser can't call it directly).
// When links move server-side, persist them here.

const CLEAN_URI = 'https://cleanuri.com/api/v1/shorten';

const isHttpUrl = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  try {
    const { protocol, hostname } = new URL(value);
    return (protocol === 'http:' || protocol === 'https:') && hostname.includes('.');
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const raw: string | undefined = body?.url?.trim?.();
  // Accept "example.com" by assuming https.
  const url = raw && !/^[a-z][a-z\d+.-]*:\/\//i.test(raw) ? `https://${raw}` : raw;

  if (!url) return Response.json({ error: 'Please add a link' }, { status: 400 });
  if (!isHttpUrl(url)) return Response.json({ error: 'Please enter a valid URL' }, { status: 400 });

  try {
    const res = await fetch(CLEAN_URI, { method: 'POST', body: new URLSearchParams({ url }) });
    const data = await res.json();

    if (!res.ok || !data.result_url) {
      return Response.json({ error: data.error ?? 'Could not shorten that link' }, { status: 502 });
    }

    return Response.json({ originalUrl: url, shortUrl: data.result_url });
  } catch {
    return Response.json({ error: 'Shortening service is unavailable' }, { status: 502 });
  }
}
