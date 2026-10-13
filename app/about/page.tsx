import clsx from "clsx";
import { doodles } from "@/components/icons/doodles";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { FinalCta } from "@/components/sections/FinalCta";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPage, contactPage, seo } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata = buildMetadata(seo.about, "/about/");

export default function AboutPage() {
  const hasTeam = aboutPage.team.length > 0;
  const hasStory = Boolean(aboutPage.storyText);
  // Without a values heading the cards' titles become the section's h2s, so heading levels stay in order.
  const ValueTitle = aboutPage.valuesHeading ? "h3" : "h2";

  return (
    <main>
      <section className="on-dark bg-green pt-12 pb-12 text-cream md:pt-16 md:pb-16">
        <Container>
          <SectionHeading as="h1" background="green" title={aboutPage.heading} />
        </Container>
      </section>
      <ArcDivider to={hasStory ? "cream" : "white"} />

      {/* Hidden while aboutPage.storyText is commented out in content/site.ts. */}
      {hasStory ? (
      <Section background="cream" className="pt-12 md:pt-12">
        <div className={clsx("grid items-center gap-12 lg:gap-16", aboutPage.storyImage && "lg:grid-cols-2")}>
          <div>
            <h2 className="text-h2 text-green text-balance">{aboutPage.storyHeading}</h2>
            <p className="text-body-lg mt-6 max-w-[60ch] text-ink">{aboutPage.storyText}</p>
          </div>
          {/* The story photo is hidden while aboutPage.storyImage is commented out in content/site.ts. */}
          {aboutPage.storyImage ? (
            <ImageFrame
              on="cream"
              alt={aboutPage.storyImage.alt ?? aboutPage.storyHeading}
              src={aboutPage.storyImage.src}
              placeholder={aboutPage.storyImage.placeholder}
              aspect="4 / 3"
            />
          ) : null}
        </div>
      </Section>
      ) : null}

      <Section background="white" className={hasStory ? undefined : "pt-12 md:pt-12"}>
        {aboutPage.valuesHeading ? <SectionHeading background="white" title={aboutPage.valuesHeading} /> : null}
        <ul className={clsx("grid gap-6 md:grid-cols-3", aboutPage.valuesHeading && "mt-12")}>
          {aboutPage.values.map((value) => {
            const Icon = doodles[value.icon];
            return (
              <li key={value.title} className="flex">
                <Card className="w-full">
                  <Icon size={48} className="text-green" />
                  <ValueTitle className="text-h3 mt-6 text-green">{value.title}</ValueTitle>
                  <p className="text-body mt-3 text-ink">{value.text}</p>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Hidden while aboutPage.team is empty (commented out in content/site.ts). */}
      {hasTeam ? (
        <Section background="cream">
          <SectionHeading background="cream" title={aboutPage.teamHeading} />
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
            {aboutPage.team.map((member, index) => (
              <li key={`${member.role}-${index}`}>
                <ImageFrame
                  on="cream"
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  placeholder={aboutPage.teamPhotoPlaceholder}
                  aspect="1 / 1"
                />
                <h3 className="text-h3 mt-4 text-green">{member.name}</h3>
                <p className="text-label mt-1 font-bold text-ink">{member.role}</p>
                <p className="text-body mt-2 text-ink">{member.line}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Hidden while aboutPage.visitText is commented out. Alternates with the section above so two white sections never touch. */}
      {aboutPage.visitText ? (
      <Section background={hasTeam ? "white" : "cream"} id="visit">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-h2 text-green">{aboutPage.visitHeading}</h2>
            <p className="text-body-lg mt-6 max-w-[60ch] text-ink">{aboutPage.visitText}</p>
            <Button
              variant="onCream"
              href={buildWhatsAppLink()}
              icon={<WhatsAppIcon size={20} />}
              trackEvent="whatsapp_click"
              trackLocation="about_visit"
              className="mt-8"
            >
              {contactPage.whatsappLabel}
            </Button>
          </div>
          <MapEmbed />
        </div>
      </Section>
      ) : null}

      <FinalCta />
    </main>
  );
}
