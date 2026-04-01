'use client';

import { useTheme, THEMES } from '@/lib/theme-context';
import Image from 'next/image';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { ScrollReveal } from './M3Animations';

type Props = { lang: string; children: ReactNode };

export default function SaileyWrapper({ lang }: Props) {
  const { theme } = useTheme();
  if (theme !== 'M3') return null;

  const t = getTrans(lang);

  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-auto">
      <M3Nav lang={lang} t={t} />
      <M3Hero t={t} />
      {/* Sand texture background — visible between white content blocks */}
      <div className="relative py-6 md:py-10 flex flex-col gap-6 md:gap-10" style={{ backgroundImage: 'url(/images/m3-sand-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <M3About t={t} />
        <M3Gallery t={t} />
        <M3Fleet t={t} />
        <M3Reviews t={t} lang={lang} />
        <M3FAQ t={t} />
        <M3MapSection t={t} />
      </div>
      <M3Footer t={t} lang={lang} />
      <M3AiChat />
    </div>
  );
}

/* ═══════════════ NAVBAR ═══════════════ */
function M3Nav({ lang, t }: { lang: string; t: Tr }) {
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
    { href: '#m3-reviews', label: t.nav.reviews },
    { href: '#m3-contacts', label: t.nav.contacts },
  ];
  const langLabels: Record<string, string> = { ru: 'RU', en: 'EN', ky: 'KY' };
  const themes = THEMES;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-500 font-m3-body ${
      scrolled ? 'bg-navy/95 backdrop-blur-xl shadow-2xl py-2' : 'bg-gradient-to-b from-black/40 to-transparent py-4'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 group">
            <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
              <path d="M12 26Q16 20 20 8Q24 20 28 26" stroke="#3a8ef7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M10 28Q15 24 20 26Q25 28 30 24" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
            <span className="text-white font-m3-display text-lg font-bold tracking-wide hidden sm:block">АЛЫКУЛ</span>
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white/80 text-[13px] font-medium tracking-[1px] hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Lang */}
          <div className="relative">
            <button onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); }}
              className="flex items-center gap-1 text-white/70 text-xs font-semibold hover:text-white transition-colors px-2 py-1.5">
              {langLabels[lang] || 'RU'}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-navy/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                {['ru', 'en', 'ky'].map(l => (
                  <a key={l} href={`/${l}`} onClick={() => setLangOpen(false)}
                    className={`block px-4 py-2 text-xs font-medium ${l === lang ? 'text-sky bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>{langLabels[l]}</a>
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
              <div className="absolute right-0 top-full mt-1 bg-navy/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                {themes.map(th => (
                  <button key={th} onClick={() => { setTheme(th); setThemeOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-xs font-medium ${th === theme ? 'text-sky bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>{th}</button>
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
      {open && (
        <div className="fixed inset-0 bg-navy/[0.98] z-[10001] flex flex-col items-center justify-center gap-6 lg:hidden">
          <button className="absolute top-4 right-5 text-white text-3xl" onClick={() => setOpen(false)}>&times;</button>
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white font-m3-display text-2xl hover:text-sky transition-colors" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <div className="flex gap-3 mt-6 border-t border-white/10 pt-6">
            {themes.map(th => (
              <button key={th} onClick={() => { setTheme(th); setOpen(false); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${th === theme ? 'bg-sky text-navy' : 'border border-white/20 text-white/60 hover:text-white'}`}>{th}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════ HERO — Original layout with YouTube video instead of slider ═══════════════ */
function M3Hero({ t }: { t: Tr }) {
  return (
    <section className="relative h-screen min-h-[600px] bg-navy overflow-hidden">
      {/* ── Full-screen YouTube video background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: '100vw', height: '56.25vw', minHeight: '100%', minWidth: '177.78vh' }}>
          <iframe
            src="https://www.youtube.com/embed/J68rZPaqmbM?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=J68rZPaqmbM&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
            className="w-full h-full border-0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/20 to-navy/60 pointer-events-none" />
      </div>

      {/* ── Social icons top-center ── */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 hidden md:flex gap-4">
        {['TW', 'FB', 'IG'].map(s => (
          <span key={s} className="text-white/40 text-[10px] font-semibold tracking-widest hover:text-white cursor-pointer transition-colors font-m3-body">{s}</span>
        ))}
      </div>

      {/* ── Hero title ── */}
      <div className="absolute bottom-32 md:bottom-24 left-0 right-0 z-10 px-6 md:px-12">
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-[1.1] font-m3-display">
          {t.hero.line1}
        </h1>
        <p className="text-white/50 text-sm md:text-base mt-2 tracking-[0.15em] uppercase font-m3-body">
          {t.hero.line2}
        </p>
      </div>

      {/* ── Slide counter bottom-left ── */}
      <div className="absolute bottom-8 left-6 md:left-12 z-10 flex items-center gap-3">
        <span className="text-white text-2xl font-bold font-m3-display">01</span>
        <div className="w-12 h-[1px] bg-white/30" />
        <span className="text-white/40 text-sm font-m3-body">01</span>
      </div>

      {/* ── Bottom metrics bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="flex items-center justify-around px-6 md:px-12 py-4 border-t border-white/10 bg-navy/30 backdrop-blur-sm">
          {[
            { label: t.stats.years, val: '5+' },
            { label: t.stats.guests, val: '12K+' },
            { label: t.stats.vessels, val: '8' },
            { label: t.stats.routes, val: '15' },
          ].map(m => (
            <div key={m.label} className="text-center">
              <div className="text-white/40 text-[10px] uppercase tracking-wider font-m3-body">— {m.label}</div>
              <div className="text-white font-bold text-sm md:text-base mt-0.5 font-m3-display">{m.val}</div>
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
              <div key={`${copy}-${i}`} className="p-8 rounded-3xl border border-black/[0.04] shadow-lg shadow-ocean/[0.06] max-w-xs w-full bg-white">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} className={`w-3.5 h-3.5 ${si < r.stars ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-m3-body text-navy/80 text-sm leading-relaxed mb-5">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image src={r.img} alt={r.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-m3-body font-semibold text-sm text-navy leading-tight">{r.name}</div>
                    <div className="font-m3-body text-muted text-xs leading-tight">{r.city}</div>
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
    { img: '/images/scene4.jpg', name: ru ? 'Мария Л.' : 'Maria L.', city: ru ? 'г. Москва' : 'Moscow', stars: 5, text: ru ? 'Яхта «Nomad» — VIP уровень. Романтический ужин на воде с видом на закат.' : 'Yacht "Nomad" is VIP level. Romantic dinner with sunset views.' },
    { img: '/images/scene3.jpg', name: ru ? 'Азамат Т.' : 'Azamat T.', city: ru ? 'г. Бишкек' : 'Bishkek', stars: 5, text: ru ? 'Корпоратив на теплоходе — 80 человек, всё организовано идеально.' : 'Corporate event — 80 people, perfectly organized.' },
    { img: '/images/promo.jpg', name: ru ? 'Елена Р.' : 'Elena R.', city: ru ? 'г. Ош' : 'Osh', stars: 5, text: ru ? 'Детский праздник на Алыкул — дети до сих пор вспоминают!' : 'Kids party on Alykul — kids still remember it!' },
    { img: '/images/scene1.jpg', name: ru ? 'Тимур К.' : 'Timur K.', city: ru ? 'г. Астана' : 'Astana', stars: 4, text: ru ? 'Утренний круиз из Бостери. Тихо, спокойно, горы в воде.' : 'Morning cruise. Quiet, peaceful, mountains in the water.' },
    { img: '/images/scene5.jpg', name: ru ? 'Анна В.' : 'Anna V.', city: ru ? 'г. Ташкент' : 'Tashkent', stars: 5, text: ru ? 'Лучший отпуск за 5 лет. Иссык-Куль + яхта + горы = незабываемо.' : 'Best vacation in 5 years. Issyk-Kul + yacht = unforgettable!' },
    { img: '/images/scene9.jpg', name: ru ? 'Нурлан Б.' : 'Nurlan B.', city: ru ? 'г. Каракол' : 'Karakol', stars: 5, text: ru ? 'Свадьба на теплоходе — мечта сбылась! 150 гостей, 2 палубы.' : 'Wedding on steamship — dream come true! 150 guests.' },
  ];

  return (
    <section id="m3-reviews" className="py-20 bg-white rounded-2xl mx-4 md:mx-8 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-block border border-ocean/20 py-1 px-4 rounded-lg text-ocean text-xs font-m3-body font-semibold uppercase tracking-wider mb-4">{t.reviews.badge}</div>
            <h2 className="font-m3-display font-bold text-navy" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{t.reviews.title}</h2>
            <p className="font-m3-body text-muted mt-3">{t.reviews.sub}</p>
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

/* ═══════════════ ABOUT US ═══════════════ */
function M3About({ t }: { t: Tr }) {
  const services = t.about.services;
  const stats = [
    { val: '5+', label: t.about.s_years },
    { val: '12K+', label: t.about.s_guests },
    { val: '8', label: t.about.s_vessels },
    { val: '98%', label: t.about.s_rate },
  ];

  return (
    <section id="m3-about" className="py-20 bg-white rounded-2xl mx-4 md:mx-8 shadow-sm overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 font-m3-display">{t.about.title}</h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-ocean to-sky rounded-full mx-auto mb-5" />
            <p className="text-muted text-base max-w-2xl mx-auto font-m3-body">{t.about.intro}</p>
          </div>
        </ScrollReveal>

        {/* Services grid — 2x3 */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Left col */}
          <div className="space-y-6">
            {services.filter((_: unknown, i: number) => i % 2 === 0).map((s: { icon: string; title: string; desc: string }) => (
              <ScrollReveal key={s.title}>
                <div className="flex gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-ocean/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-ocean group-hover:text-white transition-all">{s.icon}</div>
                  <div>
                    <h4 className="font-semibold text-navy text-base mb-1 font-m3-body">{s.title}</h4>
                    <p className="text-muted text-sm leading-relaxed font-m3-body">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          {/* Right col */}
          <div className="space-y-6">
            {services.filter((_: unknown, i: number) => i % 2 === 1).map((s: { icon: string; title: string; desc: string }) => (
              <ScrollReveal key={s.title}>
                <div className="flex gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-ocean/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-ocean group-hover:text-white transition-all">{s.icon}</div>
                  <div>
                    <h4 className="font-semibold text-navy text-base mb-1 font-m3-body">{s.title}</h4>
                    <p className="text-muted text-sm leading-relaxed font-m3-body">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map(s => (
              <div key={s.label} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-navy mb-1 font-m3-display">{s.val}</div>
                <p className="text-muted text-sm font-m3-body">{s.label}</p>
                <div className="w-0 group-hover:w-full h-[2px] bg-ocean mx-auto mt-2 transition-all duration-500" />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="text-center bg-gradient-to-r from-navy to-ocean-dark rounded-2xl p-10 md:p-14 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 font-m3-display">{t.about.cta_title}</h3>
            <p className="text-white/70 mb-6 max-w-lg mx-auto font-m3-body">{t.about.cta_desc}</p>
            <a href="#m3-fleet" className="inline-block bg-white text-navy px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow font-m3-body">{t.about.cta_btn}</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ GALLERY — Horizontal Carousel (Gallery4 style) ═══════════════ */
function M3Gallery({ t }: { t: Tr }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const items = [
    { img: '/images/hero.jpg', title: t.gallery.c1, desc: t.gallery.d1 },
    { img: '/images/scene7.jpg', title: t.gallery.c2, desc: t.gallery.d2 },
    { img: '/images/alykul1.jpg', title: t.gallery.c3, desc: t.gallery.d3 },
    { img: '/images/q02.jpg', title: t.gallery.c4, desc: t.gallery.d4 },
    { img: '/images/ep03.jpg', title: t.gallery.c5, desc: t.gallery.d5 },
    { img: '/images/scene6.jpg', title: t.gallery.c6, desc: t.gallery.d6 },
  ];

  const scrollTo = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const cardW = scrollRef.current.firstElementChild?.clientWidth || 320;
    const gap = 20;
    scrollRef.current.scrollBy({ left: dir === 'next' ? cardW + gap : -(cardW + gap), behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.firstElementChild?.clientWidth || 320;
      setCurrent(Math.round(el.scrollLeft / (cardW + 20)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white rounded-2xl mx-4 md:mx-8 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between md:mb-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-navy font-m3-display">{t.gallery.title}</h2>
            <p className="max-w-lg text-muted text-sm font-m3-body">{t.gallery.sub}</p>
          </div>
          <div className="hidden md:flex shrink-0 gap-2">
            <button onClick={() => scrollTo('prev')} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-navy hover:bg-foam transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 19-7-7 7-7"/></svg>
            </button>
            <button onClick={() => scrollTo('next')} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-navy hover:bg-foam transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div ref={scrollRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-4 md:pl-[max(2rem,calc(50vw-660px))]" style={{ scrollbarWidth: 'none' }}>
        {items.map((item, i) => (
          <a key={i} href="#m3-fleet" className="group snap-start flex-shrink-0 w-[300px] lg:w-[360px] rounded-xl overflow-hidden relative">
            <div className="relative h-[27rem] md:h-[24rem] lg:h-[28rem] w-full overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8 text-white">
                <div className="mb-2 pt-4 text-xl font-semibold font-m3-display">{item.title}</div>
                <div className="mb-8 line-clamp-2 text-white/70 text-sm font-m3-body">{item.desc}</div>
                <div className="flex items-center text-sm font-m3-body">
                  {t.gallery.more}
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {items.map((_, i) => (
          <button key={i} onClick={() => { if (scrollRef.current) { const cw = scrollRef.current.firstElementChild?.clientWidth || 320; scrollRef.current.scrollTo({ left: i * (cw + 20), behavior: 'smooth' }); } }}
            className={`h-2 w-2 rounded-full transition-colors ${current === i ? 'bg-navy' : 'bg-navy/20'}`}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ FLEET — Interactive Image Accordion ═══════════════ */
function M3Fleet({ t }: { t: Tr }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const vessels = t.fleet.items;

  return (
    <section id="m3-fleet" className="py-20 bg-navy rounded-2xl mx-4 md:mx-8 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-bold text-white text-2xl md:text-3xl font-m3-display">{t.fleet.title}</h2>
            <p className="text-white/40 mt-2 text-sm font-m3-body">{t.fleet.sub}</p>
          </div>
        </ScrollReveal>

        {/* Desktop: image accordion */}
        <div className="hidden md:flex items-center justify-center gap-3 px-4">
          {vessels.map((v: { img: string; name: string; desc: string; specs: string[] }, i: number) => (
            <div
              key={v.name}
              className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out"
              style={{ width: activeIdx === i ? '500px' : '80px', height: '420px' }}
              onMouseEnter={() => setActiveIdx(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.img} alt={v.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />

              {/* Active: bottom info */}
              {activeIdx === i && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-lg mb-2 font-m3-display">{v.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {v.specs.map((s: string) => (
                      <span key={s} className="text-[10px] font-medium bg-white/15 text-white/80 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed font-m3-body">{v.desc}</p>
                </div>
              )}

              {/* Inactive: rotated title */}
              {activeIdx !== i && (
                <span className="absolute bottom-20 left-1/2 -translate-x-1/2 rotate-90 text-white text-sm font-semibold whitespace-nowrap tracking-wide font-m3-body">
                  {v.name}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: stacked cards */}
        <div className="flex flex-col gap-4 md:hidden">
          {vessels.map((v: { img: string; name: string; desc: string; specs: string[] }) => (
            <div key={v.name} className="relative rounded-2xl overflow-hidden h-[220px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.img} alt={v.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-base font-m3-display">{v.name}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {v.specs.map((s: string) => (
                    <span key={s} className="text-[9px] bg-white/15 text-white/70 px-2 py-0.5 rounded-full">{s}</span>
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

/* ═══════════════ FAQ ACCORDION ═══════════════ */
function M3FAQ({ t }: { t: Tr }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items = t.faq.items;

  return (
    <section className="py-20 bg-white rounded-2xl mx-4 md:mx-8 shadow-sm">
      <div className="max-w-[640px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-bold text-navy text-2xl md:text-3xl font-m3-display">{t.faq.title}</h2>
          </div>
        </ScrollReveal>

        <div className="border border-black/[0.06] rounded-xl bg-white overflow-hidden shadow-sm">
          {items.map((item: { q: string; a: string }, i: number) => (
            <div key={i} className={`border-b border-black/[0.06] last:border-b-0 ${openIdx === i ? 'bg-foam/30' : ''}`}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left font-m3-body font-semibold text-navy text-sm hover:bg-foam/20 transition-colors cursor-pointer"
              >
                {item.q}
                <svg className={`w-4 h-4 shrink-0 text-muted transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pb-4 text-muted text-sm font-m3-body leading-relaxed">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ MAP — Cholpon-Ata ═══════════════ */
function M3MapSection({ t }: { t: Tr }) {
  return (
    <section className="py-20 bg-white rounded-2xl mx-4 md:mx-8 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-bold text-navy text-2xl md:text-3xl font-m3-display">{t.map.title}</h2>
            <p className="font-m3-body text-muted mt-2 text-sm">{t.map.sub}</p>
          </div>
        </ScrollReveal>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-black/[0.04]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23918.78!2d77.0685!3d42.6461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c5e2e27a3b%3A0x6f2a7c29d3f4d8a1!2z0KfQvtC70L_QvtC9LdCQ0YLQsA!5e0!3m2!1sru!2skg!4v1"
            className="w-full h-[400px] md:h-[500px] border-0"
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ FOOTER — Taped Design ═══════════════ */
function M3Footer({ t, lang }: { t: Tr; lang: string }) {
  const year = new Date().getFullYear();

  return (
    <footer id="m3-contacts" className="relative py-8 px-4 max-w-5xl mx-auto" style={{ backgroundImage: 'url(/images/m3-footer-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Main card with tape */}
      <div className="relative bg-transparent rounded-3xl px-6 md:px-10 py-10 flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Tape decorations */}
        <div className="hidden md:block absolute -top-3 -left-6 w-[70px] h-[28px] bg-white/60 rounded-sm" style={{ transform: 'rotate(-15deg)' }} />
        <div className="hidden md:block absolute -top-3 -right-6 w-[70px] h-[28px] bg-white/60 rounded-sm" style={{ transform: 'rotate(15deg)' }} />

        {/* Logo + desc */}
        <div className="flex flex-col gap-3 max-w-[280px]">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
              <path d="M12 26Q16 20 20 8Q24 20 28 26" stroke="#7ec8f0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M10 28Q15 24 20 26Q25 28 30 24" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
            <span className="text-white font-bold text-xl font-m3-display drop-shadow-md">АЛЫКУЛ</span>
          </div>
          <p className="text-white/80 text-sm font-m3-body drop-shadow-sm">
            {t.foot.desc}
          </p>
        </div>

        {/* Nav columns */}
        <div className="flex flex-row gap-12 md:gap-16">
          <div className="flex flex-col gap-3">
            <h4 className="uppercase text-xs font-semibold text-white/60 tracking-wider font-m3-body">{t.foot.routes}</h4>
            <a href="#m3-fleet" className="text-white/80 text-sm hover:text-sky transition-colors font-m3-body drop-shadow-sm">{t.foot.cruises}</a>
            <a href="#m3-fleet" className="text-white/80 text-sm hover:text-sky transition-colors font-m3-body drop-shadow-sm">{t.foot.charters}</a>
            <a href="#m3-fleet" className="text-white/80 text-sm hover:text-sky transition-colors font-m3-body drop-shadow-sm">{t.foot.speed}</a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="uppercase text-xs font-semibold text-white/60 tracking-wider font-m3-body">{t.foot.company}</h4>
            <a href="#m3-reviews" className="text-white/80 text-sm hover:text-sky transition-colors font-m3-body drop-shadow-sm">{t.nav.reviews}</a>
            <a href="#m3-faq" className="text-white/80 text-sm hover:text-sky transition-colors font-m3-body drop-shadow-sm">FAQ</a>
            <a href={`/${lang}/privacy`} className="text-white/80 text-sm hover:text-sky transition-colors font-m3-body drop-shadow-sm">{t.foot.privacy}</a>
          </div>
          <div className="hidden md:flex flex-col gap-3">
            <h4 className="uppercase text-xs font-semibold text-white/60 tracking-wider font-m3-body">{t.foot.contact}</h4>
            <a href="tel:+996555123456" className="text-white/80 text-sm hover:text-sky transition-colors font-m3-body drop-shadow-sm">+996 555 123 456</a>
            <a href="mailto:info@alykul.kg" className="text-white/80 text-sm hover:text-sky transition-colors font-m3-body drop-shadow-sm">info@alykul.kg</a>
            <span className="text-white/80 text-sm font-m3-body drop-shadow-sm">Чолпон-Ата</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-4 px-2 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-sm text-white/50 font-m3-body">
        <p className="drop-shadow-sm">&copy;{year} Алыкул. {t.foot.rights}</p>
        <div className="flex gap-4 items-center">
          {[
            { href: 'https://instagram.com', label: 'Instagram' },
            { href: 'https://t.me', label: 'Telegram' },
            { href: 'https://wa.me/996555123456', label: 'WhatsApp' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-sky transition-colors drop-shadow-sm">{s.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════ AI CHAT WIDGET — floating button + card ═══════════════ */
function M3AiChat() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Здравствуйте! Я AI-ассистент Алыкул. Чем могу помочь? 🚢' },
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
      {/* Floating button */}
      {!open && (
        <button onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[10002] w-14 h-14 rounded-full bg-navy shadow-2xl shadow-navy/30 flex items-center justify-center text-white hover:scale-110 transition-transform"
          aria-label="AiChat">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path d="M12 3C6.5 3 2 6.58 2 11c0 2.13 1.02 4.05 2.67 5.47L3.5 21l4.6-2.26C9.3 19.24 10.62 19.5 12 19.5c5.5 0 10-3.58 10-8S17.5 3 12 3Z" fill="currentColor" opacity="0.2"/>
            <path d="M12 3C6.5 3 2 6.58 2 11c0 2.13 1.02 4.05 2.67 5.47L3.5 21l4.6-2.26C9.3 19.24 10.62 19.5 12 19.5c5.5 0 10-3.58 10-8S17.5 3 12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="8" cy="11" r="1" fill="currentColor"/><circle cx="12" cy="11" r="1" fill="currentColor"/><circle cx="16" cy="11" r="1" fill="currentColor"/>
          </svg>
        </button>
      )}

      {/* Chat card */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[10002] w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-black/[0.06] flex flex-col overflow-hidden" style={{ height: '500px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/[0.06] bg-navy text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sky/20 flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 24c11.4-0 18-6.6 18-18C24 17.4 17.4 24 6 24ZM18 0C6.6 0 0 6.6 0 18 0 6.6 6.6 0 18 0Z"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold font-m3-body">AiChat</div>
                <div className="text-[10px] text-white/50 font-m3-body">Алыкул AI-ассистент</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white text-xl">&times;</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-m3-body">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  m.role === 'user' ? 'bg-ocean text-white rounded-br-sm' : 'bg-foam text-navy rounded-bl-sm'
                }`}>{m.text}</div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-black/[0.06] p-3 flex gap-2">
            <input
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Спросите что-нибудь..."
              className="flex-1 bg-foam/50 border border-black/[0.06] rounded-lg px-3 py-2 text-sm text-navy outline-none focus:border-ocean/30 font-m3-body"
            />
            <button onClick={send} className="w-9 h-9 rounded-lg bg-ocean text-white flex items-center justify-center hover:bg-sky transition-colors flex-shrink-0">
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
      schedule: ru ? 'Расписание' : ky ? 'Расписание' : 'Schedule',
      fleet: ru ? 'Флот' : ky ? 'Флот' : 'Fleet',
      booking: ru ? 'Забронировать' : ky ? 'Брондоо' : 'Book Now',
      about: ru ? 'О нас' : ky ? 'Биз жөнүндө' : 'About',
      reviews: ru ? 'Отзывы' : ky ? 'Пикирлер' : 'Reviews',
      contacts: ru ? 'Контакты' : ky ? 'Байланыштар' : 'Contacts',
    },
    hero: {
      line1: ru ? 'ЛУЧШИЙ ОТДЫХ' : ky ? 'ЭҢ ЖАКШЫ ЭС АЛУУ' : 'BEST VACATION',
      line2: ru ? 'на Иссык-Куле' : ky ? 'Ысык-Көлдө' : 'with Yachting',
      book: ru ? 'Бронировать' : ky ? 'Брондоо' : 'Book',
      s1name: ru ? 'Теплоход\nАлыкул' : 'Steamship\nAlykul',
      s2name: ru ? 'Закатный\nКруиз' : 'Sunset\nCruise',
      s3name: ru ? 'Яхта\nNomad' : 'Yacht\nNomad',
    },
    stats: {
      years: ru ? 'лет на озере' : ky ? 'жыл көлдө' : 'years',
      guests: ru ? 'довольных гостей' : ky ? 'ыраазы конок' : 'guests',
      vessels: ru ? 'судов' : ky ? 'кеме' : 'vessels',
      routes: ru ? 'маршрутов' : ky ? 'маршрут' : 'routes',
    },
    reviews: {
      title: ru ? 'Отзывы гостей' : ky ? 'Конок пикирлери' : 'Guest Reviews',
      badge: ru ? 'Отзывы' : ky ? 'Пикирлер' : 'Testimonials',
      sub: ru ? '12 000+ довольных гостей за 5 лет' : ky ? '5 жылда 12 000+ ыраазы конок' : '12,000+ happy guests over 5 years',
    },
    about: {
      title: ru ? 'О компании' : ky ? 'Биз жөнүндө' : 'About Us',
      intro: ru ? 'Алыкул — первый оператор цифрового бронирования водного транспорта на озере Иссык-Куль. Мы объединяем проверенный флот, опытных капитанов и современные технологии.' : 'Alykul is the first digital water transport booking operator on Lake Issyk-Kul, combining certified fleet, experienced captains, and modern technology.',
      services: [
        { icon: '⚡', title: ru ? 'Онлайн-бронирование' : 'Online Booking', desc: ru ? 'Выбирайте маршрут, дату и оплачивайте онлайн за 2 минуты' : 'Choose route, date, pay online in 2 minutes' },
        { icon: '⛵', title: ru ? 'Проверенный флот' : 'Certified Fleet', desc: ru ? 'Каждое судно сертифицировано и проходит ежедневный осмотр' : 'Every vessel certified and inspected daily' },
        { icon: '🏔️', title: ru ? '5+ лет опыта' : '5+ Years', desc: ru ? 'Более 5 лет организации водных туров на Иссык-Куле' : 'Over 5 years of water tours on Issyk-Kul' },
        { icon: '🛡️', title: ru ? 'Безопасность' : 'Safety', desc: ru ? 'Спасательное оборудование, обученные капитаны, страховка' : 'Safety equipment, trained captains, insurance' },
        { icon: '🌐', title: ru ? 'Мультиязычность' : 'Multilingual', desc: ru ? 'Платформа на русском, кыргызском и английском' : 'Platform in Russian, Kyrgyz, English' },
        { icon: '💎', title: ru ? 'Лучшие цены' : 'Best Prices', desc: ru ? 'Прямое бронирование без наценок посредников' : 'Direct booking, no middleman markups' },
      ],
      s_years: ru ? 'лет опыта' : 'years',
      s_guests: ru ? 'довольных гостей' : 'happy guests',
      s_vessels: ru ? 'судов' : 'vessels',
      s_rate: ru ? 'довольны' : 'satisfaction',
      cta_title: ru ? 'Готовы к приключению?' : 'Ready for Adventure?',
      cta_desc: ru ? 'Забронируйте водную прогулку на Иссык-Куле и создайте незабываемые воспоминания.' : 'Book a water tour on Issyk-Kul and create unforgettable memories.',
      cta_btn: ru ? 'Выбрать маршрут' : 'Choose Route',
    },
    gallery: {
      title: ru ? 'Наши маршруты' : ky ? 'Биздин маршруттар' : 'Our Routes',
      sub: ru ? 'Откройте для себя лучшие водные приключения на Иссык-Куле' : 'Discover the best water adventures on Issyk-Kul',
      more: ru ? 'Подробнее' : 'Read more',
      c1: ru ? 'Закатный круиз' : 'Sunset Cruise', d1: ru ? 'Незабываемый вечер на теплоходе «Алыкул» с видом на горы Тянь-Шаня.' : 'Unforgettable evening on steamship "Alykul" with Tian Shan views.',
      c2: ru ? 'Утренний круиз' : 'Morning Cruise', d2: ru ? 'Тихая водная гладь, горы в утренней дымке, кофе на палубе.' : 'Calm waters, mountains in morning haze, coffee on deck.',
      c3: ru ? 'Теплоход «Алыкул»' : 'Steamship "Alykul"', d3: ru ? 'Флагман флота — 200 гостей, 2 палубы, банкетный зал.' : 'Fleet flagship — 200 guests, 2 decks, banquet hall.',
      c4: ru ? 'Приватный чартер' : 'Private Charter', d4: ru ? 'Яхта «Nomad» — VIP-обслуживание, романтика, до 12 гостей.' : 'Yacht "Nomad" — VIP service, romance, up to 12 guests.',
      c5: ru ? 'Скоростной тур' : 'Speed Tour', d5: ru ? 'Адреналин на скоростных катерах — до 60 км/ч по волнам Иссык-Куля.' : 'Adrenaline on speedboats — up to 60 km/h on Issyk-Kul waves.',
      c6: ru ? 'Детский праздник' : "Kids' Party", d6: ru ? 'Праздник для детей на борту с аниматорами и развлекательной программой.' : 'Kids celebration on board with animators and entertainment.',
    },
    fleet: {
      title: ru ? 'Наш флот' : ky ? 'Биздин флот' : 'Our Fleet',
      sub: ru ? 'Сертифицированные суда с ежедневным техосмотром' : ky ? 'Күн сайын текшерилген кемелер' : 'Certified vessels with daily inspection',
      items: [
        { img: '/images/q02.jpg', name: ru ? 'Теплоход «Алыкул»' : 'Steamship "Alykul"', desc: ru ? 'Флагман флота. Круизы, корпоративы, свадьбы, детские праздники.' : 'Fleet flagship. Cruises, events, weddings, kids parties.', specs: [ru ? 'до 200 чел' : 'up to 200 pax', ru ? '2 палубы' : '2 decks', ru ? 'банкетный зал' : 'banquet hall'] },
        { img: '/images/ep03.jpg', name: ru ? 'Яхта «Nomad»' : 'Yacht "Nomad"', desc: ru ? 'Приватные чартеры, романтические прогулки, VIP-обслуживание.' : 'Private charters, romantic walks, VIP service.', specs: [ru ? 'до 12 чел' : 'up to 12 pax', ru ? 'парусная' : 'sailing'] },
        { img: '/images/scene6.jpg', name: ru ? 'Скоростные катера' : 'Speedboats', desc: ru ? 'Адреналиновые туры, водные лыжи, вейкборд, рыбалка.' : 'Adrenaline tours, water skiing, wakeboarding, fishing.', specs: [ru ? 'до 8 чел' : 'up to 8 pax', ru ? 'до 60 км/ч' : 'up to 60 km/h'] },
      ],
    },
    faq: {
      title: ru ? 'Частые вопросы' : ky ? 'Көп берилүүчү суроолор' : 'FAQ',
      items: [
        { q: ru ? 'Как забронировать круиз?' : 'How to book a cruise?', a: ru ? 'Выберите маршрут на сайте, укажите дату и количество гостей. Бронирование через WhatsApp занимает 2 минуты. Оплата на месте или онлайн.' : 'Choose a route, select date and guests. WhatsApp booking takes 2 minutes. Pay on-site or online.' },
        { q: ru ? 'Какие документы нужны для посадки?' : 'What documents are needed?', a: ru ? 'Только удостоверение личности. Для детей до 14 лет — свидетельство о рождении. Иностранным гражданам — паспорт.' : 'Only ID. Children under 14 — birth certificate. Foreign citizens — passport.' },
        { q: ru ? 'Можно ли отменить бронирование?' : 'Can I cancel a booking?', a: ru ? 'Да, бесплатная отмена за 24 часа до отправления. При отмене менее чем за 24 часа — удерживается 20% стоимости.' : 'Yes, free cancellation 24h before departure. Less than 24h — 20% fee.' },
        { q: ru ? 'Есть ли спасательное оборудование?' : 'Is there safety equipment?', a: ru ? 'Все суда оснащены спасательными жилетами, кругами и аптечкой. Капитаны сертифицированы и проходят ежегодную аттестацию.' : 'All vessels have life jackets, rings and first aid. Captains are certified annually.' },
        { q: ru ? 'Работаете ли вы в плохую погоду?' : 'Do you operate in bad weather?', a: ru ? 'Безопасность — приоритет. При штормовом предупреждении рейсы переносятся. Мы уведомляем за 2 часа до отправления.' : 'Safety first. Cruises reschedule in storms. We notify 2 hours before departure.' },
      ],
    },
    map: {
      title: ru ? 'Как нас найти' : ky ? 'Бизди кантип табасыз' : 'Find Us',
      sub: ru ? 'Причал в Чолпон-Ате, северный берег озера Иссык-Куль' : ky ? 'Чолпон-Атадагы причал' : 'Pier in Cholpon-Ata, northern shore of Lake Issyk-Kul',
    },
    foot: {
      desc: ru ? 'Первая платформа онлайн-бронирования водного транспорта на озере Иссык-Куль.' : 'First online water transport booking platform on Lake Issyk-Kul.',
      routes: ru ? 'Маршруты' : 'Routes',
      cruises: ru ? 'Круизы' : 'Cruises',
      charters: ru ? 'Чартеры' : 'Charters',
      speed: ru ? 'Скоростные туры' : 'Speed Tours',
      company: ru ? 'Компания' : 'Company',
      privacy: ru ? 'Конфиденциальность' : 'Privacy',
      contact: ru ? 'Контакты' : 'Contacts',
      rights: ru ? 'Все права защищены.' : 'All rights reserved.',
    },
  };
}
