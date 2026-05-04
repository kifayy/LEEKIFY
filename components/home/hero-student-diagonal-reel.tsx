"use client";

import { useId } from "react";

/** School logo assets (GCS); each tile is one image edge-to-edge (slice), no extra fill. */
const REEL_SRCS = [
  "https://storage.googleapis.com/images_592/EieCC2-WAAExIcV.png",
  "https://storage.googleapis.com/images_592/uclalogo.avif",
  "https://storage.googleapis.com/images_592/USC_Trojans.webp",
  "https://storage.googleapis.com/images_592/Harvard-Crest-Sticker-StickerMule-200045029.webp",
  "https://storage.googleapis.com/images_592/images%20(2).png",
  "https://storage.googleapis.com/images_592/images%20(3).png",
  "https://storage.googleapis.com/images_592/SE_sdsulogo_screenshot.jpg",
  "https://storage.googleapis.com/images_592/University%2Bof%2BTexas%2BFeatured%2BImage.webp",
  "https://storage.googleapis.com/images_592/images%20(4).png",
  "https://storage.googleapis.com/images_592/getimage.jfif",
] as const;

/** Rounded square tile; image covers full area (cover / slice). */
const TILE = 32;
const TILE_HALF = TILE / 2;
const TILE_RX = 7;

/** One vertical third of the infinite reel (repeat 3× for seamless translate). */
function ReelStripThird() {
  const rawId = useId();
  const idPrefix = `reel_${rawId.replace(/\W/g, "")}`;

  const cols = 11;
  const rows = 14;
  const stepX = 38;
  const stepY = 32;

  const defs: JSX.Element[] = [];
  const marks: JSX.Element[] = [];

  for (let r = -2; r < rows + 2; r++) {
    for (let c = -2; c < cols + 2; c++) {
      const px = c * stepX + (r % 2) * (stepX * 0.5);
      const py = r * stepY;
      const clipId = `${idPrefix}_${r}_${c}`;
      const logoIdx = Math.abs(r * 19 + c * 11) % REEL_SRCS.length;
      const src = REEL_SRCS[logoIdx];

      defs.push(
        <clipPath id={clipId} key={`d-${r}-${c}`} clipPathUnits="userSpaceOnUse">
          <rect
            x={-TILE_HALF}
            y={-TILE_HALF}
            width={TILE}
            height={TILE}
            rx={TILE_RX}
            ry={TILE_RX}
          />
        </clipPath>
      );

      marks.push(
        <g key={`${r}-${c}`} transform={`translate(${px} ${py})`}>
          <g clipPath={`url(#${clipId})`}>
            <image
              href={src}
              x={-TILE_HALF}
              y={-TILE_HALF}
              width={TILE}
              height={TILE}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
          <rect
            x={-TILE_HALF}
            y={-TILE_HALF}
            width={TILE}
            height={TILE}
            rx={TILE_RX}
            fill="none"
            stroke="rgba(255,255,255,0.42)"
            strokeWidth={1}
          />
        </g>
      );
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="block h-[33.333333%] w-full shrink-0"
      preserveAspectRatio="xMidYMid slice"
      viewBox="-100 -95 760 785"
      fill="none"
    >
      <defs>{defs}</defs>
      <g opacity={0.92}>{marks}</g>
    </svg>
  );
}

export function HeroStudentDiagonalReel() {
  const fadeVertical =
    "linear-gradient(to bottom, transparent 0%, black 11%, black 89%, transparent 100%)";
  const fadeHorizontal =
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      style={{
        WebkitMaskImage: `${fadeVertical}, ${fadeHorizontal}`,
        maskImage: `${fadeVertical}, ${fadeHorizontal}`,
        WebkitMaskSize: "100% 100%, 100% 100%",
        maskSize: "100% 100%, 100% 100%",
        WebkitMaskRepeat: "no-repeat, no-repeat",
        maskRepeat: "no-repeat, no-repeat",
        WebkitMaskPosition: "center, center",
        maskPosition: "center, center",
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-1/2 h-[235%] w-[min(320%,115vw)] -translate-x-1/2 -translate-y-1/2"
        style={{ transform: "translate(-50%, -50%) rotate(-34deg)" }}
      >
        <div className="flex h-[300%] w-full flex-col animate-hero-diagonal-reel will-change-transform motion-reduce:translate-y-0 motion-reduce:animate-none">
          <ReelStripThird />
          <ReelStripThird />
          <ReelStripThird />
        </div>
      </div>
    </div>
  );
}
