import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { solutionTabs, solutionTabsDetailsLabel } from "@/content/site";

export function SolutionsTabs() {
  const tabs = solutionTabs.tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    content: (
      <div className="grid items-center gap-12 md:grid-cols-2">
        <ImageFrame
          src={tab.screenshot}
          alt={tab.screenshotAlt ?? tab.title}
          placeholder={tab.screenshotPlaceholder}
          aspect="4 / 3"
        />
        <div>
          <h3 className="text-h3 text-cream">{tab.title}</h3>
          <p className="text-body-lg mt-4 max-w-[60ch] text-cream/85">{tab.text}</p>
          <ul className="mt-6 space-y-3">
            {tab.bullets.map((bullet) => (
              <li key={bullet} className="text-body flex items-start gap-3">
                <Check aria-hidden="true" size={18} strokeWidth={3} className="mt-1 shrink-0 text-lime" />
                {bullet}
              </li>
            ))}
          </ul>
          <Link
            href={`/solutions#${tab.id}`}
            className="text-body mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-lime underline underline-offset-4"
          >
            {solutionTabsDetailsLabel}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
    ),
  }));

  return (
    <Section background="green" id="solutions" deferRender={830}>
      <SectionHeading background="green" title={solutionTabs.heading} />
      <Tabs tabs={tabs} ariaLabel={solutionTabs.heading} className="mt-12" />
    </Section>
  );
}
