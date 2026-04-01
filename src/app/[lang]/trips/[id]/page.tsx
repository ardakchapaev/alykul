'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { api, type TripDetail } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import SeatMap from '@/components/SeatMap';

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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted">{labels.loading}</div>;
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
      <div className="relative h-[300px] md:h-[400px]">
        <Image src={trip.route.image || trip.vessel.images?.[0] || '/images/hero.jpg'} alt={trip.route[routeNameKey] as string || ''} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 pb-8">
          <Link href={`/${lang}/trips`} className="text-foam/70 text-sm hover:text-white">&larr; {labels.back}</Link>
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-white uppercase mt-2">
            {trip.route[routeNameKey] as string || trip.route.name_ru}
          </h1>
          <p className="text-foam/80 mt-2">{formatDate(trip.departure_at)}</p>
        </div>
      </div>

      <div className="px-6 md:px-14 py-8 grid md:grid-cols-3 gap-8">
        {/* Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-muted uppercase">{labels.departure}</div>
                <div className="font-bold text-2xl text-ocean">{formatTime(trip.departure_at)}</div>
              </div>
              <div>
                <div className="text-xs text-muted uppercase">{labels.duration}</div>
                <div className="font-bold text-2xl">{trip.route.duration_minutes} {labels.min}</div>
              </div>
              <div>
                <div className="text-xs text-muted uppercase">{labels.seats}</div>
                <div className="font-bold text-2xl">{trip.available_seats} / {trip.capacity}</div>
              </div>
              <div>
                <div className="text-xs text-muted uppercase">{labels.pier}</div>
                <div className="font-bold text-lg">{trip.route.departure_pier}</div>
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
            <h3 className="font-bold text-lg mb-3">Что включено</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Спасательные жилеты', 'Страховка', 'Экскурсия от капитана', 'Фото на борту'].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">&#10003;</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation policy */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-lg mb-3">Условия отмены</h3>
            <div className="space-y-2 text-sm text-muted">
              <p>&bull; Бесплатная отмена за 24 часа до отправления</p>
              <p>&bull; Возврат 50% за 12-24 часа до отправления</p>
              <p>&bull; Перенос даты бесплатно за 6+ часов</p>
            </div>
          </div>

          {/* Weather notice */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
            <h3 className="font-bold text-lg mb-2 text-amber-800">&#9925; Погодные условия</h3>
            <p className="text-sm text-amber-700">Рейс может быть отменён при штормовом предупреждении. В этом случае предлагается полный возврат или перенос на другую дату.</p>
          </div>
        </div>

        {/* Booking card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 h-fit sticky top-8">
          <div className="text-center mb-6">
            <div className="text-muted text-sm">{labels.price}</div>
            <div className="font-heading font-bold text-4xl text-ocean">{trip.base_price.toLocaleString()} {trip.currency}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-muted mb-2">{labels.passengers}</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-xl hover:bg-gray-50">−</button>
              <span className="text-2xl font-bold w-12 text-center">{passengers}</span>
              <button onClick={() => setPassengers(Math.min(trip.available_seats, passengers + 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-xl hover:bg-gray-50">+</button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 mb-6">
            <div className="flex justify-between text-lg">
              <span className="font-medium">{labels.total}</span>
              <span className="font-bold text-ocean">{total.toLocaleString()} {trip.currency}</span>
            </div>
          </div>

          <button onClick={handleBook}
            className="w-full py-3.5 bg-ocean text-white rounded-xl font-bold text-lg hover:bg-ocean-dark transition-colors">
            {user ? labels.book : labels.login_first}
          </button>
        </div>
      </div>
    </div>
  );
}
