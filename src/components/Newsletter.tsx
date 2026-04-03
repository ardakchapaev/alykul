'use client';

import { useState } from 'react';

const t = {
  title: { ru: 'Подпишитесь на рассылку', en: 'Subscribe to Newsletter', ky: 'Жаңылыктарга жазылыңыз' },
  desc: { ru: 'Получайте лучшие предложения, новые маршруты и акции первыми', en: 'Be the first to get best deals, new routes and promotions', ky: 'Мыкты сунуштарды, жаңы маршруттарды биринчи болуп алыңыз' },
  placeholder: { ru: 'Ваш email', en: 'Your email', ky: 'Сиздин email' },
  button: { ru: 'Подписаться', en: 'Subscribe', ky: 'Жазылуу' },
  success: { ru: 'Вы подписаны! Спасибо.', en: 'Subscribed! Thank you.', ky: 'Жазылдыңыз! Рахмат.' },
  error: { ru: 'Введите корректный email', en: 'Enter a valid email', ky: 'Туура email жазыңыз' },
};

export default function Newsletter({ variant = 'default', lang = 'ru' }: { variant?: 'default' | 'compact' | 'dark'; lang?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');

  const l = (obj: Record<string, string>) => obj[lang] || obj.ru;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1'}/forms/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
          placeholder={l(t.placeholder)}
          className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
        />
        <button type="submit" className="px-5 py-2.5 bg-ocean text-white rounded-full text-sm font-semibold hover:bg-ocean-dark transition-colors">
          {l(t.button)}
        </button>
        {status === 'success' && <span className="text-green-600 text-xs self-center">{l(t.success)}</span>}
        {status === 'error' && <span className="text-red-500 text-xs self-center">{l(t.error)}</span>}
      </form>
    );
  }

  if (variant === 'dark') {
    return (
      <div className="bg-navy/80 backdrop-blur rounded-2xl p-6 text-center">
        <h3 className="text-lg font-bold text-white mb-2">{l(t.title)}</h3>
        <p className="text-sm text-foam/60 mb-4">{l(t.desc)}</p>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
            placeholder={l(t.placeholder)}
            className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/50"
          />
          <button type="submit" className="px-5 py-2.5 bg-ocean text-white rounded-full text-sm font-semibold hover:bg-ocean-dark transition-colors">
            {l(t.button)}
          </button>
        </form>
        {status === 'success' && <p className="text-green-400 text-sm mt-2">{l(t.success)}</p>}
        {status === 'error' && <p className="text-red-400 text-sm mt-2">{l(t.error)}</p>}
      </div>
    );
  }

  // default variant
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-navy mb-2">{l(t.title)}</h3>
      <p className="text-sm text-muted mb-5">{l(t.desc)}</p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
          placeholder={l(t.placeholder)}
          className="flex-1 px-4 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
        />
        <button type="submit" className="px-6 py-3 bg-ocean text-white rounded-full text-sm font-semibold hover:bg-ocean-dark transition-colors shadow-sm">
          {l(t.button)}
        </button>
      </form>
      {status === 'success' && <p className="text-green-600 text-sm mt-3">{l(t.success)}</p>}
      {status === 'error' && <p className="text-red-500 text-sm mt-3">{l(t.error)}</p>}
    </div>
  );
}
