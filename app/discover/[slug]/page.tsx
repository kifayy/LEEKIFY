import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { DiscoverPageView } from "@/components/discover/discover-page-view";
import { DiscoverPageJsonLd } from "@/components/discover/discover-page-json-ld";
import { Directory } from "@/components/directory/Directory";
import { generateDiscoverCopy } from "@/lib/discover/generate-copy";
import { getIntentPageBySlug } from "@/lib/discover/intent-pages-db";
import { applyDiscoverLifecycle, shouldIndexDiscover } from "@/lib/discover/lifecycle";
import { matchCollegesForIntent } from "@/lib/discover/match-colleges-server";
import { parseIntentHeuristic } from "@/lib/discover/parse-heuristic";
import { getBrowseCollegesInitial } from "@/lib/browse-colleges-server";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import type { DiscoverPageCopy, ParsedDiscoverIntent } from "@/lib/discover/types";

type Props = { params: Promise<{ slug: string }> };

function slugToFallbackIntent(slug: string): ParsedDiscoverIntent {
  return parseIntentHeuristic({ query: slug.replace(/-/g, " "), source: "natural_language" });
}

async function loadDiscoverPage(slug: string) {
  const decoded = decodeURIComponent(slug).trim();
  const page = await getIntentPageBySlug(decoded);
  const intent: ParsedDiscoverIntent = page?.intent_json ?? slugToFallbackIntent(decoded);

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

  const index_state = page ? page.index_state : await applyDiscoverLifecycle(null, copy, colleges);

  return { slug: decoded, intent, copy, colleges, index_state, page };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = await loadDiscoverPage(slug);
  const baseUrl = await getBaseUrlForMetadata();
  const canonical = `${baseUrl}/discover/${encodeURIComponent(data.slug)}`;
  const indexable = shouldIndexDiscover(data.index_state);

  return {
    title: data.copy.title,
    description: data.copy.meta_description,
    alternates: { canonical },
    robots: indexable ? undefined : { index: false, follow: true },
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

export default async function DiscoverSlugPage({ params }: Props) {
  const { slug } = await params;
  const data = await loadDiscoverPage(slug);
  if (!data.copy.h1) notFound();

  const baseUrl = await getBaseUrlForMetadata();
  const canonicalUrl = `${baseUrl}/discover/${encodeURIComponent(data.slug)}`;
  const initialColleges = await getBrowseCollegesInitial();
  const defaultSearch = data.intent.location ?? "";
  const defaultVibes = data.intent.vibes.length ? [...data.intent.vibes] : undefined;

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
        indexState={data.index_state}
      />
      <section aria-label="Matching colleges" className="border-t border-gray-100">
        <Suspense fallback={<DirectoryFallback />}>
          <Directory
            initialColleges={initialColleges}
            defaultVibes={defaultVibes}
            defaultSearch={defaultSearch}
            urlSync={{ mode: "none" }}
          />
        </Suspense>
      </section>
      <div className="container mx-auto max-w-3xl px-4 py-8 text-center text-sm text-gray-600">
        <Link href="/browse-schools" className="font-medium text-[#956EFE] hover:underline">
          ← Back to browse
        </Link>
        {" · "}
        <Link href="/college-match-quiz" className="font-medium text-[#956EFE] hover:underline">
          Take the quiz
        </Link>
      </div>
    </>
  );
}
