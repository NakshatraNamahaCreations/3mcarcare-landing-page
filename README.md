# 3M Car Care Studio — Next.js

Premium single-page site with GSAP parallax + pinned sections.
**App Router · JavaScript (no TypeScript) · plain CSS (CSS Modules) · GSAP via `@gsap/react`.**

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Requires Node 18.17+.

## Structure

```
app/
  layout.js          # fonts (next/font) + metadata
  page.js            # composes all sections
  globals.css        # design tokens + shared utilities (.eyebrow, .btn-gold, .panel, .reveal …)
lib/
  gsap.js            # registers ScrollTrigger + ScrollToPlugin once
hooks/
  useReveal.js       # scoped fade-up reveal, auto-cleaned by useGSAP
data/
  services.js, testimonials.js, faqs.js
components/
  <Section>/<Section>.js + <Section>.module.css   # self-contained module each
```

## GSAP notes

- Every animation lives inside `useGSAP(() => {...}, { scope: ref })`, which reverts
  all tweens **and** ScrollTriggers on unmount — no manual cleanup, no leaked pins.
- Pinning + scrub parallax run **desktop-only** via `gsap.matchMedia('(min-width:981px)')`.
  Touch devices get the reveals + a light hero parallax (scrub-pinning janks on mobile).
- Only `transform` / `opacity` are animated (GPU-composited, no layout reflow).

## Images

Currently hot-linked from `3mcarcarebangalore.com` for a faithful preview.
For production: drop them in `/public`, swap to `next/image` (config already allows
the remote host in `next.config.js`), and add width/height to kill layout shift.
