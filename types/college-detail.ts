/** Full college row shape for school detail page (Supabase `colleges`). */
export type FridayTimelineEntry = {
  time: string;
  activity: string;
  location: string;
  vibe: string;
};

export type CollegeDetail = {
  id: string;
  name: string;
  slug?: string | null;
  location?: string | null;
  description?: string | null;
  campus_vibe?: string | null;
  student_body_size?: number | null;
  acceptance_rate?: number | null;
  tuition_range?: string | null;
  /** Fallback when tuition_range empty; shown as formatted $ */
  avg_price?: number | null;
  popular?: boolean | null;
  vibe_tags?: string[] | null;
  highlights?: string[] | null;
  friday_timeline?: FridayTimelineEntry[] | null;
  study_spots?: string[] | null;
  student_food?: string[] | null;
  similar_schools?: string[] | null;
  school_emoji?: string | null;
  personality_line?: string | null;
  why_perfect_match?: string | null;
  new_image_link?: string | null;
  banner?: string | null;
  featured_image_url?: string | null;
  emoji_desc?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  keywords?: string[] | null;
  human_stats?: Record<string, unknown> | null;
};
