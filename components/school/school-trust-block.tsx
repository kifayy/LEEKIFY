import type { College } from "@/types/college";

type Props = {
  college: College;
  canonicalUrl: string;
};

/** Visible trust signals for school entity pages (LLM + SEO citability). */
export function SchoolTrustBlock({ college, canonicalUrl }: Props) {
  const summaryParts = [
    college.name,
    college.location ? `in ${college.location}` : null,
    college.acceptance_rate != null
      ? `${Math.round(college.acceptance_rate <= 1 ? college.acceptance_rate * 100 : college.acceptance_rate)}% acceptance`
      : null,
    college.tuition_range ? `${college.tuition_range} tuition band` : null,
  ].filter(Boolean);

  return (
    <aside
      aria-label="Data sources and methodology"
      className="rounded-xl border border-gray-100 bg-[#faf9fc] px-4 py-5 sm:px-6 text-sm text-gray-700"
    >
      <h2 className="text-base font-semibold text-[#0C1120]">About this profile</h2>
      {summaryParts.length > 0 ? (
        <p className="mt-2 leading-relaxed">
          <strong>{college.name}</strong> — {summaryParts.slice(1).join(" · ")}.
        </p>
      ) : null}
      <p className="mt-3 leading-relaxed">
        PathPicker combines public college data (IPEDS-style admissions and cost fields) with campus vibe
        tags and student-life signals from our research team. Match scores reflect vibe overlap when you
        are signed in and have taken the quiz.
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-600">
        <li>Sources: PathPicker college database, public admissions/cost records, campus research notes</li>
        <li>Profiles are refreshed periodically as new admissions and cost data becomes available</li>
        <li>
          Canonical URL:{" "}
          <a href={canonicalUrl} className="text-[#6836D5] underline-offset-2 hover:underline">
            {canonicalUrl}
          </a>
        </li>
      </ul>
    </aside>
  );
}
