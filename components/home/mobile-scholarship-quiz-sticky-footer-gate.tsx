"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MobileScholarshipQuizStickyFooter } from "@/components/home/mobile-scholarship-quiz-sticky-footer";

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

/** Renders the global mobile Archetype CTA except on `/awarded-app`, which uses its own iOS sticky footer. */
export function MobileScholarshipQuizStickyFooterGate() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname === "/awarded-app" || pathname?.startsWith("/awarded-app/")) {
      setVisible(false);
      return;
    }

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
  }, [pathname]);

  if (pathname === "/awarded-app" || pathname?.startsWith("/awarded-app/")) {
    return null;
  }

  return <MobileScholarshipQuizStickyFooter visible={visible} />;
}
