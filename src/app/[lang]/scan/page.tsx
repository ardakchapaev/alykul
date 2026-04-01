'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';

// Captain/crew ticket verification page
// URL: /ru/scan (or /en/scan, /ky/scan)

const t = {
  ru: {
    title: 'Проверка билетов',
    vessel: 'Судно',
    date: 'Дата',
    inputPlaceholder: 'Введите ID бронирования или QR-токен',
    verify: 'Проверить',
    checking: 'Проверка...',
    valid: 'Билет действителен',
    invalid: 'Билет недействителен',
    expired: 'Билет просрочен',
    name: 'Имя',
    passengers: 'Пассажиры',
    trip: 'Рейс',
    seats: 'Места',
    checked: 'Проверено',
    of: 'из',
    total: 'Всего',
    clear: 'Очистить',
    errorNetwork: 'Ошибка сети. Проверяем локальный кэш...',
    notFoundCache: 'Билет не найден в кэше',
    cachedResult: 'Результат из кэша (офлайн)',
    today: 'Сегодня',
  },
  en: {
    title: 'Ticket Verification',
    vessel: 'Vessel',
    date: 'Date',
    inputPlaceholder: 'Enter booking ID or QR token',
    verify: 'Verify',
    checking: 'Checking...',
    valid: 'Ticket Valid',
    invalid: 'Ticket Invalid',
    expired: 'Ticket Expired',
    name: 'Name',
    passengers: 'Passengers',
    trip: 'Trip',
    seats: 'Seats',
    checked: 'Checked',
    of: 'of',
    total: 'Total',
    clear: 'Clear',
    errorNetwork: 'Network error. Checking local cache...',
    notFoundCache: 'Ticket not found in cache',
    cachedResult: 'Cached result (offline)',
    today: 'Today',
  },
  ky: {
    title: 'Билеттерди текшерuu',
    vessel: 'Кеме',
    date: 'Дата',
    inputPlaceholder: 'Брондоо ID же QR-токенди киргизиниз',
    verify: 'Текшерuu',
    checking: 'Текшерилuудe...',
    valid: 'Билет жарактуу',
    invalid: 'Билет жарактуу эмес',
    expired: 'Билеттин мooнeтu oткoн',
    name: 'Аты',
    passengers: 'Жoлoочулар',
    trip: 'Рейс',
    seats: 'Орундар',
    checked: 'Текшерилди',
    of: 'ичинен',
    total: 'Жалпы',
    clear: 'Тазалоо',
    errorNetwork: 'Тармак катасы. Жергиликтуу кэш текшерилуудe...',
    notFoundCache: 'Билет кэште табылган жок',
    cachedResult: 'Кэштен натыйжа (офлайн)',
    today: 'Бuгuн',
  },
};

interface VerifyResult {
  status: 'valid' | 'invalid' | 'expired';
  booking_id?: string;
  passenger_name?: string;
  passenger_count?: number;
  trip_name?: string;
  seat_numbers?: string;
  message?: string;
  cached?: boolean;
}

const CACHE_KEY = 'alykul_verified_tickets';
const CHECKED_KEY = 'alykul_checked_today';

function getCheckedToday(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = JSON.parse(localStorage.getItem(CHECKED_KEY) || '{}');
    const today = new Date().toISOString().slice(0, 10);
    if (data.date !== today) return [];
    return data.ids || [];
  } catch {
    return [];
  }
}

function addCheckedToday(id: string) {
  if (typeof window === 'undefined') return;
  const today = new Date().toISOString().slice(0, 10);
  const ids = getCheckedToday();
  if (!ids.includes(id)) ids.push(id);
  localStorage.setItem(CHECKED_KEY, JSON.stringify({ date: today, ids }));
}

function getCachedTicket(id: string): VerifyResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    return cache[id] || null;
  } catch {
    return null;
  }
}

function cacheTicket(id: string, result: VerifyResult) {
  if (typeof window === 'undefined') return;
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cache[id] = result;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore storage errors
  }
}

