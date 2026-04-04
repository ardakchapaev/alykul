'use client';

import { useTheme, THEMES } from '@/lib/theme-context';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ScrollReveal } from './M3Animations';
import WeatherWidget from './WeatherWidget';
import CurrencySelector from './CurrencySelector';

/* ═══════════════ TORN EDGE SVG ═══════════════ */
const TornEdgeTop = ({ from, to }: { from: string; to: string }) => (
  <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block -mb-[1px]" style={{ height: 'clamp(40px, 5vw, 80px)' }}>
    <path
      d={`M0,0 L0,45 L18,52 L35,38 L52,55 L68,42 L90,58 L108,35 L130,50 L148,40 L170,60 L192,32 L210,48 L235,55 L258,36 L280,52 L300,40 L325,58 L348,30 L370,50 L395,42 L418,56 L440,35 L465,52 L488,45 L510,58 L535,32 L558,50 L580,38 L605,55 L628,42 L650,58 L675,30 L698,48 L720,55 L745,36 L768,52 L790,40 L815,58 L838,32 L860,50 L885,42 L908,56 L930,35 L955,52 L978,45 L1000,58 L1025,32 L1048,50 L1070,38 L1095,55 L1118,42 L1140,58 L1165,30 L1188,48 L1210,55 L1235,36 L1258,52 L1280,40 L1305,58 L1328,32 L1350,50 L1375,42 L1398,56 L1420,35 L1440,48 L1440,0 Z`}
      fill={from}
    />
    <path
      d={`M0,45 L18,52 L35,38 L52,55 L68,42 L90,58 L108,35 L130,50 L148,40 L170,60 L192,32 L210,48 L235,55 L258,36 L280,52 L300,40 L325,58 L348,30 L370,50 L395,42 L418,56 L440,35 L465,52 L488,45 L510,58 L535,32 L558,50 L580,38 L605,55 L628,42 L650,58 L675,30 L698,48 L720,55 L745,36 L768,52 L790,40 L815,58 L838,32 L860,50 L885,42 L908,56 L930,35 L955,52 L978,45 L1000,58 L1025,32 L1048,50 L1070,38 L1095,55 L1118,42 L1140,58 L1165,30 L1188,48 L1210,55 L1235,36 L1258,52 L1280,40 L1305,58 L1328,32 L1350,50 L1375,42 L1398,56 L1420,35 L1440,48 L1440,80 L0,80 Z`}
      fill={to}
    />
  </svg>
);

const TornEdgeBottom = ({ from, to }: { from: string; to: string }) => (
  <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block -mt-[1px]" style={{ height: 'clamp(40px, 5vw, 80px)' }}>
    <path
      d={`M0,80 L0,35 L22,28 L45,42 L65,25 L88,38 L112,22 L135,40 L155,28 L180,45 L205,20 L228,38 L250,30 L275,48 L298,22 L322,40 L345,28 L370,45 L395,18 L418,38 L440,30 L465,48 L488,22 L512,40 L535,28 L560,45 L585,18 L608,38 L630,30 L655,48 L678,22 L702,40 L725,28 L750,45 L775,18 L798,38 L820,30 L845,48 L868,22 L892,40 L915,28 L940,45 L965,18 L988,38 L1010,30 L1035,48 L1058,22 L1082,40 L1105,28 L1130,45 L1155,18 L1178,38 L1200,30 L1225,48 L1248,22 L1272,40 L1295,28 L1320,45 L1345,18 L1368,38 L1390,30 L1415,48 L1440,35 L1440,80 Z`}
      fill={from}
    />
    <path
      d={`M0,0 L0,35 L22,28 L45,42 L65,25 L88,38 L112,22 L135,40 L155,28 L180,45 L205,20 L228,38 L250,30 L275,48 L298,22 L322,40 L345,28 L370,45 L395,18 L418,38 L440,30 L465,48 L488,22 L512,40 L535,28 L560,45 L585,18 L608,38 L630,30 L655,48 L678,22 L702,40 L725,28 L750,45 L775,18 L798,38 L820,30 L845,48 L868,22 L892,40 L915,28 L940,45 L965,18 L988,38 L1010,30 L1035,48 L1058,22 L1082,40 L1105,28 L1130,45 L1155,18 L1178,38 L1200,30 L1225,48 L1248,22 L1272,40 L1295,28 L1320,45 L1345,18 L1368,38 L1390,30 L1415,48 L1440,35 L1440,0 Z`}
      fill={to}
    />
  </svg>
);

/* ═══════════════ MAIN WRAPPER ═══════════════ */
export default function SaileyBlogWrapper({ lang }: { lang: string }) {
  const { theme } = useTheme();
  if (theme !== 'M2') return null;

  const t = getTrans(lang);

  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-auto font-m3-body">
      <M2Nav lang={lang} t={t} />
      <M2Hero t={t} />
      <TornEdgeTop from="#008B8B" to="#ffffff" />
      <M2BlogCards t={t} lang={lang} />
      <M2Catalog t={t} lang={lang} />
      <TornEdgeBottom from="#ffffff" to="#f7f9fb" />
      <M2Schedule t={t} lang={lang} />
      <TornEdgeTop from="#f7f9fb" to="#ffffff" />
      <M2BookingWidget t={t} lang={lang} />
      <M2TrustBadges t={t} />
      <TornEdgeBottom from="#ffffff" to="#f7f9fb" />
      <M2Reviews t={t} />
      <TornEdgeTop from="#f7f9fb" to="#ffffff" />
      <M2FAQ t={t} />
      <M2Map t={t} />
      <TornEdgeBottom from="#ffffff" to="#1a3a4a" />
      <M2Footer t={t} lang={lang} />
    </div>
  );
}

