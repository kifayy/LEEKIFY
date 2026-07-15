import { createAdminClient } from "@/lib/supabase/server";

export const SCHOLARSHIP_UPLOAD_BUCKET = "scholarship-applications";
export const SCHOLARSHIP_UPLOAD_MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function sanitizeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]+/g, "_").replace(/_+/g, "_");
  return base.slice(0, 120) || "document";
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
    return { ok: false, error: "Please choose a file to upload." };
  }

  if (file.size > SCHOLARSHIP_UPLOAD_MAX_BYTES) {
    return { ok: false, error: "File must be 5 MB or smaller." };
  }

  const contentType = file.type || "application/octet-stream";
  const safeName = sanitizeFilename(file.name);
  const path = `${scholarshipSlug}/${fieldKey}/${crypto.randomUUID()}-${safeName}`;
  const supabase = createAdminClient();
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error } = await supabase.storage.from(SCHOLARSHIP_UPLOAD_BUCKET).upload(path, bytes, {
    contentType,
    upsert: false,
  });

  if (error) {
    console.error("[uploadScholarshipApplicationFile]", error.message, error);
    return { ok: false, error: "Could not upload your file. Please try again." };
  }

  return {
    ok: true,
    file: {
      path,
      name: file.name,
      size: file.size,
      contentType,
    },
  };
}
