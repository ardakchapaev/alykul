'use client';

import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1';

const t = {
  ru: {
    title: 'Оплата', back: 'Назад к оформлению', summary: 'Детали заказа', trip: 'Рейс', amount: 'Сумма', method: 'Способ оплаты',
    secure: 'Безопасная оплата', encrypted: 'Данные защищены шифрованием',
    phone: 'Номер телефона', confirm: 'Подтвердить оплату', processing: 'Обработка платежа...',
    cardNumber: 'Номер карты', expiry: 'Срок', cvv: 'CVV', payCard: 'Оплатить картой',
    qrTitle: 'Отсканируйте QR-код', qrHint: 'Откройте приложение банка и отсканируйте код',
    cashTitle: 'Оплата наличными', cashHint: 'Оплатите на причале при посадке', cashRef: 'Номер бронирования',
    expires: 'Оплата истечёт через', success: 'Оплата прошла успешно!', redirecting: 'Перенаправляем...',
    invalidCard: 'Неверный номер карты', invalidExpiry: 'Неверный срок', invalidCvv: 'Неверный CVV',
    cancel: 'Отменить', loading: 'Загрузка...',
    methods: { mbank: 'Mbank', optima: 'Optima Pay', odengi: 'O!Деньги', visa: 'Visa / Mastercard', qr: 'QR-код', cash: 'Наличные' },
  },
  en: {
    title: 'Payment', back: 'Back to checkout', summary: 'Order details', trip: 'Trip', amount: 'Amount', method: 'Payment method',
    secure: 'Secure payment', encrypted: 'Data protected by encryption',
    phone: 'Phone number', confirm: 'Confirm Payment', processing: 'Processing payment...',
    cardNumber: 'Card number', expiry: 'Expiry', cvv: 'CVV', payCard: 'Pay with card',
    qrTitle: 'Scan QR code', qrHint: 'Open your banking app and scan the code',
    cashTitle: 'Cash payment', cashHint: 'Pay at the pier when boarding', cashRef: 'Booking reference',
    expires: 'Payment expires in', success: 'Payment successful!', redirecting: 'Redirecting...',
    invalidCard: 'Invalid card number', invalidExpiry: 'Invalid expiry', invalidCvv: 'Invalid CVV',
    cancel: 'Cancel', loading: 'Loading...',
    methods: { mbank: 'Mbank', optima: 'Optima Pay', odengi: 'O!Money', visa: 'Visa / Mastercard', qr: 'QR code', cash: 'Cash' },
  },
  ky: {
    title: 'Төлөм', back: 'Тапшырыкка кайтуу', summary: 'Тапшырык чоо-жайы', trip: 'Рейс', amount: 'Сумма', method: 'Төлөм ыкмасы',
    secure: 'Коопсуз төлөм', encrypted: 'Маалыматтар шифрленген',
    phone: 'Телефон номери', confirm: 'Төлөмдү ырастоо', processing: 'Төлөм иштетилүүдө...',
    cardNumber: 'Карта номери', expiry: 'Мөөнөтү', cvv: 'CVV', payCard: 'Карта менен төлөө',
    qrTitle: 'QR-кодду сканерлеңиз', qrHint: 'Банк колдонмосун ачып, кодду сканерлеңиз',
    cashTitle: 'Накталай төлөм', cashHint: 'Причалда отурганда төлөңүз', cashRef: 'Брондоо номери',
    expires: 'Төлөм мөөнөтү', success: 'Төлөм ийгиликтүү!', redirecting: 'Багыттоо...',
    invalidCard: 'Жараксыз карта номери', invalidExpiry: 'Жараксыз мөөнөт', invalidCvv: 'Жараксыз CVV',
    cancel: 'Жокко чыгаруу', loading: 'Жүктөлүүдө...',
    methods: { mbank: 'Mbank', optima: 'Optima Pay', odengi: 'O!Акча', visa: 'Visa / Mastercard', qr: 'QR-код', cash: 'Накталай' },
  },
};

function luhnCheck(num: string): boolean {
  const digits = num.replace(/\s/g, '').split('').reverse().map(Number);
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = digits[i];
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return sum % 10 === 0;
}

