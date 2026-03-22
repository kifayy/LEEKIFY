import type { College } from "@/types/college";

/**
 * Maps each browse-chip slug to tokens that often appear in `colleges.vibe_tags`
 * (keywords, slug, labels). Keeps filters working when DB tags don’t use the same
 * strings as the UI `value`.
 */
export const BROWSE_VIBE_TO_DB_TOKENS: Record<string, readonly string[]> = {
  "nature-lover": [
    "nature-lover",
    "nature",
    "outdoor",
    "outdoors",
    "green",
    "environmental",
    "sustainability",
    "hiking",
    "environment",
    "tree",
    "trees",
    "park",
    "ecology",
    "🌿 Nature-Lover",
    "Nature-Lover",
  ],
  flirty: [
    "flirty",
    "flirtatious",
    "social",
    "dating",
    "vibrant",
    "lively",
    "fun",
    "nightlife",
  ],
  "artsy-af": [
    "artsy-af",
    "artsy",
    "arts",
    "studio",
    "gallery",
    "design",
    "theater",
    "theatre",
    "museum",
    "🎨 Creative Spirit",
    "Creative Spirit",
  ],
  "academic-weapon": [
    "academic-weapon",
    "academic",
    "academics",
    "rigorous",
    "intellectual",
    "scholarly",
    "studious",
    "research",
    "honors",
    "📚 Academic Excellence",
    "Academic Excellence",
  ],
  "party-animal": [
    "party-animal",
    "party",
    "social",
    "nightlife",
    "greek",
    "fraternity",
    "sorority",
    "fun",
    "lively",
    "vibrant",
    "🎉 Fun-loving",
    "Fun-loving",
  ],
  "tech-savvy": [
    "tech-savvy",
    "tech",
    "technology",
    "stem",
    "engineering",
    "innovation",
    "coding",
    "computer",
    "software",
    "silicon",
    "🔬 Innovation & Tech",
    "Innovation & Tech",
  ],
  "sports-enthusiast": [
    "sports-enthusiast",
    "sports",
    "athletics",
    "athletic",
    "football",
    "basketball",
    "ncaa",
    "varsity",
    "stadium",
    "game day",
  ],
  entrepreneurial: [
    "entrepreneurial",
    "entrepreneurship",
    "startup",
    "startups",
    "business",
    "venture",
    "innovation",
    "💼 Career-focused",
    "Career-focused",
  ],
  "creative-soul": [
    "creative-soul",
    "creative",
    "creativity",
    "performing",
    "music",
    "film",
    "writing",
    "drama",
  ],
  "wellness-focused": [
    "wellness-focused",
    "wellness",
    "wellbeing",
    "well-being",
    "mindful",
    "yoga",
    "balance",
    "mental health",
    "zen",
    "🧘 Mindful & Balanced",
    "Mindful & Balanced",
  ],
  "diverse-community": [
    "diverse-community",
    "diverse",
    "diversity",
    "inclusive",
    "inclusion",
    "multicultural",
    "international",
    "global",
    "🌈 Inclusive & Open-minded",
    "Inclusive & Open-minded",
    "🌍 Adventurous",
  ],
  foodie: [
    "foodie",
    "food",
    "dining",
    "culinary",
    "restaurant",
    "cafeteria",
    "farm",
    "🍜",
  ],
};

function tokensForUiVibe(uiVibe: string): readonly string[] {
  return BROWSE_VIBE_TO_DB_TOKENS[uiVibe] ?? [uiVibe];
}

/** Deduped list of DB tokens to OR together in PostgREST `vibe_tags.cs.{…}` filters. */
export function uniqueExpandBrowseVibeTokens(uiVibes: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of uiVibes) {
    for (const t of tokensForUiVibe(v)) {
      const s = t.trim();
      if (!s || seen.has(s)) continue;
      seen.add(s);
      out.push(s);
    }
  }
  return out;
}

/** One `vibe_tags` contains clause for PostgREST `.or()` */
function vibeTagsCsClause(token: string): string {
  if (/^[a-zA-Z0-9_-]+$/.test(token)) {
    return `vibe_tags.cs.{${token}}`;
  }
  const escaped = token.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `vibe_tags.cs.{"${escaped}"}`;
}

/** Comma-joined OR of `vibe_tags` contains filters (empty if no tokens). */
export function buildVibeTagsOrFilter(tokens: string[]): string {
  return tokens.map(vibeTagsCsClause).join(",");
}

/**
 * Whether a school’s tags satisfy one UI vibe (exact or loose substring on longer tokens).
 */
export function collegeSatisfiesBrowseVibe(schoolTags: string[] | null | undefined, uiVibe: string): boolean {
  const tags = schoolTags ?? [];
  if (!tags.length) return false;
  const normSchool = tags.map((t) => t.toLowerCase().trim()).filter(Boolean);
  for (const rawTok of tokensForUiVibe(uiVibe)) {
    const tok = rawTok.toLowerCase().trim();
    if (!tok) continue;
    for (const st of normSchool) {
      if (st === tok) return true;
      // Avoid short tokens matching inside unrelated words (e.g. "art" in "party").
      if (tok.length >= 5 && st.includes(tok)) return true;
      if (st.length >= 5 && tok.includes(st)) return true;
    }
  }
  return false;
}

/** How many selected UI vibes this college matches (for sorting tiers). */
export function countMatchedBrowseVibes(
  college: Pick<College, "vibe_tags">,
  selectedUiVibes: string[],
): number {
  if (!selectedUiVibes.length) return 0;
  return selectedUiVibes.filter((v) => collegeSatisfiesBrowseVibe(college.vibe_tags ?? undefined, v)).length;
}
