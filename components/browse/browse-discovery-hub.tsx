"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { BrowseGuidedStarts } from "@/components/browse/browse-guided-starts";
import { BrowseMashupForm } from "@/components/browse/browse-mashup-form";
import { UsStateMapPicker } from "@/components/browse/us-state-map-picker";
import { VibeMixer } from "@/components/directory/VibeMixer";
import { trackBrowseEvent } from "@/lib/browse-analytics";
import { VIBE_OPTIONS } from "@/lib/directory/vibe-options";
import { SEO_BROWSE_LANDING_FOOTER_LINKS } from "@/lib/seo-browse-landings";
import type { College } from "@/types/college";

const EXAMPLE_QUERIES = [
  "studious and partying in California",
  "nature and tech colleges",
  "affordable beach schools",
  "good engineering schools for introverts",
];

type Tab = "vibes" | "mashup" | "natural" | "map";

async function ensureDiscover(body: Record<string, unknown>): Promise<string> {
  const res = await fetch("/api/discover/ensure", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as { slug?: string; error?: string };
  if (!res.ok || !data.slug) throw new Error(data.error ?? "Could not build discover page");
  return data.slug;
}

export function BrowseDiscoveryHub({ featuredColleges = [] }: { featuredColleges?: College[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("natural");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nlQuery, setNlQuery] = useState("");
  const [vibes, setVibes] = useState<string[]>([]);
  const [mapState, setMapState] = useState<string | null>(null);
  const [mapAbbr, setMapAbbr] = useState<string | null>(null);

  const goDiscover = async (body: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    trackBrowseEvent({
      type: "discover_submit",
      source: String(body.source ?? "natural_language"),
      query: typeof body.query === "string" ? body.query : undefined,
      vibes: Array.isArray(body.vibes) ? (body.vibes as string[]) : undefined,
    });
    try {
      const slug = await ensureDiscover(body);
      router.push(`/discover/${encodeURIComponent(slug)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "natural", label: "Describe it" },
    { id: "vibes", label: "Vibe mix" },
    { id: "mashup", label: "School mashup" },
    { id: "map", label: "Map" },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto md:max-w-none">
        <p className="text-center text-sm font-medium text-[#956EFE] mb-2">Discovery engine</p>
        <p className="text-center text-gray-600 text-sm mb-6 max-w-xl mx-auto">
          Describe your ideal college — we match vibes, location, and campus culture, then build a personalized
          answer page.
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-[#956EFE] text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-[#956EFE]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#956EFE] border-t-transparent" />
            <p className="text-gray-600">Building your college matches…</p>
          </div>
        ) : (
          <>
            {tab === "natural" && (
              <div className="max-w-2xl mx-auto">
                <label htmlFor="nl-query" className="sr-only">
                  Describe your ideal college
                </label>
                <input
                  id="nl-query"
                  type="text"
                  value={nlQuery}
                  onChange={(e) => setNlQuery(e.target.value)}
                  placeholder="Describe your ideal college…"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#956EFE]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && nlQuery.trim()) {
                      void goDiscover({ query: nlQuery.trim(), source: "natural_language" });
                    }
                  }}
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {EXAMPLE_QUERIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className="text-xs rounded-full bg-gray-100 px-3 py-1.5 text-gray-700 hover:bg-[#f0ebff]"
                      onClick={() => {
                        setNlQuery(q);
                        void goDiscover({ query: q, source: "natural_language" });
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!nlQuery.trim()}
                  className="mt-4 w-full rounded-xl bg-[#956EFE] py-3 font-semibold text-white disabled:opacity-40"
                  onClick={() => void goDiscover({ query: nlQuery.trim(), source: "natural_language" })}
                >
                  Find matches
                </button>
              </div>
            )}

            {tab === "vibes" && (
              <div className="max-w-xl mx-auto text-center">
                <VibeMixer selectedVibes={vibes} onVibeChange={setVibes} vibeOptions={[...VIBE_OPTIONS]} />
                <button
                  type="button"
                  disabled={vibes.length === 0}
                  className="mt-6 w-full rounded-xl bg-[#956EFE] py-3 font-semibold text-white disabled:opacity-40"
                  onClick={() =>
                    void goDiscover({
                      vibes,
                      query: vibes.join(" "),
                      source: "vibe_mix",
                      location: mapState,
                    })
                  }
                >
                  See vibe matches
                </button>
              </div>
            )}

            {tab === "mashup" && (
              <BrowseMashupForm
                onSubmit={(payload) => void goDiscover({ ...payload, source: "school_mashup" })}
              />
            )}

            {tab === "map" && (
              <div className="max-w-lg mx-auto">
                <UsStateMapPicker
                  selectedAbbr={mapAbbr}
                  onSelect={(name, abbr) => {
                    setMapState(name);
                    setMapAbbr(abbr);
                    void goDiscover({
                      location: name,
                      vibes: vibes.length ? vibes : undefined,
                      query: `colleges in ${name}`,
                      source: "map",
                    });
                  }}
                />
              </div>
            )}

            {error ? <p className="mt-4 text-center text-sm text-red-600">{error}</p> : null}
          </>
        )}

        {!loading && (
          <BrowseGuidedStarts
            categories={SEO_BROWSE_LANDING_FOOTER_LINKS}
            featuredColleges={featuredColleges}
            onExampleClick={(q) => void goDiscover({ query: q, source: "natural_language" })}
          />
        )}
      </div>
    </div>
  );
}
