import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  type CaseStudy,
  caseStudyPage,
  getPublishedCaseStudies,
  seo,
  workPage,
} from "@/content/site";
import { isPlaceholderImage } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";

// Only published case studies exist as pages (FR-W3). Anything else is a 404.
export const dynamicParams = false;

// Static export needs at least one route here. With no published case study, a placeholder slug is
// generated; it matches no study, so the page below calls notFound() and nothing links to it.
const NO_CASE_STUDY_SLUG = "unpublished";

export function generateStaticParams() {
  const params = getPublishedCaseStudies().map(({ slug }) => ({ slug }));
  return params.length > 0 ? params : [{ slug: NO_CASE_STUDY_SLUG }];
}

function findStudy(slug: string): CaseStudy | undefined {
  return getPublishedCaseStudies().find((study) => study.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = findStudy(slug);
  if (!study) return {};
  return buildMetadata(
    { title: `${study.business} | ${seo.work.title}`, description: study.cardResult },
    `/work/${study.slug}/`,
  );
}

function imageProps(value: string | undefined) {
  const real = value !== undefined && !isPlaceholderImage(value);
  return { src: real ? value : undefined, placeholder: value ?? "" };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = findStudy(slug);
  if (!study) notFound();

  const { factLabels } = caseStudyPage;
  const facts = [
    { label: factLabels.type, value: study.type },
    { label: factLabels.area, value: study.area },
    ...(study.liveSince ? [{ label: factLabels.liveSince, value: study.liveSince }] : []),
  ];
  const [heroImage, ...gallery] = study.images;
  const blocks = [
    { heading: caseStudyPage.problemHeading, text: study.problem },
    { heading: caseStudyPage.builtHeading, text: study.built },
    { heading: caseStudyPage.resultHeading, text: study.result },
  ];

  return (
    <main>
      <section className="on-dark bg-green pt-12 pb-12 text-cream md:pt-16 md:pb-16">
        <Container>
          <Link
            href="/work"
            className="text-body mb-8 inline-flex min-h-11 items-center gap-2 font-bold underline underline-offset-4"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            {workPage.heading}
          </Link>
          <SectionHeading as="h1" background="green" title={study.business} text={study.cardResult} />
          <ul className="mt-8 flex flex-wrap gap-3">
            {facts.map((fact) => (
              <li key={fact.label}>
                <Pill tone="cream">
                  {fact.label}: {fact.value}
                </Pill>
              </li>
            ))}
          </ul>
          <ImageFrame
            {...imageProps(heroImage)}
            alt={study.business}
            aspect="16 / 9"
            priority
            className="mt-12"
          />
        </Container>
      </section>
      <ArcDivider />

      <Section background="cream" className="pt-12 md:pt-12">
        <div className="divide-y divide-green/20 border-y border-green/20">
          {blocks.map((block) => (
            <div key={block.heading} className="grid gap-4 py-8 md:grid-cols-[1fr_2fr] md:gap-12">
              <h2 className="text-h3 text-green">{block.heading}</h2>
              <p className="text-body-lg max-w-[65ch] text-ink">{block.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {gallery.length > 0 ? (
        <Section background="white">
          <ul className="grid gap-8 md:grid-cols-2">
            {gallery.slice(0, 3).map((image, index) => (
              <li key={image}>
                <ImageFrame
                  {...imageProps(image)}
                  on="cream"
                  alt={study.business}
                  aspect="4 / 3"
                  tilt={index === 1 ? 2 : 0}
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {study.quote ? (
        <Section background="cream">
          <figure className="rounded-lg border border-green/20 bg-green/10 p-8 md:p-12">
            <blockquote>
              <p className="text-quote text-green">{study.quote}</p>
            </blockquote>
            <figcaption className="text-body mt-6 font-bold text-ink">{study.business}</figcaption>
          </figure>
        </Section>
      ) : null}

      <FinalCta />
    </main>
  );
}
