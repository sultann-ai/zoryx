import clsx from "clsx";
import Image from "next/image";

interface ImageFrameProps {
  alt: string;
  /** Image path under /images. Without it, a labelled placeholder is shown. */
  src?: string;
  /** Placeholder label, e.g. "[POS SCREENSHOT]". */
  placeholder: string;
  /** CSS aspect ratio, e.g. "16 / 10". */
  aspect?: string;
  /** Degrees, 2 to 4 for collage images. */
  tilt?: number;
  /** Border style for the background the frame sits on. */
  on?: "green" | "cream";
  /** No border, smaller radius. For use inside a device frame. */
  bare?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function ImageFrame({
  alt,
  src,
  placeholder,
  aspect = "16 / 10",
  tilt = 0,
  on = "green",
  bare = false,
  priority = false,
  sizes = "(min-width: 1024px) 600px, 100vw",
  className,
}: ImageFrameProps) {
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden bg-white",
        bare ? "rounded-md" : ["rounded-lg border", on === "green" ? "border-cream" : "border-green/10"],
        className,
      )}
      style={{ aspectRatio: aspect, rotate: tilt ? `${tilt}deg` : undefined }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          // An empty alt marks the frame as decorative, so it is hidden from assistive tech.
          role={alt ? "img" : undefined}
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
          className="text-label flex h-full w-full items-center justify-center wrap-anywhere border-2 border-dashed border-green/30 p-4 text-center font-medium tracking-wide text-green"
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}
