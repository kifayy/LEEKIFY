import { createClient, createAdminClient } from "@/lib/supabase/server";

/** Form field definition - stored in hosted_scholarships.form_schema */
export type FormFieldDef = {
  key: string; // unique key for answers object, e.g. "full_name", "email"
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea" | "number" | "date" | "radio" | "checkbox";
  required?: boolean;
  options?: string[]; // for type "select"
  placeholder?: string;
  maxLength?: number;
};

/** Form schema - defines the intake form for a scholarship */
export type FormSchema = {
  fields: FormFieldDef[];
};

/** Hosted scholarship (PathPicker's own) */
export type HostedScholarship = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  amount: string | null;
  deadline: string | null;
  provider_export_id: string | null;
  form_schema: FormSchema;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

/** Student submission - answers match form_schema field keys */
export type HostedScholarshipSubmission = {
  id: string;
  hosted_scholarship_id: string;
  answers: Record<string, string | number | boolean>; // dynamic keys from form_schema
  ip_hash: string | null;
  source: string | null;
  exported_at: string | null;
  created_at: string;
};

/** Default/recommended form fields for new scholarships - easily change per scholarship */
export const DEFAULT_FORM_FIELDS: FormFieldDef[] = [
  { key: "full_name", label: "Full Name", type: "text", required: true },
  { key: "email", label: "Email Address", type: "email", required: true },
  {
    key: "grade_level",
    label: "Grade Level",
    type: "select",
    required: true,
    options: [
      "High School (9th)",
      "High School (10th)",
      "High School (11th)",
      "High School (12th)",
      "College Freshman",
      "College Sophomore",
      "College Junior",
      "College Senior",
      "Graduate Student",
    ],
  },
  { key: "school_name", label: "School Name", type: "text", required: false },
  { key: "gpa", label: "GPA (optional)", type: "text", required: false },
  { key: "state", label: "State", type: "text", required: false },
];

/** Default form schema - clone and customize per scholarship */
export const DEFAULT_FORM_SCHEMA: FormSchema = {
  fields: DEFAULT_FORM_FIELDS,
};

export async function getHostedScholarships(): Promise<HostedScholarship[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hosted_scholarships")
    .select("*")
    .eq("is_active", true)
    .order("deadline", { ascending: true, nullsFirst: false });
  if (error) return [];
  return (data ?? []).map(normalizeFormSchema) as HostedScholarship[];
}

export async function getHostedScholarshipBySlug(
  slug: string
): Promise<HostedScholarship | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hosted_scholarships")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  if (error || !data) return null;
  return normalizeFormSchema(data) as HostedScholarship;
}

/** Get all submissions for a scholarship - for export. Uses admin client (bypasses RLS). */
export async function getSubmissionsForExport(
  hostedScholarshipId: string
): Promise<HostedScholarshipSubmission[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("hosted_scholarship_submissions")
    .select("*")
    .eq("hosted_scholarship_id", hostedScholarshipId)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as HostedScholarshipSubmission[];
}

/** Submit a student intake - call from form submit handler. Uses admin client to bypass RLS. */
export async function createSubmission(
  hostedScholarshipId: string,
  answers: Record<string, string | number | boolean>,
  options?: { source?: string; ipHash?: string }
): Promise<{ id: string } | { error: string }> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("hosted_scholarship_submissions")
    .insert({
      hosted_scholarship_id: hostedScholarshipId,
      answers,
      source: options?.source ?? "pathpicker_web",
      ip_hash: options?.ipHash ?? null,
    })
    .select("id")
    .single();
  if (error) return { error: error.message };
  return { id: data.id };
}

function normalizeFormSchema(row: Record<string, unknown>): Record<string, unknown> {
  const schema = row.form_schema;
  if (schema && typeof schema === "object" && "fields" in schema) return row as Record<string, unknown>;
  return { ...row, form_schema: { fields: [] } };
}

/** Export submissions as flat rows for CSV or provider API (keys from form_schema) */
export function submissionsToExportRows(
  submissions: HostedScholarshipSubmission[],
  formSchema: FormSchema
): Record<string, string>[] {
  const keys = formSchema.fields.map((f) => f.key);
  return submissions.map((s) => ({
    id: s.id,
    created_at: s.created_at,
    ...Object.fromEntries(keys.map((k) => [k, String(s.answers[k] ?? "")])),
  }));
}
