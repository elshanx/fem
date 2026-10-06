# fem

My solutions to [Frontend Mentor](https://www.frontendmentor.io) challenges, all in one repo. Each folder is a standalone project with its own dependencies and README.

## Projects

| Project                                                             | Stack                                                | Preview                                                                                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [QR code component](./qr-code)                                      | HTML, CSS                                            | <img src="./qr-code/design/desktop-preview.jpg" width="240" alt="QR code component preview">                       |
| [Product preview card](./product-preview-card)                      | HTML, Tailwind CSS                                   | <img src="./product-preview-card/design/desktop-preview.jpg" width="240" alt="Product preview card preview">       |
| [Results summary](./results-summary)                                | HTML, Tailwind CSS, JS                               | <img src="./results-summary/design/desktop-preview.jpg" width="240" alt="Results summary preview">                 |
| [Social proof section](./social-proof-section)                      | HTML, Tailwind CSS                                   | <img src="./social-proof-section/design/desktop-preview.jpg" width="240" alt="Social proof section preview">       |
| [Blog preview card](./blog-preview-card)                            | HTML, Tailwind CSS                                   | <img src="./blog-preview-card/preview.jpg" width="240" alt="Blog preview card preview">                            |
| [Skilled e-learning landing page](./skilled-elearning-landing-page) | HTML, Tailwind CSS                                   | <img src="./skilled-elearning-landing-page/preview.jpg" width="240" alt="Skilled e-learning landing page preview"> |
| [News homepage](./news-homepage)                                    | HTML, Tailwind CSS, JS                               | <img src="./news-homepage/preview.jpg" width="240" alt="News homepage preview">                                    |
| [Loopstudios landing page](./loopstudios)                           | HTML, Tailwind CSS, JS                               | <img src="./loopstudios/preview.jpg" width="240" alt="Loopstudios landing page preview">                           |
| [IP address tracker](./ip-address-tracker)                          | HTML, Tailwind CSS, JS, Netlify Functions            | <img src="./ip-address-tracker/design/desktop-preview.jpg" width="240" alt="IP address tracker preview">           |
| [URL shortening API](./url-shortening-api)                          | Next.js, TypeScript, Tailwind CSS, Route Handlers    | <img src="./url-shortening-api/preview.jpg" width="240" alt="URL shortening API preview">                          |
| [Devjobs web app](./devjobs)                                        | Next.js, TypeScript, Tailwind CSS, Postgres + Prisma | <img src="./devjobs/preview.jpg" width="240" alt="Devjobs web app preview">                                        |
| [Invoice app](./invoice-app)                                        | Next.js, TypeScript, Tailwind CSS, Postgres + Prisma | <img src="./invoice-app/preview.jpg" width="240" alt="Invoice app preview">                                        |

## Running a project

Everything runs from inside the project folder:

```bash
cd <project>
npm install
```

- **Static Tailwind projects:** run `npm run dev:tw` to watch-build the CSS into `dist/`, then open `index.html`.
- **IP address tracker:** run `npm run dev` (starts `netlify dev`).
- **Devjobs, URL shortening API, invoice app:** run `npm run dev`. Devjobs and the invoice app need Postgres; see their READMEs.
- **QR code:** plain HTML/CSS, so just open `index.html`.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@fem](https://www.frontendmentor.io/profile/elshanx)
