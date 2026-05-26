import { InfoArticlePage } from "@/components/info-article/info-article-page";
import {
  DiscomfortAvoidanceChart,
  ExternalValidationChart,
  IdentityRigidityChart,
  PredictionComparisonChart,
} from "@/components/info-article/personality-traits-charts";

export const metadata = {
  title: "3 Personality Traits That Predict College Dropout | PathPicker",
  description:
    "A study of 12,000 students found three personality traits predicted dropout 71% of the time—better than GPA. Learn what they are and what to do about them.",
};

export default function ThreePersonalityTraitsPage() {
  return (
    <InfoArticlePage
      emoji="🎓"
      title="The 3 Personality Traits That Predict College Dropout Better Than GPA"
      leadVisual={<PredictionComparisonChart />}
      lead={[
        "A new study tracked 12,000 college students across four years. GPA predicted dropout 23% of the time. These three traits predicted it 71% of the time.",
        "Your grades are not the problem.",
      ]}
      sections={[
        {
          emoji: "🪞",
          title: "External validation dependence",
          visual: <ExternalValidationChart />,
          paragraphs: [
            "Students who need other people to tell them they're doing well before they believe it themselves drop out at twice the rate of their peers. College removes the constant feedback loop of high school. No teacher checking in every day. No parent watching over homework.",
            "The students who couldn't self-validate collapsed without it. 43% of first-year dropouts scored in the top percentile for external validation dependence on personality assessments taken at enrollment.",
          ],
        },
        {
          emoji: "🏃",
          title: "Discomfort avoidance",
          visual: <DiscomfortAvoidanceChart />,
          paragraphs: [
            "Not laziness. Specifically the inability to sit with uncertainty and keep moving anyway. College is ambiguous by design. The students who needed a clear right answer before taking a step froze when the path got blurry.",
            "67% of students who dropped out in year two reported avoiding at least three major academic decisions for more than a month before ultimately leaving.",
          ],
        },
        {
          emoji: "🧱",
          title: "Identity rigidity",
          visual: <IdentityRigidityChart />,
          paragraphs: [
            "Students who arrived at college with a fixed idea of who they were and refused to let that change. College is supposed to shake you. The students who couldn't be shaken didn't grow. They just got more stuck.",
            "Students who scored high on identity rigidity were 3x more likely to transfer or drop out by junior year than students who scored low, regardless of their academic performance.",
          ],
        },
      ]}
    />
  );
}
