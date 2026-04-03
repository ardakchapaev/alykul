'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import GalleryLightbox from '@/components/GalleryLightbox';

const photos = [
  { src: '/images/hero.jpg', title: { ru: 'Пляж Чолпон-Аты', en: 'Cholpon-Ata Beach', ky: 'Чолпон-Ата жээги' }, cat: 'nature' },
  { src: '/images/scene1.jpg', title: { ru: 'Утренний рейс', en: 'Morning Voyage', ky: 'Эртеңки рейс' }, cat: 'cruises' },
  { src: '/images/scene2.jpg', title: { ru: 'Вид с палубы', en: 'Deck View', ky: 'Палубадан көрүнүш' }, cat: 'onboard' },
  { src: '/images/scene3.jpg', title: { ru: 'Корпоративный круиз', en: 'Corporate Cruise', ky: 'Корпоративдик круиз' }, cat: 'events' },
  { src: '/images/scene4.jpg', title: { ru: 'Озеро Иссык-Куль', en: 'Lake Issyk-Kul', ky: 'Ысык-Көл' }, cat: 'nature' },
  { src: '/images/scene5.jpg', title: { ru: 'Скоростной катер', en: 'Speedboat', ky: 'Ылдам катер' }, cat: 'fleet' },
  { src: '/images/scene6.jpg', title: { ru: 'Адреналиновый тур', en: 'Adrenaline Tour', ky: 'Адреналин тур' }, cat: 'cruises' },
  { src: '/images/scene7.jpg', title: { ru: 'Горы Тянь-Шаня', en: 'Tian Shan Mountains', ky: 'Тянь-Шань тоолору' }, cat: 'nature' },
  { src: '/images/scene8.jpg', title: { ru: 'Довольные гости', en: 'Happy Guests', ky: 'Ыраазы коноктор' }, cat: 'onboard' },
  { src: '/images/scene9.jpg', title: { ru: 'Свадьба на воде', en: 'Wedding on Water', ky: 'Суудагы үйлөнүү' }, cat: 'events' },
  { src: '/images/scene10.jpg', title: { ru: 'Закатный круиз', en: 'Sunset Cruise', ky: 'Кечки круиз' }, cat: 'cruises' },
  { src: '/images/scene11.jpg', title: { ru: 'Причал Бостери', en: 'Bosteri Pier', ky: 'Бостери причалы' }, cat: 'nature' },
  { src: '/images/q01.jpg', title: { ru: 'Отзыв гостя', en: 'Guest Review', ky: 'Коноктун пикири' }, cat: 'onboard' },
  { src: '/images/q02.jpg', title: { ru: 'Теплоход Алыкул', en: 'Steamship Alykul', ky: 'Алыкул кемеси' }, cat: 'fleet' },
  { src: '/images/ep03.jpg', title: { ru: 'Яхта Nomad', en: 'Yacht Nomad', ky: 'Nomad яхтасы' }, cat: 'fleet' },
  { src: '/images/kids.jpg', title: { ru: 'Детский праздник', en: 'Kids Party', ky: 'Балдар майрамы' }, cat: 'events' },
  { src: '/images/alykul1.jpg', title: { ru: 'Теплоход в порту', en: 'Ship in Port', ky: 'Портто кеме' }, cat: 'fleet' },
  { src: '/images/alykul2.jpg', title: { ru: 'Панорама озера', en: 'Lake Panorama', ky: 'Көл панорамасы' }, cat: 'nature' },
  { src: '/images/promo.jpg', title: { ru: 'День рождения на борту', en: 'Birthday on Board', ky: 'Борттогу туулган күн' }, cat: 'events' },
  { src: '/images/cruise.jpg', title: { ru: 'Вечерний круиз', en: 'Evening Cruise', ky: 'Кечки круиз' }, cat: 'cruises' },
];

const categories = ['all', 'cruises', 'fleet', 'nature', 'events', 'onboard'] as const;
const catLabels: Record<string, Record<string, string>> = {
  all: { ru: 'Все', en: 'All', ky: 'Баары' },
  cruises: { ru: 'Круизы', en: 'Cruises', ky: 'Круиздер' },
  fleet: { ru: 'Флот', en: 'Fleet', ky: 'Флот' },
  nature: { ru: 'Природа', en: 'Nature', ky: 'Жаратылыш' },
  events: { ru: 'Мероприятия', en: 'Events', ky: 'Иш-чаралар' },
  onboard: { ru: 'На борту', en: 'On Board', ky: 'Бортто' },
};

const t = {
  hero: { ru: 'Галерея', en: 'Gallery', ky: 'Галерея' },
  subtitle: { ru: 'Лучшие моменты на озере Иссык-Куль', en: 'Best moments on Lake Issyk-Kul', ky: 'Ысык-Көлдөгү мыкты учурлар' },
  shown: { ru: 'Показано', en: 'Shown', ky: 'Көрсөтүлгөн' },
  of: { ru: 'из', en: 'of', ky: 'ичинен' },
  photos: { ru: 'фото', en: 'photos', ky: 'сүрөт' },
};

export default function GalleryPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';
  const [filter, setFilter] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = filter === 'all' ? photos : photos.filter((p) => p.cat === filter);

  const lightboxImages = filtered.map((p) => ({
    src: p.src,
    alt: p.title[lang as keyof typeof p.title] || p.title.ru,
  }));

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#0F2B46] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-ocean/30 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">{t.hero[lang as keyof typeof t.hero] || t.hero.ru}</h1>
          <p className="text-foam/70 max-w-xl mx-auto">{t.subtitle[lang as keyof typeof t.subtitle] || t.subtitle.ru}</p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Breadcrumbs items={[{ label: t.hero[lang as keyof typeof t.hero] || t.hero.ru }]} />
      </div>

      {/* Filters + Counter */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1">
          {categories.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === key ? 'bg-[#0F2B46] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              {catLabels[key][lang] || catLabels[key].ru}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted whitespace-nowrap">
          {t.shown[lang as keyof typeof t.shown] || t.shown.ru}: {filtered.length} {t.of[lang as keyof typeof t.of] || t.of.ru} {photos.length} {t.photos[lang as keyof typeof t.photos] || t.photos.ru}
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((photo, idx) => {
            const title = photo.title[lang as keyof typeof photo.title] || photo.title.ru;
            const catLabel = catLabels[photo.cat]?.[lang] || catLabels[photo.cat]?.ru || photo.cat;
            const isTall = idx % 3 !== 1;

            return (
              <button
                key={photo.src}
                onClick={() => openLightbox(idx)}
                className="relative group w-full overflow-hidden rounded-xl break-inside-avoid cursor-pointer block"
              >
                <div className={`relative w-full ${isTall ? 'h-[350px]' : 'h-[250px]'}`}>
                  <Image
                    src={photo.src}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-xs font-semibold text-ocean bg-white/90 backdrop-blur px-2.5 py-1 rounded-full self-start mb-2">
                      {catLabel}
                    </span>
                    <h3 className="text-white font-bold text-sm">{title}</h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            {lang === 'en' ? 'No photos in this category' : lang === 'ky' ? 'Бул категорияда сүрөт жок' : 'В этой категории пока нет фото'}
          </p>
        )}
      </div>

      {/* Lightbox */}
      <GalleryLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
