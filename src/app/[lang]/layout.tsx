import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import '../globals.css';
import { getDictionary, type Locale, locales } from '@/lib/i18n';
import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/lib/theme-context';

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
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/images/hero.jpg'],
      locale: params.lang === 'ru' ? 'ru_RU' : params.lang === 'ky' ? 'ky_KG' : 'en_US',
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
      <body className={`${cormorant.variable} ${outfit.variable} font-body text-navy bg-sand antialiased`}>
        <ThemeProvider><AuthProvider>{children}</AuthProvider></ThemeProvider>
      </body>
    </html>
  );
}
