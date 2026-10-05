# fem

My solutions to [Frontend Mentor](https://www.frontendmentor.io) challenges, all in one repo. Each folder is a standalone project with its own dependencies and README.

## Projects

| Project                                                             | Stack                                                   | Preview                                                                                                            |
| ------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [QR code component](./qr-code)                                      | HTML, CSS                                               | <img src="./qr-code/design/desktop-preview.jpg" width="240" alt="QR code component preview">                       |
| [Product preview card](./product-preview-card)                      | HTML, Tailwind CSS                                      | <img src="./product-preview-card/design/desktop-preview.jpg" width="240" alt="Product preview card preview">       |
| [Results summary](./results-summary)                                | HTML, Tailwind CSS, JS                                  | <img src="./results-summary/design/desktop-preview.jpg" width="240" alt="Results summary preview">                 |
| [Social proof section](./social-proof-section)                      | HTML, Tailwind CSS                                      | <img src="./social-proof-section/design/desktop-preview.jpg" width="240" alt="Social proof section preview">       |
| [Skilled e-learning landing page](./skilled-elearning-landing-page) | HTML, Tailwind CSS                                      | <img src="./skilled-elearning-landing-page/preview.jpg" width="240" alt="Skilled e-learning landing page preview"> |
| [IP address tracker](./ip-address-tracker)                          | HTML, Tailwind CSS, JS, Netlify Functions               | <img src="./ip-address-tracker/design/desktop-preview.jpg" width="240" alt="IP address tracker preview">           |
| [URL shortening API](./url-shortening-api)                         | Next.js, TypeScript, Tailwind CSS, Route Handlers       | <img src="./url-shortening-api/preview.jpg" width="240" alt="URL shortening API preview">                          |
| [Devjobs web app](./devjobs)                                        | Next.js, TypeScript, Tailwind CSS, daisyUI              |                                                                                                                    |
| [Invoice app](./invoice-app)                                        | React + Vite + TypeScript client, Express + MongoDB API |                                                                                                                    |

The invoice app has three parts: `client` (current Vite rewrite), `old-client` (original CRA + Redux + styled-components version) and `server` (REST API).

## Running a project

Everything runs from inside the project folder:

```bash
cd <project>
npm install
```

- **Static Tailwind projects:** run `npm run dev:tw` to watch-build the CSS into `dist/`, then open `index.html`.
- **IP address tracker:** run `npm run dev` (starts `netlify dev`).
- **Devjobs, URL shortening API, invoice-app/client:** run `npm run dev`.
- **invoice-app/server:** run `npm run dev`. It needs a `.env` with `MONGO_DB_URI` (and optionally `PORT`, which defaults to 5000).
- **QR code:** plain HTML/CSS, so just open `index.html`.

## Author

- GitHub: [@elshanx](https://github.com/elshanx)
- Frontend Mentor: [@fem](https://www.frontendmentor.io/profile/elshanx)
