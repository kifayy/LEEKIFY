import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { CollegeMatchQuizLink } from "@/components/college-match-quiz-link";
import { CopyrightYear } from "@/components/copyright-year";
import { FooterNavLink } from "@/components/footer-nav-link";
import { PATH_COLLEGE_MATCH_QUIZ_LABEL } from "@/components/home/path-quiz-cta";
import { isCollegeMatchQuizUrl } from "@/lib/attribution";
import { PATHPICKER_FOOTER_LOGO_URL } from "@/lib/brand-logos";
import { COLLEGE_MATCH_QUIZ_URL, PATHPICKER_SITE_PURPLE } from "@/lib/constants";
import { SEO_BROWSE_LANDING_FOOTER_LINKS } from "@/lib/seo-browse-landings";

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
      { href: "/terms", label: "Terms" },
      { href: "/terms#refund-policy", label: "Refund Policy" },
      { href: "/contact", label: "For Partners" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: COLLEGE_MATCH_QUIZ_URL, label: PATH_COLLEGE_MATCH_QUIZ_LABEL },
      { href: "/browse-schools", label: "School Comparison Tool" },
      { href: COLLEGE_MATCH_QUIZ_URL, label: "Admissions Odds Tool" },
      { href: "/#deep-profile-rankings", label: "Features" },
      { href: "/#commit-with-zero-regrets", label: "How it Works" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact" },
      {
        href: "https://my.pathpicker.com/manage-billing",
        label: "Manage Subscription",
        external: true,
      },
    ],
  },
];

const EXPLORE_SCHOOLS_COLUMN_1 = SEO_BROWSE_LANDING_FOOTER_LINKS.slice(0, 6);
const EXPLORE_SCHOOLS_COLUMN_2 = SEO_BROWSE_LANDING_FOOTER_LINKS.slice(6);

const FOOTER_BG = PATHPICKER_SITE_PURPLE;
const FOOTER_DARK = "#FFFFFF";
const FOOTER_MUTED = "rgba(255, 255, 255, 0.85)";

const linkClassName = "text-sm transition-opacity hover:opacity-80";

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (isCollegeMatchQuizUrl(link.href)) {
    return (
      <CollegeMatchQuizLink className={linkClassName} style={{ color: FOOTER_DARK }}>
        {link.label}
      </CollegeMatchQuizLink>
    );
  }

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
                alt="Pathpicker"
                width={336}
                height={126}
                className="h-[7.5rem] w-auto object-contain md:h-36"
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: FOOTER_MUTED }}>
              University matching was broken, we fixed it.
            </p>
          </div>

          <div className="grid w-full max-w-[880px] grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
            {FOOTER_COLUMNS.map((column) => (
              <FooterColumn key={column.title} title={column.title} links={column.links} />
            ))}

            <div className="col-span-2 flex min-w-0 flex-col gap-4 sm:col-span-3 lg:col-span-1">
              <h3 className="text-sm font-bold" style={{ color: FOOTER_DARK }}>
                Explore Schools
              </h3>
              <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 min-[420px]:grid-cols-2">
                <ul className="flex flex-col gap-2.5">
                  {EXPLORE_SCHOOLS_COLUMN_1.map((link) => (
                    <li key={link.href}>
                      <FooterNavLink
                        href={link.href}
                        className={linkClassName}
                        style={{ color: FOOTER_DARK }}
                      >
                        {link.label}
                      </FooterNavLink>
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-col gap-2.5">
                  {EXPLORE_SCHOOLS_COLUMN_2.map((link) => (
                    <li key={link.href}>
                      <FooterNavLink
                        href={link.href}
                        className={linkClassName}
                        style={{ color: FOOTER_DARK }}
                      >
                        {link.label}
                      </FooterNavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <Link href="/" className="flex w-fit items-center active:opacity-80">
              <Image
                src={LOGO_URL}
                alt="Pathpicker"
                width={390}
                height={72}
                className="h-[4.5rem] w-auto object-contain"
              />
            </Link>
            <p className="text-sm" style={{ color: FOOTER_MUTED }}>
              © <Suspense fallback={2025}><CopyrightYear /></Suspense> Pathpicker. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="https://my.pathpicker.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 min-w-[137px] items-center justify-center gap-2 rounded-xl border-2 bg-white px-6 text-sm font-semibold text-[#181A1D] shadow-[3px_3px_0_0_rgba(15,23,42,0.85)] transition hover:opacity-90"
              style={{ borderColor: FOOTER_DARK }}
            >
              🎓 Student Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
