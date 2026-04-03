'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

const t = {
  ru: {
    back: '← На главную',
    heroTitle: 'О компании Алыкул',
    heroSub: 'Ваш проводник по водным просторам Иссык-Куля с 2021 года',
    historyTitle: 'Наша история',
    timeline: [
      { year: '2021', text: 'Основание компании. Приобретение первого судна и запуск водных прогулок из Чолпон-Аты' },
      { year: '2022', text: 'Запуск регулярных закатных круизов из Чолпон-Аты. Первые 1,000 довольных гостей' },
      { year: '2023', text: 'Приобретение яхты «Nomad». Запуск VIP-чартеров и частных мероприятий на воде' },
      { year: '2024', text: 'Расширение флота до 8 судов. Открытие базы в Бостери. Запуск скоростных туров' },
      { year: '2025', text: '12,000+ довольных гостей. Партнёрство с отелями и туроператорами Иссык-Куля' },
      { year: '2026', text: 'Запуск онлайн-платформы бронирования. Цифровая трансформация водного туризма' },
    ],
    fleetTitle: 'Наш флот',
    fleet: [
      { name: 'Алыкул', capacity: '200 пассажиров', desc: 'Флагманский теплоход для круизов и мероприятий. Два палубы, бар, танцпол, панорамный обзор.', img: '/images/alykul1.jpg' },
      { name: 'Nomad', capacity: '12 пассажиров', desc: 'Премиальная яхта для VIP-чартеров. Каюта, кухня, солнечная палуба, идеальна для приватных событий.', img: '/images/ep03.jpg' },
      { name: 'Скоростные катера', capacity: '8 пассажиров', desc: 'Адреналиновые туры по озеру. Скорость до 60 км/ч, водные лыжи, вейкборд.', img: '/images/scene6.jpg' },
    ],
    safetyTitle: 'Безопасность и сертификация',
    safety: [
      { icon: '📋', text: 'Лицензия на водный транспорт от Министерства транспорта КР' },
      { icon: '🔧', text: 'Ежедневный технический осмотр каждого судна перед выходом' },
      { icon: '🛟', text: 'Спасательное оборудование на каждом судне — жилеты, круги, аптечка' },
      { icon: '👨‍✈️', text: 'Обученные и сертифицированные капитаны с многолетним опытом' },
      { icon: '🛡️', text: 'Страховка для каждого пассажира на время водной прогулки' },
    ],
    teamTitle: 'Наша команда',
    teamCaptain: 'Капитан Алмаз',
    teamCaptainDesc: 'Более 15 лет опыта на водах Иссык-Куля. Знает каждую бухту и самые живописные маршруты. Гарантирует безопасность и незабываемые впечатления для каждого гостя.',
    contactTitle: 'Контакты',
    contactPhone: '+996 555 123 456',
    contactEmail: 'info@alykul.kg',
    contactAddress: 'Кыргызская Республика, Иссык-Кульская область, г. Чолпон-Ата, причал Алыкул',
    social: 'Мы в соцсетях',
    ctaTitle: 'Готовы к незабываемому путешествию?',
    ctaButton: 'Забронировать рейс',
  },
  en: {
    back: '← Home',
    heroTitle: 'About Alykul',
    heroSub: 'Your guide to Issyk-Kul waters since 2021',
    historyTitle: 'Our Story',
    timeline: [
      { year: '2021', text: 'Company founded. Acquisition of the first vessel and launch of water tours from Cholpon-Ata' },
      { year: '2022', text: 'Launch of regular sunset cruises from Cholpon-Ata. First 1,000 happy guests' },
      { year: '2023', text: 'Acquisition of the yacht "Nomad". Launch of VIP charters and private events' },
      { year: '2024', text: 'Fleet expansion to 8 vessels. Opening of Bosteri base. Launch of speed tours' },
      { year: '2025', text: '12,000+ happy guests. Partnerships with Issyk-Kul hotels and tour operators' },
      { year: '2026', text: 'Launch of online booking platform. Digital transformation of water tourism' },
    ],
    fleetTitle: 'Our Fleet',
    fleet: [
      { name: 'Alykul', capacity: '200 passengers', desc: 'Flagship cruise ship for tours and events. Two decks, bar, dance floor, panoramic views.', img: '/images/alykul1.jpg' },
      { name: 'Nomad', capacity: '12 passengers', desc: 'Premium yacht for VIP charters. Cabin, kitchen, sun deck, perfect for private events.', img: '/images/ep03.jpg' },
      { name: 'Speedboats', capacity: '8 passengers', desc: 'Adrenaline tours on the lake. Speed up to 60 km/h, water skiing, wakeboarding.', img: '/images/scene6.jpg' },
    ],
    safetyTitle: 'Safety & Certifications',
    safety: [
      { icon: '📋', text: 'Water transport license from the Ministry of Transport of KR' },
      { icon: '🔧', text: 'Daily technical inspection of every vessel before departure' },
      { icon: '🛟', text: 'Life-saving equipment on every vessel — vests, rings, first aid' },
      { icon: '👨‍✈️', text: 'Trained and certified captains with years of experience' },
      { icon: '🛡️', text: 'Insurance for every passenger during the water tour' },
    ],
    teamTitle: 'Our Team',
    teamCaptain: 'Captain Almaz',
    teamCaptainDesc: 'Over 15 years of experience on Issyk-Kul waters. Knows every bay and the most scenic routes. Guarantees safety and unforgettable experiences for every guest.',
    contactTitle: 'Contacts',
    contactPhone: '+996 555 123 456',
    contactEmail: 'info@alykul.kg',
    contactAddress: 'Kyrgyz Republic, Issyk-Kul Region, Cholpon-Ata, Alykul Pier',
    social: 'Follow us',
    ctaTitle: 'Ready for an unforgettable journey?',
    ctaButton: 'Book a Trip',
  },
  ky: {
    back: '← Башкы бет',
    heroTitle: 'Алыкул жөнүндө',
    heroSub: '2021-жылдан бери Ысык-Көлдүн суу кеңдигинде сиздин жол көрсөтүүчүңүз',
    historyTitle: 'Биздин тарых',
    timeline: [
      { year: '2021', text: 'Компания негизделди. Биринчи кеме сатылып алынды, Чолпон-Атадан суу сейилдөөлөр башталды' },
      { year: '2022', text: 'Чолпон-Атадан кечки круиздер башталды. Биринчи 1,000 ыраазы конок' },
      { year: '2023', text: '«Nomad» яхтасы сатылып алынды. VIP-чартерлер жана жеке иш-чаралар' },
      { year: '2024', text: 'Флот 8 кемеге чейин кеңейтилди. Бостериде база ачылды' },
      { year: '2025', text: '12,000+ ыраазы конок. Мейманканалар жана туроператорлор менен өнөктөштүк' },
      { year: '2026', text: 'Онлайн брондоо платформасы ишке киргизилди' },
    ],
    fleetTitle: 'Биздин флот',
    fleet: [
      { name: 'Алыкул', capacity: '200 жүргүнчү', desc: 'Круиздер жана иш-чаралар үчүн флагмандык теплоход. Эки палуба, бар, бий аянтчасы.', img: '/images/alykul1.jpg' },
      { name: 'Nomad', capacity: '12 жүргүнчү', desc: 'VIP-чартерлер үчүн премиум яхта. Каюта, ашкана, күнөстөө палубасы.', img: '/images/ep03.jpg' },
      { name: 'Ылдам катерлер', capacity: '8 жүргүнчү', desc: 'Көлдөгү адреналин турлар. 60 км/саат ылдамдык, суу лыжасы, вейкборд.', img: '/images/scene6.jpg' },
    ],
    safetyTitle: 'Коопсуздук жана сертификация',
    safety: [
      { icon: '📋', text: 'КР Транспорт министрлигинин суу транспорт лицензиясы' },
      { icon: '🔧', text: 'Ар бир кеменин чыгуу алдында күнүмдүк техникалык текшерүүсү' },
      { icon: '🛟', text: 'Ар бир кемеде куткаруу жабдуулары — жилеттер, тегеректер, дарыкана' },
      { icon: '👨‍✈️', text: 'Окутулган жана сертификатталган капитандар' },
      { icon: '🛡️', text: 'Ар бир жүргүнчү үчүн камсыздандыруу' },
    ],
    teamTitle: 'Биздин команда',
    teamCaptain: 'Капитан Алмаз',
    teamCaptainDesc: 'Ысык-Көл сууларында 15 жылдан ашык тажрыйба. Ар бир бухтаны жана эң кооз маршруттарды билет.',
    contactTitle: 'Байланыш',
    contactPhone: '+996 555 123 456',
    contactEmail: 'info@alykul.kg',
    contactAddress: 'Кыргыз Республикасы, Ысык-Көл облусу, Чолпон-Ата шаары, Алыкул причалы',
    social: 'Биз соц тармактарда',
    ctaTitle: 'Унутулгус саякатка даярсызбы?',
    ctaButton: 'Рейс брондоо',
  },
};

