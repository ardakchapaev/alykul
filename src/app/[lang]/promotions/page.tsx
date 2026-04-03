'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';

const t = {
  ru: {
    hero: 'Акции и спецпредложения',
    heroSub: 'Лучшие предложения для незабываемого отдыха на Иссык-Куле',
    active: 'Активные акции',
    expired: 'Завершённые акции',
    promo: 'Промокод',
    copied: 'Скопировано!',
    until: 'Действует до',
    book: 'Забронировать',
    subscribe: 'Подпишитесь на акции',
    subscribeSub: 'Будьте первыми, кто узнает о новых скидках и спецпредложениях',
    email: 'Ваш email',
    subscribeBtn: 'Подписаться',
    showExpired: 'Показать завершённые',
    hideExpired: 'Скрыть завершённые',
    ended: 'Завершена',
  },
  en: {
    hero: 'Promotions & Special Offers',
    heroSub: 'Best deals for an unforgettable vacation on Issyk-Kul',
    active: 'Active Promotions',
    expired: 'Past Promotions',
    promo: 'Promo code',
    copied: 'Copied!',
    until: 'Valid until',
    book: 'Book Now',
    subscribe: 'Subscribe to Offers',
    subscribeSub: 'Be the first to know about new discounts and special offers',
    email: 'Your email',
    subscribeBtn: 'Subscribe',
    showExpired: 'Show past promotions',
    hideExpired: 'Hide past promotions',
    ended: 'Ended',
  },
  ky: {
    hero: 'Акциялар жана атайын сунуштар',
    heroSub: 'Ысык-Көлдө унутулгус эс алуу үчүн мыкты сунуштар',
    active: 'Активдүү акциялар',
    expired: 'Бүткөн акциялар',
    promo: 'Промокод',
    copied: 'Көчүрүлдү!',
    until: 'Чейин жарактуу',
    book: 'Брондоо',
    subscribe: 'Акцияларга жазылыңыз',
    subscribeSub: 'Жаңы арзандатуулар жөнүндө биринчи болуп билиңиз',
    email: 'Сиздин email',
    subscribeBtn: 'Жазылуу',
    showExpired: 'Бүткөн акцияларды көрсөтүү',
    hideExpired: 'Бүткөн акцияларды жашыруу',
    ended: 'Бүттү',
  },
};

interface Promo {
  id: number;
  title: { ru: string; en: string; ky: string };
  description: { ru: string; en: string; ky: string };
  code: string | null;
  image: string;
  expiry: string;
  active: boolean;
}

const promotions: Promo[] = [
  {
    id: 1,
    title: { ru: 'Раннее бронирование', en: 'Early Booking', ky: 'Эрте брондоо' },
    description: {
      ru: 'Скидка 20% при бронировании за 7+ дней до отправления. Планируйте заранее и экономьте!',
      en: '20% off when booking 7+ days in advance. Plan ahead and save!',
      ky: 'Жөнөөгө 7+ күн мурун брондогондо 20% арзандатуу. Алдын ала пландаңыз!',
    },
    code: 'EARLY20',
    image: '/images/scene7.jpg',
    expiry: '2026-06-01',
    active: true,
  },
  {
    id: 2,
    title: { ru: 'Семейный пакет', en: 'Family Package', ky: 'Үй-бүлөлүк пакет' },
    description: {
      ru: 'Дети до 12 лет — скидка 50%. 4 места по цене 3. Идеально для семейного отдыха!',
      en: 'Kids under 12 — 50% off. 4 seats for the price of 3. Perfect for family trips!',
      ky: '12 жашка чейинки балдарга 50% арзандатуу. 3түн баасына 4 орун. Үй-бүлөлүк эс алуу үчүн!',
    },
    code: 'FAMILY',
    image: '/images/kids.jpg',
    expiry: '2026-08-31',
    active: true,
  },
  {
    id: 3,
    title: { ru: 'Закатный VIP', en: 'Sunset VIP', ky: 'Кечки VIP' },
    description: {
      ru: 'Приватный стол + шампанское на закатном круизе. Премиальный вечер на яхте за +2,000 KGS к базовой цене.',
      en: 'Private table + champagne on sunset cruise. Premium yacht evening for +2,000 KGS on top of base price.',
      ky: 'Жеке стол + шампанское кечки круизде. Яхтада премиум кеч +2,000 KGS базалык баага кошумча.',
    },
    code: null,
    image: '/images/q02.jpg',
    expiry: '2026-09-15',
    active: true,
  },
  {
    id: 4,
    title: { ru: 'Приведи друга', en: 'Refer a Friend', ky: 'Досуңду алып кел' },
    description: {
      ru: '500 баллов за каждого друга, который совершит бронирование. Накапливайте баллы и получайте скидки!',
      en: '500 points for every friend who books. Collect points and get discounts!',
      ky: 'Брондогон ар бир досуңуз үчүн 500 балл. Балл чогултуп, арзандатуу алыңыз!',
    },
    code: 'FRIEND500',
    image: '/images/promo.jpg',
    expiry: '2026-12-31',
    active: true,
  },
  {
    id: 5,
    title: { ru: 'Новогодний круиз', en: 'New Year Cruise', ky: 'Жаңы жылдык круиз' },
    description: {
      ru: 'Специальный новогодний рейс с праздничным ужином и фейерверком на воде.',
      en: 'Special New Year cruise with festive dinner and fireworks on the water.',
      ky: 'Майрамдык кечки тамак жана суудагы фейерверк менен атайын Жаңы жылдык круиз.',
    },
    code: 'NY2026',
    image: '/images/scene3.jpg',
    expiry: '2026-01-05',
    active: false,
  },
  {
    id: 6,
    title: { ru: 'Мартовская распродажа', en: 'March Sale', ky: 'Март сатуу' },
    description: {
      ru: 'Скидка 15% на все рейсы в марте. Открытие сезона!',
      en: '15% off all trips in March. Season opening!',
      ky: 'Мартта бардык каттамдарга 15% арзандатуу. Сезондун ачылышы!',
    },
    code: 'MARCH15',
    image: '/images/scene5.jpg',
    expiry: '2026-03-31',
    active: false,
  },
];

