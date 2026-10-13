import type { IconProps } from "./types";

export function QrCode({ size = 48, className }: IconProps) {
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
      <rect x="6" y="6" width="14" height="14" rx="2" />
      <rect x="28" y="6" width="14" height="14" rx="2" />
      <rect x="6" y="28" width="14" height="14" rx="2" />
      <path d="M11 11h4v4h-4zM33 11h4v4h-4zM11 33h4v4h-4zM28 28h4v4h-4zM38 28h4M28 38h4M36 34v8M42 38v4" />
    </svg>
  );
}
