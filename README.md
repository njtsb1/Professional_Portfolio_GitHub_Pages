# Publishing Your Professional Portfolio on GitHub Pages

Project developed at JavaScript Developer Training Bootcamp at Digital Innovation One, under the guidance of specialist [Renan Johannsen](https://github.com/RenanJPaula "Renan Johannsen").
Static portfolio for publishing on **GitHub Pages**. Educational project to practice **HTML5**, **CSS3**, and **JavaScript** focusing on semantics, accessibility, and responsiveness.

## Features

- **Dark/Light** mode (default dark) with moon/sun icon.
- Multilingual: **EN (default)**, **PT-BR**, **ES**.
- Responsive layout for desktop/tablet/smartphone.
- Accessibility: roles, aria-attributes, keyboard support (Esc closes panels).
- Lightweight animations and CSS transitions.

## Technologies used and file structure

- **HTML** - main page.
- **CSS** - styles and theme.
- **JavaScript** - logic: loading `profile.json`, theme, language, accordion.
- **.JSON** - profile data (name, photo, contacts, skills, portfolio).

## How to publish to GitHub Pages

1. Create a repository on GitHub.
2. Commit the files to the `main` branch.
3. Go to **Settings → Pages** and select the `main` branch and root `/`.
4. Wait for the deployment and open the provided URL.

## Quick customization

- Update `profile.json` with your data.
- Replace the `photo` image with a public URL (GitHub avatar, Imgur, etc.).
- Add/edit projects in `portfolio` in `profile.json`.

## Accessibility notes

- Buttons have `aria-expanded` and `aria-pressed`.
- Panels can be closed with `Esc`.
- Contrast designed for readability in dark mode.

![Screenshot](/img/profile.png)

[LICENSE](/LICENSE)

See [repository original](https://github.com/digitalinnovationone/js-developer-portfolio).
