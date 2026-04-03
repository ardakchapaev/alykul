'use client';
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('alykul-cookies-accepted');
    if (!accepted) {
      setTimeout(() => setShow(true), 2000); // Show after 2s
    }
  }, []);

  const accept = () => {
    localStorage.setItem('alykul-cookies-accepted', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[10005] bg-white border-t border-gray-200 shadow-2xl shadow-black/10 p-4 md:p-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 text-center md:text-left">
          🍪 Мы используем cookies для улучшения работы сайта и аналитики.
          <a href="/ru/privacy" className="text-ocean underline ml-1">Подробнее</a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={accept}
            className="px-5 py-2 bg-ocean text-white rounded-lg text-sm font-semibold hover:bg-ocean-dark transition-colors">
            Принять
          </button>
          <button onClick={() => setShow(false)}
            className="px-5 py-2 border border-gray-200 text-gray-500 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
}
