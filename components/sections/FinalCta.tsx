import { QrCode } from "@/components/icons/QrCode";
import { Receipt } from "@/components/icons/Receipt";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { finalCta, headerCta } from "@/content/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <Section background="green" className="relative overflow-hidden" deferRender={280}>
      <Receipt
        size={96}
        className="pointer-events-none absolute top-1/2 left-12 hidden -translate-y-1/2 text-cream opacity-20 lg:block"
      />
      <QrCode
        size={96}
        className="pointer-events-none absolute top-1/2 right-12 hidden -translate-y-1/2 text-cream opacity-20 lg:block"
      />
      <SectionHeading background="green" align="center" title={finalCta.heading} text={finalCta.text} />
      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <Button variant="primary" href={headerCta.href} trackEvent="cta_demo_click" trackLocation="final_cta">
          {finalCta.primaryCta}
        </Button>
        <Button
          variant="secondary"
          href={buildWhatsAppLink()}
          icon={<WhatsAppIcon size={20} />}
          trackEvent="whatsapp_click"
          trackLocation="final_cta"
        >
          {finalCta.secondaryCta}
        </Button>
      </div>
    </Section>
  );
}
