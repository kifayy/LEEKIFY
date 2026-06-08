"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Scroll to top on route change; hash anchors (e.g. refund policy) are handled separately. */
export function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
