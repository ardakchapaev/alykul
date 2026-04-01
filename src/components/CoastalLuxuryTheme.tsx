'use client';

import { useTheme, THEMES } from '@/lib/theme-context';
import { ScrollReveal } from './M3Animations';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function CoastalLuxuryWrapper({ lang }: { lang: string }) {
  const { theme } = useTheme();
  if (theme !== 'M5') return null;

  const t = getTrans(lang);

  return (
    <div className="fixed inset-0 z-[9999] overflow-auto bg-[#FAFBFD]">
      <M4Nav lang={lang} t={t} />
      <M4Hero t={t} lang={lang} />
      <M4Stats t={t} />
      <M4About t={t} />
      <M5TrustBadges t={t} />
      <M5Catalog t={t} lang={lang} />
      <M5Schedule t={t} lang={lang} />
      <M4Fleet t={t} />
      <M4Gallery t={t} />
      <M4Reviews t={t} lang={lang} />
      <M4FAQ t={t} />
      <M4MapSection t={t} />
      <M4Footer t={t} lang={lang} />
      <M4AiChat />
    </div>
  );
}

/* ═══════════════ NAVBAR — LIGHT THEME ═══════════════ */
function M4Nav({ lang, t }: { lang: string; t: Tr }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#m5-catalog', label: t.nav.routes },
    { href: '#m5-schedule', label: t.nav.schedule },
    { href: '#m4-fleet', label: t.nav.fleet },
    { href: '#m4-reviews', label: t.nav.reviews },
    { href: '#m4-contacts', label: t.nav.contacts },
  ];
  const langLabels: Record<string, string> = { ru: 'RU', en: 'EN', ky: 'KY' };
  const themes = THEMES;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-500 font-m4-body ${
      scrolled ? 'bg-[#FAFBFD]/95 backdrop-blur-xl shadow-sm py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
            <path d="M6 22C10 18 14 12 18 8C22 12 26 18 30 22" stroke="#1E6FD9" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M4 26C10 22 18 24 24 22C28 21 32 23 34 26" stroke="#0F2B46" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <span className="text-[#0F2B46] font-m4-display text-lg font-bold tracking-wide hidden sm:block">АЛЫКУЛ</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-[#0F2B46]/70 text-[13px] font-medium tracking-[1px] hover:text-[#0F2B46] transition-colors">{l.label}</a>
          ))}
          <a href={`/${lang}/trips`} className="bg-[#E8B86D] text-[#0F2B46] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#D4A55A] transition-colors">{t.nav.book}</a>
        </div>

        <div className="flex items-center gap-2">
          {/* Language dropdown */}
          <div className="relative">
            <button onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); }}
              className="flex items-center gap-1 text-[#0F2B46]/60 text-xs font-semibold hover:text-[#0F2B46] transition-colors px-2 py-1.5">
              {langLabels[lang] || 'RU'}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white/95 backdrop-blur-xl border border-[#0F2B46]/10 rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                {['ru', 'en', 'ky'].map(l => (
                  <a key={l} href={`/${l}`} onClick={() => setLangOpen(false)}
                    className={`block px-4 py-2 text-xs font-medium ${l === lang ? 'text-[#1E6FD9] bg-[#1E6FD9]/5' : 'text-[#0F2B46]/60 hover:text-[#0F2B46] hover:bg-[#0F2B46]/5'}`}>{langLabels[l]}</a>
                ))}
              </div>
            )}
          </div>
          {/* Theme dropdown */}
          <div className="relative hidden lg:block">
            <button onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); }}
              className="flex items-center gap-1 text-[#0F2B46]/60 text-xs font-semibold hover:text-[#0F2B46] transition-colors px-2 py-1.5">
              {theme}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {themeOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white/95 backdrop-blur-xl border border-[#0F2B46]/10 rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                {themes.map(th => (
                  <button key={th} onClick={() => { setTheme(th); setThemeOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-xs font-medium ${th === theme ? 'text-[#1E6FD9] bg-[#1E6FD9]/5' : 'text-[#0F2B46]/60 hover:text-[#0F2B46] hover:bg-[#0F2B46]/5'}`}>{th}</button>
                ))}
              </div>
            )}
          </div>
          {/* Burger */}
          <button className="lg:hidden flex flex-col gap-1.5 w-6 ml-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <span className={`h-[2px] w-full bg-[#0F2B46] transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`h-[2px] w-full bg-[#0F2B46] transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-full bg-[#0F2B46] transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-[#FAFBFD]/[0.98] z-[10001] flex flex-col items-center justify-center gap-6 lg:hidden">
          <button className="absolute top-4 right-5 text-[#0F2B46] text-3xl" onClick={() => setOpen(false)}>&times;</button>
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-[#0F2B46] font-m4-display text-2xl hover:text-[#1E6FD9] transition-colors" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <div className="flex gap-3 mt-6 border-t border-[#0F2B46]/10 pt-6">
            {themes.map(th => (
              <button key={th} onClick={() => { setTheme(th); setOpen(false); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${th === theme ? 'bg-[#1E6FD9] text-white' : 'border border-[#0F2B46]/20 text-[#0F2B46]/60 hover:text-[#0F2B46]'}`}>{th}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════ HERO — Fullscreen editorial ═══════════════ */
function M4Hero({ t, lang }: { t: Tr; lang: string }) {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      <Image src="/images/hero.jpg" alt="Issyk-Kul" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F2B46]/70 via-[#0F2B46]/30 to-transparent" />

      {/* Left-aligned content */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl">
            <h1 className="font-m4-display italic text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6">
              {t.hero.line1}
            </h1>
            <p className="font-m4-body text-white/70 text-lg md:text-xl mb-10 max-w-md">
              {t.hero.line2}
            </p>
            <a
              href="#m4-fleet"
              className="inline-block bg-[#E8B86D] hover:bg-[#D4A55A] text-[#0F2B46] font-m4-body font-semibold px-10 py-4 rounded-full text-sm tracking-wide transition-colors"
            >
              {t.hero.cta}
            </a>

            {/* Booking Widget */}
            <div className="bg-white/90 backdrop-blur-xl border border-[#E8B86D]/20 rounded-2xl p-4 shadow-xl mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[#0F2B46] text-xs font-semibold font-m4-body mb-1">{t.booking.pier}</label>
                  <select className="w-full border border-[#F0F5FA] rounded-lg px-3 py-2 text-sm text-[#0F2B46] font-m4-body bg-white focus:outline-none focus:border-[#1E6FD9]/30">
                    {t.booking.piers.map((p: string) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#0F2B46] text-xs font-semibold font-m4-body mb-1">{t.booking.date}</label>
                  <input type="date" className="w-full border border-[#F0F5FA] rounded-lg px-3 py-2 text-sm text-[#0F2B46] font-m4-body bg-white focus:outline-none focus:border-[#1E6FD9]/30" />
                </div>
                <div>
                  <label className="block text-[#0F2B46] text-xs font-semibold font-m4-body mb-1">{t.booking.guests}</label>
                  <select className="w-full border border-[#F0F5FA] rounded-lg px-3 py-2 text-sm text-[#0F2B46] font-m4-body bg-white focus:outline-none focus:border-[#1E6FD9]/30">
                    {['2', '4', '6', '8+'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <a href={`/${lang}/trips`} className="w-full bg-[#1E6FD9] hover:bg-[#1858B0] text-white font-m4-body font-semibold px-4 py-2 rounded-lg text-sm text-center transition-colors block">
                    {t.booking.search}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ STATS — Floating bar ═══════════════ */
function M4Stats({ t }: { t: Tr }) {
  const stats = [
    { val: '5+', label: t.stats.years },
    { val: '12K+', label: t.stats.guests },
    { val: '8', label: t.stats.vessels },
    { val: '15', label: t.stats.routes },
  ];

  return (
    <section className="relative z-10 -mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="font-m4-display text-[#0F2B46] text-3xl md:text-4xl font-bold">{s.val}</div>
                <p className="font-m4-body text-[#8A9BB0] text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#E8B86D] to-transparent mt-8" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ ABOUT — Editorial two-column ═══════════════ */
function M4About({ t }: { t: Tr }) {
  const services = t.about.services;

  return (
    <section className="py-24 bg-[#FAFBFD]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            {/* Left — text */}
            <div>
              <h2 className="font-m4-display italic text-[#0F2B46] text-3xl md:text-4xl lg:text-5xl mb-4">{t.about.title}</h2>
              <div className="w-16 h-[2px] bg-[#E8B86D] mb-6" />
              <p className="font-m4-body text-[#8A9BB0] text-base leading-relaxed">{t.about.intro}</p>
            </div>
            {/* Right — image */}
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image src="/images/alykul1.jpg" alt="About" fill className="object-cover" />
            </div>
          </div>
        </ScrollReveal>

        {/* Services grid 2x3 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s: { icon: string; title: string; desc: string }) => (
            <ScrollReveal key={s.title}>
              <div className="bg-white rounded-xl border border-[#F0F5FA] shadow-sm p-6 hover:-translate-y-1 transition-transform duration-300">
                <div className="text-2xl mb-3">{s.icon}</div>
                <h4 className="font-m4-body font-semibold text-[#0F2B46] text-base mb-2">{s.title}</h4>
                <p className="font-m4-body text-[#8A9BB0] text-sm leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ TRUST BADGES ═══════════════ */
function M5TrustBadges({ t }: { t: Tr }) {
  const badges = t.trust.items;

  return (
    <section className="py-6 bg-[#FAFBFD]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="bg-[#F0F5FA] py-8 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
            {badges.map((b: { icon: string; text: string }) => (
              <div key={b.text} className="flex items-center gap-3 justify-center">
                <span className="text-2xl">{b.icon}</span>
                <span className="text-[#0F2B46] font-m4-body text-sm font-medium">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ CATALOG — Routes & Prices ═══════════════ */
function M5Catalog({ t, lang }: { t: Tr; lang: string }) {
  const items = t.catalog.items;

  return (
    <section id="m5-catalog" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="font-m4-display italic text-[#0F2B46] text-3xl md:text-4xl lg:text-5xl">{t.catalog.title}</h2>
            <div className="w-16 h-[2px] bg-[#E8B86D] mx-auto mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item: { img: string; name: string; category: string; price: string }) => (
            <ScrollReveal key={item.name}>
              <div className="bg-white rounded-xl border border-[#F0F5FA] shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-[200px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <span className="text-[#1E6FD9] text-xs uppercase font-m4-body font-semibold tracking-wider">{item.category}</span>
                  <h3 className="font-m4-body font-semibold text-[#0F2B46] text-base mt-1 mb-2">{item.name}</h3>
                  <p className="text-[#1E6FD9] font-bold font-m4-body text-lg mb-3">{item.price}</p>
                  <a href={`/${lang}/trips`} className="block bg-[#1E6FD9] hover:bg-[#1858B0] text-white px-4 py-2 rounded-lg text-sm font-m4-body font-semibold text-center transition-colors">
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

/* ═══════════════ SCHEDULE — Departures ═══════════════ */
function M5Schedule({ t, lang }: { t: Tr; lang: string }) {
  const rows = t.schedule.rows;

  return (
    <section id="m5-schedule" className="py-24 bg-[#F0F5FA]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="font-m4-display italic text-[#0F2B46] text-3xl md:text-4xl lg:text-5xl">{t.schedule.title}</h2>
            <div className="w-16 h-[2px] bg-[#E8B86D] mx-auto mt-4" />
          </div>
        </ScrollReveal>

        <div className="overflow-x-auto rounded-xl shadow-sm">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-[#0F2B46] text-white">
                <th className="text-left py-3 px-4 text-sm font-m4-body font-semibold">{t.schedule.colRoute}</th>
                <th className="text-left py-3 px-4 text-sm font-m4-body font-semibold">{t.schedule.colTime}</th>
                <th className="text-left py-3 px-4 text-sm font-m4-body font-semibold">{t.schedule.colDuration}</th>
                <th className="text-left py-3 px-4 text-sm font-m4-body font-semibold">{t.schedule.colFreq}</th>
                <th className="text-left py-3 px-4 text-sm font-m4-body font-semibold">{t.schedule.colPrice}</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row: { route: string; time: string; duration: string; freq: string; freqColor: string; price: string }, i: number) => (
                <tr key={i} className="bg-white border-b border-[#F0F5FA]">
                  <td className="py-3 px-4 text-sm font-m4-body font-semibold text-[#0F2B46]">{row.route}</td>
                  <td className="py-3 px-4 text-sm font-m4-body text-[#0F2B46]/70">{row.time}</td>
                  <td className="py-3 px-4 text-sm font-m4-body text-[#0F2B46]/70">{row.duration}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-m4-body font-semibold px-2 py-1 rounded-full ${row.freqColor}`}>{row.freq}</span>
                  </td>
                  <td className="py-3 px-4 text-sm font-m4-body font-bold text-[#1E6FD9]">{row.price}</td>
                  <td className="py-3 px-4">
                    <a href={`/${lang}/trips`} className="bg-[#1E6FD9] text-white text-xs px-3 py-1.5 rounded-lg font-m4-body font-semibold hover:bg-[#1858B0] transition-colors">
                      {t.schedule.bookBtn}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ FLEET — Bento grid ═══════════════ */
function M4Fleet({ t }: { t: Tr }) {
  const vessels = t.fleet.items;

  return (
    <section id="m4-fleet" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="font-m4-display italic text-[#0F2B46] text-3xl md:text-4xl lg:text-5xl">{t.fleet.title}</h2>
            <p className="font-m4-body text-[#8A9BB0] mt-3">{t.fleet.sub}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Large card — spans 2 cols on md */}
          <div className="md:col-span-2 group relative rounded-xl overflow-hidden h-[400px] cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={vessels[0].img} alt={vessels[0].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B46]/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="text-white font-m4-display text-xl md:text-2xl font-semibold mb-2">{vessels[0].name}</h3>
              <p className="text-white/60 font-m4-body text-sm mb-3 max-w-md">{vessels[0].desc}</p>
              <div className="flex flex-wrap gap-2">
                {vessels[0].specs.map((s: string) => (
                  <span key={s} className="bg-white/20 backdrop-blur text-white text-xs px-2 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Two smaller cards */}
          {vessels.slice(1).map((v: { img: string; name: string; desc: string; specs: string[] }) => (
            <div key={v.name} className="group relative rounded-xl overflow-hidden h-[280px] md:h-[300px] cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.img} alt={v.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B46]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-m4-display text-lg font-semibold mb-1">{v.name}</h3>
                <p className="text-white/60 font-m4-body text-xs mb-2">{v.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {v.specs.map((s: string) => (
                    <span key={s} className="bg-white/20 backdrop-blur text-white text-xs px-2 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ GALLERY — Staggered grid ═══════════════ */
function M4Gallery({ t }: { t: Tr }) {
  const items = [
    { img: '/images/hero.jpg', title: t.gallery.c1, tall: true },
    { img: '/images/scene7.jpg', title: t.gallery.c2, tall: false },
    { img: '/images/alykul1.jpg', title: t.gallery.c3, tall: false },
    { img: '/images/q02.jpg', title: t.gallery.c4, tall: true },
    { img: '/images/ep03.jpg', title: t.gallery.c5, tall: true },
    { img: '/images/scene6.jpg', title: t.gallery.c6, tall: false },
  ];

  return (
    <section className="py-24 bg-[#F0F5FA]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="font-m4-display italic text-[#0F2B46] text-3xl md:text-4xl lg:text-5xl">{t.gallery.title}</h2>
            <p className="font-m4-body text-[#8A9BB0] mt-3">{t.gallery.sub}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div key={i} className={`group relative rounded-xl overflow-hidden ${item.tall ? 'h-[400px]' : 'h-[250px]'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B46]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white font-m4-body text-sm font-semibold">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ REVIEWS — Horizontal scroll testimonials ═══════════════ */
function M4Reviews({ t, lang }: { t: Tr; lang: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const ru = lang === 'ru';

  const all = [
    { img: '/images/q01.jpg', name: ru ? 'Айгуль К.' : 'Aigul K.', city: ru ? 'г. Бишкек' : 'Bishkek', stars: 5, text: ru ? 'Потрясающий закатный круиз из Чолпон-Аты! Вид на горы с воды — это нечто невероятное.' : 'Amazing sunset cruise! Mountain views from the water are incredible.' },
    { img: '/images/captain2.jpg', name: ru ? 'Бакыт М.' : 'Bakyt M.', city: ru ? 'г. Каракол' : 'Karakol', stars: 5, text: ru ? 'Профессиональная команда! Капитан рассказал историю озера, дети в восторге.' : 'Professional crew! Captain told lake history, kids loved it.' },
    { img: '/images/scene8.jpg', name: ru ? 'Дмитрий С.' : 'Dmitry S.', city: ru ? 'г. Алматы' : 'Almaty', stars: 4, text: ru ? 'Скоростной тур из Бостери — адреналин! Лучший опыт на Иссык-Куле.' : 'Speed tour from Bosteri — pure adrenaline!' },
    { img: '/images/scene4.jpg', name: ru ? 'Мария Л.' : 'Maria L.', city: ru ? 'г. Москва' : 'Moscow', stars: 5, text: ru ? 'Яхта «Nomad» — VIP уровень. Романтический ужин на воде с видом на закат.' : 'Yacht "Nomad" is VIP level. Romantic dinner with sunset views.' },
    { img: '/images/scene3.jpg', name: ru ? 'Азамат Т.' : 'Azamat T.', city: ru ? 'г. Бишкек' : 'Bishkek', stars: 5, text: ru ? 'Корпоратив на теплоходе — 80 человек, всё организовано идеально.' : 'Corporate event — 80 people, perfectly organized.' },
    { img: '/images/promo.jpg', name: ru ? 'Елена Р.' : 'Elena R.', city: ru ? 'г. Ош' : 'Osh', stars: 5, text: ru ? 'Детский праздник на Алыкул — дети до сих пор вспоминают!' : 'Kids party on Alykul — kids still remember it!' },
    { img: '/images/scene1.jpg', name: ru ? 'Тимур К.' : 'Timur K.', city: ru ? 'г. Астана' : 'Astana', stars: 4, text: ru ? 'Утренний круиз из Бостери. Тихо, спокойно, горы в воде.' : 'Morning cruise. Quiet, peaceful, mountains in the water.' },
    { img: '/images/scene5.jpg', name: ru ? 'Анна В.' : 'Anna V.', city: ru ? 'г. Ташкент' : 'Tashkent', stars: 5, text: ru ? 'Лучший отпуск за 5 лет. Иссык-Куль + яхта + горы = незабываемо.' : 'Best vacation in 5 years. Issyk-Kul + yacht = unforgettable!' },
    { img: '/images/scene9.jpg', name: ru ? 'Нурлан Б.' : 'Nurlan B.', city: ru ? 'г. Каракол' : 'Karakol', stars: 5, text: ru ? 'Свадьба на теплоходе — мечта сбылась! 150 гостей, 2 палубы.' : 'Wedding on steamship — dream come true! 150 guests.' },
  ];

  const scroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'next' ? 380 : -380, behavior: 'smooth' });
  };

  return (
    <section id="m4-reviews" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-14">
            <div>
              <h2 className="font-m4-display italic text-[#0F2B46] text-3xl md:text-4xl lg:text-5xl">{t.reviews.title}</h2>
              <p className="font-m4-body text-[#8A9BB0] mt-3">{t.reviews.sub}</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('prev')} className="w-10 h-10 rounded-full border border-[#0F2B46]/10 flex items-center justify-center text-[#0F2B46] hover:bg-[#F0F5FA] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 19-7-7 7-7"/></svg>
              </button>
              <button onClick={() => scroll('next')} className="w-10 h-10 rounded-full border border-[#0F2B46]/10 flex items-center justify-center text-[#0F2B46] hover:bg-[#F0F5FA] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4" style={{ scrollbarWidth: 'none' }}>
          {all.map((r, i) => (
            <div key={i} className="min-w-[320px] max-w-[400px] flex-shrink-0 snap-start bg-[#FAFBFD] rounded-xl border border-[#F0F5FA] p-8">
              {/* Gold quote */}
              <svg className="w-8 h-8 text-[#E8B86D] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} className={`w-3.5 h-3.5 ${si < r.stars ? 'text-[#E8B86D]' : 'text-[#F0F5FA]'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-m4-body text-[#0F2B46]/80 text-sm leading-relaxed mb-6">{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image src={r.img} alt={r.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-m4-body font-semibold text-sm text-[#0F2B46]">{r.name}</div>
                  <div className="font-m4-body text-[#8A9BB0] text-xs">{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ FAQ — Clean accordion ═══════════════ */
function M4FAQ({ t }: { t: Tr }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = t.faq.items;

  return (
    <section className="py-24 bg-[#F0F5FA]">
      <div className="max-w-2xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="font-m4-display italic text-[#0F2B46] text-3xl md:text-4xl">{t.faq.title}</h2>
          </div>
        </ScrollReveal>

        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          {items.map((item: { q: string; a: string }, i: number) => (
            <div key={i} className={`border-b border-[#F0F5FA] last:border-b-0 transition-all ${openIdx === i ? 'border-l-2 border-l-[#1E6FD9]' : 'border-l-2 border-l-transparent'}`}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left font-m4-body font-semibold text-[#0F2B46] text-sm hover:bg-[#F0F5FA]/50 transition-colors cursor-pointer"
              >
                {item.q}
                <svg className={`w-4 h-4 shrink-0 text-[#8A9BB0] transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 pb-5 text-[#8A9BB0] text-sm font-m4-body leading-relaxed">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ MAP — Cholpon-Ata ═══════════════ */
function M4MapSection({ t }: { t: Tr }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-m4-display italic text-[#0F2B46] text-3xl md:text-4xl">{t.map.title}</h2>
            <p className="font-m4-body text-[#8A9BB0] mt-3">{t.map.sub}</p>
          </div>
        </ScrollReveal>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23918.78!2d77.0685!3d42.6461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c5e2e27a3b%3A0x6f2a7c29d3f4d8a1!2z0KfQvtC70L/QvtC9LdCQ0YLQsA!5e0!3m2!1sru!2skg!4v1"
            className="w-full h-[400px] md:h-[500px] border-0"
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ FOOTER — Navy with gold accent ═══════════════ */
function M4Footer({ t, lang }: { t: Tr; lang: string }) {
  const year = new Date().getFullYear();

  return (
    <footer id="m4-contacts" className="bg-[#0F2B46]">
      {/* Gold accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E8B86D] to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo + desc */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
                <path d="M6 22C10 18 14 12 18 8C22 12 26 18 30 22" stroke="#E8B86D" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M4 26C10 22 18 24 24 22C28 21 32 23 34 26" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
              <span className="text-white font-m4-display text-lg font-bold">АЛЫКУЛ</span>
            </div>
            <p className="text-white/60 text-sm font-m4-body leading-relaxed">{t.foot.desc}</p>
          </div>

          {/* Routes */}
          <div>
            <h4 className="uppercase text-xs font-semibold text-white/40 tracking-wider font-m4-body mb-4">{t.foot.routes}</h4>
            <div className="flex flex-col gap-3">
              <a href="#m4-fleet" className="text-white/60 text-sm hover:text-white transition-colors font-m4-body">{t.foot.cruises}</a>
              <a href="#m4-fleet" className="text-white/60 text-sm hover:text-white transition-colors font-m4-body">{t.foot.charters}</a>
              <a href="#m4-fleet" className="text-white/60 text-sm hover:text-white transition-colors font-m4-body">{t.foot.speed}</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="uppercase text-xs font-semibold text-white/40 tracking-wider font-m4-body mb-4">{t.foot.company}</h4>
            <div className="flex flex-col gap-3">
              <a href="#m4-reviews" className="text-white/60 text-sm hover:text-white transition-colors font-m4-body">{t.nav.reviews}</a>
              <a href="#m4-faq" className="text-white/60 text-sm hover:text-white transition-colors font-m4-body">FAQ</a>
              <a href={`/${lang}/trips`} className="text-white/60 text-sm hover:text-white transition-colors font-m4-body">{t.foot.trips}</a>
              <a href={`/${lang}/account`} className="text-white/60 text-sm hover:text-white transition-colors font-m4-body">{t.foot.account}</a>
              <a href={`/${lang}/privacy`} className="text-white/60 text-sm hover:text-white transition-colors font-m4-body">{t.foot.privacy}</a>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="uppercase text-xs font-semibold text-white/40 tracking-wider font-m4-body mb-4">{t.foot.contact}</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+996555123456" className="text-white/60 text-sm hover:text-white transition-colors font-m4-body">+996 555 123 456</a>
              <a href="mailto:info@alykul.kg" className="text-white/60 text-sm hover:text-white transition-colors font-m4-body">info@alykul.kg</a>
              <span className="text-white/60 text-sm font-m4-body">{ru(lang) ? 'Чолпон-Ата' : 'Cholpon-Ata'}</span>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm font-m4-body">&copy;{year} Алыкул. {t.foot.rights}</p>
          <div className="flex gap-6">
            {[
              { href: 'https://instagram.com', label: 'Instagram' },
              { href: 'https://t.me', label: 'Telegram' },
              { href: 'https://wa.me/996555123456', label: 'WhatsApp' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#E8B86D] transition-colors text-sm font-m4-body">{s.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function ru(lang: string) { return lang === 'ru'; }

/* ═══════════════ AI CHAT WIDGET ═══════════════ */
function M4AiChat() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Здравствуйте! Я AI-ассистент Алыкул. Чем могу помочь?' },
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
          className="fixed bottom-6 right-6 z-[10002] w-14 h-14 rounded-full bg-[#1E6FD9] shadow-2xl shadow-[#1E6FD9]/30 flex items-center justify-center text-white hover:scale-110 transition-transform"
          aria-label="AiChat">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path d="M12 3C6.5 3 2 6.58 2 11c0 2.13 1.02 4.05 2.67 5.47L3.5 21l4.6-2.26C9.3 19.24 10.62 19.5 12 19.5c5.5 0 10-3.58 10-8S17.5 3 12 3Z" fill="currentColor" opacity="0.2"/>
            <path d="M12 3C6.5 3 2 6.58 2 11c0 2.13 1.02 4.05 2.67 5.47L3.5 21l4.6-2.26C9.3 19.24 10.62 19.5 12 19.5c5.5 0 10-3.58 10-8S17.5 3 12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="8" cy="11" r="1" fill="currentColor"/><circle cx="12" cy="11" r="1" fill="currentColor"/><circle cx="16" cy="11" r="1" fill="currentColor"/>
          </svg>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-[10002] w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-[#F0F5FA] flex flex-col overflow-hidden" style={{ height: '500px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F5FA] bg-[#1E6FD9] text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 24c11.4-0 18-6.6 18-18C24 17.4 17.4 24 6 24ZM18 0C6.6 0 0 6.6 0 18 0 6.6 6.6 0 18 0Z"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold font-m4-body">AiChat</div>
                <div className="text-[10px] text-white/60 font-m4-body">Алыкул AI-ассистент</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white text-xl">&times;</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-m4-body">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  m.role === 'user' ? 'bg-[#1E6FD9] text-white rounded-br-sm' : 'bg-[#F0F5FA] text-[#0F2B46] rounded-bl-sm'
                }`}>{m.text}</div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-[#F0F5FA] p-3 flex gap-2">
            <input
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Спросите что-нибудь..."
              className="flex-1 bg-[#F0F5FA]/50 border border-[#F0F5FA] rounded-lg px-3 py-2 text-sm text-[#0F2B46] outline-none focus:border-[#1E6FD9]/30 font-m4-body"
            />
            <button onClick={send} className="w-9 h-9 rounded-lg bg-[#1E6FD9] text-white flex items-center justify-center hover:bg-[#1E6FD9]/80 transition-colors flex-shrink-0">
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
  if (ql.includes('цен') || ql.includes('стоим') || ql.includes('price')) return 'Закатный круиз — от 1 400 KGS, скоростной тур — от 2 000 KGS, приватный чартер — от 7 000 KGS. Подробнее в разделе Маршруты!';
  if (ql.includes('брон') || ql.includes('book')) return 'Для бронирования нажмите кнопку «Забронировать» на любом маршруте — вы будете перенаправлены в WhatsApp для подтверждения.';
  if (ql.includes('расписан') || ql.includes('schedule') || ql.includes('время')) return 'Рейсы с 1 июня по 15 сентября. Закатный круиз — 18:00, утренний — 10:00, скоростные туры — 12:00, 14:00, 16:00.';
  if (ql.includes('флот') || ql.includes('яхт') || ql.includes('fleet') || ql.includes('судн')) return 'У нас 8 судов: теплоход «Алыкул» (до 200 чел), яхта «Nomad» (до 12 чел, VIP), скоростные катера (до 60 км/ч).';
  if (ql.includes('дет') || ql.includes('kids') || ql.includes('ребён')) return 'Детские праздники на теплоходе — от 1 000 KGS/чел. Аниматоры, еда, безопасность. Доступны по выходным.';
  if (ql.includes('безопас') || ql.includes('safety')) return 'Все суда оснащены спасательными жилетами. Капитаны сертифицированы. Страховка включена.';
  return 'Спасибо за вопрос! Для подробной информации свяжитесь с нами по WhatsApp: +996 555 123 456 или выберите маршрут на сайте.';
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
      contacts: ru ? 'Контакты' : ky ? 'Байланыштар' : 'Contacts',
      book: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book',
    },
    hero: {
      line1: ru ? 'ОТКРОЙТЕ ИССЫК-КУЛЬ' : ky ? 'ЫСЫК-КӨЛДҮ АЧЫҢЫЗ' : 'DISCOVER ISSYK-KUL',
      line2: ru ? 'Премиальный отдых на воде' : ky ? 'Суудагы премиум эс алуу' : 'Premium water vacations',
      cta: ru ? 'Исследовать флот' : ky ? 'Флотту карап чыгуу' : 'Explore Fleet',
    },
    stats: {
      years: ru ? 'лет на озере' : ky ? 'жыл көлдө' : 'years on the lake',
      guests: ru ? 'довольных гостей' : ky ? 'ыраазы конок' : 'happy guests',
      vessels: ru ? 'судов' : ky ? 'кеме' : 'vessels',
      routes: ru ? 'маршрутов' : ky ? 'маршрут' : 'routes',
    },
    reviews: {
      title: ru ? 'Отзывы гостей' : ky ? 'Конок пикирлери' : 'Guest Reviews',
      sub: ru ? '12 000+ довольных гостей за 5 лет' : ky ? '5 жылда 12 000+ ыраазы конок' : '12,000+ happy guests over 5 years',
    },
    about: {
      title: ru ? 'О компании' : ky ? 'Биз жөнүндө' : 'About Us',
      intro: ru ? 'Алыкул — первый оператор цифрового бронирования водного транспорта на озере Иссык-Куль. Мы объединяем проверенный флот, опытных капитанов и современные технологии.' : ky ? 'Алыкул — Ысык-Көлдөгү биринчи санариптик суу транспортун брондоо оператору.' : 'Alykul is the first digital water transport booking operator on Lake Issyk-Kul, combining certified fleet, experienced captains, and modern technology.',
      services: [
        { icon: '⚡', title: ru ? 'Онлайн-бронирование' : ky ? 'Онлайн-брондоо' : 'Online Booking', desc: ru ? 'Выбирайте маршрут, дату и оплачивайте онлайн за 2 минуты' : ky ? '2 мүнөттө маршрутту тандап, онлайн төлөңүз' : 'Choose route, date, pay online in 2 minutes' },
        { icon: '⛵', title: ru ? 'Проверенный флот' : ky ? 'Текшерилген флот' : 'Certified Fleet', desc: ru ? 'Каждое судно сертифицировано и проходит ежедневный осмотр' : ky ? 'Ар бир кеме сертификатталган' : 'Every vessel certified and inspected daily' },
        { icon: '🏔️', title: ru ? '5+ лет опыта' : ky ? '5+ жыл тажрыйба' : '5+ Years', desc: ru ? 'Более 5 лет организации водных туров на Иссык-Куле' : ky ? 'Ысык-Көлдө 5 жылдан ашык суу турлары' : 'Over 5 years of water tours on Issyk-Kul' },
        { icon: '🛡️', title: ru ? 'Безопасность' : ky ? 'Коопсуздук' : 'Safety', desc: ru ? 'Спасательное оборудование, обученные капитаны, страховка' : ky ? 'Куткаруу жабдуулары, камсыздандыруу' : 'Safety equipment, trained captains, insurance' },
        { icon: '🌐', title: ru ? 'Мультиязычность' : ky ? 'Көп тилдүүлүк' : 'Multilingual', desc: ru ? 'Платформа на русском, кыргызском и английском' : ky ? 'Орусча, кыргызча жана англисче' : 'Platform in Russian, Kyrgyz, English' },
        { icon: '💎', title: ru ? 'Лучшие цены' : ky ? 'Эң жакшы баалар' : 'Best Prices', desc: ru ? 'Прямое бронирование без наценок посредников' : ky ? 'Ортомчуларсыз түз брондоо' : 'Direct booking, no middleman markups' },
      ],
    },
    gallery: {
      title: ru ? 'Галерея' : ky ? 'Галерея' : 'Gallery',
      sub: ru ? 'Моменты, которые вдохновляют' : ky ? 'Илхамдандырган учурлар' : 'Moments that inspire',
      c1: ru ? 'Закатный круиз' : ky ? 'Күн батыш круизи' : 'Sunset Cruise',
      c2: ru ? 'Утренний круиз' : ky ? 'Эртеңки круиз' : 'Morning Cruise',
      c3: ru ? 'Теплоход «Алыкул»' : ky ? '«Алыкул» теплоходу' : 'Steamship "Alykul"',
      c4: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter',
      c5: ru ? 'Скоростной тур' : ky ? 'Ылдам тур' : 'Speed Tour',
      c6: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : "Kids' Party",
    },
    fleet: {
      title: ru ? 'Наш флот' : ky ? 'Биздин флот' : 'Our Fleet',
      sub: ru ? 'Сертифицированные суда с ежедневным техосмотром' : ky ? 'Күн сайын текшерилген кемелер' : 'Certified vessels with daily inspection',
      items: [
        { img: '/images/q02.jpg', name: ru ? 'Теплоход «Алыкул»' : ky ? '«Алыкул» теплоходу' : 'Steamship "Alykul"', desc: ru ? 'Флагман флота. Круизы, корпоративы, свадьбы, детские праздники.' : ky ? 'Флоттун флагманы. Круиздер, корпоративдер.' : 'Fleet flagship. Cruises, events, weddings, kids parties.', specs: [ru ? 'до 200 чел' : 'up to 200 pax', ru ? '2 палубы' : '2 decks', ru ? 'банкетный зал' : 'banquet hall'] },
        { img: '/images/ep03.jpg', name: ru ? 'Яхта «Nomad»' : ky ? '«Nomad» яхтасы' : 'Yacht "Nomad"', desc: ru ? 'Приватные чартеры, романтические прогулки, VIP-обслуживание.' : ky ? 'Жеке чартерлер, VIP кызмат.' : 'Private charters, romantic walks, VIP service.', specs: [ru ? 'до 12 чел' : 'up to 12 pax', ru ? 'парусная' : 'sailing'] },
        { img: '/images/scene6.jpg', name: ru ? 'Скоростные катера' : ky ? 'Ылдам катерлер' : 'Speedboats', desc: ru ? 'Адреналиновые туры, водные лыжи, вейкборд, рыбалка.' : ky ? 'Адреналин турлары, суу лыжалары.' : 'Adrenaline tours, water skiing, wakeboarding, fishing.', specs: [ru ? 'до 8 чел' : 'up to 8 pax', ru ? 'до 60 км/ч' : 'up to 60 km/h'] },
      ],
    },
    faq: {
      title: ru ? 'Частые вопросы' : ky ? 'Көп берилүүчү суроолор' : 'FAQ',
      items: [
        { q: ru ? 'Как забронировать круиз?' : ky ? 'Круизди кантип брондойм?' : 'How to book a cruise?', a: ru ? 'Выберите маршрут на сайте, укажите дату и количество гостей. Бронирование через WhatsApp занимает 2 минуты. Оплата на месте или онлайн.' : ky ? 'Сайттан маршрутту тандаңыз. WhatsApp аркылуу 2 мүнөттө брондоо.' : 'Choose a route, select date and guests. WhatsApp booking takes 2 minutes. Pay on-site or online.' },
        { q: ru ? 'Какие документы нужны для посадки?' : ky ? 'Кайсы документтер керек?' : 'What documents are needed?', a: ru ? 'Только удостоверение личности. Для детей до 14 лет — свидетельство о рождении. Иностранным гражданам — паспорт.' : ky ? 'Жеке документ гана. 14 жашка чейинкилерге — туулгандыгы жөнүндө күбөлүк.' : 'Only ID. Children under 14 — birth certificate. Foreign citizens — passport.' },
        { q: ru ? 'Можно ли отменить бронирование?' : ky ? 'Брондоону жокко чыгарса болобу?' : 'Can I cancel a booking?', a: ru ? 'Да, бесплатная отмена за 24 часа до отправления. При отмене менее чем за 24 часа — удерживается 20% стоимости.' : ky ? 'Ооба, 24 саат мурун акысыз жокко чыгаруу.' : 'Yes, free cancellation 24h before departure. Less than 24h — 20% fee.' },
        { q: ru ? 'Есть ли спасательное оборудование?' : ky ? 'Куткаруу жабдуулары барбы?' : 'Is there safety equipment?', a: ru ? 'Все суда оснащены спасательными жилетами, кругами и аптечкой. Капитаны сертифицированы и проходят ежегодную аттестацию.' : ky ? 'Бардык кемелерде куткаруу жилеттери, чөмөлөлөр жана дарыкана бар.' : 'All vessels have life jackets, rings and first aid. Captains are certified annually.' },
        { q: ru ? 'Работаете ли вы в плохую погоду?' : ky ? 'Жаман аба ырайында иштейсизби?' : 'Do you operate in bad weather?', a: ru ? 'Безопасность — приоритет. При штормовом предупреждении рейсы переносятся. Мы уведомляем за 2 часа до отправления.' : ky ? 'Коопсуздук — артыкчылык. Бороондо рейстер которулат.' : 'Safety first. Cruises reschedule in storms. We notify 2 hours before departure.' },
      ],
    },
    map: {
      title: ru ? 'Как нас найти' : ky ? 'Бизди кантип табасыз' : 'Find Us',
      sub: ru ? 'Причал в Чолпон-Ате, северный берег озера Иссык-Куль' : ky ? 'Чолпон-Атадагы причал' : 'Pier in Cholpon-Ata, northern shore of Lake Issyk-Kul',
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
    trust: {
      items: [
        { icon: '🛡️', text: ru ? 'Сертифицированный флот' : ky ? 'Сертификатталган флот' : 'Certified Fleet' },
        { icon: '🔍', text: ru ? 'Ежедневный осмотр' : ky ? 'Күн сайын текшерүү' : 'Daily Inspection' },
        { icon: '🦺', text: ru ? 'Спасательное оборудование' : ky ? 'Куткаруу жабдуулары' : 'Safety Equipment' },
        { icon: '📋', text: ru ? 'Страховка включена' : ky ? 'Камсыздандыруу кирген' : 'Insurance Included' },
      ],
    },
    catalog: {
      title: ru ? 'Маршруты и цены' : ky ? 'Маршруттар жана баалар' : 'Routes & Prices',
      bookBtn: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book Now',
      items: [
        { img: '/images/q02.jpg', name: ru ? 'Закатный круиз' : ky ? 'Күн батыш круизи' : 'Sunset Cruise', category: ru ? 'Круиз' : ky ? 'Круиз' : 'Cruise', price: ru ? 'от 1 400 KGS' : ky ? '1 400 KGS ден' : 'from 1,400 KGS' },
        { img: '/images/ep03.jpg', name: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter', category: ru ? 'VIP' : 'VIP', price: ru ? 'от 7 000 KGS' : ky ? '7 000 KGS ден' : 'from 7,000 KGS' },
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
        { route: ru ? 'Закатный круиз' : ky ? 'Күн батыш круизи' : 'Sunset Cruise', time: '18:00', duration: ru ? '2 часа' : ky ? '2 саат' : '2 hours', freq: ru ? 'Ежедневно' : ky ? 'Күн сайын' : 'Daily', freqColor: 'bg-green-100 text-green-700', price: '1 400 KGS' },
        { route: ru ? 'Утренний круиз' : ky ? 'Эртеңки круиз' : 'Morning Cruise', time: '10:00', duration: ru ? '1.5 часа' : ky ? '1.5 саат' : '1.5 hours', freq: ru ? 'Ежедневно' : ky ? 'Күн сайын' : 'Daily', freqColor: 'bg-green-100 text-green-700', price: '1 200 KGS' },
        { route: ru ? 'Скоростной тур' : ky ? 'Ылдам тур' : 'Speed Tour', time: '12:00, 14:00, 16:00', duration: ru ? '45 мин' : ky ? '45 мүн' : '45 min', freq: ru ? '3 раза/день' : ky ? '3 жолу/күн' : '3x/day', freqColor: 'bg-blue-100 text-blue-700', price: '2 000 KGS' },
        { route: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter', time: ru ? 'По запросу' : ky ? 'Суроо боюнча' : 'On request', duration: ru ? '2-4 часа' : ky ? '2-4 саат' : '2-4 hours', freq: ru ? 'По запросу' : ky ? 'Суроо боюнча' : 'On request', freqColor: 'bg-orange-100 text-orange-700', price: '7 000 KGS' },
        { route: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : "Kids' Party", time: ru ? 'Выходные 11:00' : ky ? 'Дем алыш 11:00' : 'Weekends 11:00', duration: ru ? '2 часа' : ky ? '2 саат' : '2 hours', freq: ru ? 'Выходные' : ky ? 'Дем алыш' : 'Weekends', freqColor: 'bg-orange-100 text-orange-700', price: '1 000 KGS/чел' },
      ],
    },
  };
}
