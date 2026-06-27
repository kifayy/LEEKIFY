"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PATH_COLLEGE_MATCH_QUIZ_LABEL } from "@/components/home/path-quiz-cta";
import { useCollegeMatchQuizUrl } from "@/hooks/useCollegeMatchQuizUrl";
import { trackLandingCtaToQuiz } from "@/lib/landing-quiz-cta-tracking";
import { CALCULATOR_NAV_PAGES } from "@/lib/calculator-pages";
import { COLLEGE_MATCH_QUIZ_URL, PATHPICKER_SITE_PURPLE } from "@/lib/constants";
import {
  PATHPICKER_ASSETS_LOGO_URL,
  PATHPICKER_FOOTER_LOGO_URL,
  PATHPICKER_PURPLE_LOGO_URL,
} from "@/lib/brand-logos";
import { cn } from "@/lib/utils";

const HOME_HEADER_LOGO_URL = PATHPICKER_ASSETS_LOGO_URL;
const CHROME_HEADER_LOGO_URL = PATHPICKER_FOOTER_LOGO_URL;
const DRAWER_LOGO_URL = PATHPICKER_PURPLE_LOGO_URL;

const navLinks = [
  { href: COLLEGE_MATCH_QUIZ_URL, label: PATH_COLLEGE_MATCH_QUIZ_LABEL, external: true },
  { href: "/browse", label: "Browse Schools" },
  { href: "/#deep-profile-rankings", label: "Features" },
  { href: "/contact", label: "Support" },
];

/** Mobile drawer: omit quiz link — shown as primary CTA above the link list. */
const mobileDrawerNavLinks = navLinks.filter((link) => !("external" in link && link.external));

const MOBILE_DRAWER_LINKS_BEFORE_CALCULATORS = mobileDrawerNavLinks.filter(
  (link) => link.href === "/browse",
);
const MOBILE_DRAWER_LINKS_AFTER_CALCULATORS = mobileDrawerNavLinks.filter(
  (link) => link.href !== "/browse",
);

const SCROLL_HIDE_THRESHOLD = 0.1;

function MobileCalculatorsNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-[#F0F0F2]">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-[15px] font-medium text-[#181A1D] transition-colors hover:bg-[#F5F3FF] hover:text-[#956EFE]"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>Calculators</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-[#9CA3AF] transition-transform", open && "rotate-180")}
          strokeWidth={2.5}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="border-t border-[#F0F0F2] bg-[#FAFAFC] py-1">
          {CALCULATOR_NAV_PAGES.map((page) => {
            const active = pathname === page.href || pathname.startsWith(`${page.href}/`);
            return (
              <Link
                key={page.href}
                href={page.href}
                className={cn(
                  "flex items-center px-4 py-3 pl-8 text-[14px] font-medium transition-colors",
                  active
                    ? "bg-[#F5F3FF] text-[#956EFE]"
                    : "text-[#58595D] hover:bg-[#F5F3FF] hover:text-[#956EFE]",
                )}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
              >
                {page.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const collegeMatchQuizUrl = useCollegeMatchQuizUrl();
  const isHome = pathname === "/";
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
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-32 w-full min-h-0 min-w-0 shrink-0 overflow-hidden transition-transform duration-300 ease-out md:h-44 lg:relative lg:top-auto lg:z-10 lg:h-52 lg:border-0 lg:shadow-none",
          isHome ? "max-md:bg-transparent md:bg-white lg:bg-[#4E2FFF]" : "bg-[#956EFE]",
        )}
        style={{
          backgroundColor: isHome ? undefined : PATHPICKER_SITE_PURPLE,
          transform: isMobile && scrolledPastThreshold ? "translateY(-100%)" : undefined,
        }}
      >
        <div className="container mx-auto flex h-full max-h-full max-w-6xl items-center justify-between gap-2 overflow-hidden px-4 md:gap-6 md:px-6 lg:px-8 min-w-0">
          <div className="flex min-w-0 shrink items-center gap-2 overflow-hidden">
            <Link href="/" className="flex min-h-0 min-w-0 shrink items-center active:opacity-80">
              <Image
                src={isHome ? HOME_HEADER_LOGO_URL : CHROME_HEADER_LOGO_URL}
                alt="Pathpicker"
                width={336}
                height={126}
                className="h-28 w-auto max-w-[min(90vw,440px)] object-contain object-left sm:h-32 md:h-40 md:max-w-[520px] lg:h-48 lg:max-w-[600px]"
                priority
              />
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-12 min-h-[48px] min-w-[48px] w-12 lg:hidden lg:h-10 lg:min-h-0 lg:min-w-0 lg:w-10",
                isHome
                  ? "text-white hover:bg-white/10 hover:text-white md:text-[#181A1D] md:hover:bg-accent md:hover:text-accent-foreground"
                  : "text-white hover:bg-white/10 hover:text-white",
              )}
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
                key={link.label}
                href={"external" in link && link.external ? collegeMatchQuizUrl : link.href}
                target={"external" in link && link.external ? "_blank" : undefined}
                rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                onClick={"external" in link && link.external ? () => trackLandingCtaToQuiz() : undefined}
                className={cn(
                  "relative shrink-0 whitespace-nowrap text-[15px] font-medium transition-colors duration-200 lg:py-1 lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:block lg:after:h-0.5 lg:after:w-0 lg:after:content-[''] lg:after:rounded-full lg:after:bg-white lg:after:transition-[width] lg:after:duration-200 lg:hover:after:w-full",
                  isHome
                    ? "text-[#181A1D]/80 lg:text-white/85 lg:hover:text-white"
                    : "text-white/85 hover:text-white",
                )}
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
              className={cn(
                "inline-flex min-h-[48px] min-w-0 items-center gap-1.5 rounded-[15px] border-2 bg-transparent px-4 py-2 text-sm font-medium transition-colors md:hidden",
                isHome
                  ? "border-white/50 text-white hover:border-white hover:bg-white/10 md:border-[#E5E5E7] md:text-[#181A1D] md:hover:border-[#956EFE] md:hover:bg-transparent md:hover:text-[#956EFE]"
                  : "border-white/50 text-white hover:border-white hover:bg-white/10",
              )}
              aria-label="Student Login"
            >
              <span aria-hidden>🎓</span>
              Student Login
            </Link>
            <Link
              href="https://my.pathpicker.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden min-h-[48px] items-center gap-2 rounded-[15px] border-2 bg-transparent px-5 py-2.5 text-[15px] font-medium transition-colors md:inline-flex",
                isHome
                  ? "border-[#E5E5E7] text-[#181A1D] hover:border-[#956EFE] hover:text-[#956EFE] lg:border-white/40 lg:text-white lg:hover:border-white lg:hover:text-white"
                  : "border-white/40 text-white hover:border-white hover:text-white",
              )}
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
                  src={DRAWER_LOGO_URL}
                  alt="Pathpicker"
                  width={336}
                  height={126}
                  className="h-48 w-auto max-w-[480px] shrink-0 object-contain"
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
              <a
                href={collegeMatchQuizUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 flex w-full items-center justify-center rounded-2xl bg-[#956EFE] px-4 py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_16px_rgba(149,110,254,0.35)] transition-opacity hover:opacity-95"
                onClick={() => {
                  trackLandingCtaToQuiz();
                  setMobileMenuOpen(false);
                }}
              >
                {PATH_COLLEGE_MATCH_QUIZ_LABEL}
              </a>

              <div className="rounded-2xl bg-white py-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                {MOBILE_DRAWER_LINKS_BEFORE_CALCULATORS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between border-b border-[#F0F0F2] px-4 py-3.5 text-[15px] font-medium text-[#181A1D] transition-colors hover:bg-[#F5F3FF] hover:text-[#956EFE]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <MobileCalculatorsNav
                  pathname={pathname}
                  onNavigate={() => setMobileMenuOpen(false)}
                />
                {MOBILE_DRAWER_LINKS_AFTER_CALCULATORS.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 text-[15px] font-medium text-[#181A1D] transition-colors hover:bg-[#F5F3FF] hover:text-[#956EFE]",
                      index < MOBILE_DRAWER_LINKS_AFTER_CALCULATORS.length - 1 &&
                        "border-b border-[#F0F0F2]",
                    )}
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
