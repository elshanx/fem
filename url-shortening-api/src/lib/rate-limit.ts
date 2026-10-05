import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { ipAddress, waitUntil } from '@vercel/functions';
import env from '@/lib/env';

const LIMIT = 10;
const WINDOW = '1 m';

let limiter: Ratelimit | null | undefined;

// Created lazily so builds and local dev don't need Upstash credentials.
function getLimiter() {
  if (limiter !== undefined) return limiter;

  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = env;
  if (!url || !token) {
    if (env.NODE_ENV === 'production') {
      throw new Error(
        'UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required in production'
      );
    }
    limiter = null;
    return limiter;
  }

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(LIMIT, WINDOW),
    prefix: 'shortly',
    analytics: true,
    ephemeralCache: new Map(),
  });
  return limiter;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return ipAddress(request) ?? forwarded ?? '127.0.0.1';
}

export default async function checkRateLimit(request: Request) {
  const rateLimiter = getLimiter();
  if (!rateLimiter) return { success: true, headers: {} };

  const { success, limit, remaining, reset, pending } = await rateLimiter.limit(clientIp(request));
  // Analytics are written in the background; keep the function alive until they finish.
  waitUntil(pending);

  const headers: Record<string, string> = {
    'X-RateLimit-Limit': String(limit),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(Math.ceil(reset / 1000)),
  };
  if (!success) {
    headers['Retry-After'] = String(Math.max(1, Math.ceil((reset - Date.now()) / 1000)));
  }

  return { success, headers };
}
