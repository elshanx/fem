# Frontend Mentor - News homepage

Solution to the [News homepage](https://www.frontendmentor.io/challenges/news-homepage-H6SWTa1MFl) challenge.

![Design preview](./preview.jpg)

## Features

- Responsive from 320px up: single column on mobile, a 3-column grid from 1024px
- Hero image swaps between the mobile and desktop crops with `<picture>`
- Slide-in mobile menu below 768px: closes on Escape (focus returns to the toggle), backdrop click or link click, and locks page scroll while open
- Toggle exposes `aria-expanded` and an updated label; the menu/close icon swap is pure CSS (`group-aria-expanded:`)
- Hover and focus states on every link and the "Read more" button
- Inter is self-hosted from the provided variable font and preloaded

## Stack

HTML, Tailwind CSS v4 (CLI), vanilla JS, Prettier with the Tailwind class-sorting plugin.

## Running

```bash
npm install
npm run dev:tw     # watch-build Tailwind into dist/output.css
```

Then open `index.html`. `npm run build:css` makes a minified build, and `npm run format` runs Prettier.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@elshanx](https://www.frontendmentor.io/profile/elshanx)
