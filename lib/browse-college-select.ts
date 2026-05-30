/**
 * Browse / Explore queries only need card + ordering + vibe match fields.
 * Avoids `select("*")` payloads (large unused columns, slower TTFB and JSON parse).
 */
export const BROWSE_COLLEGE_COLUMNS =
  "id,name,location,description,vibe_tags,school_emoji,personality_line,popular,slug,new_image_link,featured_image_url,banner,student_body_size,acceptance_rate,tuition_range,emoji_desc,campus_vibe";

/** PostgREST often defaults to 1k rows; keep headroom for 2k+ school datasets. */
export const BROWSE_FETCH_LIMIT = 5000;
