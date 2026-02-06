import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Find Your Student Archetype | Pathpicker",
  description:
    "Join 40k+ peers through our viral archetype quiz. Get a breakdown of your habits and see what type of student you actually are.",
};

const OUTCOMES = [
  "Your student archetype (e.g. The Scholar, The Partier)",
  "How you compare to 40,000+ peers",
  "Social habits and campus vibe",
  "Personality rank and influence",
  "Financial cheat codes for your profile",
];

export default function StudentArchetypeQuizPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
        Find your <span className="font-script text-3xl md:text-5xl">Student archetype</span>
      </h1>
      <p className="mt-3 text-sm text-muted-foreground md:mt-4 md:text-base leading-relaxed">
        Join 40k+ peers through our viral archetype quiz to get a breakdown of your habits and see
        what type of student you actually are.
      </p>
      <h2 className="mt-6 text-lg font-semibold md:mt-8 md:text-xl">What you’ll discover</h2>
      <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-muted-foreground md:mt-3 md:space-y-2">
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
          <Link href="/student-archetype-quiz">
            <Sparkles className="mr-2 h-4 w-4" />
            Archetype Quiz
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
