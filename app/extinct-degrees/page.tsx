import { InfoArticleFooterCta } from "@/components/info-article/info-article-footer-cta";
import { InfoArticlePage } from "@/components/info-article/info-article-page";
import type { InfoArticleSection } from "@/components/info-article/info-article-page";

export const metadata = {
  title: "10 Degrees Facing the Highest Automation Risk by 2028 | PathPicker",
  description:
    "Ten college degrees ranked by automation risk score, from data entry to travel management. What students should know before they commit to a major.",
};

const HERO_IMAGE =
  "https://storage.googleapis.com/images_592/Black%20Modern%20Music%20News%20Headline%20Instagram%20Post%20(6).png";

const PEXELS = {
  dataEntry:
    "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260",
  accounting:
    "https://images.pexels.com/photos/6779714/pexels-photo-6779714.jpeg?auto=compress&cs=tinysrgb&w=1260",
  paralegal:
    "https://images.pexels.com/photos/5668777/pexels-photo-5668777.jpeg?auto=compress&cs=tinysrgb&w=1260",
  customerService:
    "https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1260",
  marketing:
    "https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1260",
  journalism:
    "https://images.pexels.com/photos/30612694/pexels-photo-30612694.jpeg?auto=compress&cs=tinysrgb&w=1260",
  banking:
    "https://images.pexels.com/photos/18804128/pexels-photo-18804128.jpeg?auto=compress&cs=tinysrgb&w=1260",
  liberalArts:
    "https://images.pexels.com/photos/8133129/pexels-photo-8133129.jpeg?auto=compress&cs=tinysrgb&w=1260",
  supplyChain:
    "https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=1260",
  travelTourism:
    "https://images.pexels.com/photos/3885601/pexels-photo-3885601.jpeg?auto=compress&cs=tinysrgb&w=1260",
} as const;

