import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

// Hex values mirror --color-cream and --color-green in globals.css.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brandName,
    short_name: site.shortName,
    description: site.tagline,
    start_url: "/",
    display: "browser",
    background_color: "#FEF8E6",
    theme_color: "#2F6656",
    icons: [
      { src: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
