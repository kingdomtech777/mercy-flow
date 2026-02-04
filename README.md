# Mercy Flow — Static site scaffold

This is a minimal static site ready to publish via GitHub Pages. It includes:

- `index.html` — home page
- `about.html` — sample secondary page
- `contact.html` — sample contact page
- `css/styles.css` — basic styles

How to publish on GitHub Pages

1. Create a new repository on GitHub and push this code.

   ```bash
   git init
   git add .
   git commit -m "Add site scaffold"
   git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git
   git push -u origin main
   ```

2. Enable GitHub Pages in your repository settings.

- Option A (user/organization site): name the repo `YOUR_USER.github.io` and push to `main` — GitHub will serve the root.
- Option B (project site): enable Pages and set the source to the `gh-pages` branch or the `docs/` folder on `main`.

To publish to a `gh-pages` branch:

```bash
git checkout -b gh-pages
git add .
git commit -m "Publish site"
git push -u origin gh-pages
```

Next steps

- Paste HTML/text from your previous site into these files, or tell me which pages to import and I can help move content in.
