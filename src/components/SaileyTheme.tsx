'use client';

import { useTheme } from '@/lib/theme-context';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

const FOOTER_BG = '#0C3547';
const GOLD = '#C5A028';

// Torn paper edge — traced from Sailey/Stitch reference screenshot
// Irregular rip: deep tears on left, shallower middle, deep right, with micro-jaggedness
// This is the WHITE shape that sits on top of the dark section, torn along the top edge
const TORN_PAPER = "M0,150 L0,72 L5,74 L8,68 L12,71 L15,65 L18,69 L22,60 L26,64 L30,55 L33,59 L36,50 L40,54 L43,45 L46,48 L50,42 L54,46 L58,38 L60,42 L64,35 L68,40 L72,32 L74,36 L78,28 L82,33 L86,25 L88,30 L92,22 L96,28 L100,20 L103,25 L106,18 L110,23 L114,16 L118,22 L122,15 L125,20 L128,14 L132,19 L136,12 L140,17 L143,10 L146,15 L150,8 L154,14 L158,7 L162,12 L165,6 L168,10 L172,5 L176,9 L180,4 L184,8 L188,3 L192,7 L198,10 L204,6 L210,12 L216,8 L222,14 L228,10 L234,16 L240,12 L248,18 L256,14 L264,20 L272,16 L280,22 L288,18 L296,24 L304,20 L312,26 L320,22 L330,28 L340,24 L350,30 L360,26 L372,32 L384,28 L396,34 L408,30 L420,36 L432,32 L444,38 L456,34 L470,40 L484,36 L498,42 L512,38 L528,44 L544,40 L560,46 L576,42 L594,48 L612,44 L630,50 L648,46 L668,52 L688,48 L708,54 L728,50 L750,46 L772,50 L794,44 L816,48 L838,42 L860,46 L882,40 L904,44 L926,38 L948,42 L970,36 L992,40 L1014,34 L1036,38 L1058,32 L1078,36 L1098,30 L1116,34 L1134,28 L1150,32 L1166,26 L1180,30 L1194,24 L1206,28 L1218,22 L1228,26 L1238,20 L1248,24 L1256,18 L1264,22 L1272,16 L1278,20 L1284,14 L1290,18 L1296,12 L1302,16 L1308,10 L1314,14 L1320,8 L1326,12 L1332,6 L1338,10 L1344,5 L1350,9 L1356,4 L1362,8 L1368,3 L1374,7 L1380,2 L1386,6 L1392,3 L1398,7 L1404,4 L1410,8 L1416,5 L1422,10 L1428,6 L1434,12 L1440,8 L1440,150 Z";

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
    { img: '/images/scene5.jpg', alt: 'Tour', category: t.catalog?.entertainment || 'Tour', name: lang === 'ru' ? 'Рыбалка на Иссык-Куле' : 'Fishing on Issyk-Kul', price: 'от 3 500 KGS' },
    { img: '/images/scene4.jpg', alt: 'Panorama', category: t.catalog?.cruise || 'Cruise', name: lang === 'ru' ? 'Панорамный тур' : 'Panoramic Tour', price: 'от 2 500 KGS' },
    { img: '/images/scene7.jpg', alt: 'Coast', category: t.catalog?.cruise || 'Cruise', name: lang === 'ru' ? 'Побережье Бостери' : 'Bosteri Coast', price: 'от 1 800 KGS' },
    { img: '/images/captain2.jpg', alt: 'VIP', category: t.catalog?.charter || 'Charter', name: lang === 'ru' ? 'VIP-чартер' : 'VIP Charter', price: 'от 10 000 KGS' },
    { img: '/images/scene8.jpg', alt: 'Speed', category: t.catalog?.entertainment || 'Speed', name: lang === 'ru' ? 'Экстрим-тур' : 'Extreme Tour', price: 'от 4 000 KGS' },
  ].slice(0, 9);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'auto', background: '#fff', fontFamily: 'Rubik, sans-serif' }}>

      {/* ══════════ HERO — ocean photo with torn edge ══════════ */}
      <div style={{ position: 'relative' }}>
        {/* Ocean photo background with torn bottom edge */}
        <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
          <Image src="/images/hero.jpg" alt="" fill style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,80,100,0.35)' }} />
          {/* Torn paper edge — white rip at bottom */}
          <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px' }} viewBox="0 0 1440 150" preserveAspectRatio="none">
            <path d={TORN_PAPER} fill="#ffffff" />
          </svg>

          {/* Nav */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 700, fontSize: '18px' }}>
              <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                <circle cx="20" cy="20" r="18" fill={GOLD} opacity="0.3" />
                <path d="M12 26Q16 20 20 8Q24 20 28 26" stroke={GOLD} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M10 28Q15 24 20 26Q25 28 30 24" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
              АЛЫКУЛ
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              {['Home', lang === 'ru' ? 'Маршруты' : 'Routes', lang === 'ru' ? 'Флот' : 'Fleet', lang === 'ru' ? 'О нас' : 'About', lang === 'ru' ? 'Контакты' : 'Contacts'].map(item => (
                <span key={item} style={{ color: '#fff', fontSize: '13px', cursor: 'pointer', opacity: 0.9 }}>{item}</span>
              ))}
              <LanguageSwitcher current={lang} />
              <ThemeSwitcher />
            </div>
          </div>

          {/* Title */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginTop: '40px' }}>
            <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {lang === 'ru' ? 'Водный ' : 'Water '}&amp; <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{lang === 'ru' ? 'Туризм' : 'Tourism'}</em>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', maxWidth: '500px', margin: '12px auto 0' }}>
              {lang === 'ru' ? 'Откройте для себя незабываемые водные приключения на озере Иссык-Куль' : 'Discover unforgettable water adventures on Lake Issyk-Kul'}
            </p>
          </div>
        </div>
      </div>

      {/* ══════════ CARDS 3x3 ══════════ */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          {allCards.map((card, i) => (
            <div key={i} style={{
              background: '#fff', overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0',
              transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer',
            }}
              onMouseEnter={e => { (e.currentTarget).style.transform = 'translateY(-4px)'; (e.currentTarget).style.boxShadow = '0 12px 28px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget).style.transform = ''; (e.currentTarget).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
            >
              <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                <Image src={card.img} alt={card.alt} fill style={{ objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', bottom: '10px', left: '10px',
                  background: GOLD, color: '#fff', padding: '4px 10px',
                  borderRadius: '3px', fontSize: '11px', fontWeight: 700, lineHeight: 1.2, textAlign: 'center',
                }}>
                  <div style={{ fontSize: '17px', fontWeight: 800 }}>24</div>
                  <div>Mar</div>
                </div>
              </div>
              <div style={{ padding: '18px 20px 22px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px', lineHeight: 1.3 }}>{card.name}</h3>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.65, marginBottom: '14px' }}>
                  {lang === 'ru' ? 'Незабываемое водное приключение на озере Иссык-Куль. Бронируйте онлайн прямо сейчас.' : 'An unforgettable water adventure on Lake Issyk-Kul. Book online now.'}
                </p>
                <a style={{ color: '#0E7490', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                  →{lang === 'ru' ? 'Подробнее' : 'Learn more'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ FOOTER — ocean photo with torn top edge ══════════ */}
      <div style={{ position: 'relative' }}>
        {/* Ocean texture with torn TOP edge */}
        <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '80px' }}>
          <Image src="/images/hero.jpg" alt="" fill style={{ objectFit: 'cover', filter: 'brightness(0.3)' }} />
          {/* Torn paper edge — white rip at top (flipped) */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '150px', zIndex: 5, transform: 'scaleY(-1)' }} viewBox="0 0 1440 150" preserveAspectRatio="none">
            <path d={TORN_PAPER} fill="#ffffff" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${FOOTER_BG}dd 0%, ${FOOTER_BG}f5 100%)` }} />

          <div style={{ position: 'relative', zIndex: 10, padding: '40px 40px 20px', color: '#fff' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginBottom: '32px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', fontWeight: 700, fontSize: '18px' }}>
                  <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
                    <circle cx="20" cy="20" r="18" fill={GOLD} opacity="0.3" />
                    <path d="M12 26Q16 20 20 8Q24 20 28 26" stroke={GOLD} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                  АЛЫКУЛ
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  {lang === 'ru' ? 'Первая платформа водного туризма на озере Иссык-Куль. Круизы, чартеры, приключения.' : 'The first water tourism platform on Lake Issyk-Kul.'}
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '14px' }}>Navigation</h4>
                {['Home', lang === 'ru' ? 'Маршруты' : 'Routes', lang === 'ru' ? 'О нас' : 'About Us', lang === 'ru' ? 'Услуги' : 'Services'].map(s => (
                  <div key={s} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', cursor: 'pointer' }}>{s}</div>
                ))}
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '14px' }}>Quick Link</h4>
                {[lang === 'ru' ? 'Контакты' : 'Contact Us', 'FAQ', lang === 'ru' ? 'Бронирование' : 'Booking', lang === 'ru' ? 'Расписание' : 'Schedule'].map(s => (
                  <div key={s} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', cursor: 'pointer' }}>{s}</div>
                ))}
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '14px' }}>Services</h4>
                {['Home', lang === 'ru' ? 'Контакты' : 'Contact', lang === 'ru' ? 'Блог' : 'Blog', lang === 'ru' ? 'Флот' : 'Fleet'].map(s => (
                  <div key={s} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', cursor: 'pointer' }}>{s}</div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                <span>📍 Чолпон-Ата, Иссык-Куль</span>
                <span>📞 +996 555 123 456</span>
                <span>✉️ info@alykul.kg</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['f', 't', '▶'].map((s, i) => (
                  <div key={i} style={{ width: '30px', height: '30px', borderRadius: '4px', background: '#0E7490', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#fff', cursor: 'pointer' }}>{s}</div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '18px', paddingBottom: '12px' }}>
              © 2026 Алыкул — All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
