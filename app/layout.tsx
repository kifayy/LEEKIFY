import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { Suspense } from "react";
import {
  Poppins,
  Inter,
  Dancing_Script,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { MobileScholarshipQuizStickyFooter } from "@/components/home/mobile-scholarship-quiz-sticky-footer";
import { CountryLayout } from "@/components/country-layout";
import { AttributionCapture } from "@/components/attribution-capture";
import { SiteImageProtection } from "@/components/site-image-protection";
import { ScrollToTopOnNavigate } from "@/components/scroll-to-top-on-navigate";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from "@/lib/site-metadata";
import { META_PIXEL_ID, META_PIXEL_INIT } from "@/lib/meta-pixel";
import { SNAPCHAT_PIXEL_ID } from "@/lib/snapchat-pixel";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-0HQ4Y4J0RB";

const SNAPCHAT_PIXEL_INIT = `
(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
{a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
r.src=n;var u=t.getElementsByTagName(s)[0];
u.parentNode.insertBefore(r,u);})(window,document,
'https://sc-static.net/scevent.min.js');
snaptr('init', '${SNAPCHAT_PIXEL_ID}', {});
snaptr('track', 'PAGE_VIEW');
`;

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
        <link rel="preconnect" href="https://sc-static.net" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="PathPicker LLM site index" />
        {/* Native inline script so Meta Pixel Helper detects fbq on first paint (Next.js Script queues via __next_s). */}
        <script dangerouslySetInnerHTML={{ __html: META_PIXEL_INIT.trim() }} />
        <Script
          id="snapchat-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: SNAPCHAT_PIXEL_INIT }}
        />
      </head>
      <body
        className={`${poppins.className} ${poppins.variable} ${inter.variable} ${dancingScript.variable} antialiased`}
      >
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
          <SiteImageProtection />
          <Suspense fallback={null}>
            <AttributionCapture />
          </Suspense>
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
            <ScrollToTopOnNavigate />
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
                  sizes="100vw"
                  quality={80}
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
