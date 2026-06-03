import Link from "next/link";
import { CollegeMatchQuizLink } from "@/components/college-match-quiz-link";
import { PATH_COLLEGE_MATCH_QUIZ_LABEL } from "@/components/home/path-quiz-cta";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";

export async function generateMetadata() {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    title: `${PATH_COLLEGE_MATCH_QUIZ_LABEL} | Pathpicker`,
    description:
      "Match your personality and goals to colleges that fit. Take the Pathpicker quiz in a few minutes.",
    alternates: { canonical: `${baseUrl}/college-match-quiz` },
    openGraph: {
      title: `${PATH_COLLEGE_MATCH_QUIZ_LABEL} | Pathpicker`,
      description: "Find schools that fit your vibe and goals.",
      siteName: "Pathpicker",
    },
  };
}

export default function CollegeMatchQuizPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#181A1D] md:text-4xl">
          {PATH_COLLEGE_MATCH_QUIZ_LABEL}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[#58595D]">
          Answer a few quick questions and discover colleges that line up with how you learn, socialize, and plan your
          future.
        </p>
        <CollegeMatchQuizLink
          className="mt-10 inline-flex h-14 min-w-[240px] items-center justify-center rounded-[15px] border-2 border-[#7C3AED] bg-[#956EFE] px-8 text-lg font-semibold text-white shadow-[0_4px_20px_rgba(149,110,254,0.35)] transition hover:opacity-95"
        >
          {PATH_COLLEGE_MATCH_QUIZ_LABEL}
        </CollegeMatchQuizLink>
        <p className="mt-8 text-sm text-[#6B7280]">
          <Link href="/browse-schools" className="font-medium text-[#956EFE] hover:underline">
            Browse schools
          </Link>{" "}
          without the quiz, or try{" "}
          <CollegeMatchQuizLink className="font-medium text-[#956EFE] hover:underline">
            {PATH_COLLEGE_MATCH_QUIZ_LABEL}
          </CollegeMatchQuizLink>
          .
        </p>
      </div>
    </div>
  );
}
