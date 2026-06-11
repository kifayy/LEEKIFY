import { detectStateInText } from "@/lib/us-states";
import type { DiscoverIntentType, ParsedDiscoverIntent } from "@/lib/discover/types";
import { buildCanonicalSlug, humanIntentTitle } from "@/lib/discover/slug";

const VIBE_KEYWORDS: Record<string, string[]> = {
  academic: ["studious", "academic", "study", "rigorous", "intellectual", "smart", "prestigious", "liberal arts"],
  social: ["party", "partying", "social", "greek", "frat", "sorority", "tailgate", "nightlife"],
  nature: ["nature", "outdoors", "outdoor", "hiking", "mountain", "forest", "green"],
  tech: ["tech", "technology", "engineering", "stem", "computer", "silicon"],
  artsy: ["artsy", "art", "creative", "design", "aesthetic"],
  sports: ["sports", "athletic", "game day", "football", "basketball"],
  business: ["business", "entrepreneur", "startup", "finance", "pre-professional"],
  creative: ["creative", "theater", "music", "film"],
  wellness: ["wellness", "health", "yoga", "mindful"],
  flirty: ["flirty", "dating", "social scene"],
  foodie: ["food", "foodie", "culinary"],
  diversity: ["diverse", "diversity", "inclusive"],
  beachy: ["beach", "beachy", "coastal", "surf"],
  city: ["city", "urban", "downtown"],
  chill: ["chill", "relaxed", "laid-back"],
};

function vibesFromText(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const [vibe, keywords] of Object.entries(VIBE_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) found.push(vibe);
  }
  return [...new Set(found)].slice(0, 2);
}

const DIMENSION_TO_VIBES: Record<string, string[]> = {
  academics: ["academic"],
  campus: ["artsy"],
  social_life: ["social", "flirty"],
  prestige: ["academic", "business"],
  location: ["nature"],
  athletics: ["sports", "social"],
};

export function parseIntentHeuristic(input: {
  query?: string;
  vibes?: string[];
  location?: string | null;
  source?: ParsedDiscoverIntent["source"];
  reference_schools?: ParsedDiscoverIntent["reference_schools"];
}): ParsedDiscoverIntent {
  const query = (input.query ?? "").trim();
  const source = input.source ?? (input.vibes?.length ? "vibe_mix" : "natural_language");

  let vibes = input.vibes?.length ? [...input.vibes].slice(0, 2) : vibesFromText(query);
  const location = input.location ?? detectStateInText(query);
  let intent_type: DiscoverIntentType = "match_list";
  const reference_schools = input.reference_schools ?? [];

  if (reference_schools.length >= 2) {
    intent_type = "school_mashup";
    if (vibes.length === 0) {
      const fromDims = reference_schools.flatMap((r) => DIMENSION_TO_VIBES[r.dimension] ?? []);
      vibes = [...new Set(fromDims)].slice(0, 2);
    }
  } else if (location && vibes.length === 0) {
    intent_type = "location_only";
  }

  if (vibes.length === 0 && !location) {
    vibes = ["academic"];
  }

  const canonical_slug = buildCanonicalSlug({ vibes, location, intent_type });
  const display_query =
    query ||
    humanIntentTitle({ vibes, location }).replace(/^What are the best /i, "").replace(/\?$/, "");

  return {
    intent_type,
    canonical_slug,
    vibes,
    location,
    modifiers: [],
    schools_mentioned: [],
    reference_schools,
    display_query,
    source,
  };
}
