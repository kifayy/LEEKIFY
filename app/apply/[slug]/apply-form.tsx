"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import type { FormFieldDef } from "@/lib/supabase/queries/hosted-scholarships";
import { submitApplication, type ApplyFormState } from "./actions";

const inputBaseClasses =
  "w-full rounded border border-gray-300 bg-white px-4 py-3 text-base text-[#181A1D] placeholder:text-[#999999] focus:border-[#5B4B8A] focus:outline-none focus:ring-1 focus:ring-[#5B4B8A] min-h-[44px]";

function DateField({ field }: { field: FormFieldDef }) {
  // Controlled so calendar / typed values stick in FormData
  const [value, setValue] = useState("");
  return (
    <input
      type="date"
      name={field.key}
      id={field.key}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onInput={(e) => setValue((e.target as HTMLInputElement).value)}
      className={inputBaseClasses}
    />
  );
}

function FileField({ field }: { field: FormFieldDef }) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="space-y-1">
      {field.helpText && (
        <p className="mb-2 text-sm leading-snug text-[#666666]">{field.helpText}</p>
      )}
      <input
        type="file"
        name={field.key}
        id={field.key}
        accept={field.accept || undefined}
        className={`${inputBaseClasses} cursor-pointer file:mr-3 file:rounded file:border-0 file:bg-[#5B4B8A] file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white`}
        onChange={(e) => {
          const file = e.target.files?.[0];
          setFileName(file?.name ?? null);
        }}
      />
      {fileName ? (
        <p className="text-xs font-medium text-[#2E7D32]">Selected: {fileName}</p>
      ) : (
        <p className="text-xs text-[#666666]">Max file size: 5 MB.</p>
      )}
    </div>
  );
}

function FormField({ field }: { field: FormFieldDef }) {
  if (field.type === "select") {
    return (
      <select
        name={field.key}
        id={field.key}
        className={inputBaseClasses}
        aria-label={field.label}
        defaultValue=""
      >
        <option value="">{field.placeholder || "Please select"}</option>
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
      <div className="space-y-2" role="radiogroup" aria-label={field.label}>
        {field.options.map((opt, i) => (
          <div key={opt} className="flex items-center gap-2">
            <input
              type="radio"
              name={field.key}
              id={`${field.key}_${i}`}
              value={opt}
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
          value="on"
          className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#5B4B8A] focus:ring-[#5B4B8A]"
        />
        {(field.helpText || field.placeholder || field.key === "agree_to_terms") && (
          <label htmlFor={field.key} className="cursor-pointer text-sm leading-snug text-[#181A1D]">
            {field.key === "agree_to_terms" ? (
              <>
                You agree to the{" "}
                <a
                  href="/privacy"
                  className="text-[#5B4B8A] underline"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </a>
                .
              </>
            ) : (
              field.helpText || field.placeholder
            )}
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
        placeholder={field.placeholder}
        maxLength={field.maxLength}
        rows={4}
        className={`${inputBaseClasses} min-h-[100px] resize-y text-base`}
      />
    );
  }

  if (field.type === "file") {
    return <FileField field={field} />;
  }

  if (field.type === "date") {
    return <DateField field={field} />;
  }

  return (
    <input
      type={
        field.type === "email"
          ? "email"
          : field.type === "number"
            ? "number"
            : field.type === "tel"
              ? "tel"
              : "text"
      }
      name={field.key}
      id={field.key}
      placeholder={field.placeholder}
      maxLength={field.maxLength}
      className={inputBaseClasses}
    />
  );
}

function clientValidate(form: HTMLFormElement, fields: FormFieldDef[]): string | null {
  for (const field of fields) {
    if (!field.required) continue;

    if (field.type === "file") {
      const input = form.elements.namedItem(field.key) as HTMLInputElement | null;
      const file = input?.files?.[0];
      if (!file || file.size === 0) {
        return `${field.label} is required — please choose a file.`;
      }
      if (file.size > 5 * 1024 * 1024) {
        return `${field.label} must be 5 MB or smaller.`;
      }
      continue;
    }

    if (field.type === "checkbox") {
      const input = form.elements.namedItem(field.key) as HTMLInputElement | null;
      if (!input?.checked) {
        return `${field.label} is required.`;
      }
      continue;
    }

    if (field.type === "radio") {
      const selected = form.querySelector(`input[name="${CSS.escape(field.key)}"]:checked`);
      if (!selected) {
        return `${field.label} is required.`;
      }
      continue;
    }

    const el = form.elements.namedItem(field.key) as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | null;
    const value = el?.value?.trim() ?? "";
    if (!value) {
      return `${field.label} is required.`;
    }
  }
  return null;
}

type Props = {
  scholarshipId: string;
  slug: string;
  fields: FormFieldDef[];
  submitAction?: typeof submitApplication;
};

export function ApplyForm({
  scholarshipId,
  slug,
  fields,
  submitAction = submitApplication,
}: Props) {
  const [state, formAction, isPending] = useActionState<ApplyFormState, FormData>(
    submitAction,
    null,
  );
  const [clientError, setClientError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const displayError = clientError || state?.error || null;

  useEffect(() => {
    if (displayError) {
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [displayError]);

  return (
    <form
      id="scholarship-application-form"
      className="relative space-y-0"
      encType="multipart/form-data"
      noValidate
      onSubmit={(e) => {
        // Always preventDefault, then dispatch the server action ourselves.
        // Calling setState during a native action submit can abort the POST
        // (common after a prior validation error → fix fields → submit again).
        e.preventDefault();
        const form = e.currentTarget;
        const err = clientValidate(form, fields);
        if (err) {
          setClientError(err);
          return;
        }
        setClientError(null);
        const fd = new FormData(form);
        startTransition(() => {
          formAction(fd);
        });
      }}
    >
      <input type="hidden" name="scholarshipId" value={scholarshipId} />
      <input type="hidden" name="slug" value={slug} />
      <input
        type="text"
        name="hp_leave_blank"
        tabIndex={-1}
        autoComplete="new-password"
        aria-hidden
        defaultValue=""
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {displayError && (
        <div
          ref={errorRef}
          role="alert"
          className="mb-4 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {displayError}
        </div>
      )}

      {fields.map((field) => (
        <div key={field.key} className="mb-4 sm:mb-3">
          <label
            htmlFor={field.type === "radio" ? undefined : field.key}
            className="form-label mb-1 block font-bold text-[#5B4B8A]"
          >
            {field.label}
            {field.required && <span className="text-red-600"> *</span>}
          </label>
          <FormField field={field} />
        </div>
      ))}

      <div className="mt-6 sm:mt-8">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-12 w-full min-h-[48px] items-center justify-center rounded-full bg-[#5B4B8A] px-8 text-base font-bold text-white shadow transition hover:bg-[#4a3d70] disabled:opacity-60 sm:w-auto sm:min-w-[220px] sm:text-lg"
        >
          {isPending ? "Submitting…" : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
