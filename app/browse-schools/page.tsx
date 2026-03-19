"use client";

import { Suspense } from "react";
import { Directory } from "@/components/directory/Directory";

function BrowseFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2 text-gray-600">
      <div className="text-3xl">🔍</div>
      <p>Loading browse…</p>
    </div>
  );
}

export default function BrowseSchoolsPage() {
  return (
    <Suspense fallback={<BrowseFallback />}>
      <Directory />
    </Suspense>
  );
}
