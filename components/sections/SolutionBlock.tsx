import clsx from "clsx";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import { headerCta, type Solution, solutionsPage } from "@/content/site";

interface SolutionBlockProps {
  solution: Solution;
  /** Position in the list. Even = cream with image left, odd = white with image right. */
  index: number;
}

export function SolutionBlock({ solution, index }: SolutionBlockProps) {
  const reversed = index % 2 === 1;
  const [main, ...rest] = solution.screenshots;

  return (
    <Section
      background={reversed ? "white" : "cream"}
      id={solution.id}
      className="scroll-mt-32"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={clsx("space-y-4", reversed && "lg:order-2")}>
          {main ? (
            <ImageFrame
              on="cream"
              src={main.src}
              alt={main.alt ?? solution.title}
              placeholder={main.placeholder}
              aspect="16 / 10"
            />
          ) : null}
          {rest.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {rest.map((shot) => (
                <ImageFrame
                  key={shot.placeholder}
                  on="cream"
                  src={shot.src}
                  alt={shot.alt ?? solution.title}
                  placeholder={shot.placeholder}
                  aspect="16 / 10"
                />
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <h2 className="text-h2 text-green">{solution.title}</h2>
          <p className="text-body-lg mt-4 max-w-[60ch] text-ink">{solution.summary}</p>

          <ul className="mt-8 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {solution.features.map((feature) => (
              <li key={feature} className="text-body flex items-start gap-3 text-ink">
                <Check aria-hidden="true" size={18} strokeWidth={3} className="mt-1 shrink-0 text-green" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-lg border border-green/20 bg-green/10 p-6">
            <h3 className="text-label font-bold tracking-wide text-green uppercase">
              {solutionsPage.fitsLabel}
            </h3>
            <p className="text-body mt-2 text-ink">{solution.fitsYourShop}</p>
          </div>

          <Button
            variant="onCream"
            href={headerCta.href}
            trackEvent="cta_demo_click"
            trackLocation={`solutions_${solution.id}`}
            className="mt-8"
          >
            {headerCta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
