export type VibeOption = {
  value: string;
  label: string;
  emoji: string;
  requiresQuiz?: boolean;
};

export const VIBE_OPTIONS: readonly VibeOption[] = [
  { value: "nature-lover", label: "🌿 Nature", emoji: "🌿" },
  { value: "flirty", label: "💋 Flirty", emoji: "💋" },
  { value: "artsy-af", label: "🎨 Artsy", emoji: "🎨" },
  { value: "academic-weapon", label: "🏛️ Academic", emoji: "🏛️" },
  { value: "party-animal", label: "🎉 Social", emoji: "🎉" },
  { value: "tech-savvy", label: "💻 Tech", emoji: "💻" },
  { value: "sports-enthusiast", label: "🏈 Sports", emoji: "🏈" },
  { value: "entrepreneurial", label: "🚀 Business", emoji: "🚀" },
  { value: "creative-soul", label: "🎭 Creative", emoji: "🎭" },
  { value: "wellness-focused", label: "🧘 Wellness", emoji: "🧘" },
  { value: "diverse-community", label: "🌍 Diversity", emoji: "🌍" },
  { value: "foodie", label: "🍜 Foodie", emoji: "🍜" },
] as const;

export const VIBE_LABEL_BY_VALUE = Object.fromEntries(
  VIBE_OPTIONS.map((v) => [v.value, v.label.replace(/^[^\s]+\s/, "")]),
) as Record<string, string>;

export const MASHUP_DIMENSIONS = [
  { value: "academics", label: "Academics" },
  { value: "campus", label: "Campus" },
  { value: "social_life", label: "Social life" },
  { value: "prestige", label: "Prestige" },
  { value: "location", label: "Location" },
  { value: "athletics", label: "Athletics" },
] as const;
