# Frontend Mentor - Ping coming soon page

Solution to the [Ping coming soon page](https://www.frontendmentor.io/challenges/ping-single-column-coming-soon-page-5cadd051fec04111f7b848da) challenge.

![Design preview](./preview.jpg)

## Features

- Responsive from 320px up: stacked form on mobile, input and button side by side from 768px
- Email validation on submit: empty field and malformed address each get their own message, the input turns red and shakes, and typing clears the error
- Cinematic GSAP intro: the logo dot bounces into place, the headline reveals word by word from a blur and "soon!" pops, the form springs up, the dashboard swings in flat from a 3D tilt, and the social icons pop in
- Living background: soft blue and green blobs drift around behind a faint grid that fades out toward the edges
- The dashboard illustration is rebuilt as inline SVG so it can animate: the window floats, cards rise in one after another, chart lines draw on a loop, check marks pop, window dots pulse and sidebar rows shimmer like a loading state
- All motion is turned off under `prefers-reduced-motion`, and the page still shows normally if the GSAP CDN fails to load
- Hover and focus states on the button and social icons

## Stack

HTML, Tailwind CSS v4 (CLI), vanilla JS, GSAP + SplitText (CDN), Prettier with the Tailwind class-sorting plugin.

## Running

```bash
npm install
npm run dev:tw     # watch-build Tailwind into dist/output.css
```

Then open `index.html`. `npm run build:css` makes a minified build, and `npm run format` runs Prettier.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@elshanx](https://www.frontendmentor.io/profile/elshanx)
