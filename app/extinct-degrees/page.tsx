import { InfoArticlePage } from "@/components/info-article/info-article-page";

export const metadata = {
  title: "5 Careers a Harvard Professor Says Will Be Extinct by 2027 | PathPicker",
  description:
    "Five entry-level career paths—from copywriting to junior dev—may not exist in their current form by 2027. Here's what's disappearing and what to build instead.",
};

const PEXELS = {
  hero: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260",
  copywriter: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260",
  paralegal: "https://images.pexels.com/photos/5668777/pexels-photo-5668777.jpeg?auto=compress&cs=tinysrgb&w=1260",
  analyst: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260",
  developer: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260",
  operations: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260",
} as const;

export default function ExtinctDegreesPage() {
  return (
    <InfoArticlePage
      emoji="📉"
      title="The 5 Careers a Harvard Professor Says Will Be Extinct by 2027"
      subtitle="Dr. James Hendricks from Harvard's Labor Economics department said something at a conference in March that nobody clipped and nobody shared."
      lead={[
        "He said five entire career categories will not exist in their current form by 2027. Not shrink. Not change. Gone.",
        "The room went quiet. Then everyone went back to their salads and pretended he hadn't just described the career plans of about 40 million college students.",
        "Here they are.",
      ]}
      heroImage={{
        src: PEXELS.hero,
        alt: "Students in a classroom discussion about careers and the future of work",
      }}
      sections={[
        {
          emoji: "✍️",
          title: "Junior Copywriter",
          image: {
            src: PEXELS.copywriter,
            alt: "Person writing marketing copy on a laptop",
          },
          paragraphs: [
            "AI writes faster, cheaper, and well enough for 80% of what brands actually need. This wasn't supposed to happen yet. Two years ago every marketing guru on LinkedIn was saying \"AI can't replicate human creativity.\" Those same gurus are now quietly letting their junior writers go.",
            "74% of marketing agencies surveyed in Q1 2025 said they had already eliminated or frozen all entry-level writing hires. The writers still working are strategists, editors, and creative directors. The ones cranking out product descriptions, email sequences, and ad copy are already replaced. The skill that's left isn't writing. It's knowing whether the writing is any good.",
            "If you were planning to start in content and work your way up, the bottom rung is gone. You now have to start halfway up the ladder or not at all.",
          ],
        },
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
          emoji: "📊",
          title: "Junior Financial Analyst",
          image: {
            src: PEXELS.analyst,
            alt: "Financial charts and data analysis on a computer screen",
          },
          paragraphs: [
            "Not the senior ones. Not the partners. The ones building models, pulling data, formatting decks, and making spreadsheets look presentable for the people above them. That entire entry layer is either gone or actively being eliminated at firms that haven't announced it yet.",
            "6 in 10 finance graduates from 2023 are still searching for their first role. Not because they aren't qualified. Because the role they trained for no longer needs a human to fill it. Goldman Sachs, JP Morgan, and every mid-size firm in between have deployed AI tools that do in four minutes what an analyst class of twenty used to spend two weeks on.",
            "The finance jobs that remain need judgment, relationships, and the ability to explain what the numbers mean to someone who doesn't want to look at them. That is a senior skill. And there are now no junior jobs to develop it in.",
          ],
        },
        {
          emoji: "💻",
          title: "Junior Software Developer",
          image: {
            src: PEXELS.developer,
            alt: "Software developer reviewing code on a computer monitor",
          },
          paragraphs: [
            "This one is the cruelest because everyone said learn to code. Parents said it. Guidance counselors said it. Every career quiz you ever took probably spat out software developer as a safe bet. And for a while it was.",
            "AI now writes cleaner, faster, and more efficient code than a junior developer who graduated eight months ago. Not sometimes. Consistently. GitHub Copilot, Cursor, and a dozen other tools have made the entry-level coding job functionally obsolete at companies that have adopted them.",
            "What's left is architecture thinking. Systems design. Knowing why you're building something and what it needs to do at scale. That is not a skill you develop in a bootcamp. It is not a skill most CS programs even teach until year three. The pipeline that used to take someone from junior to senior is broken because the junior rung doesn't exist anymore.",
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
      ]}
    />
  );
}
