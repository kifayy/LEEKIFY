import {
  getFeaturedPartnersScholarships,
  getRandomSweepstakeScholarships,
  getFeaturedScholarships,
  getAllScholarships,
} from "@/lib/supabase/queries/scholarships";
import { FeaturedScholarshipsCarousel } from "@/components/home/featured-scholarships-carousel";
import type { Scholarship } from "@/lib/supabase/queries/scholarships";

const PLACEHOLDER_FIELDS: Pick<
  Scholarship,
  | "description_short"
  | "requirements_summary"
  | "highlight_1"
  | "highlight_2"
  | "highlight_3"
  | "highlight_4"
  | "highlight_5"
  | "is_sweepstake"
> = {
  description_short: null,
  requirements_summary: null,
  highlight_1: null,
  highlight_2: null,
  highlight_3: null,
  highlight_4: null,
  highlight_5: null,
  is_sweepstake: null,
};

const PLACEHOLDER_SCHOLARSHIPS: Scholarship[] = [
  {
    id: "placeholder-1",
    title: "Merit-Based Excellence Award",
    provider: "National Education Foundation",
    amount: "$5,000",
    deadline: "2026-03-15T23:59:59Z",
    is_featured: true,
    external_link: null,
    slug: "merit-based-excellence-award",
    content: "Awarded to high-achieving students with strong academic records and community involvement.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
    ...PLACEHOLDER_FIELDS,
  },
  {
    id: "placeholder-2",
    title: "First-Gen Student Support Grant",
    provider: "College Access Foundation",
    amount: "$2,500",
    deadline: "2026-04-01T23:59:59Z",
    is_featured: true,
    external_link: null,
    slug: "first-gen-student-support-grant",
    content: "Supporting first-generation college students in their pursuit of higher education.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
    ...PLACEHOLDER_FIELDS,
  },
  {
    id: "placeholder-3",
    title: "STEM Innovation Scholarship",
    provider: "TechForward Initiative",
    amount: "$10,000",
    deadline: "2026-05-15T23:59:59Z",
    is_featured: true,
    external_link: null,
    slug: "stem-innovation-scholarship",
    content: "For students majoring in science, technology, engineering, or mathematics.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
    ...PLACEHOLDER_FIELDS,
  },
  {
    id: "placeholder-4",
    title: "Community Service Leadership Award",
    provider: "Civic Engagement Fund",
    amount: "$3,000",
    deadline: "2026-06-30T23:59:59Z",
    is_featured: true,
    external_link: null,
    slug: "community-service-leadership-award",
    content: "Recognizing students who have made a significant impact through volunteer work.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
    ...PLACEHOLDER_FIELDS,
  },
  {
    id: "placeholder-5",
    title: "Creative Arts & Design Grant",
    provider: "Arts for All Foundation",
    amount: "$4,000",
    deadline: "2026-07-15T23:59:59Z",
    is_featured: true,
    external_link: null,
    slug: "creative-arts-design-grant",
    content: "For students pursuing studies in visual arts, music, or design.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
    ...PLACEHOLDER_FIELDS,
  },
  {
    id: "placeholder-6",
    title: "Diversity & Inclusion Scholarship",
    provider: "Inclusive Futures Fund",
    amount: "$5,500",
    deadline: "2026-08-01T23:59:59Z",
    is_featured: true,
    external_link: null,
    slug: "diversity-inclusion-scholarship",
    content: "Supporting underrepresented students in achieving their educational goals.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
    ...PLACEHOLDER_FIELDS,
  },
];

export async function FeaturedScholarshipsSection() {
  // Prefer one each: Citizens Bank, Sofi, US Bank
  let scholarships = await getFeaturedPartnersScholarships();
  if (scholarships.length === 0) {
    scholarships = await getRandomSweepstakeScholarships(4);
  }
  if (scholarships.length === 0) {
    scholarships = await getFeaturedScholarships();
  }
  if (scholarships.length === 0) {
    scholarships = (await getAllScholarships()).slice(0, 8);
  }
  if (scholarships.length === 0) {
    scholarships = PLACEHOLDER_SCHOLARSHIPS;
  }
  // Exclude ISL Scholarship from featured carousel
  const filtered = scholarships.filter(
    (s) => !(s.title?.toLowerCase().includes("isl"))
  );
  // Ensure at least 3 cards so the 3rd can show "Coming Soon"
  const COMING_SOON_PLACEHOLDER: Scholarship = {
    id: "coming-soon",
    title: "Coming Soon",
    provider: "",
    amount: null,
    deadline: null,
    is_featured: false,
    external_link: null,
    slug: "coming-soon",
    content: null,
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
    description_short: null,
    requirements_summary: null,
    highlight_1: null,
    highlight_2: null,
    highlight_3: null,
    highlight_4: null,
    highlight_5: null,
    is_sweepstake: null,
  };
  const withThird =
    filtered.length >= 3 ? filtered : [...filtered, COMING_SOON_PLACEHOLDER];
  return (
    <FeaturedScholarshipsCarousel scholarships={withThird} />
  );
}
