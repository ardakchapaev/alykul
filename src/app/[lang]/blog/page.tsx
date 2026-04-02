'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// TODO: Replace with CMS API
const articles = [
  { id: 1, slug: 'top-5-routes-issyk-kul', title: { ru: 'Топ-5 маршрутов на Иссык-Куле', en: 'Top 5 Routes on Issyk-Kul', ky: 'Ысык-Көлдөгү 5 мыкты маршрут' }, excerpt: { ru: 'Откройте для себя самые живописные водные маршруты по озеру Иссык-Куль — от спокойных закатных круизов до скоростных туров.', en: 'Discover the most scenic water routes across Lake Issyk-Kul — from calm sunset cruises to speed tours.', ky: 'Ысык-Көл боюнча эң кооз суу маршруттарын ачыңыз.' }, image: '/images/scene7.jpg', date: '2026-03-15', category: { ru: 'Маршруты', en: 'Routes', ky: 'Маршруттар' }, readTime: { ru: '5 мин', en: '5 min', ky: '5 мүн' } },
  { id: 2, slug: 'sunset-cruise-guide', title: { ru: 'Гид по закатному круизу', en: 'Sunset Cruise Guide', ky: 'Кечки круиз боюнча гид' }, excerpt: { ru: 'Всё, что нужно знать о закатном круизе из Чолпон-Аты: расписание, маршрут, что взять с собой и лучшие точки для фото.', en: 'Everything you need to know about the sunset cruise from Cholpon-Ata: schedule, route, what to bring and best photo spots.', ky: 'Чолпон-Атадан кечки круиз жөнүндө баарын билиңиз.' }, image: '/images/q02.jpg', date: '2026-03-10', category: { ru: 'Советы', en: 'Tips', ky: 'Кеңештер' }, readTime: { ru: '4 мин', en: '4 min', ky: '4 мүн' } },
  { id: 3, slug: 'safety-on-water', title: { ru: 'Безопасность на воде: что нужно знать', en: 'Water Safety: What You Need to Know', ky: 'Суудагы коопсуздук' }, excerpt: { ru: 'Правила безопасности на борту, наличие спасательного оборудования, погодные условия и рекомендации для семей с детьми.', en: 'Safety rules on board, life-saving equipment, weather conditions and recommendations for families with children.', ky: 'Бортто коопсуздук эрежелери жана үй-бүлөлөр үчүн сунуштар.' }, image: '/images/scene4.jpg', date: '2026-03-05', category: { ru: 'Безопасность', en: 'Safety', ky: 'Коопсуздук' }, readTime: { ru: '6 мин', en: '6 min', ky: '6 мүн' } },
  { id: 4, slug: 'kids-party-yacht', title: { ru: 'Детский праздник на яхте: полный гид', en: 'Kids Party on a Yacht: Complete Guide', ky: 'Яхтадагы балдар майрамы' }, excerpt: { ru: 'Как организовать незабываемый детский день рождения на яхте: программа, меню, безопасность и бюджет.', en: 'How to organize an unforgettable kids birthday on a yacht: program, menu, safety and budget.', ky: 'Яхтада балдардын туулган күнүн кантип уюштуруу керек.' }, image: '/images/kids.jpg', date: '2026-02-28', category: { ru: 'Семьям', en: 'Families', ky: 'Үй-бүлөлөргө' }, readTime: { ru: '7 мин', en: '7 min', ky: '7 мүн' } },
  { id: 5, slug: 'vip-charter-experience', title: { ru: 'VIP-чартер: как провести идеальный вечер', en: 'VIP Charter: How to Have the Perfect Evening', ky: 'VIP-чартер: идеалдуу кечти кантип өткөрүү' }, excerpt: { ru: 'Приватный чартер для особенных случаев — юбилеи, предложения руки и сердца, корпоративы на борту яхты Nomad.', en: 'Private charter for special occasions — anniversaries, proposals, corporate events aboard the Nomad yacht.', ky: 'Атайын учурлар үчүн жеке чартер — юбилейлер, корпоративдер.' }, image: '/images/ep03.jpg', date: '2026-02-20', category: { ru: 'VIP', en: 'VIP', ky: 'VIP' }, readTime: { ru: '5 мин', en: '5 min', ky: '5 мүн' } },
  { id: 6, slug: 'issyk-kul-history', title: { ru: 'История Иссык-Куля: от древности до наших дней', en: 'History of Issyk-Kul: From Ancient Times to Today', ky: 'Ысык-Көлдүн тарыхы' }, excerpt: { ru: 'Легенды затонувших городов, Великий Шёлковый путь, советский курорт и новая эра водного туризма на жемчужине Центральной Азии.', en: 'Legends of sunken cities, the Silk Road, Soviet resort era and the new era of water tourism.', ky: 'Чөгүп кеткен шаарлардын легендалары жана суу туризминин жаңы доору.' }, image: '/images/alykul1.jpg', date: '2026-02-15', category: { ru: 'История', en: 'History', ky: 'Тарых' }, readTime: { ru: '8 мин', en: '8 min', ky: '8 мүн' } },
];

