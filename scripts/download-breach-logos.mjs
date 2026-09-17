import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = "c:/Users/Don/nextjs-with-supabase/public/images/breaches";

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

async function whiteIcon(iconName, outFile) {
  let svg = await fetchText(`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${iconName}.svg`);
  svg = svg.replaceAll('fill="currentColor"', 'fill="#FFFFFF"');
  if (!svg.includes("fill=")) svg = svg.replace("<svg", '<svg fill="#FFFFFF"');
  await sharp(Buffer.from(svg), { density: 400 })
    .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(dir, outFile));
}

// Microsoft 4-color windows logo
const ms = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <rect x="8" y="8" width="112" height="112" fill="#F25022"/>
  <rect x="136" y="8" width="112" height="112" fill="#7FBA00"/>
  <rect x="8" y="136" width="112" height="112" fill="#00A4EF"/>
  <rect x="136" y="136" width="112" height="112" fill="#FFB900"/>
</svg>`;
await sharp(Buffer.from(ms)).png().toFile(path.join(dir, "microsoft.png"));

await whiteIcon("chessdotcom", "chess-com.png");
await whiteIcon("vimeo", "vimeo.png");
await whiteIcon("udemy", "udemy.png");

// Favicon-based logos (already decent) — re-fetch & normalize
for (const [file, domain] of [
  ["frontier.png", "flyfrontier.com"],
  ["virta-health.png", "virtahealth.com"],
  ["payup.png", "getpayup.com"],
  ["asu.png", "asu.edu"],
]) {
  const res = await fetch(`https://www.google.com/s2/favicons?domain=${domain}&sz=256`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf)
    .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(dir, file));
}

for (const f of fs.readdirSync(dir)) {
  console.log(f, fs.statSync(path.join(dir, f)).size);
}
