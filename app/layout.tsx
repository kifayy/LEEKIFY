import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { Suspense } from "react";
import {
  Poppins,
  Inter,
  Dancing_Script,
  Volkhov,
  Luckiest_Guy,
  Covered_By_Your_Grace,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { MobileScholarshipQuizStickyFooter } from "@/components/home/mobile-scholarship-quiz-sticky-footer";
import { CountryLayout } from "@/components/country-layout";
import { SiteImageProtection } from "@/components/site-image-protection";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from "@/lib/site-metadata";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-0HQ4Y4J0RB";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    metadataBase: new URL(baseUrl),
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    alternates: { canonical: baseUrl },
    other: { "impact-site-verification": "f3e4ac5b-cbf4-4dcb-bdf3-61eda8835162" },
    openGraph: {
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
      siteName: "PathPicker",
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
    },
  };
}

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  subsets: ["latin"],
});

/** Mobile hero headlines — matches clean landing reference (SF/Inter style). */
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
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
        <link rel="preconnect" href="https://my.pathpicker.com" />
        <link rel="preconnect" href="https://framerusercontent.com" />
      </head>
      <body
        className={`${poppins.className} ${poppins.variable} ${inter.variable} ${dancingScript.variable} ${volkhov.variable} ${luckiestGuy.variable} ${coveredByYourGrace.variable} antialiased`}
      >
          <SiteImageProtection />
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
            <div className="relative flex min-w-0 flex-col overflow-x-hidden">
              <SiteHeader />
              <main className="min-w-0 flex-shrink-0 overflow-x-hidden pt-32 md:pt-44 lg:pt-0">
                {children}
              </main>
              {/* Image strip connecting into the footer (now shown on all viewports) */}
              <div className="w-full">
                <Image
                  src="https://storage.googleapis.com/images_592/Icodn.png"
                  alt="Students using Pathpicker"
                  width={1600}
                  height={400}
                  className="block h-auto w-full object-cover"
                  draggable={false}
                  unoptimized
                />
              </div>
              <SiteFooter />
              <CookieConsentBanner />
              <MobileScholarshipQuizStickyFooter />
            </div>
            </CountryLayout>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
