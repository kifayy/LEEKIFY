import Link from "next/link";
import Image from "next/image";

const LOGO_URL = "https://storage.googleapis.com/images_592/s2as.png";

// Figma navbar: logo | nav links | Log In + Sign Up
const navLinks = [
  { href: "/student-archetype-quiz", label: "Archetype Quiz" },
  { href: "/scholarship-quiz", label: "Scholarship Quiz" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/newsletter", label: "Newsletter" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="container mx-auto flex h-28 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        {/* Logo - 2.5x: was ~120x36, now 300x90; display h-20 (80px) md:h-[5.5rem] (~88px) */}
        <Link
          href="/"
          className="flex shrink-0 items-center active:opacity-80"
        >
          <Image
            src={LOGO_URL}
            alt="Pathpicker"
            width={300}
            height={90}
            className="h-20 w-auto object-contain md:h-[5.5rem]"
            unoptimized
          />
        </Link>

        {/* Center nav links - Figma Frame 5 */}
        <nav
          className="hidden flex-1 items-center justify-center gap-8 lg:flex"
          aria-label="Main"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:opacity-90 ${
                i === 0
                  ? "text-[#222628]"
                  : "text-[#181A1D]/75 hover:text-[#181A1D]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Log In + Sign Up - Figma Frame 8 */}
        <div className="flex shrink-0 items-center gap-0">
          <Link
            href="/student-archetype-quiz"
            className="flex h-12 min-w-[104px] items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-[#222628] transition-opacity hover:opacity-90"
          >
            Log In
          </Link>
          <Link
            href="/student-archetype-quiz"
            className="flex h-12 min-w-[117px] items-center justify-center rounded-full bg-[#5D50C6] px-6 text-sm font-medium text-[#EEE] shadow-[0_3px_7px_rgba(93,48,198,0.1),0_13px_13px_rgba(93,48,198,0.09),0_29px_17px_rgba(93,48,198,0.05),0_52px_21px_rgba(93,48,198,0.01)] transition-opacity hover:opacity-95"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
