# Deployment guide

Target platform: **Vercel** (zero-config for Next.js 15 App Router, and ISR /
`next/og` work without setup). Everything below also works on any Node host that
can run `next build && next start`.

---

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "feat: portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

`.gitignore` already excludes `node_modules`, `.next`, and `.env*.local`.
**Never commit `.env.local`.**

---

## 2. Import into Vercel

1. <https://vercel.com/new> → **Import Git Repository** → pick the repo.
2. Framework preset: **Next.js** (auto-detected).
3. Build command: `next build` · Output: `.next` · Install: `npm install`.
   Leave all of these on the defaults.
4. Node version: **20.x** (Project Settings → General).
5. Do **not** deploy yet — add the environment variables first.

---

## 3. Environment variables

Project Settings → **Environment Variables**. Add each to *Production*,
*Preview*, and *Development*:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/your-handle
NEXT_PUBLIC_CONTACT_EMAIL=you@example.com

GITHUB_TOKEN=ghp_...                      # optional, server-side only
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

Two things worth being precise about:

- **`NEXT_PUBLIC_SITE_URL` must be the final production domain.** It is the
  `metadataBase` for every canonical URL, the Open Graph URL, the sitemap
  entries, the JSON-LD `url`, and the target the contact QR code encodes. A
  wrong value here silently poisons all of them.
- **`GITHUB_TOKEN` has no `NEXT_PUBLIC_` prefix on purpose.** It is read only
  inside `lib/github.ts`, which runs on the server. A fine-grained token with
  **no scopes selected** is sufficient — it only raises the anonymous rate limit
  from 60/hour to 5,000/hour.

Then **Deploy**.

---

## 4. Custom domain

1. Vercel → Project → **Settings → Domains** → add your domain.
2. At your registrar, add the records Vercel shows (usually `A → 76.76.21.21`
   for the apex, `CNAME → cname.vercel-dns.com` for `www`).
3. HTTPS is provisioned automatically.
4. **Update `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy** — metadata
   is baked at build time, so a redeploy is required for it to take effect.

---

## 5. Post-deploy checklist

| Check | How |
| --- | --- |
| Sitemap | `https://your-domain.com/sitemap.xml` returns XML |
| Robots | `https://your-domain.com/robots.txt` points at the sitemap |
| Manifest | `https://your-domain.com/manifest.webmanifest` returns JSON |
| Social card | `https://your-domain.com/opengraph-image` returns a 1200×630 PNG |
| Rich results | <https://search.google.com/test/rich-results> — expect `Person`, `WebSite`, `ItemList` |
| Link preview | Paste the URL into LinkedIn/Slack/X and confirm the card renders |
| Contact form | Send yourself a real message |
| GitHub section | Confirm it shows *your* repos, not a placeholder account |
| Resume | Confirm the download resolves (the PDF must exist in `public/resume/`) |
| Reduced motion | Enable the OS setting and reload — animations should stop |

---

## 6. Search Console

1. <https://search.google.com/search-console> → add a **Domain** property.
2. Verify via the DNS TXT record.
3. **Sitemaps** → submit `sitemap.xml`.
4. **URL Inspection** → *Request indexing* for the homepage.

---

## 7. Performance verification

```bash
npm run build
npm run start
npx lighthouse http://localhost:3000 --view --preset=desktop
```

Run Lighthouse against the **production build**, not `next dev` — dev mode ships
unminified React with hot-reload machinery and will under-report by 20–40 points.

Targets and what protects them:

- **Performance 95+** — three.js is dynamic-imported, fonts use `display: swap`,
  `optimizePackageImports` prevents the `lucide-react` barrel from inflating the
  bundle, and the particle loop pauses off-screen.
- **Accessibility 100** — see the accessibility section in the README.
- **SEO 100** — full metadata, canonical URL, sitemap, robots, structured data.
- **Best Practices 100** — security headers set in `next.config.ts`, no mixed
  content, no console errors in production.

If Performance dips, check in this order: (1) an oversized real project
screenshot added to `public/` without `next/image`, (2) a newly added
non-dynamic heavy dependency, (3) a large resume PDF being preloaded.

---

## 8. Rollback

Vercel keeps every deployment. Project → **Deployments** → pick a previous
successful build → **⋯ → Promote to Production**. Instant, no rebuild.

---

## Deploying elsewhere

Any Node 20 host works:

```bash
npm ci
npm run build
npm run start   # binds PORT, default 3000
```

Put it behind a reverse proxy that terminates TLS. Note that ISR
(`revalidate: 3600` on the homepage) needs a persistent filesystem or a shared
cache handler if you run multiple instances — otherwise each instance
revalidates independently, which is harmless here but wastes GitHub API quota.

A static export (`output: 'export'`) is **not** supported by this project: the
GitHub section, ISR, and `next/og` all require a server.
