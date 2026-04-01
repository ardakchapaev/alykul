'use client';

import { useMemo } from 'react';

// --- Types ---
interface LoyaltyCardProps {
  points: number;
  level: 'standard' | 'gold' | 'vip';
  name: string | null;
  phone: string;
}

// --- Level config ---
const levels = {
  standard: { min: 0, next: 5000, nextLevel: 'gold' as const, color: 'from-slate-600 to-slate-800', label: 'STANDARD', labelBg: 'bg-slate-500' },
  gold: { min: 5000, next: 15000, nextLevel: 'vip' as const, color: 'from-amber-500 to-amber-700', label: 'GOLD', labelBg: 'bg-amber-600' },
  vip: { min: 15000, next: null, nextLevel: null, color: 'from-violet-600 to-violet-900', label: 'VIP', labelBg: 'bg-violet-600' },
};

// --- Mock transactions ---
const mockTransactions = [
  { id: 1, date: '28.03.2026', description: 'Закатный круиз', amount: +140, type: 'earn' as const },
  { id: 2, date: '22.03.2026', description: 'Скоростной тур', amount: +200, type: 'earn' as const },
  { id: 3, date: '15.03.2026', description: 'Скидка на бронирование', amount: -500, type: 'redeem' as const },
  { id: 4, date: '10.03.2026', description: 'Приватный чартер', amount: +700, type: 'earn' as const },
];

// --- Format phone as card number ---
function formatCardNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '').slice(-10);
  if (digits.length < 10) return phone;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
}

// --- Component ---
export default function LoyaltyCard({ points, level, name, phone }: LoyaltyCardProps) {
  const config = levels[level];

  const progress = useMemo(() => {
    if (!config.next) return 100;
    const range = config.next - config.min;
    const current = points - config.min;
    return Math.min(100, Math.max(0, (current / range) * 100));
  }, [points, config]);

  const pointsToNext = config.next ? config.next - points : 0;

  return (
    <div className="w-full max-w-[400px] mx-auto">
      {/* Card */}
      <div
        className={`relative w-full aspect-[1.75/1] max-w-[350px] mx-auto rounded-2xl bg-gradient-to-br ${config.color} p-5 text-white shadow-xl overflow-hidden select-none`}
      >
        {/* Wave pattern overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
          viewBox="0 0 350 200"
          preserveAspectRatio="none"
        >
          <path d="M0 120 Q87.5 80 175 120 Q262.5 160 350 120 V200 H0 Z" fill="white" />
          <path d="M0 150 Q87.5 110 175 150 Q262.5 190 350 150 V200 H0 Z" fill="white" />
          <circle cx="280" cy="40" r="80" fill="white" opacity="0.3" />
        </svg>

        {/* Top row: Logo + Level */}
        <div className="relative flex items-start justify-between">
          <div className="font-bold text-lg tracking-wider uppercase opacity-90">
            АЛЫКУЛ
          </div>
          <span className={`${config.labelBg} px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-widest`}>
            {config.label}
          </span>
        </div>

        {/* Center: Points */}
        <div className="relative flex flex-col items-center justify-center mt-4">
          <div className="text-3xl font-bold tracking-tight tabular-nums">
            {points.toLocaleString('ru-RU')}
          </div>
          <div className="text-[11px] uppercase tracking-widest opacity-60 mt-0.5">
            баллов
          </div>
        </div>

        {/* Bottom row: Name + Phone */}
        <div className="relative flex items-end justify-between mt-auto pt-4">
          <div className="text-xs uppercase tracking-wider opacity-80 truncate max-w-[60%]">
            {name || 'Гость'}
          </div>
          <div className="text-xs font-mono opacity-70 tracking-wider">
            {formatCardNumber(phone)}
          </div>
        </div>
      </div>

      {/* Progress to next level */}
      {config.next && (
        <div className="mt-5 px-1">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 font-medium">
              До уровня <span className="font-bold capitalize">{config.nextLevel}</span>
            </span>
            <span className="text-gray-500 text-xs tabular-nums">
              {pointsToNext.toLocaleString('ru-RU')} баллов
            </span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${config.color} transition-all duration-700 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1 tabular-nums">
            <span>{config.min.toLocaleString('ru-RU')}</span>
            <span>{config.next.toLocaleString('ru-RU')}</span>
          </div>
        </div>
      )}

      {config.next === null && (
        <div className="mt-5 px-1 text-center">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-700 bg-violet-50 px-3 py-1.5 rounded-full">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            Максимальный уровень
          </span>
        </div>
      )}

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-100">
          <div className="text-emerald-700 text-xs font-semibold mb-1">Начисление</div>
          <div className="text-emerald-900 text-sm font-bold">10% от покупки</div>
          <div className="text-emerald-600 text-[11px] mt-0.5">за каждый рейс</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-3.5 border border-blue-100">
          <div className="text-blue-700 text-xs font-semibold mb-1">Списание</div>
          <div className="text-blue-900 text-sm font-bold">1 балл = 1 KGS</div>
          <div className="text-blue-600 text-[11px] mt-0.5">скидка на рейс</div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="mt-5">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">История баллов</h4>
        <div className="space-y-2">
          {mockTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                    tx.type === 'earn'
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  {tx.type === 'earn' ? '+' : '-'}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{tx.description}</div>
                  <div className="text-[11px] text-gray-400">{tx.date}</div>
                </div>
              </div>
              <span
                className={`text-sm font-bold tabular-nums ${
                  tx.type === 'earn' ? 'text-emerald-600' : 'text-orange-600'
                }`}
              >
                {tx.type === 'earn' ? '+' : ''}{tx.amount.toLocaleString('ru-RU')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
