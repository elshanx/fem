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
- `src/app/[code]/route.ts` looks up the code and redirects with a 302.
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

`npm test` runs the unit tests and `npm run format` runs Prettier.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@elshanx](https://www.frontendmentor.io/profile/elshanx)
