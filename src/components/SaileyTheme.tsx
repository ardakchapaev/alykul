'use client';

import { useTheme, THEMES } from '@/lib/theme-context';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';
import { ReactNode, useState, useEffect } from 'react';
import { ScrollReveal } from './M3Animations';
import WeatherWidget from './WeatherWidget';
import CurrencySelector from './CurrencySelector';

type Props = { lang: string; children: ReactNode };

export default function SaileyWrapper({ lang }: Props) {
  const { theme } = useTheme();
  if (theme !== 'V1') return null;

  const t = getTrans(lang);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0A1628] overflow-y-auto">
      <M3Nav lang={lang} t={t} />
      <M3Hero t={t} lang={lang} />
      <M3DiagonalStrips t={t} />
      <M3BentoServices t={t} />
      <M3TextCTA t={t} lang={lang} />
      <M3Catalog t={t} lang={lang} />
      <M3PhotoDivider />
      <M3Schedule t={t} lang={lang} />
      <M3Reviews t={t} lang={lang} />
      <M3FAQ t={t} />
      <M3MapSection t={t} />
      <M3Footer t={t} lang={lang} />
      {/* M3AiChat removed — global AiChatWidget via layout is used instead */}
    </div>
  );
}

/* ═══════════════ NAVBAR — Grand Regatta style: transparent, centered logo ═══════════════ */
function M3Nav({ lang, t }: { lang: string; t: Tr }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    const container = document.querySelector('[class*="fixed inset-0 z-\\[9999\\]"]');
    const onScroll = () => {
      const scrollY = container ? (container as HTMLElement).scrollTop : window.scrollY;
      setScrolled(scrollY > 60);
    };
    const target = container || window;
    target.addEventListener('scroll', onScroll, { passive: true });
    return () => target.removeEventListener('scroll', onScroll);
  }, []);

  const leftLinks = [
    { href: '#m3-about', label: t.nav.about },
    { href: '#m3-fleet', label: t.nav.fleet },
    { href: '#m3-catalog', label: t.nav.routes },
    { href: '#m3-schedule', label: t.nav.schedule },
  ];
  const rightLinks = [
    { href: '#m3-reviews', label: t.nav.reviews },
  ];
  const langLabels: Record<string, string> = { ru: 'RU', en: 'EN', ky: 'KY' };
  const themes = THEMES;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-500 font-m3-body ${
      scrolled ? 'bg-[#0A1628]/95 backdrop-blur-xl shadow-2xl py-2' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left nav links */}
        <div className="hidden lg:flex items-center gap-6 flex-1">
          {leftLinks.map(l => (
            <a key={l.href} href={l.href} className="text-white/70 text-[11px] font-medium tracking-[2px] uppercase hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>

        {/* Center monogram logo */}
        <a href="#" className="flex flex-col items-center gap-0 group flex-shrink-0 mx-4 lg:mx-8">
          <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#00A896" strokeWidth="1" opacity="0.5" />
            <path d="M16 32Q20 24 24 12Q28 24 32 32" stroke="#00A896" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M14 34Q19 30 24 32Q29 34 34 30" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </svg>
          <span className="text-white font-m3-display text-[10px] tracking-[4px] uppercase mt-1 hidden sm:block">ALYKUL</span>
        </a>

        {/* Right nav links + CTAs */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          {rightLinks.map(l => (
            <a key={l.href} href={l.href} className="text-white/70 text-[11px] font-medium tracking-[2px] uppercase hover:text-white transition-colors">{l.label}</a>
          ))}
          <CurrencySelector />
          {/* Lang */}
          <div className="relative">
            <button onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); }}
              className="flex items-center gap-1 text-white/60 text-[11px] font-medium tracking-[1px] hover:text-white transition-colors px-2 py-1.5">
              {langLabels[lang] || 'RU'}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#0A1628]/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                {['ru', 'en', 'ky'].map(l => (
                  <a key={l} href={`/${l}`} onClick={() => setLangOpen(false)}
                    className={`block px-4 py-2 text-xs font-medium ${l === lang ? 'text-[#00A896] bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>{langLabels[l]}</a>
                ))}
              </div>
            )}
          </div>
          {/* Theme */}
          <div className="relative">
            <button onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); }}
              className="flex items-center gap-1 text-white/60 text-[11px] font-medium tracking-[1px] hover:text-white transition-colors px-2 py-1.5">
              {theme}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {themeOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#0A1628]/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                {themes.map(th => (
                  <button key={th} onClick={() => { setTheme(th); setThemeOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-xs font-medium ${th === theme ? 'text-[#00A896] bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>{th}</button>
                ))}
              </div>
            )}
          </div>
          {/* Auth */}
          {user ? (
            <a href={`/${lang}/account`} className="flex items-center gap-1.5 text-white/70 text-xs font-medium hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span className="hidden sm:inline">{user.name || user.phone.slice(-4)}</span>
            </a>
          ) : (
            <a href={`/${lang}/auth`} className="bg-[#00A896] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-[#009688] transition-colors">
              {lang === 'ru' ? 'Войти' : lang === 'ky' ? 'Кирүү' : 'Sign In'}
            </a>
          )}
          {/* Book CTA */}
          <a href={`/${lang}/trips`} className="border border-white/40 hover:bg-white hover:text-[#0A1628] text-white text-[11px] font-medium tracking-[2px] uppercase px-5 py-2 transition-all">
            {t.nav.booking}
          </a>
        </div>

        {/* Burger */}
        <button className="lg:hidden flex flex-col gap-1.5 w-6 ml-2 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`h-[1.5px] w-full bg-white transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`h-[1.5px] w-full bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-[1.5px] w-full bg-white transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 bg-[#0A1628]/[0.98] z-[10001] flex flex-col items-center justify-center gap-6 lg:hidden">
          <button className="absolute top-4 right-5 text-white text-3xl p-3" onClick={() => setOpen(false)}>&times;</button>
          {[...leftLinks, ...rightLinks].map(l => (
            <a key={l.href} href={l.href} className="text-white font-m3-display text-2xl italic hover:text-[#00A896] transition-colors" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href={`/${lang}/trips`} className="border border-white/40 hover:bg-white hover:text-[#0A1628] text-white font-m3-body text-sm tracking-[2px] uppercase px-8 py-3 transition-all mt-4" onClick={() => setOpen(false)}>
            {t.nav.booking}
          </a>
          {/* Mobile Auth */}
          {user ? (
            <a href={`/${lang}/account`} className="flex items-center gap-2 text-white text-lg hover:text-[#00A896] transition-colors" onClick={() => setOpen(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              {user.name || user.phone.slice(-4)}
            </a>
          ) : (
            <a href={`/${lang}/auth`} className="bg-[#00A896] text-white font-m3-body text-sm tracking-[2px] uppercase px-8 py-3 transition-all" onClick={() => setOpen(false)}>
              {lang === 'ru' ? 'Войти' : lang === 'ky' ? 'Кирүү' : 'Sign In'}
            </a>
          )}
          <div className="flex gap-3 mt-6 border-t border-white/10 pt-6">
            {themes.map(th => (
              <button key={th} onClick={() => { setTheme(th); setOpen(false); }}
                className={`px-4 py-3 text-sm font-semibold ${th === theme ? 'bg-[#00A896] text-white' : 'border border-white/20 text-white/60 hover:text-white'}`}>{th}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════ HERO — Grand Regatta: fullscreen ocean, elegant serif, yacht overlay ═══════════════ */
function M3Hero({ t, lang }: { t: Tr; lang: string }) {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Fullscreen aerial ocean background */}
      <div className="absolute inset-0">
        <Image src="/images/hero.jpg" alt="Issyk-Kul aerial" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/50 via-[#0A1628]/20 to-[#0A1628]/70" />
      </div>
      <div className="absolute top-20 right-4 md:right-8 z-10 hidden xl:block"><WeatherWidget variant="dark" lang={lang} /></div>

      {/* Central elegant title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <h1 className="font-m3-display text-white leading-[1.15]" style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}>
          <span className="block font-normal">{t.hero.line1}</span>
          <span className="block italic font-light">{t.hero.line2}</span>
          <span className="block font-normal">{t.hero.line3}</span>
          <span className="block italic font-light">{t.hero.line4}</span>
        </h1>
        <a href={`/${lang}/trips`} className="mt-10 border border-white/50 text-white text-[11px] tracking-[3px] uppercase px-8 py-3 hover:bg-white hover:text-[#0A1628] transition-all font-m3-body">
          {t.hero.cta}
        </a>
      </div>

      {/* Yacht overlay image */}
      <div className="absolute bottom-0 right-0 w-[45%] max-w-[600px] z-10 hidden lg:block pointer-events-none">
        <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
          <Image src="/images/scene6.jpg" alt="Yacht" fill className="object-cover object-center" style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)' }} />
        </div>
      </div>

      {/* Location label bottom-left */}
      <div className="absolute bottom-8 left-6 md:left-12 z-10">
        <span className="text-white/50 text-[10px] tracking-[3px] uppercase font-m3-body">{t.hero.location}</span>
      </div>

      {/* Date label bottom-right */}
      <div className="absolute bottom-8 right-6 md:right-12 z-10">
        <span className="text-white/50 text-[10px] tracking-[3px] uppercase font-m3-body">{t.hero.season}</span>
      </div>

      {/* Mobile booking CTA */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 md:hidden">
        <a href={`/${lang}/trips`} className="bg-[#00A896] hover:bg-[#008F80] text-white font-semibold px-8 py-3 rounded-lg transition-colors font-m3-body text-sm whitespace-nowrap">
          {t.booking.search}
        </a>
      </div>

      {/* Booking widget overlay at very bottom */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 w-full max-w-3xl px-4 hidden md:block">
        <div className="bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="text-white/40 text-[9px] uppercase tracking-[2px] font-m3-body mb-1 block">{t.booking.pier}</label>
              <select className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-m3-body outline-none focus:border-[#00A896]/40 appearance-none cursor-pointer">
                <option value="cholpon-ata">{t.booking.piers.cholpon}</option>
                <option value="bosteri">{t.booking.piers.bosteri}</option>
                <option value="tamga">{t.booking.piers.tamga}</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-white/40 text-[9px] uppercase tracking-[2px] font-m3-body mb-1 block">{t.booking.date}</label>
              <input type="date" className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-m3-body outline-none focus:border-[#00A896]/40" />
            </div>
            <div className="flex-1">
              <label className="text-white/40 text-[9px] uppercase tracking-[2px] font-m3-body mb-1 block">{t.booking.guests}</label>
              <select className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-m3-body outline-none focus:border-[#00A896]/40 appearance-none cursor-pointer">
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {t.booking.guestLabel}</option>)}
                <option value="10+">10+</option>
              </select>
            </div>
            <a href={`/${lang}/trips`} className="bg-[#00A896] hover:bg-[#008F80] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors font-m3-body text-sm whitespace-nowrap">
              {t.booking.search}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ DIAGONAL IMAGE STRIPS — Pirate Lines style ═══════════════ */
function M3DiagonalStrips({ t }: { t: Tr }) {
  const images = [
    '/images/scene1.jpg',
    '/images/scene3.jpg',
    '/images/scene5.jpg',
    '/images/scene7.jpg',
    '/images/scene9.jpg',
  ];

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: brush-script heading */}
          <div className="lg:w-[40%] text-center lg:text-left">
            <ScrollReveal>
              <h2 className="font-m3-display italic text-[#0A1628] leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                {t.diagonal.title}
              </h2>
              <p className="mt-6 text-[#0A1628]/60 font-m3-body text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
                {t.diagonal.desc}
              </p>
            </ScrollReveal>
          </div>

          {/* Desktop: diagonal strips */}
          <div className="hidden md:flex lg:w-[60%] gap-3 md:gap-4 h-[400px] md:h-[500px]" style={{ transform: 'rotate(-3deg)' }}>
            {images.map((img, i) => (
              <div key={i} className="flex-1 overflow-hidden rounded-lg relative group" style={{ clipPath: 'polygon(5% 0, 100% 3%, 95% 100%, 0 97%)' }}>
                <Image src={img} alt={`Activity ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-[#0A1628]/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>
          {/* Mobile: 2-column grid instead of thin strips */}
          <div className="md:hidden w-full grid grid-cols-2 gap-3">
            {images.slice(0, 4).map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={img} alt={`Activity ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Angular section edge */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#f7f8fa]" style={{ clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0 100%)' }} />
    </section>
  );
}

/* ═══════════════ BENTO SERVICE CARDS — "Our tours include everything" ═══════════════ */
function M3BentoServices({ t }: { t: Tr }) {
  const cards = t.bento.items;

  return (
    <section id="m3-about" className="relative py-20 md:py-28 bg-[#f7f8fa]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="font-m3-display font-bold text-[#0A1628] tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              {t.bento.title}
            </h2>
          </div>
        </ScrollReveal>

        {/* Bento grid: asymmetric layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[220px]">
          {cards.map((card: { img: string; icon: string; title: string }, i: number) => (
            <ScrollReveal key={i} className={i === 0 ? 'col-span-2 row-span-1' : i === 3 ? 'col-span-2 lg:col-span-1' : ''}>
              <div className="relative h-full rounded-2xl overflow-hidden group cursor-pointer border border-black/[0.05] bg-white shadow-sm hover:shadow-xl transition-shadow">
                <div className="absolute inset-0">
                  <Image src={card.img} alt={card.title} fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-2xl mb-2 block">{card.icon}</span>
                  <h3 className="font-m3-display font-semibold text-white text-lg">{card.title}</h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Angular bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)' }} />
    </section>
  );
}

/* ═══════════════ TEXT BLOCK + CTA ═══════════════ */
function M3TextCTA({ t, lang }: { t: Tr; lang: string }) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="font-m3-body text-[#0A1628]/70 text-lg md:text-xl leading-relaxed mb-10">
            {t.textCta.desc}
          </p>
          <a href={`/${lang}/trips`} className="inline-block border-2 border-[#0A1628] text-[#0A1628] text-[12px] tracking-[3px] uppercase font-semibold px-10 py-4 hover:bg-[#0A1628] hover:text-white transition-all font-m3-body">
            {t.textCta.btn}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ CATALOG WITH TABS — "NEED GEARS" / Pirate Lines style ═══════════════ */
function M3Catalog({ t, lang }: { t: Tr; lang: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = t.catalog.tabs;
  const allItems = t.catalog.tabItems;

  return (
    <section id="m3-catalog" className="py-20 md:py-28 bg-[#f7f8fa]" style={{ clipPath: 'polygon(0 3%, 100% 0, 100% 97%, 0 100%)' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-[#00A896] text-[11px] tracking-[4px] uppercase font-m3-body font-semibold">{t.catalog.badge}</span>
            <h2 className="font-m3-display font-bold text-[#0A1628] mt-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              {t.catalog.title}
            </h2>
          </div>
        </ScrollReveal>

        {/* Tab bar */}
        <div className="flex justify-start md:justify-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap">
          {tabs.map((tab: string, i: number) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className={`px-6 py-3 text-[11px] tracking-[2px] uppercase font-m3-body font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                activeTab === i
                  ? 'bg-[#0A1628] text-white'
                  : 'bg-white text-[#0A1628]/60 border border-[#0A1628]/10 hover:border-[#0A1628]/30'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Product cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allItems[activeTab].map((item: { img: string; title: string; price: string }, i: number) => (
            <ScrollReveal key={`${activeTab}-${i}`}>
              <div className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 ${activeTab === 0 && i === 0 ? 'border border-[#00A896]/20' : 'border border-black/[0.06]'}`}>
                <div className="relative h-[240px] overflow-hidden">
                  {activeTab === 0 && i === 0 && (
                    <span className="absolute top-3 right-3 bg-[#00A896] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10">
                      {lang === 'en' ? 'Popular' : lang === 'ky' ? 'Популярдуу' : 'Популярное'}
                    </span>
                  )}
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-m3-display font-semibold text-[#0A1628] text-base mb-1">{item.title}</h3>
                  <p className="font-m3-body text-[#00A896] font-bold text-lg mb-4">{item.price}</p>
                  <a href={`/${lang}/trips`} className="block text-center bg-[#0A1628] hover:bg-[#00A896] text-white text-[11px] tracking-[2px] uppercase font-semibold py-3 transition-colors font-m3-body">
                    {t.catalog.book}
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

/* ═══════════════ FULLSCREEN PHOTO DIVIDER ═══════════════ */
function M3PhotoDivider() {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <Image src="/images/scene7.jpg" alt="Water activities" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/60 to-transparent" />
      {/* Diagonal overlay stripe */}
      <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 35% 0, 20% 100%, 0 100%)', background: 'linear-gradient(180deg, rgba(0,168,150,0.3) 0%, rgba(10,22,40,0.5) 100%)' }} />
    </section>
  );
}

/* ═══════════════ SCHEDULE — Dark bg, teal header ═══════════════ */
function M3Schedule({ t, lang }: { t: Tr; lang: string }) {
  const rows = t.schedule.rows;
  return (
    <section id="m3-schedule" className="py-20 md:py-28 bg-[#0A1628]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-[#00A896] text-[11px] tracking-[4px] uppercase font-m3-body font-semibold">{t.schedule.badge}</span>
            <h2 className="font-m3-display font-bold text-white mt-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>{t.schedule.title}</h2>
            <p className="font-m3-body text-white/40 mt-3 text-sm">{t.schedule.sub}</p>
          </div>
        </ScrollReveal>

        <div className="rounded-xl overflow-hidden border border-white/10">
          {/* Header */}
          <div className="hidden md:grid grid-cols-5 gap-0 bg-[#00A896] text-white text-[11px] font-semibold font-m3-body uppercase tracking-[2px]">
            <div className="px-5 py-3">{t.schedule.col_route}</div>
            <div className="px-5 py-3">{t.schedule.col_time}</div>
            <div className="px-5 py-3">{t.schedule.col_duration}</div>
            <div className="px-5 py-3">{t.schedule.col_price}</div>
            <div className="px-5 py-3"></div>
          </div>
          {/* Rows */}
          {rows.map((row: { route: string; time: string; duration: string; price: string }, i: number) => (
            <div key={i} className={`grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-0 px-5 py-4 ${i % 2 === 0 ? 'bg-white/[0.03]' : 'bg-white/[0.06]'} border-b border-white/5 last:border-b-0`}>
              <div className="font-m3-body text-white font-semibold text-sm">
                <span className="md:hidden text-[#00A896] text-xs mr-2">{t.schedule.col_route}:</span>{row.route}
              </div>
              <div className="font-m3-body text-white/70 text-sm">
                <span className="md:hidden text-[#00A896] text-xs mr-2">{t.schedule.col_time}:</span>{row.time}
              </div>
              <div className="font-m3-body text-white/70 text-sm">
                <span className="md:hidden text-[#00A896] text-xs mr-2">{t.schedule.col_duration}:</span>{row.duration}
              </div>
              <div className="font-m3-body text-[#00A896] font-bold text-sm">
                <span className="md:hidden text-white/50 text-xs font-normal mr-2">{t.schedule.col_price}:</span>{row.price}
              </div>
              <div className="md:text-right">
                <a href={`/${lang}/trips`} className="inline-block bg-[#00A896] hover:bg-[#008F80] text-white text-[10px] tracking-[1px] uppercase font-semibold px-4 py-2.5 w-full sm:w-auto transition-colors font-m3-body text-center">
                  {t.catalog.book}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ TESTIMONIAL COLUMN ═══════════════ */
function TestimonialsColumn({ testimonials, className = '', duration = 15 }: {
  testimonials: { text: string; img: string; name: string; city: string; stars: number }[];
  className?: string;
  duration?: number;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex flex-col gap-6 pb-6" style={{ animation: `m3ScrollUp ${duration}s linear infinite` }}>
        {[0, 1].map(copy => (
          <div key={copy} className="flex flex-col gap-6">
            {testimonials.map((r, i) => (
              <div key={`${copy}-${i}`} className="p-8 rounded-xl border border-black/[0.04] shadow-lg max-w-xs w-full bg-white">
                <div className="text-amber-400 text-sm mb-4">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                <p className="font-m3-body text-[#0A1628]/80 text-sm leading-relaxed mb-5">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image src={r.img} alt={r.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-m3-body font-semibold text-sm text-[#0A1628] leading-tight">{r.name}</div>
                    <div className="font-m3-body text-[#0A1628]/50 text-xs leading-tight">{r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes m3ScrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════ REVIEWS ═══════════════ */
function M3Reviews({ t, lang }: { t: Tr; lang: string }) {
  const ru = lang === 'ru';
  const all = [
    { img: '/images/q01.jpg', name: ru ? 'Айгуль К.' : 'Aigul K.', city: ru ? 'г. Бишкек' : 'Bishkek', stars: 5, text: ru ? 'Потрясающий закатный круиз из Чолпон-Аты! Вид на горы с воды — это нечто невероятное.' : 'Amazing sunset cruise! Mountain views from the water are incredible.' },
    { img: '/images/captain2.jpg', name: ru ? 'Бакыт М.' : 'Bakyt M.', city: ru ? 'г. Каракол' : 'Karakol', stars: 5, text: ru ? 'Профессиональная команда! Капитан рассказал историю озера, дети в восторге.' : 'Professional crew! Captain told lake history, kids loved it.' },
    { img: '/images/scene8.jpg', name: ru ? 'Дмитрий С.' : 'Dmitry S.', city: ru ? 'г. Алматы' : 'Almaty', stars: 4, text: ru ? 'Скоростной тур из Бостери — адреналин! Лучший опыт на Иссык-Куле.' : 'Speed tour from Bosteri — pure adrenaline!' },
    { img: '/images/scene4.jpg', name: ru ? 'Мария Л.' : 'Maria L.', city: ru ? 'г. Москва' : 'Moscow', stars: 5, text: ru ? 'Яхта Nomad — VIP уровень. Романтический ужин на воде с видом на закат.' : 'Yacht Nomad is VIP level. Romantic dinner with sunset views.' },
    { img: '/images/scene3.jpg', name: ru ? 'Азамат Т.' : 'Azamat T.', city: ru ? 'г. Бишкек' : 'Bishkek', stars: 5, text: ru ? 'Корпоратив на теплоходе — 80 человек, всё организовано идеально.' : 'Corporate event — 80 people, perfectly organized.' },
    { img: '/images/promo.jpg', name: ru ? 'Елена Р.' : 'Elena R.', city: ru ? 'г. Ош' : 'Osh', stars: 5, text: ru ? 'Детский праздник на Алыкул — дети до сих пор вспоминают!' : 'Kids party on Alykul — kids still remember it!' },
    { img: '/images/scene1.jpg', name: ru ? 'Тимур К.' : 'Timur K.', city: ru ? 'г. Астана' : 'Astana', stars: 4, text: ru ? 'Утренний круиз из Бостери. Тихо, спокойно, горы в воде.' : 'Morning cruise. Quiet, peaceful, mountains in the water.' },
    { img: '/images/scene5.jpg', name: ru ? 'Анна В.' : 'Anna V.', city: ru ? 'г. Ташкент' : 'Tashkent', stars: 5, text: ru ? 'Лучший отпуск за 5 лет. Иссык-Куль + яхта + горы = незабываемо.' : 'Best vacation in 5 years. Issyk-Kul + yacht = unforgettable!' },
    { img: '/images/scene9.jpg', name: ru ? 'Нурлан Б.' : 'Nurlan B.', city: ru ? 'г. Каракол' : 'Karakol', stars: 5, text: ru ? 'Свадьба на теплоходе — мечта сбылась! 150 гостей, 2 палубы.' : 'Wedding on steamship — dream come true! 150 guests.' },
  ];

  return (
    <section id="m3-reviews" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-[#00A896] text-[11px] tracking-[4px] uppercase font-m3-body font-semibold">{t.reviews.badge}</span>
            <h2 className="font-m3-display font-bold text-[#0A1628] mt-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>{t.reviews.title}</h2>
            <p className="font-m3-body text-[#0A1628]/50 mt-3">{t.reviews.sub}</p>
          </div>
        </ScrollReveal>
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[700px] overflow-hidden">
          <TestimonialsColumn testimonials={all.slice(0, 3)} duration={18} />
          <TestimonialsColumn testimonials={all.slice(3, 6)} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={all.slice(6, 9)} className="hidden lg:block" duration={20} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ FAQ ACCORDION ═══════════════ */
function M3FAQ({ t }: { t: Tr }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = t.faq.items;

  return (
    <section className="py-20 md:py-28 bg-[#f7f8fa]">
      <div className="max-w-[700px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-m3-display font-bold text-[#0A1628]" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>{t.faq.title}</h2>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {items.map((item: { q: string; a: string }, i: number) => (
            <div key={i} className={`bg-white rounded-xl border border-black/[0.06] overflow-hidden transition-shadow ${openIdx === i ? 'shadow-md' : 'shadow-sm'}`}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left font-m3-body font-semibold text-[#0A1628] text-sm hover:bg-[#f7f8fa]/50 transition-colors cursor-pointer"
              >
                {item.q}
                <svg className={`w-4 h-4 shrink-0 text-[#00A896] transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 pb-5 text-[#0A1628]/60 text-sm font-m3-body leading-relaxed">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ MAP + CONTACT — Cholpon-Ata ═══════════════ */
function M3MapSection({ t }: { t: Tr }) {
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
    <section id="m3-contacts" className="py-20 bg-[#0A1628]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-m3-display font-bold text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>{t.contact.title}</h2>
            <p className="font-m3-body text-white/50 mt-2 text-sm">{t.map.sub}</p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Form + Contacts */}
          <ScrollReveal>
            <div>
              {contactSent ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4 text-[#00A896]">&#10003;</div>
                  <p className="text-[#00A896] font-semibold text-lg font-m3-body">{t.contact.sent}</p>
                </div>
              ) : (
                <form className="space-y-4 mb-8" onSubmit={(e) => { e.preventDefault(); handleContact(); }}>
                  <input type="text" placeholder={t.contact.name} value={contactForm.name} autoComplete="name"
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl outline-none focus:border-[#00A896] transition-colors font-m3-body" />
                  <input type="tel" placeholder={t.contact.phone} value={contactForm.phone} autoComplete="tel"
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl outline-none focus:border-[#00A896] transition-colors font-m3-body" />
                  <textarea placeholder={t.contact.message} rows={3} value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl outline-none focus:border-[#00A896] transition-colors resize-none font-m3-body" />
                  <button type="submit" className="w-full py-3 bg-[#00A896] hover:bg-[#009685] text-white rounded-xl font-semibold transition-colors font-m3-body">
                    {t.contact.send}
                  </button>
                </form>
              )}
              <div className="space-y-3">
                <a href="tel:+996555123456" className="flex items-center gap-3 text-white/70 hover:text-[#00A896] transition-colors text-sm font-m3-body">
                  <span>&#128241;</span> +996 555 123 456
                </a>
                <a href="mailto:info@alykul.kg" className="flex items-center gap-3 text-white/70 hover:text-[#00A896] transition-colors text-sm font-m3-body">
                  <span>&#128231;</span> info@alykul.kg
                </a>
                <a href="https://wa.me/996555123456" className="flex items-center gap-3 text-white/70 hover:text-[#00A896] transition-colors text-sm font-m3-body">
                  <span>&#128172;</span> WhatsApp
                </a>
                <a href="https://t.me/alykul_bot" className="flex items-center gap-3 text-white/70 hover:text-[#00A896] transition-colors text-sm font-m3-body">
                  <span>&#129302;</span> Telegram @alykul_bot
                </a>
                <p className="flex items-center gap-3 text-white/40 text-sm font-m3-body">
                  <span>&#128205;</span> {t.map.sub}
                </p>
              </div>
            </div>
          </ScrollReveal>
          {/* Right: Map */}
          <ScrollReveal>
            <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23918.78!2d77.0685!3d42.6461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c5e2e27a3b%3A0x6f2a7c29d3f4d8a1!2z0KfQvtC70L_QvtC9LdCQ0YLQsA!5e0!3m2!1sru!2skg!4v1"
                className="w-full h-full min-h-[400px] border-0"
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ FOOTER — Dark navy, Pirate Lines style ═══════════════ */
function M3Footer({ t, lang }: { t: Tr; lang: string }) {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#0A1628] pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 pb-12 border-b border-white/10">
          {/* Logo + desc */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
                <circle cx="24" cy="24" r="22" stroke="#00A896" strokeWidth="1" opacity="0.5" />
                <path d="M16 32Q20 24 24 12Q28 24 32 32" stroke="#00A896" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M14 34Q19 30 24 32Q29 34 34 30" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
              <span className="text-white font-m3-display text-xl tracking-[2px]">ALYKUL</span>
            </div>
            <p className="text-white/50 text-sm font-m3-body max-w-[280px] leading-relaxed">
              {t.foot.desc}
            </p>
            {/* Newsletter */}
            <div className="mt-4">
              <label className="text-white/40 text-[9px] tracking-[2px] uppercase font-m3-body mb-2 block">{t.foot.newsletter}</label>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="flex-1 bg-white/5 border border-white/10 px-4 py-2.5 text-white text-sm font-m3-body outline-none focus:border-[#00A896]/40 rounded-l-lg"
                />
                <button className="bg-[#00A896] hover:bg-[#008F80] text-white px-4 py-2.5 text-sm font-m3-body font-semibold transition-colors rounded-r-lg">
                  OK
                </button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-col gap-3">
            <h4 className="uppercase text-[10px] font-semibold text-white/40 tracking-[2px] font-m3-body mb-1">{t.foot.trips}</h4>
            <a href={`/${lang}/trips`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{t.foot.cruises}</a>
            <a href={`/${lang}/trips`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{t.foot.charters}</a>
            <a href={`/${lang}/trips`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{t.foot.speed}</a>
            <a href={`/${lang}/trips`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{t.foot.kids}</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="uppercase text-[10px] font-semibold text-white/40 tracking-[2px] font-m3-body mb-1">{t.foot.scheduleLabel}</h4>
            <a href="#m3-schedule" className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{t.nav.schedule}</a>
            <a href="#m3-fleet" className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{t.nav.fleet}</a>
            <a href="#m3-reviews" className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{t.nav.reviews}</a>
            <a href={`/${lang}/about`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{t.foot.about || 'О компании'}</a>
            <a href={`/${lang}/gifts`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{t.foot.gifts || 'Подарки'}</a>
            <a href={`/${lang}/group-booking`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{t.foot.groups || 'Группы'}</a>
            <a href={`/${lang}/privacy`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{t.foot.privacy || 'Конфиденциальность'}</a>
            <a href={`/${lang}/faq`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">FAQ</a>
            <a href={`/${lang}/contact`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{lang === 'ru' ? 'Контакты' : lang === 'ky' ? 'Байланыштар' : 'Contact'}</a>
            <a href={`/${lang}/blog`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{lang === 'ru' ? 'Блог' : 'Blog'}</a>
            <a href={`/${lang}/terms`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{lang === 'ru' ? 'Условия' : lang === 'ky' ? 'Шарттар' : 'Terms'}</a>
            <a href={`/${lang}/partners`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{lang === 'ru' ? 'Партнёрам' : lang === 'ky' ? 'Өнөктөштөргө' : 'Partners'}</a>
            <a href={`/${lang}/careers`} className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">{lang === 'ru' ? 'Карьера' : lang === 'ky' ? 'Карьера' : 'Careers'}</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="uppercase text-[10px] font-semibold text-white/40 tracking-[2px] font-m3-body mb-1">{t.foot.contact}</h4>
            <a href="tel:+996555123456" className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">+996 555 123 456</a>
            <a href="mailto:info@alykul.kg" className="text-white/60 text-sm hover:text-[#00A896] transition-colors font-m3-body">info@alykul.kg</a>
            <span className="text-white/60 text-sm font-m3-body">{t.foot.address}</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-white/30 text-xs font-m3-body">&copy;{year} Alykul. {t.foot.rights}</p>
          <div className="flex items-center gap-6">
            <span className="text-white/30 text-[10px] tracking-[3px] uppercase font-m3-body">{t.foot.followUs}</span>
            {[
              { href: 'https://instagram.com', label: 'IG', icon: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 011.772 1.153 4.9 4.9 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.9 4.9 0 01-1.153 1.772 4.9 4.9 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.9 4.9 0 01-1.772-1.153 4.9 4.9 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.9 4.9 0 011.153-1.772A4.9 4.9 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z' },
              { href: 'https://t.me', label: 'TG', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.28-.02-.12.03-2.07 1.32-5.84 3.87-.55.38-1.05.56-1.5.55-.49-.01-1.44-.28-2.15-.51-.87-.28-1.56-.44-1.5-.92.03-.25.38-.51 1.05-.78 4.12-1.79 6.87-2.97 8.26-3.54 3.93-1.62 4.75-1.9 5.28-1.91.12 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .37z' },
              { href: 'https://wa.me/996555123456', label: 'WA', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00A896] hover:border-[#00A896]/30 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
              </a>
            ))}
            {/* Telegram Bot */}
            <a href="https://t.me/alykul_bot" target="_blank" rel="noopener noreferrer" aria-label="Telegram Bot @alykul_bot"
              className="flex items-center gap-1.5 text-white/40 hover:text-[#00A896] text-xs font-m3-body transition-colors border border-white/10 hover:border-[#00A896]/30 rounded-full px-3 py-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.28-.02-.12.03-2.07 1.32-5.84 3.87-.55.38-1.05.56-1.5.55-.49-.01-1.44-.28-2.15-.51-.87-.28-1.56-.44-1.5-.92.03-.25.38-.51 1.05-.78 4.12-1.79 6.87-2.97 8.26-3.54 3.93-1.62 4.75-1.9 5.28-1.91.12 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .37z" /></svg>
              @alykul_bot
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════ AI CHAT WIDGET (disabled — global AiChatWidget used instead) ═══════════════ */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function M3AiChat() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Zdravstvuyte! I am the Alykul AI assistant. How can I help?' },
  ]);

  const send = () => {
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    const q = msg;
    setMsg('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: getAiReply(q) }]);
    }, 800);
  };

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[10002] w-14 h-14 rounded-full bg-[#00A896] shadow-2xl shadow-[#00A896]/30 flex items-center justify-center text-white hover:scale-110 transition-transform"
          aria-label="AiChat">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path d="M12 3C6.5 3 2 6.58 2 11c0 2.13 1.02 4.05 2.67 5.47L3.5 21l4.6-2.26C9.3 19.24 10.62 19.5 12 19.5c5.5 0 10-3.58 10-8S17.5 3 12 3Z" fill="currentColor" opacity="0.2"/>
            <path d="M12 3C6.5 3 2 6.58 2 11c0 2.13 1.02 4.05 2.67 5.47L3.5 21l4.6-2.26C9.3 19.24 10.62 19.5 12 19.5c5.5 0 10-3.58 10-8S17.5 3 12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="8" cy="11" r="1" fill="currentColor"/><circle cx="12" cy="11" r="1" fill="currentColor"/><circle cx="16" cy="11" r="1" fill="currentColor"/>
          </svg>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-[10002] w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-black/[0.06] flex flex-col overflow-hidden" style={{ height: '500px', maxHeight: 'calc(100vh - 10rem)' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/[0.06] bg-[#0A1628] text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#00A896]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#00A896]" fill="currentColor" viewBox="0 0 24 24"><path d="M6 24c11.4-0 18-6.6 18-18C24 17.4 17.4 24 6 24ZM18 0C6.6 0 0 6.6 0 18 0 6.6 6.6 0 18 0Z"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold font-m3-body">AiChat</div>
                <div className="text-[10px] text-white/50 font-m3-body">Alykul AI Assistant</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white text-xl">&times;</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-m3-body">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  m.role === 'user' ? 'bg-[#00A896] text-white rounded-br-sm' : 'bg-[#f7f8fa] text-[#0A1628] rounded-bl-sm'
                }`}>{m.text}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-black/[0.06] p-3 flex gap-2">
            <input
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything..."
              className="flex-1 bg-[#f7f8fa] border border-black/[0.06] rounded-lg px-3 py-2 text-sm text-[#0A1628] outline-none focus:border-[#00A896]/30 font-m3-body"
            />
            <button onClick={send} className="w-9 h-9 rounded-lg bg-[#00A896] text-white flex items-center justify-center hover:bg-[#008F80] transition-colors flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function getAiReply(q: string): string {
  const ql = q.toLowerCase();
  if (ql.includes('цен') || ql.includes('стоим') || ql.includes('price')) return 'Sunset cruise from $16 (1,400 KGS), speed tour from $23 (2,000 KGS), private charter from $80 (7,000 KGS). See the Routes section!';
  if (ql.includes('брон') || ql.includes('book')) return 'Click "Book Now" on any route to be redirected to WhatsApp for confirmation.';
  if (ql.includes('расписан') || ql.includes('schedule') || ql.includes('время')) return 'Season: June 1 - September 15. Sunset cruise 18:00, morning 10:00, speed tours 12:00, 14:00, 16:00.';
  if (ql.includes('флот') || ql.includes('яхт') || ql.includes('fleet') || ql.includes('судн')) return 'We have 8 vessels: steamship Alykul (up to 200 pax), yacht Nomad (up to 12 pax VIP), speedboats (up to 60 km/h).';
  if (ql.includes('дет') || ql.includes('kids') || ql.includes('ребён')) return 'Kids parties on the steamship from $12/person (1,000 KGS). Animators, food, safety. Available on weekends.';
  if (ql.includes('безопас') || ql.includes('safety')) return 'All vessels have life jackets. Captains are certified. Insurance included.';
  return 'Thank you for your question! Contact us via WhatsApp: +996 555 123 456 or choose a route on the website.';
}

/* ═══════════════ TRANSLATIONS ═══════════════ */
type Tr = ReturnType<typeof getTrans>;

function getTrans(lang: string) {
  const ru = lang === 'ru';
  const ky = lang === 'ky';
  return {
    nav: {
      about: ru ? 'О нас' : ky ? 'Биз жонундо' : 'About',
      fleet: ru ? 'Флот' : ky ? 'Флот' : 'Fleet',
      routes: ru ? 'Маршруты' : ky ? 'Маршруттар' : 'Routes',
      schedule: ru ? 'Расписание' : ky ? 'Каттам' : 'Schedule',
      reviews: ru ? 'Отзывы' : ky ? 'Пикирлер' : 'Reviews',
      booking: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book Now',
      contacts: ru ? 'Контакты' : ky ? 'Байланыштар' : 'Contacts',
    },
    hero: {
      line1: ru ? 'Лучший отдых.' : ky ? 'Эн жакшы эс алуу.' : 'The finest escape.',
      line2: ru ? 'Ежегодные круизы' : ky ? 'Жыл сайын круиздер' : 'Annual cruises',
      line3: ru ? 'на элитных яхтах' : ky ? 'элиталык яхталарда' : 'on elite yachts',
      line4: ru ? 'на Иссык-Куле' : ky ? 'Ысык-Колдо' : 'on Issyk-Kul',
      cta: ru ? 'Забронировать круиз' : ky ? 'Круиз брондоо' : 'Book a cruise',
      location: ru ? 'Чолпон-Ата, Кыргызстан' : ky ? 'Чолпон-Ата, Кыргызстан' : 'Cholpon-Ata, Kyrgyzstan',
      season: ru ? '1 июня — 15 сентября' : ky ? '1 июнь — 15 сентябрь' : 'June 1 — September 15',
    },
    diagonal: {
      title: ru ? 'Лучший водный\nотдых в жизни' : ky ? 'Омурундогу эн жакшы\nсуу эс алуу' : 'The best water\nvacation of your life',
      desc: ru ? 'От закатных круизов до скоростных туров — откройте для себя магию горного озера Иссык-Куль на высоте 1607 метров. Чистейшая вода, величественные горы и незабываемые впечатления.' : ky ? 'Кун батыш круиздеринен тездик турларга чейин — Ысык-Колдун сыйкырын ачыныз.' : 'From sunset cruises to speed tours — discover the magic of mountain lake Issyk-Kul at 1607m altitude. Crystal-clear water, majestic mountains, unforgettable experiences.',
    },
    bento: {
      title: ru ? 'Наши туры включают все:' : ky ? 'Биздин турлар бардыгын камтыйт:' : 'Our tours take care of it all:',
      items: [
        { img: '/images/hero.jpg', icon: '\u2693', title: ru ? 'Закатный круиз' : ky ? 'Кун батыш круизи' : 'Sunset Cruise' },
        { img: '/images/scene2.jpg', icon: '\ud83d\ude90', title: ru ? 'Трансферы' : ky ? 'Трансферлер' : 'Transfers' },
        { img: '/images/scene10.jpg', icon: '\ud83c\udf7d\ufe0f', title: ru ? 'Банкет на борту' : ky ? 'Бортто банкет' : 'Onboard Banquet' },
        { img: '/images/captain.jpg', icon: '\ud83e\udded', title: ru ? 'Капитан-гид' : ky ? 'Капитан-гид' : 'Captain Guide' },
        { img: '/images/scene6.jpg', icon: '\ud83d\udea4', title: ru ? 'Скоростные катера' : ky ? 'Ылдам катерлер' : 'Speedboats' },
      ],
    },
    textCta: {
      desc: ru ? 'Алыкул — первый оператор цифрового бронирования водного транспорта на озере Иссык-Куль. Мы объединяем проверенный флот из 8 судов, опытных капитанов с многолетним стажем и современные технологии, чтобы каждый гость получил незабываемый опыт на высочайшем горном озере мира.' : ky ? 'Алыкул — Ысык-Колдогу суу транспортун санариптик брондоонун биринчи оператору. Биз сыналган флотту, тажрыйбалуу капитандарды жана заманбап технологияларды бириктиребиз.' : 'Alykul is the first digital water transport booking operator on Lake Issyk-Kul. We combine a certified fleet of 8 vessels, experienced captains with years of expertise, and modern technology to give every guest an unforgettable experience on the world\'s highest mountain lake.',
      btn: ru ? 'ЗАБРОНИРОВАТЬ' : ky ? 'БРОНДОО' : 'BOOK A TRIP',
    },
    catalog: {
      badge: ru ? 'Маршруты и цены' : ky ? 'Маршруттар жана баалар' : 'Routes & Prices',
      title: ru ? 'МАРШРУТЫ И ЦЕНЫ' : ky ? 'МАРШРУТТАР ЖАНА БААЛАР' : 'ROUTES & PRICES',
      book: ru ? 'ЗАБРОНИРОВАТЬ' : ky ? 'БРОНДОО' : 'BOOK NOW',
      tabs: ru ? ['Круизы', 'Чартеры', 'Скоростные', 'Детские'] : ky ? ['Круиздер', 'Чартерлер', 'Ылдам', 'Балдар'] : ['Cruises', 'Charters', 'Speed', 'Kids'],
      tabItems: [
        /* Cruises */
        [
          { img: '/images/q02.jpg', title: ru ? 'Закатный круиз' : ky ? 'Кун батыш круизи' : 'Sunset Cruise', price: ru ? '1 400 KGS (~$16)' : ky ? '1 400 KGS (~$16)' : '$16 (1,400 KGS)' },
          { img: '/images/scene7.jpg', title: ru ? 'Утренний круиз' : ky ? 'Эртенки круиз' : 'Morning Cruise', price: ru ? '1 200 KGS (~$14)' : ky ? '1 200 KGS (~$14)' : '$14 (1,200 KGS)' },
          { img: '/images/alykul1.jpg', title: ru ? 'Дневной круиз' : ky ? 'Кундузгу круиз' : 'Day Cruise', price: ru ? '1 600 KGS (~$18)' : ky ? '1 600 KGS (~$18)' : '$18 (1,600 KGS)' },
          { img: '/images/cruise.jpg', title: ru ? 'Ночной круиз' : ky ? 'Тунку круиз' : 'Night Cruise', price: ru ? '2 500 KGS (~$29)' : ky ? '2 500 KGS (~$29)' : '$29 (2,500 KGS)' },
        ],
        /* Charters */
        [
          { img: '/images/ep03.jpg', title: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter', price: ru ? '7 000 KGS (~$80)' : ky ? '7 000 KGS (~$80)' : '$80 (7,000 KGS)' },
          { img: '/images/scene11.jpg', title: ru ? 'Романтик-чартер' : ky ? 'Романтик чартер' : 'Romantic Charter', price: ru ? '9 000 KGS (~$103)' : ky ? '9 000 KGS (~$103)' : '$103 (9,000 KGS)' },
          { img: '/images/scene12.jpg', title: ru ? 'Корпоративный' : ky ? 'Корпоративдик' : 'Corporate', price: ru ? '15 000 KGS (~$172)' : ky ? '15 000 KGS (~$172)' : '$172 (15,000 KGS)' },
          { img: '/images/alykul2.jpg', title: ru ? 'Свадебный' : ky ? 'Той' : 'Wedding', price: ru ? '25 000 KGS (~$287)' : ky ? '25 000 KGS (~$287)' : '$287 (25,000 KGS)' },
        ],
        /* Speed */
        [
          { img: '/images/scene6.jpg', title: ru ? 'Скоростной тур' : ky ? 'Ылдам тур' : 'Speed Tour', price: ru ? '2 000 KGS (~$23)' : ky ? '2 000 KGS (~$23)' : '$23 (2,000 KGS)' },
          { img: '/images/scene3.jpg', title: ru ? 'Вейкборд' : ky ? 'Вейкборд' : 'Wakeboard', price: ru ? '2 500 KGS (~$29)' : ky ? '2 500 KGS (~$29)' : '$29 (2,500 KGS)' },
          { img: '/images/scene5.jpg', title: ru ? 'Водные лыжи' : ky ? 'Суу лыжалары' : 'Water Skiing', price: ru ? '2 500 KGS (~$29)' : ky ? '2 500 KGS (~$29)' : '$29 (2,500 KGS)' },
          { img: '/images/scene9.jpg', title: ru ? 'Рыбалка' : ky ? 'Балык уулоо' : 'Fishing', price: ru ? '3 000 KGS (~$34)' : ky ? '3 000 KGS (~$34)' : '$34 (3,000 KGS)' },
        ],
        /* Kids */
        [
          { img: '/images/kids.jpg', title: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : 'Kids Party', price: ru ? '1 000 KGS (~$12)' : ky ? '1 000 KGS (~$12)' : '$12 (1,000 KGS)' },
          { img: '/images/scene1.jpg', title: ru ? 'Школьная экскурсия' : ky ? 'Мектеп экскурсиясы' : 'School Trip', price: ru ? '800 KGS (~$9)' : ky ? '800 KGS (~$9)' : '$9 (800 KGS)' },
          { img: '/images/scene4.jpg', title: ru ? 'Семейный круиз' : ky ? 'Уй-булолук круиз' : 'Family Cruise', price: ru ? '1 200 KGS (~$14)' : ky ? '1 200 KGS (~$14)' : '$14 (1,200 KGS)' },
          { img: '/images/scene8.jpg', title: ru ? 'День рождения' : ky ? 'Туулган кун' : 'Birthday', price: ru ? '1 500 KGS (~$17)' : ky ? '1 500 KGS (~$17)' : '$17 (1,500 KGS)' },
        ],
      ],
    },
    schedule: {
      badge: ru ? 'Расписание' : ky ? 'Каттам' : 'Schedule',
      title: ru ? 'Расписание рейсов' : ky ? 'Рейстердин расписаниеси' : 'Trip Schedule',
      sub: ru ? 'Сезон: 1 июня — 15 сентября, ежедневно' : ky ? 'Сезон: 1 июнь — 15 сентябрь' : 'Season: June 1 — September 15, daily',
      col_route: ru ? 'Маршрут' : ky ? 'Маршрут' : 'Route',
      col_time: ru ? 'Время' : ky ? 'Убакыт' : 'Time',
      col_duration: ru ? 'Длительность' : ky ? 'Узактыгы' : 'Duration',
      col_price: ru ? 'Цена' : ky ? 'Баасы' : 'Price',
      rows: [
        { route: ru ? 'Закатный круиз' : ky ? 'Кун батыш круизи' : 'Sunset Cruise', time: '18:00', duration: ru ? '2 часа' : ky ? '2 саат' : '2 hours', price: ru ? '1 400 KGS (~$16)' : ky ? '1 400 KGS (~$16)' : '$16 (1,400 KGS)' },
        { route: ru ? 'Утренний круиз' : ky ? 'Эртенки круиз' : 'Morning Cruise', time: '10:00', duration: ru ? '1.5 часа' : ky ? '1.5 саат' : '1.5 hours', price: ru ? '1 200 KGS (~$14)' : ky ? '1 200 KGS (~$14)' : '$14 (1,200 KGS)' },
        { route: ru ? 'Скоростной тур' : ky ? 'Ылдам тур' : 'Speed Tour', time: '12:00, 14:00, 16:00', duration: ru ? '45 мин' : ky ? '45 мун' : '45 min', price: ru ? '2 000 KGS (~$23)' : ky ? '2 000 KGS (~$23)' : '$23 (2,000 KGS)' },
        { route: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter', time: ru ? 'По запросу' : ky ? 'Суроо боюнча' : 'On request', duration: ru ? '3-6 часов' : ky ? '3-6 саат' : '3-6 hours', price: ru ? 'от 7 000 KGS (~$80)' : ky ? '7 000 KGS (~$80) ден' : 'from $80 (7,000 KGS)' },
        { route: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : "Kids' Party", time: ru ? 'Сб-Вс 11:00' : ky ? 'Иш-Жек 11:00' : 'Sat-Sun 11:00', duration: ru ? '2 часа' : ky ? '2 саат' : '2 hours', price: ru ? '1 000 KGS/чел (~$12)' : ky ? '1 000 KGS/адам (~$12)' : '$12/person (1,000 KGS)' },
      ],
    },
    reviews: {
      badge: ru ? 'Отзывы' : ky ? 'Пикирлер' : 'Testimonials',
      title: ru ? 'Отзывы гостей' : ky ? 'Конок пикирлери' : 'Guest Reviews',
      sub: ru ? '12 000+ довольных гостей за 5 лет' : ky ? '5 жылда 12 000+ ыраазы конок' : '12,000+ happy guests over 5 years',
    },
    faq: {
      title: ru ? 'Частые вопросы' : ky ? 'Коп берилуучу суроолор' : 'FAQ',
      items: [
        { q: ru ? 'Как забронировать круиз?' : ky ? 'Круизди кантип брондойм?' : 'How to book a cruise?', a: ru ? 'Выберите маршрут на сайте, укажите дату и количество гостей. Бронирование через WhatsApp занимает 2 минуты. Оплата на месте или онлайн.' : ky ? 'Сайттан маршрутту танданыз, датаны жана коноктордун санын коргозунуз.' : 'Choose a route, select date and guests. WhatsApp booking takes 2 minutes. Pay on-site or online.' },
        { q: ru ? 'Какие документы нужны для посадки?' : ky ? 'Кайсы документтер керек?' : 'What documents are needed?', a: ru ? 'Только удостоверение личности. Для детей до 14 лет — свидетельство о рождении. Иностранным гражданам — паспорт.' : ky ? 'Жеке кулуктук гана. 14 жашка чейинки балдарга — тууган кунукук.' : 'Only ID. Children under 14 — birth certificate. Foreign citizens — passport.' },
        { q: ru ? 'Можно ли отменить бронирование?' : ky ? 'Брондоону жокко чыгарса болобу?' : 'Can I cancel a booking?', a: ru ? 'Да, бесплатная отмена за 24 часа до отправления. При отмене менее чем за 24 часа — удерживается 20% стоимости.' : ky ? 'Ооба, жонотуудон 24 саат мурун акысыз жокко чыгаруу.' : 'Yes, free cancellation 24h before departure. Less than 24h — 20% fee.' },
        { q: ru ? 'Есть ли спасательное оборудование?' : ky ? 'Куткаруу жабдыктары барбы?' : 'Is there safety equipment?', a: ru ? 'Все суда оснащены спасательными жилетами, кругами и аптечкой. Капитаны сертифицированы и проходят ежегодную аттестацию.' : ky ? 'Бардык кемелерде куткаруу жилеттери, шакектери жана биринчи жардам бар.' : 'All vessels have life jackets, rings and first aid. Captains are certified annually.' },
        { q: ru ? 'Работаете ли вы в плохую погоду?' : ky ? 'Жаман аба ырайында иштейсизби?' : 'Do you operate in bad weather?', a: ru ? 'Безопасность — приоритет. При штормовом предупреждении рейсы переносятся. Мы уведомляем за 2 часа до отправления.' : ky ? 'Коопсуздук — биринчи орунда. Бороон эскертуусундо рейстер которулот.' : 'Safety first. Cruises reschedule in storms. We notify 2 hours before departure.' },
      ],
    },
    map: {
      title: ru ? 'Как нас найти' : ky ? 'Бизди кантип табасыз' : 'Find Us',
      sub: ru ? 'Причал в Чолпон-Ате, северный берег озера Иссык-Куль' : ky ? 'Чолпон-Атадагы причал' : 'Pier in Cholpon-Ata, northern shore of Lake Issyk-Kul',
    },
    contact: {
      title: ru ? 'Свяжитесь с нами' : ky ? 'Биз менен байланышыңыз' : 'Contact Us',
      name: ru ? 'Ваше имя' : ky ? 'Атыңыз' : 'Your name',
      phone: ru ? 'Телефон' : 'Phone',
      message: ru ? 'Сообщение' : ky ? 'Билдирүү' : 'Message',
      send: ru ? 'Отправить' : ky ? 'Жөнөтүү' : 'Send',
      sent: ru ? 'Спасибо! Мы свяжемся с вами.' : ky ? 'Рахмат! Сиз менен байланышабыз.' : 'Thank you! We will contact you.',
    },
    booking: {
      pier: ru ? 'Причал' : ky ? 'Причал' : 'Pier',
      date: ru ? 'Дата' : ky ? 'Дата' : 'Date',
      guests: ru ? 'Гости' : ky ? 'Коноктор' : 'Guests',
      guestLabel: ru ? 'чел.' : ky ? 'адам' : 'pax',
      search: ru ? 'Найти рейс' : ky ? 'Рейс табуу' : 'Find Trip',
      piers: {
        cholpon: ru ? 'Чолпон-Ата' : ky ? 'Чолпон-Ата' : 'Cholpon-Ata',
        bosteri: ru ? 'Бостери' : ky ? 'Бостери' : 'Bosteri',
        tamga: ru ? 'Тамга' : ky ? 'Тамга' : 'Tamga',
      },
    },
    foot: {
      desc: ru ? 'Первая платформа онлайн-бронирования водного транспорта на озере Иссык-Куль. Круизы, чартеры, скоростные туры с 2019 года.' : ky ? 'Ысык-Колдогу суу транспортун онлайн брондоонун биринчи платформасы.' : 'First online water transport booking platform on Lake Issyk-Kul. Cruises, charters, speed tours since 2019.',
      newsletter: ru ? 'Подпишитесь на новости' : ky ? 'Жанылыктарга жазылыныз' : 'Subscribe to newsletter',
      trips: ru ? 'Маршруты' : ky ? 'Маршруттар' : 'Trips',
      cruises: ru ? 'Круизы' : ky ? 'Круиздер' : 'Cruises',
      charters: ru ? 'Чартеры' : ky ? 'Чартерлер' : 'Charters',
      speed: ru ? 'Скоростные туры' : ky ? 'Ылдам турлар' : 'Speed Tours',
      kids: ru ? 'Детские' : ky ? 'Балдар' : 'Kids',
      scheduleLabel: ru ? 'Информация' : ky ? 'Маалымат' : 'Information',
      contact: ru ? 'Контакты' : ky ? 'Байланыштар' : 'Contact',
      rights: ru ? 'Все права защищены.' : ky ? 'Бардык укуктар корголгон.' : 'All rights reserved.',
      followUs: ru ? 'Мы в соцсетях' : ky ? 'Соц тармактарда' : 'Follow us',
      address: ru ? 'Чолпон-Ата, Иссык-Куль' : ky ? 'Чолпон-Ата, Ысык-Көл' : 'Cholpon-Ata, Issyk-Kul',
      about: ru ? 'О компании' : ky ? 'Биз жөнүндө' : 'About',
      gifts: ru ? 'Подарки' : ky ? 'Белектер' : 'Gifts',
      groups: ru ? 'Группы' : ky ? 'Топтор' : 'Groups',
      privacy: ru ? 'Конфиденциальность' : ky ? 'Купуялуулук' : 'Privacy',
    },
  };
}
