import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "onCream" | "cream" | "outlineOnCream";
  size?: "md" | "sm";
  /** Renders a link when given, otherwise a <button>. */
  href?: string;
  icon?: ReactNode;
  /** Analytics event name, e.g. "cta_demo_click". Reported by ClickTracking via a data attribute. */
  trackEvent?: string;
  /** Sent as the `location` param with the event. */
  trackLocation?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Only usable from client components. */
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}

const variants = {
  primary: "bg-lime text-green",
  secondary: "border-[1.5px] border-cream bg-transparent text-cream hover:bg-cream/10",
  onCream: "bg-green text-cream",
  cream: "bg-cream text-green",
  outlineOnCream: "border-[1.5px] border-green bg-transparent text-green hover:bg-green/10",
} as const;

const sizes = {
  md: "px-7 py-3.5",
  sm: "px-5 py-2.5",
} as const;

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  trackEvent: eventName,
  trackLocation,
  type = "button",
  disabled,
  onClick,
  className,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill text-[15px] leading-none font-bold",
    "transition duration-150 hover:-translate-y-0.5 hover:brightness-[0.94]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
  const shared = {
    className: classes,
    onClick,
    "aria-label": ariaLabel,
    "data-track": eventName,
    "data-track-location": eventName ? trackLocation : undefined,
  };

  const content = (
    <>
      {children}
      {icon ? (
        <span aria-hidden="true" className="flex shrink-0">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (href) {
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} {...shared}>
          {content}
        </Link>
      );
    }
    const external = href.startsWith("http");
    return (
      <a href={href} {...shared} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} {...shared}>
      {content}
    </button>
  );
}
