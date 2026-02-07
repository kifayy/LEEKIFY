import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Scholarship Quiz | Pathpicker",
  description:
    "Find scholarships matched to your profile. Quick apply, no-essay options. Join thousands of students.",
};

const OUTCOMES = [
  "Scholarships matched to your profile and goals",
  "No-essay and quick-apply options",
  "Deadline and amount at a glance",
  "Direct links to apply",
  "Updated monthly with new opportunities",
];

export default function ScholarshipQuizPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">Scholarship Quiz</h1>
      <p className="mt-3 text-sm text-muted-foreground md:mt-4 md:text-base leading-relaxed">
        Answer a few questions and we’ll match you with scholarships that fit your profile. Many
        are no-essay or quick-apply—so you can get money without the grind.
      </p>
      <h2 className="mt-6 text-lg font-bold text-[#181A1D] md:mt-8 md:text-xl">What you’ll get</h2>
      <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm font-normal text-muted-foreground md:mt-3 md:space-y-2">
        {OUTCOMES.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8 md:gap-4">
        <div className="flex gap-0.5 text-pathpicker-gold" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-lg md:text-xl">★</span>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">40k+ Students Matched</span>
      </div>
      <div className="mt-6 md:mt-8">
        <Button asChild size="lg" variant="pathpicker" className="w-full sm:w-auto">
          <Link href="/scholarship-quiz">
            <Sparkles className="mr-2 h-4 w-4" />
            Start quiz
          </Link>
        </Button>
      </div>
      <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
        Pathpicker is built by the same team as{" "}
        <a href="https://awarded.app" className="text-pathpicker-purple underline" target="_blank" rel="noopener noreferrer">
          Awarded
        </a>
        . We help students avoid scams and find real opportunities.
      </p>
    </div>
  );
}
