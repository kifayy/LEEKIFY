import type { Metadata } from "next";

import { GpaCalculatorPageContent } from "@/components/calculators/gpa-calculator-page-content";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import {
  GPA_CALCULATOR_META_DESCRIPTION,
  GPA_CALCULATOR_SLUG,
  GPA_CALCULATOR_TITLE,
} from "@/lib/gpa-calculator-seo";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  const canonical = `${baseUrl}/${GPA_CALCULATOR_SLUG}`;
  const title = `${GPA_CALCULATOR_TITLE} | PathPicker`;

  return {
    title,
    description: GPA_CALCULATOR_META_DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title,
      description: GPA_CALCULATOR_META_DESCRIPTION,
      siteName: "PathPicker",
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: GPA_CALCULATOR_META_DESCRIPTION,
    },
  };
}

export default async function GpaCalculatorPage() {
  const baseUrl = await getBaseUrlForMetadata();
  const canonicalUrl = `${baseUrl}/${GPA_CALCULATOR_SLUG}`;

  return <GpaCalculatorPageContent canonicalUrl={canonicalUrl} baseUrl={baseUrl} />;
}
