import { cookies } from 'next/headers';
import { z } from 'zod';
import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/db';
import env from '@/lib/env';
import checkRateLimit from '@/lib/rate-limit';
import { generateCode, normalizeUrl } from '@/lib/short-code';

const OWNER_COOKIE = 'sid';
const LIST_LIMIT = 50;

const MAX_CREATE_ATTEMPTS = 3;

const createLinkBody = z.object({
  url: z.string({ error: 'Please add a link' }).trim().min(1, 'Please add a link'),
});

const toLink = (link: { code: string; originalUrl: string }, origin: string) => ({
  id: link.code,
  originalUrl: link.originalUrl,
  shortUrl: `${origin}/${link.code}`,
});

const isUniqueViolation = (err: unknown) =>
  err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002';

/** Returns this owner's existing link for the URL, or creates one with a fresh code. */
async function findOrCreateLink(
  data: { originalUrl: string; ownerId: string },
  attemptsLeft = MAX_CREATE_ATTEMPTS
): Promise<{ link: { code: string; originalUrl: string }; created: boolean } | null> {
  const existing = await prisma.link.findUnique({ where: { ownerId_originalUrl: data } });
  if (existing) return { link: existing, created: false };

  try {
    const link = await prisma.link.create({ data: { ...data, code: generateCode() } });
    return { link, created: true };
  } catch (err) {
    // A parallel request created the same URL (found on retry), or the code collided.
    if (!isUniqueViolation(err)) throw err;
    return attemptsLeft > 1 ? findOrCreateLink(data, attemptsLeft - 1) : null;
  }
}

const SERVER_ERROR = 'Something went wrong on our side. Please try again in a moment.';

// Unexpected failures (DB down, bugs) return a readable JSON error instead of an empty 500.
const withErrorHandling =
  (handler: (request: Request) => Promise<Response>) => async (request: Request) => {
    try {
      return await handler(request);
    } catch (err) {
      // eslint-disable-next-line no-console -- server-side error log for the platform logs
      console.error(`[api/links] ${request.method} failed`, err);
      return Response.json({ error: SERVER_ERROR }, { status: 500 });
    }
  };

export const GET = withErrorHandling(async (request) => {
  const ownerId = (await cookies()).get(OWNER_COOKIE)?.value;
  if (!ownerId) return Response.json([]);

  const links = await prisma.link.findMany({
    where: { ownerId },
    orderBy: { createdAt: 'desc' },
    take: LIST_LIMIT,
  });
  const { origin } = new URL(request.url);
  return Response.json(links.map((link) => toLink(link, origin)));
});

export const POST = withErrorHandling(async (request) => {
  const rateLimit = await checkRateLimit(request);
  if (!rateLimit.success) {
    return Response.json(
      { error: 'Too many links, try again in a minute' },
      { status: 429, headers: rateLimit.headers }
    );
  }
  const badRequest = (error: string) =>
    Response.json({ error }, { status: 400, headers: rateLimit.headers });

  const body = createLinkBody.safeParse(await request.json().catch(() => ({})));
  if (!body.success) return badRequest(body.error.issues[0].message);

  const originalUrl = normalizeUrl(body.data.url);
  if (!originalUrl) return badRequest('Please enter a valid URL');

  const { host, origin } = new URL(request.url);
  const ownHosts = [host, request.headers.get('host'), request.headers.get('x-forwarded-host')];
  if (ownHosts.includes(new URL(originalUrl).host)) {
    return badRequest('That link is already shortened');
  }

  const cookieStore = await cookies();
  let ownerId = cookieStore.get(OWNER_COOKIE)?.value;
  if (!ownerId) {
    ownerId = crypto.randomUUID();
    cookieStore.set(OWNER_COOKIE, ownerId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
  }

  const result = await findOrCreateLink({ originalUrl, ownerId });
  if (!result) {
    return Response.json({ error: SERVER_ERROR }, { status: 500, headers: rateLimit.headers });
  }
  if (!result.created) {
    return Response.json(
      { error: 'That link already exists' },
      { status: 409, headers: rateLimit.headers }
    );
  }
  return Response.json(toLink(result.link, origin), { status: 201, headers: rateLimit.headers });
});