export default function PaymentPage() {
  return <Suspense><PaymentInner /></Suspense>;
}

function PaymentInner() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;

  const bookingId = searchParams.get('booking') || '1001';
  const methodParam = searchParams.get('method') || 'mbank';
  const amountParam = searchParams.get('amount') || '2800';
  const currency = searchParams.get('currency') || 'KGS';

  const [tripName, setTripName] = useState('');
  const tripNameFetched = useRef(false);

  useEffect(() => {
    if (tripNameFetched.current) return;
    tripNameFetched.current = true;
    fetch(`${API_URL}/bookings/${bookingId}`)
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data) => {
        const nameI18n = data.trip_name_i18n;
        if (nameI18n && nameI18n[lang]) {
          setTripName(nameI18n[lang]);
        } else {
          setTripName(data.trip_name || data.route_name || '');
        }
      })
      .catch(() => {
        // Fallback — empty, will show booking ID instead
        setTripName('');
      });
  }, [bookingId, lang]);

  const [phone, setPhone] = useState('+996 ');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(900); // 15 minutes

  useEffect(() => {
    if (success || timer <= 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [success, timer]);

  const formatTimer = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleMobilePayment = useCallback(async () => {
    setSubmitting(true);
    // Simulated payment — awaiting Freedom Pay integration
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSuccess(true);
    setTimeout(() => router.push(`/${lang}/booking-confirmed?id=${bookingId}&qr=mock-token`), 1500);
  }, [router, lang, bookingId]);

  const handleCardPayment = useCallback(async () => {
    const errors: Record<string, string> = {};
    const cleanCard = cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 13 || cleanCard.length > 19 || !luhnCheck(cleanCard)) errors.card = labels.invalidCard;
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) errors.expiry = labels.invalidExpiry;
    if (!/^\d{3,4}$/.test(cardCvv)) errors.cvv = labels.invalidCvv;
    setCardErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    // Simulated payment — awaiting Freedom Pay integration
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSuccess(true);
    setTimeout(() => router.push(`/${lang}/booking-confirmed?id=${bookingId}&qr=mock-token`), 1500);
  }, [cardNumber, cardExpiry, cardCvv, labels, router, lang, bookingId]);

  const handleCashConfirm = useCallback(() => {
    setSuccess(true);
    setTimeout(() => router.push(`/${lang}/booking-confirmed?id=${bookingId}&qr=mock-token`), 1500);
  }, [router, lang, bookingId]);

  if (success) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="font-heading font-bold text-3xl mb-2">{labels.success}</h1>
          <p className="text-muted">{labels.redirecting}</p>
        </div>
      </div>
    );
  }

  const isMobile = ['mbank', 'optima', 'odengi'].includes(methodParam);
  const isCard = methodParam === 'visa';
  const isQr = methodParam === 'qr';
  const isCash = methodParam === 'cash';

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <div className="bg-navy text-white px-6 md:px-14 py-6">
        <Link href={`/${lang}/checkout`} className="text-foam/70 text-sm hover:text-white">&larr; {labels.back}</Link>
        <h1 className="font-heading font-bold text-2xl md:text-3xl uppercase mt-2">{labels.title}</h1>
      </div>

      <div className="px-6 md:px-14 py-8 max-w-lg mx-auto space-y-6">
        {/* Security badge */}
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          <div>
            <div className="text-green-800 font-semibold text-sm">{labels.secure}</div>
            <div className="text-green-600 text-xs">{labels.encrypted}</div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-lg mb-3">{labels.summary}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted">{labels.trip}</span><span className="font-semibold">{tripName || `#${bookingId}`}</span></div>
            <div className="flex justify-between"><span className="text-muted">{labels.method}</span><span className="font-semibold">{labels.methods[methodParam as keyof typeof labels.methods] || methodParam}</span></div>
            <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between">
              <span className="text-muted">{labels.amount}</span>
              <div className="text-right">
                <span className="font-bold text-xl text-ocean">{Number(amountParam).toLocaleString()} {currency}</span>
                <span className="block text-[10px] text-gray-400 mt-0.5">{lang === 'en' ? 'Demo mode' : lang === 'ky' ? 'Демо-режим' : 'Демо-режим'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="text-center">
          <span className="text-muted text-sm">{labels.expires}</span>
          <span className={`ml-2 font-mono font-bold text-lg ${timer < 120 ? 'text-red-500' : 'text-navy'}`}>{formatTimer(timer)}</span>
        </div>

        {/* Mobile payment (Mbank / Optima / O!Деньги) */}
        {isMobile && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
            <label className="block text-sm font-semibold text-navy">{labels.phone}</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-ocean focus:outline-none text-lg tracking-wider" />
            <button onClick={handleMobilePayment} disabled={submitting || phone.length < 10}
              className="w-full py-4 bg-ocean text-white rounded-2xl font-bold text-lg hover:bg-ocean-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {submitting ? (
                <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" /></svg>{labels.processing}</>
              ) : labels.confirm}
            </button>
          </div>
        )}

        {/* Card payment */}
        {isCard && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">{labels.cardNumber}</label>
              <input type="text" value={cardNumber} maxLength={19}
                onChange={e => setCardNumber(e.target.value.replace(/[^\d\s]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim())}
                placeholder="4111 1111 1111 1111"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none text-lg tracking-wider ${cardErrors.card ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-ocean'}`} />
              {cardErrors.card && <p className="text-red-500 text-xs mt-1">{cardErrors.card}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">{labels.expiry}</label>
                <input type="text" value={cardExpiry} maxLength={5}
                  onChange={e => { let v = e.target.value.replace(/\D/g, ''); if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2); setCardExpiry(v); }}
                  placeholder="MM/YY"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none tracking-wider ${cardErrors.expiry ? 'border-red-400' : 'border-gray-200 focus:border-ocean'}`} />
                {cardErrors.expiry && <p className="text-red-500 text-xs mt-1">{cardErrors.expiry}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">{labels.cvv}</label>
                <input type="password" value={cardCvv} maxLength={4}
                  onChange={e => setCardCvv(e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none tracking-wider ${cardErrors.cvv ? 'border-red-400' : 'border-gray-200 focus:border-ocean'}`} />
                {cardErrors.cvv && <p className="text-red-500 text-xs mt-1">{cardErrors.cvv}</p>}
              </div>
            </div>
            <button onClick={handleCardPayment} disabled={submitting}
              className="w-full py-4 bg-ocean text-white rounded-2xl font-bold text-lg hover:bg-ocean-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {submitting ? (
                <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" /></svg>{labels.processing}</>
              ) : `${labels.payCard} — ${Number(amountParam).toLocaleString()} ${currency}`}
            </button>
          </div>
        )}

        {/* QR payment */}
        {isQr && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center space-y-4">
            <h3 className="font-bold text-lg">{labels.qrTitle}</h3>
            <div className="bg-gray-50 rounded-xl p-6 inline-block">
              {/* QR generation — demo mode, awaiting Freedom Pay integration */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`alykul-pay:${bookingId}:${amountParam}:${currency}`)}`}
                alt="Payment QR" width={250} height={250} className="mx-auto rounded-lg" />
            </div>
            <p className="text-muted text-sm">{labels.qrHint}</p>
          </div>
        )}

        {/* Cash payment */}
        {isCash && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-foam flex items-center justify-center">
              <span className="text-3xl">💵</span>
            </div>
            <h3 className="font-bold text-lg">{labels.cashTitle}</h3>
            <p className="text-muted text-sm">{labels.cashHint}</p>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-muted text-xs">{labels.cashRef}</div>
              <div className="font-mono font-bold text-2xl text-navy mt-1">#{bookingId}</div>
            </div>
            <button onClick={handleCashConfirm}
              className="w-full py-4 bg-ocean text-white rounded-2xl font-bold text-lg hover:bg-ocean-dark transition-colors">
              {labels.confirm}
            </button>
          </div>
        )}

        {/* Cancel */}
        <button onClick={() => router.back()}
          className="w-full py-3 border border-gray-200 text-muted rounded-xl text-sm hover:bg-gray-50 transition-colors">
          {labels.cancel}
        </button>
      </div>
    </div>
  );
}