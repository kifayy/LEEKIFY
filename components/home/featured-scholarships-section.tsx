import { getFeaturedScholarships, getAllScholarships } from "@/lib/supabase/queries/scholarships";
import { FeaturedScholarshipsCarousel } from "@/components/home/featured-scholarships-carousel";
import type { Scholarship } from "@/lib/supabase/queries/scholarships";

const PLACEHOLDER_SCHOLARSHIPS: Scholarship[] = [
  {
    id: "placeholder-1",
    title: "Merit-Based Excellence Award",
    provider: "National Education Foundation",
    amount: "$5,000",
    deadline: "2026-03-15T23:59:59Z",
    is_featured: true,
    external_link: null,
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=770&h=548&fit=crop",
    slug: "merit-based-excellence-award",
    content: "Awarded to high-achieving students with strong academic records and community involvement.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "placeholder-2",
    title: "First-Gen Student Support Grant",
    provider: "College Access Foundation",
    amount: "$2,500",
    deadline: "2026-04-01T23:59:59Z",
    is_featured: true,
    external_link: null,
    image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=770&h=548&fit=crop",
    slug: "first-gen-student-support-grant",
    content: "Supporting first-generation college students in their pursuit of higher education.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "placeholder-3",
    title: "STEM Innovation Scholarship",
    provider: "TechForward Initiative",
    amount: "$10,000",
    deadline: "2026-05-15T23:59:59Z",
    is_featured: true,
    external_link: null,
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=770&h=548&fit=crop",
    slug: "stem-innovation-scholarship",
    content: "For students majoring in science, technology, engineering, or mathematics.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "placeholder-4",
    title: "Community Service Leadership Award",
    provider: "Civic Engagement Fund",
    amount: "$3,000",
    deadline: "2026-06-30T23:59:59Z",
    is_featured: true,
    external_link: null,
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=770&h=548&fit=crop",
    slug: "community-service-leadership-award",
    content: "Recognizing students who have made a significant impact through volunteer work.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "placeholder-5",
    title: "Creative Arts & Design Grant",
    provider: "Arts for All Foundation",
    amount: "$4,000",
    deadline: "2026-07-15T23:59:59Z",
    is_featured: true,
    external_link: null,
    image_url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=770&h=548&fit=crop",
    slug: "creative-arts-design-grant",
    content: "For students pursuing studies in visual arts, music, or design.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "placeholder-6",
    title: "Diversity & Inclusion Scholarship",
    provider: "Inclusive Futures Fund",
    amount: "$5,500",
    deadline: "2026-08-01T23:59:59Z",
    is_featured: true,
    external_link: null,
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=770&h=548&fit=crop",
    slug: "diversity-inclusion-scholarship",
    content: "Supporting underrepresented students in achieving their educational goals.",
    tags: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
  },
];

export async function FeaturedScholarshipsSection() {
  let scholarships = await getFeaturedScholarships();
  if (scholarships.length === 0) {
    scholarships = (await getAllScholarships()).slice(0, 8);
  }
  if (scholarships.length === 0) {
    scholarships = PLACEHOLDER_SCHOLARSHIPS;
  }
  return <FeaturedScholarshipsCarousel scholarships={scholarships} />;
}
