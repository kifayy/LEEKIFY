"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";

import {
  COOKIE_CONSENT_UPDATED_EVENT,
  getCookieConsent,
  type CookieConsentPreferences,
} from "@/lib/cookie-consent";
import { META_PIXEL_ID, META_PIXEL_INIT } from "@/lib/meta-pixel";
import { SNAPCHAT_PIXEL_ID } from "@/lib/snapchat-pixel";
import { TIKTOK_PIXEL_ID, TIKTOK_PIXEL_INIT } from "@/lib/tiktok-pixel";

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

function readConsent(): CookieConsentPreferences | null {
  return getCookieConsent();
}

export function ConsentGatedScripts() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const syncFromStorage = useCallback(() => {
    const prefs = readConsent();
    setAnalytics(prefs?.analytics === true);
    setMarketing(prefs?.marketing === true);
  }, []);

  useEffect(() => {
    syncFromStorage();
    const onUpdate = () => syncFromStorage();
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, onUpdate);
  }, [syncFromStorage]);

  return (
    <>
      {marketing ? (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: META_PIXEL_INIT.trim() }}
          />
          <Script
            id="snapchat-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: SNAPCHAT_PIXEL_INIT }}
          />
          {TIKTOK_PIXEL_ID && TIKTOK_PIXEL_INIT ? (
            <Script
              id="tiktok-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: TIKTOK_PIXEL_INIT.trim() }}
            />
          ) : null}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      ) : null}

      {analytics ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
