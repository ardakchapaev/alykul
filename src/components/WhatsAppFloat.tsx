'use client';
import { useState } from 'react';

export default function WhatsAppFloat() {
  const [expanded, setExpanded] = useState(false);
  const phone = '996555123456';

  const options = [
    { text: '\u{1F6A2} Забронировать рейс', msg: 'Хочу забронировать рейс на Иссык-Куле' },
    { text: '\u{1F4B0} Узнать цены', msg: 'Какие цены на круизы?' },
    { text: '\u{1F4C5} Расписание', msg: 'Какое расписание рейсов?' },
    { text: '\u{2753} Другой вопрос', msg: 'Здравствуйте, у меня вопрос' },
  ];

  return (
    <div className="fixed bottom-20 md:bottom-6 left-6 z-[10003] flex flex-col items-start gap-2">
      {/* Expanded: quick message options */}
      {expanded && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-[280px] mb-2 animate-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.67-1.228A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.337 0-4.542-.647-6.42-1.774l-.148-.09-3.105.817.83-3.032-.1-.157A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold">WhatsApp</div>
                <div className="text-xs text-green-600">Онлайн</div>
              </div>
            </div>
            <button onClick={() => setExpanded(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
          </div>
          <p className="text-xs text-gray-500 mb-3">Напишите нам — ответим за 2 минуты!</p>
          <div className="space-y-2">
            {options.map(opt => (
              <a
                key={opt.text}
                href={`https://wa.me/${phone}?text=${encodeURIComponent(opt.msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-3 py-2 bg-gray-50 rounded-lg text-sm hover:bg-[#25D366]/10 transition-colors"
              >
                {opt.text}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center relative"
        aria-label="WhatsApp"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.67-1.228A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.337 0-4.542-.647-6.42-1.774l-.148-.09-3.105.817.83-3.032-.1-.157A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
        </svg>
        {/* Pulse badge */}
        {!expanded && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </div>
  );
}
