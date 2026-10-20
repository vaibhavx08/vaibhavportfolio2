# Vaibhav Dhebe: Portfolio Website

A responsive, single-page portfolio built with plain HTML, CSS and JavaScript (no build step, no dependencies).
All content comes from the resume in `assets/`.

## Project structure

```
portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── Vaibhav_Dhebe_Cloud_Engineer_Resume.pdf   <- "Download resume" button
│   └── favicon.svg
└── README.md
```

## Before you publish: set your GitHub link

Your resume does not contain a GitHub URL, so the GitHub links currently open `https://github.com/`.
Open `js/main.js` and set it at the top of the file:

```js
const CONFIG = {
  githubUrl: "https://github.com/YOUR-USERNAME",
  ...
};
```

Save the file. Every GitHub link on the page updates automatically.
The LinkedIn link and email are already set from your resume.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new public repository on GitHub, for example `portfolio` (or `YOUR-USERNAME.github.io` for a root URL).
2. Upload the **contents** of this folder so that `index.html` sits at the top level of the repository.
   - Web: **Add file > Upload files**, drag in everything, then **Commit changes**.
   - Or with Git:
     ```bash
     git init
     git add .
     git commit -m "Add portfolio website"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
     git push -u origin main
     ```
3. In the repository, go to **Settings > Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Choose branch **main** and folder **/ (root)**, then click **Save**.
6. Wait one to two minutes. Your site will be live at
   `https://YOUR-USERNAME.github.io/portfolio/` (or `https://YOUR-USERNAME.github.io/` if the repository is named `YOUR-USERNAME.github.io`).
7. Add this URL to your LinkedIn profile and your resume.

## Updating the content

- **Text, projects, skills:** edit `index.html`.
- **Colors and fonts:** edit the variables at the top of `css/style.css`.
- **Resume:** replace the PDF in `assets/` and keep the same file name (or update the link in `index.html`).
- **Contact form:** it opens the visitor's email app with the message pre-filled, so no server is needed.

## Notes

- Fonts load from Google Fonts. If they are blocked, the site falls back to system fonts.
- Light and dark themes are supported, and the choice is remembered in the browser.
- Animations are turned off automatically for visitors who prefer reduced motion.
