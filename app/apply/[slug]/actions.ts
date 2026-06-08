"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getClientIpFromHeaders, hashClientIp } from "@/lib/client-ip";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  createSubmission,
  getHostedScholarshipBySlug,
  hasRecentSubmissionForScholarship,
} from "@/lib/supabase/queries/hosted-scholarships";
import {
  getSubmissionEmailField,
  validateHostedSubmissionAnswers,
} from "@/lib/validate-hosted-submission";

export type ApplyFormState = { error: string } | null;

const HONEYPOT_KEYS = new Set(["website", "company", "url"]);

export async function submitApplication(
  _prevState: ApplyFormState,
  formData: FormData,
): Promise<ApplyFormState> {
  for (const key of HONEYPOT_KEYS) {
    const trap = formData.get(key);
    if (typeof trap === "string" && trap.trim()) {
      redirect("/");
    }
  }

  const slug = formData.get("slug");
  if (typeof slug !== "string" || !slug.trim()) {
    return { error: "Missing scholarship info." };
  }

  const scholarship = await getHostedScholarshipBySlug(slug.trim());
  if (!scholarship) {
    return { error: "This scholarship is not available." };
  }

  if (scholarship.deadline) {
    const deadline = new Date(scholarship.deadline);
    if (!Number.isNaN(deadline.getTime()) && deadline.getTime() < Date.now()) {
      return { error: "The deadline for this scholarship has passed." };
    }
  }

  const headerStore = await headers();
  const clientIp = getClientIpFromHeaders(headerStore);
  const ipHash = hashClientIp(clientIp);

  const ipLimit = await checkRateLimit(`apply:ip:${ipHash}`, 5, 60 * 60 * 1000);
  if (!ipLimit.allowed) {
    return { error: "Too many submissions from your network. Please try again later." };
  }

  const rawAnswers: Record<string, string | number | boolean> = {};
  for (const [key, value] of formData.entries()) {
    if (
      key === "scholarshipId" ||
      key === "slug" ||
      HONEYPOT_KEYS.has(key) ||
      value == null ||
      value === ""
    ) {
      continue;
    }
    rawAnswers[key] = value as string;
  }

  const validated = validateHostedSubmissionAnswers(rawAnswers, scholarship.form_schema);
  if (!validated.ok) return { error: validated.error };

  const emailField = getSubmissionEmailField(validated.answers, scholarship.form_schema);
  if (emailField) {
    const emailLimit = await checkRateLimit(
      `apply:email:${scholarship.id}:${emailField.email}`,
      3,
      24 * 60 * 60 * 1000,
    );
    if (!emailLimit.allowed) {
      return { error: "This email was used recently. Please try again later." };
    }
  }

  const isDuplicate = await hasRecentSubmissionForScholarship({
    hostedScholarshipId: scholarship.id,
    ipHash,
    emailField,
  });
  if (isDuplicate) {
    return { error: "You already submitted an application recently." };
  }

  const result = await createSubmission(scholarship.id, validated.answers, {
    source: "pathpicker_web",
    ipHash,
  });
  if ("error" in result) return { error: result.error };
  redirect(`/apply/${scholarship.slug}/success`);
}
