import { ImageFrame } from "@/components/ui/ImageFrame";
import { aboutPage, site } from "@/content/site";
import { isRealUrl } from "@/lib/links";

interface MapEmbedProps {
  /** CSS aspect ratio of the frame. */
  aspect?: string;
}

/** Lazy-loaded Google Map in a rounded frame. Shows a labelled placeholder until a real embed URL is set. */
export function MapEmbed({ aspect = "4 / 3" }: MapEmbedProps) {
  if (!isRealUrl(site.mapEmbedUrl)) {
    return (
      <ImageFrame
        on="cream"
        alt={aboutPage.mapTitle}
        placeholder={site.mapEmbedUrl}
        aspect={aspect}
      />
    );
  }

  return (
    <div
      className="w-full overflow-hidden rounded-lg border border-green/10 bg-white"
      style={{ aspectRatio: aspect }}
    >
      <iframe
        src={site.mapEmbedUrl}
        title={aboutPage.mapTitle}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
      />
    </div>
  );
}
