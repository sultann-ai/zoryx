# CLAUDE.md — Zoryx Website

Read this file fully before every task. It is the source of truth for how this project is built.
If a request conflicts with this file, stop and ask before proceeding.

---

## 1. What this project is

Marketing website for **Zoryx POS** (domain: `zoryx.dev`), a small Islamabad/Rawalpindi team that builds
**custom POS systems and own-brand online ordering** for restaurants, cafés, bakeries and (later) dairy/retail shops.
Branding and simple websites are offered as an add-on.

- Audience: owners of new and growing food businesses in central Islamabad and Rawalpindi. They check the site on a phone,
  usually after meeting us or receiving our WhatsApp message.
- The site's single job: **prove we are a real, reliable local team and get the visitor to book a free demo** (mostly via WhatsApp).
- It is NOT a SaaS signup site. No self-signup, no free plans, no public pricing tables.

Full requirements and all page copy: `docs/SRS.md`. Build prompts: `docs/PROMPTS.md`.

---

## 2. Tech stack (do not change without asking)

| Area | Choice |
|---|---|
| Framework | Next.js (latest stable), App Router, TypeScript (strict) |
| Rendering | Fully static: `output: 'export'` in `next.config.ts`. No API routes, no server actions, no database |
| Styling | Tailwind CSS (v4, design tokens defined with `@theme` in `app/globals.css`) |
| Fonts | `next/font/google`: Bricolage Grotesque (700, 800) and DM Sans (400, 500, 700) |
| Icons | `lucide-react` for UI icons; custom inline SVG for brand doodles |
| Images | `next/image` with `unoptimized: true` (required for static export); WebP files in `public/images` |
| Forms | WhatsApp `wa.me` deep link (primary). Optional Formspree for the contact form (endpoint in env var) |
| Analytics | Vercel Analytics or Google Analytics, loaded only in production |
| Hosting | Vercel, custom domain `zoryx.dev` |
| Package manager | pnpm |

Commands:
```bash
pnpm dev        # local dev
pnpm build      # static build into /out
pnpm lint       # eslint
pnpm typecheck  # tsc --noEmit
```

---

## 3. Folder structure

```
app/
  layout.tsx            # fonts, metadata defaults, Header, Footer, WhatsAppButton
  page.tsx              # Home
  solutions/page.tsx
  work/page.tsx
  work/[slug]/page.tsx  # case studies (generateStaticParams)
  about/page.tsx
  faq/page.tsx
  contact/page.tsx
  privacy/page.tsx
  terms/page.tsx
  not-found.tsx
  sitemap.ts
  robots.ts
  globals.css           # Tailwind + @theme tokens
components/
  layout/               # Header, Footer, MobileMenu, WhatsAppButton
  ui/                   # Button, Card, Container, Section, SectionHeading, Sticker, Pill, Tabs, Accordion, ArcDivider
  sections/             # Hero, DemoVideo, ProblemBand, SolutionsTabs, WhoItsFor, WorkPreview, HowItWorks, WhyUs, Testimonial, FinalCta
  icons/                # Doodle SVGs (receipt, pos, scooter, chefhat, qr, chart) + Logo, LogoMark
content/
  site.ts               # ALL copy, contact info, testimonials, case studies, FAQ, SEO text
lib/
  whatsapp.ts           # builds wa.me links with pre-filled messages
  analytics.ts          # trackEvent helper
public/
  images/               # screenshots, client photos, team photos (WebP)
  og/                   # Open Graph images
docs/
  SRS.md
  PROMPTS.md
```

---

## 4. Content rule (most important)

- **Every visible word comes from `content/site.ts`.** No hard-coded copy inside components.
  Components receive content as props or import typed objects from `content/site.ts`.
- `content/site.ts` is generated from section 7 of `docs/SRS.md`. When the SRS content changes, update `content/site.ts` to match.
- Demo content is marked with the prefix `DEMO:` or the placeholder format `[LIKE THIS]`. Never remove these markers on your own;
  the owner replaces them. A pre-launch check fails if any `DEMO:` or `[` placeholder remains.
- **Never invent** statistics, client names, logos, testimonials, awards, certifications or features.
  If content is missing, render a clearly marked placeholder and tell me.
- Do not claim FBR/PRA integration anywhere until `content/site.ts` sets `features.fbrIntegration = true`.

---

## 5. Design language (from the Zoryx Brand Kit)

### Colors (use tokens only, never raw hex in components)

