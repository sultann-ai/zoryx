import { LegalDocument } from "@/components/sections/LegalDocument";
import { footer, legalPages, site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

const title = footer.legal.find((link) => link.href === "/privacy")?.label ?? "";

// The SRS has no SEO text for legal pages: the title reuses the footer label (the layout template adds the brand), the description the tagline.
export const metadata = buildMetadata(
  { title, description: site.tagline },
  "/privacy/",
  { useTemplate: true },
);

export default function PrivacyPage() {
  return <LegalDocument title={title} body={legalPages.privacy} />;
}