const categoryKeys = ['all', 'routes', 'tips', 'safety', 'families', 'vip', 'history'] as const;

const categoryLabels: Record<string, Record<string, string>> = {
  all: { ru: 'Все', en: 'All', ky: 'Баары' },
  routes: { ru: 'Маршруты', en: 'Routes', ky: 'Маршруттар' },
  tips: { ru: 'Советы', en: 'Tips', ky: 'Кеңештер' },
  safety: { ru: 'Безопасность', en: 'Safety', ky: 'Коопсуздук' },
  families: { ru: 'Семьям', en: 'Families', ky: 'Үй-бүлөлөргө' },
  vip: { ru: 'VIP', en: 'VIP', ky: 'VIP' },
  history: { ru: 'История', en: 'History', ky: 'Тарых' },
};

const categoryMap: Record<string, string> = {
  'Маршруты': 'routes', 'Routes': 'routes', 'Маршруттар': 'routes',
  'Советы': 'tips', 'Tips': 'tips', 'Кеңештер': 'tips',
  'Безопасность': 'safety', 'Safety': 'safety', 'Коопсуздук': 'safety',
  'Семьям': 'families', 'Families': 'families', 'Үй-бүлөлөргө': 'families',
  'VIP': 'vip',
  'История': 'history', 'History': 'history', 'Тарых': 'history',
};

const t = {
  hero: { ru: 'Блог Алыкул', en: 'Alykul Blog', ky: 'Алыкул Блогу' },
  subtitle: { ru: 'Советы, маршруты и истории с озера Иссык-Куль', en: 'Tips, routes and stories from Lake Issyk-Kul', ky: 'Ысык-Көлдөн кеңештер, маршруттар жана окуялар' },
};

export default function BlogPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered = activeFilter === 'all'
    ? articles
    : articles.filter((a) => categoryMap[a.category[lang as keyof typeof a.category] || a.category.ru] === activeFilter);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(lang === 'ky' ? 'ky-KG' : lang === 'en' ? 'en-US' : 'ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#0F2B46] text-white py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{t.hero[lang as keyof typeof t.hero] || t.hero.ru}</h1>
        <p className="text-foam/70 max-w-xl mx-auto">{t.subtitle[lang as keyof typeof t.subtitle] || t.subtitle.ru}</p>
      </section>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1">
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === key
                  ? 'bg-[#0F2B46] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              {categoryLabels[key][lang] || categoryLabels[key].ru}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => {
            const title = article.title[lang as keyof typeof article.title] || article.title.ru;
            const excerpt = article.excerpt[lang as keyof typeof article.excerpt] || article.excerpt.ru;
            const category = article.category[lang as keyof typeof article.category] || article.category.ru;
            const readTime = article.readTime[lang as keyof typeof article.readTime] || article.readTime.ru;

            return (
              <Link
                key={article.id}
                href={`/${lang}/blog/${article.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-full text-[#0F2B46]">
                    {category}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1B7CED] transition-colors line-clamp-2">
                    {title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{formatDate(article.date)}</span>
                    <span>{readTime}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            {lang === 'en' ? 'No articles in this category yet' : lang === 'ky' ? 'Бул категорияда макала жок' : 'В этой категории пока нет статей'}
          </p>
        )}
      </div>
    </div>
  );
}
