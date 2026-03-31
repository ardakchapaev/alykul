'use client';

import { useTheme } from '@/lib/theme-context';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

// Sailey teal palette
const TEAL = '#0E7490';
const DARK = '#0C3547';
const GOLD = '#C5A028';

// Rough coastline SVG path (organic, irregular like Sailey)
const WAVE_WHITE = "M0,30 C40,45 80,15 120,35 C160,55 200,20 240,40 C280,58 320,18 360,38 C400,56 440,16 480,36 C520,54 560,14 600,34 C640,52 680,12 720,32 C760,50 800,10 840,30 C880,48 920,10 960,30 C1000,48 1040,12 1080,32 C1120,50 1160,14 1200,34 C1240,52 1280,16 1320,36 C1360,54 1400,18 1440,38 L1440,80 L0,80Z";

const WAVE_DARK = "M0,25 C50,40 100,10 150,30 C200,50 250,15 300,35 C350,52 400,12 450,32 C500,48 550,8 600,28 C650,45 700,10 750,30 C800,48 850,12 900,32 C950,48 1000,8 1050,28 C1100,45 1150,10 1200,30 C1250,48 1300,12 1350,32 C1400,48 1440,20 1440,25 L1440,80 L0,80Z";

type SaileyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>;
  lang: string;
  catalogCards: Array<{ img: string; alt: string; category: string; name: string; price: string }>;
  reviews: Array<{ img: string; name: string; city: string; stars: number; text: string }>;
  galleryImages: string[];
};

