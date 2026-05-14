export function AboutProfileSchoolsSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full scroll-mt-8 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-10 md:pt-10 md:pb-14 lg:pt-12 lg:pb-16">
        <div className="flex flex-col items-center text-center">
          <h2
            id="about-heading"
            className="max-w-[min(100%,20ch)] font-[family-name:var(--font-poppins)] text-3xl font-bold leading-[1.1] tracking-tight text-[#181A1D] sm:max-w-none sm:text-4xl md:max-w-5xl md:text-5xl lg:text-[3.5rem]"
          >
            Pick The Right School,{" "}
            <span className="text-[#956EFE]">Without Regret</span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 md:mt-4 md:max-w-2xl md:text-lg">
            Make one of the biggest decisions of your life with more confidence and less doubt.
          </p>
        </div>
      </div>
    </section>
  );
}
