import { getFeaturedScholarships } from "@/lib/supabase/queries/scholarships";
import { FeaturedScholarshipsCarousel } from "@/components/home/featured-scholarships-carousel";

export async function FeaturedScholarshipsSection() {
  const scholarships = await getFeaturedScholarships();
  return <FeaturedScholarshipsCarousel scholarships={scholarships} />;
}
