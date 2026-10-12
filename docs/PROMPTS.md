# PROMPTS.md — Building the Zoryx Website with Claude Code

Run these prompts **in order**, one per Claude Code session or message. Each prompt assumes `CLAUDE.md` is in the repo root
and `docs/SRS.md` exists. After each prompt: review the diff yourself, run the site locally, check it on your phone width,
then move to the next one.

Tip: if Claude Code drifts from the design, paste: "Re-read CLAUDE.md section 5 and fix this module to match it exactly."

---

## Phase 0 — Project setup

### Prompt 0.1 — Create the project
```
Read CLAUDE.md and docs/SRS.md fully.
Create a new Next.js project in this folder with: App Router, TypeScript (strict), Tailwind CSS, ESLint, pnpm, no src/ directory.
Configure next.config.ts for static export (output: 'export', images.unoptimized: true, trailingSlash: true).
Install only: clsx, lucide-react.
Add scripts: dev, build, lint, typecheck (tsc --noEmit).
Create the folder structure from CLAUDE.md section 3 with empty placeholder files where needed.
Do not build any UI yet. Run lint, typecheck and build, then report what you created.
```

### Prompt 0.2 — Design tokens and fonts
```
Implement the design system from CLAUDE.md section 5.
1. In app/globals.css, define Tailwind @theme tokens for all colors (green, green-deep, cream, lime, ink, tomato, sunflower, sky, white),
   radius (sm 8px, md 12px, lg 16px, pill 999px), the shadow-card value, and the spacing scale.
2. In app/layout.tsx, load Bricolage Grotesque (700, 800) and DM Sans (400, 500, 700) with next/font/google as CSS variables
   --font-display and --font-body, and map them to Tailwind font-display and font-body.
3. Add typography utility classes or components for: display, h2, h3, body-lg, body, label — with the exact desktop/mobile sizes,
   line heights and tracking from the table.
4. Set body defaults: cream background, ink text, font-body, antialiased.
5. Add a global focus-visible style: 2px outline, offset 3px; lime on dark backgrounds, green on light ones.
6. Add prefers-reduced-motion handling that disables transitions and transforms.
Create a temporary page at app/page.tsx that shows every color swatch and every type style so I can review them. Run build and report.
```

### Prompt 0.3 — Content file
```
Create content/site.ts from section 7 of docs/SRS.md, plus the SEO table in section 8.
Requirements:
- Fully typed with exported TypeScript interfaces (SiteConfig, NavItem, Hero, ProblemCard, SolutionTab, Solution, CaseStudy,
  Step, ComparisonRow, Testimonial, ProofItem, FaqGroup, FaqItem, TeamMember, PageSeo).
- Copy every piece of text exactly as written in the SRS, including the "DEMO:" prefixes and [PLACEHOLDER] markers. Do not rewrite or improve copy.
- Feature flags: features.fbrIntegration = false, features.retailLive = false.
- Case studies include a published boolean.
- Export a helper getPublishedCaseStudies().
Also create lib/whatsapp.ts with buildWhatsAppLink(message?: string) using the WhatsApp number from content,
and a function buildDemoMessage({ name, shopName, area, businessType, message }).
Add a script "check:content" that fails (exit 1) if content/site.ts contains "DEMO:" or a "[" placeholder, and lists each match.
Do not wire it into build yet. Run typecheck and report.
```

---

## Phase 1 — Layout and UI primitives

### Prompt 1.1 — UI primitives
```
Build reusable components in components/ui following CLAUDE.md section 5 exactly:
- Container (max-w 1200px, responsive side padding)
- Section (props: background "green" | "green-deep" | "cream" | "tomato"; sets text color correctly; vertical padding 120/72px; optional id)
- SectionHeading (eyebrow?, title, text?, align center/left, adapts colors to background)
- Button (variants: primary lime, secondary outline-cream, on-cream green; sizes md/sm; renders <a> when href is given;
  hover darken + translateY(-2px); min height 44px; optional icon; optional trackEvent name)
- Pill (small rounded label)
- Card (cream or white surface, radius 16px, subtle border, optional shadow)
- Sticker (shape: square | scalloped | circle; color: sunflower | sky | lime; rotation prop -8 to 8 degrees; big value + small label)
- ArcDivider (full-width SVG convex curve, green above, cream below; 120px desktop / 60px mobile; aria-hidden)
- ImageFrame (rounded image or labelled placeholder box when src is missing, e.g. "[POS SCREENSHOT]"; optional tilt)
Also create components/icons: Logo (mark + "zoryx" wordmark + optional POS pill, variants primary/reversed/black),
LogoMark, and doodle icons (Receipt, PosScreen, Scooter, ChefHat, QrCode, Chart) as inline SVG with 2px stroke, round caps, currentColor.
Replace the temporary page with a component gallery showing every variant. Run lint, typecheck, build; report.
```

