"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HEADING_COLOR = "#181A1D";
const BODY_COLOR = "rgb(88, 89, 93)";

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

export type ScholarshipHeroSectionProps = {
  /** Main heading, e.g. "Win Scholarships From Your Texts" or "{Category} Scholarships" */
  title: string;
  /** Body paragraph under the title. If category is provided, overrides with category-specific copy. */
  body: string;
  /** Optional category name (e.g. Gender, Ethnicity, STEM). When set, body becomes category-specific. */
  category?: string | null;
};

/**
 * Hero section matching the home page WhyDirectMailSection format 1:1.
 * Includes: subtext (9k+ Students | countdown), title, body, SMS CTA image, footer.
 */
function getCategoryBody(category: string): string {
  const trimmed = category.trim();
  const lower = trimmed.toLowerCase();

  // Special cases that don't fit "your X" phrasing
  if (lower === "easy to win") {
    return "Beat the competition by entering easy-to-win scholarships in seconds with our algorithm.";
  }
  if (lower === "by amount") {
    return "Beat the competition by entering scholarships tailored to your target amount in seconds with our algorithm.";
  }

  // Default: strip "By " prefix and lowercase for "your X" (e.g. "By Major" -> "your major")
  let x = trimmed;
  if (trimmed.toLowerCase().startsWith("by ")) {
    x = trimmed.slice(3).trim() || trimmed;
  }
  if (x.length > 0) {
    x = x.charAt(0).toLowerCase() + x.slice(1);
  }
  return `Beat the competition by entering scholarships tailored for your ${x} in seconds with our algorithm.`;
}

export function ScholarshipHeroSection({ title, body, category }: ScholarshipHeroSectionProps) {
  const displayBody = category?.trim() ? getCategoryBody(category) : body;
  const [countdown, setCountdown] = useState<string>("…");

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
    <section className="w-full min-w-0 overflow-x-hidden bg-white py-10 md:py-20">
      <div className="container mx-auto max-w-[1024px] px-4 md:px-6 min-w-0">
        {/* Subtext above title: 9k+ Students | Next scan countdown */}
        <p
          className="mx-auto mb-3 max-w-[560px] text-center text-sm md:mb-4 md:text-base lg:mb-6"
          style={{ color: BODY_COLOR }}
        >
          ⭐9k+ Students | 🕐 Next scan in {countdown}
        </p>

        <h2
          className="mx-auto mb-4 max-w-[603px] text-center text-3xl font-bold leading-tight tracking-tight md:mb-5 md:text-4xl lg:mb-8 lg:leading-snug lg:text-[3.75rem]"
          style={{ color: HEADING_COLOR }}
        >
          {title}
        </h2>
        <p
          className="mx-auto mb-6 max-w-[560px] text-center text-base leading-relaxed md:mb-8 md:text-lg lg:mb-10 lg:leading-loose"
          style={{ color: BODY_COLOR }}
        >
          {displayBody}
        </p>

        {/* SMS CTA button — 2x size; opens native SMS with pre-filled message */}
        <div className="mx-auto mb-3 flex justify-center md:mb-4">
          <a
            href="https://awarded.short.gy/FDzG"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-[144px] w-full max-w-[640px] overflow-hidden rounded-lg transition-opacity hover:opacity-95 active:opacity-90 md:h-[176px] md:max-w-[760px]"
            aria-label="Text to get matched scholarships"
          >
            <Image
              src="https://storage.googleapis.com/images_592/Grou34p%206.png"
              alt="Text to get scholarships"
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 640px, 760px"
              unoptimized
            />
          </a>
        </div>
      </div>
    </section>
  );
}
