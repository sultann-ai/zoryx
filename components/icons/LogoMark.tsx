import clsx from "clsx";

export type LogoVariant = "primary" | "reversed" | "black";

interface LogoMarkProps {
  variant?: LogoVariant;
  size?: number;
  className?: string;
}

const marks = {
  primary: { box: "fill-green", z: "stroke-lime" },
  reversed: { box: "fill-lime", z: "stroke-green" },
  black: { box: "fill-ink", z: "stroke-cream" },
} as const;

/** Stand-in mark. Replace with the final SVG from the brand kit. */
export function LogoMark({ variant = "primary", size = 32, className }: LogoMarkProps) {
  const { box, z } = marks[variant];
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      className={clsx("shrink-0", className)}
    >
      <rect width="32" height="32" rx="8" className={box} />
      <path
        d="M10 11h12L10 21h12"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={z}
      />
    </svg>
  );
}
