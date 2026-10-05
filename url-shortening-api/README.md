# Frontend Mentor - Shortly URL shortening API

Solution to the [URL shortening API landing page](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G) challenge.

![Design preview](./preview.jpg)

## Features

- Shorten any valid URL (`example.com` works too; `https://` is assumed)
- Own short codes (`/{code}` redirects to the original URL), stored in Postgres
- Your links persist across refreshes, scoped to your browser by an anonymous cookie
- One-click copy to clipboard
- Error message for empty or invalid input
- Responsive layout with a mobile menu, plus hover and focus states

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, Postgres + Prisma.

## How it's built

- `src/app/api/links/route.ts`: `GET` lists this browser's links, `POST { url }` validates the URL and creates a 7-character code. The owner is an anonymous `sid` httpOnly cookie, which becomes a user ID once auth exists.
- `src/app/[code]/route.ts` looks up the code and redirects with a 302 (`no-store`, `noindex`).
- Abuse protection: link creation is rate limited per IP (10/minute, Upstash Redis), and URLs pointing at private/local hosts, containing credentials, longer than 2048 characters, or pointing back at the shortener are rejected.
- `src/lib/env.ts` validates environment variables at startup; `next.config.ts` sets security headers.
- `src/lib/links.ts` is the client's API wrapper, and `src/lib/short-code.ts` holds code generation and URL normalization (tested in `short-code.test.ts`).
- `prisma/schema.prisma` defines a single `Link` model.

## Running

Needs a running Postgres.

```bash
cp .env.example .env   # then set DATABASE_URL
npm install            # also generates the Prisma client
npm run db:migrate
npm run dev
```

Rate limiting is skipped locally unless Upstash credentials are set; production requires them.

`npm test` runs the unit tests, `npm run typecheck` checks types, `npm run lint` checks the [Airbnb style guide](https://github.com/airbnb/javascript) (via `eslint-config-airbnb-extended`), and `npm run format` runs Prettier.

## Deploying (Vercel)

1. Import the `fem` repo on Vercel and set **Root Directory** to `url-shortening-api`.
2. Under **Storage**, add **Prisma Postgres** (sets `DATABASE_URL`) and **Upstash Redis** (sets `KV_REST_API_URL` / `KV_REST_API_TOKEN`).
3. Deploy. Vercel runs `npm run vercel-build`, which applies migrations (`prisma migrate deploy`) before `next build`.

CI (`.github/workflows/url-shortening-api.yml`) runs lint, Prettier, typecheck, tests and build on every PR that touches this folder.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@elshanx](https://www.frontendmentor.io/profile/elshanx)
