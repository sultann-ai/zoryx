import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  surface?: "cream" | "white";
  shadow?: boolean;
  /** Dashed, flat look for something not available yet. Colours stay solid for contrast. */
  muted?: boolean;
  className?: string;
}

export function Card({ children, surface = "cream", shadow = false, muted = false, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg border p-6 text-ink md:p-8",
        muted ? "border-dashed border-green/40" : "border-green/10",
        surface === "cream" ? "bg-cream" : "bg-white",
        shadow && "shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
