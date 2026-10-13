// Vercel Analytics custom events. The tracker script is added by components/layout/Analytics.tsx.
type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    va?: (command: "event", payload: { name: string; data?: EventParams }) => void;
  }
}

/**
 * Sends a custom event to Vercel Analytics.
 * No-op in development, and when the tracker script is not on the page.
 * Events from SRS 4.8: cta_demo_click, whatsapp_click (both with a `location` param),
 * phone_click, form_submit, video_play.
 */
export function trackEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "production") return;
  window.va?.("event", params ? { name, data: params } : { name });
}
