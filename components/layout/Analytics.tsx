import Script from "next/script";

/**
 * Vercel Analytics tracker. Rendered only for production builds made on Vercel (VERCEL=1),
 * so local builds and previews load no analytics script and log no 404 for it.
 * Analytics must also be enabled for the project in the Vercel dashboard.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") return null;

  return (
    <>
      <Script id="vercel-analytics-init" strategy="afterInteractive">
        {"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };"}
      </Script>
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" defer />
    </>
  );
}
