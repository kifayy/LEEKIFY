"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PATHPICKER_SITE_PURPLE } from "@/lib/constants";
import { PATHPICKER_ASSETS_LOGO_URL } from "@/lib/brand-logos";
import { cn } from "@/lib/utils";

const SITE_LOGO_URL = PATHPICKER_ASSETS_LOGO_URL;

const navLinks = [
  { href: "/#breaches", label: "Breaches" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Support" },
];

const SCROLL_HIDE_THRESHOLD = 0.1;

export function SiteHeader() {
  const pathname = usePathname();
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
          isHome ? "max-md:bg-transparent md:bg-[#4E2FFF]" : "bg-[#956EFE]",
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
                src={SITE_LOGO_URL}
                alt="Leekify"
                width={1000}
                height={500}
                className="h-20 w-auto max-w-[min(90vw,320px)] object-contain object-left sm:h-24 md:h-28 md:max-w-[380px] lg:h-32 lg:max-w-[440px]"
                priority
              />
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="h-12 min-h-[48px] min-w-[48px] w-12 text-white hover:bg-white/10 hover:text-white lg:hidden lg:h-10 lg:min-h-0 lg:min-w-0 lg:w-10"
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
                href={link.href}
                className="relative shrink-0 whitespace-nowrap text-[15px] font-medium text-white/85 transition-colors duration-200 hover:text-white lg:py-1 lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:block lg:after:h-0.5 lg:after:w-0 lg:after:content-[''] lg:after:rounded-full lg:after:bg-white lg:after:transition-[width] lg:after:duration-200 lg:hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center md:ml-6">
            <Link
              href="/#search"
              className="inline-flex min-h-[48px] min-w-0 items-center gap-1.5 rounded-[15px] border-2 border-white/50 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 md:hidden"
              aria-label="Check for leaks"
            >
              Check for leaks
            </Link>
            <Link
              href="/#search"
              className="hidden min-h-[48px] items-center gap-2 rounded-[15px] border-2 border-white/40 bg-transparent px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:border-white hover:text-white md:inline-flex"
              aria-label="Check for leaks"
            >
              Check for leaks
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
                  src={SITE_LOGO_URL}
                  alt="Leekify"
                  width={1000}
                  height={500}
                  className="h-24 w-auto max-w-[280px] shrink-0 object-contain"
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
              <Link
                href="/#search"
                className="mb-3 flex w-full items-center justify-center rounded-2xl bg-[#956EFE] px-4 py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_16px_rgba(149,110,254,0.35)] transition-opacity hover:opacity-95"
                onClick={() => setMobileMenuOpen(false)}
              >
                Check for leaks
              </Link>

              <div className="rounded-2xl bg-white py-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 text-[15px] font-medium text-[#181A1D] transition-colors hover:bg-[#F5F3FF] hover:text-[#956EFE]",
                      index < navLinks.length - 1 && "border-b border-[#F0F0F2]",
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
                href="/pricing"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E5E5E7] bg-white py-4 text-base font-medium text-[#181A1D] shadow-sm transition-opacity hover:opacity-90"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="View pricing"
              >
                View pricing
                <ArrowRight className="h-5 w-5 shrink-0" strokeWidth={2.5} />
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
