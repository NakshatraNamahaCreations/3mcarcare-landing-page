# Build Specification — 3M Car Care Studio (Next.js)

> Hand this file to Claude Code in VS Code. It fully specifies a premium single-page
> marketing site for 3M Car Care Studio Bangalore with GSAP parallax + pinned sections.
> Build it exactly to this spec. Do not add TypeScript, Tailwind, or CSS-in-JS.

---

## 1. Stack & hard constraints

- **Framework:** Next.js 14 (App Router). Pin `"next": "^14.2.33"`. Do **not** use Next 15/16.
- **Language:** JavaScript only. **No TypeScript** anywhere (`.js`/`.jsx`, no `.ts`/`.tsx`, no `tsconfig`).
- **Styling:** plain CSS via **CSS Modules** (`*.module.css`) per component + one global `app/globals.css`. **No Tailwind, no styled-components, no Emotion, no SCSS.**
- **Animation:** GSAP `^3.12.5` + `@gsap/react` `^2.1.1`. Use the `useGSAP()` hook for every animation.
- **Fonts:** `next/font/google` only (no `<link>` tags).
- **Node:** 18.17+.
- **Commands the user runs:** `npm run dev`, `npm run build`, `npm start`. Never instruct `npx next` (it pulls the wrong major).

### Non-negotiable engineering rules
1. Every GSAP animation lives inside `useGSAP(() => {...}, { scope: ref })` so tweens **and** ScrollTriggers auto-revert on unmount. No manual `gsap.context()` teardown, no bare `useEffect` for GSAP.
2. **Pinning + scrub parallax are desktop-only**, gated by `gsap.matchMedia('(min-width:981px)')`. Touch/mobile gets reveals + at most a light hero background parallax. Reason: scrub-pinning janks and hijacks momentum scroll on touch.
3. **Animate only `transform` and `opacity`** (use `yPercent`, `xPercent`, `scale`, `opacity`). Never animate `top`/`left`/`margin`/`width`/`height` — no layout reflow during scroll.
4. `will-change: transform` only on elements that actually move (parallax layers).
5. All section anchors scroll via GSAP `ScrollToPlugin` (pin-aware), not native anchor jump.
6. Images use `loading="lazy"`. Mark plain images and CSS-background layers; see §8.

---

## 2. Setup commands (agent should run these)

```bash
npx create-next-app@14 . --js --eslint --app --no-tailwind --no-src-dir --import-alias "@/*"
npm install gsap@^3.12.5 @gsap/react@^2.1.1
# remove any boilerplate page/styles create-next-app generated, then build per §4
```

`jsconfig.json` must define the alias:
```json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./*"] } } }
```

`next.config.js`:
```js
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: 'https', hostname: '3mcarcarebangalore.com' }] }
};
```

---

## 3. Design system

CSS variables live in `:root` inside `app/globals.css`.

| Token | Value | Use |
|---|---|---|
| `--black` | `#08080a` | base background |
| `--panel` | `#0e0e11` | alt section background |
| `--panel-2` | `#141418` | cards |
| `--red` | `#e4002b` | 3M signature accent (primary) |
| `--red-deep` | `#b00021` | — |
| `--gold` | `#c9a35c` | champagne luxury accent |
| `--gold-soft` | `#e0c486` | gradient partner to gold |
| `--cream` | `#f4f1ea` | body text |
| `--muted` | `#8c8c95` | secondary text |
| `--line` | `rgba(255,255,255,.08)` | hairline borders |
| `--ease` | `cubic-bezier(.16,1,.3,1)` | default easing |

**Fonts (via `next/font/google`, exposed as CSS variables):**
- Display / headings: **Cormorant Garamond** (weights 400–700, normal + italic) → `--font-cormorant`, used as `--font-display`.
- Body / UI: **Outfit** (weights 200–700) → `--font-outfit`, used as `--font-body`.
- Apply both `.variable` classNames to `<body>` in `layout.js`. Headings use `var(--font-display)`; body uses `var(--font-body)`.

**Aesthetic:** dark, luxury automotive. SVG grain overlay on `body::before` (mix-blend overlay, opacity ~.04). Radial red glow + vignette behind hero. Italic gold words inside serif headlines. Hairline borders, generous spacing.

