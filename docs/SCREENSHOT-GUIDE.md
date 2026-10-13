# Screenshot and photo guide

How to add real screenshots and photos to the Zoryx website: where each one goes, what it is for, the exact size and
shape to export, how it is styled, and which line of `content/site.ts` to edit.

You never need to touch a component. Drop a WebP file into `public/images/`, put its path in `content/site.ts`, and
the page picks it up. The placeholder box disappears by itself.

For a production deployment, run `pnpm build` after updating content and assets so the same checks used by Vercel
run locally first.

---

## 1. How it works (read this once)

1. **Put the file in `public/images/<section>/`**, for example `public/images/hero/pos-billing.webp`.
2. **Reference it in `content/site.ts`** with a path that starts with `/images/` (no `public`):
   `"/images/hero/pos-billing.webp"`.
3. **The frame does the styling.** Every image sits in an `ImageFrame` (rounded corners, border, device bezel). The
   frame fills its box and **crops** the picture to fit (`object-cover`). So **export every image at the exact
   aspect ratio of its slot**, or the edges get cut off.
4. **Format: WebP only, 200 KB or less per file.** `pnpm check:images` checks this and fails on PNG/JPG or oversized files.
5. **Placeholder text must go.** `pnpm check:content` fails while any text contains `[` or `DEMO:`. When a slot has both
   an image path and a placeholder (`{ src, placeholder }`), set the placeholder to plain words with no brackets, for
   example `"POS billing screen"`. It is never shown once `src` exists.

I tested this with real files in every slot (hero, tabs, solutions page, case study, testimonial, About, team): all
rendered correctly with no cropping when the aspect ratio matched.

---

## 2. Every slot at a glance

"Shows at" is the width in CSS pixels on a 1280px desktop, measured from the running site. Export at roughly 2x that
for sharp screens on phones and laptops, then keep the file under 200 KB.

| # | Where on the site | Field in `content/site.ts` | Shape | Export size | Shows at |
|---|---|---|---|---|---|
| 1 | Home hero, laptop screen | `hero.laptopScreenshot.src` | 16:10 | 1000 x 625 | 370 px |
| 2 | Home hero, phone screen | `hero.phoneScreenshot.src` | 9:19 | 400 x 844 | 115 px |
| 3 | Home "Everything Your Counter Needs" tabs (4) | `solutionTabs.tabs[i].screenshot` | 4:3 | 1200 x 900 | 526 px |
| 4 | Solutions page, big image per solution (4) | `solutionsPage.solutions[i].screenshots[0].src` | 16:10 | 1200 x 750 | 518 px |
| 5 | Solutions page, 1-2 small images per solution | `solutionsPage.solutions[i].screenshots[1..2].src` | 16:10 | 800 x 500 | 251 px |
| 6 | Case study page hero **and** the card on Home/Our Work | `workPage.caseStudies[i].images[0]` | 16:9 (card crops to 16:10) | 1920 x 1080 | 1102 px (page), 284-472 px (card) |
| 7 | Case study gallery (up to 3) | `workPage.caseStudies[i].images[1..3]` | 4:3 | 1200 x 900 | 540 px |
| 8 | Testimonial portrait | `testimonials[0].photo` | 4:5 | 800 x 1000 | 318 px |
| 9 | About, story photo | `aboutPage.storyImage.src` | 4:3 | 1200 x 900 | 518 px |
| 10 | About, team photos (4) | `aboutPage.team[i].photo` | 1:1 | 600 x 600 | 256 px |
| 11 | Home "See It Working" video poster | `seeItWorking.video.poster` (needs `video.src` too) | 16:9 | 1600 x 900 | up to 896 px |

That is 27 images in total: 2 hero + 4 tabs + 11 solutions page (3 + 3 + 3 + 2) + 3 case study + 1 testimonial +
1 story + 4 team + 1 poster. (Only the first image per tab is visible at a time and below-the-fold images load lazily.)

**Capture once, export many.** You do not need 27 different screens. Capture about 10 base screens, then export each
one in the shape each slot needs:

