"use client";

import { useEffect } from "react";
import type { CollegeDetail } from "@/types/college-detail";

export function SchoolSEO({ college, canonicalUrl }: { college: CollegeDetail; canonicalUrl: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: college.name,
      description: college.meta_description || college.description?.slice(0, 500) || undefined,
      url: canonicalUrl,
      ...(college.location && { address: { "@type": "PostalAddress", addressLocality: college.location } }),
    });
    script.id = "school-jsonld";
    const old = document.getElementById("school-jsonld");
    old?.remove();
    document.head.appendChild(script);
    return () => {
      document.getElementById("school-jsonld")?.remove();
    };
  }, [college, canonicalUrl]);

  return null;
}
