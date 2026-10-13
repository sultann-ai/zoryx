import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { type CaseStudy, workPreview } from "@/content/site";
import { isPlaceholderImage } from "@/lib/images";

interface CaseStudyCardProps {
  study: CaseStudy;
  /** Heading level of the business name: h3 under a section h2, h2 directly under the page h1. */
  headingAs?: "h2" | "h3";
}

export function CaseStudyCard({ study, headingAs: Heading = "h3" }: CaseStudyCardProps) {
  const photo = study.images[0];
  const hasImage = Boolean(photo) && !isPlaceholderImage(photo);

  return (
    <Card surface="white" shadow className="flex h-full w-full flex-col">
      <ImageFrame
        on="cream"
        alt={study.business}
        src={hasImage ? photo : undefined}
        placeholder={photo ?? study.business}
      />
      <Heading className="text-h3 mt-6 text-green">{study.business}</Heading>
      <p className="text-label mt-2 text-ink">
        {study.type} · {study.area}
      </p>
      <p className="text-body mt-4 text-ink">{study.cardResult}</p>
      <Link
        href={`/work/${study.slug}`}
        className="text-body mt-auto inline-flex min-h-11 items-center gap-2 pt-4 font-bold text-green underline underline-offset-4"
      >
        {workPreview.readStoryLabel}
        <ArrowRight aria-hidden="true" size={18} />
      </Link>
    </Card>
  );
}
