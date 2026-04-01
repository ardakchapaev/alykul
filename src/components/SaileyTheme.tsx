'use client';

import { useTheme } from '@/lib/theme-context';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

const GOLD = '#C5A028';
const TEAL = '#0E7490';

type SaileyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>;
  lang: string;
  catalogCards: Array<{ img: string; alt: string; category: string; name: string; price: string }>;
  reviews: Array<{ img: string; name: string; city: string; stars: number; text: string }>;
  galleryImages: string[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SaileyTheme({ dict: t, lang, catalogCards }: SaileyProps) {
  const { theme } = useTheme();
  if (theme !== 'M3') return null;

  const allCards = [
    ...catalogCards,
    { img: '/images/scene5.jpg', alt: 'Tour', category: 'Tour', name: lang === 'ru' ? 'Рыбалка на Иссык-Куле' : 'Fishing on Issyk-Kul', price: '3 500 KGS' },
    { img: '/images/scene4.jpg', alt: 'Panorama', category: 'Cruise', name: lang === 'ru' ? 'Панорамный тур' : 'Panoramic Tour', price: '2 500 KGS' },
    { img: '/images/scene7.jpg', alt: 'Coast', category: 'Cruise', name: lang === 'ru' ? 'Побережье Бостери' : 'Bosteri Coast', price: '1 800 KGS' },
    { img: '/images/captain2.jpg', alt: 'VIP', category: 'Charter', name: lang === 'ru' ? 'VIP-чартер' : 'VIP Charter', price: '10 000 KGS' },
    { img: '/images/scene8.jpg', alt: 'Speed', category: 'Speed', name: lang === 'ru' ? 'Экстрим-тур' : 'Extreme Tour', price: '4 000 KGS' },
  ].slice(0, 9);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'auto', background: '#fff', fontFamily: 'Rubik, sans-serif' }}>

      {/* ══════════ HERO ══════════ */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Ocean photo + dark teal overlay */}
        <div style={{ position: 'relative', height: '320px' }}>
          <Image src="/images/hero.jpg" alt="" fill style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0C3547 0%, #0E7490cc 100%)' }} />

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
            <h1 style={{ color: '#fff', fontSize: '46px', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {lang === 'ru' ? 'Водный' : 'Water'} &amp; <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{lang === 'ru' ? 'Туризм' : 'Tourism'}</em>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', maxWidth: '500px', margin: '10px auto 0' }}>
              {lang === 'ru' ? 'Откройте для себя незабываемые водные приключения на озере Иссык-Куль' : 'Discover unforgettable water adventures on Lake Issyk-Kul'}
            </p>
          </div>
        </div>

        {/* TORN PAPER EDGE — real image from reference */}
        <img
          src="/images/torn-bottom.png"
          alt=""
          style={{ display: 'block', width: '100%', height: '80px', objectFit: 'cover', marginTop: '-40px', position: 'relative', zIndex: 20 }}
        />
      </div>

      {/* ══════════ CARDS 3×3 ══════════ */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '26px' }}>
          {allCards.map((card, i) => (
            <div key={i} style={{
              background: '#fff', overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #eee',
              transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'; }}
            >
              <div style={{ position: 'relative', height: '185px', overflow: 'hidden' }}>
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
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px', lineHeight: 1.3 }}>{card.name}</h3>
                <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.65, marginBottom: '14px' }}>
                  {lang === 'ru' ? 'Незабываемое водное приключение на озере Иссык-Куль. Бронируйте онлайн.' : 'An unforgettable water adventure on Lake Issyk-Kul. Book online now.'}
                </p>
                <a style={{ color: TEAL, fontSize: '13px', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}>
                  →{lang === 'ru' ? 'Подробнее' : 'Learn more'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ FOOTER ══════════ */}
      <div style={{ position: 'relative' }}>
        {/* TORN PAPER EDGE — flipped, real image from reference */}
        <img
          src="/images/torn-top.png"
          alt=""
          style={{ display: 'block', width: '100%', height: '80px', objectFit: 'cover', position: 'relative', zIndex: 20, marginBottom: '-40px' }}
        />

        {/* Footer with ocean photo bg */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image src="/images/hero.jpg" alt="" fill style={{ objectFit: 'cover', filter: 'brightness(0.25)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0C3547ee 0%, #0C3547f8 100%)' }} />

          <div style={{ position: 'relative', zIndex: 10, padding: '60px 40px 20px', color: '#fff' }}>
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
                {['Home', lang === 'ru' ? 'Страницы' : 'Pages', lang === 'ru' ? 'О нас' : 'About Us', lang === 'ru' ? 'Услуги' : 'Services'].map(s => (
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
                {['Home', lang === 'ru' ? 'Контакты' : 'Contact', lang === 'ru' ? 'Блог' : 'Blog', '404'].map(s => (
                  <div key={s} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', cursor: 'pointer' }}>{s}</div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                <span>📍 Чолпон-Ата, Иссык-Куль</span>
                <span>📞 +996 555 123 456</span>
                <span>✉️ info@alykul.kg</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['f', 't', '▶'].map((s, i) => (
                  <div key={i} style={{ width: '30px', height: '30px', borderRadius: '4px', background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#fff', cursor: 'pointer' }}>{s}</div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '16px', paddingBottom: '12px' }}>
              © 2026 Алыкул — All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
