import type { College } from "@/types/college";

/** Parse emoji_desc: JSON array, bracket list, one tag per line, or single string. */
export function parseEmojiDescTags(emojiDesc?: string | null): string[] {
  if (!emojiDesc?.trim()) return [];
  try {
    const p = JSON.parse(emojiDesc) as unknown;
    if (Array.isArray(p)) {
      const a = p.map(String).filter((t) => t.trim().length > 0);
      if (a.length >= 2) return a;
    }
  } catch {
    /* fall through */
  }
  const s = emojiDesc.trim();
  if (s.startsWith("[") && s.endsWith("]")) {
    const parts = s
      .slice(1, -1)
      .split(",")
      .map((x) => x.trim().replace(/^["']|["']$/g, ""))
      .filter((t) => t.length > 0);
    if (parts.length >= 2) return parts;
  }
  const lines = s.split(/\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines.length >= 2) return lines;
  return s ? [s] : [];
}

/**
 * “Fully filled” cards: City, ST-style location, rich personality line, 2+ emoji tags, hero image.
 */
export function isFullyFilledOutCollege(c: College): boolean {
  const loc = (c.location ?? "").trim();
  if (loc.length < 6 || !loc.includes(",")) return false;
  const pl = (c.personality_line ?? "").trim();
  if (pl.length < 20) return false;
  if (parseEmojiDescTags(c.emoji_desc).length < 2) return false;
  const img = c.new_image_link;
  if (!img || String(img).trim() === "" || String(img) === "null") return false;
  return true;
}

export function orderCollegesForBrowse(list: College[], seed: number): College[] {
  const seededRandom = (s: number, i: number) => {
    const x = Math.sin(s * 1000 + i) * 10000;
    return x - Math.floor(x);
  };
  const shuffle = (arr: College[], salt: number) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(seed + salt, i) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  const hasImg = (college: College) =>
    Boolean(
      college.new_image_link && college.new_image_link !== "null" && String(college.new_image_link).trim() !== "",
    );
  const orderPartition = (arr: College[], baseSalt: number) => {
    const withImage = arr.filter(hasImg);
    const withoutImage = arr.filter((college) => !hasImg(college));
    return [
      ...shuffle(withImage.filter((college) => college.popular), baseSalt),
      ...shuffle(withImage.filter((college) => !college.popular), baseSalt + 1),
      ...shuffle(withoutImage.filter((college) => college.popular), baseSalt + 2),
      ...shuffle(withoutImage.filter((college) => !college.popular), baseSalt + 3),
    ];
  };
  const filled = list.filter(isFullyFilledOutCollege);
  const rest = list.filter((college) => !isFullyFilledOutCollege(college));
  return [...orderPartition(filled, 0), ...orderPartition(rest, 10)];
}

/** First browse grid page — deterministic seed so SSR HTML matches hydration. */
export function sliceBrowseCollegesForGrid(
  list: College[],
  pageSize: number,
  page = 0,
  seed = 0,
): { colleges: College[]; hasMore: boolean } {
  const ordered = orderCollegesForBrowse(list, seed);
  const from = page * pageSize;
  const colleges = ordered.slice(from, from + pageSize);
  return { colleges, hasMore: from + pageSize < ordered.length };
}
