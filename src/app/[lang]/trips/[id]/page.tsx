'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { api, type TripDetail } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import SeatMap from '@/components/SeatMap';
import WeatherWidget from '@/components/WeatherWidget';
import { SkeletonHero, SkeletonList } from '@/components/Skeleton';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import TravelInfo from '@/components/TravelInfo';

const t = {
  ru: { back: 'Назад к рейсам', departure: 'Отправление', duration: 'Длительность', min: 'мин', seats: 'Свободных мест', price: 'Цена за место', passengers: 'Количество гостей', total: 'Итого', book: 'Забронировать', login_first: 'Войдите чтобы забронировать', vessel: 'Судно', route: 'Маршрут', pier: 'Причал', loading: 'Загрузка...', seats_title: 'Выбор мест' },
  en: { back: 'Back to trips', departure: 'Departure', duration: 'Duration', min: 'min', seats: 'Available seats', price: 'Price per seat', passengers: 'Number of guests', total: 'Total', book: 'Book Now', login_first: 'Sign in to book', vessel: 'Vessel', route: 'Route', pier: 'Pier', loading: 'Loading...', seats_title: 'Select seats' },
  ky: { back: 'Рейстерге кайтуу', departure: 'Жөнөө', duration: 'Узактыгы', min: 'мүн', seats: 'Бош орундар', price: 'Орун баасы', passengers: 'Конок саны', total: 'Жалпы', book: 'Брондоо', login_first: 'Брондоо үчүн кириңиз', vessel: 'Кеме', route: 'Маршрут', pier: 'Причал', loading: 'Жүктөлүүдө...', seats_title: 'Орун тандоо' },
};

