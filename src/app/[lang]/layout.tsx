import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit, Playfair_Display, Inter } from 'next/font/google';
import '../globals.css';
import { getDictionary, type Locale, locales } from '@/lib/i18n';
import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/lib/theme-context';
import PwaInstall from '@/components/PwaInstall';
import Analytics from '@/components/Analytics';
import PageTracker from '@/components/PageTracker';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import ScrollProgress from '@/components/ScrollProgress';
import { OrganizationJsonLd } from '@/components/JsonLd';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BookingBanner from '@/components/BookingBanner';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
});
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600'],
});
const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
});

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return {
    metadataBase: new URL('https://alykul.baimuras.pro'),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: 'Иссык-Куль, круиз, яхта, бронирование, водный туризм, Чолпон-Ата, Бостери, Алыкул',
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: 'Алыкул — Озеро Иссык-Куль' }],
      locale: params.lang === 'ru' ? 'ru_RU' : params.lang === 'ky' ? 'ky_KG' : 'en_US',
      type: 'website',
      siteName: 'Алыкул',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/images/hero.jpg'],
    },
    alternates: {
      canonical: `https://alykul.baimuras.pro/${params.lang}`,
      languages: { ru: '/ru', en: '/en', ky: '/ky' },
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/images/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'Алыкул',
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className={`${cormorant.variable} ${outfit.variable} ${playfair.variable} ${inter.variable} font-body text-navy bg-sand antialiased`}>
        <ThemeProvider><AuthProvider>{children}</AuthProvider></ThemeProvider>
        <PwaInstall />
        <Analytics />
        <PageTracker />
        <ScrollToTop />
        <CookieConsent />
        <KeyboardShortcuts />
        <ScrollProgress />
        <OrganizationJsonLd />
        <WhatsAppFloat />
        <BookingBanner />
      </body>
    </html>
  );
}
