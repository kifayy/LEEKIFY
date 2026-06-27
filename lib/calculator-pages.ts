export type CalculatorNavPage = {
  href: `/${string}`;
  label: string;
};

/** Site nav — add new calculator routes here when they ship. */
export const CALCULATOR_NAV_PAGES: readonly CalculatorNavPage[] = [
  {
    href: "/gpa-calculator",
    label: "GPA Calculator",
  },
];

export function isCalculatorNavPath(pathname: string): boolean {
  return CALCULATOR_NAV_PAGES.some(
    (page) => pathname === page.href || pathname.startsWith(`${page.href}/`),
  );
}
