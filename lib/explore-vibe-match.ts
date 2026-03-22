import type { College } from "@/types/college";
import { BROWSE_VIBE_TO_DB_TOKENS, collegeSatisfiesBrowseVibe } from "@/lib/browse-vibe-db-tags";

/** Normalized substrings — if `name` matches any, counts as party vibe (dashboard Explore parity). */
const PARTY_SCHOOL_NAME_HINTS: readonly string[] = [
  "santa barbara",
  "ucsb",
  "chico state",
  "west virginia",
  "florida state",
  "florida state university",
  "penn state",
  "pennsylvania state",
  "wisconsin-madison",
  "university of wisconsin",
  "tulane",
  "syracuse",
  "miami university",
  "university of miami",
  "university of alabama",
  "university of georgia",
  "university of texas at austin",
  "texas a&m",
  "arizona state",
  "indiana university",
  "university of iowa",
  "university of mississippi",
  "ole miss",
  "lsu",
  "louisiana state",
];

function normName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isKnownPartySchoolName(name: string | null | undefined): boolean {
  if (!name?.trim()) return false;
  const n = normName(name);
  return PARTY_SCHOOL_NAME_HINTS.some((hint) => n.includes(hint));
}

/** Match vibe tokens against free text (personality line, description, campus vibe, tags joined). */
function textFieldsSuggestVibe(college: College, uiVibe: string): boolean {
  const hay = [
    college.personality_line,
    college.description,
    college.campus_vibe,
    ...(college.vibe_tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  if (!hay.trim()) return false;
  const tokens = BROWSE_VIBE_TO_DB_TOKENS[uiVibe] ?? [uiVibe];
  for (const raw of tokens) {
    const t = raw.toLowerCase().trim();
    if (t.length >= 4 && hay.includes(t)) return true;
  }
  return false;
}

/**
 * OR-style Explore match: tags (browse map), text fields, or party-school name list for party-animal.
 */
export function exploreCollegeMatchesVibe(college: College, vibeId: string): boolean {
  if (collegeSatisfiesBrowseVibe(college.vibe_tags ?? undefined, vibeId)) return true;
  if (textFieldsSuggestVibe(college, vibeId)) return true;
  if (vibeId === "party-animal" && isKnownPartySchoolName(college.name)) return true;
  return false;
}
