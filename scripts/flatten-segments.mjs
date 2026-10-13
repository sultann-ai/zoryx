// Next's static export writes route-segment prefetch files nested (out/contact/__next.contact/__PAGE__.txt),
// but the client requests them flat (out/contact/__next.contact.__PAGE__.txt). On a plain static host the flat URL
// is a 404 (console error, and navigation falls back to a full page load). This adds the flat copies next to the
// nested ones so both layouts resolve. It is a no-op when the flat files already exist.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = new URL("../out", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
let copied = 0;

function filesIn(dir, prefix = "") {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? filesIn(full, `${prefix}${name}.`) : [{ full, flat: `${prefix}${name}` }];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const file of filesIn(full)) {
        const target = join(dir, `${name}.${file.flat}`);
        if (!existsSync(target)) {
          copyFileSync(file.full, target);
          copied++;
        }
      }
    } else if (name !== "_next") {
      walk(full);
    }
  }
}

walk(OUT);
console.log(`flatten-segments: added ${copied} flat prefetch file(s)`);
