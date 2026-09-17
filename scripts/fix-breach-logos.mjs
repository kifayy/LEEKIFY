import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = "c:/Users/Don/nextjs-with-supabase/public/images/breaches";

async function save(file, buf) {
  await sharp(buf)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(path.join(dir, file));
  console.log("saved", file, fs.statSync(path.join(dir, file)).size);
}

// Microsoft — official 4-color windows, transparent gaps, padded for white tile
const ms = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect x="56" y="56" width="176" height="176" fill="#F25022"/>
  <rect x="280" y="56" width="176" height="176" fill="#7FBA00"/>
  <rect x="56" y="280" width="176" height="176" fill="#00A4EF"/>
  <rect x="280" y="280" width="176" height="176" fill="#FFB900"/>
</svg>`;
await save("microsoft.png", Buffer.from(ms));

// Virta Health — brand-blue tile + white wordmark (official-style icon substitute)
// Virta brand blue ≈ #0057FF / #1A66FF
const virta = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#0057FF"/>
  <text x="256" y="292" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="118" font-weight="700" letter-spacing="-2" fill="#FFFFFF">virta</text>
</svg>`;
await save("virta-health.png", Buffer.from(virta));

// Keep ASU from logo.dev (already good). Re-confirm file exists.
console.log("asu exists", fs.existsSync(path.join(dir, "asu.png")), fs.statSync(path.join(dir, "asu.png")).size);