/** Lowest risk first; highest risk (Data Entry) last. */
const DEGREE_SECTIONS: InfoArticleSection[] = [
  {
    emoji: "✈️",
    title: "Travel & Tourism Management",
    automationRiskScore: 74,
    image: {
      src: PEXELS.travelTourism,
      alt: "Traveler with luggage in an airport terminal",
    },
    paragraphs: [
      "Booking engines, dynamic pricing, and AI trip planners replaced much of what travel agents and front-desk coordinators used to do manually.",
      "Post-pandemic recovery helped tourism hiring, but self-serve apps capture routine itineraries. Agencies survive on luxury, corporate, and complex multi-stop planning.",
      "Tourism and hospitality degrees still work for experience design, destination marketing, and operations leadership. Transactional booking roles face the steadiest automation creep.",
    ],
  },
  {
    emoji: "📦",
    title: "Supply Chain Management",
    automationRiskScore: 76,
    image: {
      src: PEXELS.supplyChain,
      alt: "Warehouse and logistics operations for supply chain",
    },
    paragraphs: [
      "Forecasting, inventory routing, and vendor communications are increasingly algorithm-driven. Warehouses adopt robotics and WMS automation every quarter.",
      "Entry-level planner roles that once meant spreadsheet updates now expect ERP fluency and model oversight. The work continues; the human count per shipment drops.",
      "Supply chain degrees align with logistics tech, procurement strategy, and sustainability reporting. Pure coordinator tracks are the vulnerable layer.",
    ],
  },
  {
    emoji: "📚",
    title: "Liberal Arts",
    automationRiskScore: 78,
    image: {
      src: PEXELS.liberalArts,
      alt: "University library books representing liberal arts education",
    },
    paragraphs: [
      "Not because robots replace philosophers, but because liberal arts grads often land in admin, writing, and coordination roles that are themselves automating.",
      "The degree builds critical thinking, but employers increasingly want a paired skill: data, design, policy, or sales. A generalist resume without tooling fluency is harder to place than five years ago.",
      "Liberal arts remains valuable as a foundation. Stack a minor in tech, analytics, or a licensed profession to avoid drifting into the highest-risk job families.",
    ],
  },
  {
    emoji: "🏦",
    title: "Banking Operations",
    automationRiskScore: 80,
    image: {
      src: PEXELS.banking,
      alt: "Currency exchange at a bank teller window",
    },
    paragraphs: [
      "Teller-adjacent work, loan processing paperwork, and back-office settlements are heavily scripted and increasingly machine-run.",
      "Major banks have deployed AI for KYC checks, fraud flags, and customer onboarding. Branch operations hiring has declined for a decade; AI accelerates the trend.",
      "Finance and banking degrees still open doors in relationship management, risk, and fintech product roles. Operations-heavy tracks face the most automation pressure.",
    ],
  },
  {
    emoji: "📰",
    title: "Journalism",
    automationRiskScore: 82,
    image: {
      src: PEXELS.journalism,
      alt: "Journalist writing notes in a notebook outdoors",
    },
    paragraphs: [
      "Wire services and local outlets already publish AI-assisted summaries, earnings briefs, and sports recaps. Reader traffic still exists; headcount does not.",
      "Newsroom employment in the U.S. remains well below pre-2008 peaks. Graduates compete with tools that never miss a deadline and cost pennies per article.",
      "Investigative reporting, accountability journalism, and multimedia storytelling still need humans. Beat reporting on routine events is where automation lands first.",
    ],
  },
  {
    emoji: "📱",
    title: "Marketing",
    automationRiskScore: 85,
    image: {
      src: PEXELS.marketing,
      alt: "Digital marketing and social media strategy on laptop",
    },
    paragraphs: [
      "AI drafts copy, builds audiences, runs A/B tests, and generates creative variants faster than a coordinator learning the stack.",
      "Agency surveys show heavy cuts to entry-level marketing hires while strategist and analytics roles hold steady. The job left is brand judgment, not posting frequency.",
      "Marketing degrees pay off when you add data literacy, performance media, or creative direction. Generic social and content coordinator paths are the most automated.",
    ],
  },
  {
    emoji: "📞",
    title: "Customer Service",
    automationRiskScore: 87,
    image: {
      src: PEXELS.customerService,
      alt: "Customer service representative with headset",
    },
    paragraphs: [
      "Chatbots, voice agents, and help-center AI resolve tier-one tickets without a human. Companies report 40 to 60% deflection rates on common support queries after deploying AI layers.",
      "Call center and retail support hiring has flattened while spend shifts to conversation design and escalation specialists. The degree still trains communication skills, but the entry queue role is shrinking.",
      "Students should target customer success, technical support engineering, or CX strategy where relationships and complex troubleshooting still require people.",
    ],
  },
  {
    emoji: "⚖️",
    title: "Paralegal Studies",
    automationRiskScore: 89,
    image: {
      src: PEXELS.paralegal,
      alt: "Law books and legal documents for paralegal studies",
    },
    paragraphs: [
      "Contract review, discovery, and case research tools now process thousands of pages in minutes. Law firms bill the same hours while using fewer paralegals per matter.",
      "Entry-level paralegal postings fell sharply in 2024 as AI-assisted legal tech went mainstream. Remaining roles expect you to supervise models, not manually highlight PDFs.",
      "Pre-law students used paralegal work as a pipeline. That rung is narrowing. Plan on law school, compliance tech, or legal operations instead of traditional paralegal placement alone.",
    ],
  },
  {
    emoji: "🧮",
    title: "Accounting",
    automationRiskScore: 92,
    image: {
      src: PEXELS.accounting,
      alt: "Accounting ledger, calculator, and financial paperwork",
    },
    paragraphs: [
      "Bookkeeping, reconciliations, and standard tax prep are increasingly automated through platforms like QuickBooks AI, Xero, and enterprise ERP modules.",
      "The Big Four and mid-size firms are hiring fewer first-year accountants for rote ledger work while expanding advisory and compliance roles. CPA demand remains, but the volume of human hours per return is shrinking fast.",
      "Accounting degrees still matter when paired with forensic analysis, audit judgment, or client-facing advisory. Pure data-in, report-out accounting is the part under pressure.",
    ],
  },
  {
    emoji: "🗂️",
    title: "Data Entry / Administration",
    automationRiskScore: 95,
    image: {
      src: PEXELS.dataEntry,
      alt: "Computer code on a screen representing data entry work",
    },
    paragraphs: [
      "This is the degree path most exposed to straight replacement. Scheduling, form intake, record updates, and inbox routing are already handled by software agents and workflow bots.",
      "McKinsey and World Economic Forum estimates put routine administrative work among the first white-collar tasks machines absorb at scale. Graduates expecting clerical admin as a default first job are competing with tools that never need onboarding.",
      "If you are in this track, pivot toward operations analytics, business systems, or roles that audit automation rather than perform repetitive entry.",
    ],
  },
];

export default function ExtinctDegreesPage() {
  return (
    <InfoArticlePage
      eyebrow="PathPicker Student News"
      title="The 10 Degrees Facing the Highest Automation Risk by 2028"
      subtitle="Listed from lower to higher automation risk. Keep scrolling—the last degree has the highest exposure."
      lead={[
        "We mapped degree paths to the roles graduates actually land, then scored how much of that work is already automating. These ten degrees cluster at the top.",
        "A high score does not mean the major is worthless. It means your first jobs out of school are likely in categories where AI and workflow tools are cutting entry-level hiring.",
      ]}
      heroImage={{
        src: HERO_IMAGE,
        alt: "Harvard professor announcing degrees facing automation risk by 2028, PathPicker student news graphic",
        placement: "cover",
        aspect: "portrait",
      }}
      sectionNumbering="countdown"
      sections={DEGREE_SECTIONS}
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
