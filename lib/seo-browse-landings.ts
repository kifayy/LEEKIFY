/** Config for vibe-based SEO landing pages (pre-filtered browse + rankable copy). */

export type SeoBrowseLandingFaq = {
  question: string;
  answer: string;
};

export type SeoBrowseLandingConfig = {
  slug: string;
  footerLabel: string;
  vibes: readonly [string, string];
  vibeLabels: readonly [string, string];
  title: string;
  metaDescription: string;
  h1: string;
  intro: readonly string[];
  whatIsTitle: string;
  whatIsParagraphs: readonly string[];
  traitsTitle: string;
  traits: readonly string[];
  quizCtaLine: string;
  faq: readonly SeoBrowseLandingFaq[];
  heroImage?: { src: string; alt: string };
};

const SEO_YEAR = new Date().getFullYear();

type LandingSeed = {
  slug: string;
  footerLabel: string;
  keyword: string;
  vibes: readonly [string, string];
  vibeLabels: readonly [string, string];
  metaHook: string;
  introExtra: string;
  whatIs: readonly string[];
  traits: readonly [string, string, string];
};

function buildLanding(seed: LandingSeed): SeoBrowseLandingConfig {
  const { keyword, vibeLabels, vibes } = seed;
  const [v0, v1] = vibeLabels;

  return {
    slug: seed.slug,
    footerLabel: seed.footerLabel,
    vibes,
    vibeLabels,
    title: `Best ${keyword} Colleges ${SEO_YEAR} | PathPicker`,
    metaDescription: `Find ${keyword.toLowerCase()} colleges ${seed.metaHook}. Browse ${v0} + ${v1} school matches on PathPicker.`,
    h1: `Best ${keyword} Colleges`,
    intro: [
      `${keyword} campuses match a specific student vibe—${seed.introExtra}`,
      `PathPicker pre-selects our ${v0} and ${v1} browse vibes so you see schools that fit the culture, not just the brochure.`,
    ],
    whatIsTitle: `What is ${keyword}?`,
    whatIsParagraphs: seed.whatIs,
    traitsTitle: `What makes a ${keyword} school?`,
    traits: seed.traits,
    quizCtaLine: `Not sure if ${keyword} is your vibe?`,
    faq: [
      {
        question: `What are ${keyword} colleges?`,
        answer: `${keyword} colleges are schools whose campus culture, location, and student life align with the ${keyword.toLowerCase()} aesthetic and social vibe—not just a single major or ranking tier.`,
      },
      {
        question: `Which PathPicker vibes power this page?`,
        answer: `This page loads with ${v0} and ${v1} filters active to surface colleges that match ${keyword.toLowerCase()} energy from our browse directory.`,
      },
      {
        question: "How do I find my best college personality match?",
        answer:
          "Take the free PathPicker archetype quiz to discover your vibes, then browse schools or mix filters to compare fit, happiness signals, and admission odds.",
      },
    ],
  };
}

