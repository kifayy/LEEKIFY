"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ROCKET_LAUNCH_LOTTIE_SRC = "/animations/rocketlaunch.lottie";

export function DecorativeRocketLottie() {
  return (
    <div
      className="pointer-events-none absolute -right-2 top-0 hidden w-[min(7.5rem,18vw)] md:block lg:-right-4 lg:w-[8.5rem] xl:w-[9.5rem]"
      aria-hidden
    >
      <DotLottieReact
        src={ROCKET_LAUNCH_LOTTIE_SRC}
        loop
        autoplay
        className="h-auto w-full min-h-[7rem] drop-shadow-[0_12px_24px_rgba(24,6,46,0.12)] lg:min-h-[8rem]"
      />
    </div>
  );
}
