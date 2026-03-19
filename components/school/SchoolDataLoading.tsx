"use client";

export function SchoolDataLoading({ collegeName }: { collegeName: string }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8 animate-pulse">
      <div className="h-4 w-48 bg-gray-200 rounded" />
      <div className="h-10 w-3/4 max-w-md bg-gray-200 rounded" />
      <div className="h-48 sm:h-64 rounded-3xl bg-gray-100" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
      <p className="text-sm text-gray-500 text-center pt-4">
        Loading{collegeName ? ` ${collegeName.replace(/-/g, " ")}` : " school"}…
      </p>
    </div>
  );
}
