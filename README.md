# Publishing Your Professional Portfolio on GitHub Pages

Project developed at JavaScript Developer Training Bootcamp at Digital Innovation One, under the guidance of specialist [Renan Johannsen](https://github.com/RenanJPaula "Renan Johannsen").
Static portfolio for publishing on **GitHub Pages**. Educational project to practice **HTML5**, **CSS3**, and **JavaScript** focusing on semantics, accessibility, and responsiveness.

## Features

- Dark / Light theme (dark default) with moon/sun icons.
- Multilanguage UI: **EN (default)**, **PT-BR**, **ES**.
- No backend required - all data embedded in `script.js`.
- Semantic HTML, ARIA attributes, keyboard support (Esc closes panels).
- Responsive layout for desktop / tablet / mobile.
- Lightweight CSS animations and transitions.

## Technologies used

- **HTML** - main page.
- **CSS** - styles and theme variables.
- **JavaScript** - profile data, translations, UI logic.

## How to publish to GitHub Pages

1. Create a repository on GitHub.
2. Commit the files to the `main` branch.
3. Go to **Settings → Pages** and select the `main` branch and root `/`.
4. Wait for the deployment and open the provided URL.

## Quick Customization

- Edit the `PROFILE` object in `script.js` to update name, photo, job, skills, languages, portfolio and experience.
- Replace `public/profile.png` with your image or change `PROFILE.photo` to a public URL.
- Add translations inside the `PROFILE` object (per-item `translations` are supported for experience and skills).

## Accessibility notes

- Buttons have `aria-expanded` and `aria-pressed`.
- Panels can be closed with `Esc`.
- Contrast designed for readability in dark mode.

## How to publish on GitHub Pages

1. Create a repository on GitHub and push these files to the `main` branch.
2. Option B (docs): move `index.html`, `style.css`, `script.js` and `public/` into a `docs/` folder and in **Settings → Pages** choose **Branch: main** and **Folder: /docs**.
3. Wait for the deployment and open the provided URL.

## Local testing

Use a local static server to test (recommended):

- VS Code Live Server extension
- or `npx http-server` and open `http://localhost:8080`

Opening `index.html` via `file://` may block some features in some browsers.

![Screenshot](/docs/public/profile.png)

[LICENSE](/LICENSE)

See [repository original](https://github.com/digitalinnovationone/js-developer-portfolio).
