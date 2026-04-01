'use client';

import { useTheme, THEMES } from '@/lib/theme-context';
import { ScrollReveal } from './M3Animations';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CoastalLuxuryWrapper({ lang }: { lang: string }) {
  const { theme } = useTheme();
  if (theme !== 'M5') return null;

  const t = getTrans(lang);

  return (
    <div className="fixed inset-0 z-[9999] overflow-auto bg-white">
      <AzNav lang={lang} t={t} />
      <AzHero t={t} />
      <AzTagline t={t} />
      <AzFleetShowcase t={t} />
      <AzBooking t={t} lang={lang} />
      <AzCatalog t={t} lang={lang} />
      <AzSchedule t={t} />
      <AzReviews t={t} />
      <AzAbout t={t} />
      <AzFAQ t={t} />
      <AzMap t={t} />
      <AzFooter t={t} lang={lang} />
    </div>
  );
}

/* ═══════════════ NAVBAR — Ultra-minimal transparent ═══════════════ */
function AzNav({ lang, t }: { lang: string; t: Tr }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const el = document.querySelector('.fixed.inset-0.overflow-auto');
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#az-fleet', label: t.nav.fleet },
    { href: '#az-catalog', label: t.nav.routes },
    { href: '#az-schedule', label: t.nav.schedule },
    { href: '#az-about', label: t.nav.contacts },
  ];
  const langLabels: Record<string, string> = { ru: 'RU', en: 'EN', ky: 'KY' };
  const themes = THEMES;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-700 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-xl border-b border-[#0F2B46]/5 py-3'
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo — just text, no icon */}
        <a href="#" className="font-m4-display text-[#0F2B46] text-xl tracking-[3px] font-normal">
          АЛЫКУЛ
        </a>

        {/* Desktop links — very small, light */}
        <div className="hidden lg:flex items-center gap-10">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-[#0F2B46]/50 text-[11px] tracking-[2px] uppercase font-m4-body font-light hover:text-[#0F2B46] transition-colors duration-500"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right: lang + theme switchers — very subtle */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); }}
              className="text-[#0F2B46]/40 text-[10px] tracking-[2px] font-m4-body font-light hover:text-[#0F2B46]/70 transition-colors"
            >
              {langLabels[lang] || 'RU'}
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-3 bg-white border border-[#0F2B46]/5 py-2 min-w-[60px]">
                {Object.entries(langLabels).map(([code, label]) => (
                  <a
                    key={code}
                    href={`/${code}`}
                    className="block px-4 py-1.5 text-[10px] tracking-[2px] text-[#0F2B46]/50 hover:text-[#0F2B46] font-m4-body font-light transition-colors"
                  >
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
              className="text-[#0F2B46]/40 text-[10px] tracking-[2px] font-m4-body font-light hover:text-[#0F2B46]/70 transition-colors"
            >
              M5
            </button>
            {themeOpen && (
              <div className="absolute top-full right-0 mt-3 bg-white border border-[#0F2B46]/5 py-2 min-w-[80px]">
                {themes.map(th => (
                  <button
                    key={th}
                    onClick={() => { setTheme(th); setThemeOpen(false); }}
                    className={`block w-full text-left px-4 py-1.5 text-[10px] tracking-[2px] font-m4-body font-light transition-colors ${
                      theme === th ? 'text-[#C9A356]' : 'text-[#0F2B46]/50 hover:text-[#0F2B46]'
                    }`}
                  >
                    {th}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-[#0F2B46]/50 hover:text-[#0F2B46] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-[#0F2B46]/5 px-6 py-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[#0F2B46]/50 text-[11px] tracking-[2px] uppercase font-m4-body font-light hover:text-[#0F2B46] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ═══════════════ HERO — Fullscreen yacht image ═══════════════ */
function AzHero({ t }: { t: Tr }) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Issyk-Kul"
        fill
        className="object-cover"
        priority
      />
      {/* Very subtle dark gradient — just enough for text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-32 px-6">
        <ScrollReveal>
          <h1 className="font-m4-display text-white text-center text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] font-normal leading-[0.9] tracking-[8px]">
            АЛЫКУЛ
          </h1>
        </ScrollReveal>
        <ScrollReveal>
          <p className="mt-4 text-white/60 font-m4-body font-light text-[12px] sm:text-[14px] tracking-[4px] uppercase">
            {t.hero.line2}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ TAGLINE — One sentence, huge ═══════════════ */
function AzTagline({ t }: { t: Tr }) {
  return (
    <section className="py-32 md:py-48 px-6">
      <div className="max-w-[800px] mx-auto text-center">
        <ScrollReveal>
          {/* Thin gold line above */}
          <div className="w-12 h-px bg-[#C9A356] mx-auto mb-10" />
          <p className="font-m4-display text-[#0F2B46] text-[24px] sm:text-[32px] md:text-[40px] font-normal leading-[1.3] tracking-[1px]">
            {t.tagline}
          </p>
          {/* Thin gold line below */}
          <div className="w-12 h-px bg-[#C9A356] mx-auto mt-10" />
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ FLEET SHOWCASE — Alternating image + text ═══════════════ */
function AzFleetShowcase({ t }: { t: Tr }) {
  return (
    <section id="az-fleet">
      {t.fleet.items.map((vessel, i) => (
        <div
          key={i}
          className={`py-20 md:py-32 px-6 ${i % 2 === 1 ? 'bg-[#F8F9FA]' : 'bg-white'}`}
        >
          <div className={`max-w-[1200px] mx-auto flex flex-col ${
            i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          } items-center gap-12 md:gap-20`}>
            {/* Image — 60-70% width */}
            <ScrollReveal className="w-full md:w-[65%]">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={vessel.img}
                  alt={vessel.name}
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>

            {/* Text — minimal */}
            <ScrollReveal className="w-full md:w-[35%]">
              <div className="w-8 h-px bg-[#C9A356] mb-6" />
              <h3 className="font-m4-display text-[#0F2B46] text-[28px] sm:text-[36px] font-normal leading-[1.2] mb-4">
                {vessel.name}
              </h3>
              <p className="font-m4-body text-[#0F2B46]/60 text-[15px] font-light leading-[1.8] mb-6">
                {vessel.desc}
              </p>
              {/* Minimal specs list */}
              <div className="space-y-2">
                {vessel.specs.map((s, j) => (
                  <p key={j} className="font-m4-body text-[#0F2B46]/40 text-[13px] font-light tracking-[1px]">
                    {s}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ═══════════════ BOOKING — Clean, airy, gold accent ═══════════════ */
function AzBooking({ t, lang }: { t: Tr; lang: string }) {
  return (
    <section className="py-32 md:py-48 px-6 bg-[#F8F9FA]">
      <div className="max-w-[700px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="w-8 h-px bg-[#C9A356] mx-auto mb-8" />
            <h2 className="font-m4-display text-[#0F2B46] text-[28px] sm:text-[36px] font-normal tracking-[2px]">
              {t.booking.search}
            </h2>
          </div>

          <div className="space-y-6">
            {/* Pier */}
            <div>
              <label className="block font-m4-body text-[#0F2B46]/40 text-[10px] tracking-[2px] uppercase mb-2">
                {t.booking.pier}
              </label>
              <select className="w-full bg-transparent border-b border-[#0F2B46]/10 py-3 font-m4-body text-[#0F2B46] text-[15px] font-light focus:border-[#C9A356] outline-none transition-colors appearance-none">
                {t.booking.piers.map(p => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block font-m4-body text-[#0F2B46]/40 text-[10px] tracking-[2px] uppercase mb-2">
                {t.booking.date}
              </label>
              <input
                type="date"
                className="w-full bg-transparent border-b border-[#0F2B46]/10 py-3 font-m4-body text-[#0F2B46] text-[15px] font-light focus:border-[#C9A356] outline-none transition-colors"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block font-m4-body text-[#0F2B46]/40 text-[10px] tracking-[2px] uppercase mb-2">
                {t.booking.guests}
              </label>
              <input
                type="number"
                min={1}
                max={200}
                defaultValue={2}
                className="w-full bg-transparent border-b border-[#0F2B46]/10 py-3 font-m4-body text-[#0F2B46] text-[15px] font-light focus:border-[#C9A356] outline-none transition-colors"
              />
            </div>

            {/* CTA — gold accent, understated */}
            <div className="pt-6">
              <a
                href={`/${lang}/trips`}
                className="block w-full text-center py-4 bg-[#C9A356] text-white font-m4-body text-[12px] tracking-[3px] uppercase font-light hover:bg-[#B8934A] transition-colors duration-500"
              >
                {t.booking.search}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ CATALOG — Minimal list, not cards ═══════════════ */
function AzCatalog({ t, lang }: { t: Tr; lang: string }) {
  return (
    <section id="az-catalog" className="py-32 md:py-48 px-6">
      <div className="max-w-[1000px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-8 h-px bg-[#C9A356] mx-auto mb-8" />
            <h2 className="font-m4-display text-[#0F2B46] text-[28px] sm:text-[36px] font-normal tracking-[2px]">
              {t.catalog.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-0">
          {t.catalog.items.map((item, i) => (
            <ScrollReveal key={i}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-8 border-b border-[#0F2B46]/5 group">
                <div className="flex items-center gap-6 mb-3 sm:mb-0">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden flex-shrink-0">
                    <Image src={item.img} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-m4-display text-[#0F2B46] text-[18px] sm:text-[22px] font-normal">
                      {item.name}
                    </h4>
                    <p className="font-m4-body text-[#0F2B46]/30 text-[11px] tracking-[1px] uppercase mt-1">
                      {item.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8 pl-[88px] sm:pl-0">
                  <span className="font-m4-body text-[#0F2B46]/60 text-[15px] font-light">
                    {item.price}
                  </span>
                  <a
                    href={`/${lang}/trips`}
                    className="text-[#C9A356] font-m4-body text-[11px] tracking-[2px] uppercase font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block"
                  >
                    {t.catalog.bookBtn}
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

/* ═══════════════ SCHEDULE — Clean minimal table ═══════════════ */
function AzSchedule({ t }: { t: Tr }) {
  return (
    <section id="az-schedule" className="py-32 md:py-48 px-6 bg-[#F8F9FA]">
      <div className="max-w-[1000px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-8 h-px bg-[#C9A356] mx-auto mb-8" />
            <h2 className="font-m4-display text-[#0F2B46] text-[28px] sm:text-[36px] font-normal tracking-[2px]">
              {t.schedule.title}
            </h2>
          </div>
        </ScrollReveal>

        {/* Desktop table */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-4 pb-4 border-b border-[#0F2B46]/10 mb-6">
            <span className="font-m4-body text-[#0F2B46]/30 text-[10px] tracking-[2px] uppercase">{t.schedule.colRoute}</span>
            <span className="font-m4-body text-[#0F2B46]/30 text-[10px] tracking-[2px] uppercase">{t.schedule.colTime}</span>
            <span className="font-m4-body text-[#0F2B46]/30 text-[10px] tracking-[2px] uppercase">{t.schedule.colDuration}</span>
            <span className="font-m4-body text-[#0F2B46]/30 text-[10px] tracking-[2px] uppercase">{t.schedule.colFreq}</span>
            <span className="font-m4-body text-[#0F2B46]/30 text-[10px] tracking-[2px] uppercase text-right">{t.schedule.colPrice}</span>
          </div>
          {t.schedule.rows.map((row, i) => (
            <ScrollReveal key={i}>
              <div className="grid grid-cols-5 gap-4 py-5 border-b border-[#0F2B46]/5 items-center">
                <span className="font-m4-body text-[#0F2B46] text-[15px] font-light">{row.route}</span>
                <span className="font-m4-body text-[#0F2B46]/60 text-[14px] font-light">{row.time}</span>
                <span className="font-m4-body text-[#0F2B46]/60 text-[14px] font-light">{row.duration}</span>
                <span className="font-m4-body text-[#0F2B46]/40 text-[13px] font-light">{row.freq}</span>
                <span className="font-m4-body text-[#0F2B46] text-[15px] font-light text-right">{row.price}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile list */}
        <div className="md:hidden space-y-8">
          {t.schedule.rows.map((row, i) => (
            <ScrollReveal key={i}>
              <div className="pb-6 border-b border-[#0F2B46]/5">
                <h4 className="font-m4-body text-[#0F2B46] text-[16px] font-normal mb-3">{row.route}</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-m4-body text-[#0F2B46]/40 text-[13px] font-light">{row.time} &middot; {row.duration}</p>
                    <p className="font-m4-body text-[#0F2B46]/30 text-[12px] font-light">{row.freq}</p>
                  </div>
                  <span className="font-m4-body text-[#0F2B46] text-[15px] font-light">{row.price}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ REVIEWS — One large quote at a time ═══════════════ */
function AzReviews({ t }: { t: Tr }) {
  const [idx, setIdx] = useState(0);
  const reviews = t.reviewsList;

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % reviews.length), 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section className="py-32 md:py-48 px-6">
      <div className="max-w-[800px] mx-auto text-center">
        <ScrollReveal>
          <div className="w-8 h-px bg-[#C9A356] mx-auto mb-16" />

          {/* Big quotation marks */}
          <div className="text-[#C9A356]/20 font-m4-display text-[80px] leading-none mb-4">&ldquo;</div>

          {/* Quote text */}
          <p className="font-m4-display text-[#0F2B46] text-[20px] sm:text-[24px] md:text-[28px] font-normal leading-[1.5] italic min-h-[100px] transition-opacity duration-700">
            {reviews[idx].text}
          </p>

          {/* Author — small, subtle */}
          <div className="mt-10">
            <p className="font-m4-body text-[#0F2B46]/40 text-[12px] tracking-[2px] uppercase font-light">
              {reviews[idx].name}
            </p>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  i === idx ? 'bg-[#C9A356] w-6' : 'bg-[#0F2B46]/10'
                }`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ ABOUT — Split layout ═══════════════ */
function AzAbout({ t }: { t: Tr }) {
  return (
    <section id="az-about" className="py-32 md:py-48 px-6 bg-[#F8F9FA]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        <ScrollReveal className="w-full md:w-1/2">
          <div className="relative aspect-[4/5] w-full max-w-[500px] overflow-hidden">
            <Image src="/images/captain.jpg" alt="Captain" fill className="object-cover" />
          </div>
        </ScrollReveal>

        <ScrollReveal className="w-full md:w-1/2">
          <div className="w-8 h-px bg-[#C9A356] mb-8" />
          <h2 className="font-m4-display text-[#0F2B46] text-[28px] sm:text-[36px] font-normal leading-[1.2] mb-6">
            {t.about.title}
          </h2>
          <p className="font-m4-body text-[#0F2B46]/60 text-[15px] font-light leading-[1.8]">
            {t.about.intro}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ FAQ — Clean accordion ═══════════════ */
function AzFAQ({ t }: { t: Tr }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-32 md:py-48 px-6">
      <div className="max-w-[700px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-8 h-px bg-[#C9A356] mx-auto mb-8" />
            <h2 className="font-m4-display text-[#0F2B46] text-[28px] sm:text-[36px] font-normal tracking-[2px]">
              {t.faq.title}
            </h2>
          </div>
        </ScrollReveal>

        <div>
          {t.faq.items.map((item, i) => (
            <ScrollReveal key={i}>
              <div className="border-b border-[#0F2B46]/5">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="font-m4-body text-[#0F2B46] text-[15px] font-light pr-8">
                    {item.q}
                  </span>
                  <span className={`text-[#C9A356] text-[18px] font-light transition-transform duration-500 flex-shrink-0 ${
                    openIdx === i ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${
                  openIdx === i ? 'max-h-[300px] pb-6' : 'max-h-0'
                }`}>
                  <p className="font-m4-body text-[#0F2B46]/50 text-[14px] font-light leading-[1.8]">
                    {item.a}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ MAP — Full-width, no wrapper ═══════════════ */
function AzMap({ t }: { t: Tr }) {
  return (
    <section className="bg-[#F8F9FA]">
      <div className="py-20 px-6 text-center">
        <ScrollReveal>
          <div className="w-8 h-px bg-[#C9A356] mx-auto mb-8" />
          <h2 className="font-m4-display text-[#0F2B46] text-[28px] sm:text-[36px] font-normal tracking-[2px] mb-3">
            {t.map.title}
          </h2>
          <p className="font-m4-body text-[#0F2B46]/40 text-[14px] font-light">
            {t.map.sub}
          </p>
        </ScrollReveal>
      </div>
      <div className="w-full h-[400px] md:h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23456.789!2d76.9833!3d42.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ebfc0a0a0a0a1%3A0x1234567890abcdef!2sCholpon-Ata!5e0!3m2!1sru!2skg!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

/* ═══════════════ FOOTER — Minimal, dark navy ═══════════════ */
function AzFooter({ t, lang }: { t: Tr; lang: string }) {
  return (
    <footer className="bg-[#0F2B46] py-20 md:py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Logo + desc */}
          <div className="md:max-w-[300px]">
            <span className="font-m4-display text-white text-xl tracking-[3px] font-normal">
              АЛЫКУЛ
            </span>
            <p className="mt-4 font-m4-body text-white/30 text-[14px] font-light leading-[1.8]">
              {t.foot.desc}
            </p>
          </div>

          {/* Links group 1 */}
          <div>
            <h4 className="font-m4-body text-white/20 text-[10px] tracking-[2px] uppercase mb-4">
              {t.foot.routes}
            </h4>
            <div className="space-y-2">
              <a href="#az-catalog" className="block font-m4-body text-white/40 text-[13px] font-light hover:text-white/70 transition-colors">{t.foot.cruises}</a>
              <a href="#az-catalog" className="block font-m4-body text-white/40 text-[13px] font-light hover:text-white/70 transition-colors">{t.foot.charters}</a>
              <a href="#az-catalog" className="block font-m4-body text-white/40 text-[13px] font-light hover:text-white/70 transition-colors">{t.foot.speed}</a>
            </div>
          </div>

          {/* Links group 2 */}
          <div>
            <h4 className="font-m4-body text-white/20 text-[10px] tracking-[2px] uppercase mb-4">
              {t.foot.company}
            </h4>
            <div className="space-y-2">
              <a href="#az-about" className="block font-m4-body text-white/40 text-[13px] font-light hover:text-white/70 transition-colors">{t.foot.contact}</a>
              <a href="#" className="block font-m4-body text-white/40 text-[13px] font-light hover:text-white/70 transition-colors">{t.foot.privacy}</a>
              <a href={`/${lang}/trips`} className="block font-m4-body text-white/40 text-[13px] font-light hover:text-white/70 transition-colors">{t.foot.trips}</a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-white/5 pt-8">
          <p className="font-m4-body text-white/20 text-[11px] font-light tracking-[1px]">
            &copy; {new Date().getFullYear()} Алыкул. {t.foot.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════ TRANSLATIONS ═══════════════ */
type Tr = ReturnType<typeof getTrans>;

function getTrans(lang: string) {
  const ru = lang === 'ru';
  const ky = lang === 'ky';
  return {
    nav: {
      routes: ru ? 'Маршруты' : ky ? 'Маршруттар' : 'Routes',
      schedule: ru ? 'Расписание' : ky ? 'Ырааттама' : 'Schedule',
      fleet: ru ? 'Флот' : ky ? 'Флот' : 'Fleet',
      reviews: ru ? 'Отзывы' : ky ? 'Пикирлер' : 'Reviews',
      contacts: ru ? 'О нас' : ky ? 'Биз жөнүндө' : 'About',
      book: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book',
    },
    hero: {
      line1: ru ? 'АЛЫКУЛ' : ky ? 'АЛЫКУЛ' : 'ALYKUL',
      line2: ru ? 'Озеро Иссык-Куль' : ky ? 'Ысык-Көл' : 'Lake Issyk-Kul',
    },
    tagline: ru
      ? 'Первая платформа водного туризма на Иссык-Куле'
      : ky
        ? 'Ысык-Көлдөгү биринчи суу туризм платформасы'
        : 'The first water tourism platform on Issyk-Kul',
    fleet: {
      title: ru ? 'Наш флот' : ky ? 'Биздин флот' : 'Our Fleet',
      items: [
        {
          img: '/images/q02.jpg',
          name: ru ? 'Теплоход «Алыкул»' : ky ? '«Алыкул» теплоходу' : 'Steamship "Alykul"',
          desc: ru
            ? 'Флагман флота. Круизы на закате, корпоративы, свадьбы и детские праздники на двух палубах с банкетным залом.'
            : ky
              ? 'Флоттун флагманы. Эки палубада банкет залы менен күн батыш круиздери.'
              : 'Fleet flagship. Sunset cruises, corporate events, weddings, and parties on two decks with a banquet hall.',
          specs: [
            ru ? 'до 200 гостей' : ky ? '200 конокко чейин' : 'up to 200 guests',
            ru ? '2 палубы' : ky ? '2 палуба' : '2 decks',
            ru ? 'банкетный зал' : ky ? 'банкет залы' : 'banquet hall',
          ],
        },
        {
          img: '/images/ep03.jpg',
          name: ru ? 'Яхта «Nomad»' : ky ? '«Nomad» яхтасы' : 'Yacht "Nomad"',
          desc: ru
            ? 'Приватные чартеры и романтические прогулки. VIP-обслуживание для самых взыскательных гостей.'
            : ky
              ? 'Жеке чартерлер жана романтикалык сейилдөөлөр. VIP кызмат.'
              : 'Private charters and romantic walks. VIP service for the most discerning guests.',
          specs: [
            ru ? 'до 12 гостей' : ky ? '12 конокко чейин' : 'up to 12 guests',
            ru ? 'парусная яхта' : ky ? 'желкендүү яхта' : 'sailing yacht',
          ],
        },
        {
          img: '/images/scene6.jpg',
          name: ru ? 'Скоростные катера' : ky ? 'Ылдам катерлер' : 'Speedboats',
          desc: ru
            ? 'Адреналиновые туры, водные лыжи, вейкборд и рыбалка. Скорость до 60 км/ч.'
            : ky
              ? 'Адреналин турлары, суу лыжалары, вейкборд. 60 км/с чейин ылдамдык.'
              : 'Adrenaline tours, water skiing, wakeboarding, and fishing. Speed up to 60 km/h.',
          specs: [
            ru ? 'до 8 гостей' : ky ? '8 конокко чейин' : 'up to 8 guests',
            ru ? 'до 60 км/ч' : ky ? '60 км/с чейин' : 'up to 60 km/h',
          ],
        },
      ],
    },
    booking: {
      pier: ru ? 'Причал' : ky ? 'Причал' : 'Pier',
      piers: [
        ru ? 'Чолпон-Ата' : ky ? 'Чолпон-Ата' : 'Cholpon-Ata',
        ru ? 'Бостери' : ky ? 'Бостери' : 'Bosteri',
        ru ? 'Каракол' : ky ? 'Каракол' : 'Karakol',
        ru ? 'Тамга' : ky ? 'Тамга' : 'Tamga',
      ],
      date: ru ? 'Дата' : ky ? 'Күнү' : 'Date',
      guests: ru ? 'Гости' : ky ? 'Конокторв' : 'Guests',
      search: ru ? 'Найти рейс' : ky ? 'Рейс табуу' : 'Find Trip',
    },
    catalog: {
      title: ru ? 'Маршруты и цены' : ky ? 'Маршруттар жана баалар' : 'Routes & Prices',
      bookBtn: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book Now',
      items: [
        { img: '/images/q02.jpg', name: ru ? 'Закатный круиз' : ky ? 'Күн батыш круизи' : 'Sunset Cruise', category: ru ? 'Круиз' : ky ? 'Круиз' : 'Cruise', price: ru ? 'от 1 400 KGS' : ky ? '1 400 KGS ден' : 'from 1,400 KGS' },
        { img: '/images/ep03.jpg', name: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter', category: 'VIP', price: ru ? 'от 7 000 KGS' : ky ? '7 000 KGS ден' : 'from 7,000 KGS' },
        { img: '/images/scene6.jpg', name: ru ? 'Скоростной тур' : ky ? 'Ылдам тур' : 'Speed Tour', category: ru ? 'Адреналин' : ky ? 'Адреналин' : 'Adrenaline', price: ru ? 'от 2 000 KGS' : ky ? '2 000 KGS ден' : 'from 2,000 KGS' },
        { img: '/images/kids.jpg', name: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : "Kids' Party", category: ru ? 'Семейный' : ky ? 'Үй-бүлөлүк' : 'Family', price: ru ? 'от 1 000 KGS/чел' : ky ? '1 000 KGS/адам' : 'from 1,000 KGS/person' },
      ],
    },
    schedule: {
      title: ru ? 'Расписание рейсов' : ky ? 'Рейстердин ырааттамасы' : 'Departure Schedule',
      colRoute: ru ? 'Маршрут' : ky ? 'Маршрут' : 'Route',
      colTime: ru ? 'Время' : ky ? 'Убакыт' : 'Time',
      colDuration: ru ? 'Длительность' : ky ? 'Узактыгы' : 'Duration',
      colFreq: ru ? 'Частота' : ky ? 'Жыштыгы' : 'Frequency',
      colPrice: ru ? 'Цена' : ky ? 'Баасы' : 'Price',
      bookBtn: ru ? 'Бронь' : ky ? 'Брондоо' : 'Book',
      rows: [
        { route: ru ? 'Закатный круиз' : ky ? 'Күн батыш круизи' : 'Sunset Cruise', time: '18:00', duration: ru ? '2 часа' : ky ? '2 саат' : '2 hours', freq: ru ? 'Ежедневно' : ky ? 'Күн сайын' : 'Daily', price: '1 400 KGS' },
        { route: ru ? 'Утренний круиз' : ky ? 'Эртеңки круиз' : 'Morning Cruise', time: '10:00', duration: ru ? '1.5 часа' : ky ? '1.5 саат' : '1.5 hours', freq: ru ? 'Ежедневно' : ky ? 'Күн сайын' : 'Daily', price: '1 200 KGS' },
        { route: ru ? 'Скоростной тур' : ky ? 'Ылдам тур' : 'Speed Tour', time: '12:00, 14:00, 16:00', duration: ru ? '45 мин' : ky ? '45 мүн' : '45 min', freq: ru ? '3 раза/день' : ky ? '3 жолу/күн' : '3x/day', price: '2 000 KGS' },
        { route: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter', time: ru ? 'По запросу' : ky ? 'Суроо боюнча' : 'On request', duration: ru ? '2-4 часа' : ky ? '2-4 саат' : '2-4 hours', freq: ru ? 'По запросу' : ky ? 'Суроо боюнча' : 'On request', price: '7 000 KGS' },
        { route: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : "Kids' Party", time: ru ? 'Выходные 11:00' : ky ? 'Дем алыш 11:00' : 'Weekends 11:00', duration: ru ? '2 часа' : ky ? '2 саат' : '2 hours', freq: ru ? 'Выходные' : ky ? 'Дем алыш' : 'Weekends', price: '1 000 KGS/чел' },
      ],
    },
    reviewsList: [
      { text: ru ? 'Незабываемый закат с палубы «Алыкул». Тишина, горы и бесконечная гладь воды — это то, ради чего стоит приехать на Иссык-Куль.' : ky ? 'Алыкулдун палубасынан унутулгус күн батышы. Тынчтык, тоолор жана суунун чексиз жылмакайлыгы.' : 'An unforgettable sunset from the Alykul deck. Silence, mountains, and the endless stillness of the water.', name: ru ? 'Айгуль К.' : 'Aigul K.' },
      { text: ru ? 'Организовали корпоратив на 80 человек. Всё прошло идеально — от посадки до банкета. Вернёмся снова!' : ky ? '80 кишилик корпоратив уюштурдук. Баары идеалдуу өттү!' : 'Organized a corporate event for 80 people. Everything went perfectly — from boarding to the banquet.', name: ru ? 'Данияр М.' : 'Daniyar M.' },
      { text: ru ? 'Дочке исполнилось 7 лет — праздновали на теплоходе. Аниматоры, еда, виды — дети были в восторге. Спасибо!' : ky ? 'Кызымдын 7 жашы теплоходдо белгиленди. Балдар абдан кубанышты!' : "Daughter turned 7 — we celebrated on the ship. Animators, food, views — the kids were thrilled!", name: ru ? 'Елена С.' : 'Elena S.' },
      { text: ru ? 'Скоростной тур — это чистый адреналин. 60 км/ч по Иссык-Кулю с ветром в лицо. Лучший опыт лета!' : ky ? 'Ылдам тур — таза адреналин. Ысык-Көлдө 60 км/с!' : 'Speed tour is pure adrenaline. 60 km/h on Issyk-Kul with wind in your face. Best summer experience!', name: ru ? 'Руслан А.' : 'Ruslan A.' },
    ],
    about: {
      title: ru ? 'О компании' : ky ? 'Биз жөнүндө' : 'About Us',
      intro: ru
        ? 'Алыкул — первый оператор цифрового бронирования водного транспорта на озере Иссык-Куль. Более 5 лет мы организуем круизы, частные чартеры и скоростные туры, объединяя сертифицированный флот, опытных капитанов и современные технологии бронирования.'
        : ky
          ? 'Алыкул — Ысык-Көлдөгү суу транспортун санариптик брондоонун биринчи оператору. 5 жылдан ашык убакыттан бери круиздерди, жеке чартерлерди жана ылдам турларды уюштуруп келебиз.'
          : 'Alykul is the first digital water transport booking operator on Lake Issyk-Kul. For over 5 years we have been organizing cruises, private charters and speed tours, combining a certified fleet, experienced captains and modern booking technology.',
    },
    faq: {
      title: ru ? 'Частые вопросы' : ky ? 'Көп берилүүчү суроолор' : 'FAQ',
      items: [
        { q: ru ? 'Как забронировать круиз?' : ky ? 'Круизди кантип брондойм?' : 'How to book a cruise?', a: ru ? 'Выберите маршрут на сайте, укажите дату и количество гостей. Бронирование через WhatsApp занимает 2 минуты. Оплата на месте или онлайн.' : ky ? 'Сайттан маршрутту тандаңыз. WhatsApp аркылуу 2 мүнөттө брондоо.' : 'Choose a route, select date and guests. WhatsApp booking takes 2 minutes.' },
        { q: ru ? 'Какие документы нужны?' : ky ? 'Кайсы документтер керек?' : 'What documents are needed?', a: ru ? 'Только удостоверение личности. Для детей до 14 лет — свидетельство о рождении. Иностранным гражданам — паспорт.' : ky ? 'Жеке документ гана. 14 жашка чейинкилерге — туулгандыгы жөнүндө күбөлүк.' : 'Only ID. Children under 14 — birth certificate. Foreign citizens — passport.' },
        { q: ru ? 'Можно ли отменить бронирование?' : ky ? 'Брондоону жокко чыгарса болобу?' : 'Can I cancel?', a: ru ? 'Бесплатная отмена за 24 часа до отправления. Менее 24 часов — удерживается 20%.' : ky ? '24 саат мурун акысыз жокко чыгаруу. 24 сааттан аз — 20% кармалат.' : 'Free cancellation 24h before departure. Less than 24h — 20% fee.' },
        { q: ru ? 'Есть ли спасательное оборудование?' : ky ? 'Куткаруу жабдуулары барбы?' : 'Safety equipment?', a: ru ? 'Все суда оснащены спасательными жилетами и аптечкой. Капитаны сертифицированы ежегодно.' : ky ? 'Бардык кемелерде куткаруу жилеттери жана дарыкана бар.' : 'All vessels have life jackets and first aid. Captains certified annually.' },
        { q: ru ? 'Работаете ли вы в плохую погоду?' : ky ? 'Жаман аба ырайында иштейсизби?' : 'Bad weather?', a: ru ? 'Безопасность — приоритет. При штормовом предупреждении рейсы переносятся. Уведомляем за 2 часа.' : ky ? 'Коопсуздук — артыкчылык. Бороондо рейстер которулат. 2 саат мурун кабарлайбыз.' : 'Safety first. Cruises reschedule in storms. We notify 2 hours before.' },
      ],
    },
    map: {
      title: ru ? 'Как нас найти' : ky ? 'Бизди кантип табасыз' : 'Find Us',
      sub: ru ? 'Причал в Чолпон-Ате, северный берег Иссык-Куля' : ky ? 'Чолпон-Атадагы причал, Ысык-Көлдүн түндүк жээги' : 'Pier in Cholpon-Ata, northern shore of Issyk-Kul',
    },
    foot: {
      desc: ru ? 'Первая платформа онлайн-бронирования водного транспорта на озере Иссык-Куль.' : ky ? 'Ысык-Көлдөгү биринчи суу транспортун онлайн-брондоо платформасы.' : 'First online water transport booking platform on Lake Issyk-Kul.',
      routes: ru ? 'Маршруты' : ky ? 'Маршруттар' : 'Routes',
      cruises: ru ? 'Круизы' : ky ? 'Круиздер' : 'Cruises',
      charters: ru ? 'Чартеры' : ky ? 'Чартерлер' : 'Charters',
      speed: ru ? 'Скоростные туры' : ky ? 'Ылдам турлар' : 'Speed Tours',
      company: ru ? 'Компания' : ky ? 'Компания' : 'Company',
      privacy: ru ? 'Конфиденциальность' : ky ? 'Купуялуулук' : 'Privacy',
      contact: ru ? 'Контакты' : ky ? 'Байланыштар' : 'Contacts',
      rights: ru ? 'Все права защищены.' : ky ? 'Бардык укуктар корголгон.' : 'All rights reserved.',
      trips: ru ? 'Все маршруты' : ky ? 'Бардык маршруттар' : 'All Trips',
      account: ru ? 'Личный кабинет' : ky ? 'Жеке кабинет' : 'My Account',
    },
  };
}
