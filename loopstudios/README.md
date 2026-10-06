# Frontend Mentor - Loopstudios landing page

Solution to the [Loopstudios landing page](https://www.frontendmentor.io/challenges/loopstudios-landing-page-N88J5Onjw) challenge.

![Design preview](./preview.jpg)

## Features

- Responsive from 320px up: single column on mobile, 2-column cards from 640px, the full desktop layout from 1024px
- Hero, about and creation images swap between the mobile and desktop crops with `<picture>`
- Full-screen mobile menu below 768px: closes on Escape (focus returns to the toggle), link click, or resizing up, and locks page scroll while open
- Hover and focus states from the design: underline bar on nav, footer links and social icons; inverted "See all" button; white overlay on creation cards
- Alata and Josefin Sans from Google Fonts

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