export default function TripPage() {
  const params = useParams();
  const router = useRouter();
  const lang = (params.lang as string) || 'ru';
  const tripId = Number(params.id);
  const labels = t[lang as keyof typeof t] || t.ru;
  const { user, token } = useAuth();

  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  useEffect(() => {
    api.getTrip(tripId).then(setTrip).catch(console.error).finally(() => setLoading(false));
  }, [tripId]);

  if (loading) return <div className="min-h-screen bg-sand"><SkeletonHero /><div className="px-6 py-8"><SkeletonList count={2} /></div></div>;
  if (!trip) return <div className="min-h-screen flex items-center justify-center text-muted">Trip not found</div>;

  const total = trip.base_price * passengers;
  const descKey = `description_${lang}` as keyof typeof trip.vessel;
  const routeNameKey = `name_${lang}` as keyof typeof trip.route;

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString(lang === 'ky' ? 'ru' : lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString(lang === 'ky' ? 'ru' : lang, { hour: '2-digit', minute: '2-digit' });

  const handleSeatToggle = (seatId: number) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) return prev.filter(s => s !== seatId);
      if (prev.length >= passengers) return [...prev.slice(1), seatId];
      return [...prev, seatId];
    });
  };

  const handleBook = () => {
    if (!user || !token) {
      router.push(`/${lang}/auth?redirect=/${lang}/checkout?trip=${tripId}&passengers=${passengers}`);
      return;
    }
    router.push(`/${lang}/checkout?trip=${tripId}&passengers=${passengers}`);
  };

  return (
    <div className="min-h-screen bg-sand">
      {/* Hero */}
      <div className="relative h-[350px] md:h-[450px]">
        <Image src={trip.route.image || trip.vessel.images?.[0] || '/images/hero.jpg'} alt={trip.route[routeNameKey] as string || ''} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 pb-10">
          <Link href={`/${lang}/trips`} className="text-white/70 text-sm hover:text-white transition-colors">&larr; {labels.back}</Link>
          <h1 className="font-heading italic font-bold text-3xl md:text-5xl text-white uppercase mt-3 tracking-tight">
            {trip.route[routeNameKey] as string || trip.route.name_ru}
          </h1>
          <p className="text-white/70 mt-2 text-lg">{formatDate(trip.departure_at)}</p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="px-6 md:px-14 pt-4">
        <Breadcrumbs items={[
          { label: lang === 'ru' ? 'Рейсы' : lang === 'ky' ? 'Каттамдар' : 'Trips', href: `/${lang}/trips` },
          { label: (trip.route[routeNameKey] as string) || trip.route.name_ru }
        ]} />
      </div>

      <div className="px-6 md:px-14 py-8 grid md:grid-cols-3 gap-8">
        {/* Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-ocean/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <div className="text-xs text-muted uppercase">{labels.departure}</div>
                  <div className="font-bold text-2xl text-ocean">{formatTime(trip.departure_at)}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-ocean/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div>
                  <div className="text-xs text-muted uppercase">{labels.duration}</div>
                  <div className="font-bold text-2xl">{trip.route.duration_minutes} {labels.min}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-ocean/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                </div>
                <div>
                  <div className="text-xs text-muted uppercase">{labels.seats}</div>
                  <div className="font-bold text-2xl">{trip.available_seats} / {trip.capacity}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-ocean/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div className="text-xs text-muted uppercase">{labels.pier}</div>
                  <div className="font-bold text-lg">{trip.route.departure_pier}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Vessel */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-lg mb-3">{labels.vessel}: {trip.vessel.name}</h3>
            <p className="text-muted text-sm leading-relaxed">{(trip.vessel[descKey] as string) || trip.vessel.description_ru}</p>
            {trip.vessel.specs && (
              <div className="flex flex-wrap gap-2 mt-4">
                {Object.entries(trip.vessel.specs).map(([k, v]) => (
                  <span key={k} className="text-xs bg-foam text-ocean px-3 py-1 rounded-md font-medium">
                    {k}: {String(v)}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Seat Map */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-lg mb-4">{labels.seats_title}</h3>
            <SeatMap
              vesselType={trip.vessel.vessel_type}
              capacity={trip.capacity}
              availableSeats={trip.available_seats}
              selectedSeats={selectedSeats}
              onSelectSeat={handleSeatToggle}
            />
            {selectedSeats.length > 0 && (
              <div className="mt-4 text-sm text-muted">
                Выбрано мест: {selectedSeats.join(', ')}
              </div>
            )}
          </div>

          {/* Route details */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Что включено</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Спасательные жилеты', 'Страховка', 'Экскурсия от капитана', 'Фото на борту'].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation policy */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Условия отмены</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                <span className="text-muted">Бесплатная отмена за <span className="font-semibold text-green-700">24+ часа</span> до отправления</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span className="text-muted">Возврат 50% за <span className="font-semibold text-amber-700">12-24 часа</span> до отправления</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                <span className="text-muted">Перенос даты бесплатно за <span className="font-semibold text-red-700">менее 12 часов</span></span>
              </div>
            </div>
          </div>

          {/* Weather widget */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 border-l-4 border-l-[#00897B]">
            <h3 className="font-bold text-lg mb-3">{lang === 'ru' ? 'Погода на Иссык-Куле' : 'Weather at Issyk-Kul'}</h3>
            <WeatherWidget variant="light" lang={lang} />
          </div>

          {/* Travel Info — for international tourists */}
          {lang !== 'ru' && <TravelInfo lang={lang} />}

          {/* Weather notice */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
            <h3 className="font-bold text-lg mb-2 text-amber-800">&#9925; Погодные условия</h3>
            <p className="text-sm text-amber-700">Рейс может быть отменён при штормовом предупреждении. В этом случае предлагается полный возврат или перенос на другую дату.</p>
          </div>
        </div>

        {/* Booking card */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 h-fit sticky top-8 shadow-lg shadow-black/5">
          <div className="h-1 bg-gradient-to-r from-[#00897B] to-[#26A69A]" />
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-muted text-sm mb-1">{labels.price}</div>
              <div className="font-heading font-bold text-5xl text-ocean">{trip.base_price.toLocaleString()}</div>
              <div className="text-muted text-sm mt-1">{trip.currency}</div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-muted mb-3">{labels.passengers}</label>
              <div className="flex items-center gap-3 bg-[#F4F8FB] rounded-xl p-2 justify-center">
                <button onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="w-12 h-12 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-xl font-medium hover:bg-gray-50 hover:border-[#00897B]/30 transition-all">−</button>
                <span className="text-3xl font-bold w-16 text-center">{passengers}</span>
                <button onClick={() => setPassengers(Math.min(trip.available_seats, passengers + 1))}
                  className="w-12 h-12 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-xl font-medium hover:bg-gray-50 hover:border-[#00897B]/30 transition-all">+</button>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">{labels.total}</span>
                <span className="font-bold text-2xl text-ocean">{total.toLocaleString()} {trip.currency}</span>
              </div>
            </div>

            <button onClick={handleBook}
              className="w-full py-4 bg-gradient-to-r from-[#00897B] to-[#26A69A] text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#00897B]/25 hover:-translate-y-0.5 transition-all duration-300">
              {user ? labels.book : labels.login_first}
            </button>

            {/* Share */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-muted">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              <ShareButtons title={(trip.route[routeNameKey] as string) || trip.route.name_ru} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
