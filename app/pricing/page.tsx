import type { Metadata } from "next";

import { PricingPage } from "@/components/pricing/pricing-page";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    title: "Pricing | Leekify",
    description:
      "Leekify Premium: full exposure ledger, watch 3 IDs, real-time breach alerts, settlement notifications, 24/7 monitoring, and exportable PDF risk reports.",
    alternates: { canonical: `${baseUrl}/pricing` },
  };
}

export default function PricingRoute() {
  return <PricingPage />;
}
