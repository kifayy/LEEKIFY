"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";

const LOGO_URL = "https://storage.googleapis.com/images_592/s2as.png";

const navLinks = [
  { href: COLLEGE_MATCH_QUIZ_URL, label: "College Match Quiz", external: true },
  { href: "/browse-schools", label: "Browse Schools" },
  { href: "/#deep-profile-rankings", label: "Features" },
  { href: "/#commit-with-zero-regrets", label: "How it Works" },
  { href: "/contact", label: "Support" },
];

/** Mobile drawer: omit quiz link + bottom CTA — same entry exists on the floating footer after scroll. */
const mobileDrawerNavLinks = navLinks.filter((link) => !("external" in link && link.external));

const SCROLL_HIDE_THRESHOLD = 0.1;

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledPastThreshold, setScrolledPastThreshold] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRafRef = useRef<number | null>(null);
  const scrollThresholdRef = useRef(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
        className="fixed top-0 left-0 right-0 z-50 h-24 w-full min-h-0 min-w-0 shrink-0 overflow-hidden bg-white transition-transform duration-300 ease-out md:h-32 lg:relative lg:top-auto lg:z-10 lg:h-36 lg:border-0 lg:bg-[#F4F2FF] lg:shadow-none"
        style={{
          transform: isMobile && scrolledPastThreshold ? "translateY(-100%)" : undefined,
        }}
      >
        <div className="container mx-auto flex h-full max-h-full max-w-6xl items-center justify-between gap-2 overflow-hidden px-4 md:gap-6 md:px-6 lg:px-8 min-w-0">
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

          <nav
            className="hidden flex-1 flex-nowrap items-center justify-center gap-6 lg:flex xl:gap-8"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={"external" in link && link.external ? "_blank" : undefined}
                rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                className="relative shrink-0 whitespace-nowrap text-[15px] font-medium text-[#181A1D]/80 transition-colors duration-200 lg:py-1 lg:hover:text-[#956EFE] lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:block lg:after:h-0.5 lg:after:w-0 lg:after:content-[''] lg:after:rounded-full lg:after:bg-[#956EFE] lg:after:transition-[width] lg:after:duration-200 lg:hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center md:ml-6">
            <Link
              href="https://my.pathpicker.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] min-w-0 items-center gap-1.5 rounded-[15px] border-2 border-[#E5E5E7] bg-transparent px-4 py-2 text-sm font-medium text-[#181A1D] transition-colors hover:border-[#956EFE] hover:text-[#956EFE] md:hidden"
              aria-label="Student Login"
            >
              <span aria-hidden>🎓</span>
              Student Login
            </Link>
            <Link
              href="https://my.pathpicker.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-[48px] items-center gap-2 rounded-[15px] border-2 border-[#E5E5E7] bg-transparent px-5 py-2.5 text-[15px] font-medium text-[#181A1D] transition-colors hover:border-[#956EFE] hover:text-[#956EFE] md:inline-flex"
              aria-label="Student Login"
            >
              <span aria-hidden>🎓</span>
              Student Login
            </Link>
          </div>
        </div>
      </header>

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

            <nav className="flex-1 px-3" aria-label="Main">
              <div className="rounded-2xl bg-white py-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                {mobileDrawerNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between px-4 py-3.5 text-[15px] font-medium text-[#181A1D] transition-colors first:rounded-t-2xl last:rounded-b-2xl hover:bg-[#F5F3FF] hover:text-[#956EFE]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="p-5 pt-0">
              <Link
                href="https://my.pathpicker.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E5E5E7] bg-white py-4 text-base font-medium text-[#181A1D] shadow-sm transition-opacity hover:opacity-90"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Student Login"
              >
                <span aria-hidden>🎓</span>
                Student Login
                <ArrowRight className="h-5 w-5 shrink-0" strokeWidth={2.5} />
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
