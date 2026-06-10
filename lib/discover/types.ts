export type DiscoverIndexState = "draft" | "eligible" | "indexed" | "suppressed" | "retired";

export type DiscoverIntentType = "match_list" | "school_mashup" | "location_only" | "direct_school";

export type DiscoverReferenceSchool = {
  slug: string;
  dimension: string;
};

export type ParsedDiscoverIntent = {
  intent_type: DiscoverIntentType;
  canonical_slug: string;
  vibes: string[];
  location: string | null;
  modifiers: string[];
  schools_mentioned: string[];
  reference_schools: DiscoverReferenceSchool[];
  display_query: string;
  source?: "natural_language" | "vibe_mix" | "school_mashup" | "map";
};

export type DiscoverFaqItem = {
  question: string;
  answer: string;
};

export type DiscoverPageCopy = {
  title: string;
  h1: string;
  meta_description: string;
  intro: string;
  summary: string;
  why_fit: string;
  best_for: string;
  not_ideal_for: string;
  methodology: string;
  faq: DiscoverFaqItem[];
};

export type IntentPageRow = {
  slug: string;
  intent_type: DiscoverIntentType;
  intent_json: ParsedDiscoverIntent;
  title: string | null;
  h1: string | null;
  meta_description: string | null;
  intro: string | null;
  summary: string | null;
  why_fit: string | null;
  best_for: string | null;
  not_ideal_for: string | null;
  methodology: string | null;
  faq: DiscoverFaqItem[];
  highlighted_slugs: string[];
  index_state: DiscoverIndexState;
  search_count: number;
  raw_query_samples: string[];
  created_at: string;
  updated_at: string;
};
