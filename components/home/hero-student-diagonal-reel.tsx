"use client";

import { useId, useLayoutEffect, useRef } from "react";

/** School logo assets (GCS); each tile is one image edge-to-edge (slice), no extra fill. */
const REEL_SRCS = [
  "https://storage.googleapis.com/images_592/EieCC2-WAAExIcV.png",
  "https://storage.googleapis.com/images_592/4821_ucla_bruins-alternate-1996.png",
  "https://storage.googleapis.com/images_592/USC_Trojans.webp",
  "https://storage.googleapis.com/images_592/Harvard-Crest-Sticker-StickerMule-200045029.webp",
  "https://storage.googleapis.com/images_592/images%20(2).png",
  "https://storage.googleapis.com/images_592/images%20(3).png",
  "https://storage.googleapis.com/images_592/SE_sdsulogo_screenshot.jpg",
  "https://storage.googleapis.com/images_592/University%2Bof%2BTexas%2BFeatured%2BImage.webp",
  "https://storage.googleapis.com/images_592/images%20(4).png",
  "https://storage.googleapis.com/images_592/getimage.jfif",
] as const;

/** Rounded square tile (user SVG units): fewer, larger cells than dense grid. */
const TILE = 52;
const TILE_HALF = TILE / 2;
const TILE_RX = 11;

/** One full reel loop duration (ms): measured on half-strip height → smooth rAF modulo, no CSS loop hitch. */
const LOOP_MS = 52_000;

/** Mix (r,c) so nearby cells don’t share a simple modular pattern (avoids striped repeats). */
function reelHash32(r: number, c: number): number {
  let h = Math.imul(r ^ (r >>> 16), 2246822519) ^ Math.imul(c ^ (c >>> 16), 3266489917);
  h = Math.imul(h ^ (h >>> 13), 5) + 3864292196;
  return h >>> 0;
}

function pickReelIndex(
  r: number,
  c: number,
  len: number,
  forbid: ReadonlyArray<number | null | undefined>
): number {
  const h = reelHash32(r, c);
  const blocked = new Set<number>();
  for (const x of forbid) if (x !== undefined && x !== null && x >= 0) blocked.add(x);
  for (let t = 0; t < len; t++) {
    const idx = ((h + Math.imul(t, 0x9e3779b1)) >>> 0) % len;
    if (!blocked.has(idx)) return idx;
  }
  for (let idx = 0; idx < len; idx++) if (!blocked.has(idx)) return idx;
  return h % len;
}

/** One half of the infinite reel (repeat 2×; animation shifts by exactly 50%). */
function ReelStripHalf() {
  const rawId = useId();
  const idPrefix = `reel_${rawId.replace(/\W/g, "")}`;

  const cols = 8;
  const rows = 9;
  const stepX = 62;
  const stepY = 54;
  const n = REEL_SRCS.length;
  const rowCount = rows + 4;
  const colCount = cols + 4;
  const chosen = new Int16Array(rowCount * colCount);
  chosen.fill(-1);
  const put = (r: number, c: number, v: number) => {
    chosen[(r + 2) * colCount + (c + 2)] = v;
  };
  const at = (r: number, c: number) => chosen[(r + 2) * colCount + (c + 2)];

  const defs: JSX.Element[] = [];
  const marks: JSX.Element[] = [];

  for (let r = -2; r < rows + 2; r++) {
    for (let c = -2; c < cols + 2; c++) {
      const px = c * stepX + (r % 2) * (stepX * 0.5);
      const py = r * stepY;
      const clipId = `${idPrefix}_${r}_${c}`;
      const cMin = -2;
      const cMax = cols + 1;
      const up = r > -2 ? at(r - 1, c) : null;
      const left = c > -2 ? at(r, c - 1) : null;
      // Staggered rows overlap diagonally: avoid the row‑above logo offset by half a column.
      const dcStagger = r % 2 === 0 ? 1 : -1;
      let staggerAbove: number | null = null;
      if (r > -2) {
        const nc = c + dcStagger;
        if (nc >= cMin && nc <= cMax) staggerAbove = at(r - 1, nc);
      }
      const logoIdx = pickReelIndex(r, c, n, [up, left, staggerAbove]);
      put(r, c, logoIdx);
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
      className="block h-full min-h-0 w-full shrink-0"
      preserveAspectRatio="xMidYMid slice"
      viewBox="-140 -118 760 785"
      fill="none"
    >
      <defs>{defs}</defs>
      <g opacity={0.35}>{marks}</g>
    </svg>
  );
}

export function HeroStudentDiagonalReel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const yRef = useRef(0);
  const lastRef = useRef(0);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.transform = "translate3d(0,0,0)";
      return;
    }

    let raf = 0;

    const tick = (now: number) => {
      if (!lastRef.current) lastRef.current = now;
      const dt = Math.min(now - lastRef.current, 64);
      lastRef.current = now;

      // Layout height; getBoundingClientRect is skewed by ancestor rotate(-34deg).
      const h = el.offsetHeight;
      const half = h / 2;
      if (half < 4) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const advance = (half / LOOP_MS) * dt;
      yRef.current = (yRef.current + advance) % half;
      el.style.transform = `translate3d(0,${-yRef.current}px,0)`;
      raf = requestAnimationFrame(tick);
    };

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            const half = el.offsetHeight / 2;
            if (half > 4 && yRef.current >= half) yRef.current = yRef.current % half;
          })
        : null;
    ro?.observe(el);

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      lastRef.current = 0;
      yRef.current = 0;
    };
  }, []);

  const fadeVertical =
    "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)";
  const fadeHorizontal =
    "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)";

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
        <div
          ref={trackRef}
          className="flex min-h-0 h-[200%] w-full flex-col motion-reduce:translate-y-0"
          style={{ willChange: "transform" }}
        >
          <div className="flex min-h-0 min-w-0 w-full flex-1 basis-0">
            <ReelStripHalf />
          </div>
          <div className="flex min-h-0 min-w-0 w-full flex-1 basis-0">
            <ReelStripHalf />
          </div>
        </div>
      </div>
    </div>
  );
}
