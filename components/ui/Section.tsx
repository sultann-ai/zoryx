import clsx from "clsx";
import type { ReactNode } from "react";
import { Container } from "./Container";

export type SectionBackground = "green" | "green-deep" | "cream" | "tomato" | "white";

interface SectionProps {
  background: SectionBackground;
  id?: string;
  /** Wrap children in Container. Turn off for full-bleed content. */
  contained?: boolean;
  /**
   * Skip rendering while off-screen. Use for sections well below the fold.
   * A number is the estimated content height in px (mobile) used as the placeholder size,
   * so the page does not jump when the section renders.
   */
  deferRender?: boolean | number;
  className?: string;
  children: ReactNode;
}

const styles: Record<SectionBackground, string> = {
  green: "on-dark bg-green text-cream",
  "green-deep": "on-dark bg-green-deep text-cream",
  cream: "bg-cream text-ink",
  white: "bg-white text-ink",
  // White on tomato only at 24px+ bold (CLAUDE.md section 5).
  tomato: "on-dark bg-tomato text-white",
};

export function Section({
  background,
  id,
  contained = true,
  deferRender = false,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx("py-18 md:py-30", styles[background], deferRender && "defer-render", className)}
      style={typeof deferRender === "number" ? { containIntrinsicSize: `auto ${deferRender}px` } : undefined}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
