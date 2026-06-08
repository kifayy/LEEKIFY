import type { FormFieldDef, FormSchema } from "@/lib/supabase/queries/hosted-scholarships";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateHostedSubmissionAnswers(
  rawAnswers: Record<string, string | number | boolean>,
  formSchema: FormSchema,
): { ok: true; answers: Record<string, string | number | boolean> } | { ok: false; error: string } {
  const fields = formSchema.fields ?? [];
  const allowedKeys = new Set(fields.map((f) => f.key));
  const answers: Record<string, string | number | boolean> = {};

  for (const key of Object.keys(rawAnswers)) {
    if (!allowedKeys.has(key)) {
      return { ok: false, error: "Unexpected form field submitted." };
    }
  }

  for (const field of fields) {
    const raw = rawAnswers[field.key];
    const parsed = parseFieldValue(field, raw);

    if (!parsed.ok) return { ok: false, error: parsed.error };

    if (parsed.missing && field.required) {
      return { ok: false, error: `${field.label} is required.` };
    }

    if (!parsed.missing && parsed.value !== undefined) {
      answers[field.key] = parsed.value;
    }
  }

  return { ok: true, answers };
}

type ParseResult =
  | { ok: true; missing: boolean; value?: string | number | boolean }
  | { ok: false; error: string };

function parseFieldValue(
  field: FormFieldDef,
  raw: string | number | boolean | undefined,
): ParseResult {
  if (raw == null || raw === "") {
    if (field.type === "checkbox") {
      return { ok: true, missing: false, value: false };
    }
    return { ok: true, missing: true };
  }

  const str = String(raw).trim();

  if (field.maxLength != null && str.length > field.maxLength) {
    return { ok: false, error: `${field.label} is too long.` };
  }

  switch (field.type) {
    case "email":
      if (!EMAIL_RE.test(str)) {
        return { ok: false, error: `Enter a valid email for ${field.label}.` };
      }
      return { ok: true, missing: false, value: str.toLowerCase() };
    case "select":
    case "radio":
      if (field.options?.length && !field.options.includes(str)) {
        return { ok: false, error: `Invalid selection for ${field.label}.` };
      }
      return { ok: true, missing: false, value: str };
    case "checkbox":
      return {
        ok: true,
        missing: false,
        value: raw === true || str === "on" || str === "true",
      };
    case "number": {
      const num = Number(str);
      if (!Number.isFinite(num)) {
        return { ok: false, error: `${field.label} must be a number.` };
      }
      return { ok: true, missing: false, value: num };
    }
    default:
      return { ok: true, missing: false, value: str };
  }
}

export function getSubmissionEmailField(
  answers: Record<string, string | number | boolean>,
  formSchema: FormSchema,
): { key: string; email: string } | null {
  for (const field of formSchema.fields ?? []) {
    if (field.type === "email") {
      const value = answers[field.key];
      if (typeof value === "string" && value) {
        return { key: field.key, email: value.toLowerCase() };
      }
    }
  }
  const fallback = answers.email;
  if (typeof fallback === "string" && fallback) {
    return { key: "email", email: fallback.toLowerCase() };
  }
  return null;
}
