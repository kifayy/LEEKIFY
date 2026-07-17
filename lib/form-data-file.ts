/** FormData file entries can fail `instanceof File` across runtimes — use duck typing. */
export function isFormDataFile(value: unknown): value is File {
  if (value == null || typeof value !== "object") return false;
  const f = value as { size?: unknown; name?: unknown; arrayBuffer?: unknown };
  return (
    typeof f.size === "number" &&
    typeof f.name === "string" &&
    typeof f.arrayBuffer === "function"
  );
}

export function isNonEmptyFormDataFile(value: unknown): value is File {
  return isFormDataFile(value) && value.size > 0;
}