export default function ScanPage() {
  const params = useParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [checkedCount, setCheckedCount] = useState(0);
  const [totalCount] = useState(0);

  useEffect(() => {
    setCheckedCount(getCheckedToday().length);
  }, []);

  const handleVerify = useCallback(async () => {
    const value = input.trim();
    if (!value) return;

    setLoading(true);
    setResult(null);

    // Determine if input is a booking ID (numeric) or QR token
    const isBookingId = /^\d+$/.test(value);

    try {
      const apiBase = '/api/v1';
      let url: string;
      if (isBookingId) {
        url = `${apiBase}/bookings/${value}/verify-qr?qr_token=`;
      } else {
        // Try to extract booking ID from QR URL or use as token
        const tokenMatch = value.match(/bookings\/(\d+)\/verify-qr\?qr_token=(.+)/);
        if (tokenMatch) {
          url = `${apiBase}/bookings/${tokenMatch[1]}/verify-qr?qr_token=${tokenMatch[2]}`;
        } else {
          // Assume it's a raw token, try with a generic endpoint
          url = `${apiBase}/bookings/verify?token=${encodeURIComponent(value)}`;
        }
      }

      const res = await fetch(url);
      const data = await res.json();

      const verifyResult: VerifyResult = {
        status: data.valid ? 'valid' : data.expired ? 'expired' : 'invalid',
        booking_id: data.booking_id || value,
        passenger_name: data.passenger_name,
        passenger_count: data.passenger_count,
        trip_name: data.trip_name,
        seat_numbers: data.seat_numbers,
        message: data.message,
      };

      setResult(verifyResult);
      cacheTicket(value, verifyResult);

      if (verifyResult.status === 'valid') {
        addCheckedToday(verifyResult.booking_id || value);
        setCheckedCount(getCheckedToday().length);
      }
    } catch {
      // Offline: check cache
      const cached = getCachedTicket(value);
      if (cached) {
        setResult({ ...cached, cached: true });
      } else {
        setResult({
          status: 'invalid',
          message: labels.notFoundCache,
          cached: true,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [input, labels.notFoundCache]);

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const today = new Date().toLocaleDateString(lang === 'ky' ? 'ky-KG' : lang === 'en' ? 'en-US' : 'ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-sand flex flex-col">
      {/* Header */}
      <header className="bg-navy text-white px-4 py-5">
        <h1 className="text-2xl font-bold text-center">{labels.title}</h1>
        <div className="flex justify-between mt-2 text-sm opacity-80">
          <span>{labels.vessel}: Алыкул</span>
          <span>{labels.date}: {today}</span>
        </div>
      </header>

      {/* Counter */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-center gap-3">
        <div className="text-center">
          <span className="text-3xl font-bold text-navy">{checkedCount}</span>
          {totalCount > 0 && (
            <span className="text-lg text-muted ml-1">/ {totalCount}</span>
          )}
          <p className="text-xs text-muted mt-0.5">{labels.checked}</p>
        </div>
      </div>

      {/* Input area */}
      <div className="px-4 pt-6 pb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
          placeholder={labels.inputPlaceholder}
          className="w-full h-[60px] px-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-ocean focus:outline-none bg-white text-navy placeholder:text-gray-400"
          autoFocus
          autoComplete="off"
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleVerify}
            disabled={loading || !input.trim()}
            className="flex-1 h-[60px] bg-ocean text-white rounded-2xl font-bold text-lg hover:bg-ocean-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? labels.checking : labels.verify}
          </button>
          {input && (
            <button
              onClick={handleClear}
              className="h-[60px] px-6 border-2 border-gray-300 text-gray-500 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              {labels.clear}
            </button>
          )}
        </div>
      </div>

      {/* Result area */}
      <div className="flex-1 px-4 pb-8">
        {result && (
          <div
            className={`rounded-2xl p-6 border-2 ${
              result.status === 'valid'
                ? 'bg-green-50 border-green-400'
                : result.status === 'expired'
                ? 'bg-yellow-50 border-yellow-400'
                : 'bg-red-50 border-red-400'
            }`}
          >
            {/* Status icon and label */}
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">
                {result.status === 'valid' ? '\u2705' : result.status === 'expired' ? '\u23F3' : '\u274C'}
              </div>
              <h2
                className={`text-2xl font-bold ${
                  result.status === 'valid'
                    ? 'text-green-700'
                    : result.status === 'expired'
                    ? 'text-yellow-700'
                    : 'text-red-700'
                }`}
              >
                {result.status === 'valid'
                  ? labels.valid
                  : result.status === 'expired'
                  ? labels.expired
                  : labels.invalid}
              </h2>
              {result.cached && (
                <p className="text-sm text-gray-500 mt-1">{labels.cachedResult}</p>
              )}
            </div>

            {/* Booking details (valid) */}
            {result.status === 'valid' && (
              <div className="space-y-3 text-left">
                {result.booking_id && (
                  <div className="flex justify-between py-2 border-b border-green-200">
                    <span className="text-green-600 font-medium">ID</span>
                    <span className="text-green-900 font-bold">#{result.booking_id}</span>
                  </div>
                )}
                {result.passenger_name && (
                  <div className="flex justify-between py-2 border-b border-green-200">
                    <span className="text-green-600 font-medium">{labels.name}</span>
                    <span className="text-green-900 font-bold">{result.passenger_name}</span>
                  </div>
                )}
                {result.passenger_count && (
                  <div className="flex justify-between py-2 border-b border-green-200">
                    <span className="text-green-600 font-medium">{labels.passengers}</span>
                    <span className="text-green-900 font-bold">{result.passenger_count}</span>
                  </div>
                )}
                {result.trip_name && (
                  <div className="flex justify-between py-2 border-b border-green-200">
                    <span className="text-green-600 font-medium">{labels.trip}</span>
                    <span className="text-green-900 font-bold">{result.trip_name}</span>
                  </div>
                )}
                {result.seat_numbers && (
                  <div className="flex justify-between py-2">
                    <span className="text-green-600 font-medium">{labels.seats}</span>
                    <span className="text-green-900 font-bold">{result.seat_numbers}</span>
                  </div>
                )}
              </div>
            )}

            {/* Error message (invalid/expired) */}
            {result.status !== 'valid' && result.message && (
              <p className="text-center text-sm mt-2 opacity-80">{result.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
