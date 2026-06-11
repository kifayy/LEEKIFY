"use client";

import Link from "next/link";

/**
 * Dashboard keeps this hidden (showStickyHeader never true). Do not enable scroll-to-show without updating layout spacing.
 */
export function SchoolStickyHeader({
  showStickyHeader,
  collegeName,
}: {
  showStickyHeader: boolean;
  collegeName: string;
}) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md transition-transform duration-300 ${
        showStickyHeader ? "translate-y-0" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-900 truncate">
          Viewing: <span className="text-violet-700">{collegeName}</span>
        </p>
        <Link href="/browse" className="text-sm font-medium text-violet-600 hover:underline shrink-0">
          Back to Explore
        </Link>
      </div>
    </header>
  );
}
