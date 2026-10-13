// Post-build checks on the static export in /out (run `pnpm build` first):
//   links     every internal link and #hash resolves; every external link has rel="noopener noreferrer"
//   contact   tel:, mailto: and wa.me links match the values in content/site.ts
//   seo       per-page metadata, sitemap, robots, favicon, app icons and the Open Graph image
// Exit code 1 if anything fails. Needs Node with TypeScript type stripping (Node 22.18+ / 24) to read content.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Node prints a module-type warning when it strips types from content/site.ts; it is noise here.
process.removeAllListeners("warning");
const { site, seeItWorking } = await import("../content/site.ts");

const OUT = new URL("../out", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
if (!existsSync(OUT)) { console.error("out/ not found. Run `pnpm build` first."); process.exit(1); }

const results = []; // { check, ok, detail }
const record = (check, ok, detail = "") => results.push({ check, ok, detail });
const problems = {};
const problem = (group, text) => (problems[group] ||= []).push(text);

/* ---------- pages ---------- */
const pages = []; // { route, file, html (scripts stripped), raw }
(function walk(dir, rel = "") {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) { if (!name.startsWith("_next") && !name.startsWith("__next")) walk(full, `${rel}/${name}`); continue; }
    // Next also writes /404/ and /_not-found/ copies of 404.html; only 404.html is checked as the error page.
    const duplicateErrorPage = rel === "/404" || rel === "/_not-found";
    if ((name === "index.html" || name === "404.html") && !duplicateErrorPage) {
      const raw = readFileSync(full, "utf8");
      pages.push({ route: name === "404.html" ? "/404.html" : `${rel}/`, file: full, raw, html: raw.replace(/<script[\s\S]*?<\/script>/g, "") });
    }
  }
})(OUT);
const pageByRoute = new Map(pages.map((p) => [p.route, p]));
// Pages marked noindex (error pages, the placeholder case-study route) are not expected in the sitemap or to carry full metadata.
const indexable = pages.filter((p) => p.route !== "/404.html" && !/<meta name="robots" content="noindex"/.test(p.raw));

const attrs = (tag) => {
  const out = {};
  for (const m of tag.matchAll(/([\w:-]+)(?:="([^"]*)")?/g)) out[m[1]] = m[2] ?? "";
  return out;
};
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");

/* ---------- 1. links ---------- */
let internal = 0, external = 0, hashes = 0;
const wanted = { tel: [], mailto: [], wa: [] };
for (const page of pages) {
  for (const m of page.html.matchAll(/<a\s[^>]*>/g)) {
    const a = attrs(m[0]);
    const href = decode(a.href ?? "");
    if (!href) continue;
    if (href.startsWith("tel:")) { wanted.tel.push([page.route, href]); continue; }
    if (href.startsWith("mailto:")) { wanted.mailto.push([page.route, href]); continue; }
    if (/^https?:\/\//.test(href)) {
      external++;
      if (/^https:\/\/wa\.me\//.test(href)) wanted.wa.push([page.route, href]);
      const rel = (a.rel || "").split(/\s+/);
      if (!(rel.includes("noopener") && rel.includes("noreferrer"))) problem("external-rel", `${page.route} -> ${href.slice(0, 60)} (rel="${a.rel || ""}")`);
      continue;
    }
    if (a.target === "_blank" && !/noopener/.test(a.rel || "")) problem("external-rel", `${page.route} target=_blank without noopener: ${href}`);
    // internal
    internal++;
    const [pathAndQuery, hash] = href.split("#");
    const path = pathAndQuery.split("?")[0] || page.route;
    const target = path.startsWith("/") ? path : new URL(path, `http://x${page.route}`).pathname;
    const asPage = pageByRoute.get(target.endsWith("/") ? target : `${target}/`);
    const asFile = existsSync(join(OUT, target)) && statSync(join(OUT, target)).isFile();
    if (!asPage && !asFile) { problem("internal", `${page.route} -> ${href} (no such page)`); continue; }
    if (!target.endsWith("/") && asPage && !asFile) problem("internal-slash", `${page.route} -> ${href} (missing trailing slash)`);
    if (hash) {
      hashes++;
      const dest = asPage || page;
      if (!new RegExp(`\\sid="${hash}"`).test(dest.raw)) problem("hash", `${page.route} -> ${href} (#${hash} not found on ${dest.route})`);
    }
  }
}
record("Internal links resolve", !problems.internal && !problems["internal-slash"], `${internal} internal links (${hashes} with #hash) across ${pages.length} pages` + [...(problems.internal || []), ...(problems["internal-slash"] || [])].map((p) => `\n      ${p}`).join(""));
record("#hash targets exist", !problems.hash, (problems.hash || []).map((p) => `\n      ${p}`).join("") || `${hashes} hash links`);
record('External links have rel="noopener noreferrer"', !problems["external-rel"], `${external} external links` + (problems["external-rel"] || []).map((p) => `\n      ${p}`).join(""));

/* ---------- 2. contact links use the content values ---------- */
const digits = (s) => s.replace(/\D/g, "");
const expectTel = "tel:" + site.phone.replace(/[^\d+]/g, "");
const expectMail = "mailto:" + (site.email.match(/[^\s:]+@[^\s]+/)?.[0] ?? site.email);
const expectWa = digits(site.whatsappNumber);
const bad = [];
for (const [r, h] of wanted.tel) if (h !== expectTel) bad.push(`${r}: ${h} (content: ${expectTel})`);
for (const [r, h] of wanted.mailto) if (h !== expectMail) bad.push(`${r}: ${h} (content: ${expectMail})`);
for (const [r, h] of wanted.wa) if (!h.startsWith(`https://wa.me/${expectWa}?text=`)) bad.push(`${r}: ${h.slice(0, 50)} (content: ${expectWa})`);
record("tel:, mailto:, wa.me links match content/site.ts", bad.length === 0 && wanted.tel.length > 0 && wanted.mailto.length > 0 && wanted.wa.length > 0,
  `tel x${wanted.tel.length}, mailto x${wanted.mailto.length}, wa.me x${wanted.wa.length}` + bad.map((p) => `\n      ${p}`).join(""));
const demoValues = [["phone", site.phone], ["email", site.email], ["WhatsApp number", site.whatsappNumber]].filter(([, v]) => /DEMO:|\[/.test(v));
record("Contact values are real (not demo)", demoValues.length === 0, demoValues.map(([k, v]) => `${k} is still "${v}"`).join("; ") || "phone, email and WhatsApp number are set");

/* ---------- 3. seo / metadata ---------- */
const meta = (html, re) => (html.match(re) || [])[1];
const seoBad = [];
for (const p of pages.filter((q) => !/<meta name="robots" content="noindex"/.test(q.raw) || q.route === "/404.html")) {
  const h = p.raw;
  const need = {
    title: meta(h, /<title>([^<]+)<\/title>/),
    description: meta(h, /<meta name="description" content="([^"]+)"/),
    "og:title": meta(h, /<meta property="og:title" content="([^"]+)"/),
    "og:image": meta(h, /<meta property="og:image" content="([^"]+)"/),
    "twitter:card": meta(h, /<meta name="twitter:card" content="([^"]+)"/),
  };
  if (p.route !== "/404.html") { need.canonical = meta(h, /<link rel="canonical" href="([^"]+)"/); need["og:url"] = meta(h, /<meta property="og:url" content="([^"]+)"/); }
  for (const [k, v] of Object.entries(need)) if (!v) seoBad.push(`${p.route}: missing ${k}`);
  if (need.canonical && need.canonical !== `https://${site.domain}${p.route}`) seoBad.push(`${p.route}: canonical is ${need.canonical}`);
}
record("Every page has title, description, canonical, Open Graph and Twitter tags", seoBad.length === 0, `${pages.length} pages` + seoBad.map((p) => `\n      ${p}`).join(""));