| Base screen | Used in slots |
|---|---|
| POS billing screen (an order in progress) | 1, 3 (POS tab), 4 (POS big), 6/7 |
| POS menu, deals and add-ons | 5 (POS small) |
| Kitchen order ticket | 5 (POS small) |
| Online ordering page on a phone (menu) | 2, 3 (Online Ordering tab), 4 (Ordering big), 7 |
| Ordering cart / checkout on a phone | 5 (Ordering small) |
| Table QR code card | 5 (Ordering small) |
| Day-end closing report | 3 (Reports tab), 4 (Reports big) |
| Sales by item / hour | 5 (Reports small) |
| Stock levels screen | 5 (Reports small) |
| Branding samples: logo, menu design | 3 (Branding tab), 4 (Branding big), 5 (Branding small) |

---

## 3. Slot by slot: purpose, position, styling

### 1 and 2. Hero: laptop and phone (home page, top, right side)
- **Purpose:** the first thing a visitor sees. Proves this is a real working product, with the POS on a counter and
  the customer ordering page on a phone. CLAUDE.md: "POS screenshot on a laptop/tablet + ordering page on a phone."
- **Styling already done for you:** a dark device frame (laptop bezel and base; phone bezel with a shadow). Do **not**
  add a laptop or phone mockup, browser address bar, or rounded corners to the picture itself.
- **They are small:** the laptop screen is only 370 px wide on desktop (292 px on a phone) and the phone screen is
  115 px wide (91 px). Treat them as posters, not documentation: **one clear idea, big text, big buttons, 2-4
  elements.** A cluttered full POS screen will be unreadable.
- **Tip:** an order total that matches the floating card on the hero ("New online order . Table 4 . Rs 2,450") ties the
  two together. Use the same demo order in both screens if you can.
- The laptop image is the most important picture on the site; both hero images load first (priority) so they do not
  slow the page down.

### 3. Home tabs: POS, Online Ordering, Inventory & Reports, Branding (home page, dark green section)
- **Purpose:** show each service in one picture next to its four bullet points. The visitor clicks a tab and sees that
  service in action.
- **Position:** left half of each tab panel, beside the title, text, bullets and "See details" link.
- **Styling:** a thin cream border (it sits on green), rounded corners, white background behind the image.
- **Content to capture:** a clean, zoomed-in view of the feature. The Branding tab can show a menu design or logo
  sheet instead of software.
- Hidden tabs do not download until opened.

### 4 and 5. Solutions page: big image + small images (4 alternating blocks)
- **Purpose:** FR-S2 asks for 2-3 screenshots per solution. This is where a manager checks details.
- **Position:** one big image on top (16:10), then 1-2 smaller images side by side underneath (also 16:10). The block
  alternates sides: image left on cream, image right on white. On phones the images come first, then the text.
- **Styling:** rounded, thin border, no tilt. Branding has two images, the other three solutions have three.
- Show **different** screens: big = the main feature, small = supporting details (for example POS big = billing,
  small = menu and deals, kitchen tickets).

### 6 and 7. Case study: hero, card thumbnail and gallery
- **Purpose:** proof you are real: a real shop with a real system. This is the strongest trust signal on the site.
- **Slot 6 (`images[0]`) is used twice:** as the large hero on the case study page (16:9) and as the thumbnail on the
  Home and Our Work cards (16:10). The card crops about 5% off the left and right. **Keep the important part of the
  picture in the middle 90% horizontally.**
- **Suggestion:** a real photo of the system running at the shop (counter + tablet or laptop showing the POS) is ideal.
  CLAUDE.md rule: *food photos only next to product UI, never alone.* So avoid a plain food or interior photo here;
  use one that shows the screen.
- **Slots 7 (`images[1..3]`):** the gallery, up to 3. Typically the POS screenshot and the ordering page. The second
  one is tilted 2 degrees by the layout. Do not tilt it yourself.
- **Permission:** a case study only shows when `published: true`. Set that only with the owner's written permission
  (SRS section 9). Blur or remove any real customer names, phone numbers and addresses.

### 8. Testimonial portrait (home page, green section)
- **Purpose:** puts a real face to the quote. Credibility.
- **Position and styling:** left of the quote, in a cream-bordered rounded frame (4:5), with three tilted stickers
  overlapping the **top-left, top-right and bottom-right corners**. **Keep the face in the centre; leave the corners
  uncluttered** so the stickers do not cover anything important.