export default function SaileyTheme({ dict: t, lang, catalogCards }: SaileyProps) {
  const { theme } = useTheme();
  if (theme !== 'M3') return null;

  const allCards = [
    ...catalogCards,
    ...catalogCards.slice(0, 2), // repeat to fill 9 cards (3x3 grid like Sailey)
    { img: '/images/scene5.jpg', alt: 'Fishing', category: t.catalog?.entertainment || 'Tour', name: lang === 'ru' ? 'Рыбалка на Иссык-Куле' : 'Fishing on Issyk-Kul', price: lang === 'ru' ? 'от 3 500 KGS' : 'from 3 500 KGS' },
    { img: '/images/scene4.jpg', alt: 'Panorama', category: t.catalog?.cruise || 'Cruise', name: lang === 'ru' ? 'Панорамный тур' : 'Panoramic Tour', price: lang === 'ru' ? 'от 2 500 KGS' : 'from 2 500 KGS' },
    { img: '/images/scene7.jpg', alt: 'Bosteri', category: t.catalog?.cruise || 'Cruise', name: lang === 'ru' ? 'Побережье Бостери' : 'Bosteri Coast', price: lang === 'ru' ? 'от 1 800 KGS' : 'from 1 800 KGS' },
  ].slice(0, 9);

  return (
    <div className="font-body" style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'auto', background: '#fff' }}>

      {/* ══ HERO ══ */}
      <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
        <Image src="/images/hero.jpg" alt="" fill style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${TEAL}dd 0%, ${TEAL}99 100%)` }} />

        {/* Nav */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 700, fontSize: '18px' }}>
            <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
              <circle cx="20" cy="20" r="18" fill={GOLD} opacity="0.3" />
              <path d="M12 26Q16 20 20 8Q24 20 28 26" stroke={GOLD} strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M10 28Q15 24 20 26Q25 28 30 24" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
            АЛЫКУЛ
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {['Home', lang === 'ru' ? 'Маршруты' : 'Routes', lang === 'ru' ? 'Флот' : 'Fleet', lang === 'ru' ? 'О нас' : 'About', lang === 'ru' ? 'Контакты' : 'Contacts'].map(item => (
              <span key={item} style={{ color: '#fff', fontSize: '13px', cursor: 'pointer', opacity: 0.9 }}>{item}</span>
            ))}
            <LanguageSwitcher current={lang} />
            <ThemeSwitcher />
          </div>
        </div>

        {/* Title */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginTop: '30px' }}>
          <h1 style={{ color: '#fff', fontSize: '42px', fontWeight: 700, fontFamily: 'var(--font-roboto-condensed), serif' }}>
            {lang === 'ru' ? 'Водный ' : 'Water '}<em style={{ fontStyle: 'italic' }}>{lang === 'ru' ? 'Туризм' : 'Tourism'}</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', maxWidth: '500px', margin: '12px auto 0' }}>
            {lang === 'ru' ? 'Откройте для себя незабываемые водные приключения на озере Иссык-Куль' : 'Discover unforgettable water adventures on Lake Issyk-Kul'}
          </p>
        </div>

        {/* Bottom wave — white, rough coastline */}
        <svg style={{ position: 'absolute', bottom: '-1px', left: 0, width: '100%', height: '80px' }} viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d={WAVE_WHITE} fill="#ffffff" />
        </svg>
      </div>

      {/* ══ CARDS GRID (3x3 like Sailey) ══ */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {allCards.map((card, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; }}
            >
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <Image src={card.img} alt={card.alt} fill style={{ objectFit: 'cover' }} />
                {/* Date badge like Sailey */}
                <div style={{
                  position: 'absolute', bottom: '10px', left: '10px',
                  background: GOLD, color: '#fff', padding: '4px 8px',
                  borderRadius: '4px', fontSize: '11px', fontWeight: 700, lineHeight: 1.2, textAlign: 'center',
                }}>
                  <div style={{ fontSize: '16px' }}>24</div>
                  <div>Mar</div>
                </div>
              </div>
              <div style={{ padding: '16px 18px 20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>{card.name}</h3>
                <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6, marginBottom: '12px' }}>
                  {lang === 'ru' ? 'Незабываемое водное приключение на озере Иссык-Куль. Бронируйте онлайн.' : 'An unforgettable water adventure on Lake Issyk-Kul. Book online.'}
                </p>
                <a href="#" style={{ color: TEAL, fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                  →{lang === 'ru' ? 'Подробнее' : 'Learn more'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <div style={{ position: 'relative' }}>
        {/* Top wave — dark coastline texture */}
        <svg style={{ display: 'block', width: '100%', height: '80px' }} viewBox="0 0 1440 80" preserveAspectRatio="none">
          <rect width="1440" height="80" fill="#ffffff" />
          <path d={WAVE_DARK} fill={DARK} />
        </svg>

        <div style={{ background: DARK, padding: '40px 40px 20px', color: '#fff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginBottom: '32px' }}>
            {/* Col 1 — Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 700, fontSize: '18px' }}>
                <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
                  <circle cx="20" cy="20" r="18" fill={GOLD} opacity="0.3" />
                  <path d="M12 26Q16 20 20 8Q24 20 28 26" stroke={GOLD} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
                АЛЫКУЛ
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                {lang === 'ru' ? 'Первая платформа водного туризма на Иссык-Куле.' : 'The first water tourism platform on Issyk-Kul.'}
              </p>
            </div>
            {/* Col 2 — Navigation */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Navigation</h4>
              {['Home', lang === 'ru' ? 'Маршруты' : 'Routes', lang === 'ru' ? 'О нас' : 'About Us', lang === 'ru' ? 'Услуги' : 'Services'].map(s => (
                <div key={s} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px', cursor: 'pointer' }}>{s}</div>
              ))}
            </div>
            {/* Col 3 — Quick Link */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Quick Link</h4>
              {[lang === 'ru' ? 'Контакты' : 'Contact Us', 'FAQ', lang === 'ru' ? 'Бронирование' : 'Booking', lang === 'ru' ? 'Расписание' : 'Schedule'].map(s => (
                <div key={s} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px', cursor: 'pointer' }}>{s}</div>
              ))}
            </div>
            {/* Col 4 — Services */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Services</h4>
              {['Home', lang === 'ru' ? 'Контакты' : 'Contact', lang === 'ru' ? 'Блог' : 'Blog', lang === 'ru' ? 'Флот' : 'Fleet'].map(s => (
                <div key={s} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px', cursor: 'pointer' }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              <span>📍 Чолпон-Ата, Иссык-Куль</span>
              <span>📞 +996 555 123 456</span>
              <span>✉️ info@alykul.kg</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['fb', 'tw', 'yt'].map(s => (
                <div key={s} style={{ width: '28px', height: '28px', borderRadius: '4px', background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', cursor: 'pointer' }}>
                  {s === 'fb' ? 'f' : s === 'tw' ? 't' : '▶'}
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '16px' }}>
            © 2026 Алыкул — All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}
