import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <Section background="green" deferRender={910}>
      <SectionHeading background="green" title={howItWorks.heading} />
      <ol className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {howItWorks.steps.map((step, index) => (
          <li
            key={step.title}
            // Dashed connector to the next step, desktop only: starts after this circle, ends before the next.
            className="relative lg:not-last:after:absolute lg:not-last:after:top-8 lg:not-last:after:left-20 lg:not-last:after:-right-4 lg:not-last:after:border-t-2 lg:not-last:after:border-dashed lg:not-last:after:border-cream/50"
          >
            <span className="font-display flex size-16 items-center justify-center rounded-full bg-lime text-[28px] leading-none font-extrabold text-green">
              {index + 1}
            </span>
            <h3 className="text-h3 mt-6 text-cream">{step.title}</h3>
            <p className="text-body mt-3 max-w-[40ch] text-cream/85">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
