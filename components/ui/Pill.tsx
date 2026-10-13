import clsx from "clsx";
import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  tone?: "cream" | "green" | "outline";
  className?: string;
}

const tones = {
  cream: "bg-cream text-green",
  green: "bg-green text-cream",
  outline: "border border-current bg-transparent",
} as const;

export function Pill({ children, tone = "cream", className }: PillProps) {
  return (
    <span
      className={clsx(
        "text-label inline-flex items-center rounded-pill px-3 py-1 font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
