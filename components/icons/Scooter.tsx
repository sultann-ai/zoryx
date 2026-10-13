import type { IconProps } from "./types";

export function Scooter({ size = 48, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="36" r="5" />
      <circle cx="38" cy="36" r="5" />
      <rect x="6" y="12" width="16" height="14" rx="2" />
      <path d="M17 36h16M38 36l-3-22h5M14 26v5" />
    </svg>
  );
}
