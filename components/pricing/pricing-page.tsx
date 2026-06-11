import Link from "next/link";
import type { ReactNode } from "react";
import { CollegeMatchQuizLink } from "@/components/college-match-quiz-link";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUSTPILOT_URL = "https://www.trustpilot.com/";
const TRUSTPILOT_RATING = 4.8;

const PRICING_FEATURES = [
  {
    title: "School Match Report",
    description:
      "Your personalized college breakdown, built around fit—not just stats, rankings, or generic advice.",
  },
  {
    title: "Your Fit At 2,000+ Universities",
    description:
      "Happiness scores, social life ratings, career outcomes, and dozens more signals across 2,000+ colleges.",
  },
  {
    title: "Admission Odds & Shortlists",
    description:
      "Know your real chances and sort every school into Safety, Target, and Reach before you apply.",
  },
  {
    title: "Scholarship Matches",
    description:
      "Scholarships you actually qualify for, matched to your profile—not random lists you'll never use.",
  },
  {
    title: "Student Archetype & Vibe Profile",
    description:
      "See how you learn, socialize, and thrive so every school on your list feels like a real match.",
  },
] as const;

function TrustpilotStarTile({ fill }: { fill: "full" | "half" | "empty" }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-[2px] sm:h-[22px] sm:w-[22px]",
        fill === "full" && "bg-[#00b67a]",
        fill === "empty" && "bg-[#E5E5E7]",
      )}
      aria-hidden
    >
      {fill === "half" ? <span className="absolute inset-y-0 left-0 w-1/2 bg-[#00b67a]" aria-hidden /> : null}
      <Star className="relative z-[1] h-2.5 w-2.5 fill-white text-white sm:h-3 sm:w-3" strokeWidth={0} />
    </span>
  );
}

function trustpilotStarCells(score: number): ("full" | "half" | "empty")[] {
  const full = Math.floor(score);
  const remainder = score - full;
  const half = remainder >= 0.25 && remainder < 0.95;
  const cells: ("full" | "half" | "empty")[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) cells.push("full");
    else if (i === full && half) cells.push("half");
    else cells.push("empty");
  }
  return cells;
}

function PricingMapSocialProof() {
  const cells = trustpilotStarCells(TRUSTPILOT_RATING);

  return (
    <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col items-center justify-center gap-8 rounded-2xl border border-[#E5E5E7] bg-[#FAFAFC] px-6 py-8 sm:flex-row sm:gap-10 sm:px-10">
      <Link
        href={TRUSTPILOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-90"
      >
        <div
          className="flex items-center gap-1"
          role="img"
          aria-label={`Rated ${TRUSTPILOT_RATING} out of 5 on Trustpilot`}
        >
          {cells.map((cell, index) => (
            <TrustpilotStarTile key={`${cell}-${index}`} fill={cell} />
          ))}
        </div>
        <p className="text-center text-sm text-[#6B7280]">
          <span className="font-bold text-[#181A1D]">{TRUSTPILOT_RATING}</span> rating on{" "}
          <span className="font-semibold text-[#181A1D]">Trustpilot</span>
        </p>
      </Link>

      <div className="hidden h-14 w-px shrink-0 bg-[#E5E5E7] sm:block" aria-hidden />

      <div className="text-center sm:text-left">
        <p className="text-3xl font-bold tabular-nums tracking-tight text-[#181A1D] md:text-4xl">
          100k+
        </p>
        <p className="mt-1 text-sm font-medium text-[#6B7280]">Students Served</p>
      </div>
    </div>
  );
}

function ContinueButton({ outlined = false }: { outlined?: boolean }) {
  return (
    <CollegeMatchQuizLink
      className={cn(
        "inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-[15px] font-semibold transition-colors",
        outlined
          ? "border-2 border-[#6836D5] bg-white text-[#6836D5] hover:bg-[#f6f3ff]"
          : "bg-[#6836D5] text-white shadow-[0_4px_16px_rgba(104,54,213,0.3)] hover:bg-[#5a2ebf]",
      )}
    >
      Start Subscription
    </CollegeMatchQuizLink>
  );
}

function PricingPlanCard({
  label,
  title,
  price,
  priceSuffix,
  note,
  outlinedButton,
  highlighted,
}: {
  label: string;
  title: string;
  price: string;
  priceSuffix: string;
  note: ReactNode;
  outlinedButton?: boolean;
  highlighted?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-2xl border bg-white p-8 md:p-10",
        highlighted ? "border-[#956EFE] ring-1 ring-[#956EFE]/40" : "border-[#E5E5E7]",
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.12em]",
          highlighted ? "text-[#6836D5]" : "text-[#6B7280]",
        )}
      >
        {label}
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#181A1D] md:text-[1.75rem]">{title}</h2>
      <p className="mt-4 flex items-baseline gap-1 text-[#181A1D]">
        <span className="text-4xl font-bold tracking-tight md:text-5xl">{price}</span>
        <span className="text-base font-medium text-[#6B7280]">{priceSuffix}</span>
      </p>
      <div className="mt-4 text-sm leading-relaxed text-[#6B7280]">{note}</div>
      <div className="mt-8">
        <ContinueButton outlined={outlinedButton} />
      </div>
    </article>
  );
}

