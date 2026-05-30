import { Suspense } from "react";
import { Directory } from "@/components/directory/Directory";
import { getBrowseCollegesInitial } from "@/lib/browse-colleges-server";

function BrowseFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2 text-gray-600">
      <div className="text-3xl">🔍</div>
      <p>Loading browse…</p>
    </div>
  );
}

export default async function BrowseSchoolsPage() {
  const initialColleges = await getBrowseCollegesInitial();

  return (
    <Suspense fallback={<BrowseFallback />}>
      <Directory initialColleges={initialColleges} />
    </Suspense>
  );
}
