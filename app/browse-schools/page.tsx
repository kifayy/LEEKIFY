import type { Metadata } from "next";
import { Suspense } from "react";

import { BrowseSchoolsPageContent } from "@/components/browse/browse-schools-page-content";
import { getBrowseCollegesInitial } from "@/lib/browse-colleges-server";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { hasBrowseFilterParams, metadataForFilterParams } from "@/lib/seo-filter-params";

type Props = { searchParams: Promise<{ search?: string; vibes?: string }> };

function BrowseFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2 text-gray-600">
      <div className="text-3xl">🔍</div>
      <p>Loading browse…</p>
    </div>
  );
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const baseUrl = await getBaseUrlForMetadata();
  const title = "Browse Schools | PathPicker";
  const description =
    "Compare 2,000+ colleges on PathPicker — acceptance rates, tuition, campus vibe, and personality fit. Browse schools and find your match.";

  const base: Metadata = {
    title,
    description,
    alternates: { canonical: `${baseUrl}/browse-schools` },
    openGraph: {
      type: "website",
      siteName: "PathPicker",
      title,
      description,
      url: `${baseUrl}/browse-schools`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };

  return metadataForFilterParams(base, hasBrowseFilterParams(sp));
}

export default async function BrowseSchoolsPage() {
  const initialColleges = await getBrowseCollegesInitial();

  return (
    <Suspense fallback={<BrowseFallback />}>
      <BrowseSchoolsPageContent initialColleges={initialColleges} />
    </Suspense>
  );
}
