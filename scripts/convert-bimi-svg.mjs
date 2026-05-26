/**
 * Convert a logo image into a BIMI-compliant SVG (<=32KB, 320x320, tiny-ps).
 * Usage: node scripts/convert-bimi-svg.mjs [input.webp|svg] [output.svg]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import sharp from "sharp";
import potrace from "potrace";
import { optimize } from "svgo";

const tracePng = promisify(potrace.trace);
const posterizePng = promisify(potrace.posterize);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const input =
  process.argv[2] ?? path.join(root, "public/assets/pathpickerlogo.svg");
const output =
  process.argv[3] ?? path.join(root, "public/assets/pathpickernew.svg");

const BIMI_MAX_BYTES = 32 * 1024;
const SIZE = 320;
const BIMI_COLOR = "#7D49C7";
const SKIN_COLOR = "#FBD7BE";

function sharpSource() {
  return input.toLowerCase().endsWith(".svg")
    ? sharp(input, { density: 150 })
    : sharp(input);
}

/** Purple canvas in path.webp (~#7A49E6). */
function isBackgroundPixel(r, g, b, a) {
  if (a < 40) return true;
  return r >= 115 && r <= 132 && g >= 62 && g <= 75 && b >= 220 && b <= 240;
}

function isSkinPixel(r, g, b, a) {
  if (a < 40 || isBackgroundPixel(r, g, b, a)) return false;
  if (r > 240 && g > 235 && b > 230) return false;

  const dr = Math.abs(r - 0xfb);
  const dg = Math.abs(g - 0xd7);
  const db = Math.abs(b - 0xbe);
  if (dr + dg + db < 90) return true;

  return r > 205 && g > 165 && b > 125 && r >= g - 10 && g >= b - 25;
}

function isInkPixel(r, g, b, a) {
  return (
    a > 40 &&
    !isBackgroundPixel(r, g, b, a) &&
    !isSkinPixel(r, g, b, a)
  );
}

async function rasterize(size) {
  return sharpSource()
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function rasterLayers(size) {
  const { data, info } = await sharpSource()
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const skin = Buffer.alloc(data.length);
  const logo = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    skin[i + 3] = 0;
    logo[i + 3] = 0;

    if (isSkinPixel(r, g, b, a)) {
      skin[i] = 0;
      skin[i + 1] = 0;
      skin[i + 2] = 0;
      skin[i + 3] = 255;
    } else if (isInkPixel(r, g, b, a)) {
      logo[i] = 0;
      logo[i + 1] = 0;
      logo[i + 2] = 0;
      logo[i + 3] = 255;
    }
  }

  const toPng = (buf) =>
    sharp(buf, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .png()
      .toBuffer();

  return { skinPng: await toPng(skin), logoPng: await toPng(logo) };
}

function wrapBimiSvg(inner, viewSize) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${viewSize} ${viewSize}" fill="none" version="1.2" baseProfile="tiny-ps"><rect width="${viewSize}" height="${viewSize}" fill="#fff"/>${inner}</svg>`;
}

function stripSvgWrapper(svg) {
  return svg
    .replace(/<\?xml[^?]*\?>\s*/i, "")
    .replace(/<!DOCTYPE[^>]*>\s*/i, "")
    .replace(/<svg[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "")
    .trim();
}

function optimizeSvg(svg, { mergePaths = true } = {}) {
  return optimize(svg, {
    multipass: true,
    js2svg: { indent: 0, pretty: false },
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupNumericValues: { floatPrecision: 1 },
            convertPathData: { floatPrecision: 1, transformPrecision: 1 },
            mergePaths: mergePaths ? { force: true } : false,
          },
        },
      },
    ],
  }).data;
}

function optimizeLayer(inner, viewSize) {
  return stripSvgWrapper(optimizeSvg(wrapBimiSvg(inner, viewSize)));
}

async function traceLayer(png, color, turdSize, optTolerance, threshold = 128) {
  const traced = await tracePng(png, {
    threshold,
    turdSize,
    optTolerance,
    color,
    background: "transparent",
  });
  return stripSvgWrapper(traced);
}

async function buildDualColorSvg(size, turdSize, optTolerance) {
  const { skinPng, logoPng } = await rasterLayers(size);
  const [logoInner, skinInner] = await Promise.all([
    traceLayer(logoPng, BIMI_COLOR, turdSize, optTolerance),
    traceLayer(skinPng, SKIN_COLOR, turdSize, optTolerance),
  ]);

  const logoPaths = optimizeLayer(logoInner, size);
  const skinPaths = skinInner ? optimizeLayer(skinInner, size) : "";
  return wrapBimiSvg(`${logoPaths}${skinPaths}`, size);
}

async function traceAt(size, threshold, turdSize, optTolerance) {
  const png = await rasterize(size);
  const traced = await traceLayer(
    png,
    BIMI_COLOR,
    turdSize,
    optTolerance,
    threshold,
  );
  return optimizeSvg(wrapBimiSvg(traced, size));
}

async function posterizeAt(size, steps, turdSize, optTolerance) {
  const png = await rasterize(size);
  const traced = await posterizePng(png, {
    steps,
    turdSize,
    optTolerance,
    threshold: 128,
    background: "transparent",
  });
  return optimizeSvg(wrapBimiSvg(stripSvgWrapper(traced), size));
}

/** Try progressively coarser traces until under BIMI size limit. */
const attempts = [
  { mode: "dual", size: 256, turdSize: 4, optTolerance: 0.5 },
  { mode: "dual", size: 224, turdSize: 6, optTolerance: 0.7 },
  { mode: "dual", size: 192, turdSize: 8, optTolerance: 0.9 },
  { mode: "posterize", size: 256, steps: 4, turdSize: 4, optTolerance: 0.5 },
  { mode: "trace", size: 224, threshold: 128, turdSize: 6, optTolerance: 0.6 },
];

let best = null;

for (const attempt of attempts) {
  const svg =
    attempt.mode === "dual"
      ? await buildDualColorSvg(
          attempt.size,
          attempt.turdSize,
          attempt.optTolerance,
        )
      : attempt.mode === "posterize"
        ? await posterizeAt(
            attempt.size,
            attempt.steps,
            attempt.turdSize,
            attempt.optTolerance,
          )
        : await traceAt(
            attempt.size,
            attempt.threshold,
            attempt.turdSize,
            attempt.optTolerance,
          );
  const bytes = Buffer.byteLength(svg, "utf8");
  const hasSkin = /fbd7be/i.test(svg);
  console.log(
    `${attempt.mode} size=${attempt.size} -> ${bytes} bytes (${(bytes / 1024).toFixed(1)} KiB) skin=${hasSkin}`,
  );

  if (!best || bytes < Buffer.byteLength(best, "utf8")) {
    best = svg;
  }

  if (bytes <= BIMI_MAX_BYTES) {
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, svg, "utf8");
    console.log(`\nBIMI-compliant SVG written to ${output}`);
    process.exit(0);
  }
}

if (best) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, best, "utf8");
  const finalBytes = Buffer.byteLength(best, "utf8");
  console.log(
    `\nWrote best effort (${finalBytes} bytes) to ${output}` +
      (finalBytes > BIMI_MAX_BYTES
        ? " — still above 32KB; consider a simpler mark."
        : ""),
  );
  process.exit(finalBytes <= BIMI_MAX_BYTES ? 0 : 1);
}

process.exit(1);
