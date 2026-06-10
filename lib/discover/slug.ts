import { VIBE_LABEL_BY_VALUE } from "@/lib/directory/vibe-options";

function slugifyPart(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

/** Build canonical slug from structured intent (deterministic clustering key). */
export function buildCanonicalSlug(input: {
  vibes: string[];
  location: string | null;
  intent_type?: string;
  modifiers?: string[];
}): string {
  const sortedVibes = [...input.vibes].sort();
  const locationPart = input.location ? slugifyPart(input.location) : "";

  if (sortedVibes.length === 0 && locationPart) {
    return `colleges-in-${locationPart}`;
  }

  if (sortedVibes.length === 1 && !locationPart) {
    const vibe = sortedVibes[0]!;
    const label = slugifyPart(VIBE_LABEL_BY_VALUE[vibe] ?? vibe);
    return `${label}-colleges`;
  }

  if (sortedVibes.length === 2) {
    const [a, b] = sortedVibes.map((v) => slugifyPart(VIBE_LABEL_BY_VALUE[v] ?? v));
    if (a === "academic" && b === "social" && locationPart) {
      return `studying-and-partying-in-${locationPart}`;
    }
    if (locationPart) {
      return `${a}-${b}-colleges-in-${locationPart}`;
    }
    return `${a}-${b}-colleges`;
  }

  if (locationPart) {
    const vibePart = sortedVibes.map((v) => slugifyPart(VIBE_LABEL_BY_VALUE[v] ?? v)).join("-");
    return vibePart ? `${vibePart}-colleges-in-${locationPart}` : `colleges-in-${locationPart}`;
  }

  const fallback = sortedVibes.map((v) => slugifyPart(VIBE_LABEL_BY_VALUE[v] ?? v)).join("-");
  return fallback ? `${fallback}-colleges` : "college-matches";
}

export function humanIntentTitle(input: {
  vibes: string[];
  location: string | null;
  displayQuery?: string;
}): string {
  if (input.displayQuery?.trim()) {
    const q = input.displayQuery.trim();
    if (/^what |^which |^best /i.test(q)) return q.endsWith("?") ? q : `${q}?`;
    return `What are the best colleges for ${q.replace(/\?$/g, "")}?`;
  }

  const vibeLabels = input.vibes.map((v) => VIBE_LABEL_BY_VALUE[v] ?? v);
  const loc = input.location;

  if (vibeLabels.length === 2 && loc) {
    return `What are the best ${vibeLabels[0]?.toLowerCase()} and ${vibeLabels[1]?.toLowerCase()} colleges in ${loc}?`;
  }
  if (vibeLabels.length === 2) {
    return `What are the best ${vibeLabels[0]?.toLowerCase()} and ${vibeLabels[1]?.toLowerCase()} colleges?`;
  }
  if (loc && vibeLabels.length === 0) {
    return `What are the best colleges in ${loc}?`;
  }
  if (loc && vibeLabels.length === 1) {
    return `What are the best ${vibeLabels[0]?.toLowerCase()} colleges in ${loc}?`;
  }
  if (vibeLabels.length === 1) {
    return `What are the best ${vibeLabels[0]?.toLowerCase()} colleges?`;
  }
  return "What colleges match this vibe?";
}
