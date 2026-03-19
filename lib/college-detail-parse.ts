import type { CollegeDetail, FridayTimelineEntry } from "@/types/college-detail";
import { sanitizeCollegeBanner } from "@/lib/sanitize-college-banner";

function parseJsonArray<T>(v: unknown): T[] | null {
  if (v == null) return null;
  if (Array.isArray(v)) return v as T[];
  if (typeof v === "string") {
    try {
      const p = JSON.parse(v);
      return Array.isArray(p) ? p : null;
    } catch {
      return null;
    }
  }
  return null;
}

/** Normalize Supabase row into CollegeDetail (JSON columns may be strings). */
export function parseCollegeDetailRow(row: Record<string, unknown>): CollegeDetail {
  const friday = parseJsonArray<FridayTimelineEntry>(row.friday_timeline);
  const highlights = parseJsonArray<string>(row.highlights);
  const study = parseJsonArray<string>(row.study_spots);
  const food = parseJsonArray<string>(row.student_food);
  const similar = parseJsonArray<string>(row.similar_schools);
  const keywords = parseJsonArray<string>(row.keywords);
  let vibe_tags = row.vibe_tags as string[] | null;
  if (typeof vibe_tags === "string") {
    try {
      vibe_tags = JSON.parse(vibe_tags);
    } catch {
      vibe_tags = null;
    }
  }

  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    slug: row.slug != null ? String(row.slug) : null,
    location: row.location != null ? String(row.location) : null,
    description: row.description != null ? String(row.description) : null,
    campus_vibe: row.campus_vibe != null ? String(row.campus_vibe) : null,
    student_body_size: typeof row.student_body_size === "number" ? row.student_body_size : null,
    acceptance_rate: typeof row.acceptance_rate === "number" ? row.acceptance_rate : null,
    tuition_range: row.tuition_range != null ? String(row.tuition_range) : null,
    avg_price: typeof row.avg_price === "number" ? row.avg_price : null,
    popular: typeof row.popular === "boolean" ? row.popular : null,
    vibe_tags,
    highlights,
    friday_timeline: friday,
    study_spots: study,
    student_food: food,
    similar_schools: similar,
    school_emoji: row.school_emoji != null ? String(row.school_emoji) : null,
    personality_line: row.personality_line != null ? String(row.personality_line) : null,
    why_perfect_match: row.why_perfect_match != null ? String(row.why_perfect_match) : null,
    new_image_link: row.new_image_link != null ? String(row.new_image_link) : null,
    banner: sanitizeCollegeBanner(row.banner != null ? String(row.banner) : null),
    featured_image_url: row.featured_image_url != null ? String(row.featured_image_url) : null,
    emoji_desc: row.emoji_desc != null ? String(row.emoji_desc) : null,
    meta_title: row.meta_title != null ? String(row.meta_title) : null,
    meta_description: row.meta_description != null ? String(row.meta_description) : null,
    keywords,
    human_stats: row.human_stats && typeof row.human_stats === "object" ? (row.human_stats as Record<string, unknown>) : null,
  };
}
