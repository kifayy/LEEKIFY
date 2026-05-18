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
    quote: "Their matching system is insane!",
    name: "Sarah Motin",
    avatarIndex: 0,
    photoUrl: testimonialAvatarUrl(0),
  },
  {
    id: "h2-2",
    quote: "Super helpful to know what environment I'd fit best in.",
    name: "Katie Rosetta",
    avatarIndex: 1,
    photoUrl: testimonialAvatarUrl(1),
  },
  {
    id: "h2-3",
    quote: "Cut my list way down. Every school on it actually feels like me.",
    name: "Brian Campbell",
    avatarIndex: 2,
    photoUrl: testimonialAvatarUrl(2),
  },
  {
    id: "h2-4",
    quote: "No more doom-scrolling random college sites. This gave me clarity.",
    name: "Marbella Gusman",
    avatarIndex: 3,
    photoUrl: testimonialAvatarUrl(3),
  },
  {
    id: "h2-5",
    quote: "Reach, target, safety finally made sense. I applied with a plan.",
    name: "Riley Chen",
    avatarIndex: 5,
    photoUrl: testimonialAvatarUrl(5),
  },
  {
    id: "h2-6",
    quote: "Took the quiz once and my short list basically wrote itself.",
    name: "Emma Clarke",
    avatarIndex: 4,
    photoUrl: testimonialAvatarUrl(4),
  },
  {
    id: "h2-7",
    quote: "The fit scores matched how I learn and social life, not just rankings.",
    name: "Olivia Park",
    avatarIndex: 6,
    photoUrl: testimonialAvatarUrl(6),
  },
  {
    id: "h2-8",
    quote: "As a transfer, I needed real options for my credits. Huge help.",
    name: "Maya Thompson",
    avatarIndex: 7,
    photoUrl: testimonialAvatarUrl(7),
  },
  {
    id: "h2-9",
    quote: "Found schools I'd never have searched on my own. Game changer.",
    name: "Marcus Williams",
    avatarIndex: 8,
    photoUrl: testimonialAvatarUrl(8),
  },
];
