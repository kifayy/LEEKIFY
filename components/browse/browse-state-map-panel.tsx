"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { UsStateMapPicker } from "@/components/browse/us-state-map-picker";
import { BROWSE_DEV_PATH } from "@/lib/browse-routes";
import { stateAbbrFromName } from "@/lib/us-states";

export function BrowseStateMapPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() ?? "";
  const selectedAbbr = search ? stateAbbrFromName(search) : null;

  return (
    <div className="container mx-auto max-w-7xl px-4 pb-2 pt-4 sm:px-6 lg:px-8">
      <UsStateMapPicker
        selectedAbbr={selectedAbbr}
        onSelect={(name) => {
          router.replace(
            `${BROWSE_DEV_PATH}?entry=map&search=${encodeURIComponent(name)}`,
            { scroll: false },
          );
        }}
      />
    </div>
  );
}
