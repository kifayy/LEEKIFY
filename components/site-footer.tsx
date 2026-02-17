import Link from "next/link";
import Image from "next/image";

const LOGO_URL = "https://storage.googleapis.com/images_592/s2as.png";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/scholarships", label: "Scholarships" },
      { href: "/scholarships/by-major", label: "Blog" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "https://my.pathpicker.com/archetype", label: "Archetype Quiz" },
      { href: "/scholarship-quiz", label: "Scholarship Quiz" },
      { href: "/scholarships", label: "Featured Scholarships" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/newsletter", label: "Newsletter" },
      { href: "https://awarded.app/providers", label: "For Business" },
    ],
  },
];

const FOOTER_DARK = "#2E2F35";
const FOOTER_MUTED = "#58595D";
const FOOTER_BORDER = "#E6E6E7";

export function SiteFooter() {
  return (
    <footer className="w-full bg-white">
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
            <p
              className="text-sm leading-relaxed"
              style={{ color: FOOTER_MUTED }}
            >
              Find your student archetype and scholarships that fit.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-x-12 gap-y-10 lg:gap-x-16">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="flex min-w-[120px] flex-col gap-6">
                <h3
                  className="text-sm font-bold"
                  style={{ color: FOOTER_DARK }}
                >
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm transition-colors hover:opacity-80"
                        style={{ color: FOOTER_DARK }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div className="flex min-w-[120px] flex-col gap-6">
              <h3
                className="text-sm font-bold"
                style={{ color: FOOTER_DARK }}
              >
                Contact
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:hello@pathpicker.com"
                  className="flex items-center gap-2.5 text-sm transition-colors hover:opacity-80"
                  style={{ color: FOOTER_DARK }}
                >
                  <span className="text-lg" aria-hidden>✉</span>
                  hello@pathpicker.com
                </a>
                <p className="text-sm leading-relaxed" style={{ color: FOOTER_MUTED }}>
                  ❤️ Built for students, by students.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: divider + logo, copyright, buttons */}
        <div
          className="flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between md:gap-8"
          style={{ borderColor: FOOTER_BORDER }}
        >
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
              © {new Date().getFullYear()} Pathpicker. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="https://my.pathpicker.com/archetype"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 min-w-[137px] items-center justify-center rounded-xl border-2 bg-white px-6 text-sm font-medium shadow-[3px_3px_0_0_#2E2F35] transition hover:opacity-90"
              style={{ borderColor: FOOTER_DARK, color: FOOTER_DARK }}
            >
              Try Awarded
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
