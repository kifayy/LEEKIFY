"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** White pill “Back to colleges” — matches dashboard FloatingBackButton row. */
export function FloatingBackButton() {
  return (
    <Link
      href="/browse-schools"
      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-md hover:border-violet-200 hover:bg-violet-50/30 transition-colors"
    >
      <ArrowLeft className="w-4 h-4 text-gray-600" />
      Back to colleges
    </Link>
  );
}
