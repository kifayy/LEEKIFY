/** Config for vibe-based SEO landing pages (pre-filtered browse + rankable copy). */

export type SeoBrowseLandingFaq = {
  question: string;
  answer: string;
};

export type SeoBrowseLandingConfig = {
  /** URL segment, e.g. `dark-academia-colleges` → `/dark-academia-colleges` */
  slug: string;
  /** Browse vibe values (max 2 for vibe-mixer matching). */
  vibes: readonly [string, string];
  title: string;
  metaDescription: string;
  h1: string;
  /** 2–3 sentences above results — keyword-rich, visible to crawlers. */
  intro: readonly string[];
  whatIsTitle: string;
  whatIsParagraphs: readonly string[];
  traitsTitle: string;
  traits: readonly string[];
  quizCtaLine: string;
  faq: readonly SeoBrowseLandingFaq[];
  /** Optional hero (Pexels or CDN). */
  heroImage?: { src: string; alt: string };
};

const SEO_YEAR = new Date().getFullYear();

export const SEO_BROWSE_LANDINGS: readonly SeoBrowseLandingConfig[] = [
  {
    slug: "dark-academia-colleges",
    vibes: ["academic-weapon", "artsy-af"],
    title: `Best Dark Academia Colleges ${SEO_YEAR} | PathPicker`,
    metaDescription:
      "Find Dark Academia colleges with Gothic campuses, strong humanities, and intellectual culture. Pre-filtered Academic + Artsy schools on PathPicker.",
    h1: "Best Dark Academia Colleges",
    intro: [
      "Dark Academia schools blend old-world architecture, rigorous liberal arts, and a campus culture that celebrates books, debate, and creative expression.",
      "We matched colleges using PathPicker’s Academic and Artsy vibes so you see schools with humanities strength, arts energy, and an intellectual social scene—not just generic rankings.",
    ],
    whatIsTitle: "What is Dark Academia?",
    whatIsParagraphs: [
      "Dark Academia is an aesthetic and student vibe rooted in classic literature, philosophy, art history, and moody campus settings—think stone libraries, tweed seasons, and late-night study sessions.",
      "Students drawn to Dark Academia often want rigorous academics plus creative outlets: theater, studio art, creative writing, or music alongside traditional majors.",
      "It is less about one major and more about atmosphere—Gothic quads, museum nights, coffee-shop seminars, and friend groups who treat ideas as culture.",
    ],
    traitsTitle: "What makes a Dark Academia school?",
    traits: [
      "Gothic or historic architecture and a walkable, storybook campus core",
      "Strong humanities and liberal arts programs with active arts and culture on campus",
      "Intellectual social life—literary magazines, debate, classical music, film societies, or museum partnerships",
    ],
    quizCtaLine: "Not sure if Dark Academia is your vibe?",
    heroImage: {
      src: "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Historic university library with tall bookshelves, Dark Academia aesthetic",
    },
    faq: [
      {
        question: "What is Dark Academia in college terms?",
        answer:
          "Dark Academia describes schools and campuses where rigorous academics meet artsy, literary culture—often with historic architecture, strong humanities, and creative student life.",
      },
      {
        question: "Which vibes does PathPicker use for Dark Academia colleges?",
        answer:
          "This page pre-selects Academic and Artsy browse vibes to surface colleges that match intellectual rigor and creative campus energy.",
      },
      {
        question: "How do I find my college personality match?",
        answer:
          "Take the free PathPicker archetype quiz to see which vibes fit you beyond Dark Academia, then browse or mix filters on PathPicker.",
      },
    ],
  },
] as const;

const bySlug = new Map(SEO_BROWSE_LANDINGS.map((c) => [c.slug, c]));

export function getSeoBrowseLanding(slug: string): SeoBrowseLandingConfig | undefined {
  return bySlug.get(slug);
}

export function getAllSeoBrowseLandingSlugs(): string[] {
  return SEO_BROWSE_LANDINGS.map((c) => c.slug);
}

export function isSeoBrowseLandingSlug(slug: string): boolean {
  return bySlug.has(slug);
}
