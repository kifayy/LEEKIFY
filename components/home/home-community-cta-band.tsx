import {
  HERO_SIMPLIFIED_GRADIENT_END,
  HERO_SIMPLIFIED_GRADIENT_START,
} from "@/components/home/hero-audience-theme";
import { PathQuizCtaButton } from "@/components/home/path-quiz-cta";

import { SocialRatingsBar } from "@/components/home/social-ratings-bar";

import {

  HOME_COMMUNITY_CTA_HEADLINE,

  HOME_COMMUNITY_CTA_SUBTEXT,

} from "@/lib/home-reviews-trust-copy";



export function HomeCommunityCtaBand() {

  return (

    <div

      className="w-full px-4 py-12 md:px-6 md:py-14 lg:py-16"

      style={{

        background: `linear-gradient(180deg, ${HERO_SIMPLIFIED_GRADIENT_START} 0%, ${HERO_SIMPLIFIED_GRADIENT_END} 100%)`,

      }}

    >

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center md:max-w-3xl">

        <div className="w-full">
          <SocialRatingsBar variant="onDark" />
        </div>



        <h3 className="mt-8 font-[family-name:var(--font-poppins)] text-[1.625rem] font-bold leading-[1.12] tracking-[-0.03em] text-white md:mt-10 md:text-[2rem] lg:text-[2.25rem]">

          {HOME_COMMUNITY_CTA_HEADLINE}

        </h3>



        <p className="mt-4 max-w-xl font-[family-name:var(--font-poppins)] text-[0.9375rem] font-normal leading-[1.55] text-white/90 md:mt-5 md:text-base">

          {HOME_COMMUNITY_CTA_SUBTEXT}

        </p>



        <PathQuizCtaButton
          variant="college"
          size="section"
          appearance="onDark"
          className="mt-8 h-14 min-w-[min(100%,16rem)] px-10 text-[1.0625rem] md:mt-10 md:h-[3.75rem] md:min-w-[18rem] md:text-lg"
        />

      </div>

    </div>

  );

}

