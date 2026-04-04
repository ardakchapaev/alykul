'use client';

import { useTheme, THEMES } from '@/lib/theme-context';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ScrollReveal } from './M3Animations';
import WeatherWidget from './WeatherWidget';
import CurrencySelector from './CurrencySelector';

/* ═══════════════════════════════════════════════════════════════════════════════
   M4 — OceanPlaza WordPress Parallax Theme adaptation for Alykul
   Visual: White content sections + fullscreen parallax ocean dividers
   Key pattern: Angular/diagonal clip-path transitions between ALL sections
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function DeepOceanWrapper({ lang }: { lang: string }) {
  const { theme } = useTheme();
  if (theme !== 'M4') return null;

  const t = getTrans(lang);

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-white">
      <M4Nav lang={lang} t={t} />
      <M4Hero t={t} lang={lang} />
      <M4Services t={t} />
      <M4ParallaxDivider image="/images/scene7.jpg" title={t.dividers.routes} subtitle={t.dividers.routesSub} />
      <M4Fleet t={t} />
      <M4ParallaxDivider image="/images/alykul1.jpg" title={t.dividers.booking} subtitle={t.dividers.bookingSub} />
      <M4Pricing t={t} lang={lang} />
      <M4ParallaxDivider image="/images/scene4.jpg" title={t.dividers.popular} subtitle={t.dividers.popularSub} />
      <M4PopularRoutes t={t} lang={lang} />
      <M4Reviews t={t} lang={lang} />
      <M4Schedule t={t} lang={lang} />
      <M4ParallaxDivider image="/images/hero.jpg" title={t.dividers.adventure} subtitle={t.dividers.adventureSub} />
      <M4Widgets t={t} />
      <M4FAQ t={t} />
      <M4Map t={t} />
      <M4Footer t={t} lang={lang} />
    </div>
  );
}

/* ═══════════════ NAVBAR — Clean white bar (OceanPlaza style) ═══════════════ */
function M4Nav({ lang, t }: { lang: string; t: Tr }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    const container = document.querySelector('[class*="fixed inset-0 z-\\[9999\\]"]');
    const target = container || window;
    const onScroll = () => {
      const y = container ? (container as HTMLElement).scrollTop : window.scrollY;
      setScrolled(y > 60);
    };
    target.addEventListener('scroll', onScroll, { passive: true });
    return () => target.removeEventListener('scroll', onScroll);
  }, []);

  // CTA pulse animation for first 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const links = [
    { href: '#m4-services', label: t.nav.services },
    { href: '#m4-fleet', label: t.nav.fleet },
    { href: '#m4-pricing', label: t.nav.pricing },
    { href: '#m4-schedule', label: t.nav.schedule },
    { href: '#m4-reviews', label: t.nav.reviews },
    { href: '#m4-contacts', label: t.nav.contacts },
  ];
  const langLabels: Record<string, string> = { ru: 'RU', en: 'EN', ky: 'KY' };
  const themes = THEMES;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-500 font-m3-body ${
      scrolled
        ? 'bg-[#0A1628]/95 backdrop-blur-xl shadow-2xl shadow-black/20 py-2'
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo — shrinks on scroll */}
        <a href="#" className="flex items-center gap-2 group">
          <svg viewBox="0 0 36 36" className={`transition-all duration-300 ${scrolled ? 'w-7 h-7' : 'w-8 h-8'}`} fill="none">
            <path d="M12 26Q16 20 20 8Q24 20 28 26" stroke="#00897B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M10 28Q15 24 20 26Q25 28 30 24" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <span className="font-m3-display text-lg font-bold tracking-wide hidden sm:block text-white">
            АЛЫКУЛ
          </span>
        </a>

        {/* Center links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-[13px] font-medium tracking-[1px] uppercase transition-colors relative group text-white/80 hover:text-white">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00897B] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a href={`/${lang}/trips`}
            className={`inline-block bg-[#00897B] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-[#00796B] transition-colors tracking-wide ${showPulse ? 'animate-pulse' : ''}`}>
            {t.nav.booking}
          </a>

          {/* Auth */}
          {user ? (
            <a href={`/${lang}/account`} className="flex items-center gap-1.5 text-white/70 text-xs font-medium hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span className="hidden sm:inline">{user.name || user.phone.slice(-4)}</span>
            </a>
          ) : (
            <a href={`/${lang}/auth`} className="bg-[#00897B] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-[#00796B] transition-colors">
              {lang === 'ru' ? 'Войти' : lang === 'ky' ? 'Кирүү' : 'Sign In'}
            </a>
          )}

          <CurrencySelector />
          {/* Lang */}
          <div className="relative">
            <button onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); }}
              className="flex items-center gap-1 text-xs font-semibold transition-colors px-2 py-1.5 text-white/70 hover:text-white">
              {langLabels[lang] || 'RU'}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#0A1628]/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                {['ru', 'en', 'ky'].map(l => (
                  <a key={l} href={`/${l}`} onClick={() => setLangOpen(false)}
                    className={`block px-4 py-2 text-xs font-medium ${l === lang ? 'text-[#00897B] bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                    {langLabels[l]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Theme */}
          <div className="relative hidden lg:block">
            <button onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); }}
              className="flex items-center gap-1 text-xs font-semibold transition-colors px-2 py-1.5 text-white/70 hover:text-white">
              {theme}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {themeOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#0A1628]/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                {themes.map(th => (
                  <button key={th} onClick={() => { setTheme(th); setThemeOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-xs font-medium ${th === theme ? 'text-[#00897B] bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                    {th}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Burger */}
          <button className="lg:hidden flex flex-col gap-1.5 w-6 ml-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <span className={`h-[2px] w-full bg-white transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`h-[2px] w-full bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-full bg-white transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 bg-white z-[10001] flex flex-col items-center justify-center gap-6 lg:hidden">
          <button className="absolute top-4 right-5 text-[#0A1628] text-3xl" onClick={() => setOpen(false)}>&times;</button>
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-[#0A1628] font-m3-display text-2xl hover:text-[#00897B] transition-colors"
              onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={`/${lang}/trips`}
            className="bg-[#00897B] text-white px-6 py-2.5 rounded text-lg font-semibold hover:bg-[#00796B] transition-colors"
            onClick={() => setOpen(false)}>
            {t.nav.booking}
          </a>
          {/* Mobile Auth */}
          {user ? (
            <a href={`/${lang}/account`} className="flex items-center gap-2 text-[#0A1628] text-lg hover:text-[#00897B] transition-colors" onClick={() => setOpen(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              {user.name || user.phone.slice(-4)}
            </a>
          ) : (
            <a href={`/${lang}/auth`} className="bg-[#00897B] text-white px-6 py-2.5 rounded text-lg font-semibold hover:bg-[#00796B] transition-colors" onClick={() => setOpen(false)}>
              {lang === 'ru' ? 'Войти' : lang === 'ky' ? 'Кирүү' : 'Sign In'}
            </a>
          )}
          <div className="flex gap-3 mt-6 border-t border-gray-200 pt-6">
            {themes.map(th => (
              <button key={th} onClick={() => { setTheme(th); setOpen(false); }}
                className={`px-4 py-2 rounded text-sm font-semibold ${th === theme ? 'bg-[#00897B] text-white' : 'border border-gray-300 text-gray-500 hover:text-[#0A1628]'}`}>
                {th}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════ HERO — Fullscreen ocean photo + orange CTA (OceanPlaza) ═══════════════ */
function M4Hero({ t, lang }: { t: Tr; lang: string }) {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Fullscreen ocean photo — edge to edge, NO padding */}
      <Image src="/images/hero.jpg" alt="Issyk-Kul" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      <div className="absolute top-20 right-4 md:right-8 z-10 hidden xl:block">
        <WeatherWidget variant="dark" />
      </div>

      {/* Orange CTA text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <h1 className="font-m3-display text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[1.05] drop-shadow-2xl">
          {t.hero.line1}
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mt-4 font-m3-body tracking-widest uppercase">
          {t.hero.line2}
        </p>
        <p className="mt-6 bg-[#FF6B35] text-white font-m3-display text-xl md:text-2xl font-bold px-8 py-3 rounded-sm shadow-2xl shadow-orange-600/30 tracking-wide">
          {t.hero.cta}
        </p>

        {/* Booking Widget */}
        <div className="mt-8 bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl p-4 md:p-6 max-w-4xl w-full mx-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-end gap-3">
            <div className="flex-1">
              <label className="text-gray-400 text-xs font-m3-body mb-1 block">{t.booking.pier}</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2.5 text-sm text-[#0A1628] font-m3-body outline-none focus:border-[#00897B] appearance-none cursor-pointer">
                <option value="cholpon">{t.piers.cholpon}</option>
                <option value="bosteri">{t.piers.bosteri}</option>
                <option value="karakol">{t.piers.karakol}</option>
                <option value="tamga">{t.piers.tamga}</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-gray-400 text-xs font-m3-body mb-1 block">{t.booking.date}</label>
              <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2.5 text-sm text-[#0A1628] font-m3-body outline-none focus:border-[#00897B]" />
            </div>
            <div className="flex-1">
              <label className="text-gray-400 text-xs font-m3-body mb-1 block">{t.booking.guests}</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2.5 text-sm text-[#0A1628] font-m3-body outline-none focus:border-[#00897B] appearance-none cursor-pointer">
                <option>{t.booking.guests_2}</option>
                <option>{t.booking.guests_4}</option>
                <option>{t.booking.guests_6}</option>
                <option>{t.booking.guests_8}</option>
              </select>
            </div>
            <a href={`/${lang}/trips`}
              className="bg-[#00897B] hover:bg-[#00796B] text-white font-semibold px-8 py-2.5 rounded transition-colors font-m3-body text-sm tracking-wide text-center whitespace-nowrap">
              {t.booking.search}
            </a>
          </div>
        </div>
      </div>

      {/* Angular bottom edge — V-shape pointing down */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] z-20">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <polygon points="0,0 720,80 1440,0 1440,80 0,80" fill="white" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════ SERVICES — 4 icons in a row (OceanPlaza "SERVICES WE PROVIDE") ═══════════════ */
function M4Services({ t }: { t: Tr }) {
  const services = [
    { icon: <IconBooking />, title: t.services.s1, desc: t.services.s1d },
    { icon: <IconFleet />,   title: t.services.s2, desc: t.services.s2d },
    { icon: <IconYears />,   title: t.services.s3, desc: t.services.s3d },
    { icon: <IconSafety />,  title: t.services.s4, desc: t.services.s4d },
  ];

  return (
    <section id="m4-services" className="relative bg-white py-20 md:py-28">
      {/* Angular top edge — inverted V */}
      <div className="absolute top-0 left-0 right-0 h-[60px] -translate-y-full">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
          <polygon points="0,60 720,0 1440,60" fill="white" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
        <ScrollReveal>
          <p className="text-[#00897B] uppercase tracking-[4px] text-sm font-m3-body font-semibold mb-3">
            {t.services.badge}
          </p>
          <h2 className="font-m3-display text-3xl md:text-5xl font-bold text-[#0A1628] uppercase tracking-wide">
            {t.services.title}
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto font-m3-body text-base leading-relaxed">
            {t.services.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {services.map((s, i) => (
            <ScrollReveal key={i}>
              <div className="flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
                <div className="w-20 h-20 rounded-full bg-[#00897B]/10 flex items-center justify-center mb-5 group-hover:bg-[#00897B]/20 transition-colors">
                  {s.icon}
                </div>
                <h3 className="font-m3-display text-sm font-bold text-[#0A1628] uppercase tracking-[2px] mb-3">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm font-m3-body leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Angular bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] translate-y-full z-10">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
          <polygon points="0,0 720,60 1440,0" fill="white" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════ PARALLAX DIVIDER — Fullscreen ocean photo with text (OceanPlaza pattern) ═══════════════ */
function M4ParallaxDivider({ image, title, subtitle }: { image: string; title?: string; subtitle?: string }) {
  return (
    <section className="relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden">
      {/* Background image (replaces bg-fixed which breaks in overflow:auto containers) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#0A1628]/60" />

      {/* Text overlay */}
      {title && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <ScrollReveal>
            <h2 className="font-m3-display text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-[6px] drop-shadow-lg">
              {title}
            </h2>
            {subtitle && (
              <p className="text-white/70 mt-4 text-base md:text-lg font-m3-body tracking-widest max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </ScrollReveal>
        </div>
      )}

      {/* Angular top edge — white triangle pointing down into this section */}
      <div className="absolute top-0 left-0 right-0 h-[60px] z-20">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
          <polygon points="0,0 1440,0 720,60" fill="white" />
        </svg>
      </div>

      {/* Angular bottom edge — white triangle pointing up from below */}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] z-20">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
          <polygon points="0,60 720,0 1440,60" fill="white" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════ FLEET / PORTFOLIO with TABS (OceanPlaza "WHAT WE DO") ═══════════════ */
function M4Fleet({ t }: { t: Tr }) {
  const tabs = [
    { id: 'all', label: t.fleet.tabAll },
    { id: 'steamship', label: t.fleet.tabSteam },
    { id: 'yacht', label: t.fleet.tabYacht },
    { id: 'speedboat', label: t.fleet.tabSpeed },
    { id: 'cruise', label: t.fleet.tabCruise },
    { id: 'kids', label: t.fleet.tabKids },
  ];

  const items = [
    { id: 'steamship', img: '/images/q02.jpg',    title: t.fleet.f1, aspect: 'aspect-[4/3]' },
    { id: 'yacht',     img: '/images/ep03.jpg',   title: t.fleet.f2, aspect: 'aspect-[3/4]' },
    { id: 'speedboat', img: '/images/scene6.jpg',  title: t.fleet.f3, aspect: 'aspect-[4/3]' },
    { id: 'cruise',    img: '/images/scene1.jpg',  title: t.fleet.f4, aspect: 'aspect-[3/4]' },
    { id: 'kids',      img: '/images/kids.jpg',    title: t.fleet.f5, aspect: 'aspect-[4/3]' },
    { id: 'cruise',    img: '/images/cruise.jpg',  title: t.fleet.f6, aspect: 'aspect-[4/3]' },
    { id: 'steamship', img: '/images/scene2.jpg',  title: t.fleet.f7, aspect: 'aspect-[3/4]' },
    { id: 'yacht',     img: '/images/scene3.jpg',  title: t.fleet.f8, aspect: 'aspect-[4/3]' },
  ];

  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? items : items.filter(i => i.id === active);

  return (
    <section id="m4-fleet" className="relative bg-white py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
        <ScrollReveal>
          <p className="text-[#00897B] uppercase tracking-[4px] text-sm font-m3-body font-semibold mb-3">
            {t.fleet.badge}
          </p>
          <h2 className="font-m3-display text-3xl md:text-5xl font-bold text-[#0A1628] uppercase tracking-wide">
            {t.fleet.title}
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto font-m3-body">
            {t.fleet.sub}
          </p>
        </ScrollReveal>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 mt-10 mb-10">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActive(tab.id)}
              className={`px-5 py-2 text-sm font-m3-body font-semibold uppercase tracking-[1px] rounded transition-all ${
                active === tab.id
                  ? 'bg-[#00897B] text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-[#0A1628]'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <ScrollReveal key={`${item.img}-${i}`}>
              <div className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer">
                <div className={item.aspect}>
                  <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <p className="text-white font-m3-display font-bold text-lg">{item.title}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <a href="#m4-pricing"
            className="inline-block mt-10 bg-transparent border-2 border-[#00897B] text-[#00897B] hover:bg-[#00897B] hover:text-white px-10 py-3 rounded font-m3-body font-semibold text-sm uppercase tracking-[2px] transition-all">
            {t.fleet.more}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ PRICING TABLE — 4 cards (OceanPlaza "OUR PRICE") ═══════════════ */
function M4Pricing({ t, lang }: { t: Tr; lang: string }) {
  const en = lang === 'en';
  const plans = [
    {
      name: t.pricing.p1name, price: en ? '$16' : '1,400', unit: en ? '(1,400 KGS)' : 'KGS (~$16)',
      color: 'bg-[#26A69A]',
      features: [t.pricing.p1f1, t.pricing.p1f2, t.pricing.p1f3, t.pricing.p1f4, t.pricing.p1f5],
    },
    {
      name: t.pricing.p2name, price: en ? '$14' : '1,200', unit: en ? '(1,200 KGS)' : 'KGS (~$14)',
      color: 'bg-[#00897B]',
      features: [t.pricing.p2f1, t.pricing.p2f2, t.pricing.p2f3, t.pricing.p2f4, t.pricing.p2f5],
    },
    {
      name: t.pricing.p3name, price: en ? '$23' : '2,000', unit: en ? '(2,000 KGS)' : 'KGS (~$23)',
      color: 'bg-[#00796B]',
      features: [t.pricing.p3f1, t.pricing.p3f2, t.pricing.p3f3, t.pricing.p3f4, t.pricing.p3f5],
      popular: true,
    },
    {
      name: t.pricing.p4name, price: t.pricing.p4price, unit: en ? '(~$80)' : '(~$80)',
      color: 'bg-[#004D40]',
      features: [t.pricing.p4f1, t.pricing.p4f2, t.pricing.p4f3, t.pricing.p4f4, t.pricing.p4f5],
    },
  ];

  return (
    <section id="m4-pricing" className="relative bg-[#0A1628] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
        <ScrollReveal>
          <p className="text-[#00B4D8] uppercase tracking-[4px] text-sm font-m3-body font-semibold mb-3">
            {t.pricing.badge}
          </p>
          <h2 className="font-m3-display text-3xl md:text-5xl font-bold text-white uppercase tracking-wide">
            {t.pricing.title}
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto font-m3-body">
            {t.pricing.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {plans.map((plan, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? 'bg-gradient-to-br from-[#0D2137] to-[#0A3D55] border-2 border-[#FFB300] ring-4 ring-[#FFB300]/20'
                  : 'bg-gradient-to-br from-[#0D2137] to-[#0A3D55] border border-white/10'
              }`}>
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 bg-[#FFB300] text-[#0A1628] text-xs font-bold px-4 py-1 rounded-b-lg z-10">
                    {t.pricing.popular}
                  </div>
                )}
                {/* Header */}
                <div className="p-6 pt-8 text-center">
                  <h3 className="text-white font-semibold text-lg mb-2 font-m3-display uppercase tracking-[2px]">
                    {plan.name}
                  </h3>
                  <div className="text-white font-mono">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.unit && <span className="text-white/50 text-sm ml-1">{plan.unit}</span>}
                  </div>
                </div>
                {/* Features */}
                <div className="px-6 pb-6 space-y-3">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2 text-white/70 text-sm font-m3-body">
                      <svg className="w-4 h-4 text-[#00B4D8] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
                {/* CTA */}
                <div className="px-6 pb-6">
                  <a href={`/${lang}/trips`} className={`block w-full py-3 text-center rounded-xl font-semibold text-sm transition-all font-m3-body ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#00B4D8] to-[#00897B] text-white hover:shadow-lg hover:shadow-[#00B4D8]/30'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}>
                    {t.pricing.book}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ POPULAR ROUTES — Product cards (OceanPlaza "BEST SELLING ITEMS") ═══════════════ */
function M4PopularRoutes({ t, lang }: { t: Tr; lang: string }) {
  const en = lang === 'en';
  const ky = lang === 'ky';
  const routes = [
    { img: '/images/scene8.jpg',  title: t.popular.r1, price: en ? '$16 (1,400 KGS)' : ky ? '1,400 KGS (~$16)' : '1,400 KGS (~$16)', tag: t.popular.tagCruise },
    { img: '/images/scene9.jpg',  title: t.popular.r2, price: en ? '$14 (1,200 KGS)' : ky ? '1,200 KGS (~$14)' : '1,200 KGS (~$14)', tag: t.popular.tagMorning },
    { img: '/images/scene10.jpg', title: t.popular.r3, price: en ? '$23 (2,000 KGS)' : ky ? '2,000 KGS (~$23)' : '2,000 KGS (~$23)', tag: t.popular.tagSpeed },
    { img: '/images/scene11.jpg', title: t.popular.r4, price: t.popular.r4price, tag: t.popular.tagVIP },
  ];

  return (
    <section className="relative bg-white py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
        <ScrollReveal>
          <p className="text-[#00897B] uppercase tracking-[4px] text-sm font-m3-body font-semibold mb-3">
            {t.popular.badge}
          </p>
          <h2 className="font-m3-display text-3xl md:text-5xl font-bold text-[#0A1628] uppercase tracking-wide">
            {t.popular.title}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {routes.map((r, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,137,123,0.15)] hover:-translate-y-2">
                {/* Image with parallax hover */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image src={r.img} alt={r.title} fill className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Price badge on image */}
                  <div className="absolute bottom-4 left-4 font-mono text-white font-bold text-xl drop-shadow-lg">
                    {r.price}
                  </div>
                  {/* Category badge - frosted glass */}
                  <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {r.tag}
                  </span>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 text-[#0A1628]">{r.title}</h3>
                  {/* Book button - appears on hover, always visible on mobile */}
                  <a href={`/${lang}/trips`}
                    className="block w-full py-2.5 bg-[#00897B] text-white text-center rounded-xl font-semibold text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 sm:opacity-100 sm:translate-y-0">
                    {t.popular.add}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ REVIEWS (OceanPlaza "FEEDBACK IS IMPORTANT") ═══════════════ */
function M4Reviews({ t, lang }: { t: Tr; lang: string }) {
  const reviews = [
    { name: t.reviews.r1n, text: t.reviews.r1t, stars: 5, img: '/images/scene12.jpg', city: lang === 'ru' ? 'Бишкек' : lang === 'ky' ? 'Бишкек' : 'Bishkek' },
    { name: t.reviews.r2n, text: t.reviews.r2t, stars: 5, img: '/images/scene13.jpg', city: lang === 'ru' ? 'Алматы' : lang === 'ky' ? 'Алматы' : 'Almaty' },
    { name: t.reviews.r3n, text: t.reviews.r3t, stars: 4, img: '/images/captain.jpg', city: lang === 'ru' ? 'Москва' : lang === 'ky' ? 'Москва' : 'Moscow' },
    { name: lang === 'ru' ? 'Елена В.' : lang === 'ky' ? 'Елена В.' : 'Elena V.', text: lang === 'ru' ? 'Утренний круиз — это магия! Горы в утреннем тумане, кофе на палубе, тишина... Лучший способ начать день на Иссык-Куле.' : lang === 'ky' ? 'Эртенки круиз — бул сыйкыр! Тоолор эртенки тумандагы, палубада кофе, тынчтык... Ысык-Колдо кундун эн жакшы башталышы.' : 'Morning cruise is magic! Mountains in morning fog, coffee on deck, silence... Best way to start a day on Issyk-Kul.', stars: 5, img: '/images/scene7.jpg', city: lang === 'ru' ? 'Каракол' : lang === 'ky' ? 'Каракол' : 'Karakol' },
    { name: lang === 'ru' ? 'Нурбек Т.' : lang === 'ky' ? 'Нурбек Т.' : 'Nurbek T.', text: lang === 'ru' ? 'Брали чартер на корпоратив — 12 человек, все организовано идеально. Капитан — профессионал, еда отличная.' : lang === 'ky' ? 'Корпоративге чартер алдык — 12 адам, баары идеалдуу уюштурулган. Капитан — профессионал.' : 'Chartered for corporate event — 12 people, everything organized perfectly. Captain is a pro, food was great.', stars: 5, img: '/images/alykul1.jpg', city: lang === 'ru' ? 'Чолпон-Ата' : lang === 'ky' ? 'Чолпон-Ата' : 'Cholpon-Ata' },
  ];

  return (
    <section id="m4-reviews" className="relative bg-gray-50 py-20 md:py-28"
      style={{ clipPath: 'polygon(0 40px, 100% 0, 100% calc(100% - 40px), 0 100%)' }}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center pt-8">
        <ScrollReveal>
          <p className="text-[#00897B] uppercase tracking-[4px] text-sm font-m3-body font-semibold mb-3">
            {t.reviews.badge}
          </p>
          <h2 className="font-m3-display text-3xl md:text-5xl font-bold text-[#0A1628] uppercase tracking-wide">
            {t.reviews.title}
          </h2>
          <p className="text-gray-500 mt-4 font-m3-body">{t.reviews.sub}</p>
        </ScrollReveal>

        {/* Rating summary */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 mt-10 p-8 bg-[#F4F8FB] rounded-2xl">
            {/* Big number */}
            <div className="text-center">
              <div className="text-5xl font-bold text-[#0A1628] font-mono">4.9</div>
              <div className="text-yellow-400 text-lg mt-1">★★★★★</div>
              <div className="text-gray-400 text-sm mt-1">12,000+ {lang === 'ru' ? 'отзывов' : lang === 'ky' ? 'пикирлер' : 'reviews'}</div>
            </div>
            {/* Rating bars */}
            <div className="flex-1 space-y-2 w-full max-w-sm">
              {[
                { stars: 5, pct: 89 },
                { stars: 4, pct: 8 },
                { stars: 3, pct: 2 },
                { stars: 2, pct: 1 },
                { stars: 1, pct: 0 },
              ].map(bar => (
                <div key={bar.stars} className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 w-6">{bar.stars}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full transition-all duration-700" style={{ width: `${bar.pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-400 w-8">{bar.pct}%</span>
                </div>
              ))}
            </div>
            {/* Trust badges */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-green-500">✓</span> {lang === 'ru' ? 'Проверенные гости' : lang === 'ky' ? 'Текшерилген коноктор' : 'Verified guests'}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-green-500">✓</span> {lang === 'ru' ? 'Реальные отзывы' : lang === 'ky' ? 'Чыныгы пикирлер' : 'Real reviews'}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Auto-scroll review carousel */}
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-6 pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none' }}>
          {reviews.map((review, i) => (
            <div key={i} className="snap-center shrink-0 w-[320px] md:w-[380px] bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow text-left">
              {/* Stars */}
              <div className="text-yellow-400 text-lg mb-3">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</div>
              {/* Quote */}
              <p className="text-[#0A1628]/80 text-sm leading-relaxed mb-4 font-m3-body">
                &ldquo;{review.text}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image src={review.img} alt={review.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#0A1628] font-m3-display">{review.name}</div>
                  <div className="text-gray-400 text-xs">{review.city}</div>
                </div>
                <span className="ml-auto text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {lang === 'ru' ? 'Проверен' : lang === 'ky' ? 'Текшерилген' : 'Verified'} ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SCHEDULE — Card-rows with filter tabs ═══════════════ */
function M4Schedule({ t, lang }: { t: Tr; lang: string }) {
  const en = lang === 'en';
  const [filter, setFilter] = useState<'all' | 'daily' | 'request' | 'weekend'>('all');

  const rows = [
    { route: t.schedule.r_sunset, vessel: t.schedule.v_alykul, depart: '18:00', dur: t.schedule.dur_2h, price: en ? '$16 (1,400 KGS)' : '1,400 KGS (~$16)', freq: 'daily' as const, freqLabel: t.schedule.daily },
    { route: t.schedule.r_morning, vessel: t.schedule.v_alykul, depart: '10:00', dur: t.schedule.dur_1_5h, price: en ? '$14 (1,200 KGS)' : '1,200 KGS (~$14)', freq: 'daily' as const, freqLabel: t.schedule.daily },
    { route: t.schedule.r_speed, vessel: t.schedule.v_boat, depart: '12:00', dur: t.schedule.dur_40m, price: en ? '$23 (2,000 KGS)' : '2,000 KGS (~$23)', freq: 'daily' as const, freqLabel: t.schedule.daily },
    { route: t.schedule.r_charter, vessel: t.schedule.v_yacht, depart: t.schedule.on_request, dur: t.schedule.dur_2_6h, price: t.schedule.from_7000, freq: 'request' as const, freqLabel: t.schedule.on_request },
    { route: t.schedule.r_kids, vessel: t.schedule.v_alykul, depart: t.schedule.on_request, dur: t.schedule.dur_2_3h, price: t.schedule.from_1000, freq: 'weekend' as const, freqLabel: t.schedule.weekend },
  ];

  const filtered = filter === 'all' ? rows : rows.filter(r => r.freq === filter);

  const filterTabs = [
    { key: 'all' as const, label: lang === 'ru' ? 'Все рейсы' : lang === 'ky' ? 'Бардык рейстер' : 'All trips' },
    { key: 'daily' as const, label: t.schedule.daily },
    { key: 'request' as const, label: t.schedule.on_request },
    { key: 'weekend' as const, label: t.schedule.weekend },
  ];

  return (
    <section id="m4-schedule" className="relative bg-white py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[#00897B] uppercase tracking-[4px] text-sm font-m3-body font-semibold mb-3">
              {t.schedule.badge}
            </p>
            <h2 className="font-m3-display text-3xl md:text-5xl font-bold text-[#0A1628] uppercase tracking-wide">
              {t.schedule.title}
            </h2>
            <p className="text-gray-500 mt-4 font-m3-body">{t.schedule.subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-1">
          {filterTabs.map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium font-m3-body transition-all whitespace-nowrap ${
                filter === tab.key
                  ? 'bg-[#00897B] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Card rows */}
        <div className="space-y-3">
          {filtered.map((row, i) => (
            <ScrollReveal key={`${row.freq}-${i}`} delay={i * 80}>
              <div className="group bg-white border border-gray-100 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-lg hover:border-[#00897B]/20 transition-all duration-300">
                {/* Time — accent */}
                <div className="md:w-20 shrink-0">
                  <div className="text-[#00897B] font-mono font-bold text-xl">{row.depart}</div>
                  <div className="text-gray-400 text-xs">{row.dur}</div>
                </div>

                {/* Route info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#0A1628] text-base font-m3-body truncate">{row.route}</h3>
                  <p className="text-gray-500 text-sm font-m3-body">{row.vessel}</p>
                </div>

                {/* Price pill */}
                <div className="shrink-0">
                  <span className="inline-block bg-[#F4F8FB] text-[#0A1628] font-mono font-bold px-4 py-2 rounded-xl text-sm">
                    {row.price}
                  </span>
                </div>

                {/* Frequency badge */}
                <div className="shrink-0">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold font-m3-body ${
                    row.freq === 'daily' ? 'bg-green-100 text-green-700' :
                    row.freq === 'request' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>{row.freqLabel}</span>
                </div>

                {/* Book button — appears on hover (desktop), always visible (mobile) */}
                <a href={`/${lang}/trips`}
                  className="shrink-0 px-5 py-2 bg-[#00897B] hover:bg-[#00796B] text-white rounded-xl text-sm font-semibold font-m3-body opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 text-center">
                  {t.schedule.book}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ WIDGETS — 4 column social/info (OceanPlaza footer widgets) ═══════════════ */
function M4Widgets({ t }: { t: Tr }) {
  const gallery = ['/images/scene1.jpg', '/images/scene5.jpg', '/images/scene8.jpg',
    '/images/scene10.jpg', '/images/scene12.jpg', '/images/scene13.jpg'];

  return (
    <section className="relative bg-[#0F2439] text-white py-20 md:py-28"
      style={{ clipPath: 'polygon(0 50px, 100% 0, 100% 100%, 0 calc(100% - 50px))' }}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-6">
        {/* Instagram */}
        <div>
          <h3 className="font-m3-display text-sm font-bold uppercase tracking-[2px] text-white mb-6 pb-3 border-b border-white/10">
            Instagram
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {gallery.map((img, i) => (
              <div key={i} className="relative aspect-square rounded overflow-hidden group cursor-pointer">
                <Image src={img} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#00897B]/0 group-hover:bg-[#00897B]/40 transition-colors flex items-center justify-center">
                  <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent trips */}
        <div>
          <h3 className="font-m3-display text-sm font-bold uppercase tracking-[2px] text-white mb-6 pb-3 border-b border-white/10">
            {t.widgets.recentTitle}
          </h3>
          <ul className="space-y-4">
            {t.widgets.recentItems.map((item, i) => (
              <li key={i} className="text-sm">
                <a className="text-white/70 hover:text-[#00897B] transition-colors font-m3-body cursor-pointer">{item.title}</a>
                <p className="text-white/30 text-xs mt-0.5 font-m3-body">{item.date}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Telegram */}
        <div>
          <h3 className="font-m3-display text-sm font-bold uppercase tracking-[2px] text-white mb-6 pb-3 border-b border-white/10">
            Telegram
          </h3>
          <p className="text-white/50 text-sm font-m3-body leading-relaxed mb-4">{t.widgets.tgDesc}</p>
          <a href="https://t.me/alykul_kg" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0088CC] hover:bg-[#0077B3] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors font-m3-body">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            {t.widgets.tgBtn}
          </a>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="font-m3-display text-sm font-bold uppercase tracking-[2px] text-white mb-6 pb-3 border-b border-white/10">
            {t.widgets.galleryTitle}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {['/images/scene2.jpg', '/images/scene3.jpg', '/images/scene4.jpg',
              '/images/scene6.jpg', '/images/scene7.jpg', '/images/scene9.jpg'].map((img, i) => (
              <div key={i} className="relative aspect-square rounded overflow-hidden cursor-pointer group">
                <Image src={img} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ FAQ — Accordion (adapted from OceanPlaza) ═══════════════ */
function M4FAQ({ t }: { t: Tr }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative bg-white py-20 md:py-28">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-[#00897B] uppercase tracking-[4px] text-sm font-m3-body font-semibold mb-3">
              FAQ
            </p>
            <h2 className="font-m3-display text-3xl md:text-5xl font-bold text-[#0A1628] uppercase tracking-wide">
              {t.faq.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-12 space-y-3">
          {t.faq.items.map((item, i) => (
            <ScrollReveal key={i}>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-m3-body font-semibold text-[#0A1628] text-sm pr-4">{item.q}</span>
                  <svg className={`w-5 h-5 text-[#00897B] flex-shrink-0 transition-transform ${openIdx === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openIdx === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm font-m3-body leading-relaxed border-t border-gray-100 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ MAP + CONTACT ═══════════════ */
function M4Map({ t }: { t: Tr }) {
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
    <section id="m4-contacts" className="relative bg-gray-50 py-20 md:py-28"
      style={{ clipPath: 'polygon(0 40px, 100% 0, 100% 100%, 0 100%)' }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-6">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-m3-display text-3xl md:text-4xl font-bold text-[#0A1628] uppercase tracking-wide">
              {t.contact.title}
            </h2>
            <p className="text-gray-500 mt-3 font-m3-body">{t.map.sub}</p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Form + Contacts */}
          <ScrollReveal>
            <div>
              {contactSent ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4 text-[#00897B]">&#10003;</div>
                  <p className="text-[#00897B] font-semibold text-lg font-m3-body">{t.contact.sent}</p>
                </div>
              ) : (
                <form className="space-y-4 mb-8" onSubmit={(e) => { e.preventDefault(); handleContact(); }}>
                  <input type="text" placeholder={t.contact.name} value={contactForm.name} autoComplete="name"
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#00897B] focus:ring-1 focus:ring-[#00897B] rounded-xl outline-none transition-colors font-m3-body bg-white" />
                  <input type="tel" placeholder={t.contact.phone} value={contactForm.phone} autoComplete="tel"
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#00897B] focus:ring-1 focus:ring-[#00897B] rounded-xl outline-none transition-colors font-m3-body bg-white" />
                  <textarea placeholder={t.contact.message} rows={3} value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#00897B] focus:ring-1 focus:ring-[#00897B] rounded-xl outline-none transition-colors resize-none font-m3-body bg-white" />
                  <button type="submit" className="w-full py-3 bg-[#00897B] hover:bg-[#00796B] text-white rounded-xl font-semibold transition-colors font-m3-body">
                    {t.contact.send}
                  </button>
                </form>
              )}
              <div className="space-y-3">
                <a href="tel:+996555123456" className="flex items-center gap-3 text-[#0A1628] hover:text-[#00897B] transition-colors text-sm font-m3-body">
                  <span>&#128241;</span> +996 555 123 456
                </a>
                <a href="mailto:info@alykul.kg" className="flex items-center gap-3 text-[#0A1628] hover:text-[#00897B] transition-colors text-sm font-m3-body">
                  <span>&#128231;</span> info@alykul.kg
                </a>
                <a href="https://wa.me/996555123456" className="flex items-center gap-3 text-[#0A1628] hover:text-[#00897B] transition-colors text-sm font-m3-body">
                  <span>&#128172;</span> WhatsApp
                </a>
                <a href="https://t.me/alykul_bot" className="flex items-center gap-3 text-[#0A1628] hover:text-[#00897B] transition-colors text-sm font-m3-body">
                  <span>&#129302;</span> Telegram @alykul_bot
                </a>
                <p className="flex items-center gap-3 text-gray-500 text-sm font-m3-body">
                  <span>&#128205;</span> {t.map.sub}
                </p>
              </div>
            </div>
          </ScrollReveal>
          {/* Right: Map */}
          <ScrollReveal>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46247.04285505498!2d77.05!3d42.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ee800b1b25417%3A0x45f7c90f93a5696a!2z0KfQvtC70L_QvtC9LdCQ0YLQsA!5e0!3m2!1sru!2skg!4v1"
                width="100%" height="100%" style={{ border: 0, minHeight: '400px' }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SEASON COUNTDOWN ═══════════════ */
function SeasonCountdown({ lang }: { lang: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });
  const [isBefore, setIsBefore] = useState(true);

  useEffect(() => {
    const seasonStart = new Date('2026-06-01T00:00:00+06:00');
    const seasonEnd = new Date('2026-09-15T23:59:59+06:00');

    const update = () => {
      const now = new Date();
      const before = now < seasonStart;
      setIsBefore(before);
      const target = before ? seasonStart : seasonEnd;
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, mins: 0 }); return; }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const label = isBefore
    ? (lang === 'ru' ? 'До открытия сезона' : lang === 'ky' ? 'Сезондун ачылышына чейин' : 'Until season opens')
    : (timeLeft.days > 0
      ? (lang === 'ru' ? 'До конца сезона' : lang === 'ky' ? 'Сезондун аягына чейин' : 'Until season ends')
      : (lang === 'ru' ? 'Сезон завершён' : lang === 'ky' ? 'Сезон аяктады' : 'Season ended'));

  return (
    <div>
      <p className="text-white/50 text-xs mb-2">{label}</p>
      <div className="flex items-center justify-center gap-4">
        {[
          { val: timeLeft.days, label: lang === 'ru' ? 'дней' : lang === 'ky' ? 'кун' : 'days' },
          { val: timeLeft.hours, label: lang === 'ru' ? 'часов' : lang === 'ky' ? 'саат' : 'hours' },
          { val: timeLeft.mins, label: lang === 'ru' ? 'мин' : lang === 'ky' ? 'мун' : 'min' },
        ].map(u => (
          <div key={u.label} className="text-center">
            <div className="text-white font-mono text-2xl font-bold">{String(u.val).padStart(2, '0')}</div>
            <div className="text-white/40 text-xs">{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ FOOTER — Dark navy (OceanPlaza style) ═══════════════ */
function M4Footer({ t, lang }: { t: Tr; lang: string }) {
  return (
    <>
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00897B] to-transparent" />

      <footer className="bg-[#0A1628] text-white py-14">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">

          {/* Season countdown */}
          <div className="text-center mb-10 p-6 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3 font-m3-display">
              {lang === 'ru' ? 'Сезон 2026' : lang === 'ky' ? '2026 Сезон' : 'Season 2026'}
            </h3>
            <SeasonCountdown lang={lang} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
                  <path d="M12 26Q16 20 20 8Q24 20 28 26" stroke="#00897B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M10 28Q15 24 20 26Q25 28 30 24" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
                <span className="font-m3-display text-lg font-bold tracking-wide">АЛЫКУЛ</span>
              </div>
              <p className="text-white/40 text-sm font-m3-body leading-relaxed">{t.foot.desc}</p>
            </div>

            {/* Routes */}
            <div>
              <h4 className="font-m3-display text-sm font-bold uppercase tracking-[2px] mb-4">{t.foot.routes}</h4>
              <ul className="space-y-2">
                <li><a href={`/${lang}/trips`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{t.foot.all_routes}</a></li>
                <li><a href={`/${lang}/trips`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{t.foot.cruises}</a></li>
                <li><a href={`/${lang}/trips`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{t.foot.charters}</a></li>
                <li><a href={`/${lang}/trips`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{t.foot.speed}</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-m3-display text-sm font-bold uppercase tracking-[2px] mb-4">{t.foot.company}</h4>
              <ul className="space-y-2">
                <li><a href={`/${lang}/account`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{t.foot.account}</a></li>
                <li><a href={`/${lang}/about`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{t.foot.about || 'О компании'}</a></li>
                <li><a href={`/${lang}/gifts`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{t.foot.gifts || 'Подарки'}</a></li>
                <li><a href={`/${lang}/group-booking`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{t.foot.groups || 'Группы'}</a></li>
                <li><a href={`/${lang}/privacy`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{t.foot.privacy}</a></li>
                <li><a href="#m4-contacts" className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{t.foot.contact}</a></li>
                <li><a href={`/${lang}/faq`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">FAQ</a></li>
                <li><a href={`/${lang}/blog`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{lang === 'ru' ? 'Блог' : 'Blog'}</a></li>
                <li><a href={`/${lang}/terms`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{lang === 'ru' ? 'Условия' : lang === 'ky' ? 'Шарттар' : 'Terms'}</a></li>
                <li><a href={`/${lang}/partners`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{lang === 'ru' ? 'Партнёрам' : lang === 'ky' ? 'Өнөктөштөргө' : 'Partners'}</a></li>
                <li><a href={`/${lang}/careers`} className="text-white/70 text-sm hover:text-[#00897B] transition-colors font-m3-body">{lang === 'ru' ? 'Карьера' : lang === 'ky' ? 'Карьера' : 'Careers'}</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-m3-display text-sm font-bold uppercase tracking-[2px] mb-4">{t.foot.contact}</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-white/40 text-sm font-m3-body">
                  <svg className="w-4 h-4 text-[#00897B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  +996 555 123 456
                </li>
                <li className="flex items-center gap-2 text-white/40 text-sm font-m3-body">
                  <svg className="w-4 h-4 text-[#00897B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t.foot.address}
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-white font-semibold mb-2 font-m3-display">{lang === 'ru' ? 'Получайте расписание сезона' : lang === 'ky' ? 'Сезондун расписаниесин алыңыз' : 'Get season schedule'}</h3>
            <p className="text-white/40 text-sm mb-3 font-m3-body">{lang === 'ru' ? 'Будьте первым кто узнает о новых рейсах и акциях' : lang === 'ky' ? 'Жаңы рейстер жана акциялар жөнүндө биринчи болуп билиңиз' : 'Be the first to know about new trips and offers'}</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-white/30 focus:border-[#00897B] outline-none font-m3-body" />
              <button className="px-4 py-2 bg-[#00897B] text-white rounded-xl text-sm font-semibold hover:bg-[#00796B] transition-colors shrink-0">
                →
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left text-white/30 text-sm font-m3-body">
              © {new Date().getFullYear()} {lang === 'ru' ? 'Алыкул' : 'Alykul'} · {lang === 'ru' ? 'Создано в Кыргызстане' : lang === 'ky' ? 'Кыргызстанда жасалган' : 'Made in Kyrgyzstan'} ❤️
            </div>
            <div className="flex gap-3">
              {/* WhatsApp */}
              <a href="https://wa.me/996555123456" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/50 hover:bg-[#25D366] hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              {/* Telegram */}
              <a href="https://t.me/alykul_kg" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/50 hover:bg-[#0088CC] hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/50 hover:bg-[#E1306C] hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* Telegram Bot */}
              <a href="https://t.me/alykul_bot" target="_blank" rel="noopener noreferrer" aria-label="Telegram Bot @alykul_bot"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/50 hover:bg-[#0088CC] hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════ SERVICE ICONS (SVG) ═══════════════ */
function IconBooking() {
  return (
    <svg className="w-10 h-10 text-[#00897B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconFleet() {
  return (
    <svg className="w-10 h-10 text-[#00897B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconYears() {
  return (
    <svg className="w-10 h-10 text-[#00897B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconSafety() {
  return (
    <svg className="w-10 h-10 text-[#00897B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ═══════════════ TRANSLATIONS ═══════════════ */
type Tr = ReturnType<typeof getTrans>;

function getTrans(lang: string) {
  const ru = lang === 'ru';
  const ky = lang === 'ky';
  return {
    nav: {
      services: ru ? 'Услуги' : ky ? 'Кызматтар' : 'Services',
      fleet: ru ? 'Флот' : ky ? 'Флот' : 'Fleet',
      pricing: ru ? 'Цены' : ky ? 'Баалар' : 'Pricing',
      schedule: ru ? 'Расписание' : ky ? 'Расписание' : 'Schedule',
      reviews: ru ? 'Отзывы' : ky ? 'Пикирлер' : 'Reviews',
      contacts: ru ? 'Контакты' : ky ? 'Байланыштар' : 'Contacts',
      booking: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book Now',
    },
    hero: {
      line1: ru ? 'ЛУЧШИЙ ОТДЫХ!' : ky ? 'ЭҢ ЖАКШЫ ЭС АЛУУ!' : 'BEST VACATION!',
      line2: ru ? 'на Иссык-Куле' : ky ? 'Ысык-Көлдө' : 'on Issyk-Kul',
      cta: ru ? 'Алыкул поможет!' : ky ? 'Алыкул жардам берет!' : 'Alykul will help!',
    },
    booking: {
      pier: ru ? 'Причал' : ky ? 'Причал' : 'Pier',
      date: ru ? 'Дата' : ky ? 'Күнү' : 'Date',
      guests: ru ? 'Гости' : ky ? 'Коноктор' : 'Guests',
      search: ru ? 'Найти рейс' : ky ? 'Рейс табуу' : 'Find Trip',
      guests_2: ru ? '2 гостя' : ky ? '2 конок' : '2 guests',
      guests_4: ru ? '4 гостя' : ky ? '4 конок' : '4 guests',
      guests_6: ru ? '6 гостей' : ky ? '6 конок' : '6 guests',
      guests_8: ru ? '8+ гостей' : ky ? '8+ конок' : '8+ guests',
    },
    piers: {
      cholpon: ru ? 'Чолпон-Ата' : ky ? 'Чолпон-Ата' : 'Cholpon-Ata',
      bosteri: ru ? 'Бостери' : ky ? 'Бостери' : 'Bosteri',
      karakol: ru ? 'Каракол' : ky ? 'Каракол' : 'Karakol',
      tamga: ru ? 'Тамга' : ky ? 'Тамга' : 'Tamga',
    },
    services: {
      badge: ru ? 'О нас' : ky ? 'Биз жөнүндө' : 'About Us',
      title: ru ? 'НАШИ УСЛУГИ' : ky ? 'БИЗДИН КЫЗМАТТАР' : 'SERVICES WE PROVIDE',
      subtitle: ru ? 'Первый оператор цифрового бронирования водного транспорта на озере Иссык-Куль' : ky ? 'Ысык-Көлдөгү суу транспортун санариптик брондоонун биринчи оператору' : 'First digital water transport booking operator on Lake Issyk-Kul',
      s1: ru ? 'ОНЛАЙН-БРОНИРОВАНИЕ' : ky ? 'ОНЛАЙН-БРОНДОО' : 'ONLINE BOOKING',
      s1d: ru ? 'Выбирайте маршрут, дату и оплачивайте онлайн за 2 минуты' : ky ? 'Маршрутту, күнүн тандап, 2 мүнөттө онлайн төлөңүз' : 'Choose route, date and pay online in 2 minutes',
      s2: ru ? 'ПРОВЕРЕННЫЙ ФЛОТ' : ky ? 'ТЕКШЕРИЛГЕН ФЛОТ' : 'CERTIFIED FLEET',
      s2d: ru ? 'Каждое судно сертифицировано и проходит ежедневный осмотр' : ky ? 'Ар бир кеме сертификатталган жана күн сайын текшерилет' : 'Every vessel certified and inspected daily',
      s3: ru ? '5+ ЛЕТ ОПЫТА' : ky ? '5+ ЖЫЛ ТАЖРЫЙБА' : '5+ YEARS EXPERIENCE',
      s3d: ru ? 'Более 5 лет организации водных туров на Иссык-Куле' : ky ? 'Ысык-Көлдө 5 жылдан ашык суу туристика тажрыйбасы' : 'Over 5 years of water tours on Issyk-Kul',
      s4: ru ? 'БЕЗОПАСНОСТЬ' : ky ? 'КООПСУЗДУК' : 'SAFETY FIRST',
      s4d: ru ? 'Спасательное оборудование, обученные капитаны, страховка' : ky ? 'Куткаруу жабдуулары, үйрөтүлгөн капитандар, камсыздандыруу' : 'Safety equipment, trained captains, insurance',
    },
    dividers: {
      routes: ru ? 'НАШИ МАРШРУТЫ' : ky ? 'БИЗДИН МАРШРУТТАР' : 'OUR ROUTES',
      routesSub: ru ? 'Откройте для себя лучшие водные приключения' : ky ? 'Эң жакшы суу укмуштарын ачыңыз' : 'Discover the best water adventures',
      booking: ru ? 'ЗАБРОНИРУЙТЕ РЕЙС' : ky ? 'РЕЙС БРОНДОҢУЗ' : 'BOOK YOUR TRIP',
      bookingSub: ru ? 'Незабываемый отдых на Иссык-Куле' : ky ? 'Ысык-Көлдө унутулгус эс алуу' : 'Unforgettable vacation on Issyk-Kul',
      popular: ru ? 'ПОПУЛЯРНЫЕ МАРШРУТЫ' : ky ? 'ПОПУЛЯРДУУ МАРШРУТТАР' : 'POPULAR ROUTES',
      popularSub: ru ? 'Лучшее, что мы предлагаем' : ky ? 'Биз сунуштаган эң жакшылар' : 'The best we offer',
      adventure: ru ? 'НАВСТРЕЧУ ПРИКЛЮЧЕНИЯМ' : ky ? 'УКМУШТАРГА КАРАТА' : 'TOWARD ADVENTURE',
      adventureSub: ru ? 'Создайте незабываемые воспоминания' : ky ? 'Унутулгус эстеликтерди жаратыңыз' : 'Create unforgettable memories',
    },
    fleet: {
      badge: ru ? 'Портфолио' : ky ? 'Портфолио' : 'Portfolio',
      title: ru ? 'НАШ ФЛОТ' : ky ? 'БИЗДИН ФЛОТ' : 'OUR FLEET',
      sub: ru ? 'Сертифицированные суда с ежедневным техосмотром' : ky ? 'Күн сайын текшерилген сертификатталган кемелер' : 'Certified vessels with daily inspection',
      tabAll: ru ? 'Все' : ky ? 'Баары' : 'All',
      tabSteam: ru ? 'Теплоходы' : ky ? 'Теплоходдор' : 'Steamships',
      tabYacht: ru ? 'Яхты' : ky ? 'Яхталар' : 'Yachts',
      tabSpeed: ru ? 'Катера' : ky ? 'Катерлер' : 'Speedboats',
      tabCruise: ru ? 'Круизы' : ky ? 'Круиздер' : 'Cruises',
      tabKids: ru ? 'Детские' : ky ? 'Балдарга' : 'Kids',
      f1: ru ? 'Теплоход «Алыкул»' : ky ? '«Алыкул» теплоходу' : 'Steamship "Alykul"',
      f2: ru ? 'Яхта «Nomad»' : ky ? '«Nomad» яхтасы' : 'Yacht "Nomad"',
      f3: ru ? 'Скоростные катера' : ky ? 'Ылдам катерлер' : 'Speedboats',
      f4: ru ? 'Закатный круиз' : ky ? 'Батыш круизи' : 'Sunset Cruise',
      f5: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : "Kids' Party",
      f6: ru ? 'Утренний круиз' : ky ? 'Эртеңки круиз' : 'Morning Cruise',
      f7: ru ? 'Круиз по Иссык-Кулю' : ky ? 'Ысык-Көл круизи' : 'Issyk-Kul Cruise',
      f8: ru ? 'VIP-чартер' : ky ? 'VIP-чартер' : 'VIP Charter',
      more: ru ? 'ПОДРОБНЕЕ' : ky ? 'ТОЛУГУРААК' : 'MORE',
    },
    pricing: {
      badge: ru ? 'Тарифы' : ky ? 'Тарифтер' : 'Pricing',
      title: ru ? 'НАШИ ЦЕНЫ' : ky ? 'БИЗДИН БААЛАР' : 'OUR PRICES',
      subtitle: ru ? 'Гарантия лучшего отдыха' : ky ? 'Эң жакшы эс алуу кепилдиги' : 'Satisfaction Guaranteed',
      popular: ru ? 'Хит' : ky ? 'Хит' : 'Popular',
      book: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book Now',
      p1name: ru ? 'Закатный круиз' : ky ? 'Батыш круизи' : 'Sunset Cruise',
      p1f1: ru ? '2 часа на воде' : ky ? '2 саат сууда' : '2 hours on water',
      p1f2: ru ? 'Теплоход «Алыкул»' : ky ? '«Алыкул» теплоходу' : 'Steamship "Alykul"',
      p1f3: ru ? 'Живая музыка' : ky ? 'Тирүү музыка' : 'Live music',
      p1f4: ru ? 'Фото на палубе' : ky ? 'Палубада сүрөт' : 'Photo on deck',
      p1f5: ru ? 'Спасжилеты' : ky ? 'Куткаруу жилеттери' : 'Life jackets',
      p2name: ru ? 'Утренний круиз' : ky ? 'Эртеңки круиз' : 'Morning Cruise',
      p2f1: ru ? '1.5 часа на воде' : ky ? '1.5 саат сууда' : '1.5 hours on water',
      p2f2: ru ? 'Теплоход «Алыкул»' : ky ? '«Алыкул» теплоходу' : 'Steamship "Alykul"',
      p2f3: ru ? 'Кофе на палубе' : ky ? 'Палубада кофе' : 'Coffee on deck',
      p2f4: ru ? 'Утренние горы' : ky ? 'Эртеңки тоолор' : 'Morning mountains',
      p2f5: ru ? 'Спасжилеты' : ky ? 'Куткаруу жилеттери' : 'Life jackets',
      p3name: ru ? 'Скоростной тур' : ky ? 'Ылдам тур' : 'Speed Tour',
      p3f1: ru ? '40 минут адреналина' : ky ? '40 мүнөт адреналин' : '40 minutes of adrenaline',
      p3f2: ru ? 'Катер до 60 км/ч' : ky ? 'Катер 60 км/с чейин' : 'Speedboat up to 60 km/h',
      p3f3: ru ? 'Вейкборд опция' : ky ? 'Вейкборд опция' : 'Wakeboard option',
      p3f4: ru ? 'GoPro видео' : ky ? 'GoPro видео' : 'GoPro video',
      p3f5: ru ? 'Спасжилеты' : ky ? 'Куткаруу жилеттери' : 'Life jackets',
      p4name: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter',
      p4price: ru ? 'от 7,000' : ky ? '7,000\u0442\u0430\u043d' : 'from $80',
      p4f1: ru ? '2-6 часов' : ky ? '2-6 саат' : '2-6 hours',
      p4f2: ru ? 'Яхта «Nomad»' : ky ? '«Nomad» яхтасы' : 'Yacht "Nomad"',
      p4f3: ru ? 'VIP-обслуживание' : ky ? 'VIP-тейлөө' : 'VIP service',
      p4f4: ru ? 'До 12 гостей' : ky ? '12 конокко чейин' : 'Up to 12 guests',
      p4f5: ru ? 'Капитан + страховка' : ky ? 'Капитан + камсыздандыруу' : 'Captain + insurance',
    },
    popular: {
      badge: ru ? 'Хиты продаж' : ky ? 'Эң популярдуу' : 'Bestsellers',
      title: ru ? 'ПОПУЛЯРНЫЕ МАРШРУТЫ' : ky ? 'ПОПУЛЯРДУУ МАРШРУТТАР' : 'POPULAR ROUTES',
      add: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book Now',
      tagCruise: ru ? 'Круиз' : ky ? 'Круиз' : 'Cruise',
      tagMorning: ru ? 'Утро' : ky ? 'Эртең' : 'Morning',
      tagSpeed: ru ? 'Адреналин' : ky ? 'Адреналин' : 'Adrenaline',
      tagVIP: ru ? 'VIP' : ky ? 'VIP' : 'VIP',
      r1: ru ? 'Закатный круиз' : ky ? 'Батыш круизи' : 'Sunset Cruise',
      r2: ru ? 'Утренний круиз' : ky ? 'Эртеңки круиз' : 'Morning Cruise',
      r3: ru ? 'Скоростной тур' : ky ? 'Ылдам тур' : 'Speed Tour',
      r4: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter',
      r4price: ru ? 'от 7,000 KGS (~$80)' : ky ? '7,000 KGS (~$80) баштап' : 'from $80 (7,000 KGS)',
    },
    reviews: {
      badge: ru ? 'Отзывы' : ky ? 'Пикирлер' : 'Testimonials',
      title: ru ? 'ОТЗЫВЫ ВАЖНЫ' : ky ? 'ПИКИРЛЕР МААНИЛҮҮ' : 'FEEDBACK IS IMPORTANT',
      sub: ru ? '12,000+ довольных гостей за 5 лет' : ky ? '5 жылда 12,000+ ыраазы конок' : '12,000+ happy guests over 5 years',
      r1n: ru ? 'Айгуль К.' : ky ? 'Айгүл К.' : 'Aigul K.',
      r1t: ru ? 'Потрясающий закатный круиз! Виды на горы с воды — незабываемые. Дети были в восторге от палубы. Обязательно вернёмся!' : ky ? 'Укмуштуу батыш круизи! Суудан тоолорго көрүнүш — унутулгус. Балдар палубадан кубанышты.' : 'Amazing sunset cruise! Mountain views from the water are unforgettable. Kids loved the deck. Will definitely return!',
      r2n: ru ? 'Дмитрий С.' : ky ? 'Дмитрий С.' : 'Dmitry S.',
      r2t: ru ? 'Арендовали яхту на день рождения жены. Сервис на высшем уровне, капитан профессионал. Романтика и адреналин в одном флаконе!' : ky ? 'Аялымдын туулган күнүнө яхта арендаладык. Тейлөө эң жогорку деңгээлде, капитан профессионал.' : 'Rented a yacht for my wife\'s birthday. Top-level service, professional captain. Romance and adrenaline combined!',
      r3n: ru ? 'Марат А.' : ky ? 'Марат А.' : 'Marat A.',
      r3t: ru ? 'Скоростной тур — это чистый адреналин! Катер мощный, безопасность на высоте. Рекомендую всем любителям экстрима на Иссык-Куле.' : ky ? 'Ылдам тур — таза адреналин! Катер күчтүү, коопсуздук жогорку деңгээлде. Ысык-Көлдөгү экстремал сүйгөндөргө сунуштайм.' : 'Speed tour is pure adrenaline! Powerful speedboat, safety is top-notch. Recommend to all thrill-seekers on Issyk-Kul.',
    },
    schedule: {
      badge: ru ? 'Расписание' : ky ? 'Расписание' : 'Schedule',
      title: ru ? 'РАСПИСАНИЕ РЕЙСОВ' : ky ? 'РЕЙСТЕРДИН РАСПИСАНИЕСИ' : 'TRIP SCHEDULE',
      subtitle: ru ? 'Ежедневные рейсы с июня по сентябрь' : ky ? 'Июндан сентябрга чейин күндөлүк рейстер' : 'Daily trips from June to September',
      route: ru ? 'Маршрут' : ky ? 'Маршрут' : 'Route',
      vessel: ru ? 'Судно' : ky ? 'Кеме' : 'Vessel',
      departure: ru ? 'Отправление' : ky ? 'Жөнөө' : 'Departure',
      duration: ru ? 'Длительность' : ky ? 'Узактыгы' : 'Duration',
      price: ru ? 'Цена' : ky ? 'Баасы' : 'Price',
      frequency: ru ? 'Частота' : ky ? 'Жыштыгы' : 'Frequency',
      book: ru ? 'Брон.' : ky ? 'Брон.' : 'Book',
      daily: ru ? 'Ежедневно' : ky ? 'Күн сайын' : 'Daily',
      on_request: ru ? 'По запросу' : ky ? 'Суроо боюнча' : 'On Request',
      weekend: ru ? 'Выходные' : ky ? 'Дем алыш' : 'Weekends',
      r_sunset: ru ? 'Закатный круиз (Чолпон-Ата)' : ky ? 'Батыш круизи (Чолпон-Ата)' : 'Sunset Cruise (Cholpon-Ata)',
      r_morning: ru ? 'Утренний круиз (Бостери)' : ky ? 'Эртеңки круиз (Бостери)' : 'Morning Cruise (Bosteri)',
      r_speed: ru ? 'Скоростной тур (Чолпон-Ата)' : ky ? 'Ылдам тур (Чолпон-Ата)' : 'Speed Tour (Cholpon-Ata)',
      r_charter: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter',
      r_kids: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : "Kids' Party",
      v_alykul: ru ? 'Алыкул' : ky ? 'Алыкул' : 'Alykul',
      v_boat: ru ? 'Катер' : ky ? 'Катер' : 'Speedboat',
      v_yacht: ru ? 'Nomad' : ky ? 'Nomad' : 'Nomad',
      dur_2h: ru ? '2 часа' : ky ? '2 саат' : '2 hours',
      dur_1_5h: ru ? '1.5 часа' : ky ? '1.5 саат' : '1.5 hours',
      dur_40m: ru ? '40 мин' : ky ? '40 мүн' : '40 min',
      dur_2_6h: ru ? '2-6 часов' : ky ? '2-6 саат' : '2-6 hours',
      dur_2_3h: ru ? '2-3 часа' : ky ? '2-3 саат' : '2-3 hours',
      from_7000: ru ? 'от 7,000 KGS (~$80)' : ky ? '7,000 KGS (~$80) баштап' : 'from $80 (7,000 KGS)',
      from_1000: ru ? 'от 1,000 KGS/чел (~$12)' : ky ? '1,000 KGS/адам (~$12) баштап' : 'from $12/person (1,000 KGS)',
    },
    faq: {
      title: ru ? 'ЧАСТЫЕ ВОПРОСЫ' : ky ? 'КӨП БЕРИЛҮҮЧҮ СУРООЛОР' : 'FREQUENTLY ASKED QUESTIONS',
      items: [
        { q: ru ? 'Как забронировать круиз?' : ky ? 'Круизди кантип брондоого болот?' : 'How to book a cruise?', a: ru ? 'Выберите маршрут на сайте, укажите дату и количество гостей. Бронирование через WhatsApp занимает 2 минуты. Оплата на месте или онлайн.' : ky ? 'Сайттан маршрутту тандап, күнүн жана конок санын көрсөтүңүз. WhatsApp аркылуу брондоо 2 мүнөт алат.' : 'Choose a route, select date and guests. WhatsApp booking takes 2 minutes. Pay on-site or online.' },
        { q: ru ? 'Какие документы нужны для посадки?' : ky ? 'Отуруу үчүн кандай документтер керек?' : 'What documents are needed?', a: ru ? 'Только удостоверение личности. Для детей до 14 лет — свидетельство о рождении. Иностранным гражданам — паспорт.' : ky ? 'Жеке кулуктук гана. 14 жашка чейинки балдарга — төрөлгөндүк жөнүндө күбөлүк. Чет элдиктерге — паспорт.' : 'Only ID. Children under 14 — birth certificate. Foreign citizens — passport.' },
        { q: ru ? 'Можно ли отменить бронирование?' : ky ? 'Брондоону жокко чыгарса болобу?' : 'Can I cancel a booking?', a: ru ? 'Да, бесплатная отмена за 24 часа до отправления. При отмене менее чем за 24 часа — удерживается 20% стоимости.' : ky ? 'Ооба, жөнөөгө 24 саат калганда акысыз жокко чыгарса болот. 24 сааттан кем болсо — 20% кармалат.' : 'Yes, free cancellation 24h before departure. Less than 24h — 20% fee.' },
        { q: ru ? 'Есть ли спасательное оборудование?' : ky ? 'Куткаруу жабдуулары барбы?' : 'Is there safety equipment?', a: ru ? 'Все суда оснащены спасательными жилетами, кругами и аптечкой. Капитаны сертифицированы и проходят ежегодную аттестацию.' : ky ? 'Бардык кемелерде куткаруу жилеттери, чөйрөлөрү жана биринчи жардам каражаттары бар. Капитандар жыл сайын аттестациядан өтөт.' : 'All vessels have life jackets, rings and first aid. Captains are certified annually.' },
        { q: ru ? 'Работаете ли вы в плохую погоду?' : ky ? 'Жаман аба ырайында иштейсизби?' : 'Do you operate in bad weather?', a: ru ? 'Безопасность — приоритет. При штормовом предупреждении рейсы переносятся. Мы уведомляем за 2 часа до отправления.' : ky ? 'Коопсуздук — артыкчылык. Бороон эскертүүсүндө рейстер которулат. Жөнөөгө 2 саат калганда кабарлайбыз.' : 'Safety first. Cruises reschedule in storms. We notify 2 hours before departure.' },
      ],
    },
    widgets: {
      recentTitle: ru ? 'Последние рейсы' : ky ? 'Акыркы рейстер' : 'Recent Trips',
      recentItems: [
        { title: ru ? 'Закатный круиз — 28 мая' : ky ? 'Батыш круизи — 28 май' : 'Sunset Cruise — May 28', date: ru ? '2 дня назад' : ky ? '2 күн мурун' : '2 days ago' },
        { title: ru ? 'Утренний круиз — 27 мая' : ky ? 'Эртеңки круиз — 27 май' : 'Morning Cruise — May 27', date: ru ? '3 дня назад' : ky ? '3 күн мурун' : '3 days ago' },
        { title: ru ? 'VIP-чартер — 25 мая' : ky ? 'VIP-чартер — 25 май' : 'VIP Charter — May 25', date: ru ? '5 дней назад' : ky ? '5 күн мурун' : '5 days ago' },
        { title: ru ? 'Детский праздник — 24 мая' : ky ? 'Балдар майрамы — 24 май' : "Kids' Party — May 24", date: ru ? '6 дней назад' : ky ? '6 күн мурун' : '6 days ago' },
      ],
      tgDesc: ru ? 'Подпишитесь на наш Telegram-канал для акций, новостей и расписания рейсов.' : ky ? 'Акциялар, жаңылыктар жана рейс расписаниеси үчүн Telegram-каналыбызга жазылыңыз.' : 'Subscribe to our Telegram channel for deals, news and trip schedules.',
      tgBtn: ru ? 'Подписаться' : ky ? 'Жазылуу' : 'Subscribe',
      galleryTitle: ru ? 'Галерея' : ky ? 'Галерея' : 'Gallery',
    },
    map: {
      title: ru ? 'КАК НАС НАЙТИ' : ky ? 'БИЗДИ КАНТИП ТАБАСЫЗ' : 'FIND US',
      sub: ru ? 'Причал в Чолпон-Ате, северный берег озера Иссык-Куль' : ky ? 'Чолпон-Атадагы причал, Ысык-Көлдүн түндүк жээги' : 'Pier in Cholpon-Ata, northern shore of Lake Issyk-Kul',
    },
    contact: {
      title: ru ? 'Свяжитесь с нами' : ky ? 'Биз менен байланышыңыз' : 'Contact Us',
      name: ru ? 'Ваше имя' : ky ? 'Атыңыз' : 'Your name',
      phone: ru ? 'Телефон' : 'Phone',
      message: ru ? 'Сообщение' : ky ? 'Билдирүү' : 'Message',
      send: ru ? 'Отправить' : ky ? 'Жөнөтүү' : 'Send',
      sent: ru ? 'Спасибо! Мы свяжемся с вами.' : ky ? 'Рахмат! Сиз менен байланышабыз.' : 'Thank you! We will contact you.',
    },
    foot: {
      desc: ru ? 'Первая платформа онлайн-бронирования водного транспорта на озере Иссык-Куль.' : ky ? 'Ысык-Көлдөгү суу транспортун онлайн брондоонун биринчи платформасы.' : 'First online water transport booking platform on Lake Issyk-Kul.',
      routes: ru ? 'Маршруты' : ky ? 'Маршруттар' : 'Routes',
      all_routes: ru ? 'Все маршруты' : ky ? 'Бардык маршруттар' : 'All Routes',
      cruises: ru ? 'Круизы' : ky ? 'Круиздер' : 'Cruises',
      charters: ru ? 'Чартеры' : ky ? 'Чартерлер' : 'Charters',
      speed: ru ? 'Скоростные туры' : ky ? 'Ылдам турлар' : 'Speed Tours',
      company: ru ? 'Компания' : ky ? 'Компания' : 'Company',
      account: ru ? 'Личный кабинет' : ky ? 'Жеке кабинет' : 'My Account',
      privacy: ru ? 'Конфиденциальность' : ky ? 'Купуялуулук' : 'Privacy',
      contact: ru ? 'Контакты' : ky ? 'Байланыштар' : 'Contacts',
      rights: ru ? 'Все права защищены.' : ky ? 'Бардык укуктар корголгон.' : 'All rights reserved.',
      address: ru ? 'Чолпон-Ата, причал' : ky ? 'Чолпон-Ата, причал' : 'Cholpon-Ata, pier',
      about: ru ? 'О компании' : ky ? 'Биз жөнүндө' : 'About',
      gifts: ru ? 'Подарки' : ky ? 'Белектер' : 'Gifts',
      groups: ru ? 'Группы' : ky ? 'Топтор' : 'Groups',
    },
  };
}
