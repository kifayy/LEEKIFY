export const metadata = {
  title: "Terms of Service | Pathpicker",
  description: "Terms of Service for Pathpicker.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">Terms of Service</h1>
      <p className="mt-2 text-sm font-normal text-muted-foreground md:mt-4">Last updated: February 2026</p>
      <div className="mt-6 space-y-5 md:mt-8 md:space-y-6 text-foreground">
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">1. Acceptance of Terms</h2>
          <p className="mt-2 font-normal text-muted-foreground">
            By using Pathpicker and related services, you agree to these Terms of Service. If you do
            not agree, please do not use our services.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">2. Use of Service</h2>
          <p className="mt-2 font-normal text-muted-foreground">
            Pathpicker provides quizzes and scholarship information for educational purposes. You
            agree to use the service only for lawful purposes and in a way that does not infringe
            the rights of others.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">3. Disclaimer</h2>
          <p className="mt-2 font-normal text-muted-foreground">
            Scholarship listings and quiz results are for informational purposes. We do not
            guarantee eligibility or funding. Always verify details with the scholarship provider
            before applying.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">4. Contact</h2>
          <p className="mt-2 font-normal text-muted-foreground">
            For questions about these terms, please contact us through the Awarded app or website.
          </p>
        </section>
      </div>
    </div>
  );
}
