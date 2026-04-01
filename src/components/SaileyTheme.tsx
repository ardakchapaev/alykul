'use client';

import { useTheme } from '@/lib/theme-context';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

const FOOTER_BG = '#0C3547';
const GOLD = '#C5A028';

// Pixel-traced from sailey-ref.png (1408x768) — white torn strip at y≈390-480
// Mapped to viewBox 0 0 1408 100, where 0=top of tear, 100=bottom
// The contour goes: left starts high, deep valley, ridge, deep valley, bumpy middle, deep right valleys
const TORN_PAPER = `M0,100 L0,45
L15,42 L25,48 L35,40 L42,46 L50,38 L58,44 L65,35 L72,42 L80,32 L88,40 L95,30
L105,38 L112,28 L120,36 L130,25 L140,34 L148,22 L158,32 L165,20 L175,30 L182,18
L192,28 L200,16 L210,26 L218,14 L228,24 L238,12 L248,22 L255,10 L265,20 L275,8
L285,18 L295,6 L305,16 L315,4 L328,14 L340,5 L355,15 L368,6 L382,16 L395,8
L410,18 L425,10 L440,20 L458,12 L475,22 L492,14 L510,24 L528,16 L545,26 L565,18
L585,28 L605,20 L625,30 L645,22 L668,32 L690,24 L712,34 L735,26 L758,36 L780,28
L800,38 L820,30 L838,40 L855,32 L870,42 L885,34 L898,44 L910,36 L922,46 L932,38
L942,48 L952,40 L960,50 L970,42 L978,52 L988,44 L995,54 L1005,46 L1012,56 L1022,48
L1030,58 L1040,50 L1048,60 L1058,52 L1068,42 L1078,50 L1088,40 L1098,48 L1108,38
L1118,46 L1128,35 L1138,44 L1148,32 L1160,42 L1170,30 L1182,40 L1192,28 L1205,38
L1215,26 L1228,36 L1238,24 L1250,34 L1260,22 L1272,32 L1282,20 L1295,30 L1305,18
L1318,28 L1328,16 L1340,26 L1350,14 L1362,24 L1372,12 L1382,22 L1392,10 L1400,20
L1408,15 L1408,100 Z`;

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
          {/* Torn paper edge — traced pixel-by-pixel from sailey-ref.png */}
          <svg style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: '100px' }} viewBox="0 0 1408 100" preserveAspectRatio="none">
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
