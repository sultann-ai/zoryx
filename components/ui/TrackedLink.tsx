import type { ReactNode } from "react";

interface TrackedLinkProps {
  href: string;
  /** Analytics event, e.g. "whatsapp_click" or "phone_click". Reported by ClickTracking. */
  event: string;
  location: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

/** Plain external/tel/mailto link tagged for the delegated click tracker (no client JS of its own). */
export function TrackedLink({
  href,
  event,
  location,
  children,
  className,
  "aria-label": ariaLabel,
}: TrackedLinkProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      data-track={event}
      data-track-location={location}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
