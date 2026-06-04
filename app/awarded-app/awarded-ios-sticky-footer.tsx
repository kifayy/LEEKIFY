"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const IOS_HREF = "https://awarded.short.gy/9iTh";
const SHOW_AFTER_SCROLL_FRACTION = 0.3;

function getScrollDepth(): number {
  const root = document.documentElement;
  const scrollTop = root.scrollTop || document.body.scrollTop;
  const viewport = window.innerHeight;
  const total = root.scrollHeight;
  const maxScroll = Math.max(0, total - viewport);
  if (maxScroll <= 0) return 0;
  return scrollTop / maxScroll;
}

export function AwardedIosStickyFooter() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScrollOrResize = () => {
      setVisible(getScrollDepth() >= SHOW_AFTER_SCROLL_FRACTION);
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-black/[0.06] bg-white/95 px-4 py-3 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-md transition-[transform,opacity] duration-200 ease-out supports-[backdrop-filter]:bg-white/85 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-[1024px] justify-center">
        <Link
          href={IOS_HREF}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          className="inline-flex h-16 min-w-[200px] w-full max-w-sm animate-ios-cta-bounce items-center justify-center gap-2 rounded-full bg-[#956EFE] px-8 text-xl font-semibold text-white shadow-[0_2px_8px_rgba(149,110,254,0.25)] transition-opacity hover:opacity-95 active:opacity-90"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1920px-Apple_logo_white.svg.png"
            alt=""
            className="h-6 w-6 object-contain"
            aria-hidden
          />
          Take on iOS
        </Link>
      </div>
    </div>
  );
}
