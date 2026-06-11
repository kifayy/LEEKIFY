export type BabyMakerPreview = {
  emoji: string;
  text: string;
};

/** Cycles in the top Baby Maker field before a pick. */
export const BABY_MAKER_PREVIEW_A: readonly BabyMakerPreview[] = [
  { emoji: "🎨", text: "Artsy" },
  { emoji: "🥳", text: "Social" },
  { emoji: "✨", text: "Trendy" },
  { emoji: "😌", text: "Chill" },
  { emoji: "🎉", text: "Party" },
] as const;

/** Cycles in the bottom Baby Maker field before a pick. */
export const BABY_MAKER_PREVIEW_B: readonly BabyMakerPreview[] = [
  { emoji: "💋", text: "Flirty" },
  { emoji: "✨", text: "Trendy" },
  { emoji: "🥳", text: "Social" },
  { emoji: "🎭", text: "Creative" },
  { emoji: "😌", text: "Chill" },
] as const;
