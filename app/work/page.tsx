import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPublishedCaseStudies, seo, workPage } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(seo.work, "/work/");

export default function WorkPage() {
  const studies = getPublishedCaseStudies();
  // No published case studies: this page does not exist (it is also hidden from the nav and sitemap).
  if (studies.length === 0) notFound();

  return (
    <main>
      <section className="on-dark bg-green pt-12 pb-12 text-cream md:pt-16 md:pb-16">
        <Container>
          <SectionHeading as="h1" background="green" title={workPage.heading} text={workPage.intro} />
        </Container>
      </section>
      <ArcDivider />

      {studies.length > 0 ? (
        <Section background="cream" className="pt-12 md:pt-12">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((study) => (
              <li key={study.slug}>
                <CaseStudyCard study={study} headingAs="h2" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </main>
  );
}
