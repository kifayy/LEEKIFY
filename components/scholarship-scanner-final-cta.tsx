import Image from "next/image";
import Link from "next/link";
import { SCHOLARSHIP_SCANNER_SMS_URL } from "@/lib/constants";

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
            href={SCHOLARSHIP_SCANNER_SMS_URL}
            className="relative block h-[131px] w-full max-w-[582px] overflow-hidden rounded-lg transition-opacity hover:opacity-95 active:opacity-90 md:h-[160px] md:max-w-[692px]"
            aria-label="Get started — Scholarship Scanner (opens SMS)"
          >
            <Image
              src="https://storage.googleapis.com/images_592/Group%201SS0.png"
              alt="Get started — Scholarship Scanner"
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 582px, 692px"
              unoptimized
            />
          </Link>
          <p className="mt-2 text-center text-sm font-medium md:text-base" style={{ color: BODY_COLOR }}>
            Free • No App Required • No Sign-up
          </p>
        </div>
      </div>
    </section>
  );
}
