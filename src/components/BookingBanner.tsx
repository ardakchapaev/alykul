'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

const MARQUEE_CSS = `
@keyframes alykul-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

export default function BookingBanner() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const lang = pathname?.split('/')[1] || 'ru';

  if (!visible) return null;

  const text = lang === 'en'
    ? 'Book in 2 minutes  |  12,000+ happy guests  |  4.9 rating  |  Season 2026: June 1 - September 15  |  Lake Issyk-Kul'
    : lang === 'ky'
    ? 'Брондоо 2 мүнөттө  |  12,000+ ыраазы конок  |  4.9 рейтинг  |  Сезон 2026: 1 июнь - 15 сентябрь  |  Ысык-Көл'
    : 'Бронирование за 2 минуты  |  12,000+ довольных гостей  |  4.9 рейтинг  |  Сезон 2026: 1 июня - 15 сентября  |  Озеро Иссык-Куль';

  const btnText = lang === 'en' ? 'Book Now' : lang === 'ky' ? 'Брондоо' : 'Забронировать';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />
      <div className="sticky top-0 left-0 right-0 z-[10002] h-8 bg-gradient-to-r from-[#0a1628] via-[#1a3a5c] to-[#246dc9] text-white flex items-center overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: 'alykul-marquee 25s linear infinite' }}>
            <span className="mx-8 text-xs font-medium tracking-wide">{text}</span>
            <span className="mx-8 text-xs font-medium tracking-wide">{text}</span>
          </div>
        </div>
        <a href={`/${lang}/trips`} className="shrink-0 mx-2 px-3 py-1 text-[11px] font-semibold bg-white text-[#0a1628] rounded-full hover:bg-white/90 transition-colors">
          {btnText}
        </a>
        <button onClick={() => setVisible(false)} className="shrink-0 mr-2 text-white/60 hover:text-white text-sm" aria-label="Close">
          x
        </button>
      </div>
    </>
  );
}
