export const locales = ['ru', 'en', 'ky'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';

export function getDictionary(locale: Locale) {
  const dictionaries = {
    ru: () => import('@/dictionaries/ru.json').then(m => m.default),
    en: () => import('@/dictionaries/en.json').then(m => m.default),
    ky: () => import('@/dictionaries/ky.json').then(m => m.default),
  };
  return dictionaries[locale]();
}
