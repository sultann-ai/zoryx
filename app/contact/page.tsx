import { Clock, MapPin, Mail, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { JsonLd } from "@/components/layout/JsonLd";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { contactPage, seo, site } from "@/content/site";
import { mailtoHref, telHref } from "@/lib/links";
import { buildMetadata } from "@/lib/metadata";
import { localBusinessJsonLd } from "@/lib/structured-data";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata = buildMetadata(seo.contact, "/contact/");

const linkClass = "underline underline-offset-4 hover:text-green";

function DetailRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="text-body-lg flex items-start gap-4 text-ink">
      <span aria-hidden="true" className="mt-1 shrink-0 text-green">
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <main>
        <section className="on-dark bg-green pt-12 pb-12 text-cream md:pt-16 md:pb-16">
          <Container>
            <SectionHeading
              as="h1"
              background="green"
              title={contactPage.heading}
              text={contactPage.intro}
            />
          </Container>
        </section>
        <ArcDivider to="white" />

        <Section background="white" className="pt-12 md:pt-12">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-12">
              <TrackedLink
                href={buildWhatsAppLink()}
                event="whatsapp_click"
                location="contact_card"
                className="block rounded-lg bg-lime p-8 text-green shadow-card transition duration-150 hover:-translate-y-0.5 hover:brightness-[0.94] md:p-12"
              >
                <WhatsAppIcon size={64} />
                <span className="text-h2 mt-6 block">{contactPage.whatsappLabel}</span>
              </TrackedLink>

              <ul className="space-y-5">
                <DetailRow icon={<Phone size={24} />}>
                  <TrackedLink
                    href={telHref(site.phone)}
                    event="phone_click"
                    location="contact_details"
                    className={linkClass}
                  >
                    {site.phone}
                  </TrackedLink>
                </DetailRow>
                <DetailRow icon={<Mail size={24} />}>
                  <a href={mailtoHref(site.email)} className={linkClass}>
                    {site.email}
                  </a>
                </DetailRow>
                <DetailRow icon={<MapPin size={24} />}>{site.address}</DetailRow>
                <DetailRow icon={<Clock size={24} />}>{site.supportHours}</DetailRow>
                <DetailRow icon={<MessageCircle size={24} />}>{site.replyTime}</DetailRow>
              </ul>
            </div>

            <Card surface="cream" shadow className="md:p-12">
              <ContactForm />
            </Card>
          </div>
        </Section>

        <Section background="cream">
          <MapEmbed aspect="16 / 9" />
        </Section>
      </main>
    </>
  );
}
