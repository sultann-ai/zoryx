import type { IconProps } from "./types";

export function Receipt({ size = 48, className }: IconProps) {
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
      <path d="M12 6h24v36l-4-3-4 3-4-3-4 3-4-3-4 3z" />
      <path d="M18 16h12M18 23h12M18 30h7" />
    </svg>
  );
}
