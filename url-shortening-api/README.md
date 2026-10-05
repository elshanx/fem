# Frontend Mentor - Shortly URL shortening API

Solution to the [URL shortening API landing page](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G) challenge.

![Design preview](./preview.jpg)

## Features

- Shorten any valid URL (`example.com` works too; `https://` is assumed)
- Shortened links persist across refreshes (localStorage)
- One-click copy to clipboard
- Error message for empty or invalid input
- Responsive layout with a mobile menu, plus hover and focus states

## Stack

Next.js (App Router), TypeScript, Tailwind CSS.

## How it's built

- `src/app/api/shorten/route.ts` is the backend. It validates the URL and proxies [Clean URI](https://cleanuri.com/docs), which can't be called from the browser because it sends no CORS headers.
- `src/lib/links.ts` is the only module that knows where links are stored (localStorage today). Moving to a database means changing this file and the route handler.

## Running

```bash
npm install
npm run dev
```

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@elshanx](https://www.frontendmentor.io/profile/elshanx)