### Prompt 1.2 — Header, footer, WhatsApp button
```
Build components/layout:
1. Header (sticky, green background, blur on scroll): Logo (reversed) on the left; nav links inside a green-deep pill in the center;
   "Book a Free Demo" button (cream fill, green text) on the right. Active link highlighted.
   Below 1024px: hamburger button (aria-label, aria-expanded) opening a full-screen green MobileMenu with large links,
   the demo button and WhatsApp link; closes on link click and Escape; traps focus while open; locks body scroll.
2. Footer (green-deep): logo, description, three link columns, contact details (tel:, mailto:, WhatsApp, address, hours),
   social icons, legal links, copyright. Stacks to one column on mobile.
3. WhatsAppButton: floating round button bottom-right, WhatsApp green is NOT used — use lime background with green icon
   to stay on brand; aria-label "Chat with Zoryx on WhatsApp"; hidden on /contact; respects safe-area insets.
All text from content/site.ts. Wire them into app/layout.tsx. Run checks and report.
```

---

## Phase 2 — Home page (one section per prompt)

### Prompt 2.1 — Hero
```
Build components/sections/Hero.tsx per SRS FR-H1 and section 7.3 "Hero".
Layout: green background, two columns on desktop (text left, product visual right), stacked on mobile (text first).
- Eyebrow as a small cream pill.
- Headline in display style, cream, max 2 lines on desktop.
- Subline body-lg, cream at 85% opacity but still ≥ 4.5:1 contrast.
- Primary lime button (Book a Free Demo → /contact) and secondary outline button (Chat on WhatsApp → wa.me link).
- Trust line under buttons, small, with dot separators.
- Product visual: a laptop frame containing ImageFrame "[POS SCREENSHOT]" and a phone frame overlapping it containing
  "[ORDERING PAGE SCREENSHOT]". Build the device frames with CSS, not images.
- Floating "new order" card (cream card, small, rotated -3deg) near the phone, from content.
- One decorative doodle (Receipt or ChefHat) in cream at low opacity in the top area, aria-hidden.
End the hero with the ArcDivider. Add it to app/page.tsx. Check at 360, 768, 1280px. Report.
```

### Prompt 2.2 — See it working
```
Build components/sections/DemoVideo.tsx per FR-H3 on a cream background.
Centered SectionHeading, then a 16:9 rounded frame. If content has a video src: show a poster image with a large lime play button;
on click, replace with a <video controls playsinline> (no autoplay) and fire trackEvent("video_play").
If no video: show the placeholder "[60-SECOND DEMO VIDEO]" in an ImageFrame.
Caption under the frame. Add to the home page after the hero. Report.
```

### Prompt 2.3 — Problem band
```
Build components/sections/ProblemBand.tsx per FR-H4 on a tomato background.
Large cream heading (white text on tomato only at 24px+ bold — headings are fine; card text must sit on cream cards).
Three cream cards in a row (stacked on mobile), each with a doodle icon in green, a title (h3, green) and text (ink).
Add to the home page. Report.
```

### Prompt 2.4 — Solutions tabs
```
Build components/sections/SolutionsTabs.tsx per FR-H5 on a green background.
Accessible tabs (role="tablist", arrow-key navigation, aria-selected, aria-controls) styled like a menu bar:
tab labels on a thin cream line, active tab in lime text with a lime underline.
Each panel: left = ImageFrame screenshot placeholder with cream border; right = h3 title (cream), text, 4 bullet features
with small lime check icons, and a "See details" link to /solutions#id.
On mobile, tabs scroll horizontally without a visible scrollbar. Add to the home page. Report.
```