/* ═══════════════ NAVBAR ═══════════════ */
function M2Nav({ lang, t }: { lang: string; t: Tr }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#m2-blog', label: t.nav.fleet },
    { href: '#m2-catalog', label: t.nav.routes },
    { href: '#m2-schedule', label: t.nav.schedule },
    { href: '#m2-reviews', label: t.nav.reviews },
    { href: '#m2-contacts', label: t.nav.contacts },
  ];
  const langLabels: Record<string, string> = { ru: 'RU', en: 'EN', ky: 'KY' };
  const themes = THEMES;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-500 ${
      scrolled ? 'bg-[#007878]/95 backdrop-blur-xl shadow-2xl py-2' : 'bg-[#008B8B] py-4'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
            <path d="M8 28Q14 22 18 12Q22 22 28 28" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M6 30Q12 26 18 28Q24 30 30 26" stroke="#B2DFDB" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <span className="text-white font-m3-display text-lg font-bold tracking-wide hidden sm:block">
            {t.brand}
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white/80 text-[13px] font-medium tracking-[1px] hover:text-white transition-colors">{l.label}</a>
          ))}
          <a href={`/${lang}/trips`} className="bg-white text-[#008B8B] px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors">
            {t.nav.booking}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <CurrencySelector />
          {/* Lang */}
          <div className="relative">
            <button onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); }}
              className="flex items-center gap-1 text-white/70 text-xs font-semibold hover:text-white transition-colors px-2 py-1.5">
              {langLabels[lang] || 'RU'}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#006565]/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                {['ru', 'en', 'ky'].map(l => (
                  <a key={l} href={`/${l}`} onClick={() => setLangOpen(false)}
                    className={`block px-4 py-2 text-xs font-medium ${l === lang ? 'text-[#B2DFDB] bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>{langLabels[l]}</a>
                ))}
              </div>
            )}
          </div>
          {/* Theme */}
          <div className="relative hidden lg:block">
            <button onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); }}
              className="flex items-center gap-1 text-white/70 text-xs font-semibold hover:text-white transition-colors px-2 py-1.5">
              {theme}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {themeOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#006565]/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                {themes.map(th => (
                  <button key={th} onClick={() => { setTheme(th); setThemeOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-xs font-medium ${th === theme ? 'text-[#B2DFDB] bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>{th}</button>
                ))}
              </div>
            )}
          </div>
          {/* Auth */}
          {user ? (
            <a href={`/${lang}/account`} className="flex items-center gap-1.5 text-white/80 text-xs font-medium hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span className="hidden sm:inline">{user.name || user.phone.slice(-4)}</span>
            </a>
          ) : (
            <a href={`/${lang}/auth`} className="bg-[#008B8B] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#007777] transition-colors">
              {lang === 'ru' ? 'Войти' : lang === 'ky' ? 'Кирүү' : 'Sign In'}
            </a>
          )}
          {/* Burger */}
          <button className="lg:hidden flex flex-col gap-1.5 w-6 ml-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <span className={`h-[2px] w-full bg-white transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`h-[2px] w-full bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-full bg-white transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 bg-[#006565]/[0.98] z-[10001] flex flex-col items-center justify-center gap-6 lg:hidden">
          <button className="absolute top-4 right-5 text-white text-3xl" onClick={() => setOpen(false)}>&times;</button>
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white font-m3-display text-2xl hover:text-[#B2DFDB] transition-colors" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href={`/${lang}/trips`} className="bg-white text-[#008B8B] px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/90 transition-colors" onClick={() => setOpen(false)}>
            {t.nav.booking}
          </a>
          {/* Mobile Auth */}
          {user ? (
            <a href={`/${lang}/account`} className="flex items-center gap-2 text-white text-lg hover:text-[#B2DFDB] transition-colors" onClick={() => setOpen(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              {user.name || user.phone.slice(-4)}
            </a>
          ) : (
            <a href={`/${lang}/auth`} className="bg-white text-[#008B8B] px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/90 transition-colors" onClick={() => setOpen(false)}>
              {lang === 'ru' ? 'Войти' : lang === 'ky' ? 'Кирүү' : 'Sign In'}
            </a>
          )}
          <div className="flex gap-3 mt-6 border-t border-white/10 pt-6">
            {themes.map(th => (
              <button key={th} onClick={() => { setTheme(th); setOpen(false); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${th === theme ? 'bg-white text-[#008B8B]' : 'border border-white/20 text-white/60 hover:text-white'}`}>{th}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════ HERO ═══════════════ */
