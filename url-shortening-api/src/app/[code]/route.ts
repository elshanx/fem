import prisma from '@/lib/db';
import { CODE_PATTERN } from '@/lib/short-code';

// Short links shouldn't be cached by browsers/CDNs or indexed by search engines.
const NO_CACHE_HEADERS = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' };

export async function GET(_request: Request, { params }: RouteContext<'/[code]'>) {
  const { code } = await params;
  const link = CODE_PATTERN.test(code)
    ? await prisma.link.findUnique({ where: { code }, select: { originalUrl: true } })
    : null;

  if (!link) return new Response('Link not found', { status: 404, headers: NO_CACHE_HEADERS });
  // 302 rather than 301 so browsers don't cache it; keeps the door open for click counting.
  return new Response(null, {
    status: 302,
    headers: { ...NO_CACHE_HEADERS, Location: link.originalUrl },
  });
}
