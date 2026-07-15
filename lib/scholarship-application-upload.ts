import { createAdminClient } from "@/lib/supabase/server";

export const SCHOLARSHIP_UPLOAD_BUCKET = "scholarship-applications";
export const SCHOLARSHIP_UPLOAD_MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function sanitizeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]+/g, "_").replace(/_+/g, "_");
  const trimmed = base.slice(0, 120) || "document.pdf";
  return trimmed.toLowerCase().endsWith(".pdf") ? trimmed : `${trimmed}.pdf`;
}

function isPdfFile(file: File): boolean {
  if (file.type === "application/pdf") return true;
  // Some browsers omit MIME type; fall back to extension.
  return file.name.toLowerCase().endsWith(".pdf");
}

export type UploadedScholarshipFile = {
  path: string;
  name: string;
  size: number;
  contentType: string;
};

export async function uploadScholarshipApplicationFile(options: {
  scholarshipSlug: string;
  fieldKey: string;
  file: File;
}): Promise<{ ok: true; file: UploadedScholarshipFile } | { ok: false; error: string }> {
  const { scholarshipSlug, fieldKey, file } = options;

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Please choose a PDF file to upload." };
  }

  if (file.size > SCHOLARSHIP_UPLOAD_MAX_BYTES) {
    return { ok: false, error: "File must be 5 MB or smaller." };
  }

  if (!isPdfFile(file)) {
    return { ok: false, error: "Only PDF files are accepted." };
  }

  const safeName = sanitizeFilename(file.name);
  const path = `${scholarshipSlug}/${fieldKey}/${crypto.randomUUID()}-${safeName}`;
  const supabase = createAdminClient();
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from(SCHOLARSHIP_UPLOAD_BUCKET).upload(path, buffer, {
    contentType: "application/pdf",
    upsert: false,
  });

  if (error) {
    console.error("[uploadScholarshipApplicationFile]", error.message);
    return { ok: false, error: "Could not upload your file. Please try again." };
  }

  return {
    ok: true,
    file: {
      path,
      name: file.name,
      size: file.size,
      contentType: "application/pdf",
    },
  };
}
