"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { DemoVideoSource } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

/** A demo video whose file exists. */
type PlayableVideo = DemoVideoSource & { src: string };

interface DemoVideoPlayerProps {
  video: PlayableVideo;
  title: string;
  playLabel: string;
}

export function DemoVideoPlayer({ video, title, playLabel }: DemoVideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    trackEvent("video_play");
    setPlaying(true);
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-green/10 bg-green shadow-card">
      {playing ? (
        // Starts only after the click above, never on page load.
        <video
          controls
          playsInline
          autoPlay
          poster={video.poster}
          title={title}
          className="h-full w-full bg-ink object-cover"
        >
          <source src={video.src} type="video/mp4" />
          {video.captions ? (
            <track
              kind="captions"
              src={video.captions.src}
              srcLang={video.captions.lang}
              label={video.captions.label}
              default
            />
          ) : null}
        </video>
      ) : (
        <>
          {video.poster ? (
            <Image
              src={video.poster}
              alt={video.posterAlt ?? ""}
              fill
              sizes="(min-width: 1200px) 1104px, 100vw"
              className="object-cover"
            />
          ) : null}
          <button
            type="button"
            onClick={handlePlay}
            aria-label={playLabel}
            className="absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lime text-green shadow-card transition duration-150 hover:brightness-[0.94] md:size-30"
          >
            <Play aria-hidden="true" size={40} fill="currentColor" className="ml-1" />
          </button>
        </>
      )}
    </div>
  );
}
