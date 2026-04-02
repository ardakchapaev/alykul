'use client';

import { Suspense, useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api, type TripDetail } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

const t = {
  ru: { title: 'Оформление', back: 'Назад', trip: 'Рейс', passengers: 'Гости', total: 'Итого', payment: 'Способ оплаты', promo: 'Промокод', apply: 'Применить', pay: 'Оплатить', processing: 'Обработка...', loading: 'Загрузка...', login: 'Необходимо войти', departure: 'Отправление' },
  en: { title: 'Checkout', back: 'Back', trip: 'Trip', passengers: 'Guests', total: 'Total', payment: 'Payment method', promo: 'Promo code', apply: 'Apply', pay: 'Pay', processing: 'Processing...', loading: 'Loading...', login: 'Please sign in', departure: 'Departure' },
  ky: { title: 'Тапшырык', back: 'Артка', trip: 'Рейс', passengers: 'Конокторо', total: 'Жалпы', payment: 'Төлөм ыкмасы', promo: 'Промокод', apply: 'Колдонуу', pay: 'Төлөө', processing: 'Иштетилүүдө...', loading: 'Жүктөлүүдө...', login: 'Кирүү керек', departure: 'Жөнөө' },
};

const paymentMethods = [
  { id: 'mbank', name: 'Mbank', icon: '🏦' },
  { id: 'optima', name: 'Optima Pay', icon: '💳' },
  { id: 'odengi', name: 'O!Деньги', icon: '📱' },
  { id: 'cash', name: 'Наличные', icon: '💵' },
];

export default function CheckoutPage() {
  return <Suspense><CheckoutInner /></Suspense>;
}

function CheckoutInner() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;
  const { user, token } = useAuth();

  const tripId = Number(searchParams.get('trip'));
  const numPassengers = Number(searchParams.get('passengers')) || 1;

  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [payMethod, setPayMethod] = useState('mbank');
  const [promo, setPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoStatus, setPromoStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!tripId) return;
    api.getTrip(tripId).then(setTrip).catch(console.error).finally(() => setLoading(false));
  }, [tripId]);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${lang}/auth?redirect=/${lang}/checkout?trip=${tripId}&passengers=${numPassengers}`);
    }
  }, [loading, user, lang, tripId, numPassengers, router]);

  const handlePay = async () => {
    if (!token || !tripId) return;
    setSubmitting(true);
    try {
      const booking = await api.createBooking(token, {
        trip_id: tripId,
        num_passengers: numPassengers,
        payment_method: payMethod,
        promo_code: promo || undefined,
      });
      router.push(`/${lang}/booking-confirmed?id=${booking.id}&qr=${booking.qr_token}`);
    } catch (e: unknown) {
      alert((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted">{labels.loading}</div>;
  if (!trip) return <div className="min-h-screen flex items-center justify-center text-muted">Trip not found</div>;

  const handleApplyPromo = () => {
    // Client-side validation of known promo codes
    // TODO: Replace with API call to /promo-codes/validate
    const codes: Record<string, number> = {
      'WELCOME10': 10,
      'SUMMER20': 20,
      'ALYKUL15': 15,
      'VIP30': 30,
      'FIRST50': 50,
    };
    const discount = codes[promo.toUpperCase()];
    if (discount) {
      setPromoDiscount(discount);
      setPromoStatus('valid');
    } else {
      setPromoDiscount(0);
      setPromoStatus('invalid');
    }
  };

  const total = trip.base_price * numPassengers;
  const discountedTotal = promoDiscount > 0 ? total - (total * promoDiscount / 100) : total;
  const routeName = (trip.route[`name_${lang}` as keyof typeof trip.route] as string) || trip.route.name_ru;
  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString(lang === 'ky' ? 'ru' : lang, { hour: '2-digit', minute: '2-digit' });
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString(lang === 'ky' ? 'ru' : lang, { day: 'numeric', month: 'long' });

  return (
    <div className="min-h-screen bg-sand">
      <div className="bg-navy text-white px-6 md:px-14 py-6">
        <Link href={`/${lang}/trips/${tripId}`} className="text-foam/70 text-sm hover:text-white">&larr; {labels.back}</Link>
        <h1 className="font-heading font-bold text-2xl md:text-3xl uppercase mt-2">{labels.title}</h1>
      </div>

      <div className="px-6 md:px-14 py-8 max-w-3xl mx-auto space-y-6">
        {/* Trip summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4">{labels.trip}</h3>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold text-xl">{routeName}</div>
              <div className="text-muted text-sm">{trip.vessel.name} · {trip.route.departure_pier}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-xl text-ocean">{formatTime(trip.departure_at)}</div>
              <div className="text-muted text-sm">{formatDate(trip.departure_at)}</div>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between">
            <span>{labels.passengers}: <strong>{numPassengers}</strong></span>
            <span className="font-bold text-xl text-ocean">{total.toLocaleString()} {trip.currency}</span>
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4">{labels.payment}</h3>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map(m => (
              <button key={m.id} onClick={() => setPayMethod(m.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  payMethod === m.id ? 'border-ocean bg-ocean/5' : 'border-gray-100 hover:border-gray-200'
                }`}>
                <span className="text-2xl">{m.icon}</span>
                <div className="font-semibold mt-1">{m.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Promo */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-4">{labels.promo}</h3>
          <div className="flex gap-3">
            <input type="text" value={promo} onChange={e => { setPromo(e.target.value.toUpperCase()); setPromoStatus('idle'); }}
              placeholder="WELCOME10"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-ocean focus:outline-none uppercase tracking-wider" />
            <button onClick={handleApplyPromo} className="px-6 py-3 border border-ocean text-ocean rounded-xl font-semibold hover:bg-ocean/5">
              {labels.apply}
            </button>
          </div>
          {promoStatus === 'valid' && (
            <p className="mt-3 text-sm text-green-600 font-medium">
              {lang === 'ru' ? `Скидка ${promoDiscount}% применена!` : lang === 'ky' ? `${promoDiscount}% арзандатуу колдонулду!` : `${promoDiscount}% discount applied!`}
            </p>
          )}
          {promoStatus === 'invalid' && (
            <p className="mt-3 text-sm text-red-500 font-medium">
              {lang === 'ru' ? 'Промокод не найден' : lang === 'ky' ? 'Промокод табылган жок' : 'Promo code not found'}
            </p>
          )}
        </div>

        {/* Total with discount */}
        {promoDiscount > 0 && (
          <div className="bg-green-50 rounded-2xl p-4 border border-green-100 flex items-center justify-between">
            <span className="text-green-700 font-medium">{lang === 'ru' ? 'Скидка' : lang === 'ky' ? 'Арзандатуу' : 'Discount'} {promoDiscount}%</span>
            <div className="text-right">
              <span className="text-muted line-through text-sm mr-2">{total.toLocaleString()} {trip.currency}</span>
              <span className="text-green-700 font-bold text-xl">{discountedTotal.toLocaleString()} {trip.currency}</span>
            </div>
          </div>
        )}

        {/* Pay button */}
        <button onClick={handlePay} disabled={submitting}
          className="w-full py-4 bg-ocean text-white rounded-2xl font-bold text-xl hover:bg-ocean-dark transition-colors disabled:opacity-50">
          {submitting ? labels.processing : `${labels.pay} ${discountedTotal.toLocaleString()} ${trip.currency}`}
        </button>
      </div>
    </div>
  );
}
