/** Busuu-style “how it works” feature rows on the homepage. */



export type HomeHowItWorksFeature = {

  id: string;

  eyebrow: string;

  title: string;

  description: string;

  imageSrc: string;

  imageAlt: string;

  imageWidth: number;

  imageHeight: number;

};



export const HOME_HOW_IT_WORKS_FEATURES: HomeHowItWorksFeature[] = [

  {

    id: "personality",

    eyebrow: "DEEP DATA MAPPING",

    title: "Personality Matters",

    description:

      "Go beyond GPA and acceptance odds alone. We filter 2,000+ universities through 400+ variables, mapped to your personality, cognitive style, and how you actually learn and socialize.",

    imageSrc: "/assets/Group%20784.png",

    imageAlt: "PathPicker deep data mapping for personality and college fit",

    imageWidth: 2786,

    imageHeight: 2393,

  },

  {

    id: "ranking",

    eyebrow: "20+ YEARS OF RESEARCH",

    title: "Ranking You vs. Other Students",

    description:

      "See how you stack up against students at schools you're considering, grounded in two decades of verified outcomes, not just this year's marketing. Real wins and regrets from thousands of students shape your match.",

    imageSrc: "/assets/Group%20797.png",

    imageAlt: "PathPicker student ranking backed by historical campus data",

    imageWidth: 3121,

    imageHeight: 2745,

  },

  {

    id: "location",

    eyebrow: "PREDICTIVE FIT & ROI",

    title: "What Location You'd Thrive In",

    description:

      "Across 19,000+ cities, we surface where you'll actually enjoy living, plus live admission odds, campus happiness scores, and career outlooks so your choice holds up after graduation.",

    imageSrc: "/assets/Group%20798.png",

    imageAlt: "PathPicker predictive location, happiness, and admissions insights",

    imageWidth: 2223,

    imageHeight: 1284,

  },

];

