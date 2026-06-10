import type { ParsedDiscoverIntent, DiscoverPageCopy, DiscoverFaqItem } from "@/lib/discover/types";
import { VIBE_LABEL_BY_VALUE } from "@/lib/directory/vibe-options";
import { humanIntentTitle } from "@/lib/discover/slug";
import type { College } from "@/types/college";

function vibePhrase(vibes: string[]): string {
  return vibes.map((v) => VIBE_LABEL_BY_VALUE[v] ?? v).join(" and ");
}

function topSchoolNames(colleges: College[], n = 5): string[] {
  return colleges.slice(0, n).map((c) => c.name).filter(Boolean);
}

/** Template copy when OpenAI is unavailable. */
export function buildDiscoverCopyTemplate(
  intent: ParsedDiscoverIntent,
  colleges: College[],
): DiscoverPageCopy {
  const vibeText = vibePhrase(intent.vibes);
  const loc = intent.location;
  const h1 = humanIntentTitle({ vibes: intent.vibes, location: loc, displayQuery: intent.display_query });
  const names = topSchoolNames(colleges);
  const nameList = names.length ? names.join(", ") : "schools in our directory";

  const intro = loc
    ? `Students searching for ${vibeText.toLowerCase()} colleges in ${loc} want campuses that balance culture, academics, and social life. PathPicker surfaces ${colleges.length} matches using vibe signals, location data, and campus personality lines — not generic rankings alone. Top examples include ${nameList}.`
    : `Students searching for ${vibeText.toLowerCase()} colleges want campuses that match both culture and goals. PathPicker surfaces ${colleges.length} matches using vibe tags, personality copy, and fit signals. Top examples include ${nameList}.`;

  const summary = loc
    ? `PathPicker found ${colleges.length} colleges in ${loc} aligned with ${vibeText.toLowerCase()} energy.`
    : `PathPicker found ${colleges.length} colleges aligned with ${vibeText.toLowerCase()} energy.`;

  const why_fit = `We matched schools where campus vibe tags, personality descriptions, or known culture cues overlap with ${vibeText.toLowerCase()} signals${loc ? ` and locations in ${loc}` : ""}. Results prioritize colleges with rich profile data so you can compare fit, costs, and admission context on each school page.`;

  const best_for = `Students who want ${vibeText.toLowerCase()} campus culture${loc ? ` in ${loc}` : ""} and care about personality fit alongside admissions odds.`;

  const not_ideal_for = `Students who need a very different social or academic rhythm than ${vibeText.toLowerCase()} campuses typically offer — browse without these vibes or try our archetype quiz for a broader match.`;

  const methodology = `PathPicker combines vibe tags, personality lines, location fields, and curated campus signals. Acceptance rates and costs appear on individual school pages when available. Confirm official admissions and aid figures on each college's site.`;

  const faq: DiscoverFaqItem[] = [
    {
      question: `${h1.replace(/\?$/, "")}?`,
      answer: intro.slice(0, 320),
    },
    {
      question: `How does PathPicker match ${vibeText.toLowerCase()} colleges${loc ? ` in ${loc}` : ""}?`,
      answer: why_fit,
    },
    {
      question: "How do I find my best personality match?",
      answer:
        "Take the free PathPicker archetype quiz to discover your vibes, then browse schools or mix filters to compare fit, happiness signals, and admission odds.",
    },
  ];

  const title = h1.length <= 55 ? `${h1} | PathPicker` : `${h1.slice(0, 52)}… | PathPicker`;
  const meta_description =
    summary.length > 155 ? `${summary.slice(0, 152)}…` : `${summary} Compare fit and odds on PathPicker.`;

  return {
    title,
    h1,
    meta_description,
    intro,
    summary,
    why_fit,
    best_for,
    not_ideal_for,
    methodology,
    faq,
  };
}

export async function generateDiscoverCopyWithOpenAI(
  intent: ParsedDiscoverIntent,
  colleges: College[],
): Promise<DiscoverPageCopy | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;

  const names = topSchoolNames(colleges, 8);
  const system = `You write concise, factual college discovery copy for PathPicker. Never invent acceptance rates or rankings. Ground answers in the provided school names and vibe/location intent. Return valid JSON only.`;

  const user = JSON.stringify({
    intent,
    school_names: names,
    match_count: colleges.length,
    fields: [
      "title",
      "h1",
      "meta_description",
      "intro",
      "summary",
      "why_fit",
      "best_for",
      "not_ideal_for",
      "methodology",
      "faq",
    ],
    faq_count: 3,
  });

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    const parsed = JSON.parse(content) as DiscoverPageCopy;
    if (!parsed.h1 || !parsed.intro) return null;
    if (!/pathpicker/i.test(parsed.title)) parsed.title = `${parsed.title} | PathPicker`;
    return parsed;
  } catch {
    return null;
  }
}

export async function generateDiscoverCopy(
  intent: ParsedDiscoverIntent,
  colleges: College[],
): Promise<DiscoverPageCopy> {
  const ai = await generateDiscoverCopyWithOpenAI(intent, colleges);
  return ai ?? buildDiscoverCopyTemplate(intent, colleges);
}
