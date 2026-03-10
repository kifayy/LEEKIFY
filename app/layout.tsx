import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { Poppins, Dancing_Script, Volkhov, Luckiest_Guy, Covered_By_Your_Grace } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EnterScholarshipsSectionLayout } from "@/components/enter-scholarships-section-layout";
import { MobileSocialProofPopup } from "@/components/mobile-social-proof-popup";
import { CountryLayout } from "@/components/country-layout";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-0HQ4Y4J0RB";

const defaultTitle = "Discover Your Student Archetype & Future Path";
const defaultDescription =
  "Find your path. Take our viral quizzes to discover your student archetype, explore study abroad matches, and unlock exclusive financial opportunities.";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    metadataBase: new URL(baseUrl),
    title: defaultTitle,
    description: defaultDescription,
    alternates: { canonical: baseUrl },
    other: { "impact-site-verification": "f3e4ac5b-cbf4-4dcb-bdf3-61eda8835162" },
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      siteName: "Pathpicker",
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
    },
  };
}

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-pathpicker-script",
  display: "swap",
  subsets: ["latin"],
});

const volkhov = Volkhov({
  weight: "700",
  variable: "--font-volkhov",
  display: "swap",
  subsets: ["latin"],
});

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  variable: "--font-luckiest-guy",
  display: "swap",
  subsets: ["latin"],
});

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: "400",
  variable: "--font-covered-by-your-grace",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="impact-site-verification" content="506f7160-3dd6-4477-8a3e-bb29d178f99a" />
        <link rel="preconnect" href="https://storage.googleapis.com" />
      </head>
      <body className={`${poppins.className} ${poppins.variable} ${dancingScript.variable} ${volkhov.variable} ${luckiestGuy.variable} ${coveredByYourGrace.variable} antialiased`}>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="lazyOnload" />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
          <Script async src="https://subscribe-forms.beehiiv.com/embed.js" strategy="lazyOnload" />
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <CountryLayout>
            <div className="relative flex min-w-0 flex-col overflow-x-hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
              <SiteHeader />
              <main className="min-w-0 flex-shrink-0 overflow-x-hidden pt-24 md:pt-32 lg:pt-36">{children}</main>
              <EnterScholarshipsSectionLayout />
              <SiteFooter />
              <MobileSocialProofPopup />
            </div>
            </CountryLayout>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
