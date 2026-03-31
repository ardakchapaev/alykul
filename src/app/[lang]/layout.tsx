import type { Metadata } from 'next';
import { Rubik, Roboto_Condensed } from 'next/font/google';
import '../globals.css';
import { getDictionary, type Locale, locales } from '@/lib/i18n';
import { AuthProvider } from '@/lib/auth-context';

const rubik = Rubik({ subsets: ['latin', 'cyrillic'], variable: '--font-rubik' });
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-roboto-condensed',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
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
      <body className={`${rubik.variable} ${robotoCondensed.variable} font-body text-navy bg-sand antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