**Shared global utility classes** (defined unhashed in `globals.css` so GSAP selectors match): `.eyebrow` (+ `.center`), `.btn-gold` (+ `.arr`), `.reveal` (initial `opacity:0; translateY(34px)`), `.panel` (min-height 100vh flex), `.inner` (max-width 1320px, padded), `.v-edge` (`.l`/`.r` vertical hairlines), `.section-tag` (rotated index label). Everything section-specific goes in that section's `*.module.css` (camelCase class names for clean `styles.x` access).

---

## 4. File tree (feature-based, modular — build exactly this)

```
app/
  layout.js            # next/font setup + metadata, applies font vars to <body>
  page.js              # 'use client'; composes all sections, holds `ready` state
  globals.css          # tokens + shared utilities
lib/
  gsap.js              # import gsap + register ScrollTrigger & ScrollToPlugin once (window-guarded)
hooks/
  useReveal.js         # useGSAP-based scoped fade-up for all `.reveal` in a scope ref
data/
  services.js          # 8 services [{no,title,desc,img}]
  testimonials.js      # 3 testimonials [{initial,name,role,text}]
  faqs.js              # 4 faqs [{q,a}]
components/
  Preloader/           Preloader.js + Preloader.module.css
  Cursor/              ...
  Navbar/
  Hero/
  Locations/
  Services/
  WhyChoose/
  Gallery/
  Testimonials/
  Faq/
  Cta/
  Contact/
  FloatingButtons/
  Footer/
```

`lib/gsap.js`:
```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
export { gsap, ScrollTrigger, ScrollToPlugin };
```

`hooks/useReveal.js` — query `scope.current.querySelectorAll('.reveal')`, tween each to `{opacity:1, y:0, duration:1, ease:'power3.out'}` with `scrollTrigger:{ trigger:el, start:'top 88%' }`, all inside `useGSAP(..., { scope })`.

Every component file starts with `'use client';`. `app/layout.js` stays a server component.

---

## 5. Page composition (`app/page.js`)

Client component. Holds `const [ready, setReady] = useState(false)`.
Render order:
`<Preloader onComplete={() => setReady(true)} />`, `<Cursor />`, `<Navbar />`,
`<main>` → `Hero` (pass `ready`), `Locations`, `Services`, `WhyChoose`, `Gallery`, `Testimonials`, `Faq`, `Cta`, `Contact` `</main>`,
`<Footer />`, `<FloatingButtons />`.

Section `id`s (for nav + scroll): `hero, locations, services, why, gallery, testimonials, faq, cta, contact`.

---

## 6. Section + animation spec

For each section: wrap in `<section className="panel" id="…" ref={root}>`. Generic content gets the global `.reveal` class and is animated by `useReveal(root)`. Section-specific parallax/pin runs in a separate `useGSAP(..., {scope: root})` using `gsap.matchMedia()` for desktop-only pin.

### Preloader
Fixed full-screen overlay, z 11000. Letters `3 M  C A R` (CAR in red) start `translateY(110%)`. Timeline: stagger letters up → fill a progress bar (`scaleX 0→1`) → slide whole loader `yPercent:-100` → `display:none` → call `onComplete`.

### Cursor (desktop only, `matchMedia('(hover:hover)')`)
Two fixed dots (mix-blend-mode difference): a 7px dot tracking the pointer exactly, and a 38px ring lerping behind it via `gsap.ticker`. Ring grows + turns red on hover over `a, button, [data-cursor="hover"]`. Use `useEffect` here (not useGSAP) with explicit cleanup that removes the mousemove listener and `gsap.ticker.remove`.

### Navbar
Fixed, transparent → on `scrollY>60` add `scrolled` (blurred dark bg + hairline border). Links: Studios, Services, Why 3M, Gallery, FAQ, Contact + "Enquire Now" CTA. Logo `3M Car**Care**` with circular "3M" badge. Mobile: hamburger toggles a full-screen slide-in menu. All link clicks `preventDefault` → `gsap.to(window, { scrollTo:{ y:target, autoKill:false }, duration:1.1, ease:'power3.inOut' })`.

