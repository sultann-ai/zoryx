// Fails (exit 1) if content/site.ts still has "DEMO:" or a "[" placeholder inside a string.
// Comments and code are ignored. Blank fill-in brackets like "[ ]" are allowed.
import { readFileSync } from "node:fs";

const file = new URL("../content/site.ts", import.meta.url);
const src = readFileSync(file, "utf8");

const matches = [];
let line = 1;
let i = 0;

while (i < src.length) {
  const c = src[i];
  const next = src[i + 1];

  if (c === "\n") {
    line++;
    i++;
  } else if (c === "/" && next === "/") {
    while (i < src.length && src[i] !== "\n") i++;
  } else if (c === "/" && next === "*") {
    i += 2;
    while (i < src.length && !(src[i] === "*" && src[i + 1] === "/")) {
      if (src[i] === "\n") line++;
      i++;
    }
    i += 2;
  } else if (c === '"' || c === "'" || c === "`") {
    const startLine = line;
    let text = "";
    i++;
    while (i < src.length && src[i] !== c) {
      if (src[i] === "\\") {
        text += src[i + 1];
        i += 2;
        continue;
      }
      if (src[i] === "\n") line++;
      text += src[i++];
    }
    i++;
    if (/DEMO:/.test(text) || /\[(?!\s*\])/.test(text)) {
      matches.push({ line: startLine, text });
    }
  } else {
    i++;
  }
}

// Production builds fail while placeholders remain. Preview builds (Vercel preview deployments, or --warn) only warn.
const lenient = process.argv.includes("--warn") || process.env.VERCEL_ENV === "preview";

if (matches.length > 0) {
  const out = lenient ? console.warn : console.error;
  out(`check:content ${lenient ? "warning" : "failed"}. ${matches.length} placeholder(s) in content/site.ts:\n`);
  for (const m of matches) {
    const short = m.text.length > 90 ? `${m.text.slice(0, 90)}...` : m.text;
    out(`  line ${m.line}: ${short}`);
  }
  if (lenient) {
    out("\nContinuing: this is a preview build. A production build (pnpm build) will fail until these are replaced.");
  } else {
    out("\nReplace them in content/site.ts (see docs/SRS.md section 10), or run pnpm build:preview for a non-production build.");
    process.exit(1);
  }
} else {
  console.log("check:content passed. No DEMO: or [ placeholders found.");
}
