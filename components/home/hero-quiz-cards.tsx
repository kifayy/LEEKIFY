import Link from "next/link";
import { Sparkles, GraduationCap } from "lucide-react";

const cardClass =
  "group flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-black/[0.08] bg-white p-6 text-center shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-pathpicker-purple/25 active:scale-[0.99] md:p-8";

const ctaClass =
  "mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-pathpicker-purple px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:brightness-95 active:brightness-90";

export function HeroQuizCards() {
  return (
    <section className="w-full py-8 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          <Link href="/scholarship-quiz" className={cardClass}>
            <GraduationCap className="mb-3 h-10 w-10 text-pathpicker-purple md:mb-4 md:h-12 md:w-12" aria-hidden />
            <h2 className="text-lg font-bold text-foreground md:text-xl">Scholarship Quiz</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Find scholarships matched to your profile. Quick apply, no-essay options.
            </p>
            <span className={ctaClass}>
              <Sparkles className="h-4 w-4" />
              Start Quiz
            </span>
          </Link>

          <Link href="/student-archetype-quiz" className={cardClass}>
            <Sparkles className="mb-3 h-10 w-10 text-pathpicker-purple md:mb-4 md:h-12 md:w-12" aria-hidden />
            <h2 className="text-lg font-bold text-foreground md:text-xl">Archetype Quiz</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Find your Student archetype. Join 40k+ peers and see what type of student you are.
            </p>
            <span className={ctaClass}>
              <Sparkles className="h-4 w-4" />
              Archetype Quiz
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
