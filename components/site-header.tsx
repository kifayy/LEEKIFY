"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOGO_URL = "https://storage.googleapis.com/images_592/s2as.png";

const scholarshipCategories = [
  { href: "/scholarships/by-major", label: "By Major" },
  { href: "/scholarships/easy-to-win", label: "Easy to Win" },
  { href: "/scholarships/by-state", label: "By State" },
  { href: "/scholarships/by-grade-level", label: "By Grade Level" },
  { href: "/scholarships/by-amount", label: "By Amount" },
  { href: "/scholarships/by-first-generation", label: "First-Gen" },
];

const navLinks = [
  { href: "http://my.pathpicker.com/archetype", label: "Archetype Quiz" },
  { href: "/scholarship-quiz", label: "Scholarship Quiz" },
  { href: "/scholarships", label: "Scholarships", hasDropdown: true },
  { href: "/newsletter", label: "Newsletter" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scholarshipsExpanded, setScholarshipsExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const scholarshipsTriggerRef = useRef<HTMLAnchorElement>(null);

  const updateDropdownRect = () => {
    const el = scholarshipsTriggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setDropdownRect({ top: r.bottom + 4, left: r.left + r.width / 2, width: r.width });
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setScholarshipsExpanded(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-24 w-full min-h-0 min-w-0 shrink-0 overflow-hidden bg-white md:h-32 lg:h-36 lg:border-b lg:border-[#E5E5E7] lg:bg-[#FAFAFB] lg:shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
        style={{ touchAction: "none" }}
      >
        <div className="container ml-0 mr-auto flex h-full max-h-full max-w-6xl items-center justify-between gap-2 overflow-hidden pl-4 pr-4 md:gap-6 md:pl-6 md:pr-6 lg:pl-8 lg:pr-8 min-w-0">
          {/* Logo + mobile menu button - logo sized to fit header height */}
          <div className="flex min-w-0 shrink items-center gap-2 overflow-hidden">
            <Link href="/" className="flex min-h-0 min-w-0 shrink items-center active:opacity-80">
              <Image
                src={LOGO_URL}
                alt="Pathpicker"
                width={600}
                height={180}
                className="h-14 w-auto max-w-[200px] object-contain object-left sm:h-16 sm:max-w-[220px] md:h-20 md:max-w-[260px] lg:h-24 lg:max-w-[280px]"
                unoptimized
              />
            </Link>

            {/* Mobile menu trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

        {/* Center nav links - desktop only */}
        <nav
          className="hidden flex-1 items-center justify-center gap-10 lg:flex"
          aria-label="Main"
        >
          {navLinks.map((link) =>
            "hasDropdown" in link && link.hasDropdown ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => {
                  updateDropdownRect();
                  setDropdownOpen(true);
                }}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  ref={scholarshipsTriggerRef}
                  href={link.href}
                  className="relative inline-flex items-center gap-1 text-[15px] font-medium text-[#181A1D]/80 transition-colors duration-200 lg:py-1 lg:hover:text-[#956EFE]"
                >
                  {link.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </Link>
                {dropdownOpen &&
                  dropdownRect &&
                  typeof document !== "undefined" &&
                  createPortal(
                    <div
                      className="fixed z-[60] w-48 rounded-xl border border-[#E5E5E7] bg-white py-2 shadow-lg"
                      style={{ top: dropdownRect.top, left: dropdownRect.left - 96 }}
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <Link
                        href="/scholarships"
                        className="block border-b border-[#F0F0F0] px-4 py-2.5 text-sm font-semibold text-[#956EFE] transition-colors hover:bg-[#F5F3FF]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        All Scholarships
                      </Link>
                      {scholarshipCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="block px-4 py-2.5 text-sm font-medium text-[#181A1D] transition-colors hover:bg-[#F5F3FF] hover:text-[#956EFE]"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>,
                    document.body
                  )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="relative text-[15px] font-medium text-[#181A1D]/80 transition-colors duration-200 lg:py-1 lg:hover:text-[#956EFE] lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:block lg:after:h-0.5 lg:after:w-0 lg:after:content-[''] lg:after:rounded-full lg:after:bg-[#956EFE] lg:after:transition-[width] lg:after:duration-200 lg:hover:after:w-full"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right: Try Awarded button - desktop polish */}
        <div className="flex shrink-0 items-center md:ml-6">
          <Link
            href="http://my.pathpicker.com/archetype"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 min-w-[90px] items-center justify-center rounded-full bg-[#956EFE] px-3 text-xs font-bold text-[#EEE] shadow-[0_3px_7px_rgba(149,110,254,0.2)] transition-all duration-200 hover:opacity-95 sm:h-10 sm:min-w-[100px] sm:px-4 sm:text-sm md:h-12 md:min-w-[140px] md:px-6 lg:shadow-[0_4px_12px_rgba(149,110,254,0.25)] lg:hover:-translate-y-0.5 lg:hover:shadow-[0_6px_16px_rgba(149,110,254,0.3)]"
          >
            Try Awarded
          </Link>
        </div>
      </div>
    </header>

      {/* Mobile side drawer - redesigned */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm lg:hidden"
            aria-hidden
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside
            className="fixed top-0 left-0 z-[101] flex h-full w-[min(320px,90vw)] flex-col bg-[#FAFAFC] animate-in slide-in-from-left-2 duration-300 ease-out lg:hidden"
            aria-modal
            aria-label="Navigation menu"
            style={{ boxShadow: "4px 0 24px rgba(0,0,0,0.12)" }}
          >
            {/* Top: logo + slogan + close */}
            <div className="flex items-start justify-between gap-4 px-5 pt-6 pb-8">
              <Link
                href="/"
                className="flex min-w-0 flex-1 items-center gap-3 active:opacity-80"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image
                  src={LOGO_URL}
                  alt="Pathpicker"
                  width={480}
                  height={144}
                  className="h-[5.25rem] w-auto shrink-0 object-contain"
                  unoptimized
                />
                <p
                  className="min-w-0 text-[10px] italic leading-snug"
                  style={{ color: "#956EFE" }}
                >
                  &ldquo;Finding your student path, made easy&rdquo;
                </p>
              </Link>
              <button
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-white hover:text-[#181A1D]"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3" aria-label="Main">
              <div className="rounded-2xl bg-white py-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                {navLinks.map((link) =>
                  "hasDropdown" in link && link.hasDropdown ? (
                    <div key={link.href}>
                      <button
                        type="button"
                        onClick={() => setScholarshipsExpanded((e) => !e)}
                        className="flex w-full items-center justify-between px-4 py-3.5 text-[15px] font-medium text-[#181A1D] transition-colors first:rounded-t-2xl hover:bg-[#F5F3FF] hover:text-[#956EFE]"
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-5 w-5 text-[#D1D5DB] transition-transform ${scholarshipsExpanded ? "rotate-180" : ""}`}
                          strokeWidth={2}
                        />
                      </button>
                      {scholarshipsExpanded && (
                        <div className="border-t border-[#F0F0F0] bg-[#FAFAFC] py-2">
                          <Link
                            href={link.href}
                            className="block px-4 py-2.5 pl-6 text-[14px] font-medium text-[#181A1D] transition-colors hover:bg-[#F5F3FF] hover:text-[#956EFE]"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            All Scholarships
                          </Link>
                          {scholarshipCategories.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              className="block px-4 py-2.5 pl-6 text-[14px] font-medium text-[#181A1D] transition-colors hover:bg-[#F5F3FF] hover:text-[#956EFE]"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-between px-4 py-3.5 text-[15px] font-medium text-[#181A1D] transition-colors first:rounded-t-2xl last:rounded-b-2xl hover:bg-[#F5F3FF] hover:text-[#956EFE]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </nav>

            {/* CTA */}
            <div className="p-5">
              <Link
                href="http://my.pathpicker.com/archetype"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-xl bg-[#956EFE] py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-95"
                onClick={() => setMobileMenuOpen(false)}
              >
                Try Awarded
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
