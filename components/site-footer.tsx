import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { CopyrightYear } from "@/components/copyright-year";

const LOGO_URL =
  "https://storage.googleapis.com/images_592/black%20white%20grow%20logo%20(3).png";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/partners", label: "Partners" },
      { href: "/scholarships", label: "Scholarships" },
      { href: "/scholarships/by-major", label: "Blog" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/browse-schools", label: "Browse Schools" },
      { href: "/archetype-quiz", label: "Archetype Quiz" },
      { href: "/scholarships", label: "Featured Scholarships" },
      { href: "/scholarship-scanner", label: "Scholarship Scanner" },
    ],
  },
  {
    title: "Support",
    links: [{ href: "/partners", label: "For Partners" }],
  },
];

const FOOTER_BG = "#956EFE";
const FOOTER_DARK = "#FFFFFF";
const FOOTER_MUTED = "rgba(255, 255, 255, 0.85)";
const FOOTER_BORDER = "rgba(255, 255, 255, 0.18)";

export function SiteFooter() {
  return (
    <footer
      className="w-full -mt-px md:-mt-1"
      style={{ backgroundColor: FOOTER_BG, color: FOOTER_DARK }}
    >
      <div className="mx-auto flex max-w-[1290px] flex-col px-4 py-16 md:px-[75px] md:gap-24">
        {/* Top row: logo + tagline, then link columns */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          {/* Left: Logo + tagline (replaces eco-label block) */}
          <div className="flex max-w-[295px] flex-col gap-6">
            <Link href="/" className="flex w-fit items-center active:opacity-80">
              <Image
                src={LOGO_URL}
                alt="Pathpicker"
                width={336}
                height={126}
                className="h-[7.5rem] w-auto object-contain md:h-36"
                unoptimized
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: FOOTER_MUTED }}>
              Find your student archetype and scholarships that fit.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-x-12 gap-y-10 lg:gap-x-16">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="flex min-w-[120px] flex-col gap-6">
                <h3 className="text-sm font-bold" style={{ color: FOOTER_DARK }}>
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm transition-opacity hover:opacity-80"
                        style={{ color: FOOTER_DARK }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar: logo, copyright, buttons */}
        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <Link href="/" className="flex w-fit items-center active:opacity-80">
              <Image
                src={LOGO_URL}
                alt="Pathpicker"
                width={390}
                height={72}
                className="h-[4.5rem] w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-sm" style={{ color: FOOTER_MUTED }}>
              © <Suspense fallback={2025}><CopyrightYear /></Suspense> Pathpicker. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="https://my.pathpicker.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 min-w-[137px] items-center justify-center gap-2 rounded-xl border-2 bg-white px-6 text-sm font-semibold text-[#181A1D] shadow-[3px_3px_0_0_rgba(15,23,42,0.85)] transition hover:opacity-90"
              style={{ borderColor: FOOTER_DARK }}
            >
              🎓 Student Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
