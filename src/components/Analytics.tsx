'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    ym: (id: number, method: string, ...args: unknown[]) => void;
  }
}

// Google Analytics
const GA_ID = 'G-FL381XVG1L';
// Yandex Metrika
const YM_ID = '00000000'; // TODO: Replace with real Yandex Metrika counter ID

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, { event_category: category, event_label: label, value });
  }
}

// Pre-defined events for Alykul
export const AlykulEvents = {
  bookingStarted: (tripId: number) => trackEvent('booking_started', 'commerce', `trip_${tripId}`),
  bookingCompleted: (bookingId: number, amount: number) => trackEvent('purchase', 'commerce', `booking_${bookingId}`, amount),
  tripSearched: (pier: string, date: string) => trackEvent('search', 'engagement', `${pier}_${date}`),
  themeChanged: (theme: string) => trackEvent('theme_changed', 'ui', theme),
  languageChanged: (lang: string) => trackEvent('language_changed', 'ui', lang),
  chatOpened: () => trackEvent('chat_opened', 'engagement'),
  pwaInstalled: () => trackEvent('pwa_installed', 'engagement'),
};

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Load GA script
    if (typeof window !== 'undefined' && GA_ID) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: unknown[]) => { window.dataLayer.push(args); };
      gtag('js', new Date());
      gtag('config', GA_ID);
      window.gtag = gtag;
    }

    // Load Yandex Metrika
    if (typeof window !== 'undefined' && YM_ID !== '00000000') {
      const ymScript = document.createElement('script');
      ymScript.type = 'text/javascript';
      ymScript.async = true;
      ymScript.src = 'https://mc.yandex.ru/metrika/tag.js';
      document.head.appendChild(ymScript);

      ymScript.onload = () => {
        try {
          // @ts-expect-error YM global init
          window.ym = new Ya.Metrika2({ id: Number(YM_ID), clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
        } catch { /* ignore */ }
      };
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // GA pageview
      if (window.gtag && GA_ID) {
        window.gtag('config', GA_ID, { page_path: pathname });
      }
      // YM pageview
      if (window.ym && YM_ID !== '00000000') {
        window.ym(Number(YM_ID), 'hit', pathname);
      }
    }
  }, [pathname]);

  return null; // No visual output
}
