'use client';

import { useTheme, THEMES } from '@/lib/theme-context';
import { useAuth } from '@/lib/auth-context';
import { ScrollReveal } from './M3Animations';
import Image from 'next/image';
import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════════
   M6 — Classic Theme: Montserrat + Open Sans, navy/ocean palette
   Converted from the original HTML/CSS mockup — 1:1 design fidelity
   YouTube hero video, glass-morphism booking widget, stats bar
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function ClassicWrapper({ lang }: { lang: string }) {
  const { theme } = useTheme();
  if (theme !== 'M6') return null;

  const t = getTrans(lang);

  return (
    <div className="fixed inset-0 z-[9999] overflow-auto bg-[#fafaf8]">
      <M6Hero t={t} lang={lang} />
      <M6Stats t={t} />
      <M6USP t={t} />
      <M6Gallery />
      <M6Routes t={t} lang={lang} />
      <M6Schedule t={t} />
      <M6Fleet t={t} />
      <M6About t={t} />
      <M6Reviews t={t} />
      <M6Map t={t} />
      <M6Footer t={t} lang={lang} />
    </div>
  );
}

/* ═══════════════ NAVBAR — Navy bar fixed at bottom of hero, scrolled → top ═══════════════ */
function M6Nav({ lang, t, scrolled }: { lang: string; t: Tr; scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  const links = [
    { href: '#m6-routes', label: t.nav.routes },
    { href: '#m6-fleet', label: t.nav.fleet },
    { href: '#m6-schedule', label: t.nav.schedule },
    { href: '#m6-about', label: t.nav.about },
    { href: '#m6-reviews', label: t.nav.reviews },
    { href: '#m6-contacts', label: t.nav.contacts },
    { href: `/${lang}/trips`, label: t.nav.booking },
  ];
  const langLabels: Record<string, string> = { ru: 'RU', en: 'EN', ky: 'KY' };
  const themes = THEMES;

  return (
    <nav className={`fixed left-0 right-0 z-[10000] transition-all duration-300 ${
      scrolled
        ? 'top-0 bg-[#182F48]/[0.98] backdrop-blur-xl'
        : 'bottom-0 bg-[#182F48]/85 backdrop-blur-xl'
    }`}>
      <div className="flex items-center justify-between px-6 md:px-14 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 text-white font-heading font-bold text-[22px] uppercase tracking-[1px]">
          <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none">
            <defs><linearGradient id="m6LogoGrad" x1="0" y1="0" x2="40" y2="40"><stop offset="0%" stopColor="#3a8ef7" /><stop offset="100%" stopColor="#246DC9" /></linearGradient></defs>
            <path d="M20 4 C20 4 8 18 8 24 C8 28 12 32 20 32 C28 32 32 28 32 24 C32 18 20 4 20 4Z" fill="url(#m6LogoGrad)" opacity="0.15" />
            <path d="M12 26 Q16 20 20 8 Q24 20 28 26" stroke="url(#m6LogoGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M10 28 Q15 24 20 26 Q25 28 30 24" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M8 32 Q14 28 20 30 Q26 32 32 28" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
          </svg>
          {t.brand}
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-[#EAF4F6] text-sm font-body font-medium uppercase tracking-[0.5px] hover:text-[#246DC9] transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); }}
              className="text-white/60 text-xs tracking-wider font-body hover:text-white transition-colors"
            >
              {langLabels[lang] || 'RU'}
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 bg-[#182F48] border border-white/10 rounded-lg py-1 min-w-[60px]">
                {Object.entries(langLabels).map(([code, label]) => (
                  <a key={code} href={`/${code}`} className="block px-4 py-1.5 text-xs text-white/60 hover:text-white font-body transition-colors">
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Theme switcher */}
          <div className="relative">
            <button
              onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); }}
              className="text-white/60 text-xs tracking-wider font-body hover:text-white transition-colors"
            >
              M6
            </button>
            {themeOpen && (
              <div className="absolute top-full right-0 mt-2 bg-[#182F48] border border-white/10 rounded-lg py-1 min-w-[70px]">
                {themes.map(th => (
                  <button key={th} onClick={() => { setTheme(th); setThemeOpen(false); }}
                    className={`block w-full text-left px-4 py-1.5 text-xs font-body transition-colors ${
                      theme === th ? 'text-[#3a8ef7]' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {th}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth */}
          {user ? (
            <a href={`/${lang}/account`} className="flex items-center gap-1.5 text-white text-sm font-medium hover:text-[#3a8ef7] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span className="hidden sm:inline">{user.name || user.phone.slice(-4)}</span>
            </a>
          ) : (
            <a href={`/${lang}/auth`} className="px-4 py-1.5 bg-[#246DC9] hover:bg-[#1a5ab0] text-white text-sm font-semibold rounded-lg transition-colors">
              {t.nav.signin}
            </a>
          )}

          {/* Mobile menu */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white/70 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="lg:hidden bg-[#182F48]/98 backdrop-blur-xl border-t border-white/10 px-6 py-6">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-2.5 text-[#EAF4F6] text-sm font-body font-medium uppercase tracking-[0.5px] hover:text-[#246DC9] transition-colors">
              {l.label}
            </a>
          ))}
          {user ? (
            <a href={`/${lang}/account`} onClick={() => setOpen(false)}
              className="block py-2.5 text-white text-sm font-medium hover:text-[#3a8ef7] transition-colors">
              {user.name || user.phone.slice(-4)}
            </a>
          ) : (
            <a href={`/${lang}/auth`} onClick={() => setOpen(false)}
              className="block py-2.5 text-[#3a8ef7] text-sm font-bold">
              {t.nav.signin}
            </a>
          )}
        </div>
      )}
    </nav>
  );
}

/* ═══════════════ HERO — YouTube video + glass booking widget ═══════════════ */
function M6Hero({ t, lang }: { t: Tr; lang: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = document.querySelector('[class*="fixed inset-0 z-\\[9999\\]"]');
    const target = container || window;
    const onScroll = () => {
      const y = container ? (container as HTMLElement).scrollTop : window.scrollY;
      setScrolled(y > 80);
    };
    target.addEventListener('scroll', onScroll, { passive: true });
    return () => target.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden" id="m6-hero">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/ALq1avfUkmQ?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=ALq1avfUkmQ&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-full min-w-[177.78vh]"
          allow="autoplay; encrypted-media"
          title="Alykul video background"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[rgba(10,22,40,0.75)] via-[rgba(24,47,72,0.5)] to-[rgba(36,109,201,0.2)]" />

      {/* Hero content */}
      <div className="relative z-[2] px-6 md:px-14 max-w-[650px]">
        <ScrollReveal>
          <div className="flex items-center gap-3 text-[#EAF4F6]/70 text-sm uppercase tracking-[2px] mb-10 font-body">
            {t.hero.brand}
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <h1 className="font-heading font-bold italic text-white text-[42px] md:text-[76px] leading-[1.05] uppercase mb-4 drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
            {t.hero.title1}<br />{t.hero.title2}
          </h1>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-[#EAF4F6] text-lg mb-8 opacity-90 font-body">{t.hero.subtitle}</p>
        </ScrollReveal>

        {/* Booking widget — glass morphism */}
        <ScrollReveal>
          <div className="bg-white/[0.12] backdrop-blur-[16px] border border-white/[0.15] rounded-2xl p-6">
            <div className="flex flex-col md:flex-row gap-3 items-end">
              <div className="flex-1 w-full">
                <label className="block text-[#EAF4F6] text-xs font-medium mb-1.5 uppercase tracking-[0.5px] font-body">{t.booking.pier}</label>
                <select className="w-full px-4 py-3 border border-white/20 rounded-[10px] bg-white/[0.08] text-white text-sm font-body outline-none focus:border-[#246DC9] transition-colors [&>option]:text-[#182F48] [&>option]:bg-white">
                  <option>{t.booking.piers[0]}</option>
                  <option>{t.booking.piers[1]}</option>
                  <option>{t.booking.piers[2]}</option>
                  <option>{t.booking.piers[3]}</option>
                </select>
              </div>
              <div className="flex-1 w-full">
                <label className="block text-[#EAF4F6] text-xs font-medium mb-1.5 uppercase tracking-[0.5px] font-body">{t.booking.date}</label>
                <input type="date" defaultValue="2026-07-15"
                  className="w-full px-4 py-3 border border-white/20 rounded-[10px] bg-white/[0.08] text-white text-sm font-body outline-none focus:border-[#246DC9] transition-colors" />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-[#EAF4F6] text-xs font-medium mb-1.5 uppercase tracking-[0.5px] font-body">{t.booking.guests}</label>
                <select className="w-full px-4 py-3 border border-white/20 rounded-[10px] bg-white/[0.08] text-white text-sm font-body outline-none focus:border-[#246DC9] transition-colors [&>option]:text-[#182F48] [&>option]:bg-white">
                  {t.booking.guestOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <a href={`/${lang}/trips`}
                className="px-8 py-3 bg-[#246DC9] hover:bg-[#1a5ab0] text-white text-base font-semibold rounded-[10px] whitespace-nowrap font-body transition-colors text-center w-full md:w-auto">
                {t.booking.search}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center text-white/70 animate-bounce">
        <span className="text-xs uppercase tracking-[2px] mb-2 font-body">{t.hero.scroll}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
      </div>

      {/* Navbar — bottom of hero, scrolls to top */}
      <M6Nav lang={lang} t={t} scrolled={scrolled} />
    </section>
  );
}

/* ═══════════════ STATS BAR — Ocean bg, 4 counters ═══════════════ */
function M6Stats({ t }: { t: Tr }) {
  return (
    <div className="bg-[#246DC9] text-white px-6 md:px-14 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {t.stats.map((stat, i) => (
          <ScrollReveal key={i}>
            <div className="py-2">
              <h3 className="font-heading font-bold text-4xl md:text-5xl mb-1">{stat.value}</h3>
              <p className="text-sm opacity-80 uppercase tracking-[1px] font-body">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ USP — Navy bg, 3x2 grid ═══════════════ */
function M6USP({ t }: { t: Tr }) {
  return (
    <section className="bg-[#182F48] text-[#EAF4F6] px-6 md:px-14 py-16 md:py-20">
      <ScrollReveal>
        <h2 className="font-heading font-bold text-3xl md:text-[42px] uppercase text-white mb-3">{t.usp.title}</h2>
        <p className="text-[#8EA0A2] text-base mb-10 font-body">{t.usp.subtitle}</p>
      </ScrollReveal>
      <div className="grid md:grid-cols-3 gap-8">
        {t.usp.items.map((item, i) => (
          <ScrollReveal key={i}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a5ab0] to-[#3a8ef7] flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(36,109,201,0.35)]">
                <USPIcon index={i} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1.5 font-body">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed font-body">{item.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ GALLERY STRIP — Horizontal photo strip ═══════════════ */
function M6Gallery() {
  const images = ['hero.jpg', 'scene7.jpg', 'scene6.jpg', 'q02.jpg', 'alykul1.jpg', 'kids.jpg', 'promo.jpg', 'scene4.jpg'];
  return (
    <div className="bg-[#182F48] overflow-hidden">
      <div className="flex gap-1 w-max">
        {images.map(img => (
          <Image key={img} src={`/images/${img}`} alt="" width={300} height={200}
            className="h-[200px] w-auto object-cover brightness-90 hover:brightness-110 transition-all duration-300" />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ ROUTES — 4 cards grid ═══════════════ */
function M6Routes({ t, lang }: { t: Tr; lang: string }) {
  return (
    <section className="px-6 md:px-14 py-16 md:py-20 bg-[#fafaf8]" id="m6-routes">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <span className="font-heading font-bold text-3xl md:text-[42px] uppercase">{t.routes.title}</span>
            <span className="ml-3 px-4 py-1.5 rounded-full bg-[#246DC9] text-white text-xs font-semibold uppercase font-body">
              {t.routes.badge}
            </span>
          </div>
        </div>
      </ScrollReveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.routes.items.map((card, i) => (
          <ScrollReveal key={i}>
            <a href={`/${lang}/trips`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Image src={card.img} alt={card.name} width={400} height={220}
                className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-4">
                <div className="text-xs text-[#8EA0A2] uppercase mb-2 font-body">{card.category}</div>
                <h3 className="text-base font-semibold mb-1 font-body">{card.name}</h3>
                <div className="text-lg font-bold text-[#246DC9] font-body">{card.price}</div>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ SCHEDULE — 5-row table ═══════════════ */
function M6Schedule({ t }: { t: Tr }) {
  return (
    <section className="bg-[#F4F8FB] px-6 md:px-14 py-16 md:py-20" id="m6-schedule">
      <ScrollReveal>
        <div className="mb-8">
          <span className="font-heading font-bold text-3xl md:text-[42px] uppercase">{t.schedule.title}</span>
          <span className="ml-3 px-4 py-1.5 rounded-full bg-[#246DC9] text-white text-xs font-semibold uppercase font-body">
            {t.schedule.badge}
          </span>
        </div>
        <p className="text-[#8EA0A2] text-base mb-8 font-body">{t.schedule.subtitle}</p>
      </ScrollReveal>
      <ScrollReveal>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#182F48] text-white text-sm font-semibold font-body">
                <th className="text-left py-3.5 px-4">{t.schedule.cols.route}</th>
                <th className="text-left py-3.5 px-4">{t.schedule.cols.vessel}</th>
                <th className="text-left py-3.5 px-4">{t.schedule.cols.departure}</th>
                <th className="text-left py-3.5 px-4">{t.schedule.cols.duration}</th>
                <th className="text-left py-3.5 px-4">{t.schedule.cols.price}</th>
                <th className="text-left py-3.5 px-4">{t.schedule.cols.frequency}</th>
              </tr>
            </thead>
            <tbody>
              {t.schedule.rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-[#246DC9]/5 transition-colors">
                  <td className="py-3 px-4 text-sm font-body">{row.route}</td>
                  <td className="py-3 px-4 text-sm font-body">{row.vessel}</td>
                  <td className="py-3 px-4 text-sm font-body">{row.departure}</td>
                  <td className="py-3 px-4 text-sm font-body">{row.duration}</td>
                  <td className="py-3 px-4 text-sm font-semibold font-body">{row.price}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold font-body ${row.freqClass}`}>{row.freq}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ═══════════════ FLEET — 3 vessel cards ═══════════════ */
function M6Fleet({ t }: { t: Tr }) {
  return (
    <section className="px-6 md:px-14 py-16 md:py-20 bg-[#fafaf8]" id="m6-fleet">
      <ScrollReveal>
        <div className="mb-8">
          <span className="font-heading font-bold text-3xl md:text-[42px] uppercase">{t.fleet.title}</span>
          <span className="ml-3 px-4 py-1.5 rounded-full bg-[#246DC9] text-white text-xs font-semibold uppercase font-body">
            {t.fleet.badge}
          </span>
        </div>
        <p className="text-[#8EA0A2] text-base mb-8 font-body">{t.fleet.subtitle}</p>
      </ScrollReveal>
      <div className="grid md:grid-cols-3 gap-6">
        {t.fleet.items.map((vessel, i) => (
          <ScrollReveal key={i}>
            <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Image src={vessel.img} alt={vessel.name} width={400} height={220}
                className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 font-body">{vessel.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {vessel.specs.map((spec, j) => (
                    <span key={j} className="text-xs bg-[#e8f0fe] text-[#246DC9] px-2.5 py-1 rounded-md font-medium font-body">{spec}</span>
                  ))}
                </div>
                <p className="text-[#6b7280] text-sm font-body">{vessel.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ ABOUT — 2 columns text + photo ═══════════════ */
function M6About({ t }: { t: Tr }) {
  return (
    <section className="px-6 md:px-14 py-16 md:py-20 bg-[#fafaf8]" id="m6-about">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <ScrollReveal>
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-[42px] uppercase mb-4">{t.about.title}</h2>
            <p className="text-base text-[#555] leading-relaxed mb-6 font-body">{t.about.text1}</p>
            <p className="text-base text-[#555] leading-relaxed mb-6 font-body">{t.about.text2}</p>
            <div className="columns-2 gap-6">
              {t.about.links.map((link, i) => (
                <a key={i} href={link.href} className="block text-[#246DC9] text-sm font-medium mb-2 hover:underline font-body">
                  &bull; {link.label}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden">
            <Image src="/images/scene4.jpg" alt="Alykul" width={600} height={400}
              className="w-full h-[350px] object-cover rounded-2xl" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ REVIEWS — 3 cards ═══════════════ */
function M6Reviews({ t }: { t: Tr }) {
  return (
    <section className="bg-[#F4F8FB] px-6 md:px-14 py-16 md:py-20" id="m6-reviews">
      <ScrollReveal>
        <div className="mb-8">
          <span className="font-heading font-bold text-3xl md:text-[42px] uppercase">{t.reviews.title}</span>
          <span className="ml-3 px-4 py-1.5 rounded-full bg-[#246DC9] text-white text-xs font-semibold uppercase font-body">
            {t.reviews.badge}
          </span>
        </div>
      </ScrollReveal>
      <div className="grid md:grid-cols-3 gap-6">
        {t.reviews.items.map((review, i) => (
          <ScrollReveal key={i}>
            <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Image src={review.img} alt={review.name} width={400} height={220}
                className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <div className="text-yellow-400 text-base mb-2">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</div>
                <div className="font-semibold text-[15px] font-body">{review.name}</div>
                <div className="text-[13px] text-[#8EA0A2] mb-2 font-body">{review.city}</div>
                <p className="text-sm text-[#555] leading-relaxed font-body">{review.text}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ MAP + CONTACT FORM ═══════════════ */
function M6Map({ t }: { t: Tr }) {
  const API_URL = 'https://alykul.baimuras.pro/api/v1';
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  const handleContact = async () => {
    try {
      await fetch(`${API_URL}/forms/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactForm.name, phone: contactForm.phone, message: contactForm.message, subject: 'Landing form', email: '' }),
      });
      setContactSent(true);
    } catch {}
  };

  return (
    <section className="px-6 md:px-14 py-16 md:py-20 bg-[#fafaf8]" id="m6-contacts">
      <ScrollReveal>
        <h2 className="font-heading font-bold text-3xl md:text-[42px] uppercase text-center mb-12">{t.contact.title}</h2>
      </ScrollReveal>
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-8">
        {/* Left: Form + Contacts */}
        <ScrollReveal>
          <div>
            {contactSent ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4 text-[#246DC9]">&#10003;</div>
                <p className="text-[#246DC9] font-semibold text-lg font-body">{t.contact.sent}</p>
              </div>
            ) : (
              <form className="space-y-4 mb-8" onSubmit={(e) => { e.preventDefault(); handleContact(); }}>
                <input type="text" placeholder={t.contact.name} value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#246DC9] focus:ring-1 focus:ring-[#246DC9] rounded-xl outline-none transition-colors font-body bg-white" />
                <input type="tel" placeholder={t.contact.phone} value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#246DC9] focus:ring-1 focus:ring-[#246DC9] rounded-xl outline-none transition-colors font-body bg-white" />
                <textarea placeholder={t.contact.message} rows={3} value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#246DC9] focus:ring-1 focus:ring-[#246DC9] rounded-xl outline-none transition-colors resize-none font-body bg-white" />
                <button type="submit" className="w-full py-3 bg-[#246DC9] hover:bg-[#1a5ab0] text-white rounded-xl font-semibold transition-colors font-body">
                  {t.contact.send}
                </button>
              </form>
            )}
            <div className="space-y-3">
              <a href="tel:+996555123456" className="flex items-center gap-3 text-[#182F48] hover:text-[#246DC9] transition-colors text-sm font-body">
                <span>&#128241;</span> +996 555 123 456
              </a>
              <a href="mailto:info@alykul.kg" className="flex items-center gap-3 text-[#182F48] hover:text-[#246DC9] transition-colors text-sm font-body">
                <span>&#128231;</span> info@alykul.kg
              </a>
              <a href="https://wa.me/996555123456" className="flex items-center gap-3 text-[#182F48] hover:text-[#246DC9] transition-colors text-sm font-body">
                <span>&#128172;</span> WhatsApp
              </a>
              <a href="https://t.me/alykul_bot" className="flex items-center gap-3 text-[#182F48] hover:text-[#246DC9] transition-colors text-sm font-body">
                <span>&#129302;</span> Telegram @alykul_bot
              </a>
              <p className="flex items-center gap-3 text-[#8EA0A2] text-sm font-body">
                <span>&#128205;</span> {t.contact.address}
              </p>
            </div>
          </div>
        </ScrollReveal>
        {/* Right: Map */}
        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23456.789!2d76.9833!3d42.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ebfc0a0a0a0a1%3A0x1234567890abcdef!2sCholpon-Ata!5e0!3m2!1sru!2skg!4v1"
              className="w-full h-full min-h-[400px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ FOOTER — 4 columns, navy bg ═══════════════ */
function M6Footer({ t, lang }: { t: Tr; lang: string }) {
  return (
    <footer className="bg-[#0f1f33] text-[#EAF4F6] px-6 md:px-14 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold text-sm uppercase mb-3 font-body">{t.footer.contacts}</h4>
          <a href="tel:+996555123456" className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">+996 555 123 456</a>
          <a href="mailto:info@alykul.kg" className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">info@alykul.kg</a>
          <span className="text-[#8EA0A2] text-sm font-body">{t.contact.address}</span>
          <div className="flex gap-3 mt-3 items-center">
            {/* WhatsApp */}
            <a href="https://wa.me/996555123456" title="WhatsApp" className="text-[#25D366] hover:opacity-70 transition-opacity">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
            {/* Telegram */}
            <a href="https://t.me/alykul_bot" title="Telegram" className="text-[#26A5E4] hover:opacity-70 transition-opacity">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
            </a>
            {/* Instagram */}
            <a href="#" title="Instagram" className="text-[#E1306C] hover:opacity-70 transition-opacity">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold text-sm uppercase mb-3 font-body">{t.footer.routesTitle}</h4>
          {t.footer.routeLinks.map((link, i) => (
            <a key={i} href={`/${lang}/trips`} className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">{link}</a>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold text-sm uppercase mb-3 font-body">{t.footer.navTitle}</h4>
          <a href={`/${lang}/trips`} className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">{t.nav.booking}</a>
          <a href="#m6-fleet" className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">{t.nav.fleet}</a>
          <a href={`/${lang}/blog`} className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">{t.footer.blog}</a>
          <a href="#m6-gallery" className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">{t.footer.gallery}</a>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold text-sm uppercase mb-3 font-body">{t.footer.aboutTitle}</h4>
          <a href={`/${lang}/about`} className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">{t.nav.about}</a>
          <a href={`/${lang}/faq`} className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">FAQ</a>
          <a href={`/${lang}/partners`} className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">{t.footer.partners}</a>
          <a href={`/${lang}/privacy`} className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">{t.footer.privacy}</a>
          <a href={`/${lang}/terms`} className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">{t.footer.terms}</a>
          <a href={`/${lang}/contact`} className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">{t.footer.contactLink}</a>
          <a href={`/${lang}/gifts`} className="text-[#8EA0A2] hover:text-[#246DC9] text-sm transition-colors font-body">{t.footer.gifts}</a>
        </div>
      </div>
      <div className="border-t border-white/10 pt-5 text-center text-[#8EA0A2] text-sm font-body">
        &copy; 2026 {t.footer.copyright}
      </div>
    </footer>
  );
}

/* ═══════════════ USP ICONS (inline SVGs from HTML mockup) ═══════════════ */
function USPIcon({ index }: { index: number }) {
  const icons = [
    // 0: Compass/Anchor — Online Booking
    <svg key="0" viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="16" r="11" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
      <path d="M16 5V13M16 19V27M5 16H13M19 16H27" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" stroke="#fff" strokeWidth="1.8" />
      <path d="M16 2L17.5 5H14.5L16 2Z" fill="#fff" />
    </svg>,
    // 1: Yacht — Fleet
    <svg key="1" viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M4 22 Q8 18 14 10 L16 8 L18 10 Q24 18 28 22" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8V22" stroke="#fff" strokeWidth="1.5" />
      <path d="M6 24 Q11 20 16 22 Q21 24 26 20" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M4 28 Q10 24 16 26 Q22 28 28 24" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>,
    // 2: Helm — Experience
    <svg key="2" viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="16" r="9" stroke="#fff" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="3.5" stroke="#fff" strokeWidth="1.5" />
      <line x1="16" y1="3" x2="16" y2="7" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="25" x2="16" y2="29" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="16" x2="7" y2="16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="25" y1="16" x2="29" y2="16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="6.8" y1="6.8" x2="9.6" y2="9.6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="22.4" y1="22.4" x2="25.2" y2="25.2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="25.2" y1="6.8" x2="22.4" y2="9.6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="9.6" y1="22.4" x2="6.8" y2="25.2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>,
    // 3: Life Preserver — Safety
    <svg key="3" viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="16" r="11" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16" cy="16" r="5" stroke="#fff" strokeWidth="1.8" />
      <line x1="8" y1="8" x2="12.5" y2="12.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="8" x2="19.5" y2="12.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="24" x2="12.5" y2="19.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="24" x2="19.5" y2="19.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>,
    // 4: Globe — Multilingual
    <svg key="4" viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="16" r="11" stroke="#fff" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="5.5" ry="11" stroke="#fff" strokeWidth="1.2" />
      <line x1="5" y1="16" x2="27" y2="16" stroke="#fff" strokeWidth="1.2" />
      <path d="M6 11 Q11 9 16 11 Q21 13 26 11" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M6 21 Q11 19 16 21 Q21 23 26 21" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6" />
    </svg>,
    // 5: Anchor — Best Prices
    <svg key="5" viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="8" r="3.5" stroke="#fff" strokeWidth="1.5" />
      <line x1="16" y1="11.5" x2="16" y2="28" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 22 Q12 28 16 28 Q20 28 24 22" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <line x1="10" y1="16" x2="22" y2="16" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="3" x2="16" y2="4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>,
  ];
  return icons[index] || null;
}

/* ═══════════════ TRANSLATIONS ═══════════════ */
type Tr = ReturnType<typeof getTrans>;

function getTrans(lang: string) {
  const ru = lang === 'ru';
  const ky = lang === 'ky';
  return {
    brand: ru ? 'Алыкул' : ky ? 'Алыкул' : 'Alykul',
    nav: {
      routes: ru ? 'Маршруты' : ky ? 'Каттамдар' : 'Routes',
      fleet: ru ? 'Флот' : ky ? 'Флот' : 'Fleet',
      schedule: ru ? 'Расписание' : ky ? 'Расписание' : 'Schedule',
      about: ru ? 'О нас' : ky ? 'Биз жонундо' : 'About',
      reviews: ru ? 'Отзывы' : ky ? 'Пикирлер' : 'Reviews',
      contacts: ru ? 'Контакты' : ky ? 'Байланыштар' : 'Contacts',
      booking: ru ? 'Бронирование' : ky ? 'Брондоо' : 'Booking',
      signin: ru ? 'Войти' : ky ? 'Кируу' : 'Sign In',
    },
    hero: {
      brand: ru ? 'Алыкул — Озеро Иссык-Куль' : ky ? 'Алыкул — Ысык-Кол' : 'Alykul — Lake Issyk-Kul',
      title1: ru ? 'ОТКРОЙ' : ky ? 'АЧ' : 'DISCOVER',
      title2: ru ? 'ИССЫК-КУЛЬ' : ky ? 'ЫСЫК-КОЛДУ' : 'ISSYK-KUL',
      subtitle: ru
        ? 'Забронируй водное приключение на крупнейшем горном озере Центральной Азии. Чолпон-Ата, Бостери и вся береговая линия.'
        : ky
        ? 'Борбордук Азиядагы эн чон тоо колунда суу укмуштуулугун брондоо. Чолпон-Ата, Бостери жана бардык жээк.'
        : 'Book a water adventure on the largest mountain lake in Central Asia. Cholpon-Ata, Bosteri and the entire coastline.',
      scroll: ru ? 'Листай вниз' : ky ? 'Торого жылдыр' : 'Scroll down',
    },
    booking: {
      pier: ru ? 'Причал' : ky ? 'Причал' : 'Pier',
      date: ru ? 'Дата' : ky ? 'Куну' : 'Date',
      guests: ru ? 'Гости' : ky ? 'Коноктор' : 'Guests',
      search: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book Now',
      piers: ru
        ? ['Чолпон-Ата', 'Бостери', 'Каракол', 'Тамга']
        : ky
        ? ['Чолпон-Ата', 'Бостери', 'Каракол', 'Тамга']
        : ['Cholpon-Ata', 'Bosteri', 'Karakol', 'Tamga'],
      guestOptions: ru
        ? ['2 гостя', '4 гостя', '6 гостей', '8+ гостей']
        : ky
        ? ['2 конок', '4 конок', '6 конок', '8+ конок']
        : ['2 guests', '4 guests', '6 guests', '8+ guests'],
    },
    stats: [
      { value: '5+', label: ru ? 'лет на озере' : ky ? 'жыл колдо' : 'years on lake' },
      { value: '12K+', label: ru ? 'довольных гостей' : ky ? 'ыраазы коноктор' : 'happy guests' },
      { value: '8', label: ru ? 'судов во флоте' : ky ? 'кемелер' : 'vessels' },
      { value: '15', label: ru ? 'маршрутов' : ky ? 'каттамдар' : 'routes' },
    ],
    usp: {
      title: ru ? 'Почему Алыкул?' : ky ? 'Эмне учун Алыкул?' : 'Why Alykul?',
      subtitle: ru
        ? 'Первая платформа водного туризма на Иссык-Куле — Чолпон-Ата, Бостери и вся береговая линия'
        : ky
        ? 'Ысык-Колдогу биринчи суу туризм платформасы — Чолпон-Ата, Бостери жана бардык жээк'
        : 'The first water tourism platform on Issyk-Kul — Cholpon-Ata, Bosteri and the entire coastline',
      items: [
        { title: ru ? 'Онлайн-бронирование' : ky ? 'Онлайн-брондоо' : 'Online Booking', desc: ru ? 'Выбирайте маршрут, дату и оплачивайте онлайн за 2 минуты' : ky ? '2 мунотко каттамды тандап, онлайн толонуз' : 'Choose a route, date and pay online in 2 minutes' },
        { title: ru ? 'Проверенный флот' : ky ? 'Текшерилген флот' : 'Certified Fleet', desc: ru ? 'Каждое судно сертифицировано и проходит ежедневный осмотр' : ky ? 'Ар бир кеме сертификатталган жана кундолук текшеруудон отот' : 'Every vessel is certified and undergoes daily inspection' },
        { title: ru ? 'Опыт' : ky ? 'Тажрыйба' : 'Experience', desc: ru ? 'Более 5 лет организации водных туров на Иссык-Куле' : ky ? '5 жылдан ашык Ысык-Колдо суу турларды уюштуруу' : 'Over 5 years of organizing water tours on Issyk-Kul' },
        { title: ru ? 'Безопасность' : ky ? 'Коопсуздук' : 'Safety', desc: ru ? 'Спасательное оборудование, обученные капитаны, страховка' : ky ? 'Куткаруу жабдуулары, окутулган капитандар, камсыздандыруу' : 'Rescue equipment, trained captains, insurance' },
        { title: ru ? 'Мультиязычность' : ky ? 'Кoп тилдуулук' : 'Multilingual', desc: ru ? 'Платформа на русском, кыргызском и английском языках' : ky ? 'Орусча, кыргызча жана англисче платформа' : 'Platform in Russian, Kyrgyz and English' },
        { title: ru ? 'Лучшие цены' : ky ? 'Эн жакшы баалар' : 'Best Prices', desc: ru ? 'Прямое бронирование без наценок посредников' : ky ? 'Ортомчулардын кошумча баасыз тузелуп брондоо' : 'Direct booking without intermediary markups' },
      ],
    },
    routes: {
      title: ru ? 'Маршруты' : ky ? 'Каттамдар' : 'Routes',
      badge: ru ? 'Сезон 2026' : ky ? 'Сезон 2026' : 'Season 2026',
      items: [
        { img: '/images/q02.jpg', category: ru ? 'Круиз' : ky ? 'Круиз' : 'Cruise', name: ru ? 'Закатный круиз' : ky ? 'Кечки круиз' : 'Sunset Cruise', price: ru ? 'от 1 400 KGS' : ky ? '1 400 KGS ден' : 'from 1 400 KGS' },
        { img: '/images/ep03.jpg', category: ru ? 'Чартер' : ky ? 'Чартер' : 'Charter', name: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter', price: ru ? 'от 7 000 KGS' : ky ? '7 000 KGS ден' : 'from 7 000 KGS' },
        { img: '/images/scene6.jpg', category: ru ? 'Развлечения' : ky ? 'Коноул' : 'Entertainment', name: ru ? 'Скоростной тур' : ky ? 'Ылдам тур' : 'Speed Tour', price: ru ? 'от 2 000 KGS' : ky ? '2 000 KGS ден' : 'from 2 000 KGS' },
        { img: '/images/kids.jpg', category: ru ? 'Детям' : ky ? 'Балдарга' : 'Kids', name: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : 'Kids Party', price: ru ? 'от 1 000 KGS' : ky ? '1 000 KGS ден' : 'from 1 000 KGS' },
      ],
    },
    schedule: {
      title: ru ? 'Расписание' : ky ? 'Расписание' : 'Schedule',
      badge: ru ? 'Лето 2026' : ky ? 'Жай 2026' : 'Summer 2026',
      subtitle: ru
        ? 'Актуальное расписание рейсов на летний сезон'
        : ky
        ? 'Жайкы мезгилдеги рейстердин учурдагы расписаниеси'
        : 'Current trip schedule for the summer season',
      cols: {
        route: ru ? 'Маршрут' : ky ? 'Каттам' : 'Route',
        vessel: ru ? 'Судно' : ky ? 'Кеме' : 'Vessel',
        departure: ru ? 'Отправление' : ky ? 'Жонотуу' : 'Departure',
        duration: ru ? 'Длительность' : ky ? 'Узактыгы' : 'Duration',
        price: ru ? 'Цена' : ky ? 'Баасы' : 'Price',
        frequency: ru ? 'Частота' : ky ? 'Жыштыгы' : 'Frequency',
      },
      rows: [
        { route: ru ? 'Закатный круиз (Чолпон-Ата)' : ky ? 'Кечки круиз (Чолпон-Ата)' : 'Sunset Cruise (Cholpon-Ata)', vessel: ru ? 'Алыкул' : 'Alykul', departure: '18:00', duration: ru ? '2 часа' : ky ? '2 саат' : '2 hours', price: '1 400 KGS', freq: ru ? 'Ежедневно' : ky ? 'Кундолук' : 'Daily', freqClass: 'bg-green-100 text-green-800' },
        { route: ru ? 'Утренний круиз (Бостери)' : ky ? 'Эртенки круиз (Бостери)' : 'Morning Cruise (Bosteri)', vessel: ru ? 'Алыкул' : 'Alykul', departure: '10:00', duration: ru ? '1.5 часа' : ky ? '1.5 саат' : '1.5 hours', price: '1 200 KGS', freq: ru ? 'Ежедневно' : ky ? 'Кундолук' : 'Daily', freqClass: 'bg-green-100 text-green-800' },
        { route: ru ? 'Скоростной тур (Чолпон-Ата)' : ky ? 'Ылдам тур (Чолпон-Ата)' : 'Speed Tour (Cholpon-Ata)', vessel: ru ? 'Скоростной катер' : ky ? 'Ылдам катер' : 'Speedboat', departure: '12:00, 14:00, 16:00', duration: ru ? '40 мин' : ky ? '40 мун' : '40 min', price: '2 000 KGS', freq: ru ? 'Ежедневно' : ky ? 'Кундолук' : 'Daily', freqClass: 'bg-green-100 text-green-800' },
        { route: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter', vessel: ru ? 'Nomad' : 'Nomad', departure: ru ? 'По запросу' : ky ? 'Суроо боюнча' : 'On request', duration: ru ? '2-6 часов' : ky ? '2-6 саат' : '2-6 hours', price: ru ? 'от 7 000 KGS' : ky ? '7 000 KGS ден' : 'from 7 000 KGS', freq: ru ? 'По запросу' : ky ? 'Суроо боюнча' : 'On request', freqClass: 'bg-blue-100 text-blue-800' },
        { route: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : 'Kids Party', vessel: ru ? 'Алыкул' : 'Alykul', departure: ru ? 'По запросу' : ky ? 'Суроо боюнча' : 'On request', duration: ru ? '2-3 часа' : ky ? '2-3 саат' : '2-3 hours', price: ru ? 'от 1 000 KGS/чел' : ky ? '1 000 KGS/адам' : 'from 1 000 KGS/pax', freq: ru ? 'Выходные' : ky ? 'Дем алыш кундору' : 'Weekends', freqClass: 'bg-orange-100 text-orange-800' },
      ],
    },
    fleet: {
      title: ru ? 'Наш флот' : ky ? 'Биздин флот' : 'Our Fleet',
      badge: ru ? 'Сертифицировано' : ky ? 'Сертификатталган' : 'Certified',
      subtitle: ru
        ? 'Каждое судно проходит ежедневный технический осмотр'
        : ky
        ? 'Ар бир кеме кундолук техникалык текшеруудон отот'
        : 'Every vessel undergoes daily technical inspection',
      items: [
        { img: '/images/q02.jpg', name: ru ? 'Теплоход «Алыкул»' : ky ? '«Алыкул» теплоходу' : 'Ship "Alykul"', desc: ru ? 'Флагман флота: банкетный зал, 2 палубы, до 200 гостей' : ky ? 'Флоттун флагманы: банкет залы, 2 палуба, 200 конокко чейин' : 'Fleet flagship: banquet hall, 2 decks, up to 200 guests', specs: [ru ? 'до 200 чел' : ky ? '200 адамга чейин' : 'up to 200 pax', ru ? '2 палубы' : ky ? '2 палуба' : '2 decks', ru ? 'Банкет' : ky ? 'Банкет' : 'Banquet'] },
        { img: '/images/ep03.jpg', name: ru ? 'Яхта «Nomad»' : ky ? '«Nomad» яхтасы' : 'Yacht "Nomad"', desc: ru ? 'Приватная яхта для эксклюзивных туров и вечеринок' : ky ? 'Эксклюзивдуу турлар жана кечелер учун жеке яхта' : 'Private yacht for exclusive tours and parties', specs: [ru ? 'до 12 чел' : ky ? '12 адамга чейин' : 'up to 12 pax', ru ? 'Парусная' : ky ? 'Желкендуу' : 'Sailing'] },
        { img: '/images/scene6.jpg', name: ru ? 'Скоростные катера' : ky ? 'Ылдам катерлер' : 'Speedboats', desc: ru ? 'Для адреналиновых прогулок и быстрых трансферов' : ky ? 'Адреналин сейилдоолор жана тез трансферлер учун' : 'For adrenaline rides and fast transfers', specs: [ru ? 'до 8 чел' : ky ? '8 адамга чейин' : 'up to 8 pax', ru ? 'до 60 км/ч' : ky ? '60 км/с чейин' : 'up to 60 km/h'] },
      ],
    },
    about: {
      title: ru ? 'О компании' : ky ? 'Компания жонундо' : 'About Company',
      text1: ru
        ? 'Алыкул — первый оператор цифрового бронирования водного транспорта на озере Иссык-Куль. Мы базируемся в Чолпон-Ате и Бостери, объединяя проверенный флот, опытных капитанов и современные технологии, чтобы каждый гость получил незабываемые впечатления на крупнейшем горном озере Центральной Азии.'
        : ky
        ? 'Алыкул — Ысык-Кол колундо суу транспортун санариптик брондоонун биринчи оператору. Биз Чолпон-Ата жана Бостериде жайгашкан.'
        : 'Alykul is the first digital booking operator for water transport on Lake Issyk-Kul. Based in Cholpon-Ata and Bosteri, we combine a certified fleet, experienced captains and modern technology.',
      text2: ru
        ? 'Наш флагман — теплоход «Алыкул», вмещающий до 200 гостей с банкетным залом, двумя палубами и развлекательной программой для всей семьи.'
        : ky
        ? 'Биздин флагман — «Алыкул» теплоходу, банкет залы, эки палуба жана бардык уй-булого конул ачуу программасы менен 200 конокко чейин.'
        : 'Our flagship is the ship "Alykul", accommodating up to 200 guests with a banquet hall, two decks and entertainment for the whole family.',
      links: ru
        ? [
            { href: '#m6-about', label: 'О нас' },
            { href: '#m6-fleet', label: 'Наш флот' },
            { href: '#', label: 'Безопасность' },
            { href: '#', label: 'Сертификаты' },
            { href: '#m6-reviews', label: 'Отзывы' },
            { href: '#', label: 'Партнерам' },
            { href: '#m6-routes', label: 'Маршруты' },
            { href: '#m6-contacts', label: 'Контакты' },
          ]
        : ky
        ? [
            { href: '#m6-about', label: 'Биз жонундо' },
            { href: '#m6-fleet', label: 'Биздин флот' },
            { href: '#', label: 'Коопсуздук' },
            { href: '#', label: 'Сертификаттар' },
            { href: '#m6-reviews', label: 'Пикирлер' },
            { href: '#', label: 'Ортоктошторго' },
            { href: '#m6-routes', label: 'Каттамдар' },
            { href: '#m6-contacts', label: 'Байланыштар' },
          ]
        : [
            { href: '#m6-about', label: 'About Us' },
            { href: '#m6-fleet', label: 'Our Fleet' },
            { href: '#', label: 'Safety' },
            { href: '#', label: 'Certificates' },
            { href: '#m6-reviews', label: 'Reviews' },
            { href: '#', label: 'Partners' },
            { href: '#m6-routes', label: 'Routes' },
            { href: '#m6-contacts', label: 'Contacts' },
          ],
    },
    reviews: {
      title: ru ? 'Отзывы' : ky ? 'Пикирлер' : 'Reviews',
      badge: '12K+',
      items: [
        { img: '/images/q01.jpg', name: ru ? 'Айгуль К.' : 'Aigul K.', city: ru ? 'г. Бишкек' : 'Bishkek', stars: 5, text: ru ? 'Потрясающий закатный круиз из Чолпон-Аты! Вид на горы с воды — это нечто невероятное. Бронирование заняло 2 минуты.' : ky ? 'Чолпон-Атадан укмуштуу кечки круиз! Суудан тоолорго кароо — укмуш.' : 'Amazing sunset cruise from Cholpon-Ata! The mountain view from the water is incredible. Booking took 2 minutes.' },
        { img: '/images/captain2.jpg', name: ru ? 'Бакыт М.' : 'Bakyt M.', city: ru ? 'г. Каракол' : 'Karakol', stars: 5, text: ru ? 'Профессиональная команда! Капитан рассказал историю озера, дети были в восторге от пиратского шоу на борту.' : ky ? 'Профессионалдуу команда! Капитан колдун тарыхын айтып берди.' : 'Professional crew! The captain told the history of the lake, kids loved the pirate show onboard.' },
        { img: '/images/scene8.jpg', name: ru ? 'Дмитрий С.' : 'Dmitry S.', city: ru ? 'г. Алматы' : 'Almaty', stars: 4, text: ru ? 'Скоростной тур из Бостери — адреналин! Лучший опыт на Иссык-Куле. Обязательно вернёмся следующим летом.' : ky ? 'Бостеридеги ылдам тур — адреналин! Ысык-Колдогу эн жакшы тажрыйба.' : 'Speed tour from Bosteri — pure adrenaline! Best experience on Issyk-Kul. Will definitely return next summer.' },
      ],
    },
    contact: {
      title: ru ? 'Свяжитесь с нами' : ky ? 'Биз менен байланышыныз' : 'Contact Us',
      name: ru ? 'Ваше имя' : ky ? 'Атыныз' : 'Your name',
      phone: ru ? 'Телефон' : 'Phone',
      message: ru ? 'Сообщение' : ky ? 'Билдируу' : 'Message',
      send: ru ? 'Отправить' : ky ? 'Жонотуу' : 'Send',
      sent: ru ? 'Спасибо! Мы свяжемся с вами.' : ky ? 'Рахмат! Сиз менен байланышабыз.' : 'Thank you! We will contact you.',
      address: ru ? 'Чолпон-Ата, Иссык-Куль' : ky ? 'Чолпон-Ата, Ысык-Кол' : 'Cholpon-Ata, Issyk-Kul',
    },
    map: {
      sub: ru ? 'Чолпон-Ата, Иссык-Куль, Кыргызстан' : ky ? 'Чолпон-Ата, Ысык-Кол, Кыргызстан' : 'Cholpon-Ata, Issyk-Kul, Kyrgyzstan',
    },
    footer: {
      contacts: ru ? 'Контакты' : ky ? 'Байланыштар' : 'Contacts',
      routesTitle: ru ? 'Маршруты' : ky ? 'Каттамдар' : 'Routes',
      routeLinks: ru
        ? ['Закатный круиз', 'Приватный чартер', 'Скоростной тур', 'Детский праздник', 'Кругоозёрный тур']
        : ky
        ? ['Кечки круиз', 'Жеке чартер', 'Ылдам тур', 'Балдар майрамы', 'Кол айланма тур']
        : ['Sunset Cruise', 'Private Charter', 'Speed Tour', 'Kids Party', 'Lake Circle Tour'],
      navTitle: ru ? 'Навигация' : ky ? 'Навигация' : 'Navigation',
      blog: ru ? 'Блог' : 'Blog',
      gallery: ru ? 'Галерея' : ky ? 'Галерея' : 'Gallery',
      aboutTitle: ru ? 'О компании' : ky ? 'Компания жонундо' : 'About',
      partners: ru ? 'Партнёрам' : ky ? 'Ортоктошторго' : 'Partners',
      privacy: ru ? 'Политика конфиденциальности' : ky ? 'Купуялуулук саясаты' : 'Privacy Policy',
      terms: ru ? 'Условия' : ky ? 'Шарттар' : 'Terms',
      contactLink: ru ? 'Контакты' : ky ? 'Байланыштар' : 'Contact',
      gifts: ru ? 'Подарки' : ky ? 'Белектер' : 'Gifts',
      copyright: ru
        ? 'Алыкул. Все права защищены. Озеро Иссык-Куль, Кыргызстан.'
        : ky
        ? 'Алыкул. Бардык укуктар корголгон. Ысык-Кол, Кыргызстан.'
        : 'Alykul. All rights reserved. Lake Issyk-Kul, Kyrgyzstan.',
    },
  };
}
