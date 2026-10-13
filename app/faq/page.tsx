import { JsonLd } from "@/components/layout/JsonLd";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqGroups, nav, seo } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";
import { faqPageJsonLd } from "@/lib/structured-data";

export const metadata = buildMetadata(seo.faq, "/faq/");

// The page heading reuses the nav label for /faq; the intro reuses the SEO description.
const heading = nav.find((item) => item.href === "/faq")?.label ?? seo.faq.title;

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />
      <main>
        <section className="on-dark bg-green pt-12 pb-12 text-cream md:pt-16 md:pb-16">
          <Container>
            <SectionHeading as="h1" background="green" title={heading} text={seo.faq.description} />
          </Container>
        </section>
        <ArcDivider />

        <Section background="cream" className="pt-12 md:pt-12">
          <div className="space-y-16">
            {faqGroups.map((group) => (
              <div key={group.title} className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12">
                <h2 className="text-quote text-green">{group.title}</h2>
                <Accordion items={group.items} className="border-t border-green/20" />
              </div>
            ))}
          </div>
        </Section>

        <FinalCta />
      </main>
    </>
  );
}