export default function AboutPage() {
  const params = useParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;

  // Simple scroll-reveal
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <main className="min-h-screen bg-sand">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/scene4.jpg"
          alt="Issyk-Kul panorama"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <Link
            href={`/${lang}`}
            className="inline-block text-foam/70 hover:text-white text-sm mb-8 transition-colors"
          >
            {labels.back}
          </Link>
          <h1 className="font-heading font-bold italic text-white text-4xl md:text-6xl lg:text-7xl mb-4 drop-shadow-lg">
            {labels.heroTitle}
          </h1>
          <p className="text-foam/80 text-lg md:text-xl">{labels.heroSub}</p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: lang === 'ru' ? 'О компании' : lang === 'ky' ? 'Компания жөнүндө' : 'About' }]} />
      </div>

      {/* Timeline / History */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            ref={addRevealRef}
            className="font-heading font-bold text-3xl md:text-4xl text-navy text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
          >
            {labels.historyTitle}
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-ocean/20 -translate-x-1/2" />
            {labels.timeline.map((item, i) => (
              <div
                key={item.year}
                ref={addRevealRef}
                className={`relative flex items-start mb-12 last:mb-0 opacity-0 translate-y-8 transition-all duration-700 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-ocean rounded-full border-4 border-sand -translate-x-1/2 z-10 mt-1" />
                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="inline-block font-heading font-bold text-2xl text-ocean mb-1">{item.year}</span>
                  <p className="text-navy/80 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2
            ref={addRevealRef}
            className="font-heading font-bold text-3xl md:text-4xl text-navy text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
          >
            {labels.fleetTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {labels.fleet.map((vessel, i) => (
              <div
                key={vessel.name}
                ref={addRevealRef}
                className="group rounded-2xl overflow-hidden bg-sand shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 opacity-0 translate-y-8"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={vessel.img}
                    alt={vessel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy/60 to-transparent h-20" />
                  <span className="absolute bottom-3 right-4 bg-white/90 text-navy text-xs font-medium px-3 py-1 rounded-full">
                    {vessel.capacity}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-navy mb-2">{vessel.name}</h3>
                  <p className="text-navy/70 text-sm leading-relaxed">{vessel.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Certifications */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            ref={addRevealRef}
            className="font-heading font-bold text-3xl md:text-4xl text-navy text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
          >
            {labels.safetyTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {labels.safety.map((item, i) => (
              <div
                key={i}
                ref={addRevealRef}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 opacity-0 translate-y-8"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <p className="text-navy/80 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2
            ref={addRevealRef}
            className="font-heading font-bold text-3xl md:text-4xl text-navy text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
          >
            {labels.teamTitle}
          </h2>
          <div
            ref={addRevealRef}
            className="flex flex-col md:flex-row items-center gap-8 opacity-0 translate-y-8 transition-all duration-700"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-ocean/20">
              <Image
                src="/images/captain2.jpg"
                alt={labels.teamCaptain}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-heading font-bold text-2xl text-navy mb-3">{labels.teamCaptain}</h3>
              <p className="text-navy/70 leading-relaxed">{labels.teamCaptainDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            ref={addRevealRef}
            className="font-heading font-bold text-3xl md:text-4xl text-navy text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
          >
            {labels.contactTitle}
          </h2>
          <div
            ref={addRevealRef}
            className="grid md:grid-cols-2 gap-8 opacity-0 translate-y-8 transition-all duration-700"
          >
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-md h-64 md:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2916.5!2d77.08!3d42.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDM5JzAwLjAiTiA3N8KwMDQnNDguMCJF!5e0!3m2!1sru!2skg!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 256 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Alykul location"
              />
            </div>
            {/* Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-ocean text-xl mt-0.5">📞</span>
                <div>
                  <p className="text-navy font-medium">{labels.contactPhone}</p>
                  <p className="text-muted text-sm">WhatsApp / Telegram</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-ocean text-xl mt-0.5">📧</span>
                <div>
                  <p className="text-navy font-medium">{labels.contactEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-ocean text-xl mt-0.5">📍</span>
                <div>
                  <p className="text-navy/80 text-sm leading-relaxed">{labels.contactAddress}</p>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-muted text-sm mb-3">{labels.social}</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center text-ocean hover:bg-ocean hover:text-white transition-colors" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center text-ocean hover:bg-ocean hover:text-white transition-colors" aria-label="Telegram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center text-ocean hover:bg-ocean hover:text-white transition-colors" aria-label="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy text-white text-center">
        <div
          ref={addRevealRef}
          className="max-w-2xl mx-auto opacity-0 translate-y-8 transition-all duration-700"
        >
          <h2 className="font-heading font-bold italic text-3xl md:text-5xl mb-8">
            {labels.ctaTitle}
          </h2>
          <Link
            href={`/${lang}/trips`}
            className="inline-block bg-ocean hover:bg-ocean-dark text-white font-medium px-10 py-4 rounded-xl text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ocean/30"
          >
            {labels.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
