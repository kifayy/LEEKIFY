import Link from "next/link";
import { NewsletterCTA } from "@/components/newsletter-cta";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.08] bg-[#fafafa]">
      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <NewsletterCTA variant="footer" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="min-h-[44px] min-w-[44px] rounded-full border border-black/[0.08] bg-white px-5 py-3 text-sm font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:border-pathpicker-purple/30 hover:shadow-sm active:opacity-80 md:min-h-0 md:min-w-0 md:py-2"
            >
              Quizzes
            </Link>
            <Link
              href="/scholarships"
              className="min-h-[44px] min-w-[44px] rounded-full border border-black/[0.08] bg-white px-5 py-3 text-sm font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:border-pathpicker-purple/30 hover:shadow-sm active:opacity-80 md:min-h-0 md:min-w-0 md:py-2"
            >
              Browse Schools
            </Link>
            <Link
              href="/privacy"
              className="min-h-[44px] min-w-[44px] rounded-full border border-black/[0.08] bg-white px-5 py-3 text-sm font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:border-pathpicker-purple/30 hover:shadow-sm active:opacity-80 md:min-h-0 md:min-w-0 md:py-2"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="min-h-[44px] min-w-[44px] rounded-full border border-black/[0.08] bg-white px-5 py-3 text-sm font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:border-pathpicker-purple/30 hover:shadow-sm active:opacity-80 md:min-h-0 md:min-w-0 md:py-2"
            >
              Terms
            </Link>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pathpicker-purple text-white md:h-10 md:w-10 md:rounded-lg">
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M12 2L15 8.5L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9 8.5L12 2Z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-pathpicker-purple">POWERED BY THE SCHOLARSHIP APP</p>
            <p className="text-lg font-bold text-foreground">AWARDED</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
