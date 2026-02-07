import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const LOGO_URL = "https://storage.googleapis.com/images_592/s2as.png";

const SOCIAL_LINKS = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
];

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/scholarships", label: "Scholarships" },
      { href: "/scholarships/articles", label: "Blog" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/student-archetype-quiz", label: "Archetype Quiz" },
      { href: "/scholarship-quiz", label: "Scholarship Quiz" },
      { href: "/scholarships", label: "Featured Scholarships" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/about", label: "Help Center" },
      { href: "/newsletter", label: "Newsletter" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:hello@pathpicker.com", label: "hello@pathpicker.com" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-white">
      {/* Top divider */}
      <div className="h-px w-full shrink-0" style={{ backgroundColor: "#EFF0F7" }} />

      <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Left: Logo, Copyright, Social */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex w-fit items-center active:opacity-80">
              <Image
                src={LOGO_URL}
                alt="Pathpicker"
                width={180}
                height={54}
                className="h-12 w-auto object-contain md:h-14"
                unoptimized
              />
            </Link>
            <p className="max-w-[306px] text-sm font-normal leading-relaxed" style={{ color: "#6E6C8F" }}>
              © {2026} Pathpicker. Find your student archetype and scholarships that fit.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#F2F2FF" }}
                >
                  <Icon className="h-4 w-4" style={{ color: "#F95F9F" }} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Footer columns - flex row so they display horizontally */}
          <div className="flex flex-row flex-wrap gap-x-12 gap-y-10">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="flex min-w-[120px] flex-col gap-4">
                <h3
                  className="text-sm font-bold text-[#181A1D]"
                >
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:opacity-80"
                        style={{ color: "#6E6C8F" }}
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

        {/* Bottom divider */}
        <div
          className="my-10 h-px w-full shrink-0 md:my-12"
          style={{ backgroundColor: "#D9DBE9" }}
        />

        {/* Footer bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
          <p style={{ color: "#6E6C8F" }}>
            © {2026} Pathpicker. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:opacity-80" style={{ color: "#6E6C8F" }}>
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:opacity-80" style={{ color: "#6E6C8F" }}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
