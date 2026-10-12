# Software Requirements Specification — Zoryx Website

Version 1.0 (demo content) · October 2026 · Owner: Zoryx team

> **How to use this document**
> Section 7 holds every word shown on the website. All of it is **demo data**.
> Replace anything marked `DEMO:` or written as `[PLACEHOLDER]` with real information, then ask Claude Code:
> "Update content/site.ts to match section 7 of docs/SRS.md."
> The site must not go live while any `DEMO:` or `[` placeholder remains.

---

## 1. Introduction

### 1.1 Purpose
Define the requirements, structure and content of the Zoryx public website so it can be built with Claude Code in Next.js and
edited later by the team without a CMS.

### 1.2 Product scope
A static, mobile-first marketing website for Zoryx POS that:
- Explains our three services: Custom POS, Own-brand Online Ordering, Branding & Websites (add-on).
- Builds trust through real work, real people and a real local address.
- Converts visitors into free demo requests through WhatsApp, phone or a short form.

Out of scope (v1): user accounts, self-signup, online payments, CMS, database, blog, client logo wall, multilingual
site (Urdu planned for Phase 2).

### 1.3 Definitions
- **POS**: Point of Sale system used at the counter for billing.
- **Online ordering**: the restaurant's own branded ordering page/link, separate from delivery apps.
- **CTA**: Call to action (e.g. "Book a Free Demo").
- **Demo request**: any WhatsApp click, phone click or submitted contact form.

---

## 2. Overall description

### 2.1 Target users
| User | Description | What they need from the site |
|---|---|---|
| Primary: shop owner | Owner of a new or growing restaurant, café, bakery in central Islamabad/Rawalpindi; brand-aware; uses a phone | Quick proof we're real, what we build, what it costs roughly, how to contact |
| Secondary: manager/partner | Evaluates on the owner's behalf | Feature details, FAQ, case studies |
| Tertiary: future dairy/retail owners | Milk shops, small retail | Proof we serve retail too (Phase 2) |

### 2.2 Operating environment
- Browsers: latest Chrome, Safari, Edge, Firefox; Android Chrome and iOS Safari.
- Devices: phones from 360px wide, tablets, laptops up to 1920px.
- Network: must load acceptably on 4G mobile data.

### 2.3 Constraints
- Next.js App Router with static export; hosted on Vercel; no backend or database.
- All content in one file (`content/site.ts`).
- Brand and design rules in `CLAUDE.md` section 5.

### 2.4 Assumptions
- Real screenshots, client photos and owner permissions will be collected before launch (see section 10).
- The domain is `zoryx.dev`.

---

## 3. Sitemap

| Page | Route | Phase |
|---|---|---|
| Home | `/` | Launch |
| Solutions | `/solutions` | Launch |
| Our Work | `/work` | Launch |
| Case study | `/work/[slug]` | Launch |
| About | `/about` | Launch |
| FAQ | `/faq` | Launch |
| Contact / Book a Demo | `/contact` | Launch |
| Privacy Policy | `/privacy` | Launch |
| Terms of Service | `/terms` | Launch |
| 404 | `not-found` | Launch |
| For Restaurants & Cafés | `/restaurants` | Phase 2 |
| For Retail & Dairy | `/retail` | Phase 2 |
| Guides | `/guides` | Phase 3 |

---

## 4. Functional requirements

### 4.1 Global
| ID | Requirement |
|---|---|
| FR-G1 | Sticky header with logo (links to `/`), nav links (Solutions, Our Work, About, FAQ, Contact) and a "Book a Free Demo" button. |
| FR-G2 | On screens < 1024px, nav collapses into a hamburger menu that opens a full-screen panel; closes on link click and Escape. |
| FR-G3 | Floating WhatsApp button, bottom-right, on every page; opens `wa.me` with the default pre-filled message. Hidden on `/contact` where WhatsApp is already prominent. |
| FR-G4 | Footer with logo, one-line description, page links, contact details, support hours, social links, legal links, copyright. |
| FR-G5 | Every "Book a Free Demo" button links to `/contact` unless stated otherwise. |
| FR-G6 | Phone numbers render as `tel:` links; emails as `mailto:` links. |
| FR-G7 | Each page has its own title, meta description and Open Graph image. |
| FR-G8 | 404 page with a short message and links to Home and Contact. |

