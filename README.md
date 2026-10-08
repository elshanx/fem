# fem

My solutions to [Frontend Mentor](https://www.frontendmentor.io) challenges, all in one repo. Each folder is a standalone project with its own dependencies and README.

## Projects

| Project                                                             | Stack                                                         | Preview                                                                                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [QR code component](./qr-code)                                      | HTML, CSS                                                     | <img src="./qr-code/design/desktop-preview.jpg" width="240" alt="QR code component preview">                           |
| [Product preview card](./product-preview-card)                      | HTML, Tailwind CSS                                            | <img src="./product-preview-card/design/desktop-preview.jpg" width="240" alt="Product preview card preview">           |
| [Results summary](./results-summary)                                | HTML, Tailwind CSS, JS                                        | <img src="./results-summary/design/desktop-preview.jpg" width="240" alt="Results summary preview">                     |
| [Social proof section](./social-proof-section)                      | HTML, Tailwind CSS                                            | <img src="./social-proof-section/design/desktop-preview.jpg" width="240" alt="Social proof section preview">           |
| [Blog preview card](./blog-preview-card)                            | HTML, Tailwind CSS                                            | <img src="./blog-preview-card/preview.jpg" width="240" alt="Blog preview card preview">                                |
| [Skilled e-learning landing page](./skilled-elearning-landing-page) | HTML, Tailwind CSS                                            | <img src="./skilled-elearning-landing-page/preview.jpg" width="240" alt="Skilled e-learning landing page preview">     |
| [News homepage](./news-homepage)                                    | HTML, Tailwind CSS, JS                                        | <img src="./news-homepage/preview.jpg" width="240" alt="News homepage preview">                                        |
| [Loopstudios landing page](./loopstudios)                           | HTML, Tailwind CSS, JS                                        | <img src="./loopstudios/preview.jpg" width="240" alt="Loopstudios landing page preview">                               |
| [Article preview component](./article-preview-component)            | HTML, CSS, JS                                                 | <img src="./article-preview-component/design/desktop-preview.jpg" width="240" alt="Article preview component preview"> |
| [Base Apparel coming soon page](./base-apparel-coming-soon)         | HTML, CSS, JS                                                 | <img src="./base-apparel-coming-soon/preview.jpg" width="240" alt="Base Apparel coming soon page preview">             |
| [Ping coming soon page](./ping-coming-soon)                         | HTML, Tailwind CSS, JS                                        | <img src="./ping-coming-soon/preview.jpg" width="240" alt="Ping coming soon page preview">                             |
| [IP address tracker](./ip-address-tracker)                          | HTML, Tailwind CSS, JS, Netlify Functions                     | <img src="./ip-address-tracker/design/desktop-preview.jpg" width="240" alt="IP address tracker preview">               |
| [URL shortening API](./url-shortening-api)                          | Next.js, TypeScript, Tailwind CSS, Route Handlers             | <img src="./url-shortening-api/preview.jpg" width="240" alt="URL shortening API preview">                              |
| [Devjobs web app](./devjobs)                                        | Next.js, TypeScript, Tailwind CSS, Postgres + Prisma          | <img src="./devjobs/preview.jpg" width="240" alt="Devjobs web app preview">                                            |
| [Invoice app](./invoice-app)                                        | Next.js, TypeScript, Tailwind CSS, Postgres + Prisma          | <img src="./invoice-app/preview.jpg" width="240" alt="Invoice app preview">                                            |
| [Arch Studio multi-page website](./arch-studio)                     | Astro, Tailwind CSS, TypeScript, Leaflet                      | <img src="./arch-studio/preview.jpg" width="240" alt="Arch Studio multi-page website preview">                         |
| [Todo app](./todo-app)                                              | Next.js, TypeScript, Tailwind CSS, Postgres + Prisma, dnd-kit | <img src="./todo-app/preview.jpg" width="240" alt="Todo app preview">                                                  |
| [Fylo dark theme landing page](./fylo)                              | HTML, Tailwind CSS, JS                                        | <img src="./fylo/preview.jpg" width="240" alt="Fylo dark theme landing page preview">                                  |

## Running a project

Everything runs from inside the project folder:

```bash
cd <project>
npm install
```

- **Static Tailwind projects:** run `npm run dev:tw` to watch-build the CSS into `dist/`, then open `index.html`.
- **IP address tracker:** run `npm run dev` (starts `netlify dev`).
- **Devjobs, URL shortening API, invoice app:** run `npm run dev`. Devjobs and the invoice app need Postgres; see their READMEs.
- **Fylo:** uses pnpm (`pnpm install`, `pnpm dev:tw`), then open `index.html`.
- **Todo app:** uses pnpm (`pnpm install`, `pnpm dev`) and needs Postgres; see its README.
- **Arch Studio:** run `npm run dev` (Astro dev server).
- **QR code, Article preview, Base Apparel:** plain HTML/CSS/JS, so just open `index.html`.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@fem](https://www.frontendmentor.io/profile/elshanx)
