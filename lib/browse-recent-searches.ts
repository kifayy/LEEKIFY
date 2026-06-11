export type BrowseSearchPickKind = "vibe" | "college" | "text" | "state";

export type BrowseSearchPick = {
  label: string;
  kind: BrowseSearchPickKind;
  vibeValue?: string;
  collegeSlug?: string;
  stateName?: string;
  query?: string;
};

export function pickToVibes(pick: BrowseSearchPick): string[] {
  if (pick.kind === "vibe" && pick.vibeValue) return [pick.vibeValue];
  return [];
}

export function pickToSearchTerm(pick: BrowseSearchPick): string {
  if (pick.kind === "state" && pick.stateName) return pick.stateName;
  if (pick.kind === "college") return pick.label;
  if (pick.kind === "text") return pick.query ?? pick.label;
  return "";
}