### Hero (`id="hero"`, `height:100vh`)
- Background image layer (`inset:-12% 0`, cover): use `https://3mcarcarebangalore.com/assets/images/our-works/ppf-banner-img.jpeg` under a dark gradient. Plus a radial red glow layer and a vignette layer.
- Headline (Cormorant, clamp up to ~7rem): line 1 `3M PPF — The Ultimate`, line 2 `<i>Shield</i> for Your Paint.` (Shield italic gold). Use the overflow-mask reveal: each line wraps a `<span>` starting `translateY(105%)`.
- Eyebrow `100 Years of 3M Innovation`; sub paragraph; gold button `Book PPF Installation` → `#services`.
- **Intro animation:** runs in a `useGSAP` with `dependencies:[ready]`; if `!ready` return. Eyebrow fade+rise, headline lines slide up (stagger .12), sub + button fade-rise, scroll cue fades in.
- **Pin/parallax (desktop):** pin hero `end:'+=100%'`, `scrub:1`: bg `yPercent:18, scale:1.12`; content `yPercent:-28, opacity:0`; glow `yPercent:30`; cue opacity→0. Mobile: just bg `yPercent:20` on scrub, no pin.
- Scroll cue at bottom center: "Scroll" + animated gold line.

### Locations (`id="locations"`, bg `--panel`)
Two cards (grid 1fr/1fr, stack on mobile). Data:
- **Nagasandra** — North Bangalore — "Expert 3M car care and coatings, beside IKEA on the 14th Main Road." — img `…/resources/location-banner-2.webp`
- **Kanakapura Rd** — South Bangalore — "Premium car detailing and protection in Banashankari Stage 6." — img `…/resources/location-banner-2.jpeg`

Each card: cover bg image layer (`data-loc-img`), bottom gradient, region eyebrow, title, desc, "View Studio" link. Hover scales image. **Pin/parallax (desktop):** pin `end:'+=80%'`, scrub: image[0] `yPercent -8→8`, image[1] `yPercent 8→-8` (opposite), head `yPercent:-20`.

### Services (`id="services"`, bg `--black`)
Centered head (eyebrow `Latest Service`, title `Our Premium Car Care Services`, intro). Grid of 8 cards (3 cols → 2 → 1). `data/services.js`:

| no | title | desc | img (under `…/assets/images/`) |
|---|---|---|---|
| 01 | Paint Protection Film | Protect your car from scratches, chips, and UV damage while keeping its showroom finish. | resources/3m-ppf-2.png |
| 02 | Sun Control Film | Reduce heat, glare, and UV rays for a cooler, safer, and more comfortable ride. | resources/3m-sun-film-2.png |
| 03 | Graphene Coating | Enhance paint durability, gloss, and protection against environmental damage. | resources/3m-graphene-coating-1.png |
| 04 | Ceramic Coating | A liquid-glass shield delivering deep, mirror-like gloss and hydrophobic protection. | gallery/gallery-3-2.jpg |
| 05 | Interior GermKleen | Eliminate bacteria, viruses, and odors to maintain a clean and hygienic cabin. | resources/3m-interior-germkleen-treatment-1.png |
| 06 | Anti-Corrosion | Prevent rust on underbody and exposed areas, extending your vehicle's life. | resources/3m-anti-corrosion-teatment-1.png |
| 07 | Wraps & Styling | Transform your car with custom colors and graphics while protecting the paint. | resources/3m-car-wraps-and-custom-styling-1.png |
| 08 | Nomad Floor Mats | Premium all-weather 3M Nomad mats that trap dirt and elevate your cabin. | gallery/gallery-3-5.jpg |

Card: dim cover bg image, number top-right, title, desc hidden until hover (max-height expand), "Explore →" link. Hover lifts card + brightens image + red border. **Entrance:** `ScrollTrigger.batch` the cards, stagger fade-rise on enter. **Pin/parallax (desktop):** pin `end:'+=70%'`, scrub: grid `yPercent 6→-6`, head `yPercent 0→-30`. (On ≤620px, desc + link always visible.)

### WhyChoose (`id="why"`, bg `--panel`)
Two-col grid (image | content), stacks on mobile. Image layer uses `…/our-works/person-working-car-wrapping.jpg`, with a "100 / Years of Innovation" badge bottom-left. Content: eyebrow `Trusted Expertise`, title `Why Choose 3M Car Care Studio?`, then a 5-item list (each `✦` in a red circle):
1. 3M's century-long expertise delivers truly world-class solutions.
2. Paint protection, coatings, films, wraps, mats & anti-corrosion under one roof.
3. Certified technicians ensure precise application and the highest quality.
4. Protects vehicle paint & interior — enhancing long-term value.
5. Services customized for sedans, SUVs, sports & luxury cars.

