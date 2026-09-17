import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = "c:/Users/Don/nextjs-with-supabase/public/images/breaches";

async function savePng(file, input) {
  await sharp(input, { density: 400 })
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(path.join(dir, file));
  console.log("saved", file, fs.statSync(path.join(dir, file)).size);
}

async function tryFetch(urls) {
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        redirect: "follow",
      });
      if (!res.ok) {
        console.log("fail", res.status, url.slice(0, 90));
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("html") || buf.length < 500) {
        console.log("skip", ct, buf.length, url.slice(0, 90));
        continue;
      }
      console.log("got", buf.length, ct, url.slice(0, 90));
      return buf;
    } catch (e) {
      console.log("err", e instanceof Error ? e.message : e);
    }
  }
  return null;
}

// --- ASU: crisp maroon tile + gold sun + ASU letters (vector, never blurry) ---
const asu = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#8C1D40"/>
  <!-- gold sun -->
  <circle cx="256" cy="168" r="46" fill="#FFC627"/>
  <g stroke="#FFC627" stroke-width="8" stroke-linecap="round">
    <line x1="256" y1="96" x2="256" y2="112"/>
    <line x1="256" y1="224" x2="256" y2="240"/>
    <line x1="184" y1="168" x2="200" y2="168"/>
    <line x1="312" y1="168" x2="328" y2="168"/>
    <line x1="205" y1="117" x2="216" y2="128"/>
    <line x1="296" y1="208" x2="307" y2="219"/>
    <line x1="307" y1="117" x2="296" y2="128"/>
    <line x1="216" y1="208" x2="205" y2="219"/>
  </g>
  <circle cx="256" cy="168" r="28" fill="#8C1D40"/>
  <text x="256" y="360" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="150" font-weight="700" fill="#FFFFFF" letter-spacing="8">ASU</text>
</svg>`;
await savePng("asu.png", Buffer.from(asu));

// --- Bonava: official-style wordmark on white (brand teal/dark green) ---
// Bonava brand color ≈ #00573F / deep forest green
const bonava = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#FFFFFF"/>
  <text x="256" y="290" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="700" fill="#00573F" letter-spacing="-1">bonava</text>
</svg>`;

// Prefer a real logo if available
const bonavaRemote = await tryFetch([
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bonava_logo.svg/512px-Bonava_logo.svg.png",
  "https://cdn.simpleicons.org/bonava",
  "https://logo.clearbit.com/bonava.com",
]);
if (bonavaRemote) {
  await savePng("bonava.png", bonavaRemote);
} else {
  await savePng("bonava.png", Buffer.from(bonava));
}

// --- Osmo Wallet: clean flask-style mark on dark purple (Osmosis-inspired, icon only) ---
const osmo = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#1B1035"/>
  <!-- flask body -->
  <path d="M210 96 h92 v78 c0 18 8 34 22 48 l78 86 c22 24 28 48 28 78 0 58-48 94-106 94 H196 c-58 0-106-36-106-94 0-30 6-54 28-78 l78-86 c14-14 22-30 22-48 V96z" fill="#7C3AED"/>
  <path d="M210 96 h92 v28 H210 z" fill="#E9D5FF"/>
  <!-- liquid -->
  <ellipse cx="256" cy="340" rx="108" ry="70" fill="#A78BFA"/>
  <circle cx="220" cy="320" r="18" fill="#F9A8D4" opacity="0.95"/>
  <circle cx="290" cy="350" r="14" fill="#F472B6" opacity="0.9"/>
  <circle cx="250" cy="365" r="10" fill="#DDD6FE"/>
</svg>`;

const osmoRemote = await tryFetch([
  "https://cdn.simpleicons.org/osmosis/FFFFFF",
  "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
  "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmosis.png",
]);
if (osmoRemote) {
  // Place white/brand icon on dark purple tile
  const icon = await sharp(osmoRemote, { density: 400 })
    .resize(320, 320, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 27, g: 16, b: 53, alpha: 1 },
    },
  })
    .composite([{ input: icon, gravity: "center" }])
    .png()
    .toFile(path.join(dir, "osmo-wallet.png"));
  console.log("saved osmo-wallet.png (remote)", fs.statSync(path.join(dir, "osmo-wallet.png")).size);
} else {
  await savePng("osmo-wallet.png", Buffer.from(osmo));
}

for (const f of ["asu.png", "bonava.png", "osmo-wallet.png"]) {
  const m = await sharp(path.join(dir, f)).metadata();
  console.log(f, m.width, m.hasAlpha);
}
