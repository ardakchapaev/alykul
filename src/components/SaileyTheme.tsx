'use client';

import { useTheme } from '@/lib/theme-context';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

// Sailey teal palette
const TEAL = '#0E7490';
const DARK = '#0C3547';
const GOLD = '#C5A028';

// Jagged coastline — torn paper / mountain ridge silhouette (matches Sailey reference exactly)
// Sharp peaks, deep valleys, irregular rhythm — NOT smooth sine waves
const COASTLINE_WHITE = "M0,65 L20,58 L35,62 L50,45 L62,50 L75,38 L85,42 L100,28 L115,35 L130,22 L145,30 L160,18 L172,25 L185,15 L200,22 L220,10 L235,18 L250,8 L268,15 L280,5 L295,12 L310,3 L328,10 L345,6 L360,14 L380,8 L400,18 L415,12 L435,22 L450,15 L470,28 L485,20 L500,32 L515,25 L535,35 L548,28 L565,18 L580,25 L595,15 L612,22 L625,12 L640,20 L660,8 L680,15 L695,5 L710,12 L730,18 L745,10 L762,22 L778,15 L795,25 L810,18 L830,30 L845,22 L860,35 L878,28 L895,40 L910,32 L930,45 L945,38 L960,48 L978,42 L995,52 L1010,45 L1030,55 L1048,48 L1065,58 L1080,50 L1100,42 L1115,48 L1130,38 L1148,45 L1165,32 L1180,40 L1200,28 L1215,35 L1235,22 L1250,30 L1268,18 L1285,25 L1300,15 L1318,22 L1335,12 L1350,20 L1370,10 L1388,18 L1405,8 L1420,15 L1440,20 L1440,120 L0,120Z";

const COASTLINE_DARK = "M0,55 L18,48 L32,55 L48,40 L65,48 L80,32 L95,40 L110,25 L128,32 L142,18 L158,28 L175,12 L190,22 L208,8 L225,18 L240,5 L258,15 L275,3 L290,12 L308,5 L325,15 L340,8 L358,18 L375,10 L392,22 L410,15 L425,28 L442,20 L460,32 L475,22 L492,35 L510,25 L528,38 L545,28 L560,15 L578,25 L595,12 L610,22 L628,8 L645,18 L662,5 L680,15 L698,22 L715,12 L732,25 L750,15 L768,28 L785,18 L802,32 L820,22 L838,38 L855,28 L872,42 L890,32 L908,48 L925,38 L942,50 L960,42 L978,55 L995,45 L1012,58 L1030,48 L1048,40 L1065,48 L1082,35 L1100,45 L1118,30 L1135,40 L1152,25 L1170,35 L1188,20 L1205,30 L1222,15 L1240,25 L1258,12 L1275,22 L1292,8 L1310,18 L1328,5 L1345,15 L1362,8 L1380,18 L1398,10 L1415,20 L1440,15 L1440,120 L0,120Z";

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
        <svg style={{ position: 'absolute', bottom: '-1px', left: 0, width: '100%', height: '120px' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d={COASTLINE_WHITE} fill="#ffffff" />
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
        <svg style={{ display: 'block', width: '100%', height: '120px' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
          <rect width="1440" height="120" fill="#ffffff" />
          <path d={COASTLINE_DARK} fill={DARK} />
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