### Prompt 2.5 — Who it's for + Our work preview
```
Build two sections on cream backgrounds:
1. WhoItsFor.tsx per FR-H6: two large cards side by side (stacked on mobile), each with a doodle icon, title, text.
   If features.retailLive is false, the retail card shows a "Coming soon" Pill and slightly muted styling.
2. WorkPreview.tsx per FR-H7: heading, text, up to 2 cards from getPublishedCaseStudies() (white cards with ImageFrame,
   business name, type and area, result line, "Read the story" link), plus a "See all work" link.
   If no published case studies, hide the section entirely.
Add both to the home page. Report.
```

### Prompt 2.6 — How it works + Why Zoryx
```
1. HowItWorks.tsx per FR-H8 on green: 4 steps in a row on desktop (2x2 on tablet, stacked on mobile), each with a large
   lime number in a circle, h3 title in cream and text. A dashed cream connector line between steps on desktop only.
2. WhyZoryx.tsx per FR-H9 on cream: comparison table with a header row (Zoryx column highlighted with a light green background
   and the LogoMark), check icons for "Yes" in green, plain text for the other column. Hide the FBR row unless
   features.fbrIntegration is true. On mobile, render each row as a stacked card instead of a wide table.
Add both to the home page. Report.
```

### Prompt 2.7 — Testimonial, proof stickers, final CTA
```
1. Testimonial.tsx per FR-H10 on green: large quote in display-style h3 (cream), owner photo in a rounded frame with a thin
   cream border, name, role, business. Hide the whole section if there are no testimonials.
   Place up to 3 Stickers (FR-H11) around the photo, rotated differently (-6, 4, -3 degrees), in sunflower, sky and lime.
   Hide stickers if content.proof is empty.
2. FinalCta.tsx per FR-H12 on green: centered big heading, text, primary and WhatsApp buttons, one doodle on each side (aria-hidden).
   Note: if this sits directly after another green section, insert a cream FAQ preview between them (3 questions + link to /faq),
   so no two green sections touch.
Add to the home page in the order from SRS section 6. Add LocalBusiness JSON-LD to the home page using content data.
Then review the full home page at 360, 768, 1280px and list any spacing or color inconsistencies you fixed. Report.
```

---

## Phase 3 — Inner pages

### Prompt 3.1 — Solutions page
```
Build app/solutions/page.tsx per FR-S1 to FR-S3 and SRS 7.4.
- Green page hero (shorter than home) with heading and intro, then ArcDivider.
- Sticky anchor nav (pills) under the hero linking to #pos, #online-ordering, #inventory-reports, #branding; highlights the current section on scroll.
- Each solution as an alternating block (image left / right), alternating cream and white surfaces; feature list in two columns on desktop.
- "How it fits your shop" in a green-tinted callout card.
- Hardware section at the end, then FinalCta.
Export metadata from content. Report.
```

### Prompt 3.2 — Our Work and case study pages
```
Build app/work/page.tsx (FR-W1) and app/work/[slug]/page.tsx (FR-W2, FR-W3).
- Work page: short green hero, then a grid of published case study cards.
- Case study page: generateStaticParams from getPublishedCaseStudies(); hero with large image; a facts row (type, area, live since)
  as Pills; sections "The problem", "What we built", "The result"; screenshot gallery (2–3 ImageFrames, one slightly tilted);
  owner quote block; FinalCta.
- Unpublished slugs must not be generated.
Export metadata per case study. Report.
```

### Prompt 3.3 — About page
```
Build app/about/page.tsx per FR-A1 and SRS 7.6.
Green hero with heading, ArcDivider, story section (two columns: text + ImageFrame "[TEAM PHOTO]"), three values as cards with
doodle icons, team grid (photo frames, name, role, one line; 2 columns on mobile, 4 on desktop), and a "Visit us" block with
address, note and an embedded Google Map iframe (lazy-loaded, title attribute set, rounded frame). End with FinalCta. Report.
```

### Prompt 3.4 — FAQ page
```
Build app/faq/page.tsx per FR-F1, FR-F2 and SRS 7.7.
Accessible accordion (button with aria-expanded and aria-controls, smooth height transition that respects reduced motion),
grouped by topic with h2 group titles, each question deep-linkable via #id (opens automatically if the URL hash matches).
Add FAQPage JSON-LD generated from content. Green hero, cream body, FinalCta at the end. Report.
```

