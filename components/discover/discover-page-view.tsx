import Link from "next/link";

import { CollegeMatchQuizLink } from "@/components/college-match-quiz-link";
import type { DiscoverPageCopy, DiscoverIndexState, ParsedDiscoverIntent } from "@/lib/discover/types";
import type { College } from "@/types/college";
import { VIBE_LABEL_BY_VALUE } from "@/lib/directory/vibe-options";
import { getSchoolPageHref } from "@/lib/school-page-href";
import { formatCostSnippetForSeo } from "@/lib/school-seo-copy";
import type { CollegeDetail } from "@/types/college-detail";

type Props = {
  copy: DiscoverPageCopy;
  intent: ParsedDiscoverIntent;
  highlightedColleges: College[];
  indexState: DiscoverIndexState;
  badgeLabel?: string;
};

function formatRate(rate?: number | null): string | null {
  if (rate == null || Number.isNaN(Number(rate))) return null;
  return `~${Math.round(Number(rate))}% acceptance`;
}

export function DiscoverPageView({ copy, intent, highlightedColleges, indexState, badgeLabel }: Props) {
  const vibeLabels = intent.vibes.map((v) => VIBE_LABEL_BY_VALUE[v] ?? v).join(" + ");

  return (
    <article className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-gradient-to-b from-[#f6f3ff] to-white">
        <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <p className="text-sm font-medium text-[#956EFE]">{badgeLabel ?? "PathPicker Discover"}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0C1120] sm:text-4xl">{copy.h1}</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">{copy.summary}</p>
          {indexState !== "indexed" ? (
            <p className="mt-2 text-xs text-gray-500">Preview page — indexing when quality thresholds are met.</p>
          ) : null}
        </div>
      </header>

      <div className="container mx-auto max-w-3xl px-4 py-10 space-y-10">
        <section aria-labelledby="discover-intro">
          <h2 id="discover-intro" className="sr-only">
            Overview
          </h2>
          <p className="text-base leading-relaxed text-gray-700">{copy.intro}</p>
        </section>

        {highlightedColleges.length > 0 ? (
          <section aria-labelledby="top-matches">
            <h2 id="top-matches" className="text-xl font-semibold text-[#0C1120]">
              Top matches
            </h2>
            <ul className="mt-4 space-y-4">
              {highlightedColleges.map((c) => {
                const detail = c as CollegeDetail;
                const rate = formatRate(c.acceptance_rate);
                const cost = formatCostSnippetForSeo(detail);
                return (
                  <li key={c.id} className="rounded-xl border border-gray-100 bg-[#faf9fc] p-4">
                    <Link
                      href={getSchoolPageHref(c.slug ?? "", c.name)}
                      className="font-semibold text-[#0C1120] hover:text-[#956EFE]"
                    >
                      {c.name}
                    </Link>
                    {c.location ? <p className="text-sm text-gray-500 mt-0.5">{c.location}</p> : null}
                    <p className="mt-2 text-sm text-gray-700">
                      {[rate, cost].filter(Boolean).join(" · ")}
                      {c.personality_line
                        ? ` — ${String(c.personality_line).replace(/<[^>]+>/g, "").slice(0, 120)}`
                        : ""}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="why-fit">
          <h2 id="why-fit" className="text-xl font-semibold text-[#0C1120]">
            Why these schools fit
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">{copy.why_fit}</p>
          {vibeLabels ? (
            <p className="mt-2 text-sm text-gray-600">
              Active signals: <strong>{vibeLabels}</strong>
              {intent.location ? (
                <>
                  {" "}
                  · Location: <strong>{intent.location}</strong>
                </>
              ) : null}
            </p>
          ) : null}
        </section>

        <section aria-labelledby="best-for" className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 id="best-for" className="text-lg font-semibold text-[#0C1120]">
              Best for
            </h2>
            <p className="mt-2 text-gray-700 text-sm leading-relaxed">{copy.best_for}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#0C1120]">Not ideal for</h2>
            <p className="mt-2 text-gray-700 text-sm leading-relaxed">{copy.not_ideal_for}</p>
          </div>
        </section>

        <section aria-labelledby="discover-faq">
          <h2 id="discover-faq" className="text-xl font-semibold text-[#0C1120]">
            Frequently asked questions
          </h2>
          <dl className="mt-4 space-y-6">
            {copy.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-medium text-[#0C1120]">{item.question}</dt>
                <dd className="mt-2 text-gray-700 leading-relaxed">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="methodology" className="rounded-xl border border-gray-100 bg-gray-50 p-5">
          <h2 id="methodology" className="text-lg font-semibold text-[#0C1120]">
            Methodology
          </h2>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">{copy.methodology}</p>
          <p className="mt-2 text-xs text-gray-500">Last updated: {new Date().toLocaleDateString("en-US")}</p>
        </section>

        <div className="text-center">
          <CollegeMatchQuizLink className="inline-flex rounded-xl bg-[#956EFE] px-6 py-3 text-white font-semibold hover:opacity-95">
            Find my archetype
          </CollegeMatchQuizLink>
        </div>
      </div>
    </article>
  );
}