**Stats row** (4 up, 2-col on mobile) with count-up: `100` Years 3M Legacy, `5000+` Cars Protected, `8` Premium Services, `2` Studios in BLR. Implement count-up with a `ScrollTrigger.create({once:true})` per stat tweening a proxy `{v:0}→end` and writing `toLocaleString()`; suffix appended on complete. **Pin/parallax (desktop):** pin `end:'+=90%'`, scrub: image `yPercent -12→12 (scale 1.12)`, content `yPercent 8→-8`.

### Gallery (`id="gallery"`, bg `--black`)
Centered head: eyebrow `Gallery`, title `See the Shine, <i>Feel</i> the Difference`, intro. Three columns (3→2→1; hide 3rd col ≤620px), middle column offset down `2.4rem`. Images (under `…/assets/images/`):
- col1 (`data-speed="1.12"`): gallery/gallery-3-1.jpg, gallery-3-4.jpg, gallery-3-7.jpg
- col2 (`data-speed=".88"`): gallery/gallery-3-2.jpg, gallery-3-5.jpg, gallery-3-8.jpg
- col3 (`data-speed="1.18"`): gallery/gallery-3-3.jpg, gallery-3-6.jpg, our-works/person-working-car-wrapping.jpg

**Pin/parallax (desktop):** pin `end:'+=110%'`, scrub; each column `data-col` tweens `yPercent` from `(1-speed)*40` to `(speed-1)*40` (different speeds = parallax); head `yPercent 0→-40`.

### Testimonials (`id="testimonials"`, bg `--panel`, `minHeight:auto`)
Head: eyebrow `Testimonial`, title `Clients <i>Testimonial</i>`. 3 cards (3→2→1). Each: big red quote glyph, 5 gold stars, text, avatar initial in red→gold gradient circle + name + role. Reveal only (no pin). `data/testimonials.js`:
- **P · Prajwal Nagaraju · Ceramic Coating** — "The quality of work and service for ceramic coating was top-notch. They answered all our doubts patiently, explaining the process with proof of work done. I totally recommend them."
- **S · Santhosh Kumar · Paint Protection Film** — "Good work on the PPF of my bike. They take care and deliver with utmost attention. The staff is kind and friendly — recommend them to anyone who wants their vehicle fresh and shiny."
- **D · Dhanu · Car Wrap & Styling** — "The quality of the wrap is top-notch, with a deep gloss finish that looks premium and rich. The edges, corners and curves were wrapped seamlessly without any visible bubbles."

### Faq (`id="faq"`, bg `--black`, `minHeight:auto`)
Two-col (heading | accordion), stacks on mobile. Heading: eyebrow `Ask Question`, title `Got Questions? We've <i>Got</i> Answers`. Accordion driven by **React state** (`open` index), first item open by default. Animate open/close with pure CSS `grid-template-rows: 0fr → 1fr` transition (no JS height measuring). `+`/`×` toggle icon, turns red when open. `data/faqs.js`:
1. **What services does 3M Car Care Studio offer?** — We provide paint protection, ceramic & graphene coatings, sun control films, interior cleaning, anti-corrosion treatment, car wraps, custom styling, and premium floor mats.
2. **What is 3M Paint Protection Film (PPF)?** — PPF is a transparent, durable film that protects your car's paint from scratches, stone chips, UV damage, and daily wear while maintaining its glossy finish.
3. **How long does 3M Paint Protection Film last?** — With proper care, 3M PPF can last 5–7 years, depending on coverage and environmental exposure.
4. **What is the benefit of 3M Sun Control Film?** — It reduces heat, glare, and UV rays — protecting your interior, enhancing driving comfort, and keeping passengers safe from harmful sun exposure.

### Cta (`id="cta"`, bg `--panel`, centered)
Dim background image `…/our-works/ceramic-coating-banner.webp` (opacity ~.18) + a radial fade-to-panel overlay. Eyebrow `Get In Touch`, title `Ready for the best <i>Ceramic Coating</i> in the world?`, italic quote `"Give Your Car The Ultimate Protection Available"`, gold button `Get In Touch` → `#contact`. **Pin/parallax (desktop):** pin `end:'+=80%'`, scrub: bg `yPercent -15→15 (scale 1.15)`, inner `yPercent 10→-10`.

