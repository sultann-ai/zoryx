import clsx from "clsx";
import type { SectionBackground } from "./Section";

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  text?: string;
  align?: "center" | "left";
  background: SectionBackground;
  /** Heading level. Use "h1" once per page. */
  as?: "h1" | "h2";
  className?: string;
}

const tone: Record<SectionBackground, { eyebrow: string; title: string; text: string }> = {
  green: { eyebrow: "text-lime", title: "text-cream", text: "text-cream" },
  "green-deep": { eyebrow: "text-lime", title: "text-cream", text: "text-cream" },
  cream: { eyebrow: "text-green", title: "text-green", text: "text-ink" },
  white: { eyebrow: "text-green", title: "text-green", text: "text-ink" },
  tomato: { eyebrow: "text-white", title: "text-cream", text: "text-white" },
};

export function SectionHeading({
  title,
  eyebrow,
  text,
  align = "left",
  background,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const colors = tone[background];
  return (
    <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={clsx("text-label mb-3 uppercase", colors.eyebrow)}>{eyebrow}</p>
      ) : null}
      <Heading className={clsx("text-h2 text-balance", colors.title)}>{title}</Heading>
      {text ? (
        <p className={clsx("text-body-lg mt-4 max-w-[65ch]", align === "center" && "mx-auto", colors.text)}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
