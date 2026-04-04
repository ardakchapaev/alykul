'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { api, type Trip } from '@/lib/api';
import { SkeletonCard } from '@/components/Skeleton';
import Breadcrumbs from '@/components/Breadcrumbs';

const piers = ['Чолпон-Ата', 'Бостери', 'Каракол', 'Тамга'];
const categories = [
  { value: '', label: { ru: 'Все', en: 'All', ky: 'Баары' } },
  { value: 'cruise', label: { ru: 'Круизы', en: 'Cruises', ky: 'Круиздер' } },
  { value: 'charter', label: { ru: 'Чартеры', en: 'Charters', ky: 'Чартерлер' } },
  { value: 'entertainment', label: { ru: 'Развлечения', en: 'Entertainment', ky: 'Көңүл ачуу' } },
  { value: 'kids', label: { ru: 'Детям', en: 'Kids', ky: 'Балдарга' } },
];

const t = {
  ru: { title: 'Найти рейс', subtitle: 'Выберите дату, маршрут и забронируйте онлайн', date: 'Дата', pier: 'Причал', category: 'Категория', guests: 'Гости', search: 'Найти', seats: 'мест', from: 'от', book: 'Забронировать', noTrips: 'Нет рейсов на выбранную дату', noTripsHint: 'Попробуйте выбрать другую дату или причал', loading: 'Загрузка...', allPiers: 'Все причалы', departure: 'Отправление', home: 'Главная', backHome: '← Главная' },
  en: { title: 'Find a Trip', subtitle: 'Pick a date, route and book online', date: 'Date', pier: 'Pier', category: 'Category', guests: 'Guests', search: 'Search', seats: 'seats', from: 'from', book: 'Book Now', noTrips: 'No trips for selected date', noTripsHint: 'Try selecting a different date or pier', loading: 'Loading...', allPiers: 'All piers', departure: 'Departure', home: 'Home', backHome: '← Home' },
  ky: { title: 'Рейс табуу', subtitle: 'Күндү тандап, маршрутту тандап, онлайн брондоңуз', date: 'Күнү', pier: 'Причал', category: 'Категория', guests: 'Конокторо', search: 'Издөө', seats: 'орун', from: 'ден', book: 'Брондоо', noTrips: 'Тандалган күнгө рейс жок', noTripsHint: 'Башка күндү же причалды тандап көрүңүз', loading: 'Жүктөлүүдө...', allPiers: 'Бардык причалдар', departure: 'Жөнөө', home: 'Башкы бет', backHome: '← Башкы бет' },
};

export default function TripsPage() {
  const params = useParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;

  const [date, setDate] = useState('2026-07-15');
  const [pier, setPier] = useState('');
  const [category, setCategory] = useState('');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { date_from: date, date_to: date };
      if (pier) params.pier = pier;
      if (category) params.category = category;
      const data = await api.searchTrips(params);
      setTrips(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { search(); }, []);

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString(lang === 'ky' ? 'ru' : lang, { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-sand">
      {/* Hero header */}
      <div
        className="relative text-white px-6 md:px-14 py-16 md:py-24 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/scene7.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/80 via-[#0A1628]/60 to-[#0A1628]/90" />
        <div className="relative z-10">
          <Link href={`/${lang}`} className="text-white/60 text-sm hover:text-white transition-colors">&larr; {labels.backHome}</Link>
          <h1 className="font-heading italic font-bold text-4xl md:text-6xl uppercase mt-4 tracking-tight">{labels.title}</h1>
          <p className="text-white/60 mt-3 text-base md:text-lg max-w-xl">{labels.subtitle}</p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="px-6 md:px-14 pt-4">
        <Breadcrumbs items={[{ label: lang === 'ru' ? 'Рейсы' : lang === 'ky' ? 'Каттамдар' : 'Trips' }]} />
      </div>

      {/* Filters */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 md:p-7 shadow-2xl border border-white/20 -mt-10 mx-4 md:mx-14 relative z-10 mb-8 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-muted mb-1.5">{labels.date}</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 focus:outline-none transition-all" />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-muted mb-1.5">{labels.pier}</label>
          <select value={pier} onChange={e => setPier(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 focus:outline-none transition-all">
            <option value="">{labels.allPiers}</option>
            {piers.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-muted mb-1.5">{labels.category}</label>
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 focus:outline-none transition-all">
            {categories.map(c => <option key={c.value} value={c.value}>{c.label[lang as keyof typeof c.label] || c.label.ru}</option>)}
          </select>
        </div>
        <button onClick={search}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#00897B] to-[#26A69A] text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-[#00897B]/25 transition-all duration-300">
          {labels.search}
        </button>
      </div>

      {/* Results */}
      <div className="px-6 md:px-14 py-8">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-20">
            {/* SVG wave pattern illustration */}
            <div className="mx-auto w-32 h-32 mb-6 text-ocean/20">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M20 65c10-8 20 8 30 0s20-8 30 0 20 8 30 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 75c10-8 20 8 30 0s20-8 30 0 20 8 30 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                <path d="M45 30l15 20 15-20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="60" y1="50" x2="60" y2="62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-muted text-lg font-medium mb-2">{labels.noTrips}</p>
            <p className="text-muted/50 text-sm mb-8 max-w-sm mx-auto">{labels.noTripsHint}</p>
            <Link href={`/${lang}`} className="inline-block px-8 py-3.5 bg-gradient-to-r from-[#00897B] to-[#26A69A] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#00897B]/25 transition-all duration-300">
              {labels.backHome}
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map(trip => (
              <Link key={trip.id} href={`/${lang}/trips/${trip.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-[0_20px_60px_rgba(0,137,123,0.12)] hover:-translate-y-1 transition-all duration-300">
                {/* Image area */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-ocean/30 to-cyan-400/20 group-hover:from-ocean/20 group-hover:to-cyan-300/10 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Price on image */}
                  <div className="absolute bottom-3 left-3 text-white font-bold text-xl drop-shadow-lg">
                    {trip.base_price.toLocaleString()} {trip.currency}
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                    {trip.vessel_name}
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-ocean transition-colors">{trip.route_name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-muted text-xs">{labels.departure}</div>
                        <div className="font-bold">{formatTime(trip.departure_at)}</div>
                      </div>
                      <div>
                        <div className="text-muted text-xs">{labels.seats}</div>
                        <div className="font-bold">{trip.available_seats}</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#00897B] to-[#26A69A] text-white px-5 py-2 rounded-xl font-semibold text-sm whitespace-nowrap group-hover:shadow-lg group-hover:shadow-[#00897B]/25 transition-all duration-300">
                      {labels.book}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