### Prompt 3.5 — Contact page
```
Build app/contact/page.tsx per FR-C1 to FR-C5 and SRS 7.8.
Layout: green hero with heading and intro; below, two columns on desktop:
- Left: a large lime "Chat on WhatsApp" card (biggest element on the page), then phone, email, address, hours and reply time
  as a list with icons.
- Right: the form in a cream card. Labels above inputs, 44px+ inputs, Pakistani phone validation, accessible inline errors,
  business type as a select.
  Submit behaviour: if process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT is set, POST JSON there, show success/error messages from content
  and fire trackEvent("form_submit"); otherwise build a message with buildDemoMessage() and open the WhatsApp link.
Below: embedded map. Hide the floating WhatsApp button on this page. Add LocalBusiness JSON-LD. Report.
```

### Prompt 3.6 — Legal pages and 404
```
Build app/privacy/page.tsx and app/terms/page.tsx as simple readable text pages (cream, max-width 720px, proper heading levels)
using content from site.ts. Build app/not-found.tsx with the copy from SRS 7.11, a large doodle, and two buttons. Report.
```

---

## Phase 4 — SEO, analytics and quality

### Prompt 4.1 — SEO and sharing
```
1. Set metadataBase to https://zoryx.dev in app/layout.tsx and default title template "%s | Zoryx POS".
2. Each page's metadata from the SEO table in content (title, description, canonical, Open Graph, Twitter card).
3. Create app/sitemap.ts and app/robots.ts (static-export compatible).
4. Create a default Open Graph image 1200x630 as a static file in public/og/ (green background, reversed logo, the hero headline)
   — build it as an SVG converted to PNG, or tell me exactly what image to provide.
5. Favicon and app icons from the LogoMark (32px, 180px apple-touch, 512px).
Run build and list the generated sitemap URLs. Report.
```

### Prompt 4.2 — Analytics
```
Create lib/analytics.ts with trackEvent(name, params) that sends to the chosen analytics provider only in production and is a
no-op in development. Wire the events from SRS 4.8: cta_demo_click (with location), whatsapp_click (with location), phone_click,
form_submit, video_play. Add the provider script in layout.tsx using next/script with afterInteractive.
Ask me which provider (Vercel Analytics or Google Analytics with my measurement ID) before adding it. Report.
```

### Prompt 4.3 — Accessibility and responsive pass
```
Audit every page against CLAUDE.md section 6 and SRS NFR-2 and NFR-4:
- Heading order, one h1 per page, alt text, aria labels, focus visible, keyboard-only navigation through header, menu, tabs,
  accordion and form.
- Color contrast for every text/background combination actually used (list them with ratios).
- Layout at 360, 390, 768, 1024, 1280, 1440px: no horizontal scroll, no overlapping text, tap targets ≥ 44px.
Fix issues, then give me a table of what you found and fixed.
```

### Prompt 4.4 — Performance pass
```
Optimise for Lighthouse mobile ≥ 90 (SRS NFR-1):
- Make sure fonts use display: swap and only the weights we use.
- Hero image/visual is the LCP element: prioritise it; lazy-load everything below the fold.
- Images in WebP with explicit width/height; no layout shift.
- Remove unused code and client components that could be server components.
Run pnpm build and report the size of each route's JavaScript.
```

---

## Phase 5 — Launch

### Prompt 5.1 — Pre-launch check
```
Run a full pre-launch check and give me a pass/fail table:
1. pnpm check:content — list every remaining "DEMO:" and "[" placeholder with file and line.
2. Every internal link resolves; every external link has rel="noopener noreferrer".
3. tel:, mailto: and wa.me links use the real numbers from content.
4. Case studies render only when published is true.
5. Metadata, sitemap, robots, favicon and Open Graph image present.
6. lint, typecheck and build pass with zero warnings.
Then wire check:content into the build script so a production build fails while placeholders remain.
Do not deploy. Report.
```

### Prompt 5.2 — Deploy (do this step yourself, Claude Code only guides)
```
Give me step-by-step instructions to deploy this static Next.js site to Vercel with the custom domain zoryx.dev:
project import from GitHub, build settings for static export, environment variables (Formspree endpoint, analytics ID),
DNS records for zoryx.dev, HTTPS check, and how to redeploy after I edit content/site.ts.
```

---

## Updating content later

When you change real details in `docs/SRS.md` section 7:
```
Section 7 of docs/SRS.md has changed. Update content/site.ts to match it exactly, keeping all types valid.
Do not change any component. List every field you changed. Then run lint, typecheck and build.
```

Or edit `content/site.ts` directly for small changes (a phone number, a quote) and run `pnpm build`.
