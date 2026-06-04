import type { Metadata } from "next";
import { AwardedAppLanding } from "./awarded-app-landing";

export const metadata: Metadata = {
  title: "Awarded — Student money in your texts",
  description:
    "Scholarships, brand giveaways, and exclusive student deals; Awarded finds student money with your name on it.",
};

export default function AwardedAppPage() {
  return <AwardedAppLanding />;
}
