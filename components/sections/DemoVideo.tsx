import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { seeItWorking, uiLabels } from "@/content/site";
import { DemoVideoPlayer } from "./DemoVideoPlayer";

export function DemoVideo() {
  const { video, heading, text, videoCaption, placeholder } = seeItWorking;

  return (
    <Section background="cream" id="demo-video" deferRender={400}>
      <SectionHeading background="cream" align="center" title={heading} text={text} />
      <figure className="mx-auto mt-12 max-w-4xl">
        {video?.src ? (
          <DemoVideoPlayer
            video={{ ...video, src: video.src }}
            title={heading}
            playLabel={uiLabels.playVideo}
          />
        ) : (
          // No video file yet: show the poster as a still picture, or the placeholder if there is no poster.
          <ImageFrame
            on="cream"
            aspect="16 / 9"
            src={video?.poster}
            alt={video?.posterAlt ?? heading}
            placeholder={placeholder}
          />
        )}
        <figcaption className="text-label mt-4 text-center text-ink">{videoCaption}</figcaption>
      </figure>
    </Section>
  );
}