const LANDING_SEEDS: readonly LandingSeed[] = [
  {
    slug: "dark-academia-colleges",
    footerLabel: "Dark Academia Schools",
    keyword: "Dark Academia",
    vibes: ["academic-weapon", "artsy-af"],
    vibeLabels: ["Academic", "Artsy"],
    metaHook: "with Gothic campuses, humanities strength, and intellectual culture",
    introExtra:
      "think historic libraries, rigorous liberal arts, and creative students who treat ideas as lifestyle.",
    whatIs: [
      "Dark Academia is an aesthetic rooted in classic literature, philosophy, art history, and moody campus settings—stone quads, tweed seasons, and late-night seminars.",
      "Students here often want rigorous academics plus theater, studio art, creative writing, or music alongside traditional majors.",
      "It is about atmosphere as much as major choice: museum nights, literary magazines, and friend groups who debate for fun.",
    ],
    traits: [
      "Gothic or historic architecture and a walkable, storybook campus core",
      "Strong humanities and liberal arts with active arts and culture",
      "Intellectual social life—debate, film societies, classical music, or museum partnerships",
    ],
  },
  {
    slug: "cottagecore-colleges",
    footerLabel: "Cottagecore Schools",
    keyword: "Cottagecore",
    vibes: ["nature-lover", "artsy-af"],
    vibeLabels: ["Nature", "Artsy"],
    metaHook: "with cozy campuses, green quads, and creative small-town energy",
    introExtra:
      "think pastoral settings, handmade culture, farmers markets, and campuses that feel like a storybook village.",
    whatIs: [
      "Cottagecore on campus means soft aesthetics, nature nearby, and a slower, intentional social rhythm—less hustle culture, more community gardens and craft fairs.",
      "Students often gravitate to environmental studies, design, literature, or studio arts in settings that feel human-scale.",
      "The vibe is wholesome and grounded: study nooks, seasonal traditions, and schools where the outdoors is part of daily life.",
    ],
    traits: [
      "Green, walkable campuses with gardens, trails, or rural charm close by",
      "Active arts, sustainability, or liberal arts communities with a cozy social scene",
      "Smaller-town or suburban settings that feel peaceful, not overwhelming",
    ],
  },
  {
    slug: "preppy-colleges",
    footerLabel: "Preppy Schools",
    keyword: "Preppy",
    vibes: ["academic-weapon", "entrepreneurial"],
    vibeLabels: ["Academic", "Business"],
    metaHook: "with polished campus culture, strong networks, and career-minded students",
    introExtra:
      "think crisp campus style, competitive clubs, internships on tap, and a social scene that rewards ambition.",
    whatIs: [
      "Preppy college culture blends achievement, presentation, and tradition—students who care about grades, leadership roles, and where they are headed after graduation.",
      "Campuses often feature business societies, finance clubs, consulting pipelines, and a social calendar that feels organized and upscale.",
      "It is not just about clothing aesthetics; it is a mindset of preparation, networking, and high expectations.",
    ],
    traits: [
      "Strong business, economics, or pre-professional pathways with active recruiting",
      "Campus traditions, club culture, and alumni networks students actually use",
      "A social scene that mixes academics with leadership, internships, and career events",
    ],
  },
  {
    slug: "old-money-colleges",
    footerLabel: "Old Money Schools",
    keyword: "Old Money",
    vibes: ["academic-weapon", "entrepreneurial"],
    vibeLabels: ["Academic", "Business"],
    metaHook: "with legacy campuses, selective culture, and established alumni networks",
    introExtra:
      "think historic institutions, discreet wealth, long traditions, and students who arrive with generational college literacy.",
    whatIs: [
      "Old Money schools are often selective universities with deep traditions, influential alumni, and campus cultures where pedigree and polish matter socially.",
      "Students may pursue law, finance, policy, or liberal arts pathways with an expectation of graduate school or elite early careers.",
      "The vibe is understated prestige—rowing clubs, secret societies, legacy events, and networks that open doors quietly.",
    ],
    traits: [
      "Selective admission, historic campuses, and long-standing institutional prestige",
      "Powerful alumni networks across finance, law, policy, and leadership tracks",
      "Tradition-heavy student life—clubs, ceremonies, and social circles with deep roots",
    ],
  },
  {
    slug: "party-colleges",
    footerLabel: "Party Schools",
    keyword: "Party",
    vibes: ["party-animal", "flirty"],
    vibeLabels: ["Social", "Flirty"],
    metaHook: "known for big weekends, Greek life energy, and a social-first campus scene",
    introExtra:
      "think game days, packed bars near campus, themed parties, and schools where the social calendar is the main event.",
    whatIs: [
      "Party schools are colleges where social life dominates the brand—large undergraduate populations, athletics, Greek life, and a reputation for weekends that do not quit.",
      "Students choosing this vibe want energy, crowds, and a campus where making friends fast is the default experience.",
      "Fit still matters academically, but culture skews outgoing, spontaneous, and celebration-forward.",
    ],
    traits: [
      "Large social scene with athletics, Greek life, or festival-style campus events",
      "Nightlife and off-campus social hubs students actually use every week",
      "Outgoing student body where clubs, tailgates, and parties shape the experience",
    ],
  },
  {
    slug: "greek-life-colleges",
    footerLabel: "Greek Life Schools",
    keyword: "Greek Life",
    vibes: ["party-animal", "sports-enthusiast"],
    vibeLabels: ["Social", "Sports"],
    metaHook: "where fraternities and sororities shape social life, philanthropy, and traditions",
    introExtra:
      "think chapter houses, formal season, philanthropy weeks, and friend groups built through rush.",
    whatIs: [
      "Greek Life schools are campuses where fraternities and sororities are central to social structure—not a side club, but the main way students find community.",
      "Rush, mixers, formals, and intramural leagues create a predictable social calendar alongside academics.",
      "Students who want Greek Life care about belonging, traditions, and networks that last beyond graduation.",
    ],
    traits: [
      "High fraternity and sorority participation with visible campus presence",
      "Social calendar built around rush, formals, philanthropy, and chapter events",
      "Strong tie between athletics, tailgates, and Greek social life",
    ],
  },
  {
    slug: "frat-colleges",
    footerLabel: "Frat Schools",
    keyword: "Frat",
    vibes: ["party-animal", "sports-enthusiast"],
    vibeLabels: ["Social", "Sports"],
    metaHook: "with strong fraternity culture, athletics, and brotherhood-driven social life",
    introExtra:
      "think chapter houses, tailgates, intramurals, and campuses where guys build community through fraternities.",
    whatIs: [
      "Frat-heavy campuses center male social life around fraternity chapters—rush, pledging traditions, house events, and alumni networks that stay active.",
      "Sports, especially football or basketball culture, often amplifies the weekend rhythm alongside chapter events.",
      "Students seeking this vibe want brotherhood, tradition, and a loud, loyal social scene.",
    ],
    traits: [
      "Large fraternity system with chapter housing or dedicated social spaces",
      "Game-day culture and intramural sports tied to chapter identity",
      "Weekend social life organized around house parties, formals, and philanthropy",
    ],
  },
  {
    slug: "sorority-colleges",
    footerLabel: "Sorority Schools",
    keyword: "Sorority",
    vibes: ["party-animal", "flirty"],
    vibeLabels: ["Social", "Flirty"],
    metaHook: "with active sorority chapters, formals, and philanthropy-driven sisterhood",
    introExtra:
      "think rush season, chapter pride, social calendars packed with mixers, and tight friend groups built in sororities.",
    whatIs: [
      "Sorority-forward schools are campuses where women’s social life often runs through Panhellenic chapters—recruitment, sisterhood events, and campus leadership pipelines.",
      "Formals, philanthropy, and curated social events create structure alongside classes and internships.",
      "Students want community, presentation, and networks that blend social and professional capital.",
    ],
    traits: [
      "Strong Panhellenic participation with competitive or popular rush cycles",
      "Philanthropy, formals, and chapter leadership woven into campus culture",
      "Social scene where sororities partner with fraternities, athletics, and campus events",
    ],
  },
  {
    slug: "aesthetic-colleges",
    footerLabel: "Aesthetic Schools",
    keyword: "Aesthetic",
    vibes: ["artsy-af", "creative-soul"],
    vibeLabels: ["Artsy", "Creative"],
    metaHook: "for visually driven campuses, design culture, and creative student life",
    introExtra:
      "think Instagrammable quads, fashion-forward students, studio culture, and schools where look and vibe matter.",
    whatIs: [
      "Aesthetic campuses prioritize visual culture—architecture, murals, coffee shops, thrift markets, and students who express identity through style and media.",
      "Creative majors and clubs thrive here: design, film, photography, music, and performance bleed into everyday social life.",
      "Students want a campus that feels like a backdrop and a community—beautiful settings plus people who care how things look and feel.",
    ],
    traits: [
      "Distinctive architecture, arts districts, or campuses students photograph constantly",
      "Active creative majors, clubs, and pop-up culture (markets, shows, zines)",
      "Social life blending fashion, media, music, and visual arts—not just classroom work",
    ],
  },
  {
    slug: "outdoorsy-colleges",
    footerLabel: "Outdoorsy Schools",
    keyword: "Outdoorsy",
    vibes: ["nature-lover", "sports-enthusiast"],
    vibeLabels: ["Nature", "Sports"],
    metaHook: "near trails, rivers, or mountains with adventure-driven student life",
    introExtra:
      "think hiking clubs, ski weekends, climbing gyms, and students who pick schools for access to the outdoors.",
    whatIs: [
      "Outdoorsy colleges sit close to nature—national forests, lakes, ski towns, or coastlines where weekend plans mean trails, not just bars.",
      "Students study environmental science, kinesiology, or liberal arts but organize life around adventure sports and conservation culture.",
      "Campus social life includes outdoor clubs, expeditions, and a health-forward, active rhythm.",
    ],
    traits: [
      "Proximity to hiking, skiing, climbing, water sports, or national parks",
      "Outdoor recreation clubs, gear culture, and expedition-style student trips",
      "Active, wellness-oriented social scene beyond traditional party culture",
    ],
  },
  {
    slug: "beach-colleges",
    footerLabel: "Beach Schools",
    keyword: "Beach",
    vibes: ["nature-lover", "party-animal"],
    vibeLabels: ["Nature", "Social"],
    metaHook: "on or near the coast with sun, sand, and a laid-back social scene",
    introExtra:
      "think ocean breezes, volleyball on the quad, surf clubs, and campuses where weather is part of the brand.",
    whatIs: [
      "Beach colleges are coastal or near-coastal schools where students build life around sun, water, and outdoor socializing.",
      "Marine science, hospitality, business, and liberal arts all show up—but lifestyle skews relaxed, athletic, and social.",
      "Weekends mean sand, boards, bonfires, and a climate that keeps morale high through the semester.",
    ],
    traits: [
      "Coastal location with beach access students use year-round",
      "Water sports, surf, or outdoor social clubs central to student life",
      "Laid-back, sunny campus culture with athletics and social events outdoors",
    ],
  },
  {
    slug: "sporty-colleges",
    footerLabel: "Sporty Schools",
    keyword: "Sporty",
    vibes: ["sports-enthusiast", "party-animal"],
    vibeLabels: ["Sports", "Social"],
    metaHook: "where athletics, school spirit, and game-day culture define campus life",
    introExtra:
      "think packed stadiums, varsity pride, intramurals, and students who plan their week around games.",
    whatIs: [
      "Sporty campuses put athletics at the center—Division I energy, loud student sections, and a social calendar built around wins and rivalries.",
      "Even non-athletes join the culture through intramurals, fitness centers, and tailgates that double as main events.",
      "Students want spirit, competition, and a community that shows up in team colors.",
    ],
    traits: [
      "Strong varsity programs or dominant intramural and club sports culture",
      "Game-day traditions, tailgates, and student sections that fill stadiums",
      "Fitness-forward campus with rec centers, spirit weeks, and athletic social identity",
    ],
  },
];

export const SEO_BROWSE_LANDINGS: readonly SeoBrowseLandingConfig[] =
  LANDING_SEEDS.map(buildLanding);

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

/** Footer links — label matches marketing names, href is SEO landing slug. */
export const SEO_BROWSE_LANDING_FOOTER_LINKS = SEO_BROWSE_LANDINGS.map((c) => ({
  href: `/${c.slug}`,
  label: c.footerLabel,
}));