- **Photo:** a real owner in their shop, natural light, head and shoulders. No stock models. You need their permission.

### 9. About: story photo
- **Purpose:** show the real team. Position: right of "Built Here, for Shops Here". 4:3.
- **Best:** the whole team together, or the team at work in a client's shop.

### 10. About: team photos (4 in a row, 2 per row on phones)
- **Purpose:** the "real local team you can call" promise. Square 1:1, shown at 256 px.
- **Consistency matters:** same background, lighting, crop and distance for all four, face centred. Mismatched photos
  look unprofessional faster than anything else on a team page.

### 11. Demo video poster (home page, "See It Working")
- **Purpose:** the still image shown before the visitor presses play; it carries a large lime play button in the
  centre, so keep the middle of the picture calm. 16:9.
- **Setup:** this also needs the video itself. In `seeItWorking`, add
  `video: { src: "/videos/demo.mp4", poster: "/images/home/demo-poster.webp" }` (MP4 under 15 MB in `public/videos/`).
  An optional captions file goes in `video.captions`.

---

## 4. Styling rules for every screenshot

**Do**
- **Light mode, one consistent theme** across all POS screens, so they look like one product.
- **Crisp and zoomed in.** Text in the exported file should be **at least 22-30 px tall** (so it is about 11 px on the
  site). Practical way: size the browser window to the export size and zoom the browser to 150-200%.
- **Realistic demo data**, for example Pakistani menu items and prices (Chicken Tikka Roll, Rs 450), table numbers, a
  believable order total. Keep the same shop name, menu and prices across all screens.
- **Crop to the interesting part**, then export at the exact aspect ratio in the table above.
- **Keep the subject clear of edges** that get cropped (slot 6) or covered (slot 8 stickers, slot 11 play button).
- A **real client's screen only with written permission.** Otherwise use a clearly labelled demo shop. Do not invent a
  fake client name that could be mistaken for a real customer (CLAUDE.md: never invent client names).

**Don't**
- No device mockups, browser chrome, drop shadows, borders or rounded corners baked into the file. The site adds them.
- No stock photos. No real customer data (names, phone numbers, addresses, card numbers) anywhere in a screenshot.
- No tiny full-screen captures of a busy POS; they become unreadable at 370 px or 115 px wide.
- No text promising things that are not true (FBR/PRA integration, prices, awards). CLAUDE.md section 4 applies to
  screenshots too.
- Do not use PNG or JPG files; only WebP passes `pnpm check:images`.

---

## 5. Capture and export workflow

### Capture
- **Web POS or ordering page:** open it in Chrome, press F12, switch on the device toolbar (Ctrl+Shift+M).
  - Laptop shots: set the viewport to about 1440 x 900.
  - Phone shots: set the viewport to 390 x 844 (an iPhone size) with device pixel ratio 2 or 3.
  - Capture with the three-dot menu in the device toolbar, "Capture screenshot" (or "Capture node screenshot" for one
    panel). This gives a sharp file with no desktop clutter.
- **A real phone:** take a normal screenshot and AirDrop/WhatsApp it to yourself as a file (not as a compressed photo).
- **Real people and shop photos:** use the best camera you have in good natural light; shoot landscape for 4:3 and
  16:9 slots, portrait for the testimonial (4:5).

### Export to WebP at the exact shape
Pick whichever tool you like:

1. **No install:** open https://squoosh.app, drop the file, set **Resize** to the exact export size (for example
   1000 x 625; turn off "maintain aspect ratio" only if the source is already the right shape, otherwise crop first),
   choose **WebP**, quality about 80, download.
2. **ImageMagick** (`magick`), resize and centre-crop to the exact shape in one command:
   ```
   magick input.png -resize 1000x625^ -gravity center -extent 1000x625 -quality 80 public/images/hero/pos-billing.webp
   ```
3. **cwebp** (after cropping): `cwebp -q 80 -resize 1000 625 cropped.png -o public/images/hero/pos-billing.webp`

If a file is over 200 KB, lower the quality to 70-75 or reduce the size slightly, then run `pnpm check:images`.

