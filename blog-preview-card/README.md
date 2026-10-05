# Frontend Mentor - Blog preview card

Solution to the [Blog preview card](https://www.frontendmentor.io/challenges/blog-preview-card-ckPaj01IcS) challenge.

![Design preview](./preview.jpg)

## Features

- Responsive card from 320px up (327px wide on mobile, 384px on desktop)
- The whole card is clickable through a single link (the title), so screen readers announce one link instead of several
- Hover turns the title yellow; keyboard focus also outlines the card (only for keyboard users, via `:focus-visible`)
- Figtree is self-hosted from the provided variable font and preloaded

## Stack

HTML, Tailwind CSS v4 (CLI), Prettier with the Tailwind class-sorting plugin.

## Running

```bash
npm install
npm run dev:tw     # watch-build Tailwind into dist/output.css
```

Then open `index.html`. `npm run build:css` makes a minified build, and `npm run format` runs Prettier.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@elshanx](https://www.frontendmentor.io/profile/elshanx)
