/**
 * ALL website copy lives here (CLAUDE.md section 4). Source: docs/SRS.md sections 7 and 8.
 * Demo content is marked "DEMO:" or [PLACEHOLDER]. Do not remove the markers; the owner replaces them.
 * `pnpm check:content` lists every marker still present.
 */

/* ---------- Types ---------- */

export interface SocialLinks {
  instagram: string;
  facebook: string;
  linkedin: string;
}

export interface SiteConfig {
  brandName: string;
  shortName: string;
  domain: string;
  tagline: string;
  footerDescription: string;
  phone: string;
  /** International format, no "+". */
  whatsappNumber: string;
  email: string;
  address: string;
  mapsUrl: string;
  /** Google Maps embed URL (the src of the iframe). */
  mapEmbedUrl: string;
  supportHours: string;
  replyTime: string;
  social: SocialLinks;
  defaultWhatsAppMessage: string;
  /** Opening line of the message built by buildDemoMessage (lib/whatsapp.ts). */
  demoMessageIntro: string;
}

export interface Features {
  fbrIntegration: boolean;
  retailLive: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface Hero {
  /** Laptop screen in the hero (16:10). */
  laptopScreenshot: ScreenshotSpec;
  /** Phone screen in the hero (9:19). */
  phoneScreenshot: ScreenshotSpec;
  eyebrow: string;
  headline: string;
  subline: string;
  primaryCta: string;
  secondaryCta: string;
  trustLine: string;
  floatingCard: string;
  visualAlt: string;
}

export interface DemoVideoSource {
  /** MP4 path under /videos, e.g. "/videos/demo.mp4". Leave undefined until the video exists. */
  src?: string;
  /** Poster image path under /images. Shown as a still picture until src is set, then behind the play button. */
  poster?: string;
  /** Alt text for the poster image. */
  posterAlt?: string;
  /** Captions (WebVTT) for the video. */
  captions?: { src: string; lang: string; label: string };
}

export interface SeeItWorking {
  /** Leave undefined until the 60-second demo video exists. */
  video?: DemoVideoSource;
  heading: string;
  text: string;
  videoCaption: string;
  placeholder: string;
}

export type DoodleName = "receipt" | "pos" | "scooter" | "chefhat" | "qr" | "chart";

export interface ProblemCard {
  icon: DoodleName;
  title: string;
  text: string;
}

export interface ProblemBand {
  heading: string;
  cards: ProblemCard[];
}

export interface SolutionTab {
  id: string;
  label: string;
  /** Screenshot path under /images. Placeholder is shown while undefined. */
  screenshot?: string;
  /** Alt text for the screenshot. Falls back to the tab title. */
  screenshotAlt?: string;
  screenshotPlaceholder: string;
  title: string;
  text: string;
  bullets: string[];
}

export interface ScreenshotSpec {
  /** Image path under /images. Placeholder is shown while undefined. */
  src?: string;
  /** Alt text. Falls back to a generic label where the image is used. */
  alt?: string;
  /** Plain words, shown only while src is missing. */
  placeholder: string;
}

export interface Solution {
  id: string;
  title: string;
  summary: string;
  features: string[];
  /** FR-S2: two to three screenshots. */
  screenshots: ScreenshotSpec[];
  fitsYourShop: string;
}

export interface WhoItsForCard {
  icon: DoodleName;
  title: string;
  text: string;
  /** Shown while the matching feature flag is false. */
  comingSoonLabel?: string;
  requiresFlag?: keyof Features;
}

export interface Step {
  title: string;
  text: string;
}

export interface ComparisonRow {
  feature: string;
  zoryx: string;
  other: string;
  /** Row is shown only when features.fbrIntegration is true. */
  requiresFbr?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  business: string;
  /** Placeholder text now; replace with an image path under /images. */
  photo: string;
}

export interface ProofItem {
  label: string;
}

export interface CaseStudy {
  slug: string;
  /** Only true with written owner permission. */
  published: boolean;
  business: string;
  type: string;
  area: string;
  liveSince?: string;
  cardResult: string;
  problem: string;
  built: string;
  result: string;
  quote?: string;
  images: string[];
}

export interface ValueItem {
  icon: DoodleName;
  title: string;
  text: string;
}

export interface TeamMember {
  /** Photo path under /images. Placeholder is shown while undefined. */
  photo?: string;
  name: string;
  role: string;
  line: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export interface PageSeo {
  title: string;
  description: string;
}

/* ---------- Feature flags ---------- */

export const features: Features = {
  fbrIntegration: false,
  retailLive: false,
};

/* ---------- 7.1 Company and contact ---------- */

export const site: SiteConfig = {
  brandName: "Zoryx POS",
  shortName: "Zoryx",
  domain: "zoryx.dev",
  tagline: "Custom POS and online ordering, built around your shop.",
  footerDescription:
    "A local team in Islamabad and Rawalpindi building custom POS and online ordering systems for food businesses.",
  phone: "DEMO: +92 300 0000000",
  whatsappNumber: "DEMO: 923000000000",
  email: "DEMO: hello@zoryx.dev",
  address: "DEMO: [Office no.], [Building], [Area], Islamabad",
  mapsUrl: "[GOOGLE MAPS LINK]",
  mapEmbedUrl: "[GOOGLE MAPS EMBED URL]",
  supportHours: "DEMO: Monday to Saturday, 10:00 am to 8:00 pm",
  replyTime: "DEMO: We reply within 2 hours during support hours",
  social: {
    instagram: "[INSTAGRAM URL]",
    facebook: "[FACEBOOK URL]",
    linkedin: "[LINKEDIN URL]",
  },
  defaultWhatsAppMessage: "Hi Zoryx, I'd like a free demo for my shop. Shop name: [ ] Area: [ ]",
  demoMessageIntro: "Hi Zoryx, I'd like a free demo for my shop.",
};

/* ---------- 7.2 Navigation ---------- */

export const nav: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  // { label: "Our Work", href: "/work" }, // Hidden until there are real case studies. Uncomment together with workPage.caseStudies.
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const headerCta: CtaLink = { label: "Book a Free Demo", href: "/contact" };

/** Accessible labels for icon-only controls and landmarks. */
export const uiLabels = {
  skipToContent: "Skip to content",
  solutionsAnchorNav: "Solutions on this page",
  mainNav: "Main",
  mobileNav: "Mobile",
  footerLegalNav: "Legal",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  playVideo: "Play demo video",
  whatsappFloat: "Chat with Zoryx on WhatsApp",
  social: {
    instagram: "Instagram",
    facebook: "Facebook",
    linkedin: "LinkedIn",
  },
};

/* ---------- 7.3 Home ---------- */

export const hero: Hero = {
  laptopScreenshot: {
    src: "/images/hero/pos-billing-poster.webp",
    alt: "Zoryx POS billing screen with Table 4 bill",
    placeholder: "POS billing screen",
  },
  phoneScreenshot: {
    src: "/images/hero/online-order-phone.webp",
    alt: "Branded online ordering page on a phone",
    placeholder: "Online ordering page",
  },
  eyebrow: "Custom POS · Online Ordering · Islamabad & Rawalpindi",
  headline: "Built for Food Businesses",
  subline:
    "Custom POS and your own online ordering, branded as yours and set up by a local team you can actually call.",
  primaryCta: "Book a Free Demo",
  secondaryCta: "Chat on WhatsApp",
  trustLine: "Free shop visit · Setup in days, not months · Local support",
  floatingCard: "New online order · Table 4 · Rs 2,450",
  visualAlt: "Zoryx POS billing screen on a laptop and the online ordering page on a phone",
};

export const seeItWorking: SeeItWorking = {
  // The poster shows as a still picture until the video file is added (set video.src).
  video: {
    // Paste the MP4 at public/videos/demo.mp4 (16:9, under 15 MB).
    src: "/videos/demo.mp4",
    poster: "/images/video/demo-poster.webp",
    posterAlt: "POS billing screen with a Table 4 bill",
  },
  heading: "See It Working",
  text: "A one-minute look at a real system running at a café in Rawalpindi: taking an order, printing the bill, and receiving an online order.",
  videoCaption: "DEMO: Running live at Murshad Cafe",
  placeholder: "[60-SECOND DEMO VIDEO]",
};

export const problemBand: ProblemBand = {
  heading: "Still Running on Guesswork?",
  cards: [
    {
      icon: "receipt",
      title: "Billing mistakes add up.",
      text: "Hand-written bills and calculators lead to wrong totals, missed items and cash that doesn't match at night.",
    },
    {
      icon: "chart",
      title: "You can't see what's selling.",
      text: "Without clear reports you don't know your best items, slow hours, or what stock is running out.",
    },
    {
      icon: "scooter",
      title: "Commission on your own customers.",
      text: "Regulars who would happily order from you directly are paying through delivery apps that take a cut of every order.",
    },
  ],
};

export const solutionTabs: { heading: string; tabs: SolutionTab[] } = {
  heading: "Everything Your Counter Needs",
  tabs: [
    {
      id: "pos",
      label: "POS",
      screenshot: "/images/tabs/tab-billing.webp",
      screenshotAlt: "POS billing screen with a Table 4 bill",
      screenshotPlaceholder: "POS billing screen",
      title: "Custom POS",
      text: "Fast billing set up around your menu, your deals and the way your staff already work.",
      bullets: [
        "Quick billing and printed receipts",
        "Menu, deals and add-ons",
        "Dine-in, takeaway and delivery orders",
        "Staff roles and permissions",
      ],
    },
    {
      id: "online-ordering",
      label: "Online Ordering",
      screenshot: "/images/tabs/tab-online-ordering.webp",
      screenshotAlt: "Online ordering page showing the shop menu",
      screenshotPlaceholder: "Online ordering page",
      title: "Your Own Online Ordering",
      text: "A branded ordering link and QR code for your customers, with orders arriving straight into your POS.",
      bullets: [
        "Your logo and colors",
        "Order by link, QR or WhatsApp",
        "Delivery zones and pickup",
        "Instant order alerts",
      ],
    },
    {
      id: "inventory-reports",
      label: "Inventory & Reports",
      screenshot: "/images/tabs/tab-reports.webp",
      screenshotAlt: "Sales report with sales, orders and top items",
      screenshotPlaceholder: "Sales report",
      title: "Inventory and Reports",
      text: "Know what sold, what's left and how today compares to last week.",
      bullets: [
        "Stock tracking and low-stock alerts",
        "Day-end and sales reports",
        "Best-selling items",
        "Cash and card summary",
      ],
    },
    {
      id: "branding",
      label: "Branding",
      screenshot: "/images/tabs/tab-branding.webp",
      screenshotAlt: "Shop website branded with the shop name and colours",
      screenshotPlaceholder: "Branded shop website",
      title: "Branding and Websites",
      text: "Need a fresh look too? We design logos, menus and simple websites that match your system.",
      bullets: [
        "Logo and brand colors",
        "Menu and price-list design",
        "Social media templates",
        "Simple business website",
      ],
    },
  ],
};

export const solutionTabsDetailsLabel = "See details";

export const whoItsFor: { heading: string; cards: WhoItsForCard[] } = {
  heading: "Made for Shops Like Yours",
  cards: [
    {
      icon: "chefhat",
      title: "Restaurants, Cafés and Bakeries",
      text: "Dine-in, takeaway and delivery, tables, kitchen tickets and deals.",
    },
    {
      icon: "receipt",
      title: "Milk Shops and Retail",
      text: "Sales by weight and litre, regular-customer accounts and daily delivery.",
      comingSoonLabel: "Coming soon",
      requiresFlag: "retailLive",
    },
  ],
};

export const workPreview: {
  heading: string;
  text: string;
  readStoryLabel: string;
  linkLabel: string;
  href: string;
} = {
  heading: "Running in Real Shops",
  text: "Every system we show here is live and used every day.",
  readStoryLabel: "Read the story",
  linkLabel: "See all work",
  href: "/work",
};

export const howItWorks: { heading: string; steps: Step[] } = {
  heading: "How It Works",
  steps: [
    {
      title: "Free visit",
      text: "We visit your shop, watch how you work and note what you need.",
    },
    {
      title: "We set it up",
      text: "We configure your menu, deals and branding, and connect your printer.",
    },
    {
      title: "Train and go live",
      text: "We train your staff on-site and stay with you on launch day.",
    },
    {
      title: "Ongoing support",
      text: "Updates, fixes and help on WhatsApp or in person when you need it.",
    },
  ],
};

export const whyZoryx: {
  heading: string;
  columnHeaders: { feature: string; zoryx: string; other: string };
  rows: ComparisonRow[];
} = {
  heading: "Why Zoryx, Not Off-the-Shelf",
  columnHeaders: { feature: "Feature", zoryx: "Zoryx", other: "Typical off-the-shelf POS" },
  rows: [
    {
      feature: "Built around your workflow",
      zoryx: "Yes",
      other: "You adjust to the software",
    },
    {
      feature: "Your logo and colors on the system and ordering page",
      zoryx: "Yes",
      other: "Their branding",
    },
    {
      feature: "In-person setup and training",
      zoryx: "Yes",
      other: "Usually remote or self-setup",
    },
    {
      feature: "Local support team in Islamabad and Rawalpindi",
      zoryx: "Yes",
      other: "Varies",
    },
    {
      feature: "Own online ordering without app commission",
      zoryx: "Yes",
      other: "Often extra or not included",
    },
    {
      feature: "FBR/PRA invoice integration",
      zoryx: "Yes",
      other: "Varies",
      requiresFbr: true,
    },
  ],
};

/** Hidden entirely when empty. */
export const testimonials: Testimonial[] = [
  // Hidden until there is a real owner quote with written permission.
  // Uncomment, fill in, and the testimonial section returns on the home page.
  // {
  //   quote:
  //     'DEMO: "Billing is faster, the end-of-day report finally matches our cash, and customers order directly from our own link."',
  //   name: "DEMO: [Owner name]",
  //   role: "DEMO: Owner",
  //   business: "DEMO: Murshad Cafe, Rawalpindi",
  //   photo: "[OWNER PHOTO]",
  // },
];

/** Only real facts. Up to 3 shown. Hidden if empty. */
export const proof: ProofItem[] = [
  // Hidden with the testimonial. Only real facts, e.g. the number of shops live.
  // { label: "DEMO: 2 shops live" },
  // { label: "DEMO: Setup in 7 days" },
  // { label: "DEMO: Local support" },
];

export const finalCta: {
  heading: string;
  text: string;
  primaryCta: string;
  secondaryCta: string;
} = {
  heading: "Ready to See It in Your Shop?",
  text: "Book a free visit. We'll show you the system on your own menu.",
  primaryCta: "Book a Free Demo",
  secondaryCta: "Chat on WhatsApp",
};

/* ---------- 7.4 Solutions page ---------- */

export const solutionsPage: {
  title: string;
  introHeading: string;
  introText: string;
  fitsLabel: string;
  solutions: Solution[];
  hardware: { heading: string; text: string };
} = {
  title: "Solutions",
  introHeading: "One System, Built Around Your Shop",
  introText:
    "Choose what you need today and add more as you grow. Everything is set up and supported by our team.",
  fitsLabel: "How it fits your shop",
  solutions: [
    {
      id: "pos",
      title: "Custom POS",
      summary: "Billing that's quick for your staff and accurate for you.",
      features: [
        "Fast billing with printed receipts",
        "Menu categories, deals and add-ons",
        "Dine-in tables, takeaway and delivery orders",
        "Kitchen order tickets",
        "Discounts and service charges",
        "Staff logins with roles",
        "Cash and card payment records",
        "Works on laptop or tablet",
      ],
      screenshots: [
        {
          src: "/images/solutions/billing-main.webp",
          alt: "POS billing screen with menu items and a Table 4 bill",
          placeholder: "POS billing screen",
        },
        {
          src: "/images/solutions/orders-kitchen.webp",
          alt: "Kitchen screen with three open order tickets",
          placeholder: "Kitchen tickets",
        },
        {
          src: "/images/solutions/orders-menu.webp",
          alt: "Menu screen with item prices and on or off switches",
          placeholder: "Menu screen",
        },
      ],
      fitsYourShop:
        "We set up your exact menu, deals and receipt layout during the free visit, so your staff start with a system that already looks like your shop.",
    },
    {
      id: "online-ordering",
      title: "Online Ordering",
      summary: "Your own ordering page, with your name on it.",
      features: [
        "Branded ordering link and QR code",
        "WhatsApp ordering",
        "Delivery zones and delivery charges",
        "Pickup orders",
        "Orders arrive in your POS",
        "Order status updates",
        "Works on any phone",
      ],
      screenshots: [
        {
          src: "/images/solutions/ordering-main.webp",
          alt: "Online ordering page showing the shop menu",
          placeholder: "Online ordering page",
        },
        {
          src: "/images/solutions/ordering-checkout.webp",
          alt: "Cart with two items, delivery or pickup choice and a Place order button",
          placeholder: "Ordering cart",
        },
        {
          src: "/images/solutions/ordering-new-order-alert.webp",
          alt: "POS screen with a new online order alert and an Accept button",
          placeholder: "New order alert",
        },
      ],
      fitsYourShop:
        "Share the link on Instagram, WhatsApp and table QR codes, and let regular customers order from you directly.",
    },
    {
      id: "inventory-reports",
      title: "Inventory and Reports",
      summary: "See your business clearly at the end of every day.",
      features: [
        "Stock levels per item",
        "Low-stock alerts",
        "Day-end closing report",
        "Sales by item, category and hour",
        "Best and slowest sellers",
        "Cash vs card summary",
      ],
      screenshots: [
        {
          src: "/images/solutions/reports-main.webp",
          alt: "Sales report with sales, orders, sales by hour and top items",
          placeholder: "Sales report",
        },
        {
          src: "/images/solutions/reports-inventory.webp",
          alt: "Stock screen with low-stock items marked and a Reorder button",
          placeholder: "Stock levels",
        },
        {
          src: "/images/solutions/reports-day-close.webp",
          alt: "Day close screen with payments split into cash, card and online",
          placeholder: "Day close report",
        },
      ],
      fitsYourShop: "We set up the reports you actually check, nothing extra.",
    },
    {
      id: "branding",
      title: "Branding and Websites",
      summary: "A look that matches the quality of your food.",
      features: [
        "Logo and brand colors",
        "Menu and price-list design",
        "Social media post templates",
        "Simple business website",
      ],
      screenshots: [
        {
          src: "/images/solutions/branding-main.webp",
          alt: "Shop website branded with the shop name and colours",
          placeholder: "Branded shop website",
        },
        {
          src: "/images/solutions/branding-settings.webp",
          alt: "Brand settings with shop name, web address, colours and logo",
          placeholder: "Brand settings",
        },
        {
          src: "/images/solutions/branding-receipt.webp",
          alt: "Printed bill with the shop name at the top",
          placeholder: "Branded receipt",
        },
      ],
      fitsYourShop:
        "Optional. Add it when you're opening a new shop or refreshing an old one.",
    },
  ],
  hardware: {
    heading: "Hardware",
    text: "Zoryx runs on a laptop or tablet you may already have. We can recommend and set up a receipt printer, cash drawer and barcode scanner. DEMO: [Supported printer models]",
  },
};

/* ---------- 7.5 Our Work ---------- */

export const workPage: { heading: string; intro: string; caseStudies: CaseStudy[] } = {
  heading: "Our Work",
  intro: "Real systems, running in real shops.",
  caseStudies: [
    // Hidden until a real client gives written permission. Uncomment an entry (and the Our Work nav links)
    // and the Our Work page, case study page, home preview and sitemap entry all come back.
    // {
    //   slug: "murshad-cafe",
    //   // DEMO: true. Set to false until owner permission is confirmed.
    //   published: true,
    //   business: "DEMO: Murshad Cafe",
    //   type: "Café and restaurant",
    //   area: "DEMO: Rawalpindi",
    //   liveSince: "DEMO: [Month Year]",
    //   cardResult: "DEMO: POS and own online ordering, live and used daily.",
    //   problem:
    //     "DEMO: Bills were written by hand, totals didn't always match at closing, and there was no simple way to take online orders directly.",
    //   built:
    //     "Custom POS with the café's menu and deals, kitchen tickets, day-end reports, and a branded online ordering page connected to the POS.",
    //   result: "DEMO: [Owner's own words about the result]",
    //   quote: "DEMO: [Owner quote]",
    //   images: ["[CAFE PHOTO]", "[POS SCREENSHOT]", "[ORDERING PAGE SCREENSHOT]"],
    // },
    // {
    //   slug: "milk-shop",
    //   published: false,
    //   business: "DEMO: [Milk shop name]",
    //   type: "Milk and dairy shop",
    //   area: "DEMO: [Area]",
    //   cardResult: "DEMO: POS with sales by litre and customer accounts.",
    //   problem: "DEMO: [Problem]",
    //   built: "DEMO: [Solution]",
    //   result: "DEMO: [Result]",
    //   images: [],
    // },
  ],
};

/** Labels on the case study page (from the SRS 7.5 field names). */
export const caseStudyPage = {
  factLabels: { type: "Type", area: "Area", liveSince: "Live since" },
  problemHeading: "The problem",
  builtHeading: "What we built",
  resultHeading: "The result",
};

export function getPublishedCaseStudies(): CaseStudy[] {
  return workPage.caseStudies.filter((study) => study.published);
}

/* ---------- 7.6 About ---------- */

export const aboutPage: {
  heading: string;
  /** Story section photo (4:3). */
  storyImage?: ScreenshotSpec;
  valuesHeading: string;
  teamHeading: string;
  teamPhotoPlaceholder: string;
  mapTitle: string;
  storyHeading: string;
  storyText: string;
  values: ValueItem[];
  team: TeamMember[];
  visitHeading: string;
  visitText: string;
} = {
  heading: "About Zoryx",
  // Not in the SRS: placeholders and labels for the owner to confirm.
  // Story photo hidden for now. Uncomment, and add src, to show it beside the story text:
  // storyImage: { src: "/images/about/team.webp", alt: "The Zoryx team", placeholder: "The Zoryx team" },
  valuesHeading: "DEMO: What We Stand For",
  // Team section hidden until there are real people and photos. Restore these two lines with the team below:
  // teamHeading: "Meet the Team",
  // teamPhotoPlaceholder: "Team member photo",
  teamHeading: "",
  teamPhotoPlaceholder: "",
  mapTitle: "Map of the Zoryx office",
  storyHeading: "Built Here, for Shops Here",
  storyText:
    "DEMO: Zoryx started when we built a POS and online ordering system for a café in Rawalpindi and saw how much time and money a system built around the shop could save. We're a small team of engineers and designers in Islamabad and Rawalpindi, and we set up and support every system ourselves.",
  values: [
    {
      icon: "pos",
      title: "Built around you",
      text: "We shape the system to your shop, not the other way round.",
    },
    {
      icon: "receipt",
      title: "Honest and clear",
      text: "Clear pricing, clear timelines, no surprise charges.",
    },
    {
      icon: "scooter",
      title: "Always reachable",
      text: "A real person on WhatsApp or at your door when you need help.",
    },
  ],
  team: [
    // Hidden until the real team is ready. Uncomment, fill in names, lines and photos.
    // { name: "[Name]", role: "Founder and Lead", line: "[One line]" },
    // { name: "[Name]", role: "Developer", line: "[One line]" },
    // { name: "[Name]", role: "Design and Branding", line: "[One line]" },
    // { name: "[Name]", role: "Support and Onboarding", line: "[One line]" },
  ],
  visitHeading: "Visit us",
  visitText: "DEMO: [Office address]. Please message us on WhatsApp before visiting.",
};

/* ---------- 7.7 FAQ ---------- */

export const faqGroups: FaqGroup[] = [
  {
    title: "Setup",
    items: [
      {
        id: "setup-time",
        question: "How long does setup take?",
        answer:
          "DEMO: Most shops go live within 7 to 10 days after the free visit, depending on menu size and hardware.",
      },
      {
        id: "hardware",
        question: "What hardware do I need?",
        answer:
          "A laptop or tablet, a receipt printer and optionally a cash drawer. We can use what you have or recommend affordable options.",
      },
      {
        id: "training",
        question: "Do you train my staff?",
        answer: "Yes. We train your staff in your shop and stay with you on launch day.",
      },
    ],
  },
  {
    title: "Using it",
    items: [
      {
        id: "offline",
        question: "Does it work if the internet goes down?",
        answer: "DEMO: [Answer depends on build: describe offline billing behaviour]",
      },
      {
        id: "urdu",
        question: "Can my staff use it in Urdu?",
        answer: "DEMO: [Answer: Urdu interface available / planned]",
      },
      {
        id: "deals-tables",
        question: "Can it handle deals, add-ons and table orders?",
        answer: "Yes. We set up your deals, add-ons and table layout during setup.",
      },
    ],
  },
  {
    title: "Pricing and support",
    items: [
      {
        id: "cost",
        question: "How much does it cost?",
        answer:
          "Pricing is a one-time setup fee plus a simple monthly plan. It depends on what you need, so we give you a clear quote after the free visit.",
      },
      {
        id: "monthly-fee",
        question: "What does the monthly fee cover?",
        answer:
          "DEMO: Hosting, updates, backups and support on WhatsApp during support hours. New features are quoted separately.",
      },
      {
        id: "changes",
        question: "Can you change things later?",
        answer:
          "Yes. Menu and price changes are part of support; bigger changes are quoted before we start.",
      },
    ],
  },
  {
    title: "Data and online orders",
    items: [
      {
        id: "data-ownership",
        question: "Who owns my data?",
        answer:
          "You do. Your sales and customer data belong to your business, and we can export it for you.",
      },
      {
        id: "backups",
        question: "Is my data backed up?",
        answer: "DEMO: Yes, data is backed up automatically every day.",
      },
      {
        id: "delivery-apps",
        question: "Do I have to stop using delivery apps?",
        answer:
          "No. Keep them if they help. Your own ordering link is for customers who would rather order from you directly.",
      },
    ],
  },
];

/** Not in the SRS: wording and question picks are placeholders for the owner to confirm. */
export const faqPreview = {
  heading: "DEMO: Common Questions",
  linkLabel: "DEMO: See all questions",
  questionIds: ["hardware", "cost", "delivery-apps"],
};

export function getFaqPreviewItems(): FaqItem[] {
  const all = faqGroups.flatMap((group) => group.items);
  return faqPreview.questionIds
    .map((id) => all.find((item) => item.id === id))
    .filter((item): item is FaqItem => item !== undefined);
}

/* ---------- 7.8 Contact ---------- */

export const contactPage: {
  heading: string;
  intro: string;
  whatsappLabel: string;
  form: {
    nameLabel: string;
    shopNameLabel: string;
    areaLabel: string;
    phoneLabel: string;
    businessTypeLabel: string;
    businessTypes: string[];
    messageLabel: string;
    submitLabel: string;
  };
  validation: { required: string; phone: string };
  successMessage: string;
  errorMessage: string;
} = {
  heading: "Book a Free Demo",
  intro:
    "Tell us about your shop. We'll visit, understand how you work and show you the system on your own menu. No cost, no pressure.",
  whatsappLabel: "Chat on WhatsApp",
  form: {
    nameLabel: "Your name",
    shopNameLabel: "Shop name",
    areaLabel: "Area",
    phoneLabel: "Phone number",
    businessTypeLabel: "Business type",
    businessTypes: ["Restaurant", "Café", "Bakery", "Milk shop", "Other"],
    messageLabel: "What do you need? (optional)",
    submitLabel: "Request My Free Demo",
  },
  // Not in the SRS: form validation wording (FR-C4). Owner to confirm.
  validation: {
    required: "Please fill in this field.",
    phone: "Enter a Pakistani mobile number like 03001234567 or +923001234567.",
  },
  successMessage: "Thanks! We'll contact you within 2 hours during support hours.",
  errorMessage: "Something went wrong. Please message us on WhatsApp instead.",
};

/* ---------- 7.9 Footer ---------- */

export const footer: {
  columns: { company: { heading: string; links: NavItem[] }; solutions: { heading: string; links: NavItem[] }; contactHeading: string };
  legal: NavItem[];
  copyright: string;
} = {
  columns: {
    company: {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        // { label: "Our Work", href: "/work" }, // Hidden until there are real case studies. Uncomment together with workPage.caseStudies.
        { label: "FAQ", href: "/faq" },
      ],
    },
    solutions: {
      heading: "Solutions",
      links: [
        { label: "Custom POS", href: "/solutions#pos" },
        { label: "Online Ordering", href: "/solutions#online-ordering" },
        { label: "Inventory & Reports", href: "/solutions#inventory-reports" },
        { label: "Branding", href: "/solutions#branding" },
      ],
    },
    contactHeading: "Contact",
  },
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  copyright: "© 2026 Zoryx. All rights reserved.",
};

/* ---------- 7.10 Legal pages ---------- */

export const legalPages: { privacy: string; terms: string } = {
  privacy:
    "[PRIVACY POLICY TEXT — must cover analytics, contact form data, WhatsApp, data retention, contact email]",
  terms: "[TERMS TEXT]",
};

/* ---------- 7.11 404 ---------- */

export const notFound: { heading: string; text: string; homeLabel: string; contactLabel: string } = {
  heading: "This Page Took Its Order Elsewhere",
  text: "The page you're looking for doesn't exist.",
  homeLabel: "Go Home",
  contactLabel: "Contact Us",
};

/* ---------- 8. SEO metadata ---------- */

export const seo: {
  home: PageSeo;
  solutions: PageSeo;
  work: PageSeo;
  about: PageSeo;
  faq: PageSeo;
  contact: PageSeo;
  keywords: string[];
} = {
  home: {
    title: "Zoryx POS — Custom POS and Online Ordering in Islamabad and Rawalpindi",
    description:
      "Custom POS and own-brand online ordering for restaurants, cafés and bakeries, set up and supported by a local team.",
  },
  solutions: {
    title: "Solutions — POS, Online Ordering, Inventory and Branding",
    description:
      "Custom POS, online ordering, inventory reports and branding for food businesses in Islamabad and Rawalpindi.",
  },
  work: {
    title: "Our Work — Zoryx POS in Real Shops",
    description: "See POS and online ordering systems we've built for local food businesses.",
  },
  about: {
    title: "About Zoryx — Local POS Team",
    description:
      "A small Islamabad and Rawalpindi team building custom POS and online ordering systems.",
  },
  faq: {
    title: "FAQ — Setup, Pricing and Support",
    description: "Answers about setup time, hardware, pricing, support and your data.",
  },
  contact: {
    title: "Book a Free Demo — Zoryx POS",
    description: "Book a free shop visit and see Zoryx POS on your own menu.",
  },
  keywords: [
    "POS software Islamabad",
    "restaurant POS Rawalpindi",
    "café billing system Islamabad",
    "online ordering for restaurants Pakistan",
  ],
};