| Token | Hex | Use |
|---|---|---|
| `green` | #2F6656 | Primary brand, hero, dark sections, headings on cream, footer |
| `green-deep` | #03624F | Nav pill, hover on green, dark cards on green |
| `cream` | #FEF8E6 | Main light background, text on green |
| `lime` | #E6FE82 | Primary CTA buttons and the logo accent ONLY. Only on green or as button fill |
| `ink` | #1F3D33 | Body text on light backgrounds |
| `tomato` | #E35635 | One accent band per page, small tags |
| `sunflower` | #F8E351 | Sticker badges |
| `sky` | #9DC3FF | Sticker badges, info chips |
| `white` | #FFFFFF | Screenshot frames, inputs |

Rules:
- Balance: ~45% cream, ~40% green, ~8% lime, ~7% accents.
- Never put lime text on cream or white. Never put body text on tomato; white on tomato only at 24px+ bold.
- Alternate section backgrounds as listed in `docs/SRS.md` section 6 (green hero → cream → one tomato band → green → cream … → green final CTA → green-deep footer). Never two `green` sections in a row.
- One lime (primary) button per screen view.

### Typography

| Style | Font | Desktop / Mobile | Line height | Tracking |
|---|---|---|---|---|
| Display (hero) | Bricolage Grotesque 800 | 96 / 48px | 0.95 | -2% |
| H2 | Bricolage Grotesque 800 | 56 / 34px | 1.0 | -1.5% |
| H3 | Bricolage Grotesque 700 | 24 / 20px | 1.2 | -0.5% |
| Body large | DM Sans 400 | 18 / 16px | 1.6 | 0 |
| Body | DM Sans 400 | 16 / 15px | 1.6 | 0 |
| Label | DM Sans 500 | 13 / 12px | 1.4 | +2% |
| Button | DM Sans 700 | 15px | 1 | 0 |

Headlines: 3–5 words, very bold. No italics. Body lines max ~60–70 characters.

### Shapes and components

- Radius: 8 / 12 / 16px; buttons and pills are fully rounded (999px).
- Buttons: Primary = lime fill + green text; Secondary = transparent + 1.5px cream border (on green); On-cream = green fill + cream text.
  Padding 14px 28px. Hover: darken ~6% and lift 2px. Min touch target 44px.
- Cards: cream or white on green, radius 16px, 1px border at 10% green, minimal shadow (`0 8px 24px rgba(31,61,51,.12)`).
- Signature **arc divider**: one large convex SVG curve where the green hero meets the cream section. Use once per page.
- Nav: links inside a green-deep pill; "Book a Free Demo" button in cream with green text on the right.
- Stickers: rotated (-8° to +8°) square / scalloped / circle badges in sunflower, sky or lime. Only real facts or short labels.
- Image frames: radius 12–16px, thin cream border on green. Collage images may tilt 2–4°.
- Doodle icons: 2px stroke, round caps, cream on green or green on cream.

### Layout

- Container max-width 1200px; side padding 24px mobile / 48px desktop.
- Section vertical padding 120px desktop / 72px mobile.
- Spacing scale only: 4, 8, 12, 16, 24, 32, 48, 64, 96, 120px.
- Mobile first. Everything must work at 360px width.

### Imagery

- Hero = POS screenshot on a laptop/tablet + online ordering page on a phone. No stock models.
- Food photos only next to product UI, never alone.
- Missing images: render a labelled placeholder box (`[POS SCREENSHOT]`), never a random stock image.

---

## 6. Coding conventions

- Server Components by default. Add `"use client"` only for interactivity (mobile menu, tabs, accordion, analytics events).
- Small components; one component per file; named exports; props typed with interfaces.
- Tailwind classes only; no inline styles except dynamic values. Use `clsx` for conditional classes.
- Semantic HTML: one `<h1>` per page, ordered headings, `<nav>`, `<main>`, `<footer>`, real `<button>` and `<a>`.
- Accessibility: WCAG 2.1 AA contrast, visible focus rings (lime outline on green, green outline on cream),
  `alt` text on every meaningful image, `aria-label` on icon-only buttons, respects `prefers-reduced-motion`.
- Performance: Lighthouse ≥ 90 on mobile for Performance, Accessibility, Best Practices, SEO. Lazy-load below-the-fold images.
  No heavy animation libraries; CSS transitions only.
- SEO: every page exports `metadata` (title, description, Open Graph) from `content/site.ts`.
- No new dependencies without asking.

---

## 7. How to work with me

1. Before coding, restate the task in 2–3 lines and list the files you will create or change.
2. Build one module at a time. Do not touch unrelated files.
3. After each module: run `pnpm lint`, `pnpm typecheck`, `pnpm build`. Fix all errors before reporting done.
4. Report: what changed, files touched, anything left as a placeholder, anything you were unsure about.
5. Never commit or push unless I ask.

## 8. Definition of done (per module)

- Matches the design rules above at 360px, 768px and 1280px widths.
- All copy comes from `content/site.ts`.
- Lint, typecheck and static build pass.
- Keyboard navigable, visible focus, correct heading order.
- No console errors.
