/** Colored egg sprites for the vibe-mix hatch game (public/images). */
const EGG_FILES = [
  "Color=Color2.png",
  "Color=Color2-1.png",
  "Color=Color3.png",
  "Color=Color3-1.png",
  "Color=Color4.png",
  "Color=Color4-1.png",
  "Color=Color5.png",
  "Color=Color5-1.png",
  "Color=Default.png",
  "Color=Default-1.png",
] as const;

export const VIBE_MIX_EGG_IMAGES = EGG_FILES.map(
  (file) => `/images/${encodeURIComponent(file)}`,
) as readonly string[];

export function pickRandomVibeMixEgg(exclude?: readonly string[]): string {
  const pool = exclude?.length
    ? VIBE_MIX_EGG_IMAGES.filter((img) => !exclude.includes(img))
    : [...VIBE_MIX_EGG_IMAGES];
  if (pool.length === 0) return VIBE_MIX_EGG_IMAGES[0]!;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

/** Pick `count` different egg sprites (no repeats). */
export function pickDistinctVibeMixEggs(count: number): string[] {
  const pool = [...VIBE_MIX_EGG_IMAGES];
  const n = Math.min(count, pool.length);
  const picked: string[] = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool[idx]!);
    pool.splice(idx, 1);
  }
  return picked;
}
