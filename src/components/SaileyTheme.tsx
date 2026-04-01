'use client';

import { useTheme } from '@/lib/theme-context';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

const FOOTER_BG = '#0C3547';
const GOLD = '#C5A028';

// SVG coastline paths — realistic torn edge matching Sailey reference
// Hero bottom: water photo hangs down with ragged shoreline edge
const HERO_BOTTOM_PATH = "M0,0 L0,85 C8,82 12,88 18,84 C22,80 25,86 30,82 C34,78 38,85 42,80 C45,76 48,83 52,78 C55,74 58,82 62,76 C66,72 68,80 72,74 C76,70 78,78 82,73 C86,68 88,76 92,71 C95,67 97,74 100,72 C104,70 106,78 110,73 C114,68 116,76 120,72 C124,68 126,74 130,70 C134,66 137,73 140,68 C143,64 146,72 150,66 C154,62 156,70 160,64 C164,60 167,68 170,63 C173,58 176,67 180,62 C184,57 186,66 190,60 C194,55 196,64 200,58 C204,53 207,62 210,56 C213,52 216,60 220,55 C224,50 226,58 230,52 C234,48 237,56 240,50 C244,46 246,54 250,48 C254,44 256,52 260,46 C264,42 266,50 270,44 C274,40 277,48 280,43 C284,38 286,46 290,40 C293,36 296,44 300,38 C310,42 320,36 330,44 C340,38 350,46 360,40 C370,44 380,38 390,46 C400,40 410,48 420,42 C430,46 440,40 450,48 C460,44 470,50 480,46 C490,52 500,46 510,54 C520,48 530,56 540,50 C550,54 560,48 570,56 C580,52 590,58 600,54 C610,58 620,52 630,60 C640,55 650,62 660,57 C670,62 680,56 690,64 C700,58 710,66 720,60 C730,65 740,58 750,67 C760,62 770,68 780,64 C790,68 800,62 810,70 C820,65 830,72 840,67 C850,72 860,66 870,74 C880,68 890,76 900,70 C920,75 940,68 960,76 C980,70 1000,78 1020,72 C1040,78 1060,72 1080,80 C1100,74 1120,82 1140,76 C1160,80 1180,74 1200,82 C1220,77 1240,84 1260,78 C1280,82 1300,76 1320,84 C1340,78 1360,86 1380,80 C1400,84 1420,78 1440,85 L1440,0Z";

// Footer top: water photo with ragged TOP edge
const FOOTER_TOP_PATH = "M0,120 L0,35 C10,38 20,32 30,36 C40,40 50,34 60,38 C70,42 80,36 90,40 C100,44 110,38 120,42 C130,46 140,40 150,44 C160,48 170,42 180,46 C190,50 200,44 210,48 C220,52 230,46 240,50 C250,54 260,48 270,52 C280,56 290,50 300,54 C310,58 320,52 330,56 C340,60 350,54 360,58 C370,62 380,56 390,60 C400,64 410,58 420,62 C440,58 460,66 480,60 C500,64 520,58 540,62 C560,56 580,64 600,58 C620,54 640,62 660,56 C680,52 700,60 720,54 C740,50 760,58 780,52 C800,48 820,56 840,50 C860,46 880,54 900,48 C920,44 940,52 960,46 C980,42 1000,50 1020,44 C1040,40 1060,48 1080,42 C1100,38 1120,46 1140,40 C1160,36 1180,44 1200,38 C1220,34 1240,42 1260,36 C1280,32 1300,40 1320,34 C1340,30 1360,38 1380,32 C1400,28 1420,36 1440,30 L1440,120Z";

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
          {/* Torn edge SVG — white shape covers bottom */}
          <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '120px' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d={HERO_BOTTOM_PATH} fill="#ffffff" transform="scale(1,-1) translate(0,-120)" />
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
          {/* Torn top edge — white covers top part */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', zIndex: 5 }} viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d={FOOTER_TOP_PATH} fill="#ffffff" transform="scale(1,-1) translate(0,-120)" />
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
