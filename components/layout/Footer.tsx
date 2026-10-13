import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { Logo } from "@/components/icons/Logo";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Container } from "@/components/ui/Container";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { contactPage, footer, site, uiLabels } from "@/content/site";
import { isRealUrl, mailtoHref, telHref } from "@/lib/links";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const linkClass =
  "text-body inline-flex min-h-11 min-w-11 items-center transition-colors duration-150 hover:text-lime";

const socials = [
  { key: "instagram", Icon: InstagramIcon },
  { key: "facebook", Icon: FacebookIcon },
  { key: "linkedin", Icon: LinkedinIcon },
] as const;

function ColumnHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-label mb-4 font-bold text-lime uppercase">{children}</h2>;
}

function ContactRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden="true" className="mt-3 shrink-0">
        {icon}
      </span>
      {children}
    </li>
  );
}

export function Footer() {
  const { company, solutions, contactHeading } = footer.columns;

  return (
    <footer className="defer-render on-dark bg-green-deep py-18 text-cream">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div>
            <Link href="/" className="inline-flex min-h-11 items-center rounded-sm">
              <Logo variant="reversed" showPos />
            </Link>
            <p className="text-body mt-4 max-w-[40ch]">{site.footerDescription}</p>
          </div>

          <nav aria-label={company.heading}>
            <ColumnHeading>{company.heading}</ColumnHeading>
            <ul>
              {company.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={solutions.heading}>
            <ColumnHeading>{solutions.heading}</ColumnHeading>
            <ul>
              {solutions.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>{contactHeading}</ColumnHeading>
            <ul>
              <ContactRow icon={<Phone size={18} />}>
                <TrackedLink
                  href={telHref(site.phone)}
                  event="phone_click"
                  location="footer"
                  className={linkClass}
                >
                  {site.phone}
                </TrackedLink>
              </ContactRow>
              <ContactRow icon={<WhatsAppIcon size={18} />}>
                <TrackedLink
                  href={buildWhatsAppLink()}
                  event="whatsapp_click"
                  location="footer"
                  className={linkClass}
                >
                  {contactPage.whatsappLabel}
                </TrackedLink>
              </ContactRow>
              <ContactRow icon={<Mail size={18} />}>
                <a href={mailtoHref(site.email)} className={linkClass}>
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon={<MapPin size={18} />}>
                <p className="text-body py-3">{site.address}</p>
              </ContactRow>
              <ContactRow icon={<Clock size={18} />}>
                <p className="text-body py-3">{site.supportHours}</p>
              </ContactRow>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-cream/20 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex items-center gap-2">
            {socials.map(({ key, Icon }) => {
              const url = site.social[key];
              const label = uiLabels.social[key];
              return (
                <li key={key}>
                  {isRealUrl(url) ? (
                    <a
                      href={url}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-11 items-center justify-center rounded-pill transition-colors duration-150 hover:text-lime"
                    >
                      <Icon size={22} />
                    </a>
                  ) : (
                    // Placeholder URL: show the icon unlinked, titled with the marker.
                    <span
                      title={url}
                      role="img"
                      aria-label={`${label} ${url}`}
                      className="flex size-11 items-center justify-center opacity-60"
                    >
                      <Icon size={22} />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <nav aria-label={uiLabels.footerLegalNav}>
            <ul className="flex flex-wrap gap-x-6">
              {footer.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-label">{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
