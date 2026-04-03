import Image from 'next/image';
import { getDictionary, type Locale } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import HeroVideo from '@/components/HeroVideo';
import WaveDivider from '@/components/WaveDivider';
import HeroBooking from './HeroBooking';
import { BookButton } from '@/components/WhatsAppBooking';
import { IconBooking, IconFleet, IconExperience, IconSafety, IconMultilang, IconPrices } from '@/components/Icons';
import SaileyBlogWrapper from '@/components/SaileyBlogTheme';
import SaileyWrapper from '@/components/SaileyTheme';
import DeepOceanWrapper from '@/components/DeepOceanTheme';
import CoastalLuxuryWrapper from '@/components/CoastalLuxuryTheme';
import AiChatWidget from '@/components/AiChatWidget';
import WeatherWidget from '@/components/WeatherWidget';

export default async function Home({ params }: { params: { lang: Locale } }) {
  const t = await getDictionary(params.lang);

  const scheduleData = [
    { route: params.lang === 'ru' ? 'Закатный круиз (Чолпон-Ата)' : params.lang === 'ky' ? 'Кечки круиз (Чолпон-Ата)' : 'Sunset Cruise (Cholpon-Ata)', vessel: t.fleet_section.alykul, departure: '18:00', duration: params.lang === 'ru' ? '2 часа' : params.lang === 'ky' ? '2 саат' : '2 hours', price: '1 400 KGS', freq: t.schedule_section.daily, freqClass: 'bg-green-100 text-green-800' },
    { route: params.lang === 'ru' ? 'Утренний круиз (Бостери)' : params.lang === 'ky' ? 'Эртеңки круиз (Бостери)' : 'Morning Cruise (Bosteri)', vessel: t.fleet_section.alykul, departure: '10:00', duration: params.lang === 'ru' ? '1.5 часа' : params.lang === 'ky' ? '1.5 саат' : '1.5 hours', price: '1 200 KGS', freq: t.schedule_section.daily, freqClass: 'bg-green-100 text-green-800' },
    { route: params.lang === 'ru' ? 'Скоростной тур (Чолпон-Ата)' : params.lang === 'ky' ? 'Ылдам тур (Чолпон-Ата)' : 'Speed Tour (Cholpon-Ata)', vessel: params.lang === 'ru' ? 'Скоростной катер' : params.lang === 'ky' ? 'Ылдам катер' : 'Speedboat', departure: '12:00, 14:00, 16:00', duration: params.lang === 'ru' ? '40 мин' : params.lang === 'ky' ? '40 мүн' : '40 min', price: '2 000 KGS', freq: t.schedule_section.daily, freqClass: 'bg-green-100 text-green-800' },
    { route: t.catalog.private_charter, vessel: t.fleet_section.nomad, departure: t.schedule_section.on_request, duration: params.lang === 'ru' ? '2–6 часов' : params.lang === 'ky' ? '2–6 саат' : '2–6 hours', price: params.lang === 'ru' ? 'от 7 000 KGS' : params.lang === 'ky' ? '7 000 KGS ден' : 'from 7 000 KGS', freq: t.schedule_section.on_request, freqClass: 'bg-blue-100 text-blue-800' },
    { route: t.catalog.kids_party, vessel: t.fleet_section.alykul, departure: t.schedule_section.on_request, duration: params.lang === 'ru' ? '2–3 часа' : params.lang === 'ky' ? '2–3 саат' : '2–3 hours', price: params.lang === 'ru' ? 'от 1 000 KGS/чел' : params.lang === 'ky' ? '1 000 KGS/адам' : 'from 1 000 KGS/pax', freq: t.schedule_section.weekend, freqClass: 'bg-orange-100 text-orange-800' },
  ];

  const catalogCards = [
    { img: '/images/q02.jpg', alt: t.catalog.sunset_cruise, category: t.catalog.cruise, name: t.catalog.sunset_cruise, price: params.lang === 'ru' ? 'от 1 400 KGS' : params.lang === 'ky' ? '1 400 KGS ден' : 'from 1 400 KGS' },
    { img: '/images/ep03.jpg', alt: t.catalog.private_charter, category: t.catalog.charter, name: t.catalog.private_charter, price: params.lang === 'ru' ? 'от 7 000 KGS' : params.lang === 'ky' ? '7 000 KGS ден' : 'from 7 000 KGS' },
    { img: '/images/scene6.jpg', alt: t.catalog.speed_tour, category: t.catalog.entertainment, name: t.catalog.speed_tour, price: params.lang === 'ru' ? 'от 2 000 KGS' : params.lang === 'ky' ? '2 000 KGS ден' : 'from 2 000 KGS' },
    { img: '/images/kids.jpg', alt: t.catalog.kids_party, category: t.catalog.kids, name: t.catalog.kids_party, price: params.lang === 'ru' ? 'от 1 000 KGS' : params.lang === 'ky' ? '1 000 KGS ден' : 'from 1 000 KGS' },
  ];

  const reviews = [
    { img: '/images/q01.jpg', name: params.lang === 'ru' ? 'Айгуль К.' : 'Aigul K.', city: params.lang === 'ru' ? 'г. Бишкек' : 'Bishkek', stars: 5, text: params.lang === 'ru' ? 'Потрясающий закатный круиз из Чолпон-Аты! Вид на горы с воды — это нечто невероятное. Бронирование заняло 2 минуты.' : 'Amazing sunset cruise from Cholpon-Ata! The mountain view from the water is incredible. Booking took 2 minutes.' },
    { img: '/images/captain2.jpg', name: params.lang === 'ru' ? 'Бакыт М.' : 'Bakyt M.', city: params.lang === 'ru' ? 'г. Каракол' : 'Karakol', stars: 5, text: params.lang === 'ru' ? 'Профессиональная команда! Капитан рассказал историю озера, дети были в восторге от пиратского шоу на борту.' : 'Professional crew! The captain told the history of the lake, kids loved the pirate show onboard.' },
    { img: '/images/scene8.jpg', name: params.lang === 'ru' ? 'Дмитрий С.' : 'Dmitry S.', city: params.lang === 'ru' ? 'г. Алматы' : 'Almaty', stars: 4, text: params.lang === 'ru' ? 'Скоростной тур из Бостери — адреналин! Лучший опыт на Иссык-Куле. Обязательно вернёмся следующим летом.' : 'Speed tour from Bosteri — pure adrenaline! Best experience on Issyk-Kul. Will definitely return next summer.' },
  ];

  const galleryImages = ['hero.jpg', 'scene7.jpg', 'scene6.jpg', 'q02.jpg', 'alykul1.jpg', 'kids.jpg', 'promo.jpg', 'scene4.jpg'];

  return (
    <>
      {/* M2: Sailey Blog — full overlay */}
      <SaileyBlogWrapper lang={params.lang} />
      {/* M3: Sailey theme — full overlay (original) */}
      <SaileyWrapper lang={params.lang}>{null}</SaileyWrapper>
      {/* M4: Deep Ocean — full overlay */}
      <DeepOceanWrapper lang={params.lang} />
      {/* M5: Coastal Luxury — full overlay */}
      <CoastalLuxuryWrapper lang={params.lang} />

      {/* HERO (M1/M2) */}
      <section className="relative h-screen flex items-center overflow-hidden" id="hero">
        <HeroVideo />
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[rgba(10,22,40,0.75)] via-[rgba(24,47,72,0.5)] to-[rgba(36,109,201,0.2)]" />
        <div className="relative z-[2] px-6 md:px-14 max-w-[650px]">
          <div className="flex items-center gap-3 text-foam/70 text-sm uppercase tracking-[2px] mb-10">
            {t.hero.brand}
          </div>
          <h1 className="font-heading font-bold italic text-white text-[42px] md:text-[76px] leading-[1.05] uppercase mb-4 drop-shadow-lg">
            {t.hero.title_1}<br />{t.hero.title_2}
          </h1>
          <p className="text-foam text-lg mb-8 opacity-90">{t.hero.subtitle}</p>
          <HeroBooking dict={t} />
        </div>
        <div className="absolute top-4 right-4 z-[3] hidden md:block">
          <WeatherWidget variant="dark" />
        </div>
        <Navbar dict={t.nav} lang={params.lang} />
        <WaveDivider nextColor="white" withYacht />
      </section>

      {/* STATS */}
      <div className="relative bg-white px-6 md:px-14 py-12 pb-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '5+', label: t.stats.years },
            { value: '12K+', label: t.stats.guests },
            { value: '8', label: t.stats.vessels },
            { value: '15', label: t.stats.routes },
          ].map(stat => (
            <div key={stat.label} className="text-center stat-hover group cursor-default transition-transform duration-300">
              <h3 className="font-heading font-bold text-3xl md:text-5xl text-ocean group-hover:text-ocean-dark transition-colors">{stat.value}</h3>
              <p className="text-muted text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        <WaveDivider nextColor="navy" />
      </div>

      {/* USP */}
      <section className="relative bg-navy text-foam px-6 md:px-14 py-16 pb-28">
        <h2 className="font-heading font-bold text-3xl md:text-[42px] uppercase text-white mb-3">{t.usp.title}</h2>
        <p className="text-muted mb-12">{t.usp.subtitle}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { Icon: IconBooking, title: t.usp.online, desc: t.usp.online_desc },
            { Icon: IconFleet, title: t.usp.fleet, desc: t.usp.fleet_desc },
            { Icon: IconExperience, title: t.usp.experience, desc: t.usp.experience_desc },
            { Icon: IconSafety, title: t.usp.safety, desc: t.usp.safety_desc },
            { Icon: IconMultilang, title: t.usp.multilang, desc: t.usp.multilang_desc },
            { Icon: IconPrices, title: t.usp.prices, desc: t.usp.prices_desc },
          ].map(item => (
            <div key={item.title} className="usp-card flex gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ocean-dark to-sky flex items-center justify-center shrink-0 text-white shadow-lg shadow-ocean/30">
                <item.Icon />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <WaveDivider nextColor="navy" />
      </section>

      {/* GALLERY */}
      <div className="relative bg-navy overflow-hidden py-4 pb-28">
        <div className="flex gap-1 w-max">
          {galleryImages.map(img => (
            <Image key={img} src={`/images/${img}`} alt="" width={300} height={200} className="h-[200px] w-auto object-cover brightness-90 hover:brightness-110 transition-all" />
          ))}
        </div>
        <WaveDivider nextColor="white" withYacht />
      </div>

      {/* ROUTES CATALOG */}
      <section className="relative px-6 md:px-14 py-16 pb-28" id="routes">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="font-heading font-bold text-3xl md:text-[42px] uppercase">{t.routes_section.title}</span>
            <span className="ml-3 px-4 py-1.5 rounded-full bg-ocean text-white text-xs font-semibold uppercase">{t.routes_section.badge}</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {catalogCards.map(card => (
            <div key={card.name} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <Image src={card.img} alt={card.alt} width={400} height={250} className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <div className="text-xs font-semibold text-ocean uppercase tracking-wider mb-2">{card.category}</div>
                <h3 className="font-bold text-lg mb-1">{card.name}</h3>
                <div className="text-ocean font-bold mb-3">{card.price}</div>
                <BookButton service={card.name} price={card.price} label={t.routes_section.book} />
              </div>
            </div>
          ))}
        </div>
        <WaveDivider nextColor="stone" />
      </section>

      {/* SCHEDULE */}
      <section className="relative bg-[#F4F8FB] px-6 md:px-14 py-16 pb-28" id="schedule">
        <div className="mb-8">
          <span className="font-heading font-bold text-3xl md:text-[42px] uppercase">{t.schedule_section.title}</span>
          <span className="ml-3 px-4 py-1.5 rounded-full bg-ocean text-white text-xs font-semibold uppercase">{t.schedule_section.badge}</span>
        </div>
        <p className="text-muted mb-8">{t.schedule_section.subtitle}</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-navy text-white text-sm font-semibold">
                <th className="text-left py-3.5 px-4">{t.schedule_section.route}</th>
                <th className="text-left py-3.5 px-4">{t.schedule_section.vessel}</th>
                <th className="text-left py-3.5 px-4">{t.schedule_section.departure}</th>
                <th className="text-left py-3.5 px-4">{t.schedule_section.duration}</th>
                <th className="text-left py-3.5 px-4">{t.schedule_section.price}</th>
                <th className="text-left py-3.5 px-4">{t.schedule_section.frequency}</th>
                <th className="py-3.5 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((row, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-ocean/5 transition-colors">
                  <td className="py-3 px-4 text-sm">{row.route}</td>
                  <td className="py-3 px-4 text-sm">{row.vessel}</td>
                  <td className="py-3 px-4 text-sm">{row.departure}</td>
                  <td className="py-3 px-4 text-sm">{row.duration}</td>
                  <td className="py-3 px-4 text-sm font-semibold">{row.price}</td>
                  <td className="py-3 px-4"><span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${row.freqClass}`}>{row.freq}</span></td>
                  <td className="py-3 px-4">
                    <BookButton service={row.route} price={row.price} label={t.routes_section.book} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <WaveDivider nextColor="white" withYacht />
      </section>

      {/* FLEET */}
      <section className="relative px-6 md:px-14 py-16 pb-28" id="fleet">
        <div className="mb-8">
          <span className="font-heading font-bold text-3xl md:text-[42px] uppercase">{t.fleet_section.title}</span>
          <span className="ml-3 px-4 py-1.5 rounded-full bg-ocean text-white text-xs font-semibold uppercase">{t.fleet_section.badge}</span>
        </div>
        <p className="text-muted mb-8">{t.fleet_section.subtitle}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: '/images/q02.jpg', name: t.fleet_section.alykul, desc: t.fleet_section.alykul_desc, specs: [`${t.fleet_section.up_to} 200 ${t.fleet_section.pax}`, `2 ${t.fleet_section.decks}`, t.fleet_section.banquet] },
            { img: '/images/ep03.jpg', name: t.fleet_section.nomad, desc: t.fleet_section.nomad_desc, specs: [`${t.fleet_section.up_to} 12 ${t.fleet_section.pax}`, t.fleet_section.sailing] },
            { img: '/images/scene6.jpg', name: t.fleet_section.speedboats, desc: t.fleet_section.speedboats_desc, specs: [`${t.fleet_section.up_to} 8 ${t.fleet_section.pax}`, `${t.fleet_section.up_to} 60 ${t.fleet_section.kmh}`] },
          ].map(vessel => (
            <div key={vessel.name} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <Image src={vessel.img} alt={vessel.name} width={400} height={250} className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">{vessel.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {vessel.specs.map(spec => (
                    <span key={spec} className="text-xs bg-foam text-ocean px-2.5 py-1 rounded-md font-medium">{spec}</span>
                  ))}
                </div>
                <p className="text-muted text-sm">{vessel.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <WaveDivider nextColor="white" />
      </section>

      {/* ABOUT */}
      <section className="relative px-6 md:px-14 py-16 pb-28" id="about">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-[42px] uppercase mb-6">{t.about_section.title}</h2>
            <p className="text-muted leading-relaxed mb-4">{t.about_section.text_1}</p>
            <p className="text-muted leading-relaxed">{t.about_section.text_2}</p>
          </div>
          <Image src="/images/scene4.jpg" alt="Alykul" width={600} height={400} className="rounded-2xl object-cover w-full h-[350px]" />
        </div>
        <WaveDivider nextColor="stone" withYacht />
      </section>

      {/* REVIEWS */}
      <section className="relative bg-[#F4F8FB] px-6 md:px-14 py-16 pb-28" id="reviews">
        <div className="mb-8">
          <span className="font-heading font-bold text-3xl md:text-[42px] uppercase">{t.reviews_section.title}</span>
          <span className="ml-3 px-4 py-1.5 rounded-full bg-ocean text-white text-xs font-semibold uppercase">{t.reviews_section.badge}</span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div key={review.name} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 border border-gray-100">
              <Image src={review.img} alt={review.name} width={400} height={200} className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <div className="text-yellow-400 text-lg mb-2">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</div>
                <div className="font-bold">{review.name}</div>
                <div className="text-muted text-sm mb-3">{review.city}</div>
                <p className="text-sm text-muted leading-relaxed">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
        <WaveDivider nextColor="white" />
      </section>

      {/* MAP */}
      <div id="map" className="relative pb-28">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186964.5684587!2d76.89!3d42.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c5e2e27a3b%3A0x6f2a7c29d3f4d8a1!2z0KfQvtC70L_QvtC9LdCQ0YLQsA!5e0!3m2!1sru!2skg!4v1"
          className="w-full h-[400px] border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <WaveDivider nextColor="navy" withYacht />
      </div>

      {/* FOOTER */}
      <footer className="bg-navy text-foam px-6 md:px-14 py-14" id="contacts">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-bold text-lg mb-2">{t.footer.contacts}</h4>
            <a href="tel:+996555123456" className="text-muted hover:text-white text-sm transition-colors">+996 555 123 456</a>
            <a href="mailto:info@alykul.kg" className="text-muted hover:text-white text-sm transition-colors">info@alykul.kg</a>
            <a href="#map" className="text-muted hover:text-white text-sm transition-colors">Чолпон-Ата, Иссык-Куль</a>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-bold text-lg mb-2">{t.footer.routes}</h4>
            <a href="#schedule" className="text-muted hover:text-white text-sm transition-colors">{t.catalog.sunset_cruise}</a>
            <a href="#schedule" className="text-muted hover:text-white text-sm transition-colors">{t.catalog.private_charter}</a>
            <a href="#schedule" className="text-muted hover:text-white text-sm transition-colors">{t.catalog.speed_tour}</a>
            <a href="#schedule" className="text-muted hover:text-white text-sm transition-colors">{t.catalog.kids_party}</a>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-bold text-lg mb-2">{t.footer.navigation}</h4>
            <a href="#booking" className="text-muted hover:text-white text-sm transition-colors">{t.nav.booking}</a>
            <a href="#fleet" className="text-muted hover:text-white text-sm transition-colors">{t.nav.fleet}</a>
            <a href="#schedule" className="text-muted hover:text-white text-sm transition-colors">{t.nav.schedule}</a>
            <a href="#map" className="text-muted hover:text-white text-sm transition-colors">{t.footer.map}</a>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-bold text-lg mb-2">{t.footer.about}</h4>
            <a href={`/${params.lang}/about`} className="text-muted hover:text-white text-sm transition-colors">{t.footer.aboutLink || t.nav.about}</a>
            <a href="#fleet" className="text-muted hover:text-white text-sm transition-colors">{t.usp.safety}</a>
            <a href="#reviews" className="text-muted hover:text-white text-sm transition-colors">{t.nav.reviews}</a>
            <a href={`/${params.lang}/gifts`} className="text-muted hover:text-white text-sm transition-colors">{t.footer.gifts || 'Подарки'}</a>
            <a href={`/${params.lang}/group-booking`} className="text-muted hover:text-white text-sm transition-colors">{t.footer.groups || 'Группы'}</a>
            <a href={`/${params.lang}/privacy`} className="text-muted hover:text-white text-sm transition-colors">{t.footer.privacy}</a>
            <a href={`/${params.lang}/faq`} className="text-muted hover:text-white text-sm transition-colors">FAQ</a>
            <a href={`/${params.lang}/contact`} className="text-muted hover:text-white text-sm transition-colors">{params.lang === 'ru' ? 'Контакты' : params.lang === 'ky' ? 'Байланыштар' : 'Contact'}</a>
            <a href={`/${params.lang}/blog`} className="text-muted hover:text-white text-sm transition-colors">{params.lang === 'ru' ? 'Блог' : 'Blog'}</a>
            <a href={`/${params.lang}/terms`} className="text-muted hover:text-white text-sm transition-colors">{params.lang === 'ru' ? 'Условия' : params.lang === 'ky' ? 'Шарттар' : 'Terms'}</a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-muted text-sm">
          &copy; 2026 {t.footer.copyright}
        </div>
      </footer>

      <AiChatWidget />
    </>
  );
}
