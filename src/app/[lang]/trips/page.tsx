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
      <div className="bg-navy text-white px-6 md:px-14 py-10">
        <Link href={`/${lang}`} className="text-foam/70 text-sm hover:text-white">&larr; {labels.backHome}</Link>
        <h1 className="font-heading font-bold text-3xl md:text-4xl uppercase mt-3">{labels.title}</h1>
        <p className="text-foam/70 mt-2 text-sm">{labels.subtitle}</p>
      </div>

      {/* Breadcrumbs */}
      <div className="px-6 md:px-14 pt-4">
        <Breadcrumbs items={[{ label: lang === 'ru' ? 'Рейсы' : lang === 'ky' ? 'Каттамдар' : 'Trips' }]} />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 -mt-2 mx-4 md:mx-14 relative z-10 mb-8 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-muted mb-1">{labels.date}</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-ocean focus:outline-none" />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-muted mb-1">{labels.pier}</label>
          <select value={pier} onChange={e => setPier(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-ocean focus:outline-none">
            <option value="">{labels.allPiers}</option>
            {piers.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-muted mb-1">{labels.category}</label>
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-ocean focus:outline-none">
            {categories.map(c => <option key={c.value} value={c.value}>{c.label[lang as keyof typeof c.label] || c.label.ru}</option>)}
          </select>
        </div>
        <button onClick={search}
          className="px-8 py-2.5 bg-ocean text-white rounded-xl font-semibold text-sm hover:bg-ocean-dark transition-colors">
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
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⛵</div>
            <p className="text-muted text-lg mb-2">{labels.noTrips}</p>
            <p className="text-muted/60 text-sm mb-6">{labels.noTripsHint}</p>
            <Link href={`/${lang}`} className="inline-block px-6 py-3 bg-ocean text-white rounded-xl font-semibold hover:bg-ocean-dark transition-colors">
              {labels.backHome}
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {trips.map(trip => (
              <Link key={trip.id} href={`/${lang}/trips/${trip.id}`}
                className="group bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-100 hover:shadow-lg hover:-translate-y-1 hover:border-ocean/20 transition-all duration-300">
                {/* Colored accent bar */}
                <div className="h-1.5 md:h-auto md:w-1.5 md:self-stretch bg-gradient-to-r md:bg-gradient-to-b from-ocean to-cyan-400 flex-shrink-0" />
                <div className="flex-1 px-5 py-5 md:py-5 md:px-3">
                  <div className="text-xs font-semibold text-ocean uppercase tracking-wider mb-1">⛵ {trip.vessel_name}</div>
                  <h3 className="font-bold text-lg">{trip.route_name}</h3>
                </div>
                <div className="flex items-center gap-6 text-sm px-5 pb-5 md:pb-0 md:pr-5">
                  <div className="text-center">
                    <div className="text-muted text-xs">{labels.departure}</div>
                    <div className="font-bold text-lg">{formatTime(trip.departure_at)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted text-xs">{labels.seats}</div>
                    <div className="font-bold text-lg">{trip.available_seats}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-ocean font-bold text-xl">{trip.base_price.toLocaleString()} {trip.currency}</div>
                  </div>
                  <div className="bg-ocean text-white px-5 py-2 rounded-xl font-semibold text-sm whitespace-nowrap">
                    {labels.book}
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
