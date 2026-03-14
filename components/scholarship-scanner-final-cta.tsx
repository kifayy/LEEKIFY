import Link from "next/link";

const HEADING_COLOR = "#181A1D";
const BODY_COLOR = "rgb(88, 89, 93)";

export function ScholarshipScannerFinalCta() {
  return (
    <section className="w-full min-w-0 overflow-x-hidden bg-white py-12 md:py-16" aria-label="Get started">
      <div className="container mx-auto max-w-[1024px] min-w-0 px-4 md:px-6">
        <h2
          className="mx-auto mb-6 max-w-[603px] text-center text-[2.44rem] font-bold leading-tight tracking-tight md:mb-8 md:text-[2.93rem] lg:text-[4.875rem]"
          style={{ color: HEADING_COLOR }}
        >
          Student Money In <span style={{ color: "#007aff" }}>Your Texts</span>
        </h2>

        <div className="mx-auto flex flex-col items-center">
          <Link
            href="https://my.pathpicker.com/login"
            className="inline-flex h-16 min-w-[200px] items-center justify-center gap-2 rounded-[15px] border-2 border-[#181A1D] bg-[#956EFE] px-8 text-base font-medium text-white shadow-[3px_3px_0_0_#181A1D] transition hover:opacity-95"
            aria-label="Student Login"
          >
            <span>🎓</span>Student Login
          </Link>
          <p className="mt-2 text-center text-sm font-medium md:text-base" style={{ color: BODY_COLOR }}>
            Free • No App Required • No Sign-up
          </p>
        </div>
      </div>
    </section>
  );
}
