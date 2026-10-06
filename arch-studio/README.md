# Frontend Mentor - Arch Studio multi-page website

Solution to the Arch Studio multi-page website challenge on [Frontend Mentor](https://www.frontendmentor.io).

![Design preview](./preview.jpg)

## Features

- Four pages (home, portfolio, about, contact) with mobile, tablet (768px+) and desktop (1280px+) layouts; images swap between the provided crops with `<picture>`
- Home hero slider with the 01–04 controls on desktop
- Mobile menu with overlay that closes on Escape or a click outside
- Hover states from the design: nav links, buttons, white overlay on project cards, social icons over the team photos, "View on Map" arrow
- Contact form validation: "Can’t be empty" for empty fields, "Please use a valid email address" for a bad email
- Bonus: Leaflet + OpenStreetMap map (no API key) with real addresses in Nashville and Houston; "View on Map" scrolls to the map and flies to that office

## Stack

Astro, Tailwind CSS v4, TypeScript, Leaflet, Prettier.

## Running

```bash
npm install
npm run dev       # http://localhost:4321
```

`npm run build` writes the static site to `dist/`, `npm run check` type-checks, and `npm run format` runs Prettier.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@elshanx](https://www.frontendmentor.io/profile/elshanx)
