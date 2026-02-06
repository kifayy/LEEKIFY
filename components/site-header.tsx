import Link from "next/link";
import { Sparkles, Send, Gem } from "lucide-react";

const navLinks = [
  { href: "/student-archetype-quiz", label: "Archetype Quiz", icon: Sparkles, iconClass: "text-emerald-600" },
  { href: "/newsletter", label: "Newsletter", icon: Send, iconClass: "text-blue-600" },
  { href: "/scholarships", label: "Student Freebies", icon: Gem, iconClass: "text-emerald-500" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:py-0 md:h-16">
          <Link
            href="/"
            className="flex min-h-[44px] items-center gap-0 font-semibold -ml-1 px-1 active:opacity-80 md:min-h-0"
          >
            <div className="flex flex-col leading-tight">
              <span className="text-[1.1rem] text-pathpicker-purple tracking-tight md:text-lg">pathpicker</span>
              <span className="text-[10px] font-normal uppercase tracking-widest text-black/60 md:text-[11px]">
                BY AWARDED
              </span>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-1 md:gap-8" aria-label="Main">
            {navLinks.map(({ href, label, icon: Icon, iconClass }) => (
              <Link
                key={href}
                href={href}
                className="flex min-h-[44px] flex-shrink-0 items-center justify-center gap-2 rounded-lg px-3 text-[13px] font-medium text-black transition-colors hover:opacity-80 active:opacity-70 md:min-h-0 md:min-w-0 md:justify-start md:px-0"
              >
                <Icon className={`h-4 w-4 shrink-0 ${iconClass}`} aria-hidden strokeWidth={2} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
            <a
              href="https://apps.apple.com/app/awarded/id6479016262"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] flex-shrink-0 items-center gap-2 rounded-lg border border-black/20 bg-white px-3 py-2 transition-colors hover:bg-black/[0.04] active:bg-black/[0.06] md:min-h-0"
            >
              <svg className="h-5 w-5 shrink-0 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.39-1.42-3.35-2.62-1.83-2.64-3.16-7.46-1.38-10.69 1.01-1.39 2.79-2.21 4.51-2.32 1.12-.09 2.19.39 3.07 1.04.44.33.84.73 1.23 1.19.32.37.66.77.96 1.24.24.37.04.34-.19.11-.57-.57-1.22-1.02-2.07-1.31-.43-.15-.98-.26-1.53-.25-1.16.01-2.27.41-3.2 1.18-2.11 2.01-1.7 5.58-.35 7.38.68.9 1.46 1.87 2.38 2.71.19.17.39.34.61.49.22.15.16.12-.05-.05z" />
                <path d="M12.5 7.43c.28-1.37.07-2.71-.93-3.83-.98-1.09-2.52-1.7-3.99-1.57-.31.02-.61.09-.9.18.32-.94 1.02-1.7 1.89-2.23.87-.53 1.96-.8 2.98-.65.12.01.24.03.35.05z" />
              </svg>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] text-black/80">Download on the</span>
                <span className="text-[13px] font-semibold text-black">App Store</span>
              </span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
