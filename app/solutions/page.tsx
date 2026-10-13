import { FinalCta } from "@/components/sections/FinalCta";
import { SolutionBlock } from "@/components/sections/SolutionBlock";
import { SolutionsAnchorNav } from "@/components/sections/SolutionsAnchorNav";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { seo, solutionsPage, uiLabels } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(seo.solutions, "/solutions/");

export default function SolutionsPage() {
  const { solutions, hardware } = solutionsPage;

  return (
    <main>
      <section className="on-dark bg-green pt-12 pb-12 text-cream md:pt-16 md:pb-16">
        <Container>
          <SectionHeading
            as="h1"
            background="green"
            eyebrow={solutionsPage.title}
            title={solutionsPage.introHeading}
            text={solutionsPage.introText}
          />
        </Container>
      </section>
      <ArcDivider />

      <SolutionsAnchorNav
        ariaLabel={uiLabels.solutionsAnchorNav}
        items={solutions.map(({ id, title }) => ({ id, label: title }))}
      />

      {solutions.map((solution, index) => (
        <SolutionBlock key={solution.id} solution={solution} index={index} />
      ))}

      <Section background={solutions.length % 2 === 0 ? "cream" : "white"} id="hardware">
        <SectionHeading background="cream" title={hardware.heading} text={hardware.text} />
      </Section>

      <FinalCta />
    </main>
  );
}
