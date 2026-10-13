import type { IconProps } from "./types";

export function ChefHat({ size = 48, className }: IconProps) {
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
      <path d="M14 30a8 8 0 1 1 4-14.9 8 8 0 0 1 12 0 8 8 0 1 1 4 14.9V40H14z" />
      <path d="M14 34h20" />
    </svg>
  );
}