const png = (file) => { const b = readFileSync(file); return b.slice(1, 4).toString() === "PNG" ? [b.readUInt32BE(16), b.readUInt32BE(20)] : null; };
const files = [];
const fileCheck = (label, path, test) => { const full = join(OUT, path); const ok = existsSync(full) && (test ? test(full) : true); files.push(`${ok ? "ok  " : "FAIL"} ${label} (${path})`); return ok; };
const ogOk = fileCheck("Open Graph image 1200x630", "og/default.png", (f) => { const d = png(f); return d && d[0] === 1200 && d[1] === 630; });
const iconOk = [
  fileCheck("favicon.ico", "favicon.ico", (f) => readFileSync(f).readUInt16LE(2) === 1),
  fileCheck("icon.svg", "icon.svg"),
  fileCheck("apple-touch-icon 180x180", "icons/apple-touch-icon.png", (f) => { const d = png(f); return d && d[0] === 180 && d[1] === 180; }),
  fileCheck("icon 512x512", "icons/icon-512.png", (f) => { const d = png(f); return d && d[0] === 512 && d[1] === 512; }),
  fileCheck("icon 32x32", "icons/icon-32.png", (f) => { const d = png(f); return d && d[0] === 32 && d[1] === 32; }),
  fileCheck("manifest", "manifest.webmanifest"),
].every(Boolean);
record("Open Graph image present (1200x630 PNG)", ogOk);
record("Favicon and app icons present", iconOk);

// The demo video file must exist (and stay under 15 MB, SRS section 10) when seeItWorking.video.src is set.
const videoSrc = seeItWorking.video?.src;
if (videoSrc) {
  const videoFile = join(OUT, videoSrc);
  const exists = existsSync(videoFile);
  const mb = exists ? statSync(videoFile).size / 1024 / 1024 : 0;
  record(
    "Demo video file present and under 15 MB",
    exists && mb < 15,
    exists ? `${videoSrc} is ${mb.toFixed(1)} MB` : `${videoSrc} is missing. Put the MP4 at public${videoSrc}`,
  );
}

const robots = existsSync(join(OUT, "robots.txt")) ? readFileSync(join(OUT, "robots.txt"), "utf8") : "";
record("robots.txt present and points to the sitemap", robots.includes(`Sitemap: https://${site.domain}/sitemap.xml`));
const sitemap = existsSync(join(OUT, "sitemap.xml")) ? readFileSync(join(OUT, "sitemap.xml"), "utf8") : "";
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const routesWanted = indexable.map((p) => p.route);
const sitemapBad = [
  ...locs.filter((l) => !pageByRoute.has(l.replace(`https://${site.domain}`, ""))).map((l) => `${l} has no page`),
  ...routesWanted.filter((r) => !locs.includes(`https://${site.domain}${r}`)).map((r) => `${r} missing from sitemap`),
];
record("sitemap.xml lists every page and only real pages", locs.length > 0 && sitemapBad.length === 0, `${locs.length} URLs` + sitemapBad.map((p) => `\n      ${p}`).join(""));
console.log(`\nAsset files:\n  ${files.join("\n  ")}`);
console.log(`\nSitemap URLs:\n  ${locs.join("\n  ")}`);

/* ---------- report ---------- */
console.log("\nResults:");
for (const r of results) console.log(`  ${r.ok ? "PASS" : "FAIL"}  ${r.check}${r.detail ? "  - " + r.detail : ""}`);
const failed = results.filter((r) => !r.ok);
console.log(`\n${failed.length === 0 ? "check:site passed." : `check:site: ${failed.length} failing check(s).`}`);
process.exit(failed.length === 0 ? 0 : 1);
