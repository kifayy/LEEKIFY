import { BRAND_MEDIA } from "@/components/landing/constants";

/** Indices align with `BRAND_MEDIA.testimonialAvatars`. */
export type TestimonialAvatarIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Home2Testimonial = {
  id: string;
  quote: string;
  name: string;
  avatarIndex: TestimonialAvatarIndex;
  /** Optional full-bleed photo for StudentsLoveCtaBand tiles */
  photoUrl?: string;
};

export function testimonialAvatarUrl(index: TestimonialAvatarIndex) {
  return BRAND_MEDIA.testimonialAvatars[index];
}

export function testimonialAvatarObjectClass(_index: TestimonialAvatarIndex): string {
  return "object-center";
}

export const HOME2_TESTIMONIALS: Home2Testimonial[] = [
  {
    id: "h2-1",
    quote:
      "Wish I would've heard about this in high school. Still insane for college students though",
    name: "Sarah Motin",
    avatarIndex: 0,
    photoUrl: testimonialAvatarUrl(0),
  },
  {
    id: "h2-2",
    quote:
      "The autopilot feature they have is sooo nice it applies for you outside the app too!",
    name: "Katie Rosetta",
    avatarIndex: 1,
    photoUrl: testimonialAvatarUrl(1),
  },
  {
    id: "h2-3",
    quote: "If you want to apply for more scholarships in less time, this is it.",
    name: "Brian Campbell",
    avatarIndex: 2,
    photoUrl: testimonialAvatarUrl(2),
  },
  {
    id: "h2-4",
    quote:
      "I'm shocked by how little time I spent. Awarded streamlines everything.",
    name: "Marbella Gusman",
    avatarIndex: 3,
    photoUrl: testimonialAvatarUrl(3),
  },
  {
    id: "h2-5",
    quote:
      "Seeing Michigan-specific matches next to national ones helped me prioritize fast.",
    name: "Riley Chen",
    avatarIndex: 5,
    photoUrl: testimonialAvatarUrl(5),
  },
  {
    id: "h2-6",
    quote:
      "Finally one place for matches, deadlines, and what I’ve won. Game changer.",
    name: "Emma Clarke",
    avatarIndex: 4,
    photoUrl: testimonialAvatarUrl(4),
  },
  {
    id: "h2-7",
    quote: "Clean layout, zero clutter—I actually check it between classes.",
    name: "Olivia Park",
    avatarIndex: 6,
    photoUrl: testimonialAvatarUrl(6),
  },
  {
    id: "h2-8",
    quote: "Feels like the app gets how hectic campus weeks really are.",
    name: "Maya Thompson",
    avatarIndex: 7,
    photoUrl: testimonialAvatarUrl(7),
  },
  {
    id: "h2-9",
    quote: "Autofill saved me on the longer apps—worth it before midterms hit.",
    name: "Marcus Williams",
    avatarIndex: 8,
    photoUrl: testimonialAvatarUrl(8),
  },
];
