import clsx from "clsx";

interface StickerProps {
  value: string;
  label?: string;
  shape?: "square" | "scalloped" | "circle";
  color?: "sunflower" | "sky" | "lime";
  /** Degrees, clamped to -8..8. */
  rotation?: number;
  className?: string;
}

const backgrounds = {
  sunflower: "bg-sunflower",
  sky: "bg-sky",
  lime: "bg-lime",
} as const;

// Scalloped outline: a circle with 12 bumps, as a clip-path so the colour stays a real CSS background.
const SCALLOP_CLIP = `polygon(${Array.from({ length: 120 }, (_, i) => {
  const angle = (i / 120) * Math.PI * 2;
  const radius = 46 + 3.5 * Math.cos(angle * 12);
  return `${(50 + radius * Math.cos(angle)).toFixed(2)}% ${(50 + radius * Math.sin(angle)).toFixed(2)}%`;
}).join(", ")})`;

export function Sticker({
  value,
  label,
  shape = "circle",
  color = "sunflower",
  rotation = 0,
  className,
}: StickerProps) {
  const deg = Math.max(-8, Math.min(8, rotation));
  // Long single-line facts (e.g. proof stickers) use a smaller, bolder face and the larger badge.
  const long = value.length > 8;
  return (
    <div
      className={clsx(
        "relative flex flex-col items-center justify-center p-3 text-center text-ink md:h-30 md:w-30",
        long ? "h-30 w-30" : "h-24 w-24",
        backgrounds[color],
        shape === "square" && "rounded-md",
        shape === "circle" && "rounded-full",
        className,
      )}
      style={{ rotate: `${deg}deg`, clipPath: shape === "scalloped" ? SCALLOP_CLIP : undefined }}
    >
      <span
        className={clsx(
          "font-display font-extrabold tracking-tight",
          long ? "text-[16px] leading-tight" : "text-[28px] leading-none",
        )}
      >
        {value}
      </span>
      {label ? <span className="text-label mt-1">{label}</span> : null}
    </div>
  );
}
