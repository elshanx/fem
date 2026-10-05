import { prisma } from '@/lib/db';
import { CODE_PATTERN } from '@/lib/short-code';

/** Redirects a short code to its original URL. */
export async function GET(_request: Request, { params }: RouteContext<'/[code]'>) {
  const { code } = await params;
  const link = CODE_PATTERN.test(code)
    ? await prisma.link.findUnique({ where: { code }, select: { originalUrl: true } })
    : null;

  if (!link) return new Response('Link not found', { status: 404 });
  // 302 rather than 301 so browsers don't cache it; keeps the door open for click counting.
  return Response.redirect(link.originalUrl, 302);
}
