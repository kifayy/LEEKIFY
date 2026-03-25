"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { role: "high schooler", roleEmoji: "🎒", gpa: "3.7 GPA", gpaEmoji: "📊", amount: 43_192 },
  { role: "college student", roleEmoji: "🎓", gpa: "3.1 GPA", gpaEmoji: "📊", amount: 38_750 },
  { role: "high schooler", roleEmoji: "🎒", gpa: "2.5 GPA", gpaEmoji: "📊", amount: 27_340 },
  { role: "college student", roleEmoji: "🎓", gpa: "3.8 GPA", gpaEmoji: "📊", amount: 52_890 },
] as const;

const LOCATION_POOL = [
  "Miami, FL",
  "San Diego, CA",
  "Chicago, IL",
  "Columbus, OH",
  "Austin, TX",
  "Seattle, WA",
  "Denver, CO",
  "Boston, MA",
  "Atlanta, GA",
  "Phoenix, AZ",
  "Nashville, TN",
  "Portland, OR",
] as const;

/** Four unique random cities per visit, aligned to the four slides. */
function pickSlideLocations(): string[] {
  const pool = [...LOCATION_POOL];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j]!, pool[i]!];
  }
  return pool.slice(0, 4);
}

function graphemeParts(s: string): string[] {
  try {
    return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(s)].map((x) => x.segment);
  } catch {
    return Array.from(s);
  }
}

/** Pause after a slide finishes before the next; last slide uses RESTART_AFTER_ALL_MS. */
const DWELL_AFTER_SLIDE_MS = 1200;
const RESTART_AFTER_ALL_MS = 3000;
const TYPE_MS = 42;
const COUNT_MS = 1400;

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function formatMoney(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export function AwardedRotatingScholarshipCard() {
  const [locations] = useState(pickSlideLocations);
  const [index, setIndex] = useState(0);
  const [roleTyped, setRoleTyped] = useState("");
  const [locationTyped, setLocationTyped] = useState("");
  const [gpaTyped, setGpaTyped] = useState("");
  const [moneyShown, setMoneyShown] = useState(0);
  const [phase, setPhase] = useState<"role" | "location" | "gpa" | "money" | "done">("role");

  useEffect(() => {
    if (phase !== "done") return;
    const isLast = index === SLIDES.length - 1;
    const delay = isLast ? RESTART_AFTER_ALL_MS : DWELL_AFTER_SLIDE_MS;
    const id = window.setTimeout(() => {
      setIndex((i) => (i === SLIDES.length - 1 ? 0 : i + 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [phase, index]);

  useEffect(() => {
    let cancelled = false;
    const slide = SLIDES[index];
    const city = locations[index]!;
    const locationFull = city;

    setRoleTyped("");
    setLocationTyped("");
    setGpaTyped("");
    setMoneyShown(0);
    setPhase("role");

    void (async () => {
      const roleParts = graphemeParts(slide.role);
      for (let i = 1; i <= roleParts.length; i++) {
        if (cancelled) return;
        setRoleTyped(roleParts.slice(0, i).join(""));
        await sleep(TYPE_MS);
      }
      if (cancelled) return;
      setPhase("location");

      const locParts = graphemeParts(locationFull);
      for (let i = 1; i <= locParts.length; i++) {
        if (cancelled) return;
        setLocationTyped(locParts.slice(0, i).join(""));
        await sleep(TYPE_MS);
      }
      if (cancelled) return;
      setPhase("gpa");

      const gpaParts = graphemeParts(slide.gpa);
      for (let i = 1; i <= gpaParts.length; i++) {
        if (cancelled) return;
        setGpaTyped(gpaParts.slice(0, i).join(""));
        await sleep(TYPE_MS);
      }
      if (cancelled) return;
      setPhase("money");

      const target = slide.amount;
      const start = performance.now();
      await new Promise<void>((resolve) => {
        const frame = (now: number) => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min(1, (now - start) / COUNT_MS);
          const eased = 1 - (1 - t) ** 3;
          setMoneyShown(Math.round(eased * target));
          if (t < 1) {
            requestAnimationFrame(frame);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(frame);
      });
      if (cancelled) return;
      setMoneyShown(target);
      setPhase("done");
    })();

    return () => {
      cancelled = true;
    };
  }, [index, locations]);

  const slide = SLIDES[index];
  const city = locations[index]!;
  const locationFull = city;

  const showCaretInRole = phase === "role" && roleTyped !== slide.role;
  const showCaretInLocation = phase === "location" && locationTyped !== locationFull;
  const showCaretInGpa = phase === "gpa" && gpaTyped !== slide.gpa;
  const showMoneyCaret = phase === "money";

  return (
    <div className="mx-auto mb-6 max-w-2xl md:mb-8">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl sm:p-8">
        <div className="relative mx-auto min-h-[200px] w-full sm:min-h-[220px]" aria-live="polite" aria-atomic="true">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-gray-800">
              <p className="text-lg font-light leading-relaxed sm:text-xl md:text-2xl">
                As a{" "}
                <span className="mx-1 inline-block align-middle sm:mx-2">
                  <span className="inline-flex h-11 w-[11.25rem] shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-300 px-2 text-center text-sm font-medium text-gray-700 sm:h-12 sm:w-[13rem] sm:px-3">
                    <span className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap">
                      <span className="shrink-0 leading-none" aria-hidden>
                        {slide.roleEmoji}
                      </span>
                      <span>
                        {roleTyped}
                        {showCaretInRole ? (
                          <span className="inline-block w-0.5 animate-pulse text-[#956EFE]" aria-hidden>
                            |
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </span>
                </span>{" "}
                in{" "}
                <span className="mx-1 inline-block align-middle sm:mx-2">
                  <span className="inline-flex h-11 w-[13rem] shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-300 px-2 text-center text-sm font-medium text-gray-700 sm:h-12 sm:w-[14.5rem] sm:px-3">
                    <span className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap">
                      <span className="shrink-0 leading-none" aria-hidden>
                        🇺🇸
                      </span>
                      <span>
                        {locationTyped}
                        {showCaretInLocation ? (
                          <span className="inline-block w-0.5 animate-pulse text-[#956EFE]" aria-hidden>
                            |
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </span>
                </span>{" "}
                with a{" "}
                <span className="mx-1 inline-block align-middle sm:mx-2">
                  <span className="inline-flex h-11 w-[7.75rem] shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-300 px-2 text-center text-sm font-medium text-gray-700 sm:h-12 sm:w-[8.5rem] sm:px-3">
                    <span className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap">
                      {phase !== "role" && phase !== "location" ? (
                        <span className="shrink-0 leading-none" aria-hidden>
                          {slide.gpaEmoji}
                        </span>
                      ) : null}
                      <span>
                        {gpaTyped}
                        {showCaretInGpa ? (
                          <span className="inline-block w-0.5 animate-pulse text-[#956EFE]" aria-hidden>
                            |
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </span>
                </span>
                , you can enter
              </p>
              <p
                className="mt-5 text-4xl font-bold leading-none tracking-tight text-[#956EFE] sm:text-5xl md:text-6xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatMoney(moneyShown)}
                {showMoneyCaret ? (
                  <span className="ml-1 inline-block font-light animate-pulse text-[#956EFE] opacity-80" aria-hidden>
                    |
                  </span>
                ) : null}
              </p>
              <p className="mt-2 text-base font-light text-gray-500 sm:text-lg">in scholarships</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
