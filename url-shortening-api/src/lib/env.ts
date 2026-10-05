import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.url(),
  // Optional so local dev runs without Upstash; rate-limit.ts requires them in production.
  UPSTASH_REDIS_REST_URL: z.url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});

const parsed = schema.safeParse({
  ...process.env,
  // The Vercel Upstash integration names them KV_REST_API_*; empty strings count as unset.
  UPSTASH_REDIS_REST_URL:
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || undefined,
  UPSTASH_REDIS_REST_TOKEN:
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || undefined,
});

if (!parsed.success) {
  throw new Error(`Invalid environment variables:\n${z.prettifyError(parsed.error)}`);
}

export default parsed.data;
