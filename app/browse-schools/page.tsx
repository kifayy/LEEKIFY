import type { Metadata } from "next";
import { Suspense } from "react";

import { Directory } from "@/components/directory/Directory";
import { getBrowseCollegesInitial } from "@/lib/browse-colleges-server";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";

function BrowseFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2 text-gray-600">
      <div className="text-3xl">🔍</div>
      <p>Loading browse…</p>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  const title = "Browse Schools | PathPicker";
  const description =
    "Compare 2,000+ colleges on PathPicker — acceptance rates, tuition, campus vibe, and personality fit. Browse schools and find your match.";

  return {
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
}

export default async function BrowseSchoolsPage() {
  const initialColleges = await getBrowseCollegesInitial();

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 pt-6 pb-2 sm:px-6 md:text-center lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[#0C1120] sm:text-3xl">
          Browse Schools
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base md:mx-auto">
          Explore 2,000+ colleges from our directory — filter by vibe, compare acceptance rates and
          costs, then open any school for admission odds and fit details.
        </p>
      </div>
      <Suspense fallback={<BrowseFallback />}>
        <Directory initialColleges={initialColleges} />
      </Suspense>
    </>
  );
}
