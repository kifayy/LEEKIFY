import Link from "next/link";

export function HomeDesktopScholarshipInboxCta() {
  return (
    <div className="flex min-w-0 flex-col items-stretch justify-center gap-4 px-4 pb-1 pt-4 sm:gap-5 sm:p-6 md:p-8 lg:flex-row lg:items-start lg:gap-6 lg:p-8 xl:gap-8 xl:p-10 2xl:p-12">
      <div className="min-w-0 text-center lg:mb-0 lg:max-w-sm lg:shrink-0 lg:pt-0.5 lg:text-left xl:max-w-md">
        <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold leading-snug tracking-tight text-[#181A1D] sm:text-xl lg:text-2xl">
          Breaches do not stop after one search.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base lg:mx-0 lg:mt-2 lg:text-lg">
          Upgrade to Leekify Premium for 24/7 monitoring, real-time alerts, settlement notifications,
          and an exportable PDF digital risk report.
        </p>
      </div>

      <div className="flex min-w-0 w-full max-w-xl shrink-0 justify-center lg:max-w-none lg:flex-1 lg:justify-start">
        <div className="flex w-full min-w-0 max-w-[20.5rem] flex-col items-center gap-3 sm:max-w-[24rem] sm:gap-3.5 md:max-w-[560px] lg:mx-0 lg:max-w-[560px] lg:items-stretch lg:gap-4">
          <div className="flex w-full flex-col items-center gap-2 sm:gap-2.5 lg:items-start lg:gap-1">
            <span className="inline-block bg-amber-300 px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums text-neutral-900 sm:text-sm">
              30-day guarantee
            </span>
            <p className="text-center text-sm font-bold text-[#181A1D] sm:text-base lg:text-left">
              Monitor up to 3 IDs
            </p>
          </div>

          <Link
            href="/pricing"
            className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-[#6836D5] px-8 text-base font-semibold text-white shadow-[0_4px_16px_rgba(104,54,213,0.3)] transition hover:bg-[#5a2ebf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6836D5]"
          >
            View Leekify Premium
          </Link>
        </div>
      </div>
    </div>
  );
}
