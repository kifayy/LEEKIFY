import type { College } from "@/types/college";
import { LEGACY_VIBE_VALUE_ALIASES, resolveVibeValue } from "@/lib/directory/vibe-options";

function slugTokens(slug: string, ...extras: string[]): readonly string[] {
  const label = slug.replace(/-/g, " ");
  return [slug, label, ...extras];
}

/**
 * Maps each browse-chip slug to tokens that often appear in `colleges.vibe_tags`.
 */
export const BROWSE_VIBE_TO_DB_TOKENS: Record<string, readonly string[]> = {
  flirty: ["flirty", "flirtatious", "dating", "vibrant", "lively", "fun"],
  social: [
    "social",
    "party",
    "party-animal",
    "nightlife",
    "greek",
    "fraternity",
    "sorority",
    "tailgate",
    "fun-loving",
    "🎉 Fun-loving",
    "Fun-loving",
  ],
  chill: ["chill", "relaxed", "laid-back", "easygoing", "low-key", "calm"],
  trendy: ["trendy", "trend", "fashion", "stylish", "hip", "modern"],
  driven: ["driven", "ambitious", "motivated", "goal-oriented", "hardworking", "grit"],
  preppy: ["preppy", "prep", "classic", "collegiate", "ivy", "polished"],
  edgy: ["edgy", "alternative", "underground", "bold", "dark"],
  bookworm: ["bookworm", "reading", "literary", "library", "studious", "books"],
  academic: [
    "academic",
    "academic-weapon",
    "academics",
    "rigorous",
    "intellectual",
    "scholarly",
    "research",
    "honors",
    "📚 Academic Excellence",
    "Academic Excellence",
  ],
  creative: ["creative", "creative-soul", "creativity", "performing", "writing", "drama"],
  artsy: ["artsy", "artsy-af", "arts", "art", "studio", "gallery", "design", "theater", "theatre", "museum"],
  wellness: ["wellness", "wellness-focused", "wellbeing", "yoga", "mindful", "mental health", "balance", "zen"],
  tech: ["tech", "tech-savvy", "technology", "stem", "engineering", "coding", "computer", "software", "silicon"],
  business: ["business", "entrepreneurial", "entrepreneurship", "startup", "finance", "venture", "career-focused"],
  sports: ["sports", "sports-enthusiast", "athletics", "athletic", "football", "basketball", "varsity", "game day"],
  foodie: ["foodie", "food", "dining", "culinary", "restaurant", "cafeteria"],
  nature: ["nature", "nature-lover", "green", "environmental", "sustainability", "ecology", "trees", "park"],
  outdoorsy: ["outdoorsy", "outdoor", "outdoors", "hiking", "camping", "adventure", "climbing", "trail"],
  music: ["music", "musical", "band", "orchestra", "concert", "audio"],
  gamer: ["gamer", "gaming", "esports", "video games", "game design"],
  luxury: ["luxury", "upscale", "premium", "exclusive", "elite"],
  international: ["international", "global", "study abroad", "world", "multicultural"],
  diversity: ["diversity", "diverse", "diverse-community", "inclusive", "inclusion", "multicultural", "🌈 Inclusive"],
  "school-spirit": ["school spirit", "school-spirit", "pride", "tradition", "alumni", "mascot"],
  film: ["film", "cinema", "movie", "screenwriting", "filmmaking"],
  minimalist: ["minimalist", "minimal", "simple", "clean", "understated"],
  spiritual: ["spiritual", "faith", "meditation", "religious", "mindfulness"],
  "dark-academia": ["dark academia", "dark-academia", "gothic", "classic literature", "candlelit"],
  "light-academia": ["light academia", "light-academia", "soft academic", "poetry", "sunlit"],
  "clean-girl": ["clean girl", "clean-girl", "effortless", "natural beauty", "skincare"],
  "it-girl": ["it girl", "it-girl", "glam", "influencer", "mainstream chic"],
  "girl-next-door": ["girl next door", "girl-next-door", "wholesome", "sweet", "approachable"],
  "soft-boy": ["soft boy", "soft-boy", "gentle", "sensitive", "cozy"],
  "golden-retriever": ["golden retriever", "golden-retriever", "friendly", "outgoing", "sunshine"],
  "black-cat": ["black cat", "black-cat", "mysterious", "introverted", "moody"],
  "main-character": ["main character", "main-character", "protagonist", "center stage", "spotlight"],
  "coastal-grandmother": ["coastal grandmother", "coastal-grandmother", "linen", "neutral", "seaside calm"],
  cottagecore: ["cottagecore", "cottage", "rustic", "pastoral", "handmade"],
  fairycore: ["fairycore", "fairy", "whimsical", "enchanted", "ethereal"],
  barbiecore: ["barbiecore", "barbie", "pink", "playful glam"],
  "old-money": ["old money", "old-money", "prestige", "heritage", "quiet luxury"],
  "indie-sleaze": ["indie sleaze", "indie-sleaze", "indie", "gritty cool", "nightlife indie"],
  y2k: ["y2k", "2000s", "retro tech", "nostalgic"],
  grunge: ["grunge", "grungy", "flannel", "90s rock"],
  boho: ["boho", "bohemian", "free spirit", "eclectic"],
  streetwear: ["streetwear", "street style", "sneakers", "urban fashion"],
  royalcore: ["royalcore", "royal", "regal", "palace", "aristocratic"],
  kawaii: ["kawaii", "cute", "japanese pop culture", "pastel cute"],
  cybercore: ["cybercore", "cyber", "futuristic", "digital", "neon"],
  "academia-core": ["academia core", "academia-core", "campus aesthetic", "collegiate core"],
  beachy: ["beachy", "beach", "ocean", "surf", "sand", "coastal living"],
  coastal: ["coastal", "coast", "shoreline", "seaside", "harbor"],
  city: ["city", "urban", "metropolitan", "downtown", "skyline"],
  suburban: ["suburban", "suburb", "neighborhood", "family-friendly"],
  mountain: ["mountain", "mountains", "alpine", "ski", "high elevation"],
  desert: ["desert", "arid", "southwest", "cactus", "dry climate"],
  southern: ["southern", "south", "hospitality", "warm climate south"],
  "west-coast": ["west coast", "west-coast", "california", "pacific", "palm"],
  "east-coast": ["east coast", "east-coast", "northeast", "new york", "boston"],
  "small-town": ["small town", "small-town", "rural", "close-knit", "hometown"],
};

/** Legacy slug entries so old URLs still match. */
for (const [legacy, next] of Object.entries(LEGACY_VIBE_VALUE_ALIASES)) {
  if (!BROWSE_VIBE_TO_DB_TOKENS[legacy]) {
    BROWSE_VIBE_TO_DB_TOKENS[legacy] = BROWSE_VIBE_TO_DB_TOKENS[next] ?? slugTokens(legacy, next);
  }
}

function tokensForUiVibe(uiVibe: string): readonly string[] {
  const resolved = resolveVibeValue(uiVibe);
  return BROWSE_VIBE_TO_DB_TOKENS[resolved] ?? BROWSE_VIBE_TO_DB_TOKENS[uiVibe] ?? slugTokens(resolved);
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
