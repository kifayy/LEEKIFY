import Link from "next/link";
import { SCHOLARSHIP_QUIZ_URL } from "@/lib/constants";

type MobileScholarshipQuizStickyFooterProps = {
  /** When false, bar is slid off-screen (still mounted for smooth transition). */
  visible?: boolean;
};

/** Site-wide (layout): fixed bottom bar on small screens — Scholarship Quiz CTA (purple pill). */
export function MobileScholarshipQuizStickyFooter({
  visible = true,
}: MobileScholarshipQuizStickyFooterProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-[#E5E5E7] bg-white/95 px-4 pt-2 shadow-[0_-2px_16px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-[transform,opacity] duration-200 ease-out supports-[backdrop-filter]:bg-white/90 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      role="complementary"
      aria-label="Scholarship quiz"
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-lg justify-center py-1">
        <Link
          href={SCHOLARSHIP_QUIZ_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          className="inline-flex h-12 w-full min-w-[200px] max-w-sm items-center justify-center gap-2 rounded-full bg-[#956EFE] px-6 text-base font-semibold text-white shadow-[0_2px_8px_rgba(149,110,254,0.25)] transition-opacity hover:opacity-95 active:opacity-90"
        >
          <span className="text-lg leading-none" aria-hidden>
            💸
          </span>
          Scholarship Quiz
        </Link>
      </div>
    </div>
  );
}
