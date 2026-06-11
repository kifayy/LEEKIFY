import { LEGACY_VIBE_VALUE_ALIASES, VIBE_OPTIONS } from "@/lib/directory/vibe-options";

export const VIBE_EMOJIS: Record<string, string> = {
  ...Object.fromEntries(VIBE_OPTIONS.map((v) => [v.value, v.emoji])),
  ...Object.fromEntries(
    Object.entries(LEGACY_VIBE_VALUE_ALIASES).map(([legacy, next]) => {
      const emoji = VIBE_OPTIONS.find((v) => v.value === next)?.emoji ?? "✨";
      return [legacy, emoji];
    }),
  ),
};