### 4.2 Home
| ID | Requirement |
|---|---|
| FR-H1 | Hero (green): headline, subline, primary + secondary CTA, trust line, product visual (laptop + phone mockups), floating "new order" card. |
| FR-H2 | Arc divider transitions hero into the cream section below. |
| FR-H3 | "See it working" section with a 60-second demo video (poster image, plays on click, muted autoplay off, captions file supported). If no video yet, show a placeholder. |
| FR-H4 | Problem band (tomato): headline + three pain cards with doodle icons. |
| FR-H5 | Solutions section (green) with tabs: POS, Online Ordering, Inventory & Reports, Branding. Each tab: screenshot, short description, 4 bullet features, "See details" link to `/solutions#<id>`. Tabs keyboard-accessible. |
| FR-H6 | "Who it's for": two cards (Restaurants, Cafés & Bakeries; Milk Shops & Retail — the second labelled "Coming soon" until enabled in content). |
| FR-H7 | "Our work" preview: up to 2 case study cards linking to `/work/[slug]`. |
| FR-H8 | "How it works": 4 numbered steps. |
| FR-H9 | "Why Zoryx vs off-the-shelf POS" comparison table (2 columns). Rows defined in content; FBR row shown only when `features.fbrIntegration` is true. |
| FR-H10 | Testimonial: quote, name, role, business, photo; optional video. Hidden entirely if `testimonials` is empty. |
| FR-H11 | Proof stickers: up to 3 tilted stickers showing values from `content.proof`. Hidden if empty. |
| FR-H12 | Final CTA band (green) with headline, primary and WhatsApp CTA. |

### 4.3 Solutions
| ID | Requirement |
|---|---|
| FR-S1 | Intro + anchor nav to each solution (`#pos`, `#online-ordering`, `#inventory-reports`, `#branding`). |
| FR-S2 | For each solution: title, summary, feature list (6–8 items), 2–3 screenshots, "How it fits your shop" paragraph, CTA. |
| FR-S3 | Hardware note: what hardware we support/recommend. |

### 4.4 Our Work
| ID | Requirement |
|---|---|
| FR-W1 | Grid of case study cards (image, business name, type, one-line result). |
| FR-W2 | Case study page: hero image, business facts (type, area, live since), problem, what we built, screenshots gallery, result in owner's words, quote, CTA. |
| FR-W3 | A case study only renders if `published: true` in content (requires owner permission). |

### 4.5 About
| ID | Requirement |
|---|---|
| FR-A1 | Story section, values (3), team grid (photo, name, role, one line), office location with embedded map and directions note. |

### 4.6 FAQ
| ID | Requirement |
|---|---|
| FR-F1 | Accordion of questions grouped by topic; only one open at a time is NOT required; deep-linkable by `#question-id`. |
| FR-F2 | FAQPage JSON-LD structured data generated from content. |

### 4.7 Contact
| ID | Requirement |
|---|---|
| FR-C1 | Large WhatsApp CTA with pre-filled message including shop name/area placeholders. |
| FR-C2 | Phone, email, address, support hours, expected reply time. |
| FR-C3 | Optional form (name, shop name, area, phone, business type, message). If `FORMSPREE_ENDPOINT` env var is set, submits there and shows a success state; otherwise the form builds a WhatsApp message from the fields and opens `wa.me`. |
| FR-C4 | Client-side validation: required name, shop name, phone (Pakistani format `03XXXXXXXXX` or `+923XXXXXXXXX`). Accessible error messages. |
| FR-C5 | Embedded Google Map of the office. |

### 4.8 Analytics events
| Event | Trigger |
|---|---|
| `cta_demo_click` | Any "Book a Free Demo" button (with `location` param) |
| `whatsapp_click` | Any WhatsApp link (with `location` param) |
| `phone_click` | Any `tel:` link |
| `form_submit` | Contact form submitted successfully |
| `video_play` | Demo video started |

---

