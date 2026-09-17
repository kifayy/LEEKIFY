import type {
  BreachFoundField,
  BreachResult,
  RapidApiBreachHit,
} from "@/lib/breach/types";

const DEFAULT_HOST = "email-breach-search.p.rapidapi.com";

export function getRapidApiConfig() {
  const key = process.env.RAPIDAPI_KEY?.trim();
  const host = process.env.RAPIDAPI_HOST?.trim() || DEFAULT_HOST;
  if (!key) {
    throw new Error("RAPIDAPI_KEY is not configured");
  }
  return { key, host };
}

export function normalizeEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (email.length > 254) return null;
  return email;
}

function sanitizeFound(fields: RapidApiBreachHit["found"]): BreachFoundField[] {
  if (!Array.isArray(fields)) return [];
  return fields.map((f) => {
    const sensitive = Boolean(f.sensitive) || f.field === "pass" || f.field === "password";
    const label = f.label || f.field || "Field";
    const field = f.field || "unknown";
    if (sensitive) {
      return {
        field,
        label,
        fa_icon: f.fa_icon,
        sensitive: true,
        redacted: Boolean(f.value),
      };
    }
    return {
      field,
      label,
      fa_icon: f.fa_icon,
      sensitive: false,
      value: typeof f.value === "string" ? f.value : undefined,
    };
  });
}

export function sanitizeBreachHits(raw: unknown): BreachResult[] {
  if (!Array.isArray(raw)) return [];
  return (raw as RapidApiBreachHit[])
    .filter((b) => b && (b.id || b.name))
    .map((b) => ({
      id: String(b.id || b.name || "unknown"),
      name: String(b.name || b.id || "Unknown breach"),
      breach_date: b.breach_date ?? null,
      upload_date: b.upload_date ?? null,
      rows: typeof b.rows === "number" ? b.rows : null,
      summary: b.summary ?? null,
      hibp_id: b.hibp_id ?? null,
      icon: b.icon ?? null,
      found: sanitizeFound(b.found),
    }));
}

/** Server-only RapidAPI email search. */
export async function searchEmailBreaches(email: string): Promise<BreachResult[]> {
  const { key, host } = getRapidApiConfig();
  const url = `https://${host}/rapidapi/search-email/${encodeURIComponent(email)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": host,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[breach-search] RapidAPI error", res.status, text.slice(0, 200));
    throw new Error(`Breach lookup failed (${res.status})`);
  }

  const data: unknown = await res.json();
  return sanitizeBreachHits(data);
}
