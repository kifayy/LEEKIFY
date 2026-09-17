/** Breach hit returned to the browser (sensitive values redacted). */
export type BreachFoundField = {
  field: string;
  label: string;
  fa_icon?: string;
  sensitive: boolean;
  /** Present only for non-sensitive fields, or when reveal is allowed. */
  value?: string;
  /** True when a sensitive value existed but was stripped for free search. */
  redacted?: boolean;
};

export type BreachResult = {
  id: string;
  name: string;
  breach_date: string | null;
  upload_date: string | null;
  rows: number | null;
  summary: string | null;
  hibp_id: string | null;
  icon: string | null;
  found: BreachFoundField[];
};

export type BreachSearchResponse = {
  email: string;
  count: number;
  breaches: BreachResult[];
};

/** Raw shape from DataBreach.com / RapidAPI (subset we care about). */
export type RapidApiBreachFound = {
  value?: string;
  field?: string;
  label?: string;
  fa_icon?: string;
  sensitive?: boolean;
};

export type RapidApiBreachHit = {
  id?: string;
  name?: string;
  breach_date?: string;
  upload_date?: string;
  rows?: number;
  summary?: string;
  hibp_id?: string;
  icon?: string;
  found?: RapidApiBreachFound[];
};
