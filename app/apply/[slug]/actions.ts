"use server";

import { redirect } from "next/navigation";
import { createSubmission } from "@/lib/supabase/queries/hosted-scholarships";

export type ApplyFormState = { error: string } | null;

export async function submitApplication(
  _prevState: ApplyFormState,
  formData: FormData
): Promise<ApplyFormState> {
  const scholarshipId = formData.get("scholarshipId") as string;
  const slug = formData.get("slug") as string;
  if (!scholarshipId || !slug) {
    return { error: "Missing scholarship info." };
  }

  const answers: Record<string, string | number | boolean> = {};
  for (const [key, value] of formData.entries()) {
    if (key !== "scholarshipId" && key !== "slug" && value != null && value !== "") {
      answers[key] = value as string;
    }
  }

  const result = await createSubmission(scholarshipId, answers);
  if ("error" in result) return { error: result.error };
  redirect(`/apply/${slug}/success`);
}
