import type { IconProps } from "./types";

export function Chart({ size = 48, className }: IconProps) {
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
      <path d="M8 8v32h32" />
      <rect x="14" y="26" width="6" height="14" rx="1" />
      <rect x="24" y="18" width="6" height="22" rx="1" />
      <rect x="34" y="10" width="6" height="30" rx="1" />
    </svg>
  );
}
