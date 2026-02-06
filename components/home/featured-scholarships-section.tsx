import { getFeaturedScholarships, getAllScholarships } from "@/lib/supabase/queries/scholarships";
import { FeaturedScholarshipsCarousel } from "@/components/home/featured-scholarships-carousel";

export async function FeaturedScholarshipsSection() {
  let scholarships = await getFeaturedScholarships();
  if (scholarships.length === 0) {
    scholarships = (await getAllScholarships()).slice(0, 8);
  }
  return <FeaturedScholarshipsCarousel scholarships={scholarships} />;
}