**Naming:** lowercase, hyphens, no spaces, `.webp`. Suggested folders:
`public/images/hero/`, `home/`, `solutions/`, `work/<case-study>/`, `about/`, `about/team/`.

---

## 6. Wire the images in (copy-paste examples)

Edit `content/site.ts`. Replace the placeholder with a path; change the bracketed placeholder text to plain words.

```ts
// 1 and 2. Hero
laptopScreenshot: { src: "/images/hero/pos-billing.webp", alt: "POS billing screen with Table 4 bill", placeholder: "POS billing screen" },
phoneScreenshot:  { src: "/images/hero/ordering-menu.webp", alt: "Online ordering page on a phone", placeholder: "Online ordering page" },

// 3. Home tabs: add `screenshot` above `screenshotPlaceholder` in each tab
screenshot: "/images/tabs/tab-billing.webp",
screenshotAlt: "POS billing screen with a Table 4 bill",
screenshotPlaceholder: "POS billing screen",

// 4 and 5. Solutions page: one entry per image, big one first
screenshots: [
  { src: "/images/solutions/billing-main.webp", alt: "POS billing screen with a Table 4 bill", placeholder: "POS billing screen" },
  { src: "/images/solutions/orders-kitchen.webp", alt: "Kitchen screen with three open order tickets", placeholder: "Kitchen tickets" },
  { src: "/images/solutions/orders-menu.webp", alt: "Menu screen with item prices", placeholder: "Menu screen" },
],

// 6 and 7. Case study: first = hero + card, the rest = gallery. Plain paths, no placeholder object.
images: [
  "/images/work/murshad-cafe/hero.webp",
  "/images/work/murshad-cafe/pos.webp",
  "/images/work/murshad-cafe/ordering.webp",
],

// 8. Testimonial
photo: "/images/home/owner-portrait.webp",

// 9. About story
storyImage: { src: "/images/about/team.webp", placeholder: "The Zoryx team" },

// 10. Team member: add a `photo` line to each member
{ photo: "/images/about/team/ali.webp", name: "Ali Khan", role: "Founder and Lead", line: "..." },

// 11. Demo video (also needs the MP4 in public/videos/)
// Poster only (no video file yet): shows as a still picture. Add src and the play button appears.
video: { poster: "/images/video/demo-poster.webp", posterAlt: "POS billing screen with a Table 4 bill" },
// Once the MP4 exists in public/videos/, add:   src: "/videos/demo.mp4",
```

For the case study, testimonial and team fields, the value is just a string. A string that starts with `[` is shown as a
placeholder box; any other string is treated as an image path.

---

## 7. Check your work

1. `pnpm dev`, then open http://localhost:3000 and look at each page at phone width (360 px), tablet (768 px) and
   desktop (1280 px). Check that nothing important is cropped and text is readable.
2. `pnpm check:images` should say "All images in public/images are WebP and under 200 KB."
3. `pnpm check:content` lists what is left. Each image you wire in removes one or more `[ ... ]` placeholders from the list.
4. Before launch, run `pnpm prelaunch` (lint, types, images, build, site checks). The production build refuses to run
   while any `[` or `DEMO:` placeholder remains.

**Page weight:** the home page should stay under about 1.5 MB of images in total (SRS NFR-1) and the Lighthouse mobile
score at 90 or above. With the sizes in this guide the home page's visible images come to roughly 0.4-0.6 MB.

---

## 8. Known limits and optional follow-ups

- **Alt text.** Hero, tab and Solutions page images take an optional `alt` (`screenshotAlt` on a tab, `posterAlt` on the
  video poster). Write one short, plain sentence saying what the picture shows. Where `alt` is empty, the site falls back
  to the section title ("Custom POS"). Case study images (business name), the testimonial (the person's name) and team
  photos ("name, role") do not have separate alt fields yet; ask and I will add them. The hero's two images and the hero's
  overall description are announced together as a group.
- **One image per case study card.** The card and the case study hero share `images[0]`. If you want a different
  thumbnail, ask for a separate `cardImage` field.
- **Milk shop case study** (unpublished) has no images yet; it only matters once you set `published: true`.
