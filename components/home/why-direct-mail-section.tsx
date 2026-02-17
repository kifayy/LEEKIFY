"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Background moved to Featured Scholarships section; this section is white
const HEADING_COLOR = "#181A1D";
const BODY_COLOR = "rgb(88, 89, 93)"; // 0.345, 0.349, 0.365

/** 2 days 6 hours in ms — countdown resets every this interval */
const SCAN_INTERVAL_MS = (2 * 24 + 6) * 60 * 60 * 1000;

function formatCountdown(ms: number): string {
  if (ms <= 0) return "0d, 0h";
  const d = Math.floor(ms / (24 * 60 * 60 * 1000));
  const h = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const m = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  if (d > 0) return `${d}d, ${h}h`;
  if (h > 0) return `${h}h, ${m}m`;
  const s = Math.floor((ms % (60 * 1000)) / 1000);
  return `${m}m, ${s}s`;
}

function getNextScanMs(): number {
  return Math.ceil(Date.now() / SCAN_INTERVAL_MS) * SCAN_INTERVAL_MS;
}

export function WhyDirectMailSection() {
  const [countdown, setCountdown] = useState(() => {
    const next = getNextScanMs();
    return formatCountdown(next - Date.now());
  });

  useEffect(() => {
    const tick = () => {
      const next = getNextScanMs();
      setCountdown(formatCountdown(next - Date.now()));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="w-full min-w-0 overflow-x-hidden bg-white py-10 md:py-20"
    >
      <div className="container mx-auto max-w-[1024px] px-4 md:px-6 min-w-0">
        {/* Subtext above title: 9k+ Students | Next scan countdown (resets every 2d 6h) */}
        <p
          className="mx-auto mb-3 max-w-[560px] text-center text-sm md:mb-4 md:text-base"
          style={{ color: BODY_COLOR }}
        >
          ⭐9k+ Students | 🕐 Next scan in {countdown}
        </p>

        <h2
          className="mx-auto mb-4 max-w-[603px] text-center text-3xl font-bold leading-tight tracking-tight md:mb-5 md:text-4xl lg:text-[2.5rem]"
          style={{ color: HEADING_COLOR }}
        >
          Win Scholarships From Your Texts
        </h2>
        <p
          className="mx-auto mb-6 max-w-[560px] text-center text-base leading-relaxed md:mb-8 md:text-lg"
          style={{ color: BODY_COLOR }}
        >
          Our algorithm scans 1,000+ scholarships every week and sends you two easy ones you personally matched with.
        </p>

        {/* SMS CTA button — 2x size; opens native SMS with pre-filled message */}
        <div className="mx-auto mb-3 flex justify-center md:mb-4">
          <a
            href="sms:+18559224190?body=yoo%21%20send%20me%20scholarships"
            className="relative block h-[144px] w-full max-w-[640px] overflow-hidden rounded-lg transition-opacity hover:opacity-95 active:opacity-90 md:h-[176px] md:max-w-[760px]"
            aria-label="Text to get matched scholarships"
          >
            <Image
              src="https://storage.googleapis.com/images_592/Groussp%206.png"
              alt="Text to get scholarships"
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 640px, 760px"
              unoptimized
            />
          </a>
        </div>
        <p
          className="mx-auto mb-10 text-center text-sm md:mb-14 md:text-base"
          style={{ color: BODY_COLOR }}
        >
          Free • No App Required • No Sign-up
        </p>

        {/* Two phone mockup images — stacked on mobile, side by side on desktop */}
        <div className="mx-auto mb-10 flex flex-wrap items-center justify-center gap-8 md:mb-14 md:max-w-6xl md:flex-nowrap md:gap-12">
          <div className="relative h-[560px] w-full min-w-0 max-w-[760px] overflow-hidden rounded-xl md:h-[760px] md:max-w-[840px] md:flex-1 md:min-w-0">
            <Image
              src="https://storage.googleapis.com/images_592/Secfftion.png"
              alt="Scholarships to your phone"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
          <div className="relative h-[560px] w-full min-w-0 max-w-[760px] overflow-hidden rounded-xl md:h-[760px] md:max-w-[840px] md:flex-1 md:min-w-0">
            <Image
              src="https://storage.googleapis.com/images_592/Gro2up%205.png"
              alt="Only 2 texts a week"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
