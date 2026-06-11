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

    eyebrow: "STUDENT INTELLIGENCE",

    title: "College Matching Was Broken, We Fixed It",

    description:

      "Go beyond GPA and acceptance odds alone. We filter 2,000+ universities through 400+ intelligence signals, mapped to your personality, cognitive style, and how you actually learn and socialize.",

    imageSrc: "/assets/Group%20784.png",

    imageAlt: "PathPicker student intelligence mapping for personality and college fit",

    imageWidth: 2786,

    imageHeight: 2393,

  },

  {

    id: "ranking",

    eyebrow: "PEER FIT INTELLIGENCE",

    title: "See Where Students Like You Thrive",

    description:

      "Every campus has students who love it — and students who don't. PathPicker compares your archetype to real campus culture, so you know where you'll belong before you commit.",

    imageSrc: "/images/Group%20800.png",

    imageAlt: "PathPicker peer fit intelligence comparing student archetype to campus culture",

    imageWidth: 2574,

    imageHeight: 2949,

  },

  {

    id: "location",

    eyebrow: "PREDICTIVE FIT & ROI",

    title: "What Location You'd Thrive In",

    description:

      "Across 19,000+ cities, we surface where you'll actually enjoy living, plus live admission odds, campus happiness scores, and career outlooks so your choice holds up after graduation.",

    imageSrc: "/assets/asdasdroup%20799.png",

    imageAlt: "PathPicker predictive location, happiness, and admissions insights",

    imageWidth: 2152,

    imageHeight: 1189,

  },

];

