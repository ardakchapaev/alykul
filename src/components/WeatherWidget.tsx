'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  current: {
    temperature_2m: number;
    weathercode: number;
    windspeed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}

const CACHE_KEY = 'alykul_weather';
const CACHE_TTL = 30 * 60 * 1000; // 30 min

const API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=42.65&longitude=77.06&current=temperature_2m,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia/Bishkek&forecast_days=5';

function weatherIcon(code: number): string {
  if (code === 0) return '☀️';
  if (code >= 1 && code <= 3) return '⛅';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '🌨️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '🌤️';
}

const DAY_NAMES: Record<string, string[]> = {
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ky: ['Жк', 'Дш', 'Шш', 'Шр', 'Бш', 'Жм', 'Иш'],
};

function dayName(dateStr: string, lang: string): string {
  const d = new Date(dateStr);
  const names = DAY_NAMES[lang] || DAY_NAMES.ru;
  return names[d.getDay()];
}

function waterTemp(airTemp: number, dateStr?: string): number | null {
  if (!dateStr) return null;
  const month = new Date(dateStr).getMonth() + 1;
  if (month >= 6 && month <= 9) return Math.round(airTemp - 5);
  return null;
}

interface Props {
  variant?: 'dark' | 'light';
  lang?: string;
}

export default function WeatherWidget({ variant = 'light', lang = 'ru' }: Props) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data: d, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) {
          setData(d);
          return;
        }
      } catch { /* ignore */ }
    }

    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed');
        return r.json();
      })
      .then((d: WeatherData) => {
        setData(d);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: d, ts: Date.now() }));
      })
      .catch(() => setError(true));
  }, []);

  const card =
    variant === 'dark'
      ? 'bg-white/10 backdrop-blur rounded-xl p-4 text-white'
      : 'bg-white rounded-xl shadow-sm border p-4 text-gray-800';

  if (error) {
    return <div className={card + ' text-center text-sm opacity-70'}>{lang === 'en' ? 'Weather unavailable' : lang === 'ky' ? 'Аба ырайы жеткиликсиз' : 'Погода недоступна'}</div>;
  }

  if (!data) {
    return (
      <div className={card + ' animate-pulse space-y-3'}>
        <div className="h-6 w-32 rounded bg-current opacity-10" />
        <div className="h-4 w-48 rounded bg-current opacity-10" />
        <div className="flex gap-2 mt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 w-14 rounded bg-current opacity-10" />
          ))}
        </div>
      </div>
    );
  }

  const { current, daily } = data;
  const todayStr = daily.time[0];
  const wt = waterTemp(current.temperature_2m, todayStr);

  return (
    <div className={card}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{weatherIcon(current.weathercode)}</span>
            <span className="text-2xl font-bold">{Math.round(current.temperature_2m)}°C</span>
          </div>
          <p className="text-xs opacity-70 mt-0.5">
            {lang === 'en' ? 'Wind' : lang === 'ky' ? 'Шамал' : 'Ветер'} {Math.round(current.windspeed_10m)} {lang === 'en' ? 'km/h' : lang === 'ky' ? 'км/с' : 'км/ч'}
            {wt !== null && <> &middot; {lang === 'en' ? 'Water' : lang === 'ky' ? 'Суу' : 'Вода'} ~{wt}°C</>}
          </p>
        </div>
        <span className="text-xs font-medium opacity-50">{lang === 'en' ? 'Issyk-Kul' : lang === 'ky' ? 'Ысык-Көл' : 'Иссык-Куль'}</span>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {daily.time.map((d, i) => (
          <div
            key={d}
            className={`flex flex-col items-center flex-shrink-0 px-2 py-1.5 rounded-lg text-xs ${
              variant === 'dark' ? 'bg-white/5' : 'bg-gray-50'
            }`}
          >
            <span className="capitalize opacity-60">{dayName(d, lang)}</span>
            <span className="text-base my-0.5">{weatherIcon(daily.weathercode[i])}</span>
            <span className="font-medium">{Math.round(daily.temperature_2m_max[i])}°</span>
            <span className="opacity-50">{Math.round(daily.temperature_2m_min[i])}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
