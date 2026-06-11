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

export type VibeMixEggAccent = {
  label: string;
  iconBg: string;
  brush: string;
};

const EGG_FAMILY_ACCENTS: Record<string, VibeMixEggAccent> = {
  Default: {
    label: "text-[#F59E0B]",
    iconBg: "bg-[#FEF3C7]",
    brush: "#FBBF24",
  },
  Color2: {
    label: "text-[#F472B6]",
    iconBg: "bg-[#FCE7F3]",
    brush: "#F472B6",
  },
  Color3: {
    label: "text-[#956EFE]",
    iconBg: "bg-[#EDE9FE]",
    brush: "#A78BFA",
  },
  Color4: {
    label: "text-[#16A34A]",
    iconBg: "bg-[#BBF7D0]",
    brush: "#4ADE80",
  },
  Color5: {
    label: "text-[#0EA5E9]",
    iconBg: "bg-[#BAE6FD]",
    brush: "#38BDF8",
  },
};

const DEFAULT_EGG_ACCENT = EGG_FAMILY_ACCENTS.Color3!;

function getEggFamilyKey(eggSrc: string): string {
  const decoded = decodeURIComponent(eggSrc);
  const match = decoded.match(/Color=(Default|Color\d)/);
  return match?.[1] ?? "Default";
}

function pickRandomFromPool(pool: readonly string[]): string {
  if (pool.length === 0) return VIBE_MIX_EGG_IMAGES[0]!;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

function filterEggsByFamilies(excludeFamilies: readonly string[]): string[] {
  const blocked = new Set(excludeFamilies);
  return VIBE_MIX_EGG_IMAGES.filter((src) => !blocked.has(getEggFamilyKey(src)));
}

function filterEggs(excludeFamilies: readonly string[], excludeEggs: readonly string[]): string[] {
  const blockedFamilies = new Set(excludeFamilies);
  const blockedEggs = new Set(excludeEggs);
  return VIBE_MIX_EGG_IMAGES.filter(
    (src) => !blockedFamilies.has(getEggFamilyKey(src)) && !blockedEggs.has(src),
  );
}

/** Label, icon circle, and underline colors that match an egg sprite. */
export function getVibeMixEggAccent(eggSrc?: string): VibeMixEggAccent {
  if (!eggSrc) return DEFAULT_EGG_ACCENT;
  const family = getEggFamilyKey(eggSrc);
  return EGG_FAMILY_ACCENTS[family] ?? EGG_FAMILY_ACCENTS.Default!;
}

export function pickRandomVibeMixEgg(exclude?: readonly string[]): string {
  const pool = exclude?.length
    ? VIBE_MIX_EGG_IMAGES.filter((img) => !exclude.includes(img))
    : [...VIBE_MIX_EGG_IMAGES];
  if (pool.length === 0) return VIBE_MIX_EGG_IMAGES[0]!;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

/** Pick a new egg sprite with a different accent color from the other slot (and current slot when possible). */
export function rotateVibeMixEgg(current?: string, otherSlotEgg?: string): string {
  const otherFamily = otherSlotEgg ? getEggFamilyKey(otherSlotEgg) : undefined;
  const currentFamily = current ? getEggFamilyKey(current) : undefined;
  const excludeFamilies = [otherFamily, currentFamily].filter(Boolean) as string[];

  const distinctColorPool = filterEggs(excludeFamilies, current ? [current] : []);
  if (distinctColorPool.length > 0) return pickRandomFromPool(distinctColorPool);

  const otherSlotDistinctPool = otherFamily
    ? filterEggsByFamilies([otherFamily]).filter((src) => src !== current)
    : VIBE_MIX_EGG_IMAGES.filter((src) => src !== current);
  if (otherSlotDistinctPool.length > 0) return pickRandomFromPool(otherSlotDistinctPool);

  return pickRandomVibeMixEgg(current ? [current] : undefined);
}

/** Pick `count` egg sprites from different accent-color families when possible. */
export function pickDistinctVibeMixEggs(count: number): string[] {
  const families = Object.keys(EGG_FAMILY_ACCENTS).sort(() => Math.random() - 0.5);
  const picked: string[] = [];

  for (const family of families) {
    if (picked.length >= count) break;
    const familyEggs = VIBE_MIX_EGG_IMAGES.filter((src) => getEggFamilyKey(src) === family);
    if (familyEggs.length === 0) continue;
    picked.push(pickRandomFromPool(familyEggs));
  }

  while (picked.length < count) {
    picked.push(pickRandomVibeMixEgg(picked));
  }

  return picked.slice(0, count);
}
