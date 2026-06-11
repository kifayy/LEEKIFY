export type PopularBrowseTab = "vibes" | "universities" | "celebrities";

export const POPULAR_BROWSE_TABS: { id: PopularBrowseTab; label: string }[] = [
  { id: "vibes", label: "Vibes" },
  { id: "universities", label: "Universities" },
  { id: "celebrities", label: "Celebrities" },
];

export const POPULAR_BROWSE_TAB_PLACEHOLDER: Record<PopularBrowseTab, string> = {
  vibes: "Search vibes",
  universities: "Search universities",
  celebrities: "Search celebrities",
};

export type PopularCelebrity = {
  emoji: string;
  name: string;
};

export const POPULAR_BROWSE_CELEBRITIES: readonly PopularCelebrity[] = [
  { emoji: "🎤", name: "Justin Bieber" },
  { emoji: "🎸", name: "Olivia Rodrigo" },
  { emoji: "✨", name: "Taylor Swift" },
  { emoji: "🎬", name: "Timothée Chalamet" },
  { emoji: "🏀", name: "LeBron James" },
  { emoji: "💄", name: "Sabrina Carpenter" },
  { emoji: "🎧", name: "Bad Bunny" },
  { emoji: "📱", name: "Charli D'Amelio" },
  { emoji: "🎹", name: "Billie Eilish" },
  { emoji: "⚽", name: "Cristiano Ronaldo" },
] as const;

/** Curated states — used in state search mode only. */
export const POPULAR_BROWSE_LOCATIONS = [
  "California",
  "New York",
  "Texas",
  "Florida",
  "Massachusetts",
  "Illinois",
  "Pennsylvania",
  "Georgia",
  "Colorado",
  "Washington",
  "North Carolina",
  "Virginia",
] as const;

export function matchPopularCelebrities(query: string): PopularCelebrity[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...POPULAR_BROWSE_CELEBRITIES];
  return POPULAR_BROWSE_CELEBRITIES.filter((c) => c.name.toLowerCase().includes(q));
}
