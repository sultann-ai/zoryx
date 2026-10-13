import { ChefHat } from "@/components/icons/ChefHat";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Pill } from "@/components/ui/Pill";
import { headerCta, hero } from "@/content/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const SEPARATOR = " · ";

export function Hero() {
  const trustItems = hero.trustLine.split(SEPARATOR);
  const [orderTitle, ...orderDetails] = hero.floatingCard.split(SEPARATOR);

  return (
    <>
      <section className="on-dark relative bg-green pt-12 pb-12 text-cream md:pt-24 md:pb-16">
        <ChefHat
          size={160}
          className="pointer-events-none absolute top-6 right-6 hidden text-cream opacity-10 md:block lg:right-12"
        />
        <Container className="grid items-center gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
          <div>
            <Pill tone="cream" className="text-center">
              {hero.eyebrow}
            </Pill>
            <h1 className="text-display mt-6 text-cream">{hero.headline}</h1>
            <p className="text-body-lg mt-6 max-w-[60ch] text-cream/85">{hero.subline}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                variant="primary"
                href={headerCta.href}
                trackEvent="cta_demo_click"
                trackLocation="hero"
              >
                {hero.primaryCta}
              </Button>
              <Button
                variant="secondary"
                href={buildWhatsAppLink()}
                icon={<WhatsAppIcon size={20} />}
                trackEvent="whatsapp_click"
                trackLocation="hero"
              >
                {hero.secondaryCta}
              </Button>
            </div>
            <ul className="text-body mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-cream/85">
              {trustItems.map((item, index) => (
                <li key={item} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-lime" />
                  ) : null}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div role="group" aria-label={hero.visualAlt} className="relative pb-12 lg:pb-8">
            {/* Laptop */}
            <div className="mr-[10%]">
              <div className="rounded-t-lg bg-ink p-2 md:p-3">
                <ImageFrame
                  bare
                  alt={hero.laptopScreenshot.alt ?? ""}
                  src={hero.laptopScreenshot.src}
                  placeholder={hero.laptopScreenshot.placeholder}
                  aspect="16 / 10"
                  priority
                />
              </div>
              <div className="mx-[-4%] h-3 rounded-b-lg bg-cream" />
            </div>

            {/* Phone */}
            <div className="absolute right-0 bottom-0 w-[30%] rounded-lg bg-ink p-1.5 shadow-card md:p-2">
              <ImageFrame
                bare
                alt={hero.phoneScreenshot.alt ?? ""}
                src={hero.phoneScreenshot.src}
                placeholder={hero.phoneScreenshot.placeholder}
                aspect="9 / 19"
                priority
              />
            </div>

            {/* Floating new-order card */}
            <div
              className="absolute right-[24%] bottom-4 rounded-md bg-cream p-3 text-ink shadow-card md:right-[28%] md:p-4"
              style={{ rotate: "-3deg" }}
            >
              <p className="text-label font-bold text-green">{orderTitle}</p>
              <p className="text-body font-bold">{orderDetails.join(SEPARATOR)}</p>
            </div>
          </div>
        </Container>
      </section>
      <ArcDivider />
    </>
  );
}