## 5. Non-functional requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-1 | Performance | Lighthouse mobile ≥ 90 (Performance, Accessibility, Best Practices, SEO). LCP < 2.5s on 4G. Total homepage weight < 1.5 MB excluding video. |
| NFR-2 | Accessibility | WCAG 2.1 AA: contrast, focus visible, keyboard navigation, alt text, reduced motion respected. |
| NFR-3 | SEO | Semantic headings, metadata per page, `sitemap.xml`, `robots.txt`, canonical URLs, LocalBusiness JSON-LD on Home and Contact. |
| NFR-4 | Responsiveness | Correct at 360, 390, 768, 1024, 1280, 1440px. No horizontal scroll. |
| NFR-5 | Security | HTTPS only; no secrets in client code; external links `rel="noopener noreferrer"`; no third-party scripts beyond analytics, fonts and Formspree. |
| NFR-6 | Maintainability | All copy in `content/site.ts`, typed; components reusable; no CMS. |
| NFR-7 | Trust | No invented numbers, logos or testimonials; build-time check blocks `DEMO:` and `[` placeholders in production. |
| NFR-8 | Privacy | Privacy Policy explains analytics and form data use. |

---

## 6. Design requirements

Follow `CLAUDE.md` section 5 exactly (colors, type, spacing, components). Section-by-section backgrounds for Home:

| Section | Background |
|---|---|
| Header + Hero | Green |
| See it working | Cream (after arc divider) |
| Problem band | Tomato |
| Solutions tabs | Green |
| Who it's for | Cream |
| Our work | Cream (white cards) |
| How it works | Green |
| Why Zoryx | Cream |
| Testimonial + proof stickers | Green |
| FAQ preview (optional) | Cream |
| Final CTA | Green |
| Footer | Green-deep |

> Note: "How it works" (green) sits between two cream sections, and Testimonial (green) is followed by cream, so no two green sections touch.

---

## 7. Website content (DEMO DATA — replace before launch)

### 7.1 Company and contact
| Field | Value |
|---|---|
| Brand name | Zoryx POS |
| Short name | Zoryx |
| Domain | zoryx.dev |
| Tagline | Custom POS and online ordering, built around your shop. |
| One-line description (footer) | A local team in Islamabad and Rawalpindi building custom POS and online ordering systems for food businesses. |
| Phone | DEMO: +92 300 0000000 |
| WhatsApp number (international, no +) | DEMO: 923000000000 |
| Email | DEMO: hello@zoryx.dev |
| Office address | DEMO: [Office no.], [Building], [Area], Islamabad |
| Google Maps link | [GOOGLE MAPS LINK] |
| Support hours | DEMO: Monday to Saturday, 10:00 am to 8:00 pm |
| Reply time | DEMO: We reply within 2 hours during support hours |
| Instagram | [INSTAGRAM URL] |
| Facebook | [FACEBOOK URL] |
| LinkedIn | [LINKEDIN URL] |
| Default WhatsApp message | Hi Zoryx, I'd like a free demo for my shop. Shop name: [ ] Area: [ ] |
| Feature flag: FBR/PRA integration | false |
| Feature flag: Retail/dairy live | false |

### 7.2 Navigation
- Links: Solutions, Our Work, About, FAQ, Contact
- Header button: Book a Free Demo

### 7.3 Home

**Hero**
- Eyebrow: Custom POS · Online Ordering · Islamabad & Rawalpindi
- Headline: Built for Food Businesses
- Subline: Custom POS and your own online ordering, branded as yours and set up by a local team you can actually call.
- Primary CTA: Book a Free Demo
- Secondary CTA: Chat on WhatsApp
- Trust line: Free shop visit · Setup in days, not months · Local support
- Floating card: New online order · Table 4 · Rs 2,450
- Visual alt text: Zoryx POS billing screen on a laptop and the online ordering page on a phone

**See it working**
- Heading: See It Working
- Text: A one-minute look at a real system running at a café in Rawalpindi: taking an order, printing the bill, and receiving an online order.
- Video caption: DEMO: Running live at Murshad Cafe
- Placeholder (if no video): [60-SECOND DEMO VIDEO]

