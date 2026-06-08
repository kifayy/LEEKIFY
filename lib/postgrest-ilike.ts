/** Escape user input for PostgREST `.or()` ilike filters (commas delimit OR clauses). */
export function escapePostgrestIlike(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/,/g, "\\,");
}

export function collegeSearchOrFilter(searchTerm: string): string {
  const safe = escapePostgrestIlike(searchTerm.trim());
  return `name.ilike.%${safe}%,location.ilike.%${safe}%,description.ilike.%${safe}%`;
}
