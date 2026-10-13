import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqPreview, getFaqPreviewItems } from "@/content/site";

interface FaqPreviewProps {
  /** True when the section above is also cream, so the double top padding is dropped. */
  followsCream?: boolean;
}

export function FaqPreview({ followsCream = false }: FaqPreviewProps) {
  const items = getFaqPreviewItems();
  if (items.length === 0) return null;

  return (
    <Section background="cream" className={followsCream ? "pt-0 md:pt-0" : undefined} deferRender={390}>
      <SectionHeading background="cream" title={faqPreview.heading} />
      <Accordion items={items} className="mt-12 max-w-3xl border-t border-green/20" />
      <Link
        href="/faq"
        className="text-body mt-8 inline-flex min-h-11 items-center gap-2 font-bold text-green underline underline-offset-4"
      >
        {faqPreview.linkLabel}
        <ArrowRight aria-hidden="true" size={18} />
      </Link>
    </Section>
  );
}
