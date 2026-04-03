'use client';

interface TrustBadgesProps {
  variant?: 'light' | 'dark' | 'inline';
}

export default function TrustBadges({ variant = 'light' }: TrustBadgesProps) {
  const badges = [
    { icon: '\u{2B50}', value: '4.9', label: 'Рейтинг' },
    { icon: '\u{1F465}', value: '12,000+', label: 'Гостей' },
    { icon: '\u{1F6E1}\u{FE0F}', value: '100%', label: 'Безопасность' },
    { icon: '\u{23F1}\u{FE0F}', value: '2 мин', label: 'Бронирование' },
  ];

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-4 text-sm">
        {badges.map(b => (
          <span key={b.label} className="flex items-center gap-1 text-muted">
            {b.icon} <strong>{b.value}</strong> {b.label}
          </span>
        ))}
      </div>
    );
  }

  const bg = variant === 'dark' ? 'bg-white/5 text-white' : 'bg-white text-navy';
  const sub = variant === 'dark' ? 'text-white/50' : 'text-muted';

  return (
    <div className={`flex items-center justify-center gap-6 md:gap-10 py-4 px-6 rounded-2xl ${bg}`}>
      {badges.map(b => (
        <div key={b.label} className="text-center">
          <div className="text-lg">{b.icon}</div>
          <div className="font-bold text-lg">{b.value}</div>
          <div className={`text-xs ${sub}`}>{b.label}</div>
        </div>
      ))}
    </div>
  );
}
