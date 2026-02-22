"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitApplication } from "./actions";
import type { FormFieldDef } from "@/lib/supabase/queries/hosted-scholarships";

function FormField({ field }: { field: FormFieldDef }) {
  const inputBaseClasses =
    "w-full rounded border border-gray-300 bg-white px-4 py-3 text-base text-[#181A1D] placeholder:text-[#999999] focus:border-[#5B4B8A] focus:outline-none focus:ring-1 focus:ring-[#5B4B8A] min-h-[44px]";

  if (field.type === "select") {
    return (
      <select
        name={field.key}
        id={field.key}
        required={field.required}
        disabled={false}
        className={inputBaseClasses}
        aria-label={field.label}
      >
        <option value="">Please select</option>
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "radio" && field.options?.length) {
    return (
      <div className="space-y-2">
        {field.options.map((opt, i) => (
          <div key={opt} className="flex items-center gap-2">
            <input
              type="radio"
              name={field.key}
              id={`${field.key}_${i}`}
              value={opt}
              required={field.required}
              className="h-4 w-4 border-gray-300 text-[#5B4B8A] focus:ring-[#5B4B8A]"
            />
            <label htmlFor={`${field.key}_${i}`} className="cursor-pointer text-[#181A1D]">
              {opt}
            </label>
          </div>
        ))}
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          name={field.key}
          id={field.key}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-[#5B4B8A] focus:ring-[#5B4B8A]"
        />
        {(field.label || field.placeholder) && (
          <label htmlFor={field.key} className="cursor-pointer text-sm font-bold text-[#5B4B8A]">
            {field.label || field.placeholder}
          </label>
        )}
      </div>
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
        className={`${inputBaseClasses} min-h-[100px] resize-y text-base`}
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
      className={inputBaseClasses}
    />
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full min-h-[48px] items-center justify-center rounded-full bg-[#5B4B8A] px-8 text-base font-bold text-white shadow transition hover:bg-[#4a3d70] disabled:opacity-60 sm:w-auto sm:min-w-[220px] sm:text-lg"
    >
      {pending ? "Submitting…" : "Submit Application"}
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
    <form action={formAction} id="scholarship-application-form" method="POST" className="space-y-0">
      <input type="hidden" name="scholarshipId" value={scholarshipId} />
      <input type="hidden" name="slug" value={slug} />

      {state?.error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {fields.map((field) => (
        <div key={field.key} className="mb-4 sm:mb-3">
          {field.type !== "checkbox" && (
            <label htmlFor={field.key} className="form-label mb-1 block font-bold text-[#5B4B8A]">
              {field.label}
              {field.required && <span className="text-red-600"> *</span>}
            </label>
          )}
          <FormField field={field} />
        </div>
      ))}

      <div className="mt-6 sm:mt-8">
        <SubmitButton />
      </div>
    </form>
  );
}
