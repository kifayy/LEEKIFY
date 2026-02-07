import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Pathpicker | Built by Awarded",
  description:
    "Pathpicker helps students avoid scams and dead ends. Built by the same team behind Awarded.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">About Pathpicker</h1>
      <div className="mt-4 space-y-3 text-foreground md:mt-6 md:space-y-4">
        <p className="text-sm font-normal leading-relaxed md:text-base">
          Pathpicker exists to help students make better decisions—without the noise, scams, or
          dead ends. We give you clear quizzes and matches so you can see your student archetype,
          find scholarships that fit, and get a roadmap that actually works.
        </p>
        <p className="text-sm font-normal leading-relaxed md:text-base">
          We’re built by the same team behind <strong>Awarded</strong>, the scholarship app. Same
          trust, same mission: get money and clarity into students’ hands.
        </p>
      </div>
      <div className="mt-6 md:mt-8">
        <Button asChild variant="pathpicker" className="w-full sm:w-auto">
          <Link href="/">Explore quizzes</Link>
        </Button>
      </div>
    </div>
  );
}
