"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { createClient } from "@/lib/supabase/client";
import { SchoolCard } from "@/components/directory/SchoolCard";
import type { CollegeDetail } from "@/types/college-detail";

type Row = {
  id: string;
  name: string;
  slug: string | null;
  location: string | null;
  vibe_tags: string[] | null;
  new_image_link: string | null;
  personality_line: string | null;
  emoji_desc: string | null;
  acceptance_rate: number | null;
  tuition_range: string | null;
  student_body_size: number | null;
  campus_vibe: string | null;
};

function normVibes(tags: string[] | null | undefined): Set<string> {
  return new Set((tags ?? []).map((t) => t.toLowerCase().trim()).filter(Boolean));
}

function overlapScore(schoolTags: Set<string>, current: Set<string>): number {
  let n = 0;
  for (const t of schoolTags) if (current.has(t)) n++;
  return n;
}

function normalizeUrl(u: string | null | undefined): string | null {
  let t = u?.trim();
  if (!t) return null;

  // Handle values stored as strings like '"https://..."' or "'https://...'"
  // (sometimes rows are double-quoted)
  while (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    t = t.slice(1, -1).trim();
  }

  if (!t) return null;
  if (t.toLowerCase() === "null") return null;

  // Allow common storage URLs even if they don't include scheme.
  if (!/^https?:\/\//i.test(t)) {
    if (t.startsWith("//")) return `https:${t}`;
    if (t.includes("storage.googleapis.com/")) return `https://${t}`;
  }

  return t;
}

function isFilledUrl(u: string | null | undefined): boolean {
  return normalizeUrl(u) != null;
}

function normalizeEmojiDesc(emojiDesc: string | null): string[] {
  let s = emojiDesc?.trim() ?? "";
  if (!s) return [];

  // Handle values like '"[\"🎯 ...\"]"' stored as a string
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  if (!s || s.toLowerCase() === "null") return [];

  try {
    const parsed = JSON.parse(s);
    if (Array.isArray(parsed)) return parsed.map(String).map((x) => x.trim()).filter(Boolean);
  } catch {
    // ignore
  }

  if (s.startsWith("[") && s.endsWith("]")) {
    return s
      .slice(1, -1)
      .split(",")
      .map((x) => x.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  return [s];
}

export function SimilarSchoolsSection({ currentCollege }: { currentCollege: CollegeDetail }) {
  const [emblaRef] = useEmblaCarousel({ align: "start", loop: false, skipSnaps: false });
  const [schools, setSchools] = useState<Row[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const vibeKey = (currentCollege.vibe_tags ?? []).join("|");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setIsLoading(true);
      const supabase = createClient();
      const currentVibes = normVibes(currentCollege.vibe_tags ?? undefined);
      const { data, error } = await supabase
        .from("colleges")
        .select(
          "id,name,slug,location,vibe_tags,new_image_link,personality_line,emoji_desc,acceptance_rate,tuition_range,student_body_size,campus_vibe",
        )
        .neq("id", currentCollege.id)
        .limit(100);

      if (error || !data || cancelled) {
        setSchools([]);
        setIsLoading(false);
        return;
      }

      const rows = data as Row[];
      // Normalize + only keep schools that actually have a filled `new_image_link`.
      const normalized = rows.map((r) => ({
        ...r,
        new_image_link: normalizeUrl(r.new_image_link),
      }));

      const withNewImage = normalized.filter((r) => r.new_image_link != null);

      // "Fully filled out" prioritization for the carousel.
      // We compute a "fullness" score and sort by it first.
      const MIN_EMOJI_TAGS = 2;
      const MIN_PERSONALITY_LEN = 20;

      const scored = withNewImage.map((r) => {
        const tags = Array.isArray(r.vibe_tags) ? r.vibe_tags : [];
        const score = overlapScore(normVibes(tags), currentVibes) * 10;

        const locationNorm = normalizeUrl(r.location);
        const locationOk = locationNorm != null && locationNorm.includes(",");

        const personalityOk =
          normalizeUrl(r.personality_line) != null &&
          (r.personality_line?.trim().length ?? 0) >= MIN_PERSONALITY_LEN;

        const emojiTags = normalizeEmojiDesc(r.emoji_desc);
        const emojisOk = emojiTags.length >= MIN_EMOJI_TAGS;

        // We already filtered to new_image_link, so treat fullness as 0-3 across other fields.
        const fullness =
          (locationOk ? 1 : 0) +
          (personalityOk ? 1 : 0) +
          (emojisOk ? 1 : 0);

        return { r, score, fullness, locationOk, personalityOk, emojisOk };
      });

      const sortByPriority = (a: (typeof scored)[number], b: (typeof scored)[number]) => {
        if (b.fullness !== a.fullness) return b.fullness - a.fullness;
        if (b.score !== a.score) return b.score - a.score;
        return (b.r.new_image_link?.length ?? 0) - (a.r.new_image_link?.length ?? 0);
      };

      const fullyFilled = scored.filter((x) => x.fullness === 3).sort(sortByPriority);
      const twoOfThree = scored.filter((x) => x.fullness === 2).sort(sortByPriority);

      // If we have enough fully-filled cards, don't show the partially filled ones.
      // Otherwise, fill the remaining slots with the next-best (2/3).
      const TARGET = 12;
      const result =
        fullyFilled.length >= 6
          ? fullyFilled.slice(0, TARGET).map((x) => x.r)
          : [
              ...fullyFilled,
              ...twoOfThree.filter((x) => !fullyFilled.some((f) => f.r.id === x.r.id)),
            ]
              .slice(0, TARGET)
              .map((x) => x.r);

      if (!cancelled) setSchools(result);
      if (!cancelled) setIsLoading(false);
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [currentCollege.id, vibeKey, currentCollege.vibe_tags]);

  return (
    <section id="similar" className="scroll-mt-24 pt-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>🎯</span> Schools You Might Love
      </h2>
      {schools.length === 0 ? (
        <p className="text-sm text-gray-500 py-4">
          {isLoading ? "Loading recommendations…" : "No recommended schools found."}
        </p>
      ) : (
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 touch-pan-y">
          {schools.map((s) => {
            const slug = s.slug?.trim() || s.id;
            return (
              <div key={s.id} className="min-w-[280px] max-w-[280px] sm:min-w-[300px] sm:max-w-[300px] flex-[0_0_auto]">
                <SchoolCard
                  school={{
                    id: s.id,
                    name: s.name,
                    location: s.location || "",
                    slug,
                    new_image_link: s.new_image_link ?? undefined,
                    featured_image_url: undefined,
                    image_url: undefined,
                    banner: undefined,
                    personality_line: s.personality_line ?? undefined,
                    emoji_desc: s.emoji_desc ?? undefined,
                    vibe_tags: (s.vibe_tags ?? undefined) as string[] | undefined,
                    campus_vibe: s.campus_vibe ?? undefined,
                    acceptance_rate: s.acceptance_rate ?? undefined,
                    tuition_range: s.tuition_range ?? undefined,
                    student_body_size: s.student_body_size ?? undefined,
                  }}
                  mode="directory"
                  hideHeartButton
                />
              </div>
            );
          })}
        </div>
      </div>
      )}
    </section>
  );
}
