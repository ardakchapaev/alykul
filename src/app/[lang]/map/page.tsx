'use client';

import { useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';

const t = {
  hero: { ru: 'Карта маршрутов', en: 'Route Map', ky: 'Маршрут картасы' },
  subtitle: { ru: 'Все точки отправления и маршруты на озере Иссык-Куль', en: 'All departure points and routes on Lake Issyk-Kul', ky: 'Ысык-Көлдөгү бардык жөнөө чекиттери' },
  departures: { ru: 'Точки отправления', en: 'Departure Points', ky: 'Жөнөө чекиттери' },
  routes: { ru: 'Маршруты', en: 'Routes', ky: 'Маршруттар' },
  directions: { ru: 'Построить маршрут', en: 'Get Directions', ky: 'Жолду көрсөтүү' },
  hours: { ru: 'Часы работы', en: 'Working Hours', ky: 'Иштөө убактысы' },
  services: { ru: 'Услуги', en: 'Services', ky: 'Кызматтар' },
  mainBase: { ru: 'основная база', en: 'main base', ky: 'негизги база' },
};

const departures = [
  {
    name: { ru: 'Чолпон-Ата', en: 'Cholpon-Ata', ky: 'Чолпон-Ата' },
    badge: t.mainBase,
    lat: 42.6461,
    lng: 77.0685,
    address: { ru: 'Набережная, Чолпон-Ата', en: 'Waterfront, Cholpon-Ata', ky: 'Жээк, Чолпон-Ата' },
    hours: { ru: '08:00 — 20:00', en: '08:00 — 20:00', ky: '08:00 — 20:00' },
    servicesList: {
      ru: ['Все круизы', 'Скоростные туры', 'VIP-чартер', 'Детские праздники'],
      en: ['All cruises', 'Speed tours', 'VIP charter', 'Kids parties'],
      ky: ['Бардык круиздер', 'Ылдам турлар', 'VIP-чартер', 'Балдар майрамдары'],
    },
  },
  {
    name: { ru: 'Бостери', en: 'Bosteri', ky: 'Бостери' },
    badge: null,
    lat: 42.65,
    lng: 77.15,
    address: { ru: 'Пляж Бостери', en: 'Bosteri Beach', ky: 'Бостери жээги' },
    hours: { ru: '09:00 — 19:00', en: '09:00 — 19:00', ky: '09:00 — 19:00' },
    servicesList: {
      ru: ['Утренний круиз', 'Скоростные туры', 'Трансфер'],
      en: ['Morning cruise', 'Speed tours', 'Transfer'],
      ky: ['Эртеңки круиз', 'Ылдам турлар', 'Трансфер'],
    },
  },
  {
    name: { ru: 'Каракол', en: 'Karakol', ky: 'Каракол' },
    badge: null,
    lat: 42.48,
    lng: 78.39,
    address: { ru: 'Порт Каракол', en: 'Karakol Port', ky: 'Каракол порту' },
    hours: { ru: '10:00 — 18:00', en: '10:00 — 18:00', ky: '10:00 — 18:00' },
    servicesList: {
      ru: ['Закатный круиз', 'VIP-чартер'],
      en: ['Sunset cruise', 'VIP charter'],
      ky: ['Кечки круиз', 'VIP-чартер'],
    },
  },
  {
    name: { ru: 'Тамга', en: 'Tamga', ky: 'Тамга' },
    badge: null,
    lat: 42.51,
    lng: 77.55,
    address: { ru: 'Село Тамга, южный берег', en: 'Tamga village, south shore', ky: 'Тамга айылы, түштүк жээк' },
    hours: { ru: '10:00 — 17:00 (сезон)', en: '10:00 — 17:00 (seasonal)', ky: '10:00 — 17:00 (мезгил)' },
    servicesList: {
      ru: ['Экскурсии', 'Трансфер'],
      en: ['Excursions', 'Transfer'],
      ky: ['Экскурсиялар', 'Трансфер'],
    },
  },
];

const routeDescriptions = [
  {
    name: { ru: 'Закатный круиз', en: 'Sunset Cruise', ky: 'Кечки круиз' },
    path: { ru: 'Чолпон-Ата → вдоль побережья → Чолпон-Ата', en: 'Cholpon-Ata → along the coast → Cholpon-Ata', ky: 'Чолпон-Ата → жээк боюнча → Чолпон-Ата' },
    duration: { ru: '2 часа', en: '2 hours', ky: '2 саат' },
    color: 'bg-orange-500',
  },
  {
    name: { ru: 'Утренний круиз', en: 'Morning Cruise', ky: 'Эртеңки круиз' },
    path: { ru: 'Бостери → восточное побережье → Бостери', en: 'Bosteri → east coast → Bosteri', ky: 'Бостери → чыгыш жээк → Бостери' },
    duration: { ru: '1.5 часа', en: '1.5 hours', ky: '1.5 саат' },
    color: 'bg-sky',
  },
  {
    name: { ru: 'Скоростной тур', en: 'Speed Tour', ky: 'Ылдам тур' },
    path: { ru: 'Чолпон-Ата → открытое озеро → Чолпон-Ата', en: 'Cholpon-Ata → open lake → Cholpon-Ata', ky: 'Чолпон-Ата → ачык көл → Чолпон-Ата' },
    duration: { ru: '40 мин', en: '40 min', ky: '40 мүн' },
    color: 'bg-red-500',
  },
  {
    name: { ru: 'Трансфер', en: 'Transfer', ky: 'Трансфер' },
    path: { ru: 'Чолпон-Ата ↔ Бостери', en: 'Cholpon-Ata ↔ Bosteri', ky: 'Чолпон-Ата ↔ Бостери' },
    duration: { ru: '30 мин', en: '30 min', ky: '30 мүн' },
    color: 'bg-green-500',
  },
];

export default function MapPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';

  const l = (obj: Record<string, string>) => obj[lang] || obj.ru;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#0F2B46] text-white py-16 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">{l(t.hero)}</h1>
        <p className="text-foam/70 max-w-xl mx-auto">{l(t.subtitle)}</p>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Breadcrumbs items={[{ label: l(t.hero) }]} />
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d370000!2d76.5!3d42.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c5e2e27a3b%3A0x6f2a7c29d3f4d8a1!2z0KfQvtC70L_QvtC9LdCQ0YLQsA!5e0!3m2!1sru!2skg!4v1"
            className="w-full h-[50vh] md:h-[70vh] border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lake Issyk-Kul Map"
          />
        </div>
      </div>

      {/* Routes sidebar cards */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <h2 className="text-2xl font-bold text-navy mb-4">{l(t.routes)}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {routeDescriptions.map((route) => (
            <div key={l(route.name)} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-3 h-3 rounded-full ${route.color} shrink-0`} />
                <h3 className="font-bold text-navy">{l(route.name)}</h3>
              </div>
              <p className="text-sm text-muted mb-2">{l(route.path)}</p>
              <span className="inline-block text-xs font-semibold text-ocean bg-foam px-2.5 py-1 rounded-full">
                {l(route.duration)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Departure points */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-navy mb-4">{l(t.departures)}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {departures.map((point) => {
            const svc = point.servicesList[lang as keyof typeof point.servicesList] || point.servicesList.ru;
            return (
              <div key={l(point.name)} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center text-ocean font-bold text-lg">
                    {l(point.name).charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-navy">{l(point.name)}</h3>
                    {point.badge && (
                      <span className="text-xs font-semibold text-ocean bg-foam px-2 py-0.5 rounded-full">{l(point.badge)}</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted mb-2">{l(point.address)}</p>
                <p className="text-sm mb-3"><span className="font-semibold text-navy">{l(t.hours)}:</span> {l(point.hours)}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-navy mb-1">{l(t.services)}:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.map((s) => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{s}</span>
                    ))}
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean hover:text-ocean-dark transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {l(t.directions)}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
