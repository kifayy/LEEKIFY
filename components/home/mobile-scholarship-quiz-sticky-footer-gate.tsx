"use client";

import { usePathname } from "next/navigation";
import { MobileScholarshipQuizStickyFooter } from "@/components/home/mobile-scholarship-quiz-sticky-footer";

/** Renders the global mobile quiz CTA except on `/awarded-app`, which uses its own iOS sticky footer. */
export function MobileScholarshipQuizStickyFooterGate() {
  const pathname = usePathname();
  if (pathname === "/awarded-app" || pathname?.startsWith("/awarded-app/")) {
    return null;
  }
  return <MobileScholarshipQuizStickyFooter />;
}