export function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-5xl px-4 py-14 md:py-20 lg:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
            PathPicker Premium
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#181A1D] md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
            Simple pricing. Full access.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">
            School match reports, fit across 2,000+ universities, admission odds, and scholarship
            matches—built around who you are.
          </p>
        </header>

        <p className="mt-14 text-center text-sm text-[#6B7280]">Choose your plan</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-8">
          <PricingPlanCard
            label="Most popular"
            title="Monthly"
            price="$14.99"
            priceSuffix="/ month"
            highlighted
            note={
              <>
                <span className="font-medium text-[#181A1D]">First-time students:</span> try your first
                30 days for <span className="font-semibold text-[#181A1D]">$2.99</span>, then $14.99 per
                month. Cancel anytime.
              </>
            }
          />
          <PricingPlanCard
            label="Best value"
            title="Yearly"
            price="$49.99"
            priceSuffix="/ year"
            outlinedButton
            note="One payment for a full year of reports, odds, shortlists, and scholarship matches."
          />
        </div>

        <section className="mt-20 md:mt-24" aria-labelledby="pricing-features-heading">
          <h2
            id="pricing-features-heading"
            className="text-center text-xl font-bold tracking-tight text-[#181A1D] md:text-2xl"
          >
            Everything included
          </h2>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-8 md:grid-cols-1">
            {PRICING_FEATURES.map((f) => (
              <li key={f.title} className="flex gap-4 border-b border-[#F0F0F2] pb-8 last:border-0 last:pb-0">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#956EFE]/15"
                  aria-hidden
                >
                  <Check className="h-3.5 w-3.5 text-[#6836D5]" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="font-semibold text-[#181A1D]">
                    {f.title}
                    <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-[#956EFE]">
                      Included
                    </span>
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">{f.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 md:mt-24" aria-labelledby="coverage-map-heading">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="coverage-map-heading"
              className="text-xl font-bold tracking-tight text-[#181A1D] md:text-2xl"
            >
              Nationwide college coverage
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6B7280] md:text-base">
              Explore fit, odds, and outcomes across schools in every region—not just the names you
              already know.
            </p>
          </div>

          <PricingMapSocialProof />

          <div className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border border-[#E5E5E7] bg-white p-2 md:mt-8 md:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://my.pathpicker.com/images/social-proof-us-map.webp"
              srcSet="https://my.pathpicker.com/images/social-proof-us-map.webp 1x, https://my.pathpicker.com/images/social-proof-us-map@2x.webp 2x"
              width={1200}
              height={662}
              alt="United States coverage map"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="block h-auto w-full"
            />
          </div>
        </section>

        <section className="mt-20 border-t border-[#EBEBEA] pt-16 md:mt-24 md:pt-20" aria-labelledby="why-us-heading">
          <h2
            id="why-us-heading"
            className="text-center text-xl font-bold tracking-tight text-[#181A1D] md:text-2xl"
          >
            Why PathPicker
          </h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            <div className="text-center md:text-left">
              <p className="text-sm font-bold text-[#181A1D]">Student intelligence signals</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                Decades of campus intelligence plus personality fit—so picks reflect how students
                actually live at each school.
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm font-bold text-[#181A1D]">One place to compare</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                Vibes, odds, and outcomes together—without spreadsheets, Reddit threads, or conflicting
                rankings.
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm font-bold text-[#181A1D]">Help when you need it</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                Questions about your report or account? Reach our team anytime from the contact page.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
