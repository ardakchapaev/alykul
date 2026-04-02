'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';

interface CurrencyInfo {
  code: string;
  symbol: string;
  flag: string;
  rate: number; // how many of this currency per 1 KGS
}

// TODO: Fetch from exchange rate API
const currencies: CurrencyInfo[] = [
  { code: 'KGS', symbol: 'сом', flag: '🇰🇬', rate: 1 },
  { code: 'USD', symbol: '$', flag: '🇺🇸', rate: 1 / 87 },      // 1 USD = 87 KGS
  { code: 'RUB', symbol: '₽', flag: '🇷🇺', rate: 1 / 0.95 },    // 1 RUB = 0.95 KGS
  { code: 'KZT', symbol: '₸', flag: '🇰🇿', rate: 1 / 0.18 },    // 1 KZT = 0.18 KGS
];

interface CurrencyCtx {
  currency: string;
  symbol: string;
  setCurrency: (code: string) => void;
  convert: (amountKGS: number) => number;
  format: (amountKGS: number) => string;
}

const CurrencyContext = createContext<CurrencyCtx>({
  currency: 'KGS',
  symbol: 'сом',
  setCurrency: () => {},
  convert: (a) => a,
  format: (a) => `${a} сом`,
});

export function useCurrency() {
  return useContext(CurrencyContext);
}

const STORAGE_KEY = 'alykul_currency';

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState('KGS');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && currencies.some((c) => c.code === saved)) {
      setCode(saved);
    }
  }, []);

  const setCurrency = useCallback((c: string) => {
    setCode(c);
    localStorage.setItem(STORAGE_KEY, c);
  }, []);

  const info = currencies.find((c) => c.code === code) || currencies[0];

  const convert = useCallback(
    (amountKGS: number) => Math.round(amountKGS * info.rate * 100) / 100,
    [info.rate],
  );

  const format = useCallback(
    (amountKGS: number) => {
      const val = convert(amountKGS);
      if (info.code === 'KGS') return `${val.toLocaleString('ru-RU')} ${info.symbol}`;
      return `${info.symbol}${val.toLocaleString('ru-RU')}`;
    },
    [convert, info.code, info.symbol],
  );

  return (
    <CurrencyContext.Provider value={{ currency: code, symbol: info.symbol, setCurrency, convert, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = currencies.find((c) => c.code === currency) || currencies[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
      >
        <span>{current.flag}</span>
        <span>{current.code}</span>
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border py-1 min-w-[140px] z-50">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => { setCurrency(c.code); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                c.code === currency ? 'text-[#1B7CED] font-semibold' : 'text-gray-700'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.code}</span>
              <span className="text-gray-400 ml-auto">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
