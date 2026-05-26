/**
 * Convert a complex logo SVG into a BIMI-compliant SVG (<=32KB, 320x320, tiny-ps).
 * Usage: node scripts/convert-bimi-svg.mjs [input.svg] [output.svg]
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
  process.argv[2] ?? path.join(root, "components/home/pathpickernew.svg");
const output =
  process.argv[3] ?? path.join(root, "public/assets/pathpickernew.svg");

const BIMI_MAX_BYTES = 32 * 1024;
const SIZE = 320;

async function rasterize(size) {
  return sharp(input, { density: 150 })
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

function wrapBimiSvg(inner, viewSize) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${viewSize} ${viewSize}" fill="none" version="1.2" baseProfile="tiny-ps">${inner}</svg>`;
}

function stripSvgWrapper(svg) {
  return svg
    .replace(/<\?xml[^?]*\?>\s*/i, "")
    .replace(/<!DOCTYPE[^>]*>\s*/i, "")
    .replace(/<svg[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "")
    .trim();
}

function optimizeSvg(svg) {
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
            mergePaths: { force: true },
          },
        },
      },
    ],
  }).data;
}

async function traceAt(size, threshold, turdSize, optTolerance) {
  const png = await rasterize(size);

  const traced = await tracePng(png, {
    threshold,
    turdSize,
    optTolerance,
    color: "#451563",
    background: "transparent",
  });

  return optimizeSvg(wrapBimiSvg(stripSvgWrapper(traced), size));
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
  { mode: "posterize", size: 256, steps: 4, turdSize: 4, optTolerance: 0.5 },
  { mode: "posterize", size: 224, steps: 3, turdSize: 6, optTolerance: 0.7 },
  { mode: "trace", size: 224, threshold: 128, turdSize: 6, optTolerance: 0.6 },
  { mode: "trace", size: 192, threshold: 140, turdSize: 8, optTolerance: 0.8 },
  { mode: "trace", size: 160, threshold: 150, turdSize: 10, optTolerance: 1.0 },
  { mode: "trace", size: 128, threshold: 160, turdSize: 12, optTolerance: 1.2 },
];

let best = null;

for (const attempt of attempts) {
  const svg =
    attempt.mode === "posterize"
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
  console.log(
    `${attempt.mode} size=${attempt.size} -> ${bytes} bytes (${(bytes / 1024).toFixed(1)} KiB)`,
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
