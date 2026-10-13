import { doodles } from "@/components/icons/doodles";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problemBand } from "@/content/site";

export function ProblemBand() {
  return (
    <Section background="tomato" deferRender={880}>
      <SectionHeading background="tomato" title={problemBand.heading} />
      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {problemBand.cards.map((card) => {
          const Icon = doodles[card.icon];
          return (
            <li key={card.title} className="flex">
              <Card shadow className="w-full">
                <Icon size={48} className="text-green" />
                <h3 className="text-h3 mt-6 text-green">{card.title}</h3>
                <p className="text-body mt-3 text-ink">{card.text}</p>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
