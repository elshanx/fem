# Frontend Mentor - devjobs web app

Solution to the [devjobs web app](https://www.frontendmentor.io/challenges/devjobs-web-app-HuvC_LP4l) challenge.

## Features

- Job listings with search by title/company, location and "Full Time Only"; filters live in the URL, so results are shareable and the form works without JavaScript
- "Load More" in pages of 12
- Job detail page with company info, requirements and role, plus a styled 404
- Light/dark theme that follows the system and remembers your choice
- Responsive at desktop, tablet and mobile; on mobile the location and full-time filters open in a dialog

## Stack

Next.js 16 (App Router, server components), TypeScript, Tailwind CSS v4, Postgres + Prisma 7, next-themes. Linted with the Airbnb style guide (`eslint-config-airbnb-extended`) and formatted with Prettier.

## How it's built

- `prisma/schema.prisma` defines a single `Job` model; `prisma/seed.ts` loads the challenge data from `prisma/jobs.json`.
- `src/lib/filters.ts` turns the query string into filters and a Prisma `where` (unit-tested in `filters.test.ts`); `src/lib/jobs.ts` runs the queries.
- Pages query the database directly from server components; there is no separate API.

## Running

Needs a running Postgres.

```bash
cp .env.example .env   # then set DATABASE_URL
npm install            # also generates the Prisma client
npx prisma migrate dev
npm run db:seed
npm run dev
```

`npm test` runs the unit tests, `npm run lint` the Airbnb rules, `npm run typecheck` the types, and `npm run format` Prettier.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@elshanx](https://www.frontendmentor.io/profile/elshanx)
