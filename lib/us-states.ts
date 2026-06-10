export const US_STATE_ABBR_TO_NAME: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const NAME_TO_ABBR = Object.fromEntries(
  Object.entries(US_STATE_ABBR_TO_NAME).map(([abbr, name]) => [name.toLowerCase(), abbr]),
);

/** Detect a US state name or abbreviation in free text. */
export function detectStateInText(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [abbr, name] of Object.entries(US_STATE_ABBR_TO_NAME)) {
    if (lower.includes(name.toLowerCase())) return name;
    const re = new RegExp(`\\b${abbr.toLowerCase()}\\b`, "i");
    if (re.test(text)) return name;
  }
  return null;
}

export function stateNameFromAbbr(abbr: string): string | null {
  return US_STATE_ABBR_TO_NAME[abbr.toUpperCase()] ?? null;
}

export function stateAbbrFromName(name: string): string | null {
  return NAME_TO_ABBR[name.toLowerCase()] ?? null;
}
