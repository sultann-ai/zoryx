import type { Metadata } from "next";
import { type PageSeo, site } from "@/content/site";

/** Default Open Graph / Twitter image (1200x630), resolved against metadataBase. */
export const defaultOgImage = {
  url: "/og/default.png",
  width: 1200,
  height: 630,
  alt: `${site.brandName}: ${site.tagline}`,
};

interface BuildMetadataOptions {
  /**
   * True: the title is a short page name and the layout template adds the brand ("%s | Zoryx POS").
   * False (default): the title is already complete, as in the SEO table, so the template is skipped.
   */
  useTemplate?: boolean;
}

/** Page metadata from content/site.ts. `path` is the route, e.g. "/solutions/". */
export function buildMetadata(
  seo: PageSeo,
  path: string,
  { useTemplate = false }: BuildMetadataOptions = {},
): Metadata {
  const fullTitle = useTemplate ? `${seo.title} | ${site.brandName}` : seo.title;
  return {
    title: useTemplate ? seo.title : { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: seo.description,
      url: path,
      siteName: site.brandName,
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: seo.description,
      images: [defaultOgImage.url],
    },
  };
}
