// Fails (exit 1) if public/images holds raster images that are not WebP. Images use next/image with
// `unoptimized: true` (static export), so the files must already be WebP and sized sensibly.
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const root = new URL("../public/images", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const RASTER = new Set([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".avif"]);
const MAX_KB = 200;
const problems = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) walk(file);
    else if (RASTER.has(extname(name).toLowerCase())) problems.push(`${relative(root, file)}: convert to WebP`);
    else if (extname(name).toLowerCase() === ".webp" && statSync(file).size > MAX_KB * 1024) {
      problems.push(`${relative(root, file)}: ${(statSync(file).size / 1024).toFixed(0)} KB, over ${MAX_KB} KB; resize or compress`);
    }
  }
}

if (existsSync(root)) walk(root);
if (problems.length) {
  console.error("check:images failed:\n" + problems.map((p) => "  " + p).join("\n"));
  process.exit(1);
}
console.log("check:images passed. All images in public/images are WebP and under " + MAX_KB + " KB.");
