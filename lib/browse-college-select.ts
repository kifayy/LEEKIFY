/**
 * Browse / Explore queries only need card + ordering + vibe match fields.
 * Avoids `select("*")` payloads (large unused columns, slower TTFB and JSON parse).
 */
export const BROWSE_COLLEGE_COLUMNS =
  "id,name,location,description,vibe_tags,school_emoji,personality_line,popular,slug,new_image_link,featured_image_url,image_url,banner,student_body_size,acceptance_rate,tuition_range,emoji_desc,campus_vibe";
