# Frontend Mentor - Todo app

Solution to the [Todo app](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW) challenge.

![Design preview](./preview.jpg)

## Features

- Add, complete and delete todos, and clear all completed ones at once
- Filter by all, active or completed
- Drag and drop to reorder, with mouse, touch (press and hold) or keyboard (focus a row, Space, arrow keys, Space). The order is saved.
- Changes show instantly (optimistic updates) while the server catches up
- Light/dark theme that follows the system and remembers your choice
- Responsive from 320px up; on mobile the filters move into their own card

## Stack

Next.js 16 (App Router, server components, server actions), TypeScript, Tailwind CSS v4, Postgres + Prisma 7, dnd-kit, next-themes, zod. Linted with the Airbnb style guide (`eslint-config-airbnb-extended`, on ESLint 10 via `@eslint/compat`) and formatted with Prettier. Uses pnpm.

## How it's built

- There are no accounts. Each browser gets an anonymous id in an httpOnly cookie (`src/lib/owner.ts`) the first time it adds a todo, and every query is scoped to that id.
- `prisma/schema.prisma` has a single `Todo` model with an integer `position` for ordering.
- `src/app/actions.ts` holds the server actions. Each one validates its input with zod and only touches the caller's own rows. A reorder is accepted only if it's an exact permutation of the caller's todos.
- `src/components/TodoApp.tsx` keeps the list in `useOptimistic`, so the UI updates before the server responds and settles on the server's list once the action finishes. `TodoList.tsx` handles drag and drop.
- `src/lib/todos.ts` holds the pure helpers (filtering, counting, validation and the optimistic reducer), which are unit-tested in `todos.test.ts`.

## Running

Needs a running Postgres.

```bash
cp .env.example .env   # then set DATABASE_URL
pnpm install           # also generates the Prisma client
pnpm db:migrate
pnpm dev
```

`pnpm test` runs the unit tests, `pnpm lint` the Airbnb rules, `pnpm typecheck` the types, and `pnpm format` Prettier.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@elshanx](https://www.frontendmentor.io/profile/elshanx)
