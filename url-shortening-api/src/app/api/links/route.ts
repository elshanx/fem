import { cookies } from 'next/headers';
import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/db';
import { generateCode, normalizeUrl } from '@/lib/short-code';

const OWNER_COOKIE = 'sid';
const LIST_LIMIT = 50;

const MAX_CREATE_ATTEMPTS = 3;

const toLink = (link: { code: string; originalUrl: string }, origin: string) => ({
  id: link.code,
  originalUrl: link.originalUrl,
  shortUrl: `${origin}/${link.code}`,
});

const isCodeCollision = (err: unknown) =>
  err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002';

async function createLink(
  data: { originalUrl: string; ownerId: string },
  attemptsLeft = MAX_CREATE_ATTEMPTS
): Promise<{ code: string; originalUrl: string } | null> {
  try {
    return await prisma.link.create({ data: { ...data, code: generateCode() } });
  } catch (err) {
    if (!isCodeCollision(err)) throw err;
    return attemptsLeft > 1 ? createLink(data, attemptsLeft - 1) : null;
  }
}

export async function GET(request: Request) {
  const ownerId = (await cookies()).get(OWNER_COOKIE)?.value;
  if (!ownerId) return Response.json([]);

  const links = await prisma.link.findMany({
    where: { ownerId },
    orderBy: { createdAt: 'desc' },
    take: LIST_LIMIT,
  });
  const { origin } = new URL(request.url);
  return Response.json(links.map((link) => toLink(link, origin)));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.url?.trim?.()) return Response.json({ error: 'Please add a link' }, { status: 400 });

  const originalUrl = normalizeUrl(body.url);
  if (!originalUrl) return Response.json({ error: 'Please enter a valid URL' }, { status: 400 });

  const cookieStore = await cookies();
  let ownerId = cookieStore.get(OWNER_COOKIE)?.value;
  if (!ownerId) {
    ownerId = crypto.randomUUID();
    cookieStore.set(OWNER_COOKIE, ownerId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
  }

  const link = await createLink({ originalUrl, ownerId });
  if (!link) {
    return Response.json({ error: 'Could not shorten that link, try again' }, { status: 500 });
  }
  return Response.json(toLink(link, new URL(request.url).origin), { status: 201 });
}
