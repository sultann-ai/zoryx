import { faqGroups, site } from "@/content/site";
import { isRealUrl } from "./links";

/** LocalBusiness JSON-LD built from content/site.ts (NFR-3). Demo markers carry through until replaced. */
export function localBusinessJsonLd() {
  const sameAs = Object.values(site.social).filter((url): url is string => Boolean(url) && isRealUrl(url as string));
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brandName,
    url: `https://${site.domain}`,
    description: site.footerDescription,
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(site.address ? { address: { "@type": "PostalAddress", streetAddress: site.address } } : {}),
    ...(site.supportHours ? { openingHours: site.supportHours } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** FAQPage JSON-LD built from the FAQ content (FR-F2). */
export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    ),
  };
}
