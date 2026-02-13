"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitApplication } from "./actions";
import type { FormFieldDef } from "@/lib/supabase/queries/hosted-scholarships";

function FormField({ field }: { field: FormFieldDef }) {
  const baseClasses =
    "w-full rounded-lg border border-[#E5E5E7] bg-white px-4 py-3 text-[#181A1D] placeholder:text-[#999999] focus:border-[#7C4EE4] focus:outline-none focus:ring-1 focus:ring-[#7C4EE4]";

  if (field.type === "select") {
    return (
      <select
        name={field.key}
        id={field.key}
        required={field.required}
        disabled={false}
        className={baseClasses}
      >
        <option value="">Select…</option>
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        name={field.key}
        id={field.key}
        required={field.required}
        placeholder={field.placeholder}
        maxLength={field.maxLength}
        rows={4}
        disabled={false}
        className={`${baseClasses} resize-y min-h-[100px]`}
      />
    );
  }

  return (
    <input
      type={field.type === "email" ? "email" : field.type === "number" ? "number" : field.type === "tel" ? "tel" : field.type === "date" ? "date" : "text"}
      name={field.key}
      id={field.key}
      required={field.required}
      placeholder={field.placeholder}
      maxLength={field.maxLength}
      disabled={false}
      className={baseClasses}
    />
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl bg-[#7C4EE4] px-10 text-lg font-semibold text-white shadow-sm transition-all hover:bg-[#6B3ED4] hover:shadow disabled:opacity-60"
    >
      {pending ? "Submitting…" : "Submit application"}
    </button>
  );
}

type Props = {
  scholarshipId: string;
  slug: string;
  fields: FormFieldDef[];
  submitAction: typeof submitApplication;
};

export function ApplyForm({ scholarshipId, slug, fields, submitAction }: Props) {
  const [state, formAction] = useFormState(submitAction, null);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="scholarshipId" value={scholarshipId} />
      <input type="hidden" name="slug" value={slug} />

      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {fields.map((field) => (
        <div key={field.key}>
          <label
            htmlFor={field.key}
            className="mb-2 block text-sm font-medium text-[#333333]"
          >
            {field.label}
            {field.required && <span className="text-[#E53935]"> *</span>}
          </label>
          <FormField field={field} />
        </div>
      ))}

      <div className="pt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
