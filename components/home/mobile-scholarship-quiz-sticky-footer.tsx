"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const ARCHETYPE_QUIZ_URL = "https://my.pathpicker.com/archetype";

/** 0–1: how far the page has been scrolled through its scrollable range. */
function scrollDepthRatio(): number {
  const el = document.documentElement;
  const top = el.scrollTop || document.body.scrollTop;
  const scrollable = el.scrollHeight - el.clientHeight;
  if (scrollable <= 0) return 1;
  return top / scrollable;
}

/** Site-wide (layout): floating College Match Quiz on small screens only, after ~30% scroll depth. */
export function MobileScholarshipQuizStickyFooter() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      setVisible(scrollDepthRatio() >= 0.3);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } transition-[transform,opacity] duration-200 ease-out`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      role="complementary"
      aria-label="College Match Quiz"
      aria-hidden={!visible}
    >
      <div className={cn("pointer-events-auto py-2", !visible && "pointer-events-none")}>
        <Link
          href={ARCHETYPE_QUIZ_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          className="inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-full border-2 border-[#7C3AED] bg-[#956EFE] px-8 text-base font-semibold text-white shadow-[0_4px_20px_rgba(149,110,254,0.35)] transition hover:opacity-95 active:opacity-90"
        >
          <span className="text-lg leading-none" aria-hidden>
            🎯
          </span>
          College Match Quiz
        </Link>
      </div>
    </div>
  );
}
