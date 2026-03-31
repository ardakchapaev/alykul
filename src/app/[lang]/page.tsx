import Image from 'next/image';
import Link from 'next/link';
import { getDictionary, type Locale } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import HeroBooking from './HeroBooking';
import { BookButton } from '@/components/WhatsAppBooking';

export default async function Home({ params }: { params: { lang: Locale } }) {
  const t = await getDictionary(params.lang);
  const lang = params.lang;

  const catalogCards = [
    { img: '/images/q02.jpg', category: t.catalog.cruise, name: t.catalog.sunset_cruise, price: lang === 'ru' ? 'от 1 400 KGS' : lang === 'ky' ? '1 400 KGS ден' : 'from 1 400 KGS', num: '01' },
    { img: '/images/ep03.jpg', category: t.catalog.charter, name: t.catalog.private_charter, price: lang === 'ru' ? 'от 7 000 KGS' : lang === 'ky' ? '7 000 KGS ден' : 'from 7 000 KGS', num: '02' },
    { img: '/images/scene6.jpg', category: t.catalog.entertainment, name: t.catalog.speed_tour, price: lang === 'ru' ? 'от 2 000 KGS' : lang === 'ky' ? '2 000 KGS ден' : 'from 2 000 KGS', num: '03' },
    { img: '/images/kids.jpg', category: t.catalog.kids, name: t.catalog.kids_party, price: lang === 'ru' ? 'от 1 000 KGS' : lang === 'ky' ? '1 000 KGS ден' : 'from 1 000 KGS', num: '04' },
  ];

  const reviews = [
    { img: '/images/q01.jpg', name: lang === 'ru' ? 'Айгуль К.' : 'Aigul K.', city: lang === 'ru' ? 'Бишкек' : 'Bishkek', stars: 5, text: lang === 'ru' ? 'Потрясающий закатный круиз из Чолпон-Аты! Вид на горы с воды — это нечто невероятное.' : 'Amazing sunset cruise from Cholpon-Ata! Mountain views from the water are incredible.' },
    { img: '/images/captain2.jpg', name: lang === 'ru' ? 'Бакыт М.' : 'Bakyt M.', city: lang === 'ru' ? 'Каракол' : 'Karakol', stars: 5, text: lang === 'ru' ? 'Профессиональная команда! Капитан рассказал историю озера, дети были в восторге.' : 'Professional crew! The captain told the lake history, kids were thrilled.' },
    { img: '/images/scene8.jpg', name: lang === 'ru' ? 'Дмитрий С.' : 'Dmitry S.', city: lang === 'ru' ? 'Алматы' : 'Almaty', stars: 4, text: lang === 'ru' ? 'Скоростной тур из Бостери — адреналин! Лучший опыт на Иссык-Куле.' : 'Speed tour from Bosteri — pure adrenaline! Best Issyk-Kul experience.' },
  ];

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-navy" id="hero">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero.jpg" alt="Issyk-Kul" fill className="object-cover opacity-40" priority />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/60 via-navy/40 to-navy" />

        <div className="relative z-[2] w-full px-6 md:px-20 lg:px-32 pt-32 pb-20">
          <div className="max-w-[800px]">
            <div className="pill bg-white/[0.08] text-white/60 border border-white/10 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-ocean" />
              {t.hero.brand}
            </div>

            <h1 className="font-heading font-bold text-white text-[clamp(48px,8vw,96px)] leading-[0.95] uppercase tracking-tight mb-6 animate-fade-up">
              {t.hero.title_1}<br />
              <span className="text-ocean">{t.hero.title_2}</span>
            </h1>

            <p className="text-white/50 text-lg md:text-xl max-w-[550px] leading-relaxed mb-12 animate-fade-up-delay">
              {t.hero.subtitle}
            </p>

            <div className="animate-fade-up-delay-2">
              <HeroBooking dict={t} />
            </div>
          </div>

          {/* Stats - floating */}
          <div className="mt-16 flex flex-wrap gap-12 animate-fade-up-delay-2">
            {[
              { value: '5+', label: t.stats.years },
              { value: '12K+', label: t.stats.guests },
              { value: '8', label: t.stats.vessels },
              { value: '15', label: t.stats.routes },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-heading font-bold text-3xl md:text-4xl text-white">{stat.value}</div>
                <div className="text-white/30 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <Navbar dict={t.nav} lang={lang} />
      </section>

      {/* ═══════════ USP ═══════════ */}
      <section className="px-6 md:px-20 lg:px-32 py-24 bg-sand">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div>
            <div className="pill bg-ocean-light text-ocean mb-4">{lang === 'ru' ? 'Преимущества' : lang === 'ky' ? 'Артыкчылыктар' : 'Advantages'}</div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl uppercase tracking-tight">{t.usp.title}</h2>
          </div>
          <p className="text-muted max-w-md text-sm leading-relaxed">{t.usp.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '01', title: t.usp.online, desc: t.usp.online_desc },
            { icon: '02', title: t.usp.fleet, desc: t.usp.fleet_desc },
            { icon: '03', title: t.usp.experience, desc: t.usp.experience_desc },
            { icon: '04', title: t.usp.safety, desc: t.usp.safety_desc },
            { icon: '05', title: t.usp.multilang, desc: t.usp.multilang_desc },
            { icon: '06', title: t.usp.prices, desc: t.usp.prices_desc },
          ].map(item => (
            <div key={item.icon} className="group bg-white rounded-3xl p-7 border border-gray-100 hover:border-ocean/20 hover:shadow-xl hover:shadow-ocean/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-stone flex items-center justify-center text-sm font-heading font-bold text-muted-dark mb-5 group-hover:bg-ocean group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ GALLERY STRIP ═══════════ */}
      <div className="overflow-hidden bg-navy py-4">
        <div className="flex gap-3 w-max animate-[scroll_40s_linear_infinite]">
          {['hero.jpg', 'scene7.jpg', 'scene6.jpg', 'q02.jpg', 'alykul1.jpg', 'kids.jpg', 'promo.jpg', 'scene4.jpg', 'hero.jpg', 'scene7.jpg'].map((img, i) => (
            <Image key={i} src={`/images/${img}`} alt="" width={320} height={200} className="h-[180px] w-auto object-cover rounded-2xl brightness-75 hover:brightness-100 transition-all duration-500" />
          ))}
        </div>
      </div>

      {/* ═══════════ ROUTES ═══════════ */}
      <section className="px-6 md:px-20 lg:px-32 py-24" id="routes">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div>
            <div className="pill bg-ocean-light text-ocean mb-4">{t.routes_section.badge}</div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl uppercase tracking-tight">{t.routes_section.title}</h2>
          </div>
          <Link href={`/${lang}/trips`} className="pill bg-navy text-white hover:bg-ocean transition-colors">
            {lang === 'ru' ? 'Все рейсы →' : lang === 'ky' ? 'Бардык рейстер →' : 'All trips →'}
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {catalogCards.map(card => (
            <Link key={card.num} href={`/${lang}/trips`} className="group">
              <div className="relative rounded-3xl overflow-hidden mb-4">
                <Image src={card.img} alt={card.name} width={400} height={500} className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="pill bg-white/10 text-white backdrop-blur-md border border-white/10">{card.category}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white/40 font-heading font-bold text-xs">{card.num}</div>
                  <h3 className="text-white font-bold text-xl mb-1">{card.name}</h3>
                  <div className="text-white font-heading font-bold">{card.price}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════ SCHEDULE ═══════════ */}
      <section className="px-6 md:px-20 lg:px-32 py-24 bg-stone" id="schedule">
        <div className="mb-16">
          <div className="pill bg-ocean-light text-ocean mb-4">{t.schedule_section.badge}</div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl uppercase tracking-tight mb-4">{t.schedule_section.title}</h2>
          <p className="text-muted max-w-lg">{t.schedule_section.subtitle}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-navy/10">
                <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-muted">{t.schedule_section.route}</th>
                <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-muted">{t.schedule_section.vessel}</th>
                <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-muted">{t.schedule_section.departure}</th>
                <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-muted">{t.schedule_section.duration}</th>
                <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-muted">{t.schedule_section.price}</th>
                <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-muted">{t.schedule_section.frequency}</th>
                <th className="py-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {[
                { route: lang === 'ru' ? 'Закатный круиз' : lang === 'ky' ? 'Кечки круиз' : 'Sunset Cruise', vessel: t.fleet_section.alykul, time: '18:00', dur: lang === 'ru' ? '2 ч' : '2h', price: '1 400 KGS', freq: t.schedule_section.daily, cls: 'bg-green-50 text-green-700' },
                { route: lang === 'ru' ? 'Утренний круиз' : lang === 'ky' ? 'Эртеңки круиз' : 'Morning Cruise', vessel: t.fleet_section.alykul, time: '10:00', dur: lang === 'ru' ? '1.5 ч' : '1.5h', price: '1 200 KGS', freq: t.schedule_section.daily, cls: 'bg-green-50 text-green-700' },
                { route: lang === 'ru' ? 'Скоростной тур' : lang === 'ky' ? 'Ылдам тур' : 'Speed Tour', vessel: lang === 'ru' ? 'Катер' : 'Speedboat', time: '12 / 14 / 16', dur: '40m', price: '2 000 KGS', freq: t.schedule_section.daily, cls: 'bg-green-50 text-green-700' },
                { route: t.catalog.private_charter, vessel: t.fleet_section.nomad, time: '—', dur: '2-6h', price: '7 000+ KGS', freq: t.schedule_section.on_request, cls: 'bg-ocean-light text-ocean' },
                { route: t.catalog.kids_party, vessel: t.fleet_section.alykul, time: '14:00', dur: '2.5h', price: '1 000 KGS', freq: t.schedule_section.weekend, cls: 'bg-amber-50 text-amber-700' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-white/60 transition-colors">
                  <td className="py-4 px-4 font-semibold">{row.route}</td>
                  <td className="py-4 px-4 text-sm text-muted">{row.vessel}</td>
                  <td className="py-4 px-4 font-heading font-bold text-lg">{row.time}</td>
                  <td className="py-4 px-4 text-sm">{row.dur}</td>
                  <td className="py-4 px-4 font-bold text-ocean">{row.price}</td>
                  <td className="py-4 px-4"><span className={`pill ${row.cls}`}>{row.freq}</span></td>
                  <td className="py-4 px-4">
                    <BookButton service={row.route} price={row.price} label={t.routes_section.book} className="!w-auto !px-5 !py-2 !rounded-full !text-xs" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════ FLEET ═══════════ */}
      <section className="px-6 md:px-20 lg:px-32 py-24" id="fleet">
        <div className="mb-16">
          <div className="pill bg-ocean-light text-ocean mb-4">{t.fleet_section.badge}</div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl uppercase tracking-tight mb-4">{t.fleet_section.title}</h2>
          <p className="text-muted max-w-lg">{t.fleet_section.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { img: '/images/q02.jpg', name: t.fleet_section.alykul, desc: t.fleet_section.alykul_desc, specs: [`${t.fleet_section.up_to} 200 ${t.fleet_section.pax}`, `2 ${t.fleet_section.decks}`, t.fleet_section.banquet] },
            { img: '/images/ep03.jpg', name: t.fleet_section.nomad, desc: t.fleet_section.nomad_desc, specs: [`${t.fleet_section.up_to} 12 ${t.fleet_section.pax}`, t.fleet_section.sailing] },
            { img: '/images/scene6.jpg', name: t.fleet_section.speedboats, desc: t.fleet_section.speedboats_desc, specs: [`${t.fleet_section.up_to} 8 ${t.fleet_section.pax}`, `60 ${t.fleet_section.kmh}`] },
          ].map(vessel => (
            <div key={vessel.name} className="group">
              <div className="relative rounded-3xl overflow-hidden mb-5">
                <Image src={vessel.img} alt={vessel.name} width={500} height={350} className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-bold text-xl mb-2">{vessel.name}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {vessel.specs.map(spec => (
                  <span key={spec} className="pill bg-stone text-muted-dark">{spec}</span>
                ))}
              </div>
              <p className="text-muted text-sm leading-relaxed">{vessel.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section className="px-6 md:px-20 lg:px-32 py-24 bg-navy text-white" id="about">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="pill bg-white/[0.06] text-white/40 border border-white/10 mb-6">{lang === 'ru' ? 'О компании' : lang === 'ky' ? 'Компания жөнүндө' : 'About us'}</div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl uppercase tracking-tight mb-8">{t.about_section.title}</h2>
            <p className="text-white/40 leading-relaxed mb-4">{t.about_section.text_1}</p>
            <p className="text-white/40 leading-relaxed">{t.about_section.text_2}</p>
          </div>
          <div className="relative">
            <Image src="/images/scene4.jpg" alt="Alykul" width={600} height={500} className="rounded-3xl object-cover w-full h-[400px]" />
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5">
              <div className="font-heading font-bold text-3xl text-white">12K+</div>
              <div className="text-white/40 text-sm">{t.stats.guests}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS ═══════════ */}
      <section className="px-6 md:px-20 lg:px-32 py-24" id="reviews">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div>
            <div className="pill bg-ocean-light text-ocean mb-4">{t.reviews_section.badge}</div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl uppercase tracking-tight">{t.reviews_section.title}</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map(review => (
            <div key={review.name} className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-ocean/5 transition-all duration-300">
              <Image src={review.img} alt={review.name} width={400} height={220} className="w-full h-[200px] object-cover" />
              <div className="p-6">
                <div className="text-amber-400 text-lg mb-3">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</div>
                <p className="text-muted text-sm leading-relaxed mb-4">{review.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-stone flex items-center justify-center font-bold text-sm text-navy">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{review.name}</div>
                    <div className="text-muted text-xs">{review.city}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="px-6 md:px-20 lg:px-32 py-20">
        <div className="relative bg-navy rounded-[2rem] overflow-hidden px-8 md:px-16 py-16 md:py-20">
          <div className="absolute inset-0">
            <Image src="/images/scene7.jpg" alt="" fill className="object-cover opacity-20" />
          </div>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase text-white tracking-tight mb-6">
              {lang === 'ru' ? 'Готовы к приключению?' : lang === 'ky' ? 'Укмуштуулукка даярсызбы?' : 'Ready for adventure?'}
            </h2>
            <p className="text-white/40 mb-10">
              {lang === 'ru' ? 'Забронируйте незабываемый тур на Иссык-Куле прямо сейчас' : lang === 'ky' ? 'Ысык-Көлгө унутулгус турду азыр брондоңуз' : 'Book an unforgettable tour on Issyk-Kul right now'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${lang}/trips`} className="px-8 py-4 bg-ocean text-white rounded-full font-bold text-lg hover:bg-ocean-dark transition-colors">
                {t.routes_section.book}
              </Link>
              <a href="https://wa.me/996555123456" target="_blank" className="px-8 py-4 bg-white/[0.08] text-white rounded-full font-bold text-lg border border-white/10 hover:bg-white/15 transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MAP ═══════════ */}
      <div id="map" className="px-6 md:px-20 lg:px-32 pb-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186964.5684587!2d76.89!3d42.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c5e2e27a3b%3A0x6f2a7c29d3f4d8a1!2z0KfQvtC70L_QvtC9LdCQ0YLQsA!5e0!3m2!1sru!2skg!4v1"
          className="w-full h-[350px] border-0 rounded-3xl"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-navy text-white px-6 md:px-20 lg:px-32 pt-20 pb-8" id="contacts">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 font-heading font-bold text-2xl uppercase mb-6">
              <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                <defs><linearGradient id="fLogo" x1="0" y1="0" x2="40" y2="40"><stop offset="0%" stopColor="#3a8ef7" /><stop offset="100%" stopColor="#1A6FD4" /></linearGradient></defs>
                <path d="M20 4C20 4 8 18 8 24C8 28 12 32 20 32C28 32 32 28 32 24C32 18 20 4 20 4Z" fill="url(#fLogo)" opacity="0.2" />
                <path d="M12 26Q16 20 20 8Q24 20 28 26" stroke="url(#fLogo)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
              Алыкул
            </div>
            <p className="text-white/30 text-sm leading-relaxed">{t.about_section.text_1.slice(0, 120)}...</p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-2">{t.footer.contacts}</h4>
            <a href="tel:+996555123456" className="text-white/30 hover:text-white text-sm transition-colors">+996 555 123 456</a>
            <a href="mailto:info@alykul.kg" className="text-white/30 hover:text-white text-sm transition-colors">info@alykul.kg</a>
            <a href="#map" className="text-white/30 hover:text-white text-sm transition-colors">Чолпон-Ата, Иссык-Куль</a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-2">{t.footer.navigation}</h4>
            <a href="#routes" className="text-white/30 hover:text-white text-sm transition-colors">{t.nav.routes}</a>
            <a href="#schedule" className="text-white/30 hover:text-white text-sm transition-colors">{t.nav.schedule}</a>
            <a href="#fleet" className="text-white/30 hover:text-white text-sm transition-colors">{t.nav.fleet}</a>
            <Link href={`/${lang}/trips`} className="text-white/30 hover:text-white text-sm transition-colors">{t.nav.booking}</Link>
            <Link href={`/${lang}/account`} className="text-white/30 hover:text-white text-sm transition-colors">{lang === 'ru' ? 'Личный кабинет' : 'Account'}</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-2">{t.footer.about}</h4>
            <a href="#about" className="text-white/30 hover:text-white text-sm transition-colors">{t.nav.about}</a>
            <a href="#reviews" className="text-white/30 hover:text-white text-sm transition-colors">{t.nav.reviews}</a>
            <a href={`/${lang}/privacy`} className="text-white/30 hover:text-white text-sm transition-colors">{t.footer.privacy}</a>
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/20 text-sm">&copy; 2026 {t.footer.copyright}</div>
          <div className="flex gap-4">
            <a href="https://wa.me/996555123456" target="_blank" className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
