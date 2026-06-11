export type VibeOption = {
  value: string;
  label: string;
  emoji: string;
  requiresQuiz?: boolean;
};

/** Browse aesthetic chips — personality archetypes, interests, and recognizable aesthetics. */
export const VIBE_OPTIONS: readonly VibeOption[] = [
  { value: "flirty", label: "💋 Flirty", emoji: "💋" },
  { value: "social", label: "🎉 Social", emoji: "🎉" },
  { value: "chill", label: "😌 Chill", emoji: "😌" },
  { value: "trendy", label: "✨ Trendy", emoji: "✨" },
  { value: "driven", label: "🔥 Driven", emoji: "🔥" },
  { value: "preppy", label: "👔 Preppy", emoji: "👔" },
  { value: "edgy", label: "🖤 Edgy", emoji: "🖤" },
  { value: "bookworm", label: "📚 Bookworm", emoji: "📚" },
  { value: "academic", label: "🏛️ Academic", emoji: "🏛️" },
  { value: "creative", label: "🎭 Creative", emoji: "🎭" },
  { value: "artsy", label: "🎨 Artsy", emoji: "🎨" },
  { value: "wellness", label: "🧘 Wellness", emoji: "🧘" },
  { value: "tech", label: "💻 Tech", emoji: "💻" },
  { value: "business", label: "🚀 Business", emoji: "🚀" },
  { value: "sports", label: "🏈 Sports", emoji: "🏈" },
  { value: "foodie", label: "🍜 Foodie", emoji: "🍜" },
  { value: "nature", label: "🌿 Nature", emoji: "🌿" },
  { value: "outdoorsy", label: "⛰️ Outdoorsy", emoji: "⛰️" },
  { value: "music", label: "🎧 Music", emoji: "🎧" },
  { value: "gamer", label: "🎮 Gamer", emoji: "🎮" },
  { value: "luxury", label: "💎 Luxury", emoji: "💎" },
  { value: "international", label: "🌐 International", emoji: "🌐" },
  { value: "diversity", label: "🌍 Diversity", emoji: "🌍" },
  { value: "school-spirit", label: "🏫 Spirit", emoji: "🏫" },
  { value: "film", label: "🎬 Film", emoji: "🎬" },
  { value: "minimalist", label: "⚪ Minimalist", emoji: "⚪" },
  { value: "spiritual", label: "🔮 Spiritual", emoji: "🔮" },
  { value: "dark-academia", label: "📖 Dark Academia", emoji: "📖" },
  { value: "light-academia", label: "🏛️ Light Academia", emoji: "🏛️" },
  { value: "it-girl", label: "💅 It Girl", emoji: "💅" },
  { value: "old-money", label: "💎 Old Money", emoji: "💎" },
  { value: "indie-sleaze", label: "🎸 Indie", emoji: "🎸" },
  { value: "y2k", label: "📟 Y2K", emoji: "📟" },
  { value: "grunge", label: "🎧 Grunge", emoji: "🎧" },
  { value: "boho", label: "🌻 Boho", emoji: "🌻" },
  { value: "streetwear", label: "👟 Streetwear", emoji: "👟" },
  { value: "kawaii", label: "🍡 Kawaii", emoji: "🍡" },
] as const;

/** Legacy browse slugs still present in URLs and SEO configs. */
export const LEGACY_VIBE_VALUE_ALIASES: Record<string, string> = {
  "nature-lover": "nature",
  "artsy-af": "artsy",
  "academic-weapon": "academic",
  "party-animal": "social",
  "tech-savvy": "tech",
  "sports-enthusiast": "sports",
  entrepreneurial: "business",
  "creative-soul": "creative",
  "wellness-focused": "wellness",
  "diverse-community": "diversity",
  "black-cat": "edgy",
  "coastal-grandmother": "nature",
  cottagecore: "nature",
  fairycore: "artsy",
  barbiecore: "trendy",
  royalcore: "old-money",
  cybercore: "tech",
  "academia-core": "academic",
  beachy: "nature",
  coastal: "nature",
  city: "trendy",
  suburban: "chill",
  mountain: "outdoorsy",
  desert: "outdoorsy",
  southern: "chill",
};
export function resolveVibeValue(value: string): string {
  return LEGACY_VIBE_VALUE_ALIASES[value] ?? value;
}

export const VIBE_LABEL_BY_VALUE = Object.fromEntries(
  VIBE_OPTIONS.map((v) => [v.value, v.label.replace(/^[^\s]+\s/, "")]),
) as Record<string, string>;

for (const [legacy, next] of Object.entries(LEGACY_VIBE_VALUE_ALIASES)) {
  if (!VIBE_LABEL_BY_VALUE[legacy] && VIBE_LABEL_BY_VALUE[next]) {
    VIBE_LABEL_BY_VALUE[legacy] = VIBE_LABEL_BY_VALUE[next]!;
  }
}

export const MASHUP_DIMENSIONS = [
  { value: "academics", label: "Academics" },
  { value: "campus", label: "Campus" },
  { value: "social_life", label: "Social life" },
  { value: "prestige", label: "Prestige" },
  { value: "location", label: "Location" },
  { value: "athletics", label: "Athletics" },
] as const;
