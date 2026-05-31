/** Campus vibe pills — order controls first row on wrap (Busuu-style grid). */

export type HomeCollegeVibePick = {
  id: string;
  label: string;
  imageSrc: string;
};

export const HOME_COLLEGE_VIBE_PICKS: HomeCollegeVibePick[] = [
  {
    id: "fall-in-love",
    label: "Fall in Love",
    imageSrc: "/assets/love.png",
  },
  {
    id: "party-hard",
    label: "Party Hard",
    imageSrc: "/assets/party.png",
  },
  {
    id: "rush-greek",
    label: "Rush Greek",
    imageSrc: "/assets/greek.png",
  },
  {
    id: "be-happy",
    label: "Be Happy",
    imageSrc: "/assets/happy.png",
  },
  {
    id: "feel-at-home",
    label: "Feel at Home",
    imageSrc: "/assets/house%201.png",
  },
  {
    id: "be-less-stressed",
    label: "Be Less Stressed",
    imageSrc: "/assets/nostress.png",
  },
  {
    id: "study-abroad",
    label: "Study Abroad",
    imageSrc: "/assets/travel%201.png",
  },
];

export const HOME_COLLEGE_VIBE_SECTION_TITLE =
  "Find colleges where you're most likely to...";

/** Desktop grid omits Study Abroad (6 pills). */
export const HOME_COLLEGE_VIBE_PICKS_DESKTOP = HOME_COLLEGE_VIBE_PICKS.filter(
  (pick) => pick.id !== "study-abroad",
);
