import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About PathPicker | Built by Awarded",
  description:
    "PathPicker helps students avoid scams and dead ends. Built by the same team behind Awarded.",
};

export default function AboutPage() {
  return (
    <div className="w-full min-w-0 overflow-hidden py-10 md:py-20">
      <div className="container mx-auto max-w-3xl px-4 md:px-6 min-w-0">
        {/* White card - matches Reviews tab UI */}
        <div
          className="flex flex-col gap-8 rounded-2xl bg-white p-8 md:p-10"
          style={{
            boxShadow: "0 8px 24px rgba(149,110,254,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-3xl">
              About PathPicker
            </h1>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#956EFE] px-4 py-2 text-sm font-medium text-white shadow-[0_2px_8px_rgba(149,110,254,0.3)]">
              <Star className="h-4 w-4 fill-white" />
              Built by Awarded
            </span>
          </div>

          {/* Content */}
          <div className="space-y-5 text-[#181A1D]">
            <p className="text-base leading-relaxed text-[#181A1D]/85 md:text-lg">
              PathPicker exists to help students make better decisions—without the noise, scams, or
              dead ends. We give you clear quizzes and matches so you can see your student archetype,
              find scholarships that fit, and get a roadmap that actually works.
            </p>
            <p className="text-base leading-relaxed text-[#181A1D]/85 md:text-lg">
              We&apos;re built by the same team behind <strong>Awarded</strong>, the scholarship app.
              Same trust, same mission: get money and clarity into students&apos; hands.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <Button asChild variant="pathpicker" className="rounded-xl px-6 py-3 font-semibold shadow-[0_2px_8px_rgba(149,110,254,0.3)]">
              <Link href="/">Explore quizzes</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
