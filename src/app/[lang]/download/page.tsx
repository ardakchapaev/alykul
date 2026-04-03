'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';

const t = {
  hero: { ru: 'Скачайте приложение Алыкул', en: 'Download Alykul App', ky: 'Алыкул колдонмосун жүктөңүз' },
  subtitle: { ru: 'Бронируйте круизы прямо с телефона', en: 'Book cruises right from your phone', ky: 'Круиздерди телефонуңуздан броньдаңыз' },
  features: { ru: 'Возможности', en: 'Features', ky: 'Мүмкүнчүлүктөр' },
  install: { ru: 'Установить', en: 'Install Now', ky: 'Орнотуу' },
  howTo: { ru: 'Как установить', en: 'How to Install', ky: 'Кантип орнотуу' },
  coming: { ru: 'Скоро в App Store и Google Play', en: 'Coming soon to App Store & Google Play', ky: 'Жакында App Store жана Google Play' },
  share: { ru: 'Поделитесь ссылкой', en: 'Share the link', ky: 'Шилтемени бөлүшүңүз' },
  scan: { ru: 'Отсканируйте QR-код, чтобы открыть сайт', en: 'Scan the QR code to open the site', ky: 'Сайтты ачуу үчүн QR-кодду скандаңыз' },
};

const features = [
  { icon: '\uD83D\uDCF1', text: { ru: 'Бронирование в 2 клика', en: 'Book in 2 taps', ky: '2 чертүү менен броньдоо' } },
  { icon: '\uD83D\uDD14', text: { ru: 'Push-уведомления о рейсах', en: 'Push notifications for trips', ky: 'Рейстер жөнүндө билдирүүлөр' } },
  { icon: '\uD83D\uDCF4', text: { ru: 'Работает без интернета', en: 'Works offline', ky: 'Интернетсиз иштейт' } },
  { icon: '\uD83C\uDFAB', text: { ru: 'QR-билет всегда под рукой', en: 'QR ticket always at hand', ky: 'QR-билет ар дайым колдо' } },
  { icon: '\u2B50', text: { ru: 'Баллы лояльности', en: 'Loyalty points', ky: 'Лоялдуулук упайлары' } },
];

const installSteps = [
  { platform: 'Android Chrome', icon: '\u22EE', steps: { ru: 'Нажмите \u22EE \u2192 Добавить на главный экран', en: 'Tap \u22EE \u2192 Add to Home Screen', ky: '\u22EE басыңыз \u2192 Башкы экранга кошуу' } },
  { platform: 'iOS Safari', icon: '\uD83D\uDCE4', steps: { ru: 'Нажмите \uD83D\uDCE4 \u2192 На экран \u00ABДомой\u00BB', en: 'Tap \uD83D\uDCE4 \u2192 Add to Home Screen', ky: '\uD83D\uDCE4 басыңыз \u2192 Башкы экранга кошуу' } },
  { platform: 'Desktop', icon: '\u2295', steps: { ru: 'Нажмите \u2295 в адресной строке', en: 'Click \u2295 in the address bar', ky: 'Дарек тилкесиндеги \u2295 басыңыз' } },
];

export default function DownloadPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';
  const deferredPromptRef = useRef<Event | null>(null);
  const [canInstall, setCanInstall] = useState(false);

  const l = (obj: Record<string, string>) => obj[lang] || obj.ru;

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPromptRef.current = e;
      setCanInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    const prompt = deferredPromptRef.current as { prompt: () => void; userChoice: Promise<unknown> } | null;
    if (!prompt?.prompt) return;
    prompt.prompt();
    await prompt.userChoice;
    deferredPromptRef.current = null;
    setCanInstall(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#0F2B46] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-ocean/30 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">{l(t.hero)}</h1>
          <p className="text-foam/70 mb-8">{l(t.subtitle)}</p>
          {/* CSS-only phone mockup */}
          <div className="mx-auto w-48 h-80 bg-gray-900 rounded-[2rem] p-2 shadow-2xl shadow-ocean/30 border-4 border-gray-700 relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-full" />
            <div className="w-full h-full bg-gradient-to-b from-ocean to-sky rounded-[1.5rem] flex items-center justify-center">
              <span className="text-4xl font-bold text-white/90 font-heading">A</span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Breadcrumbs items={[{ label: lang === 'ru' ? 'Приложение' : lang === 'ky' ? 'Колдонмо' : 'App' }]} />
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-navy mb-6">{l(t.features)}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.icon} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
              <span className="text-2xl shrink-0">{f.icon}</span>
              <span className="text-sm font-medium text-navy">{l(f.text)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Install button */}
      <div className="max-w-4xl mx-auto px-4 pb-6 text-center">
        <button
          onClick={handleInstall}
          disabled={!canInstall}
          className={`px-8 py-3 rounded-full text-white font-semibold text-lg transition-all ${
            canInstall
              ? 'bg-ocean hover:bg-ocean-dark shadow-lg shadow-ocean/30 hover:scale-105'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {l(t.install)}
        </button>
        {!canInstall && (
          <p className="text-xs text-muted mt-2">
            {lang === 'en' ? 'Use the instructions below to install manually' : lang === 'ky' ? 'Колго орнотуу үчүн төмөнкү нускамаларды колдонуңуз' : 'Используйте инструкции ниже для ручной установки'}
          </p>
        )}
      </div>

      {/* Install instructions */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-navy mb-6">{l(t.howTo)}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {installSteps.map((step) => (
            <div key={step.platform} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="font-bold text-navy mb-2">{step.platform}</h3>
              <p className="text-sm text-muted">{l(step.steps)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code */}
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold text-navy mb-3">{l(t.share)}</h2>
        <p className="text-sm text-muted mb-6">{l(t.scan)}</p>
        <div className="inline-block bg-white p-4 rounded-2xl shadow-sm border">
          {/* Simple CSS QR placeholder - replace with real QR */}
          <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-sm ${
                    [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24].includes(i)
                      ? 'bg-navy'
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted mt-2">alykul.baimuras.pro</p>
        </div>
      </div>

      {/* Coming soon */}
      <div className="max-w-4xl mx-auto px-4 py-10 pb-16 text-center">
        <p className="text-lg font-semibold text-muted mb-6">{l(t.coming)}</p>
        <div className="flex justify-center gap-4">
          <div className="bg-gray-900 text-white rounded-xl px-6 py-3 flex items-center gap-2 opacity-50">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
            App Store
          </div>
          <div className="bg-gray-900 text-white rounded-xl px-6 py-3 flex items-center gap-2 opacity-50">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.57c-.48-.24-.78-.72-.78-1.2V1.63c0-.48.3-.96.78-1.2l11.1 11.57L3.18 23.57zm1.56-22.2L15.36 12 4.74 22.63 14.7 12.45l-9.96-11.08zm13.02 10.2l-2.4-2.52L17.4 12l-2.04 2.95 2.4-2.52-2.4 2.52L17.4 12l-2.04-2.95 2.4 2.52zm2.7 1.5l-2.22-1.32 2.22-1.32-2.22 1.32 2.22 1.32z" /></svg>
            Google Play
          </div>
        </div>
      </div>
    </div>
  );
}
