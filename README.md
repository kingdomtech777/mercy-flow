# Mercy Flow — Static site (GitHub Pages)

This repository contains a small, multi-page static site suitable for publishing on GitHub Pages (no server required).

Included pages

- `index.html` — Home
- `about.html` — What We Believe
- `what-we-do.html` — What We Do
- `gospel.html` — The Gospel
- `contact.html` — Contact (loads Google Forms via tabs)
- `css/styles.css` — Global styles

Quick publish (recommended)

1. If you haven't already, create the remote repository on GitHub (this repo is named `mercy-flow`).

2. Push your local `main` branch (already done for this project):

```bash
git push -u origin main
```

3. In GitHub: Settings → Pages, set the source to the `main` branch (root) and Save. GitHub will build the site from the repository root.

Custom domain (example.com)

- Add a `CNAME` file (already present) at the repository root with your domain (one line). Example:

```bash
echo "mercy-flow.com" > CNAME
git add CNAME && git commit -m "Add CNAME" && git push
```

- DNS (Cloudflare / registrar): point your apex domain to GitHub Pages by creating these A records (set to DNS-only / gray cloud in Cloudflare):

   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

- For `www`, add a CNAME to `kingdomtech777.github.io` (or `YOUR_GITHUB_USERNAME.github.io`).

- After DNS propagates, GitHub Pages will provision TLS — enable "Enforce HTTPS" in the Pages settings when available.

Robots & sitemap

- `robots.txt` and `sitemap.xml` are included at the repository root and reference the production domain.

Useful commands with `gh` (optional)

- Create the remote and push all in one (requires `gh` and authentication):

```bash
gh auth login
gh repo create mercy-flow --public --source=. --remote=origin --push
```

Notes & troubleshooting

- If the Pages page shows "There isn't a GitHub Pages site here", check that:
   - The Pages source is set to `main` branch (root) in repository Settings → Pages.
   - DNS A records are present and set to DNS-only (Cloudflare="gray cloud").
   - `CNAME` file contains your domain and is pushed.

- Wait ~30–60 minutes for certificate provisioning after DNS changes.

Want me to help further?

- I can verify Pages settings via the `gh` CLI and check TLS status, or run a quick remote check against your domain. Tell me what you'd like me to do next.
