import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { CopyrightYear } from "@/components/copyright-year";
import { FooterNavLink } from "@/components/footer-nav-link";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { PATHPICKER_FOOTER_LOGO_URL } from "@/lib/brand-logos";
import { MANAGE_BILLING_URL, PATHPICKER_SITE_PURPLE } from "@/lib/constants";

const LOGO_URL = PATHPICKER_FOOTER_LOGO_URL;

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/privacy", label: "Privacy" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/terms", label: "Terms" },
      { href: "/terms#refund-policy", label: "Refund Policy" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/#search", label: "Check for leaks" },
      { href: "/#breaches", label: "Breaches" },
      { href: "/#how-it-works", label: "How it Works" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact" },
      { href: MANAGE_BILLING_URL, label: "Manage Subscription" },
    ],
  },
];

const FOOTER_BG = PATHPICKER_SITE_PURPLE;
const FOOTER_DARK = "#FFFFFF";
const FOOTER_MUTED = "rgba(255, 255, 255, 0.85)";

const linkClassName = "text-sm transition-opacity hover:opacity-80";

function FooterLinkItem({ link }: { link: FooterLink }) {
  return (
    <FooterNavLink
      href={link.href}
      external={link.external}
      className={linkClassName}
      style={{ color: FOOTER_DARK }}
    >
      {link.label}
    </FooterNavLink>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="flex min-w-[140px] flex-col gap-4">
      <h3 className="text-sm font-bold" style={{ color: FOOTER_DARK }}>
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <FooterLinkItem link={link} />
          </li>
        ))}
        {title === "Company" ? (
          <li>
            <CookieSettingsLink className={linkClassName} style={{ color: FOOTER_DARK }} />
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      className="w-full -mt-px md:-mt-1"
      style={{ backgroundColor: FOOTER_BG, color: FOOTER_DARK }}
    >
      <div className="mx-auto flex max-w-[1290px] flex-col px-4 py-16 md:px-[75px] md:gap-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="flex max-w-[295px] shrink-0 flex-col gap-6">
            <Link href="/" className="flex w-fit items-center active:opacity-80">
              <Image
                src={LOGO_URL}
                alt="Leekify"
                width={1000}
                height={500}
                className="h-[7.5rem] w-auto object-contain md:h-36"
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: FOOTER_MUTED }}>
              See if your data was leaked — then monitor, alert, and act.
            </p>
          </div>

          <div className="grid w-full max-w-[720px] grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-10">
            {FOOTER_COLUMNS.map((column) => (
              <FooterColumn key={column.title} title={column.title} links={column.links} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <Link href="/" className="flex w-fit items-center active:opacity-80">
              <Image
                src={LOGO_URL}
                alt="Leekify"
                width={1000}
                height={500}
                className="h-[4.5rem] w-auto object-contain"
              />
            </Link>
            <p className="text-sm" style={{ color: FOOTER_MUTED }}>
              © <Suspense fallback={2025}><CopyrightYear /></Suspense> Leekify. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#search"
              className="inline-flex h-11 min-w-[137px] items-center justify-center gap-2 rounded-xl border-2 bg-white px-6 text-sm font-semibold text-[#181A1D] shadow-[3px_3px_0_0_rgba(15,23,42,0.85)] transition hover:opacity-90"
              style={{ borderColor: FOOTER_DARK }}
            >
              Check for leaks
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
