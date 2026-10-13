import clsx from "clsx";
import { site } from "@/content/site";
import { LogoMark, type LogoVariant } from "./LogoMark";

interface LogoProps {
  variant?: LogoVariant;
  /** Show the small "POS" pill after the wordmark. */
  showPos?: boolean;
  className?: string;
}

const text = {
  primary: { word: "text-green", pill: "bg-green text-cream" },
  reversed: { word: "text-cream", pill: "bg-lime text-green" },
  black: { word: "text-ink", pill: "bg-ink text-cream" },
} as const;

export function Logo({ variant = "primary", showPos = false, className }: LogoProps) {
  const { word, pill } = text[variant];
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <LogoMark variant={variant} size={32} />
      <span className={clsx("font-display text-[28px] leading-none font-extrabold tracking-tight", word)}>
        {site.shortName.toLowerCase()}
      </span>
      {showPos ? (
        <span className={clsx("text-label rounded-pill px-2 py-1 leading-none font-bold", pill)}>POS</span>
      ) : null}
    </span>
  );
}
