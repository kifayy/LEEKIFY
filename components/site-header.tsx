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
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="container mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 md:h-28 md:gap-6 md:px-6">
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
          className="hidden flex-1 items-center justify-center gap-8 lg:flex"
          aria-label="Main"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-normal transition-colors hover:opacity-90 ${
                i === 0
                  ? "text-[#222628]"
                  : "text-[#181A1D]/75 hover:text-[#181A1D]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Try Awarded button */}
        <div className="flex shrink-0 items-center md:ml-6">
          <Link
            href="/student-archetype-quiz"
            className="flex h-11 min-w-[120px] items-center justify-center rounded-full bg-[#956EFE] px-4 text-sm font-bold text-[#EEE] shadow-[0_3px_7px_rgba(149,110,254,0.2)] transition-opacity hover:opacity-95 md:h-12 md:min-w-[140px] md:px-6"
          >
            Try Awarded
          </Link>
        </div>
      </div>
    </header>
  );
}
