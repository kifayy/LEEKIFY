"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getClientIpFromHeaders, hashClientIp } from "@/lib/client-ip";
import { isFormDataFile, isNonEmptyFormDataFile } from "@/lib/form-data-file";
import { checkRateLimit } from "@/lib/rate-limit";
import { uploadScholarshipApplicationFile } from "@/lib/scholarship-application-upload";
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

/** Obscure keys only — never "website"/"url"/"email" (browser autofill false positives). */
const HONEYPOT_KEYS = new Set(["hp_leave_blank"]);

export async function submitApplication(
  _prevState: ApplyFormState,
  formData: FormData,
): Promise<ApplyFormState> {
  for (const key of HONEYPOT_KEYS) {
    const trap = formData.get(key);
    if (typeof trap === "string" && trap.trim()) {
      // Quiet reject for bots — do not redirect (looks like a broken submit to real users)
      return { error: "Unable to submit. Please try again." };
    }
  }

  const slug = formData.get("slug");
  if (typeof slug !== "string" || !slug.trim()) {
    return { error: "Missing scholarship info." };
  }

  let scholarship;
  try {
    scholarship = await getHostedScholarshipBySlug(slug.trim());
  } catch (err) {
    console.error("[submitApplication] load scholarship", err);
    return { error: "Something went wrong submitting your application. Please try again." };
  }

  if (!scholarship) {
    return { error: "This scholarship is not available." };
  }

  if (scholarship.deadline) {
    const deadline = new Date(scholarship.deadline);
    if (!Number.isNaN(deadline.getTime()) && deadline.getTime() < Date.now()) {
      return { error: "The deadline for this scholarship has passed." };
    }
  }

  try {
    const headerStore = await headers();
    const clientIp = getClientIpFromHeaders(headerStore);
    const ipHash = hashClientIp(clientIp);

    const ipLimit = await checkRateLimit(`apply:ip:${ipHash}`, 5, 60 * 60 * 1000);
    if (!ipLimit.allowed) {
      return { error: "Too many submissions from your network. Please try again later." };
    }

    const fileFields = (scholarship.form_schema.fields ?? []).filter((f) => f.type === "file");
    const uploadedAnswers: Record<string, string> = {};

    for (const field of fileFields) {
      const value = formData.get(field.key);
      if (!isNonEmptyFormDataFile(value)) {
        if (field.required) {
          return { error: `${field.label} is required — please choose a file.` };
        }
        continue;
      }

      const uploaded = await uploadScholarshipApplicationFile({
        scholarshipSlug: scholarship.slug,
        fieldKey: field.key,
        file: value,
      });
      if (!uploaded.ok) return { error: uploaded.error };

      uploadedAnswers[field.key] = JSON.stringify(uploaded.file);
    }

    const rawAnswers: Record<string, string | number | boolean> = { ...uploadedAnswers };
    for (const [key, value] of formData.entries()) {
      if (
        key === "scholarshipId" ||
        key === "slug" ||
        HONEYPOT_KEYS.has(key) ||
        value == null ||
        value === "" ||
        isFormDataFile(value)
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
  } catch (err) {
    console.error("[submitApplication]", err);
    return { error: "Something went wrong submitting your application. Please try again." };
  }

  redirect(`/apply/${scholarship.slug}/success`);
}

