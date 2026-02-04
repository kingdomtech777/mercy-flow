# Deploying Mercy Flow to GitHub Pages

This file explains how to publish the site and how to point a custom domain to GitHub Pages.

1) Create the remote repository and push

- Option A — using `gh` (recommended if you have it configured):

```bash
# authenticate if needed
gh auth login
# create, push and set remote in one step
gh repo create mercy-flow --public --source=. --remote=origin --push
```

- Option B — using GitHub web + git:

```bash
# create an empty repo on GitHub via the web (name: mercy-flow)
# then on your machine:
git remote add origin git@github.com:YOUR_USER/mercy-flow.git
git push -u origin main
```

2) Enable GitHub Pages

- In GitHub: Repository → Settings → Pages. Set the source to `main` branch and `/ (root)` folder, then Save.
- Alternatively you can publish from a `gh-pages` branch or `docs/` folder.

3) Add a custom domain (optional)

- Add a `CNAME` file in the repo root containing your domain (one line):

```bash
echo "example.com" > CNAME
git add CNAME
git commit -m "Add CNAME for custom domain"
git push
```

- Configure DNS at your registrar:
  - For the apex domain (example.com) add these A records:
    - 185.199.108.153
    - 185.199.109.153
    - 185.199.110.153
    - 185.199.111.153
  - For the `www` subdomain add a CNAME to `YOUR_GITHUB_USERNAME.github.io` (or the Pages hostname GitHub provides).

- Wait for DNS propagation. In the Pages settings, set the Custom domain if not auto-detected and ensure TLS is enabled (GitHub will provision HTTPS automatically).

4) Notes & troubleshooting

- If you see DNS or certificate errors, double-check there are no conflicting records at your registrar.
- If you prefer automation, you can use a GitHub Action to publish to `gh-pages`, but the above steps are simplest for a static root site.

If you want, I can attempt to run `gh repo create` from this environment (requires your interactive authentication). Otherwise run the commands above locally and tell me when it's pushed — I can then help configure the Pages settings or verify the site once live.
