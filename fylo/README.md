# Frontend Mentor - Fylo dark theme landing page

Solution to the [Fylo dark theme landing page](https://www.frontendmentor.io/challenges/fylo-dark-theme-landing-page-5ca5f2d21e82137ec91a50fd) challenge.

![Design preview](./preview.jpg)

## Features

- Responsive from 320px up: single column on mobile, 2-column features grid from 768px, the full desktop layout from 1024px
- Curvy hero background swaps between the mobile and desktop SVGs with `<picture>`
- Sign-up card overlaps the main and footer backgrounds
- Email validation with the native Constraint Validation API: separate messages for empty and invalid input, `aria-invalid` and `aria-describedby` on the field, and the error clears as you type
- Hover and focus states from the design on nav links, buttons, "See how Fylo works", footer links and social icons
- Raleway and Open Sans from Google Fonts

## Stack

HTML, Tailwind CSS v4 (CLI), vanilla JS, Prettier with the Tailwind class-sorting plugin.

## Running

```bash
pnpm install
pnpm dev:tw     # watch-build Tailwind into dist/output.css
```

Then open `index.html`. `pnpm build:css` makes a minified build, and `pnpm format` runs Prettier.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@elshanx](https://www.frontendmentor.io/profile/elshanx)
