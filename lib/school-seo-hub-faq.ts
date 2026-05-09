import type { CollegeDetail } from "@/types/college-detail";
import { formatCostSnippetForSeo, pickSeoVariant } from "@/lib/school-seo-copy";

export type SchoolSeoFaqItem = { question: string; answer: string };

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function truncatePlain(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

export function buildSchoolSeoHubFaq(college: CollegeDetail): SchoolSeoFaqItem[] {
  const name = college.name?.trim() || "This school";
  const seed = college.id?.trim() || name;

  const rateRaw = college.acceptance_rate;
  const hasRate = rateRaw != null && !Number.isNaN(Number(rateRaw));
  const rateRounded = hasRate ? Math.round(Number(rateRaw)) : null;

  const costLine = formatCostSnippetForSeo(college);

  const plainPersonality = college.personality_line?.trim()
    ? stripHtml(college.personality_line)
    : "";
  const plainHighlight = college.highlights?.[0]?.trim() || "";
  const plainVibe = college.campus_vibe?.trim() ? stripHtml(college.campus_vibe) : "";
  const knownSnippet = plainPersonality || plainHighlight || plainVibe;

  const q1 = `What are the odds of getting into ${name}?`;
  const a1 =
    hasRate && rateRounded != null
      ? `${name} shows roughly a ${rateRounded}% acceptance rate in PathPicker’s directory. Real chances depend on your full profile—explore fit and similar schools here, and confirm the latest figures with the college.`
      : pickSeoVariant(seed, "admit", [
          `Discover how admission chances and selectivity feel for ${name} on PathPicker—explore student vibe, fit, and schools with overlapping profiles.`,
          `PathPicker helps you explore how competitive ${name} feels for students like you. Dive into campus fit and similar options; confirm official admissions data on the college’s site.`,
        ]);

  const q2 = `How much does ${name} cost, and what about financial aid?`;
  const a2 = costLine
    ? `We show typical cost signals for ${name} such as ${costLine}. Net price varies by family finances—use PathPicker for context, then verify tuition, fees, and aid on the official site.`
    : pickSeoVariant(seed, "cost", [
        `Explore tuition, net price, and financial fit for ${name} on PathPicker. Aid and merit packages differ widely—always confirm details with the school.`,
        `Discover how families think about cost and aid at ${name} through PathPicker’s overview; follow up with the college’s net price calculator and aid office.`,
      ]);

  const q3 = `What is ${name} known for?`;
  const a3 = knownSnippet
    ? `${truncatePlain(knownSnippet, 280)} See more on campus life on this page.`
    : pickSeoVariant(seed, "known", [
        `Learn what stands out about ${name}—academics, social life, and vibe—through PathPicker’s school profile and student-centric highlights.`,
        `Explore what makes ${name} distinctive for applicants comparing fit, culture, and outcomes on PathPicker.`,
      ]);

  const q4 = `How hard is it to get into ${name}?`;
  const a4 =
    hasRate && rateRounded != null
      ? `With roughly a ${rateRounded}% acceptance rate, ${name} is selective for many applicants. Difficulty still depends on major, residency, and your academic profile—compare similar schools on PathPicker.`
      : pickSeoVariant(seed, "hard", [
          `Selectivity at ${name} varies by applicant pool and program. Use PathPicker to benchmark fit and explore peer schools while you review official admissions guidance.`,
          `PathPicker breaks down how ${name} feels for different students—explore vibe and comparable colleges to gauge how hard acceptance might be for you.`,
        ]);

  const q5 = `What are the application requirements and essays for ${name}?`;
  const a5 = pickSeoVariant(seed, "req", [
    `Requirements and essay prompts change each cycle—use PathPicker to stay oriented, then confirm transcripts, recommendations, supplements, and deadlines on ${name}’s official undergraduate admissions page.`,
    `Track components like transcripts, recommendations, and supplemental essays for ${name} by pairing PathPicker with the college’s official admissions checklist for the year you apply.`,
  ]);

  const q6 = `When does ${name} release admission decisions?`;
  const a6 = pickSeoVariant(seed, "decisions", [
    `Release dates for early action, early decision, and regular decision shift annually. Use PathPicker for planning and confirm exact notification timelines on ${name}’s admissions site.`,
    `Decision timing depends on the round you apply in. Check ${name}’s official admissions calendar for this year’s dates while you explore fit on PathPicker.`,
  ]);

  const q7 = `What is campus life like at ${name}?`;
  const a7 = plainVibe
    ? truncatePlain(plainVibe, 320)
    : pickSeoVariant(seed, "life", [
        `Explore campus life, dining, study spots, and student vibe for ${name} in the sections on this page—PathPicker focuses on how it feels to be a student there.`,
        `Browse ${name}’s PathPicker profile for student-life texture: vibe tags, highlights, and similar schools to compare social and academic fit.`,
      ]);

  return [
    { question: q1, answer: a1 },
    { question: q2, answer: a2 },
    { question: q3, answer: a3 },
    { question: q4, answer: a4 },
    { question: q5, answer: a5 },
    { question: q6, answer: a6 },
    { question: q7, answer: a7 },
  ];
}
