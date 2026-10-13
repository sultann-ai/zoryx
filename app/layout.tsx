import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { Analytics } from "@/components/layout/Analytics";
import { ClickTracking } from "@/components/layout/ClickTracking";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { seo, site, uiLabels } from "@/content/site";
import { defaultOgImage } from "@/lib/metadata";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: { default: seo.home.title, template: `%s | ${site.brandName}` },
  description: seo.home.description,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    siteName: site.brandName,
    type: "website",
    images: [defaultOgImage],
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
};

// Brand green (--color-green) for the mobile browser UI.
export const viewport: Viewport = { themeColor: "#2F6656" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <a
          href="#main-content"
          className="on-dark sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-pill focus:bg-cream focus:px-6 focus:py-3 focus:font-bold focus:text-green"
        >
          {uiLabels.skipToContent}
        </a>
        <Header />
        <div id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </div>
        <Footer />
        <WhatsAppButton />
        <Analytics />
        <ClickTracking />
      </body>
    </html>
  );
}
