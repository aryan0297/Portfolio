# Aryan Tiwari — Portfolio

A production-grade portfolio for a **Backend Software Engineer / AI Automation Developer**, built to read like a premium SaaS product page rather than a personal site.

Dark, minimal, heavily animated — but every animation is scoped, GPU-friendly, and disabled under `prefers-reduced-motion`.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, React Server Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + a token-driven design system |
| Motion | Framer Motion (declarative), GSAP + ScrollTrigger (scroll-linked) |
| 3D | React Three Fiber + drei (primitive geometry only, no GLB downloads) |
| UI primitives | shadcn/ui patterns on Radix (`Dialog`, `Slot`) |
| Icons | Lucide React |
| Toasts | Sonner |
| Email | EmailJS (client-side, public keys) |
| QR | `qrcode`, rendered to inline SVG at build time |

---

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values you have
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint 9 flat config (next/core-web-vitals)
npm run lint:fix   # …and autofix
npm run typecheck  # tsc --noEmit
```

Node **24.x** is pinned in `engines` and `.nvmrc`; Vercel's project Node
version must match.

### Dependency policy

- `npm audit` must report **0 vulnerabilities** before a deploy.
- `overrides` in `package.json` force patched `postcss` and `sharp` versions.
  Next pins `postcss@8.4.31` exactly and `sharp@^0.34.x` in its own dependency
  block, and both carry advisories; no released Next version has bumped them
  yet, so the override is the only fix short of forking. **Re-check on each
  Next upgrade** — once Next ships patched pins, delete the overrides.
- ESLint is on 9.x flat config (`eslint.config.mjs`). Do not go back to
  `.eslintrc.json` + `next lint`: ESLint 8 is EOL and drags in the deprecated
  `rimraf@3` / `glob@7` / `inflight@1` / `@humanwhocodes/*` chain, and
  `next lint` is removed in Next 16.

---

## Project structure

```
app/                    App Router entry, SEO routes, error boundaries
  layout.tsx            Fonts, metadata, JSON-LD, global effects, Toaster
  page.tsx              Single-page composition (revalidate: 1h)
  opengraph-image.tsx   Social card generated at build time with next/og
  sitemap.ts robots.ts manifest.ts
  loading.tsx not-found.tsx error.tsx

animations/             Shared Framer Motion variants + the one easing curve
components/
  effects/              Preloader, custom cursor, scroll progress, mouse glow,
                        ambient background, particle canvas, page transition
  layout/               Navbar (scroll-spy + mobile sheet), Footer
  sections/             One file per page section
    hero/               Code window, floating tech badges
    projects/           Card, case-study modal, generated cover art
    contact/            Form, QR card
  shared/               Section shell, Reveal, AnimatedText, Magnetic, TechChip
  three/                R3F laptop scene + dynamic-import wrapper
  ui/                   Button, Badge, Dialog, GlassCard
constants/              All site content — profile, navigation, experience,
                        projects, skills. Nothing is hard-coded in components.
hooks/                  use-active-section, use-typewriter, use-mouse-position,
                        use-media-query, use-lock-body-scroll
lib/                    github.ts, emailjs.ts, seo.ts, utils.ts
types/                  Shared domain types
utils/                  cn, formatters, form validation
public/                 icon.svg, resume/
```

**Content lives in `constants/`.** Editing your bio, adding a project, or
changing a skill level never requires touching a component.

---

## Architecture notes

- **Server components by default.** About, Experience, Projects (grid), GitHub,
  Resume, Contact shell, and Footer render on the server. Only the pieces that
  genuinely need browser state are `'use client'`: the hero typewriter, the
  navbar, skill filters, the project modal, the contact form, and the effects
  layer.
- **GitHub data is fetched server-side** in `lib/github.ts` and ISR-cached for
  an hour. It never throws — rate limits and bad usernames degrade to a static
  profile card, so the build can't fail on a third-party outage.
- **three.js is dynamically imported** (`ssr: false`) behind a skeleton. It is
  ~150 KB gzipped and must never sit in the initial bundle for a decorative
  element.
- **The particle field is a single canvas**, not 90 DOM nodes, and its
  `requestAnimationFrame` loop pauses via `IntersectionObserver` when off-screen.
- **Pointer-driven effects use MotionValues, not React state** — the cursor,
  mouse glow, magnetic buttons, and card spotlights cause zero re-renders.
- **GSAP is used only where it earns its place**: scroll-scrubbed parallax and
  the seamless marquee in the tech-stack section. Everything else is Framer.
- **`prefers-reduced-motion` is honoured globally** in `globals.css` and checked
  individually by the canvas, the R3F scene, and the GSAP timelines.

---

## Environment variables

See `.env.example`. Summary:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Canonical URL for metadata, sitemap, robots, JSON-LD, QR code |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Recommended | Drives the live GitHub section |
| `NEXT_PUBLIC_LINKEDIN_URL` | Recommended | Social links |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Recommended | Contact + `mailto:` fallback |
| `GITHUB_TOKEN` | Optional | Raises the GitHub API limit from 60/hr to 5,000/hr. Server-side only. |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Optional | Contact form |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Optional | Contact form |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Optional | Contact form |

Without the EmailJS trio the form still works — it falls back to a prefilled
`mailto:` link rather than failing silently.

---

## Before you deploy — open TODOs

These are the only placeholders in the codebase. Each is marked `TODO(aryan)`
in source:

1. **Resume PDF links** — the PDF still reads `github.com/YOURUSERNAME` and
   `linkedin.com/in/YOURPROFILE`. The site is correct (`aryan0297`); the
   document is not.
2. **LinkedIn URL** — `NEXT_PUBLIC_LINKEDIN_URL` is still a guess
   (`linkedin.com/in/aryantiwari-dev`). Set it or fix the default in
   `constants/profile.ts`.
3. **Project links** — `githubUrl` / `liveUrl` are `null` in
   `constants/projects.ts`. The modal shows an honest "private codebase" note
   instead of dead `#` links. Fill them in if any repo goes public.
4. **Project screenshots** — cover art is generated inline SVG
   (`components/sections/projects/project-visual.tsx`). Swap for real
   screenshots at `public/projects/<project-id>.webp` when available.
5. **Business impact metrics** — `constants/projects.ts` uses qualitative
   values (`"Automated"`, `"Auditable"`) rather than invented numbers. Replace
   with measured figures if you have them.
6. **EmailJS template** — must define `{{from_name}}`, `{{from_email}}`,
   `{{subject}}`, `{{message}}`.

### Resume

`public/resume/Aryan-Tiwari-Resume.pdf` is the live download, wired to
`profile.resumePath`. Replacing it is a file swap — keep the filename and no
code changes are needed.

Content on the page is kept in sync with the PDF by hand: the experience
period, the resume-section highlights, education, and strengths all come from
`constants/experience.ts`. Update both when the PDF changes.

The phone number in the PDF is deliberately **not** published on the site —
see the note in `constants/profile.ts` for how to add it if you change your mind.

---

## Accessibility

- Skip-to-content link, semantic landmarks, and `aria-labelledby` on every section.
- The project modal is a Radix dialog: focus trap, escape-to-close, correct roles.
- Per-character headline animation exposes the whole string via `aria-label`.
- Decorative layers (3D scene, particles, code window, orbiting badges) are all
  `aria-hidden`.
- Skill bars expose `role="progressbar"` with min/max/now.
- Form errors use `aria-invalid` + `aria-describedby` + `role="alert"`.
- Visible `:focus-visible` ring site-wide; all interactive elements are real
  buttons and links.

---

## Deployment

See **[DEPLOYMENT.md](DEPLOYMENT.md)**.

---

Designed & developed by Aryan Tiwari.