**Problem band**
- Heading: Still Running on Guesswork?
- Card 1 — title: Billing mistakes add up. Text: Hand-written bills and calculators lead to wrong totals, missed items and cash that doesn't match at night.
- Card 2 — title: You can't see what's selling. Text: Without clear reports you don't know your best items, slow hours, or what stock is running out.
- Card 3 — title: Commission on your own customers. Text: Regulars who would happily order from you directly are paying through delivery apps that take a cut of every order.

**Solutions tabs**
- Heading: Everything Your Counter Needs
- Tab "POS"
  - Title: Custom POS
  - Text: Fast billing set up around your menu, your deals and the way your staff already work.
  - Bullets: Quick billing and printed receipts · Menu, deals and add-ons · Dine-in, takeaway and delivery orders · Staff roles and permissions
- Tab "Online Ordering"
  - Title: Your Own Online Ordering
  - Text: A branded ordering link and QR code for your customers, with orders arriving straight into your POS.
  - Bullets: Your logo and colors · Order by link, QR or WhatsApp · Delivery zones and pickup · Instant order alerts
- Tab "Inventory & Reports"
  - Title: Inventory and Reports
  - Text: Know what sold, what's left and how today compares to last week.
  - Bullets: Stock tracking and low-stock alerts · Day-end and sales reports · Best-selling items · Cash and card summary
- Tab "Branding"
  - Title: Branding and Websites
  - Text: Need a fresh look too? We design logos, menus and simple websites that match your system.
  - Bullets: Logo and brand colors · Menu and price-list design · Social media templates · Simple business website

**Who it's for**
- Heading: Made for Shops Like Yours
- Card 1: Restaurants, Cafés and Bakeries — Dine-in, takeaway and delivery, tables, kitchen tickets and deals.
- Card 2: Milk Shops and Retail — Sales by weight and litre, regular-customer accounts and daily delivery. Label: Coming soon

**Our work preview**
- Heading: Running in Real Shops
- Text: Every system we show here is live and used every day.
- Link: See all work

**How it works**
- Heading: How It Works
- Step 1: Free visit — We visit your shop, watch how you work and note what you need.
- Step 2: We set it up — We configure your menu, deals and branding, and connect your printer.
- Step 3: Train and go live — We train your staff on-site and stay with you on launch day.
- Step 4: Ongoing support — Updates, fixes and help on WhatsApp or in person when you need it.

**Why Zoryx**
- Heading: Why Zoryx, Not Off-the-Shelf
- Column headers: Zoryx | Typical off-the-shelf POS
- Row: Built around your workflow | Yes | You adjust to the software
- Row: Your logo and colors on the system and ordering page | Yes | Their branding
- Row: In-person setup and training | Yes | Usually remote or self-setup
- Row: Local support team in Islamabad and Rawalpindi | Yes | Varies
- Row: Own online ordering without app commission | Yes | Often extra or not included
- Row (only if FBR flag true): FBR/PRA invoice integration | Yes | Varies

**Testimonial** (DEMO — replace with a real owner quote and permission)
- Quote: DEMO: "Billing is faster, the end-of-day report finally matches our cash, and customers order directly from our own link."
- Name: DEMO: [Owner name]
- Role: DEMO: Owner
- Business: DEMO: Murshad Cafe, Rawalpindi
- Photo: [OWNER PHOTO]

**Proof stickers** (only real facts)
- DEMO: 2 shops live
- DEMO: Setup in 7 days
- DEMO: Local support

**Final CTA**
- Heading: Ready to See It in Your Shop?
- Text: Book a free visit. We'll show you the system on your own menu.
- Primary CTA: Book a Free Demo
- Secondary CTA: Chat on WhatsApp

### 7.4 Solutions page
- Page title: Solutions
- Intro heading: One System, Built Around Your Shop
- Intro text: Choose what you need today and add more as you grow. Everything is set up and supported by our team.

**Custom POS** (`#pos`)
- Summary: Billing that's quick for your staff and accurate for you.
- Features: Fast billing with printed receipts · Menu categories, deals and add-ons · Dine-in tables, takeaway and delivery orders · Kitchen order tickets · Discounts and service charges · Staff logins with roles · Cash and card payment records · Works on laptop or tablet
- How it fits your shop: We set up your exact menu, deals and receipt layout during the free visit, so your staff start with a system that already looks like your shop.

