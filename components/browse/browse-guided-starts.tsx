"use client";

import Link from "next/link";

import { getSchoolPageHref } from "@/lib/school-page-href";
import type { College } from "@/types/college";

type CategoryLink = { href: string; label: string };

type Props = {
  categories: readonly CategoryLink[];
  featuredColleges?: College[];
  onExampleClick: (query: string) => void;
};

const TRENDING = [
  "party schools in the south",
  "small liberal arts with strong STEM",
  "colleges near the beach",
  "best value public universities",
];

export function BrowseGuidedStarts({ categories, featuredColleges = [], onExampleClick }: Props) {
  return (
    <div className="mt-12 space-y-8 border-t border-gray-100 pt-10">
      {featuredColleges.length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Featured schools</h2>
          <div className="flex flex-wrap gap-2">
            {featuredColleges.slice(0, 8).map((c) => (
              <Link
                key={c.id}
                href={getSchoolPageHref(c.slug ?? "", c.name)}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:border-[#956EFE] hover:text-[#956EFE]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Browse by category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:border-[#956EFE] hover:text-[#956EFE]"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Trending searches</h2>
        <div className="flex flex-wrap gap-2">
          {TRENDING.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onExampleClick(q)}
              className="rounded-full bg-[#f0ebff] px-4 py-2 text-sm text-[#6b46c1] hover:bg-[#e4d9ff]"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      <section className="text-center text-sm text-gray-500">
        <p>
          Or explore all{" "}
          <Link href="/schools" className="text-[#956EFE] underline">
            2,000+ school profiles
          </Link>{" "}
          with vibes, costs, and acceptance data.
        </p>
      </section>
    </div>
  );
}
