'use client';

import { useTheme } from '@/lib/theme-context';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import { ReactNode } from 'react';

const TEAL_DARK = '#0C3547';
const TEAL = '#0E7490';
const GOLD = '#C5A028';

type Props = {
  lang: string;
  children: ReactNode;
};

/**
 * M3 Sailey Theme — wraps existing page content with:
 * - Sailey-style hero (teal ocean + torn paper edge)
 * - Sailey-style footer (torn paper edge + dark teal)
 * - Middle content = same as M1
 */
export default function SaileyWrapper({ lang, children }: Props) {
  const { theme } = useTheme();
  if (theme !== 'M3') return null;

  const ru = lang === 'ru';
  const navItems = ['Home', ru ? 'Маршруты' : 'Routes', ru ? 'Флот' : 'Fleet', ru ? 'О нас' : 'About', ru ? 'Контакты' : 'Contacts'];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'auto', background: '#fff' }}>

      {/* ═══ SAILEY HERO ═══ */}
      <div style={{ background: TEAL_DARK }}>
        <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
          <Image src="/images/hero.jpg" alt="" fill style={{ objectFit: 'cover', opacity: 0.45 }} priority />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${TEAL_DARK} 0%, ${TEAL}aa 100%)` }} />

          {/* Nav */}
          <nav style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 48px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 700, fontSize: '16px' }}>
              <svg viewBox="0 0 36 36" width="32" height="32" fill="none">
                <circle cx="18" cy="18" r="16" fill={GOLD} opacity="0.25" />
                <path d="M10 24Q14 18 18 6Q22 18 26 24" stroke={GOLD} strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M8 26Q13 22 18 24Q23 26 28 22" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
              АЛЫКУЛ
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              {navItems.map(n => (
                <span key={n} style={{ color: '#fff', fontSize: '13px', cursor: 'pointer', opacity: 0.85 }}>{n}</span>
              ))}
              <div style={{ display: 'flex', gap: '5px', marginLeft: '6px' }}>
                {['f', 't', '▶'].map(s => (
                  <div key={s} style={{ width: '24px', height: '24px', borderRadius: '3px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff' }}>{s}</div>
                ))}
              </div>
              <LanguageSwitcher current={lang} />
              <ThemeSwitcher />
            </div>
          </nav>

          {/* Title */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '44px' }}>
            <h1 style={{ color: '#fff', fontSize: '44px', fontWeight: 700, fontFamily: 'Montserrat, Rubik, sans-serif', textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
              Blog &amp; <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Article</em>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', maxWidth: '440px', margin: '10px auto 0', lineHeight: 1.6 }}>
              {ru ? 'Откройте для себя незабываемые водные приключения на крупнейшем горном озере Центральной Азии' : 'Discover unforgettable water adventures on the largest alpine lake in Central Asia'}
            </p>
          </div>
        </div>

        {/* Torn paper — bottom of hero */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/torn-bottom.png" alt="" style={{ display: 'block', width: '100%', height: 'auto', marginTop: '-1px' }} />
      </div>

      {/* ═══ MIDDLE CONTENT — same as M1 ═══ */}
      <div>
        {children}
      </div>

      {/* ═══ SAILEY FOOTER ═══ */}
      <div style={{ background: TEAL_DARK }}>
        {/* Torn paper — top of footer */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/torn-top.png" alt="" style={{ display: 'block', width: '100%', height: 'auto', marginBottom: '-1px' }} />

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image src="/images/hero.jpg" alt="" fill style={{ objectFit: 'cover', opacity: 0.12 }} />
          <div style={{ position: 'absolute', inset: 0, background: TEAL_DARK, opacity: 0.93 }} />

          <div style={{ position: 'relative', zIndex: 10, padding: '48px 48px 16px', color: '#fff', maxWidth: '1140px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '32px', marginBottom: '28px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 700, fontSize: '16px' }}>
                  <svg viewBox="0 0 36 36" width="28" height="28" fill="none">
                    <circle cx="18" cy="18" r="16" fill={GOLD} opacity="0.25" />
                    <path d="M10 24Q14 18 18 6Q22 18 26 24" stroke={GOLD} strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                  SAILEY
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Navigation</h4>
                {['Home', 'Pages', 'About Us', 'Services'].map(s => (
                  <div key={s} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.45)', marginBottom: '6px', cursor: 'pointer' }}>{s}</div>
                ))}
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Quick Link</h4>
                {['Contact Us', 'FAQs', 'Booking', 'Pages'].map(s => (
                  <div key={s} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.45)', marginBottom: '6px', cursor: 'pointer' }}>{s}</div>
                ))}
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Services</h4>
                {['Home', 'Contact', 'Blog', '404'].map(s => (
                  <div key={s} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.45)', marginBottom: '6px', cursor: 'pointer' }}>{s}</div>
                ))}
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '24px', fontSize: '11.5px', color: 'rgba(255,255,255,0.4)' }}>
                <span>📍 Чолпон-Ата, Иссык-Куль</span>
                <span>📞 +996 555 123 456</span>
                <span>✉️ info@alykul.kg</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['f', 't', '▶'].map((s, i) => (
                  <div key={i} style={{ width: '28px', height: '28px', borderRadius: '4px', background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', cursor: 'pointer' }}>{s}</div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '14px', paddingBottom: '10px' }}>
              © 2026 Алыкул · All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
