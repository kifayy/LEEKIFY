import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { DiscoverPageView } from "@/components/discover/discover-page-view";
import { DiscoverPageJsonLd } from "@/components/discover/discover-page-json-ld";
import { Directory } from "@/components/directory/Directory";
import { isPromotedCollegeSearchSlug } from "@/lib/college-search/promoted-slugs";
import { generateDiscoverCopy } from "@/lib/discover/generate-copy";
import { getIntentPageBySlug } from "@/lib/discover/intent-pages-db";
import { matchCollegesForIntent } from "@/lib/discover/match-colleges-server";
import { parseIntentHeuristic } from "@/lib/discover/parse-heuristic";
import { getBrowseCollegesInitial } from "@/lib/browse-colleges-server";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import type { DiscoverPageCopy, ParsedDiscoverIntent } from "@/lib/discover/types";

type Props = { params: Promise<{ slug: string }> };

const SLUG_QUERY_HINTS: Record<string, string> = {
  "nature-tech-colleges": "nature and tech colleges",
  "colleges-in-california": "colleges in California",
  "affordable-party-schools": "affordable party schools",
  "small-liberal-arts-stem": "small liberal arts colleges with strong STEM",
  "beach-colleges": "colleges near the beach",
};

async function loadCollegeSearchPage(slug: string) {
  const query = SLUG_QUERY_HINTS[slug] ?? slug.replace(/-/g, " ");
  const page = await getIntentPageBySlug(slug);
  const intent: ParsedDiscoverIntent =
    page?.intent_json ?? parseIntentHeuristic({ query, source: "natural_language" });

  const colleges = await matchCollegesForIntent(intent);
  let copy: DiscoverPageCopy;

  if (page?.h1 && page.intro) {
    copy = {
      title: page.title ?? `${page.h1} | PathPicker`,
      h1: page.h1,
      meta_description: page.meta_description ?? "",
      intro: page.intro,
      summary: page.summary ?? "",
      why_fit: page.why_fit ?? "",
      best_for: page.best_for ?? "",
      not_ideal_for: page.not_ideal_for ?? "",
      methodology: page.methodology ?? "",
      faq: page.faq ?? [],
    };
  } else {
    copy = await generateDiscoverCopy(intent, colleges);
  }

  return { slug, intent, copy, colleges };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!isPromotedCollegeSearchSlug(slug)) return { title: "College Search | PathPicker" };
  const data = await loadCollegeSearchPage(slug);
  const baseUrl = await getBaseUrlForMetadata();
  const canonical = `${baseUrl}/college-search/${encodeURIComponent(slug)}`;

  return {
    title: data.copy.title,
    description: data.copy.meta_description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "PathPicker",
      title: data.copy.title,
      description: data.copy.meta_description,
      url: canonical,
    },
  };
}

function DirectoryFallback() {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2 text-gray-600">
      <div className="text-3xl">🔍</div>
      <p>Loading schools…</p>
    </div>
  );
}

export default async function CollegeSearchSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!isPromotedCollegeSearchSlug(slug)) notFound();

  const data = await loadCollegeSearchPage(slug);
  const baseUrl = await getBaseUrlForMetadata();
  const canonicalUrl = `${baseUrl}/college-search/${encodeURIComponent(slug)}`;
  const initialColleges = await getBrowseCollegesInitial();

  return (
    <>
      <DiscoverPageJsonLd
        copy={data.copy}
        canonicalUrl={canonicalUrl}
        baseUrl={baseUrl}
        colleges={data.colleges}
      />
      <DiscoverPageView
        copy={data.copy}
        intent={data.intent}
        highlightedColleges={data.colleges.slice(0, 5)}
        indexState="indexed"
        badgeLabel="Editorial college search"
      />
      <section aria-label="Matching colleges" className="border-t border-gray-100">
        <Suspense fallback={<DirectoryFallback />}>
          <Directory
            initialColleges={initialColleges}
            defaultVibes={data.intent.vibes.length ? [...data.intent.vibes] : undefined}
            defaultSearch={data.intent.location ?? ""}
            urlSync={{ mode: "none" }}
          />
        </Suspense>
      </section>
      <div className="container mx-auto max-w-3xl px-4 py-8 text-center text-sm text-gray-600">
        <Link href="/browse" className="font-medium text-[#956EFE] hover:underline">
          ← Browse all schools
        </Link>
        {" · "}
        <Link href={`/discover/${encodeURIComponent(slug)}`} className="font-medium text-[#956EFE] hover:underline">
          Discover view
        </Link>
      </div>
    </>
  );
}
