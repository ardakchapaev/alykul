'use client';

import { useState } from 'react';

const MARQUEE_CSS = `
@keyframes alykul-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

export default function BookingBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const text = 'Bронирование за 2 минуты  |  12,000+ довольных гостей  |  4.9 рейтинг  |  Сезон 2026: 1 июня - 15 сентября  |  Озеро Иссык-Куль';

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
        <a href="#booking" className="shrink-0 mx-2 px-3 py-1 text-[11px] font-semibold bg-white text-[#0a1628] rounded-full hover:bg-white/90 transition-colors">
          Забронировать
        </a>
        <button onClick={() => setVisible(false)} className="shrink-0 mr-2 text-white/60 hover:text-white text-sm" aria-label="Close">
          x
        </button>
      </div>
    </>
  );
}
