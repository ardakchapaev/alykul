'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { api, type Trip } from '@/lib/api';

const piers = ['Чолпон-Ата', 'Бостери', 'Каракол', 'Тамга'];
const categories = [
  { value: '', label: { ru: 'Все', en: 'All', ky: 'Баары' } },
  { value: 'cruise', label: { ru: 'Круизы', en: 'Cruises', ky: 'Круиздер' } },
  { value: 'charter', label: { ru: 'Чартеры', en: 'Charters', ky: 'Чартерлер' } },
  { value: 'entertainment', label: { ru: 'Развлечения', en: 'Entertainment', ky: 'Көңүл ачуу' } },
  { value: 'kids', label: { ru: 'Детям', en: 'Kids', ky: 'Балдарга' } },
];

const t = {
  ru: { title: 'Поиск рейсов', date: 'Дата', pier: 'Причал', category: 'Категория', guests: 'Гости', search: 'Найти', seats: 'мест', from: 'от', book: 'Забронировать', noTrips: 'Нет рейсов на выбранную дату', loading: 'Загрузка...', allPiers: 'Все причалы', departure: 'Отправление' },
  en: { title: 'Search Trips', date: 'Date', pier: 'Pier', category: 'Category', guests: 'Guests', search: 'Search', seats: 'seats', from: 'from', book: 'Book Now', noTrips: 'No trips for selected date', loading: 'Loading...', allPiers: 'All piers', departure: 'Departure' },
  ky: { title: 'Рейс издөө', date: 'Күнү', pier: 'Причал', category: 'Категория', guests: 'Конокторо', search: 'Издөө', seats: 'орун', from: 'ден', book: 'Брондоо', noTrips: 'Тандалган күнгө рейс жок', loading: 'Жүктөлүүдө...', allPiers: 'Бардык причалдар', departure: 'Жөнөө' },
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
      {/* Header */}
      <div className="bg-navy text-white px-6 md:px-14 py-8">
        <Link href={`/${lang}`} className="text-foam/70 text-sm hover:text-white">&larr; {lang === 'ru' ? 'Главная' : lang === 'ky' ? 'Башкы бет' : 'Home'}</Link>
        <h1 className="font-heading font-bold text-3xl md:text-4xl uppercase mt-4">{labels.title}</h1>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm px-6 md:px-14 py-6 flex flex-wrap gap-4 items-end">
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
          <p className="text-center text-muted py-12">{labels.loading}</p>
        ) : trips.length === 0 ? (
          <p className="text-center text-muted py-12">{labels.noTrips}</p>
        ) : (
          <div className="grid gap-4">
            {trips.map(trip => (
              <Link key={trip.id} href={`/${lang}/trips/${trip.id}`}
                className="bg-white rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-100 hover:shadow-lg hover:border-ocean/20 transition-all">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-ocean uppercase tracking-wider mb-1">{trip.vessel_name}</div>
                  <h3 className="font-bold text-lg">{trip.route_name}</h3>
                </div>
                <div className="flex items-center gap-6 text-sm">
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
