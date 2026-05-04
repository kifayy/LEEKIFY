"use client";

import { usePathname } from "next/navigation";
import { EnterScholarshipsSection } from "@/components/enter-scholarships-section";

/**
 * Renders EnterScholarshipsSection in the layout on all routes except /money-quiz,
 * where the page content is already that section (avoids duplicate on mobile).
 */
export function EnterScholarshipsSectionLayout() {
  const pathname = usePathname();
  if (pathname === "/money-quiz") return null;
  return <EnterScholarshipsSection />;
}