export default function PromotionsPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;

  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showExpired, setShowExpired] = useState(false);
  const [email, setEmail] = useState('');

  const activePromos = promotions.filter((p) => p.active);
  const expiredPromos = promotions.filter((p) => !p.active);

  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatExpiry = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(
      lang === 'ky' ? 'ky-KG' : lang === 'en' ? 'en-US' : 'ru-RU',
      { day: 'numeric', month: 'long', year: 'numeric' },
    );

  return (
    <div className="min-h-screen bg-sand">
      {/* Hero */}
      <section className="relative h-[300px] md:h-[380px] overflow-hidden">
        <Image src="/images/scene7.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 pb-10">
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-white">
            {labels.hero}
          </h1>
          <p className="text-foam/80 mt-2 max-w-xl">{labels.heroSub}</p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 pt-4">
        <Breadcrumbs
          items={[
            { label: lang === 'ru' ? 'Главная' : lang === 'ky' ? 'Башкы бет' : 'Home', href: `/${lang}` },
            { label: labels.hero },
          ]}
        />
      </div>

      {/* Active Promotions */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-navy mb-6">{labels.active}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {activePromos.map((promo) => {
            const title = promo.title[lang as keyof typeof promo.title] || promo.title.ru;
            const desc = promo.description[lang as keyof typeof promo.description] || promo.description.ru;
            return (
              <div key={promo.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 md:h-56">
                  <Image src={promo.image} alt={title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-2">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>

                  {promo.code && (
                    <div className="mb-4">
                      <span className="text-xs text-muted uppercase tracking-wide">{labels.promo}:</span>
                      <button
                        onClick={() => handleCopyCode(promo.id, promo.code!)}
                        className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-dashed border-ocean/40 rounded-lg text-ocean font-mono font-bold text-sm hover:border-ocean hover:bg-ocean/5 transition-colors"
                      >
                        {promo.code}
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {copiedId === promo.id && (
                          <span className="text-green-600 text-xs font-sans">{labels.copied}</span>
                        )}
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">
                      {labels.until} {formatExpiry(promo.expiry)}
                    </span>
                    <Link
                      href={`/${lang}/trips`}
                      className="inline-block bg-ocean text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-ocean-dark transition-colors"
                    >
                      {labels.book}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Subscribe */}
      <section className="bg-navy text-white py-12 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">{labels.subscribe}</h2>
          <p className="text-foam/70 text-sm mb-6">{labels.subscribeSub}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail('');
            }}
            className="flex gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={labels.email}
              className="flex-1 px-4 py-3 rounded-xl text-navy text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-ocean text-white rounded-xl font-medium text-sm hover:bg-ocean-dark transition-colors whitespace-nowrap"
            >
              {labels.subscribeBtn}
            </button>
          </form>
        </div>
      </section>

      {/* Expired Promotions */}
      {expiredPromos.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-10">
          <button
            onClick={() => setShowExpired(!showExpired)}
            className="flex items-center gap-2 text-muted text-sm hover:text-navy transition-colors mb-4"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showExpired ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {showExpired ? labels.hideExpired : labels.showExpired}
          </button>

          {showExpired && (
            <div className="grid md:grid-cols-2 gap-6 opacity-60">
              {expiredPromos.map((promo) => {
                const title = promo.title[lang as keyof typeof promo.title] || promo.title.ru;
                const desc = promo.description[lang as keyof typeof promo.description] || promo.description.ru;
                return (
                  <div key={promo.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 grayscale">
                    <div className="relative h-40">
                      <Image src={promo.image} alt={title} fill className="object-cover" />
                      <div className="absolute top-3 right-3 bg-gray-800/80 text-white text-xs px-3 py-1 rounded-full">
                        {labels.ended}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-navy mb-1">{title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