**Online Ordering** (`#online-ordering`)
- Summary: Your own ordering page, with your name on it.
- Features: Branded ordering link and QR code · WhatsApp ordering · Delivery zones and delivery charges · Pickup orders · Orders arrive in your POS · Order status updates · Works on any phone
- How it fits your shop: Share the link on Instagram, WhatsApp and table QR codes, and let regular customers order from you directly.

**Inventory and Reports** (`#inventory-reports`)
- Summary: See your business clearly at the end of every day.
- Features: Stock levels per item · Low-stock alerts · Day-end closing report · Sales by item, category and hour · Best and slowest sellers · Cash vs card summary
- How it fits your shop: We set up the reports you actually check, nothing extra.

**Branding and Websites** (`#branding`)
- Summary: A look that matches the quality of your food.
- Features: Logo and brand colors · Menu and price-list design · Social media post templates · Simple business website
- How it fits your shop: Optional. Add it when you're opening a new shop or refreshing an old one.

**Hardware**
- Heading: Hardware
- Text: Zoryx runs on a laptop or tablet you may already have. We can recommend and set up a receipt printer, cash drawer and barcode scanner. DEMO: [Supported printer models]

### 7.5 Our Work
- Page heading: Our Work
- Intro: Real systems, running in real shops.

**Case study 1** (slug: `murshad-cafe`, published: DEMO: true — set to false until permission is confirmed)
- Business: DEMO: Murshad Cafe
- Type: Café and restaurant
- Area: DEMO: Rawalpindi
- Live since: DEMO: [Month Year]
- Card result line: DEMO: POS and own online ordering, live and used daily.
- The problem: DEMO: Bills were written by hand, totals didn't always match at closing, and there was no simple way to take online orders directly.
- What we built: Custom POS with the café's menu and deals, kitchen tickets, day-end reports, and a branded online ordering page connected to the POS.
- Result: DEMO: [Owner's own words about the result]
- Quote: DEMO: [Owner quote]
- Images: [CAFE PHOTO], [POS SCREENSHOT], [ORDERING PAGE SCREENSHOT]

**Case study 2** (slug: `milk-shop`, published: false)
- Business: DEMO: [Milk shop name]
- Type: Milk and dairy shop
- Area: DEMO: [Area]
- Card result line: DEMO: POS with sales by litre and customer accounts.
- The problem: DEMO: [Problem]
- What we built: DEMO: [Solution]
- Result: DEMO: [Result]

### 7.6 About
- Page heading: About Zoryx
- Story heading: Built Here, for Shops Here
- Story text: DEMO: Zoryx started when we built a POS and online ordering system for a café in Rawalpindi and saw how much time and money a system built around the shop could save. We're a small team of engineers and designers in Islamabad and Rawalpindi, and we set up and support every system ourselves.
- Values:
  - Built around you — We shape the system to your shop, not the other way round.
  - Honest and clear — Clear pricing, clear timelines, no surprise charges.
  - Always reachable — A real person on WhatsApp or at your door when you need help.
- Team (DEMO):
  - [Name] — Founder and Lead — [One line]
  - [Name] — Developer — [One line]
  - [Name] — Design and Branding — [One line]
  - [Name] — Support and Onboarding — [One line]
- Visit us: DEMO: [Office address]. Please message us on WhatsApp before visiting.

### 7.7 FAQ

**Setup**
- How long does setup take? — DEMO: Most shops go live within 7 to 10 days after the free visit, depending on menu size and hardware.
- What hardware do I need? — A laptop or tablet, a receipt printer and optionally a cash drawer. We can use what you have or recommend affordable options.
- Do you train my staff? — Yes. We train your staff in your shop and stay with you on launch day.

**Using it**
- Does it work if the internet goes down? — DEMO: [Answer depends on build: describe offline billing behaviour]
- Can my staff use it in Urdu? — DEMO: [Answer: Urdu interface available / planned]
- Can it handle deals, add-ons and table orders? — Yes. We set up your deals, add-ons and table layout during setup.

**Pricing and support**
- How much does it cost? — Pricing is a one-time setup fee plus a simple monthly plan. It depends on what you need, so we give you a clear quote after the free visit.
- What does the monthly fee cover? — DEMO: Hosting, updates, backups and support on WhatsApp during support hours. New features are quoted separately.
- Can you change things later? — Yes. Menu and price changes are part of support; bigger changes are quoted before we start.

**Data and online orders**
- Who owns my data? — You do. Your sales and customer data belong to your business, and we can export it for you.
- Is my data backed up? — DEMO: Yes, data is backed up automatically every day.
- Do I have to stop using delivery apps? — No. Keep them if they help. Your own ordering link is for customers who would rather order from you directly.

### 7.8 Contact
- Page heading: Book a Free Demo
- Intro: Tell us about your shop. We'll visit, understand how you work and show you the system on your own menu. No cost, no pressure.
- WhatsApp button: Chat on WhatsApp
- Form labels: Your name · Shop name · Area · Phone number · Business type (Restaurant / Café / Bakery / Milk shop / Other) · What do you need? (optional)
- Form button: Request My Free Demo
- Success message: Thanks! We'll contact you within 2 hours during support hours.
- Error message: Something went wrong. Please message us on WhatsApp instead.

### 7.9 Footer
- Description: (from 7.1)
- Columns: Company (About, Our Work, FAQ) · Solutions (Custom POS, Online Ordering, Inventory & Reports, Branding) · Contact (phone, WhatsApp, email, address, hours)
- Legal: Privacy Policy · Terms of Service
- Copyright: © 2026 Zoryx. All rights reserved.

### 7.10 Legal pages
- Privacy Policy: [PRIVACY POLICY TEXT — must cover analytics, contact form data, WhatsApp, data retention, contact email]
- Terms of Service: [TERMS TEXT]

### 7.11 404
- Heading: This Page Took Its Order Elsewhere
- Text: The page you're looking for doesn't exist.
- Buttons: Go Home · Contact Us

---

## 8. SEO metadata

| Page | Title | Description |
|---|---|---|
| Home | Zoryx POS — Custom POS and Online Ordering in Islamabad and Rawalpindi | Custom POS and own-brand online ordering for restaurants, cafés and bakeries, set up and supported by a local team. |
| Solutions | Solutions — POS, Online Ordering, Inventory and Branding | Custom POS, online ordering, inventory reports and branding for food businesses in Islamabad and Rawalpindi. |
| Our Work | Our Work — Zoryx POS in Real Shops | See POS and online ordering systems we've built for local food businesses. |
| About | About Zoryx — Local POS Team | A small Islamabad and Rawalpindi team building custom POS and online ordering systems. |
| FAQ | FAQ — Setup, Pricing and Support | Answers about setup time, hardware, pricing, support and your data. |
| Contact | Book a Free Demo — Zoryx POS | Book a free shop visit and see Zoryx POS on your own menu. |

Target keywords: POS software Islamabad, restaurant POS Rawalpindi, café billing system Islamabad, online ordering for restaurants Pakistan.

---

## 9. Acceptance criteria (launch)

- [ ] All Launch pages built and linked; no broken links.
- [ ] No `DEMO:` or `[` placeholders anywhere in production content.
- [ ] Case studies published only with written owner permission.
- [ ] WhatsApp, phone and email links tested on a real phone.
- [ ] Contact form tested (Formspree or WhatsApp fallback).
- [ ] Lighthouse mobile ≥ 90 in all four categories on Home and Contact.
- [ ] Checked at 360, 768, 1280px in Chrome and Safari.
- [ ] Favicon, Open Graph image and WhatsApp link preview look correct.
- [ ] Google Business Profile and website show the same name, phone and address.
- [ ] Domain `zoryx.dev` live on HTTPS.

---

## 10. Assets to collect before launch

- [ ] Final logo files (SVG: primary, reversed, black, icon) from the brand kit
- [ ] POS screenshots with clean demo data (billing, menu, reports, inventory)
- [ ] Online ordering screenshots on a phone
- [ ] 60-second demo video (MP4, under 15 MB) + poster image
- [ ] Client shop photos and written permission
- [ ] Owner quote(s) and photo(s)
- [ ] Team photos, names and roles
- [ ] Office address, phone, WhatsApp, email, hours
- [ ] Answers for the DEMO FAQ items
- [ ] Privacy Policy and Terms text
