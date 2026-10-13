import { doodles } from "@/components/icons/doodles";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features, whoItsFor } from "@/content/site";

export function WhoItsFor() {
  return (
    <Section background="cream" deferRender={630}>
      <SectionHeading background="cream" title={whoItsFor.heading} />
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {whoItsFor.cards.map((card) => {
          const Icon = doodles[card.icon];
          const comingSoon = Boolean(card.requiresFlag && !features[card.requiresFlag]);
          return (
            <li key={card.title} className="flex">
              <Card
                surface={comingSoon ? "cream" : "white"}
                shadow={!comingSoon}
                muted={comingSoon}
                className="w-full md:p-12"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon size={64} className="text-green" />
                  {comingSoon && card.comingSoonLabel ? (
                    <Pill tone="green">{card.comingSoonLabel}</Pill>
                  ) : null}
                </div>
                <h3 className="text-h3 mt-8 text-green">{card.title}</h3>
                <p className="text-body-lg mt-3 text-ink">{card.text}</p>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
