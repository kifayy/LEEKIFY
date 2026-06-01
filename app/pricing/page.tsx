import type { Metadata } from "next";

import { PricingPage } from "@/components/pricing/pricing-page";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    title: "Pricing | PathPicker",
    description:
      "PathPicker Premium: school match reports, fit at 2,000+ colleges, admission odds, and scholarship matches. Monthly or yearly plans.",
    alternates: { canonical: `${baseUrl}/pricing` },
  };
}

export default function PricingRoute() {
  return <PricingPage />;
}
