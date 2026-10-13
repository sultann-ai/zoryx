import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPublishedCaseStudies, workPreview } from "@/content/site";
import { CaseStudyCard } from "./CaseStudyCard";

const MAX_CARDS = 2;

export function WorkPreview() {
  const studies = getPublishedCaseStudies().slice(0, MAX_CARDS);
  if (studies.length === 0) return null;

  return (
    // Follows another cream section, so the top padding is dropped to avoid a double gap.
    <Section background="cream" className="pt-0 md:pt-0" deferRender={600}>
      <SectionHeading background="cream" title={workPreview.heading} text={workPreview.text} />
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {studies.map((study) => (
          <li key={study.slug}>
            <CaseStudyCard study={study} />
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link
          href={workPreview.href}
          className="text-body inline-flex min-h-11 items-center gap-2 font-bold text-green underline underline-offset-4"
        >
          {workPreview.linkLabel}
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </Section>
  );
}
