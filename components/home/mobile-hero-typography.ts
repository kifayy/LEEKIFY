/** Inter-based mobile hero type — aligned with reference landing (SF/Inter). */
export const MOBILE_HERO_FONT =
  "font-[family-name:var(--font-inter)]";

export const MOBILE_HERO_HEADLINE_CLASS = `${MOBILE_HERO_FONT} text-balance text-[clamp(2.625rem,10.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-[#111111]`;

export const MOBILE_HERO_ROTATING_LINE_CLASS = `${MOBILE_HERO_FONT} text-balance text-[clamp(2.625rem,10.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.04em]`;

export const MOBILE_HERO_ROTATING_PREFIX_CLASS = "text-[#48484A]";

export const MOBILE_HERO_ROTATING_ACCENT_CLASS = "text-[#956DFE]";

/** @deprecated Use MOBILE_HERO_ROTATING_LINE_CLASS */
export const MOBILE_HERO_TAGLINE_CLASS = MOBILE_HERO_ROTATING_LINE_CLASS;

export const MOBILE_HERO_SUBTEXT_CLASS = `${MOBILE_HERO_FONT} text-[0.9375rem] font-normal leading-[1.6] tracking-[-0.008em] text-[#6B7280]`;
