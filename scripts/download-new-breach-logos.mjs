import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = "c:/Users/Don/nextjs-with-supabase/public/images/breaches";

async function saveFromUrl(file, url, { white = false } = {}) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow" });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  let buf = Buffer.from(await res.arrayBuffer());
  const ct = res.headers.get("content-type") || "";
  const text = buf.slice(0, 80).toString("utf8");
  if (ct.includes("svg") || text.includes("<svg")) {
    let svg = buf.toString("utf8");
    if (white) {
      svg = svg.replaceAll('fill="currentColor"', 'fill="#FFFFFF"');
      if (!svg.includes("fill=")) svg = svg.replace("<svg", '<svg fill="#FFFFFF"');
    }
    buf = Buffer.from(svg);
  }
  await sharp(buf, { density: 400 })
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(dir, file));
  console.log("ok", file, fs.statSync(path.join(dir, file)).size);
}

const jobs = [
  ["osmo-wallet.png", [
    "https://img.logo.dev/osmosis.zone?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&format=png&size=512",
    "https://img.logo.dev/osmo.finance?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&format=png&size=512",
    "https://www.google.com/s2/favicons?domain=osmo.finance&sz=256",
  ]],
  ["restaurant-depot.png", [
    "https://img.logo.dev/restaurantdepot.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&format=png&size=512",
    "https://www.google.com/s2/favicons?domain=restaurantdepot.com&sz=256",
  ]],
  ["carhartt.png", [
    "https://img.logo.dev/carhartt.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&format=png&size=512",
    "https://cdn.simpleicons.org/carhartt/FFFFFF",
    "https://www.google.com/s2/favicons?domain=carhartt.com&sz=256",
  ]],
  ["uber-freight.png", [
    "https://img.logo.dev/uber.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&format=png&size=512",
    "https://cdn.simpleicons.org/uber/FFFFFF",
    "https://www.google.com/s2/favicons?domain=uber.com&sz=256",
  ]],
  ["allstate.png", [
    "https://img.logo.dev/allstate.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&format=png&size=512",
    "https://www.google.com/s2/favicons?domain=allstate.com&sz=256",
  ]],
  ["bonava.png", [
    "https://img.logo.dev/bonava.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&format=png&size=512",
    "https://www.google.com/s2/favicons?domain=bonava.com&sz=256",
  ]],
];

for (const [file, urls] of jobs) {
  let ok = false;
  for (const url of urls) {
    try {
      await saveFromUrl(file, url, { white: url.includes("simpleicons") });
      ok = true;
      break;
    } catch (e) {
      console.log("fail", file, url, e instanceof Error ? e.message : e);
    }
  }
  if (!ok) {
    const label = file.replace(".png", "").split("-")[0].slice(0, 1).toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
      <rect width="512" height="512" rx="96" fill="#111827"/>
      <text x="256" y="300" text-anchor="middle" font-family="Arial" font-size="220" font-weight="700" fill="#FFFFFF">${label}</text>
    </svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(dir, file));
    console.log("fallback", file);
  }
}
