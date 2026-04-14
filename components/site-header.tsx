"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOGO_URL = "https://storage.googleapis.com/images_592/s2as.png";

const scholarshipCategories = [
  { href: "/scholarships/by-major", label: "By Major" },
  { href: "/scholarships/by-state", label: "By State" },
  { href: "/scholarships/high-school-students", label: "High School Students" },
  { href: "/scholarships/college-students", label: "College Students" },
  { href: "/scholarships/easy-to-win", label: "Easy to Win" },
];

const navLinks = [
  { href: "/browse-schools", label: "Browse Schools" },
  { href: "/archetype-quiz", label: "Archetype Quiz" },
  { href: "/scholarships", label: "Scholarships", hasDropdown: true },
];

const SCROLL_HIDE_THRESHOLD = 0.1; // hide nav after 10% of viewport scrolled

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scholarshipsExpanded, setScholarshipsExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const [scrolledPastThreshold, setScrolledPastThreshold] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scholarshipsTriggerRef = useRef<HTMLAnchorElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const scrollThresholdRef = useRef(false);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

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

  useEffect(() => () => clearCloseTimeout(), []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const setMobile = () => setIsMobile(mq.matches);
    setMobile();
    mq.addEventListener("change", setMobile);
    return () => mq.removeEventListener("change", setMobile);
  }, []);

  useEffect(() => {
    const threshold = () => window.innerHeight * SCROLL_HIDE_THRESHOLD;
    const onScroll = () => {
      const past = window.scrollY > threshold();
      if (scrollThresholdRef.current === past) return;
      scrollThresholdRef.current = past;
      if (scrollRafRef.current != null) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        setScrolledPastThreshold(past);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current != null) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-24 w-full min-h-0 min-w-0 shrink-0 overflow-hidden bg-white transition-transform duration-300 ease-out md:h-32 lg:h-36 lg:border-b lg:border-[#E5E5E7] lg:bg-[#FAFAFB] lg:shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
        style={{
          transform: isMobile && scrolledPastThreshold ? "translateY(-100%)" : undefined,
        }}
      >
        <div className="container mx-auto flex h-full max-h-full max-w-6xl items-center justify-between gap-2 overflow-hidden px-4 md:gap-6 md:px-6 lg:px-8 min-w-0">
          {/* Logo + mobile menu button - logo sized to fit header height */}
          <div className="flex min-w-0 shrink items-center gap-2 overflow-hidden">
            <Link href="/" className="flex min-h-0 min-w-0 shrink items-center active:opacity-80">
              <Image
                src={LOGO_URL}
                alt="Pathpicker"
                width={600}
                height={180}
                className="h-28 w-auto max-w-[400px] object-contain object-left sm:h-32 sm:max-w-[440px] md:h-40 md:max-w-[520px] lg:h-48 lg:max-w-[560px]"
                unoptimized
              />
            </Link>

            {/* Mobile menu trigger - 48px min touch target for Mobile Usability */}
            <Button
              variant="ghost"
              size="icon"
              className="h-12 min-h-[48px] min-w-[48px] w-12 lg:hidden lg:h-10 lg:min-h-0 lg:min-w-0 lg:w-10"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

        {/* Center nav links - desktop only */}
        <nav
          className="hidden flex-1 flex-nowrap items-center justify-center gap-10 lg:flex"
          aria-label="Main"
        >
          {navLinks.map((link) =>
            "hasDropdown" in link && link.hasDropdown ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => {
                  clearCloseTimeout();
                  updateDropdownRect();
                  setDropdownOpen(true);
                }}
                onMouseLeave={scheduleClose}
              >
                <Link
                  ref={scholarshipsTriggerRef}
                  href={link.href}
                  className="relative inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[15px] font-medium text-[#181A1D]/80 transition-colors duration-200 lg:py-1 lg:hover:text-[#956EFE]"
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
                      onMouseEnter={() => {
                        clearCloseTimeout();
                        setDropdownOpen(true);
                      }}
                      onMouseLeave={scheduleClose}
                    >
                      <Link
                        href="/scholarships"
                        className="block border-b border-[#F0F0F0] px-4 py-2.5 text-sm font-semibold text-[#956EFE] transition-colors hover:bg-[#F5F3FF]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        All Scholarships
                      </Link>
                      <Link
                        href="/scholarship-scanner"
                        className="block border-b border-[#F0F0F0] px-4 py-2.5 text-sm font-medium text-[#181A1D] transition-colors hover:bg-[#F5F3FF] hover:text-[#956EFE]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Scholarship Scanner
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
                className="relative shrink-0 whitespace-nowrap text-[15px] font-medium text-[#181A1D]/80 transition-colors duration-200 lg:py-1 lg:hover:text-[#956EFE] lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:block lg:after:h-0.5 lg:after:w-0 lg:after:content-[''] lg:after:rounded-full lg:after:bg-[#956EFE] lg:after:transition-[width] lg:after:duration-200 lg:hover:after:w-full"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right: mobile = Continue pill; desktop = Get Started image */}
        <div className="flex shrink-0 items-center md:ml-6">
          <Link
            href="https://my.pathpicker.com/login"
            className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-[15px] border-2 border-[#181A1D] bg-[#956EFE] px-6 text-sm font-medium text-white shadow-[3px_3px_0_0_#181A1D] transition hover:opacity-95 md:hidden"
            aria-label="Student Login"
          >
            <span>🎓</span>Student Login
          </Link>
          <Link
            href="https://my.pathpicker.com/login"
            className="hidden items-center justify-center rounded-[15px] border-2 border-[#181A1D] bg-[#956EFE] px-8 text-base font-medium text-white shadow-[3px_3px_0_#181A1D] transition hover:opacity-95 md:inline-flex md:h-16 md:min-w-[200px]"
            aria-label="Student Login"
          >
            <span>🎓</span>Student Login
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
            {/* Top: logo + close */}
            <div className="flex items-start justify-between gap-4 px-5 pt-6 pb-4">
              <Link
                href="/"
                className="flex min-w-0 flex-1 items-center active:opacity-80"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image
                  src={LOGO_URL}
                  alt="Pathpicker"
                  width={480}
                  height={144}
                  className="h-[10.5rem] w-auto shrink-0 object-contain"
                  unoptimized
                />
              </Link>
              <button
                type="button"
                className="flex h-12 min-h-[48px] min-w-[48px] w-12 shrink-0 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-white hover:text-[#181A1D]"
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
                          <Link
                            href="/scholarship-scanner"
                            className="block px-4 py-2.5 pl-6 text-[14px] font-medium text-[#181A1D] transition-colors hover:bg-[#F5F3FF] hover:text-[#956EFE]"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Scholarship Scanner
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

            {/* CTAs: Win Scholarships + Student Login */}
            <div className="flex flex-col gap-3 p-5 pt-0">
              <Link
                href="https://joinawarded.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E5E5E7] bg-white py-4 text-base font-normal text-[#181A1D] shadow-sm transition-opacity hover:opacity-90"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Win Scholarships — open scholarship quiz"
              >
                <span>💸</span>Win Scholarships
                <ArrowRight className="h-5 w-5 shrink-0" strokeWidth={2.5} />
              </Link>
              <Link
                href="https://my.pathpicker.com/login"
                className="inline-flex h-16 min-w-[200px] w-full items-center justify-center gap-2 rounded-[15px] border-2 border-[#181A1D] bg-[#956EFE] px-8 text-base font-medium text-white shadow-[3px_3px_0_0_#181A1D] transition hover:opacity-95"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Student Login"
              >
                <span>🎓</span>Student Login
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
