import { InfoArticleFooterCta } from "@/components/info-article/info-article-footer-cta";
import { InfoArticlePage } from "@/components/info-article/info-article-page";

export const metadata = {
  title: "5 Careers a Harvard Professor Says Will Be Extinct by 2027 | PathPicker",
  description:
    "Five entry-level career paths where hiring and AI adoption are changing fast. Ranked by risk, with what students should know before they commit.",
};

const HERO_IMAGE =
  "https://storage.googleapis.com/images_592/Black%20Modern%20Music%20News%20Headline%20Instagram%20Post%20(4).png";

const PEXELS = {
  receptionist:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoF8nBvhjCnUOCCzi2DM3JqNIo0TCd41r1PA&s",
  socialMedia:
    "https://images.pexels.com/photos/4977464/pexels-photo-4977464.jpeg?auto=compress&cs=tinysrgb&w=1260",
  paralegal: "https://images.pexels.com/photos/5668777/pexels-photo-5668777.jpeg?auto=compress&cs=tinysrgb&w=1260",
  developer: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260",
  operations: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260",
} as const;

/** Ordered #5 → #1; last item is highest extinction risk. */
const CAREER_SECTIONS = [
  {
    emoji: "⚖️",
    title: "Paralegal",
    image: {
      src: PEXELS.paralegal,
      alt: "Law books and legal documents on a desk",
    },
    paragraphs: [
      "Contract review, case research, document drafting, discovery prep. AI does all four in the time it used to take a paralegal three days. Law firms are not hiring fewer paralegals because of budget cuts. They are hiring fewer because one AI tool is doing the work of eleven people and billing the client the same amount.",
      "Entry-level paralegal job postings dropped 34% in 2024 alone. The ones that exist are hybrid roles that require knowing how to operate and audit the AI, not replace it. Pre-law students who were planning to paralegal their way through applications are finding there is nowhere to land.",
      "The legal industry is not shrinking. It is just doing the same work with a fraction of the humans it used to need.",
    ],
  },
  {
    emoji: "🛎️",
    title: "Receptionist",
    image: {
      src: PEXELS.receptionist,
      alt: "Receptionist greeting a visitor at a front desk",
    },
    paragraphs: [
      "Call routing, appointment booking, visitor check-in, and FAQ answers used to be a full-time front desk job. AI phone agents, chat widgets, and self-service kiosks now handle most of it without a person at the counter.",
      "Offices that still have a reception role often fold it into office management or admin support. Standalone receptionist postings are down across healthcare, hospitality, and corporate campuses as companies standardize on automated intake.",
      "If you were counting on reception as an easy entry point into an industry, the door still exists, but it is narrower and usually expects multiple skills on day one.",
    ],
  },
  {
    emoji: "📱",
    title: "Social Media Managers",
    image: {
      src: PEXELS.socialMedia,
      alt: "Social media manager using a smartphone and laptop in an office",
    },
    paragraphs: [
      "Brands still need a feed, but AI now drafts captions, schedules posts, resizes creatives, and suggests hashtags faster than a junior hire learning the tools.",
      "Agencies and in-house teams report cutting entry-level social roles while keeping strategists and client leads. What remains is judgment: brand voice, crisis calls, and knowing what not to publish.",
      "If your plan was to grow from posting content into strategy, the first rung is already automated. You need analytics, paid social, or creative direction to get hired now.",
    ],
  },
  {
    emoji: "🗂️",
    title: "Data Entry and Operations Coordinator",
    image: {
      src: PEXELS.operations,
      alt: "Office worker at a desk with keyboard and paperwork",
    },
    paragraphs: [
      "This one was already half gone before AI got good. Automation has been chipping away at data entry roles since 2018. What AI did was finish the job.",
      "83% of mid-size companies have already fully automated their data entry operations. The remaining 17% are in the process. The operations coordinator roles that still exist are project management adjacent, require vendor relationships, and involve human judgment calls that software can't make yet.",
      "The students who took business degrees planning to start in operations and work their way into management are finding the starting point has been deleted.",
    ],
  },
  {
    emoji: "🎮",
    title: "Videogame Developer",
    image: {
      src: PEXELS.developer,
      alt: "Junior game developer working at a computer in a studio",
    },
    paragraphs: [
      "This one is the cruelest because everyone said learn to code and break into games. Parents said it. Guidance counselors said it. Every career quiz spat out developer as a safe bet. Industry trackers logged more than 14,800 game layoffs worldwide in 2024, above the 10,500 cut in 2023 and the 8,500 in 2022.",
      "AI is not the only reason, but it is speeding up the squeeze. Unity's 2024 gaming report found 62% of developers already using AI in production. GDC's State of the Industry survey put 49% of respondents at studios using generative AI. Copilot, Cursor, and engine plugins now ship scripting, placeholder assets, and debugging faster than a junior hire eight months out of school.",
      "What is left is systems thinking, networking, live ops, and knowing why you are building a feature, not just implementing it. Entry-level game programming postings are down while senior and specialist roles absorb the work. If you want in, you need a portfolio and a niche from day one, because the junior rung is narrowing fast.",
    ],
  },
] as const;

export default function ExtinctDegreesPage() {
  return (
    <InfoArticlePage
      eyebrow="PathPicker Student News"
      title="The 5 Careers a Harvard Professor Says Will Be Extinct by 2027"
      subtitle="Hiring data and automation reports keep pointing to the same pattern: the entry-level version of a job is what disappears first, not the whole field."
      lead={[
        "We reviewed job posting trends, what career centers are reporting, and where companies are already using AI for repeatable work. Five paths show up again and again.",
        "That does not mean these industries are over. It means the first rung on the ladder is getting removed or rewritten before you can step on it.",
      ]}
      heroImage={{
        src: HERO_IMAGE,
        alt: "Harvard professor announcing careers that may be extinct by 2027, PathPicker student news graphic",
        placement: "cover",
        aspect: "portrait",
      }}
      sectionNumbering="countdown"
      sections={[...CAREER_SECTIONS]}
      footerCta={
        <InfoArticleFooterCta
          eyebrow="Thanks for 10k+ subs!"
          headline="Students are preparing for a world that no longer exists."
          body="We're building the largest student newsletter because every student deserves career news while it still matters."
        />
      }
    />
  );
}
