export const metadata = {
  title: "Privacy Policy | Pathpicker",
  description: "Privacy Policy for Pathpicker.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm font-normal text-muted-foreground md:mt-4">Last updated: February 2026</p>
      <div className="mt-6 space-y-5 md:mt-8 md:space-y-6 text-foreground">
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">1. Information We Collect</h2>
          <p className="mt-2 font-normal text-muted-foreground">
            When you use Pathpicker, we may collect information you provide (e.g. quiz answers,
            email if you sign up for the newsletter) and usage data such as pages visited.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">2. How We Use Information</h2>
          <p className="mt-2 font-normal text-muted-foreground">
            We use this information to deliver and improve our services, personalize your
            experience, and communicate with you about scholarships and updates when you have
            opted in.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">3. Sharing</h2>
          <p className="mt-2 font-normal text-muted-foreground">
            We do not sell your personal information. We may share data with service providers that
            help us operate Pathpicker and with the Awarded app when you use linked features.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">4. Your Rights</h2>
          <p className="mt-2 font-normal text-muted-foreground">
            You may request access, correction, or deletion of your data. Contact us through the
            Awarded app or website to exercise these rights.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#181A1D]">5. Contact</h2>
          <p className="mt-2 font-normal text-muted-foreground">
            For privacy-related questions, please contact us through the Awarded app or website.
          </p>
        </section>
      </div>
    </div>
  );
}
