"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { BrowseDiscoveryHub } from "@/components/browse/browse-discovery-hub";
import { Directory } from "@/components/directory/Directory";
import { BROWSE_DEV_PATH } from "@/lib/browse-routes";
import type { College } from "@/types/college";

function BrowseFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2 text-gray-600">
      <div className="text-3xl">🔍</div>
      <p>Loading browse…</p>
    </div>
  );
}

function BrowseSchoolsInner({ initialColleges }: { initialColleges: College[] }) {
  const searchParams = useSearchParams();
  const hasFilters = Boolean(searchParams.get("search")?.trim() || searchParams.get("vibes")?.trim());

  if (!hasFilters) {
    return (
      <>
        <div className="container mx-auto max-w-7xl px-4 pt-6 pb-2 sm:px-6 md:text-center lg:px-8">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-amber-600">
            Dev preview — discovery hub
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-[#0C1120] sm:text-3xl">
            Browse Schools
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base md:mx-auto">
            Describe your ideal college, mix vibes, mash up schools, or pick a state — PathPicker builds a
            personalized answer page with ranked matches.
          </p>
        </div>
        <BrowseDiscoveryHub featuredColleges={initialColleges.slice(0, 8)} />
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 pt-6 pb-2 sm:px-6 md:text-center lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[#0C1120] sm:text-3xl">
          Browse Schools
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base md:mx-auto">
          Filter results below, or{" "}
          <a href={BROWSE_DEV_PATH} className="text-[#956EFE] underline">
            start a new discovery search
          </a>
          .
        </p>
      </div>
      <Directory initialColleges={initialColleges} />
    </>
  );
}

export function BrowseSchoolsPageContent({ initialColleges }: { initialColleges: College[] }) {
  return (
    <Suspense fallback={<BrowseFallback />}>
      <BrowseSchoolsInner initialColleges={initialColleges} />
    </Suspense>
  );
}
