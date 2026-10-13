"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * One delegated click listener for the whole site. Any element with `data-track="<event>"`
 * (and optionally `data-track-location`) reports that event, so Button and TrackedLink need no client JS.
 */
export function ClickTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-track]");
      const name = element?.dataset.track;
      if (!element || !name) return;
      const location = element.dataset.trackLocation;
      trackEvent(name, location ? { location } : undefined);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