function M2Hero({ t }: { t: Tr }) {
  return (
    <section className="relative bg-[#008B8B] pt-28 pb-16 md:pt-36 md:pb-24 text-center overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/images/ocean-texture.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#008B8B]/80 to-[#008B8B]" />
      <div className="absolute top-20 right-4 z-10 hidden lg:block"><WeatherWidget variant="dark" /></div>

      <div className="relative z-10 px-6 max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-[#B2DFDB] text-sm uppercase tracking-[3px] mb-4 font-m3-body">{t.hero.subtitle}</p>
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] font-m3-display mb-6">
            {t.hero.title}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-m3-body">
            {t.hero.desc}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ BLOG CARDS (3x3 grid) ═══════════════ */
function M2BlogCards({ t, lang }: { t: Tr; lang: string }) {
  return (
    <section id="m2-blog" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a4a] mb-3 font-m3-display">{t.blog.title}</h2>
            <div className="w-16 h-[3px] bg-[#008B8B] mx-auto rounded-full mb-4" />
            <p className="text-gray-500 max-w-lg mx-auto">{t.blog.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.blog.cards.map((card, i) => (
            <ScrollReveal key={i}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#008B8B] text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-semibold">
                    {card.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-[#1a3a4a] mb-2 font-m3-display group-hover:text-[#008B8B] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{card.desc}</p>
                  <a
                    href={`/${lang}/trips`}
                    className="inline-flex items-center gap-2 text-[#008B8B] font-semibold text-sm hover:gap-3 transition-all"
                  >
                    {t.blog.learnMore}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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

/* ═══════════════ CATALOG (4 cards with prices) ═══════════════ */
function M2Catalog({ t, lang }: { t: Tr; lang: string }) {
  return (
    <section id="m2-catalog" className="py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-[#008B8B] text-xs font-semibold uppercase tracking-[2px]">{t.catalog.badge}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a4a] mt-2 mb-3 font-m3-display">{t.catalog.title}</h2>
            <div className="w-16 h-[3px] bg-[#008B8B] mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.catalog.items.map((item, i) => (
            <ScrollReveal key={i}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group">
                <div className="relative h-[200px] overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base text-[#1a3a4a] mb-1 font-m3-display">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#008B8B] font-bold text-lg">{item.price}</span>
                    <a
                      href={`/${lang}/trips`}
                      className="bg-[#008B8B] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#007878] transition-colors"
                    >
                      {t.catalog.book}
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SCHEDULE TABLE ═══════════════ */
function M2Schedule({ t, lang }: { t: Tr; lang: string }) {
  return (
    <section id="m2-schedule" className="py-16 md:py-20 bg-[#f7f9fb]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-[#008B8B] text-xs font-semibold uppercase tracking-[2px]">{t.schedule.badge}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a4a] mt-2 mb-3 font-m3-display">{t.schedule.title}</h2>
            <p className="text-gray-500 text-sm">{t.schedule.sub}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-[#008B8B] text-white text-sm font-semibold">
                  <th className="text-left py-4 px-5">{t.schedule.col_route}</th>
                  <th className="text-left py-4 px-5">{t.schedule.col_time}</th>
                  <th className="text-left py-4 px-5">{t.schedule.col_duration}</th>
                  <th className="text-left py-4 px-5">{t.schedule.col_price}</th>
                  <th className="py-4 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {t.schedule.rows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-[#f0fafa] transition-colors">
                    <td className="py-3.5 px-5 text-sm font-medium text-[#1a3a4a]">{row.route}</td>
                    <td className="py-3.5 px-5 text-sm text-gray-600">{row.time}</td>
                    <td className="py-3.5 px-5 text-sm text-gray-600">{row.duration}</td>
                    <td className="py-3.5 px-5 text-sm font-semibold text-[#008B8B]">{row.price}</td>
                    <td className="py-3.5 px-5">
                      <a href={`/${lang}/trips`} className="bg-[#008B8B] text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-[#007878] transition-colors">
                        {t.catalog.book}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ BOOKING WIDGET ═══════════════ */
function M2BookingWidget({ t, lang }: { t: Tr; lang: string }) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="bg-[#008B8B] rounded-2xl p-8 md:p-10 shadow-xl">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 text-center font-m3-display">{t.booking.title}</h3>
            <p className="text-[#B2DFDB] text-sm text-center mb-8">{t.booking.subtitle}</p>
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="flex-1">
                <label className="text-white/60 text-xs mb-1 block">{t.booking.pier}</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-white/40 appearance-none cursor-pointer">
                  <option value="cholpon">{t.booking.piers.cholpon}</option>
                  <option value="bosteri">{t.booking.piers.bosteri}</option>
                  <option value="tamga">{t.booking.piers.tamga}</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-white/60 text-xs mb-1 block">{t.booking.date}</label>
                <input type="date" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-white/40 [color-scheme:dark]" />
              </div>
              <div className="flex-1">
                <label className="text-white/60 text-xs mb-1 block">{t.booking.guests}</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-white/40 appearance-none cursor-pointer">
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {t.booking.guestLabel}</option>)}
                  <option value="10+">10+</option>
                </select>
              </div>
              <a href={`/${lang}/trips`} className="bg-white text-[#008B8B] font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors text-center whitespace-nowrap self-end">
                {t.booking.search}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ TRUST BADGES ═══════════════ */
function M2TrustBadges({ t }: { t: Tr }) {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.trust.items.map((item, i) => (
            <ScrollReveal key={i}>
              <div className="text-center p-6 rounded-xl border border-gray-100 hover:border-[#008B8B]/30 hover:shadow-md transition-all group">
                <div className="w-14 h-14 rounded-full bg-[#008B8B]/10 flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-[#008B8B] group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h4 className="font-bold text-sm text-[#1a3a4a] mb-1">{item.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ REVIEWS ═══════════════ */
function M2Reviews({ t }: { t: Tr }) {
  return (
    <section id="m2-reviews" className="py-16 md:py-20 bg-[#f7f9fb]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-[#008B8B] text-xs font-semibold uppercase tracking-[2px]">{t.reviews.badge}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a4a] mt-2 mb-3 font-m3-display">{t.reviews.title}</h2>
            <p className="text-gray-500 text-sm">{t.reviews.sub}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {t.reviews.items.map((review, i) => (
            <ScrollReveal key={i}>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} className={`w-4 h-4 ${si < review.stars ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image src={review.img} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#1a3a4a]">{review.name}</div>
                    <div className="text-gray-400 text-xs">{review.city}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ FAQ ═══════════════ */
function M2FAQ({ t }: { t: Tr }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a4a] font-m3-display">{t.faq.title}</h2>
            <div className="w-16 h-[3px] bg-[#008B8B] mx-auto rounded-full mt-3" />
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <ScrollReveal key={i}>
              <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#008B8B]/30 transition-colors">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-sm text-[#1a3a4a]">{item.q}</span>
                  <svg
                    className={`w-5 h-5 text-[#008B8B] flex-shrink-0 transition-transform ${openIdx === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {openIdx === i && (
                  <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
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
function M2Map({ t }: { t: Tr }) {
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
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a4a] font-m3-display">{t.contact.title}</h2>
            <p className="text-gray-500 text-sm mt-2">{t.map.sub}</p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Form + Contacts */}
          <ScrollReveal>
            <div>
              {contactSent ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">&#10003;</div>
                  <p className="text-[#008B8B] font-semibold text-lg">{t.contact.sent}</p>
                </div>
              ) : (
                <form className="space-y-4 mb-8" onSubmit={(e) => { e.preventDefault(); handleContact(); }}>
                  <input type="text" placeholder={t.contact.name} value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#008B8B] focus:ring-1 focus:ring-[#008B8B] rounded-xl outline-none transition-colors font-m3-body" />
                  <input type="tel" placeholder={t.contact.phone} value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#008B8B] focus:ring-1 focus:ring-[#008B8B] rounded-xl outline-none transition-colors font-m3-body" />
                  <textarea placeholder={t.contact.message} rows={3} value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#008B8B] focus:ring-1 focus:ring-[#008B8B] rounded-xl outline-none transition-colors resize-none font-m3-body" />
                  <button type="submit" className="w-full py-3 bg-[#008B8B] hover:bg-[#007777] text-white rounded-xl font-semibold transition-colors font-m3-body">
                    {t.contact.send}
                  </button>
                </form>
              )}
              <div className="space-y-3">
                <a href="tel:+996555123456" className="flex items-center gap-3 text-[#1a3a4a] hover:text-[#008B8B] transition-colors text-sm font-m3-body">
                  <span>&#128241;</span> +996 555 123 456
                </a>
                <a href="mailto:info@alykul.kg" className="flex items-center gap-3 text-[#1a3a4a] hover:text-[#008B8B] transition-colors text-sm font-m3-body">
                  <span>&#128231;</span> info@alykul.kg
                </a>
                <a href="https://wa.me/996555123456" className="flex items-center gap-3 text-[#1a3a4a] hover:text-[#008B8B] transition-colors text-sm font-m3-body">
                  <span>&#128172;</span> WhatsApp
                </a>
                <a href="https://t.me/alykul_bot" className="flex items-center gap-3 text-[#1a3a4a] hover:text-[#008B8B] transition-colors text-sm font-m3-body">
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
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186964.5684587!2d76.89!3d42.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c5e2e27a3b%3A0x6f2a7c29d3f4d8a1!2z0KfQvtC70L_QvtC9LdCQ0YLQsA!5e0!3m2!1sru!2skg!4v1"
                className="w-full h-full min-h-[400px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ FOOTER ═══════════════ */
function M2Footer({ t, lang }: { t: Tr; lang: string }) {
  return (
    <footer id="m2-contacts" className="bg-[#1a3a4a] text-white/70 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Logo + description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
                <path d="M8 28Q14 22 18 12Q22 22 28 28" stroke="#008B8B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M6 30Q12 26 18 28Q24 30 30 26" stroke="#B2DFDB" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
              <span className="text-white font-m3-display text-lg font-bold">{t.brand}</span>
            </div>
            <p className="text-sm leading-relaxed">{t.foot.desc}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{t.foot.nav_title}</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#m2-blog" className="text-sm hover:text-white transition-colors">{t.nav.fleet}</a>
              <a href="#m2-catalog" className="text-sm hover:text-white transition-colors">{t.nav.routes}</a>
              <a href="#m2-schedule" className="text-sm hover:text-white transition-colors">{t.nav.schedule}</a>
              <a href="#m2-reviews" className="text-sm hover:text-white transition-colors">{t.nav.reviews}</a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{t.foot.links_title}</h4>
            <div className="flex flex-col gap-2.5">
              <a href={`/${lang}/trips`} className="text-sm hover:text-white transition-colors">{t.nav.booking}</a>
              <a href={`/${lang}/account`} className="text-sm hover:text-white transition-colors">{t.foot.account}</a>
              <a href={`/${lang}/about`} className="text-sm hover:text-white transition-colors">{t.foot.about || 'О компании'}</a>
              <a href={`/${lang}/gifts`} className="text-sm hover:text-white transition-colors">{t.foot.gifts || 'Подарки'}</a>
              <a href={`/${lang}/group-booking`} className="text-sm hover:text-white transition-colors">{t.foot.groups || 'Группы'}</a>
              <a href={`/${lang}/privacy`} className="text-sm hover:text-white transition-colors">{t.foot.privacy}</a>
              <a href={`/${lang}/faq`} className="text-sm hover:text-white transition-colors">FAQ</a>
              <a href={`/${lang}/contact`} className="text-sm hover:text-white transition-colors">{lang === 'ru' ? 'Контакты' : lang === 'ky' ? 'Байланыштар' : 'Contact'}</a>
              <a href={`/${lang}/blog`} className="text-sm hover:text-white transition-colors">{lang === 'ru' ? 'Блог' : 'Blog'}</a>
              <a href={`/${lang}/terms`} className="text-sm hover:text-white transition-colors">{lang === 'ru' ? 'Условия' : lang === 'ky' ? 'Шарттар' : 'Terms'}</a>
              <a href={`/${lang}/partners`} className="text-sm hover:text-white transition-colors">{lang === 'ru' ? 'Партнёрам' : lang === 'ky' ? 'Өнөктөштөргө' : 'Partners'}</a>
              <a href={`/${lang}/careers`} className="text-sm hover:text-white transition-colors">{lang === 'ru' ? 'Карьера' : lang === 'ky' ? 'Карьера' : 'Careers'}</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{t.nav.contacts}</h4>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+996555123456" className="text-sm hover:text-white transition-colors">+996 555 123 456</a>
              <a href="mailto:info@alykul.kg" className="text-sm hover:text-white transition-colors">info@alykul.kg</a>
              <span className="text-sm">{t.foot.address}</span>
              <a href="https://t.me/alykul_bot" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors mt-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                @alykul_bot
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 text-center text-sm text-white/40">
          &copy; 2026 {t.brand}. {t.foot.rights}
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
    brand: ru ? 'АЛЫКУЛ' : ky ? 'АЛЫКУЛ' : 'ALYKUL',
    nav: {
      fleet: ru ? 'Флот' : ky ? 'Флот' : 'Fleet',
      routes: ru ? 'Маршруты' : ky ? 'Маршруттар' : 'Routes',
      schedule: ru ? 'Расписание' : ky ? 'Расписание' : 'Schedule',
      about: ru ? 'О нас' : ky ? 'Биз жөнүндө' : 'About',
      booking: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book Now',
      reviews: ru ? 'Отзывы' : ky ? 'Пикирлер' : 'Reviews',
      contacts: ru ? 'Контакты' : ky ? 'Байланыштар' : 'Contacts',
    },
    hero: {
      subtitle: ru ? 'Откройте для себя Иссык-Куль' : ky ? 'Ысык-Көлдү ачыңыз' : 'Discover Issyk-Kul',
      title: ru ? 'Блог и маршруты' : ky ? 'Блог жана маршруттар' : 'Blog & Routes',
      desc: ru
        ? 'Лучшие водные приключения на озере Иссык-Куль. Круизы, чартеры, скоростные туры и незабываемые закаты.'
        : ky
        ? 'Ысык-Көлдөгү эң жакшы суу укмуштуулуктары. Круиздер, чартерлер, ылдам турлар.'
        : 'The best water adventures on Lake Issyk-Kul. Cruises, charters, speed tours and unforgettable sunsets.',
    },
    blog: {
      title: ru ? 'Наши приключения' : ky ? 'Биздин укмуштуулуктар' : 'Our Adventures',
      subtitle: ru
        ? 'Истории, маршруты и впечатления с озера Иссык-Куль'
        : ky
        ? 'Ысык-Көлдөн окуялар, маршруттар жана таасирлер'
        : 'Stories, routes and experiences from Lake Issyk-Kul',
      learnMore: ru ? 'Подробнее' : ky ? 'Толугураак' : 'Learn More',
      cards: [
        {
          img: '/images/q02.jpg',
          tag: ru ? 'Круиз' : ky ? 'Круиз' : 'Cruise',
          title: ru ? 'Закатный круиз' : ky ? 'Күн батыш круизи' : 'Sunset Cruise',
          desc: ru
            ? 'Незабываемый вечер на теплоходе «Алыкул» с видом на горы Тянь-Шаня и закат над озером. Два часа умиротворения и красоты.'
            : ky
            ? 'Тянь-Шань тоолоруна жана көлгө батып бараткан күнгө карай «Алыкул» теплоходунда эстен кеткис кеч.'
            : 'An unforgettable evening on the steamship Alykul with views of the Tian Shan mountains and sunset over the lake.',
        },
        {
          img: '/images/ep03.jpg',
          tag: ru ? 'Чартер' : ky ? 'Чартер' : 'Charter',
          title: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter',
          desc: ru
            ? 'Яхта «Nomad» для приватных прогулок. VIP-обслуживание, романтика, до 12 гостей. Идеально для особых моментов.'
            : ky
            ? '«Nomad» яхтасы жеке сейилдөө үчүн. VIP тейлөө, романтика, 12 конокко чейин.'
            : 'Yacht Nomad for private walks. VIP service, romance, up to 12 guests. Perfect for special moments.',
        },
        {
          img: '/images/scene6.jpg',
          tag: ru ? 'Адреналин' : ky ? 'Адреналин' : 'Adrenaline',
          title: ru ? 'Скоростной тур' : ky ? 'Ылдам тур' : 'Speed Tour',
          desc: ru
            ? 'Адреналин на скоростных катерах до 60 км/ч по волнам Иссык-Куля. Вейкборд, водные лыжи, рыбалка.'
            : ky
            ? 'Ысык-Көлдүн толкундарында 60 км/с чейин ылдам катерлерде адреналин.'
            : 'Adrenaline on speedboats up to 60 km/h on the waves of Issyk-Kul. Wakeboarding, water skiing, fishing.',
        },
        {
          img: '/images/kids.jpg',
          tag: ru ? 'Дети' : ky ? 'Балдар' : 'Kids',
          title: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : "Kids' Party",
          desc: ru
            ? 'Праздник для детей на борту теплохода с аниматорами и развлекательной программой. Безопасность на первом месте.'
            : ky
            ? 'Теплоходдо аниматорлор менен балдар майрамы. Коопсуздук биринчи орунда.'
            : 'Kids celebration on board with animators and entertainment program. Safety comes first.',
        },
        {
          img: '/images/alykul1.jpg',
          tag: ru ? 'Флагман' : ky ? 'Флагман' : 'Flagship',
          title: ru ? 'Яхта Nomad' : ky ? 'Nomad яхтасы' : 'Yacht Nomad',
          desc: ru
            ? 'Элегантная парусная яхта для приватных мероприятий. Корпоративы, свадьбы, романтические прогулки по озеру.'
            : ky
            ? 'Жеке иш-чаралар үчүн элеганттуу парус яхтасы. Корпоративдер, тойлор, романтикалык сейилдөө.'
            : 'Elegant sailing yacht for private events. Corporate events, weddings, romantic walks on the lake.',
        },
        {
          img: '/images/q01.jpg',
          tag: ru ? 'Флагман' : ky ? 'Флагман' : 'Flagship',
          title: ru ? 'Теплоход Алыкул' : ky ? 'Алыкул теплоходу' : 'Steamship Alykul',
          desc: ru
            ? 'Флагман флота вместимостью до 200 гостей. Два палубы, банкетный зал, панорамный вид на горы и озеро.'
            : ky
            ? 'Флоттун флагманы 200 конокко чейин. Эки палуба, банкет залы, тоолорго жана көлгө панорамалык көрүнүш.'
            : 'Fleet flagship with capacity up to 200 guests. Two decks, banquet hall, panoramic views.',
        },
        {
          img: '/images/scene7.jpg',
          tag: ru ? 'Круиз' : ky ? 'Круиз' : 'Cruise',
          title: ru ? 'Утренний круиз' : ky ? 'Эртеңки круиз' : 'Morning Cruise',
          desc: ru
            ? 'Тихая водная гладь, горы в утренней дымке, кофе на палубе. Полтора часа утреннего спокойствия из Бостери.'
            : ky
            ? 'Тынч суу бети, эртеңки тумандагы тоолор, палубадагы кофе. Бостериден бир жарым саат тынчтык.'
            : 'Calm waters, mountains in morning haze, coffee on deck. One and a half hours of morning tranquility from Bosteri.',
        },
        {
          img: '/images/scene4.jpg',
          tag: ru ? 'Трансфер' : ky ? 'Трансфер' : 'Transfer',
          title: ru ? 'Трансфер Бостери' : ky ? 'Бостери трансфери' : 'Bosteri Transfer',
          desc: ru
            ? 'Водный трансфер между курортными зонами северного берега. Удобно, быстро и с потрясающими видами на горы.'
            : ky
            ? 'Түндүк жээктин курорттук зоналарынын ортосунда суу трансфери. Ыңгайлуу, тез жана укмуштуудай көрүнүштөр.'
            : 'Water transfer between resort areas of the northern shore. Convenient, fast and with stunning mountain views.',
        },
        {
          img: '/images/promo.jpg',
          tag: ru ? 'VIP' : ky ? 'VIP' : 'VIP',
          title: ru ? 'VIP-мероприятия' : ky ? 'VIP иш-чаралар' : 'VIP Events',
          desc: ru
            ? 'Корпоративные мероприятия, свадьбы и юбилеи на борту. Индивидуальное меню, декор, фото- и видеосъемка.'
            : ky
            ? 'Борттогу корпоративдик иш-чаралар, тойлор жана юбилейлер. Жеке меню, декор, фото жана видео.'
            : 'Corporate events, weddings and anniversaries on board. Custom menu, decor, photo and video.',
        },
      ],
    },
    catalog: {
      badge: ru ? 'Маршруты' : ky ? 'Маршруттар' : 'Routes',
      title: ru ? 'Маршруты и цены' : ky ? 'Маршруттар жана баалар' : 'Routes & Prices',
      book: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book Now',
      items: [
        { img: '/images/q02.jpg', title: ru ? 'Закатный круиз' : ky ? 'Күн батыш круизи' : 'Sunset Cruise', price: ru ? 'от 1 400 KGS (~$16)' : ky ? '1 400 KGS (~$16) ден' : 'from $16 (1,400 KGS)', desc: ru ? 'Вечерний круиз с видом на закат' : ky ? 'Күн батышка карай кечки круиз' : 'Evening cruise with sunset views' },
        { img: '/images/ep03.jpg', title: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter', price: ru ? 'от 7 000 KGS (~$80)' : ky ? '7 000 KGS (~$80) ден' : 'from $80 (7,000 KGS)', desc: ru ? 'Яхта «Nomad» — VIP-обслуживание' : ky ? '«Nomad» яхтасы — VIP тейлөө' : 'Yacht Nomad — VIP service' },
        { img: '/images/scene6.jpg', title: ru ? 'Скоростной тур' : ky ? 'Ылдам тур' : 'Speed Tour', price: ru ? 'от 2 000 KGS (~$23)' : ky ? '2 000 KGS (~$23) ден' : 'from $23 (2,000 KGS)', desc: ru ? 'Адреналин на скоростных катерах' : ky ? 'Ылдам катерлерде адреналин' : 'Adrenaline on speedboats' },
        { img: '/images/kids.jpg', title: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : "Kids' Party", price: ru ? 'от 1 000 KGS/чел (~$12)' : ky ? '1 000 KGS/адам (~$12)' : 'from $12/person (1,000 KGS)', desc: ru ? 'Праздник с аниматорами на борту' : ky ? 'Борттогу аниматорлор менен майрам' : 'Party with animators on board' },
      ],
    },
    schedule: {
      badge: ru ? 'Расписание' : ky ? 'Расписание' : 'Schedule',
      title: ru ? 'Расписание рейсов' : ky ? 'Рейстердин расписаниеси' : 'Trip Schedule',
      sub: ru ? 'Сезон: 1 июня — 15 сентября, ежедневно' : ky ? 'Сезон: 1 июнь — 15 сентябрь' : 'Season: June 1 — September 15, daily',
      col_route: ru ? 'Маршрут' : ky ? 'Маршрут' : 'Route',
      col_time: ru ? 'Время' : ky ? 'Убакыт' : 'Time',
      col_duration: ru ? 'Длительность' : ky ? 'Узактыгы' : 'Duration',
      col_price: ru ? 'Цена' : ky ? 'Баасы' : 'Price',
      rows: [
        { route: ru ? 'Закатный круиз (Чолпон-Ата)' : ky ? 'Күн батыш круизи (Чолпон-Ата)' : 'Sunset Cruise (Cholpon-Ata)', time: '18:00', duration: ru ? '2 часа' : ky ? '2 саат' : '2 hours', price: ru ? '1 400 KGS (~$16)' : ky ? '1 400 KGS (~$16)' : '$16 (1,400 KGS)' },
        { route: ru ? 'Утренний круиз (Бостери)' : ky ? 'Эртеңки круиз (Бостери)' : 'Morning Cruise (Bosteri)', time: '10:00', duration: ru ? '1.5 часа' : ky ? '1.5 саат' : '1.5 hours', price: ru ? '1 200 KGS (~$14)' : ky ? '1 200 KGS (~$14)' : '$14 (1,200 KGS)' },
        { route: ru ? 'Скоростной тур (Чолпон-Ата)' : ky ? 'Ылдам тур (Чолпон-Ата)' : 'Speed Tour (Cholpon-Ata)', time: '12:00, 14:00, 16:00', duration: ru ? '45 мин' : ky ? '45 мүн' : '45 min', price: ru ? '2 000 KGS (~$23)' : ky ? '2 000 KGS (~$23)' : '$23 (2,000 KGS)' },
        { route: ru ? 'Приватный чартер' : ky ? 'Жеке чартер' : 'Private Charter', time: ru ? 'По запросу' : ky ? 'Суроо боюнча' : 'On request', duration: ru ? '3-6 часов' : ky ? '3-6 саат' : '3-6 hours', price: ru ? 'от 7 000 KGS (~$80)' : ky ? '7 000 KGS (~$80) ден' : 'from $80 (7,000 KGS)' },
        { route: ru ? 'Детский праздник' : ky ? 'Балдар майрамы' : "Kids' Party", time: ru ? 'Сб-Вс 11:00' : ky ? 'Иш-Жек 11:00' : 'Sat-Sun 11:00', duration: ru ? '2 часа' : ky ? '2 саат' : '2 hours', price: ru ? '1 000 KGS/чел (~$12)' : ky ? '1 000 KGS/адам (~$12)' : '$12/person (1,000 KGS)' },
      ],
    },
    booking: {
      title: ru ? 'Забронировать рейс' : ky ? 'Рейс брондоо' : 'Book a Trip',
      subtitle: ru ? 'Выберите причал, дату и количество гостей' : ky ? 'Причал, дата жана конок санын тандаңыз' : 'Choose pier, date and number of guests',
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
    trust: {
      items: [
        { icon: '\u{1F6E1}\uFE0F', title: ru ? 'Сертифицированный флот' : ky ? 'Сертификатталган флот' : 'Certified Fleet', desc: ru ? 'Все суда прошли государственную сертификацию' : ky ? 'Бардык кемелер сертификатталган' : 'All vessels state-certified' },
        { icon: '\u{1F50D}', title: ru ? 'Ежедневный осмотр' : ky ? 'Күн сайын текшерүү' : 'Daily Inspection', desc: ru ? 'Технический осмотр перед каждым рейсом' : ky ? 'Ар бир рейстен мурун текшерүү' : 'Technical check before every trip' },
        { icon: '\u{1F9BA}', title: ru ? 'Спасательное снаряжение' : ky ? 'Куткаруу жабдыктары' : 'Safety Equipment', desc: ru ? 'Жилеты, круги и аптечка на каждом судне' : ky ? 'Жилеттер, чөгөлөтпөс шакектер' : 'Life jackets, rings & first aid on every vessel' },
        { icon: '\u{1F4CB}', title: ru ? 'Страховка включена' : ky ? 'Камсыздандыруу кирген' : 'Insurance Included', desc: ru ? 'Страхование пассажиров включено в стоимость' : ky ? 'Жүргүнчүлөрдүн камсыздандыруусу кирген' : 'Passenger insurance included in price' },
      ],
    },
    reviews: {
      badge: ru ? 'Отзывы' : ky ? 'Пикирлер' : 'Testimonials',
      title: ru ? 'Отзывы гостей' : ky ? 'Конок пикирлери' : 'Guest Reviews',
      sub: ru ? '12 000+ довольных гостей за 5 лет' : ky ? '5 жылда 12 000+ ыраазы конок' : '12,000+ happy guests over 5 years',
      items: [
        { img: '/images/q01.jpg', name: ru ? 'Айгуль К.' : 'Aigul K.', city: ru ? 'г. Бишкек' : ky ? 'Бишкек ш.' : 'Bishkek', stars: 5, text: ru ? 'Потрясающий закатный круиз из Чолпон-Аты! Вид на горы с воды — это нечто невероятное. Бронирование заняло 2 минуты.' : ky ? 'Чолпон-Атадан укмуштуудай күн батыш круизи! Суудан тоолорго көрүнүш — таң калыштуу.' : 'Amazing sunset cruise from Cholpon-Ata! The mountain view from the water is incredible. Booking took 2 minutes.' },
        { img: '/images/captain2.jpg', name: ru ? 'Бакыт М.' : 'Bakyt M.', city: ru ? 'г. Каракол' : ky ? 'Каракол ш.' : 'Karakol', stars: 5, text: ru ? 'Профессиональная команда! Капитан рассказал историю озера, дети были в восторге от пиратского шоу на борту.' : ky ? 'Профессионалдуу команда! Капитан көлдүн тарыхын айтып берди, балдар кайыктагы пираттар шоусуна суктанышты.' : 'Professional crew! The captain told the lake history, kids loved the pirate show onboard.' },
        { img: '/images/scene8.jpg', name: ru ? 'Дмитрий С.' : 'Dmitry S.', city: ru ? 'г. Алматы' : ky ? 'Алматы ш.' : 'Almaty', stars: 4, text: ru ? 'Скоростной тур из Бостери — адреналин! Лучший опыт на Иссык-Куле. Обязательно вернёмся следующим летом.' : ky ? 'Бостериден ылдам тур — адреналин! Ысык-Көлдөгү эң жакшы тажрыйба.' : 'Speed tour from Bosteri — pure adrenaline! Best experience on Issyk-Kul. Will return next summer.' },
      ],
    },
    faq: {
      title: ru ? 'Частые вопросы' : ky ? 'Көп берилүүчү суроолор' : 'FAQ',
      items: [
        { q: ru ? 'Как забронировать круиз?' : ky ? 'Круизди кантип брондойм?' : 'How to book a cruise?', a: ru ? 'Выберите маршрут на сайте, укажите дату и количество гостей. Бронирование через WhatsApp занимает 2 минуты.' : ky ? 'Сайттан маршрутту тандап, дата жана конок санын көрсөтүңүз. WhatsApp аркылуу брондоо 2 мүнөт.' : 'Choose a route, select date and guests. WhatsApp booking takes 2 minutes.' },
        { q: ru ? 'Какие документы нужны для посадки?' : ky ? 'Кире турган документтер?' : 'What documents are needed?', a: ru ? 'Только удостоверение личности. Для детей до 14 лет — свидетельство о рождении.' : ky ? 'Жеке документ гана. 14 жашка чейинки балдар үчүн — туулгандыгы жөнүндө күбөлүк.' : 'Only ID. Children under 14 — birth certificate.' },
        { q: ru ? 'Можно ли отменить бронирование?' : ky ? 'Брондоону жокко чыгарууга болобу?' : 'Can I cancel a booking?', a: ru ? 'Да, бесплатная отмена за 24 часа до отправления. При отмене менее чем за 24 часа — удерживается 20%.' : ky ? 'Ооба, жөнөтүүдөн 24 саат мурун акысыз жокко чыгаруу. 24 сааттан аз — 20% кармалат.' : 'Yes, free cancellation 24h before departure. Less than 24h — 20% fee.' },
        { q: ru ? 'Есть ли спасательное оборудование?' : ky ? 'Куткаруу жабдыктары барбы?' : 'Is there safety equipment?', a: ru ? 'Все суда оснащены спасательными жилетами, кругами и аптечкой. Капитаны сертифицированы.' : ky ? 'Бардык кемелерде куткаруу жилеттери, чөгөлөтпөс шакектер жана биринчи жардам бар.' : 'All vessels have life jackets, rings and first aid. Captains are certified.' },
        { q: ru ? 'Работаете ли вы в плохую погоду?' : ky ? 'Жаман абалда иштейсизби?' : 'Do you operate in bad weather?', a: ru ? 'Безопасность — приоритет. При штормовом предупреждении рейсы переносятся.' : ky ? 'Коопсуздук — артыкчылык. Бороон эскертүүсүндө рейстер жылдырылат.' : 'Safety first. Cruises reschedule in storms.' },
      ],
    },
    map: {
      title: ru ? 'Как нас найти' : ky ? 'Бизди кантип табасыз' : 'Find Us',
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
      desc: ru
        ? 'Первая платформа онлайн-бронирования водного транспорта на озере Иссык-Куль.'
        : ky
        ? 'Ысык-Көлдөгү суу транспортун онлайн брондоо платформасы.'
        : 'First online water transport booking platform on Lake Issyk-Kul.',
      nav_title: ru ? 'Маршруты' : ky ? 'Маршруттар' : 'Routes',
      links_title: ru ? 'Ссылки' : ky ? 'Шилтемелер' : 'Quick Links',
      account: ru ? 'Личный кабинет' : ky ? 'Жеке кабинет' : 'Account',
      privacy: ru ? 'Конфиденциальность' : ky ? 'Купуялуулук' : 'Privacy',
      address: ru ? 'Чолпон-Ата, Иссык-Куль' : ky ? 'Чолпон-Ата, Ысык-Көл' : 'Cholpon-Ata, Issyk-Kul',
      rights: ru ? 'Все права защищены.' : ky ? 'Бардык укуктар корголгон.' : 'All rights reserved.',
      about: ru ? 'О компании' : ky ? 'Биз жөнүндө' : 'About',
      gifts: ru ? 'Подарки' : ky ? 'Белектер' : 'Gifts',
      groups: ru ? 'Группы' : ky ? 'Топтор' : 'Groups',
    },
  };
}
