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

    eyebrow: "WHAT REALLY MATTERS",

    title: "College Matching Was Broken, We Fixed It",

    description:

      "Go beyond GPA and acceptance odds alone. We filter 2,000+ universities through 400+ intelligence signals, mapped to your personality, cognitive style, and where you'd actually thrive at.",

    imageSrc: "/images/screen2.webp",

    imageAlt: "PathPicker peer fit intelligence comparing student archetype to campus culture",

    imageWidth: 540,

    imageHeight: 1080,

  },

  {

    id: "ranking",

    eyebrow: "SEE YOUR STUDENT STATS",

    title: "See Where Students Like You Thrive",

    description:

      "Every campus has students who love it, and students who don't. See how you rank versus the average student in key indicators.",

    imageSrc: "/images/screen1.webp",

    imageAlt: "PathPicker student intelligence mapping for personality and college fit",

    imageWidth: 540,

    imageHeight: 1080,

  },

  {

    id: "location",

    eyebrow: "YOUR DREAM LOCATION",

    title: "What Location You'd Thrive In",

    description:

      "Location, location, location. We'll tell you exactly what part of the country you belong at to actually be your best.",

    imageSrc: "/images/screen3.png",

    imageAlt: "PathPicker predictive location, happiness, and admissions insights",

    imageWidth: 2160,

    imageHeight: 1500,

  },

];

