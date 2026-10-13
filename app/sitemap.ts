import type { MetadataRoute } from "next";
import { footer, getPublishedCaseStudies, nav, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...nav.map((item) => item.href),
    ...footer.legal.map((item) => item.href),
    ...getPublishedCaseStudies().map((study) => `/work/${study.slug}`),
  ];
  const lastModified = new Date();
  // trailingSlash is on, so every canonical URL ends with "/".
  return paths.map((path) => ({
    url: `https://${site.domain}${path === "/" ? "/" : `${path}/`}`,
    lastModified,
  }));
}
