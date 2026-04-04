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
  { id: 'mbank', name: 'Mbank', icon: '🏦', desc: 'Мобильный банк' },
  { id: 'optima', name: 'Optima Pay', icon: '💳', desc: 'Банковская карта' },
  { id: 'odengi', name: 'O!Деньги', icon: '📱', desc: 'Электронный кошелёк' },
  { id: 'cash', name: 'Наличные', icon: '💵', desc: 'На причале' },
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
      {/* Header with step indicator */}
      <div className="bg-navy text-white px-6 md:px-14 py-6">
        <Link href={`/${lang}/trips/${tripId}`} className="text-foam/70 text-sm hover:text-white transition-colors">&larr; {labels.back}</Link>
        <h1 className="font-heading font-bold text-2xl md:text-3xl uppercase mt-2">{labels.title}</h1>
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-green-500/30">&#10003;</div>
            <span className="text-white/70 text-sm hidden sm:inline">{labels.trip}</span>
          </div>
          <div className="w-8 h-px bg-white/30" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white text-[#0A1628] flex items-center justify-center text-sm font-bold shadow-lg shadow-white/20">2</div>
            <span className="text-white text-sm font-semibold hidden sm:inline">{labels.payment}</span>
          </div>
          <div className="w-8 h-px bg-white/30" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 text-white/50 flex items-center justify-center text-sm">3</div>
            <span className="text-white/40 text-sm hidden sm:inline">{lang === 'ru' ? 'Билет' : lang === 'ky' ? 'Билет' : 'Ticket'}</span>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-14 py-8 max-w-3xl mx-auto space-y-6">
        {/* Trip summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-gray-500 uppercase text-sm tracking-wide">{labels.trip}</h3>
          <div className="flex gap-4 items-center">
            {/* Route image placeholder */}
            {trip.route.image ? (
              <img src={trip.route.image} alt={routeName} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#00897B]/10 to-[#26A69A]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">&#9978;</span>
              </div>
            )}
            <div className="flex-1 flex justify-between items-center">
              <div>
                <div className="font-bold text-xl">{routeName}</div>
                <div className="text-muted text-sm">{trip.vessel.name} &middot; {trip.route.departure_pier}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-ocean">{formatTime(trip.departure_at)}</div>
                <div className="text-muted text-sm">{formatDate(trip.departure_at)}</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
            <span className="text-muted">{labels.passengers}: <strong className="text-gray-900">{numPassengers}</strong></span>
            <span className="font-bold text-xl text-ocean">{total.toLocaleString()} {trip.currency}</span>
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-gray-500 uppercase text-sm tracking-wide">{labels.payment}</h3>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map(m => (
              <button key={m.id} onClick={() => setPayMethod(m.id)}
                className={`p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                  payMethod === m.id
                    ? 'ring-2 ring-[#00897B] bg-[#00897B]/5 border-[#00897B] shadow-md shadow-[#00897B]/10'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                }`}>
                <span className="text-3xl block">{m.icon}</span>
                <div className="font-semibold mt-2">{m.name}</div>
                <div className="text-muted text-xs mt-0.5">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Promo */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-gray-500 uppercase text-sm tracking-wide">{labels.promo}</h3>
          <div className="flex gap-2">
            <input type="text" value={promo} onChange={e => { setPromo(e.target.value.toUpperCase()); setPromoStatus('idle'); }}
              placeholder="WELCOME10"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-ocean focus:ring-2 focus:ring-ocean/20 focus:outline-none uppercase tracking-wider transition-all" />
            <button onClick={handleApplyPromo} className="px-6 py-3 border-2 border-ocean text-ocean rounded-xl font-semibold hover:bg-ocean hover:text-white transition-all duration-200">
              {labels.apply}
            </button>
          </div>
          {promoStatus === 'valid' && (
            <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <span className="text-green-600 text-lg">&#10003;</span>
              <p className="text-sm text-green-700 font-semibold">
                {lang === 'ru' ? `Скидка ${promoDiscount}% применена!` : lang === 'ky' ? `${promoDiscount}% арзандатуу колдонулду!` : `${promoDiscount}% discount applied!`}
              </p>
            </div>
          )}
          {promoStatus === 'invalid' && (
            <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <span className="text-red-500 text-lg">&#10007;</span>
              <p className="text-sm text-red-600 font-medium">
                {lang === 'ru' ? 'Промокод не найден' : lang === 'ky' ? 'Промокод табылган жок' : 'Promo code not found'}
              </p>
            </div>
          )}
        </div>

        {/* Total with discount */}
        {promoDiscount > 0 && (
          <div className="bg-green-50 rounded-2xl p-5 border border-green-200 flex items-center justify-between">
            <span className="text-green-700 font-semibold text-lg">{lang === 'ru' ? 'Скидка' : lang === 'ky' ? 'Арзандатуу' : 'Discount'} {promoDiscount}%</span>
            <div className="text-right">
              <span className="text-muted line-through text-sm mr-3">{total.toLocaleString()} {trip.currency}</span>
              <span className="text-green-700 font-bold text-2xl">{discountedTotal.toLocaleString()} {trip.currency}</span>
            </div>
          </div>
        )}

        {/* Total separator */}
        <div className="border-t-2 border-dashed border-gray-200 pt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-600">{labels.total}</span>
          <span className="font-bold text-2xl text-gray-900">{discountedTotal.toLocaleString()} {trip.currency}</span>
        </div>

        {/* Pay button */}
        <button onClick={handlePay} disabled={submitting}
          className="w-full py-4 bg-gradient-to-r from-[#00897B] to-[#26A69A] text-white rounded-2xl font-bold text-xl hover:shadow-lg hover:shadow-[#00897B]/30 hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3">
          {submitting ? labels.processing : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              {labels.pay} {discountedTotal.toLocaleString()} {trip.currency}
            </>
          )}
        </button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pb-4">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            SSL
          </span>
          <span className="w-px h-3 bg-gray-300" />
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
            PCI DSS
          </span>
          <span className="w-px h-3 bg-gray-300" />
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            {lang === 'ru' ? 'Возврат' : lang === 'ky' ? 'Кайтаруу' : 'Refund'}
          </span>
        </div>
      </div>
    </div>
  );
}
