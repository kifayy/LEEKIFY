"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { BrowseStateMapPanel } from "@/components/browse/browse-state-map-panel";
import { BrowseVibeMixGame } from "@/components/browse/browse-vibe-mix-game";
import { Directory } from "@/components/directory/Directory";
import { BROWSE_DEV_PATH } from "@/lib/browse-routes";
import type { College } from "@/types/college";

function BrowseFallback() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 text-gray-600">
      <div className="text-3xl">🔍</div>
      <p>Loading browse…</p>
    </div>
  );
}

function BrowseSchoolsInner({ initialColleges }: { initialColleges: College[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const entry = searchParams.get("entry");
  const urlVibes = searchParams.get("vibes")?.split(",").filter(Boolean) ?? [];
  const hasStateSearch = Boolean(searchParams.get("search")?.trim());
  const isMapEntry = entry === "map";
  const isVibesEntry = entry === "vibes";
  const vibeGameComplete = isVibesEntry && urlVibes.length === 2;
  const showMapOnly = isMapEntry && !hasStateSearch;

  const handleVibeGameComplete = useCallback(
    (vibes: [string, string]) => {
      const params = new URLSearchParams();
      params.set("entry", "vibes");
      params.set("vibes", vibes.join(","));
      router.replace(`${BROWSE_DEV_PATH}?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  return (
    <>
      {isMapEntry ? <BrowseStateMapPanel /> : null}
      {isVibesEntry && !vibeGameComplete ? (
        <BrowseVibeMixGame onComplete={handleVibeGameComplete} />
      ) : null}
      {!showMapOnly && (!isVibesEntry || vibeGameComplete) ? (
        <Directory
          initialColleges={initialColleges}
          showVibeMixer={!isVibesEntry}
          defaultVibes={urlVibes.length ? urlVibes : undefined}
        />
      ) : null}
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
