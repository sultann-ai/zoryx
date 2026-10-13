import type { IconProps } from "./types";

export function PosScreen({ size = 48, className }: IconProps) {
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
      <rect x="6" y="8" width="36" height="24" rx="3" />
      <path d="M24 32v8M16 40h16M14 18h20M14 25h10" />
    </svg>
  );
}
