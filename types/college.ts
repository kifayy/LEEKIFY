export type College = {
  id: string;
  name: string;
  location?: string | null;
  description?: string | null;
  vibe_tags?: string[] | null;
  school_emoji?: string | null;
  personality_line?: string | null;
  popular?: boolean | null;
  slug?: string | null;
  new_image_link?: string | null;
  banner?: string | null;
  student_body_size?: number | null;
  acceptance_rate?: number | null;
  tuition_range?: string | null;
  emoji_desc?: string | null;
  campus_vibe?: string | null;
};
