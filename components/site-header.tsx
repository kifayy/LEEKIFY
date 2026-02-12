"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOGO_URL = "https://storage.googleapis.com/images_592/s2as.png";

const navLinks = [
  { href: "/student-archetype-quiz", label: "Archetype Quiz" },
  { href: "/scholarship-quiz", label: "Scholarship Quiz" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/newsletter", label: "Newsletter" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white lg:border-b lg:border-[#E5E5E7] lg:bg-[#FAFAFB] lg:shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="container mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 md:h-28 md:gap-6 md:px-6 lg:px-8">
        {/* Logo + mobile menu */}
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/" className="flex items-center active:opacity-80">
            <Image
              src={LOGO_URL}
              alt="Pathpicker"
              width={300}
              height={90}
              className="h-14 w-auto object-contain md:h-[5.5rem]"
              unoptimized
            />
          </Link>

          {/* Mobile dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center nav links - desktop only */}
        <nav
          className="hidden flex-1 items-center justify-center gap-10 lg:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[15px] font-medium text-[#181A1D]/80 transition-colors duration-200 lg:py-1 lg:hover:text-[#956EFE] lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:block lg:after:h-0.5 lg:after:w-0 lg:after:content-[''] lg:after:rounded-full lg:after:bg-[#956EFE] lg:after:transition-[width] lg:after:duration-200 lg:hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Try Awarded button - desktop polish */}
        <div className="flex shrink-0 items-center md:ml-6">
          <Link
            href="/student-archetype-quiz"
            className="flex h-11 min-w-[120px] items-center justify-center rounded-full bg-[#956EFE] px-4 text-sm font-bold text-[#EEE] shadow-[0_3px_7px_rgba(149,110,254,0.2)] transition-all duration-200 hover:opacity-95 md:h-12 md:min-w-[140px] md:px-6 lg:shadow-[0_4px_12px_rgba(149,110,254,0.25)] lg:hover:-translate-y-0.5 lg:hover:shadow-[0_6px_16px_rgba(149,110,254,0.3)]"
          >
            Try Awarded
          </Link>
        </div>
      </div>
    </header>
  );
}