### Contact (`id="contact"`, bg `--black`, `minHeight:auto`)
Head: eyebrow `Contact`, title `Visit Our <i>Studios</i>`. Two cards (2→1) each with a Google Maps `<iframe>` (grayscale/inverted filter, returns to color on hover) + details:
- **Nagasandra** — No 7, 14th Main Road, MS Ramaiah Enclave Main Rd, beside IKEA, Bengaluru 560073 · +91 90199 24749 (`tel:+919019924749`) · 3mcarcarenagasandra@gmail.com · map `q=Bengaluru` embed.
- **Kanakapura Road** — 2nd Block, B No 1124, 80 Feet Rd, Banashankari Stage 6, Kariyana Palya, Bengaluru 560098 · +91 93801 04749 (`tel:+919380104749`) · 3mcarcarestudiokrrr@gmail.com · map `q=Kanakapura Road` embed.

Reveal only.

### Footer (bg `--panel`)
Top CTA band: eyebrow `Appointment`, `Book Your Service Today`, copy, gold button `Call +91 88928 88336` (`tel:+918892888336`). Main grid (1.4fr/1fr/1fr → 2col → 1col): brand blurb + social pills (Facebook `…/people/3M-CarCare-Nagasandra/61557047811961/`, Instagram `…/3m_carcare_nagasandra/`, YouTube `…/@3MCarCareNagasandra`, WhatsApp `wa.me/919019924749`); Services list; Studios list. Bottom bar: `© 2025 3M Car Care Studio — Bangalore. All rights reserved.` + tagline.

### FloatingButtons
Fixed bottom-right: WhatsApp pill (`wa.me/919019924749`, green) + Call pill (`tel:+918892888336`, red).

---

## 7. GSAP wiring pattern (apply per animated section)

```js
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import styles from './Section.module.css';

export default function Section() {
  const root = useRef(null);
  useReveal(root);                       // generic .reveal fade-ups

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width:981px)', () => {  // pin/scrub DESKTOP ONLY
      gsap.timeline({ scrollTrigger: { trigger: root.current, start:'top top', end:'+=80%', pin:true, scrub:1 } })
        .fromTo(`.${styles.layer}`, { yPercent:-10 }, { yPercent:10, ease:'none' }, 0);
    });
  }, { scope: root });

  return <section className="panel" id="…" ref={root}>{/* … */}</section>;
}
```

---

## 8. Images

For this build, hot-link from `https://3mcarcarebangalore.com/assets/images/...` (paths given per section). They render via plain `<img loading="lazy">` and CSS `background-image`.

**Production hardening (do if asked):** download assets into `/public/images/`, point all references there, convert plain `<img>` to `next/image`, and convert each CSS `background-image` parallax layer to a positioned `<Image fill priority?>` behind content (since `next/image` can't be a CSS background). Add explicit width/height (or `fill`) to eliminate layout shift.

---

## 9. Acceptance criteria

- [ ] `npm run build` completes with `✓ Compiled successfully`, zero errors.
- [ ] No `.ts`/`.tsx`/`tsconfig.json`; no Tailwind/`postcss` tailwind config; no CSS-in-JS.
- [ ] All 13 section/UI components exist as `Component.js` + `Component.module.css` under `components/<Name>/`.
- [ ] Fonts load via `next/font/google`; headings render in Cormorant, body in Outfit.
- [ ] Desktop (≥981px): Hero, Locations, Services, WhyChoose, Gallery, Cta each pin and parallax on scroll; layers move at different speeds.
- [ ] Mobile (≤980px): no pinning; sections reveal on scroll; nav collapses to slide-in menu; no horizontal scroll.
- [ ] Stats count up once when scrolled into view; FAQ accordion opens/closes; custom cursor only on hover-capable devices.
- [ ] Navigating via nav links smoothly scrolls to the correct (pin-aware) section position.
- [ ] No console errors; no leaked ScrollTriggers after navigation (useGSAP scope cleanup verified).
- [ ] Only `transform`/`opacity` animated; verify no layout thrash in DevTools performance panel during scroll.

---

## 10. Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Use `npm run …` scripts only — never `npx next` (it resolves the wrong Next major).
