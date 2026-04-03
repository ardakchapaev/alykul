'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

/* ═══════════════ TRANSLATIONS ═══════════════ */
const translations = {
  ru: {
    title: 'Часто задаваемые вопросы',
    subtitle: 'Ответы на популярные вопросы о бронировании, рейсах и услугах Алыкул',
    searchPlaceholder: 'Поиск по вопросам...',
    categories: {
      all: 'Все',
      booking: 'Бронирование',
      payment: 'Оплата',
      trips: 'Рейсы',
      safety: 'Безопасность',
      cancel: 'Отмена',
      general: 'Общие',
    },
    cta: {
      title: 'Не нашли ответ?',
      desc: 'Свяжитесь с нашей командой поддержки — мы ответим в течение 30 минут.',
      contact: 'Написать нам',
      whatsapp: 'WhatsApp',
    },
    back: 'На главную',
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Answers to common questions about booking, trips, and Alykul services',
    searchPlaceholder: 'Search questions...',
    categories: {
      all: 'All',
      booking: 'Booking',
      payment: 'Payment',
      trips: 'Trips',
      safety: 'Safety',
      cancel: 'Cancellation',
      general: 'General',
    },
    cta: {
      title: "Didn't find your answer?",
      desc: 'Contact our support team — we respond within 30 minutes.',
      contact: 'Contact Us',
      whatsapp: 'WhatsApp',
    },
    back: 'Home',
  },
  ky: {
    title: 'Кеп берилуучу суроолор',
    subtitle: 'Алыкул кызматтары, рейстер жана брондоо жонундо популярдуу суроолор',
    searchPlaceholder: 'Суроолорду издоо...',
    categories: {
      all: 'Баары',
      booking: 'Брондоо',
      payment: 'Толоо',
      trips: 'Рейстер',
      safety: 'Коопсуздук',
      cancel: 'Жокко чыгаруу',
      general: 'Жалпы',
    },
    cta: {
      title: 'Жооп таба алган жоксузбу?',
      desc: 'Колдоо тобубузга кайрылыныз — 30 мүнот ичинде жооп беребиз.',
      contact: 'Бизге жазыныз',
      whatsapp: 'WhatsApp',
    },
    back: 'Башкы бет',
  },
};

type Category = 'all' | 'booking' | 'payment' | 'trips' | 'safety' | 'cancel' | 'general';

interface FAQ {
  q: { ru: string; en: string; ky: string };
  a: { ru: string; en: string; ky: string };
  category: Category;
}

const faqs: FAQ[] = [
  {
    category: 'booking',
    q: {
      ru: 'Как забронировать рейс?',
      en: 'How do I book a trip?',
      ky: 'Рейсти кантип брондоого болот?',
    },
    a: {
      ru: 'Выберите маршрут на сайте, укажите дату и количество гостей, затем нажмите "Забронировать". Вы получите QR-код на указанный номер телефона. Также можно забронировать через WhatsApp или по телефону +996 550 123-456.',
      en: 'Select a route on our website, choose the date and number of guests, then click "Book Now". You will receive a QR code on your phone number. You can also book via WhatsApp or call +996 550 123-456.',
      ky: 'Сайттан маршрутту танданыз, кунун жана конок санын корсотунуз, андан кийин "Брондоо" баскычын басыныз. Телефон номеринизге QR-код жиберилет.',
    },
  },
  {
    category: 'payment',
    q: {
      ru: 'Какие способы оплаты доступны?',
      en: 'What payment methods are available?',
      ky: 'Кандай толоо ыкмалары бар?',
    },
    a: {
      ru: 'Мы принимаем Mbank, Optima Pay, О!Деньги, Visa/Mastercard, а также наличные на причале. При онлайн-оплате вы получите электронный билет с QR-кодом мгновенно.',
      en: 'We accept Mbank, Optima Pay, O!Money, Visa/Mastercard, and cash at the pier. Online payments generate an instant e-ticket with a QR code.',
      ky: 'Mbank, Optima Pay, О!Акча, Visa/Mastercard жана причалда накталай кабыл алабыз.',
    },
  },
  {
    category: 'cancel',
    q: {
      ru: 'Можно ли отменить бронирование?',
      en: 'Can I cancel my booking?',
      ky: 'Брондоону жокко чыгарса болобу?',
    },
    a: {
      ru: 'Да. При отмене за 24+ часа до рейса — полный возврат средств. За 12–24 часа — возврат 50%. Менее чем за 12 часов — возврат невозможен. Отменить можно в личном кабинете или через WhatsApp.',
      en: 'Yes. Cancellations 24+ hours before departure get a full refund. 12-24 hours — 50% refund. Less than 12 hours — no refund. Cancel via your account or WhatsApp.',
      ky: 'Ооба. 24+ саат мурда — толук кайтаруу. 12–24 саат — 50%. 12 сааттан аз — кайтаруу жок.',
    },
  },
  {
    category: 'safety',
    q: {
      ru: 'Что делать если погода плохая?',
      en: 'What happens in bad weather?',
      ky: 'Аба ырайы начар болсо эмне кылуу керек?',
    },
    a: {
      ru: 'При штормовом предупреждении рейс автоматически отменяется с полным возвратом средств. Мы уведомим вас по SMS и в личном кабинете за 2 часа до рейса. Можно перенести на другую дату бесплатно.',
      en: 'If there is a storm warning, the trip is automatically cancelled with a full refund. We notify you via SMS 2 hours before departure. Free rebooking to another date is available.',
      ky: 'Бороон эскертуусундо рейс автоматтык турдо жокко чыгарылат, акча толук кайтарылат.',
    },
  },
  {
    category: 'booking',
    q: {
      ru: 'Нужно ли распечатывать билет?',
      en: 'Do I need to print my ticket?',
      ky: 'Билетти басып чыгаруу керекпи?',
    },
    a: {
      ru: 'Нет, достаточно показать QR-код с телефона при посадке. Наш сотрудник отсканирует код на причале. Если нет интернета — покажите скриншот QR-кода.',
      en: 'No, just show the QR code on your phone when boarding. Our staff will scan it at the pier. No internet? A screenshot of the QR code works too.',
      ky: 'Жок, телефонунуздагы QR-кодду корсотунуз. Интернет жок болсо — скриншот да жарайт.',
    },
  },
  {
    category: 'general',
    q: {
      ru: 'Есть ли детские места?',
      en: 'Are there seats for children?',
      ky: 'Балдар учун орундар барбы?',
    },
    a: {
      ru: 'Да, дети до 3 лет путешествуют бесплатно (без отдельного места). Дети от 3 до 12 лет получают скидку 50%. На теплоходе есть детская зона с играми и анимацией.',
      en: 'Yes, children under 3 travel free (no separate seat). Ages 3-12 get a 50% discount. The ship has a kids zone with games and entertainment.',
      ky: 'Ооба, 3 жашка чейинки балдар бекер. 3–12 жаш — 50% арзандатуу.',
    },
  },
  {
    category: 'trips',
    q: {
      ru: 'Можно ли взять еду на борт?',
      en: 'Can I bring food on board?',
      ky: 'Тамак ала кирсе болобу?',
    },
    a: {
      ru: 'На теплоходе «Алыкул» работает буфет с напитками и закусками. На скоростных катерах можно взять свою еду и напитки (кроме стеклянной тары).',
      en: 'The "Alykul" ship has an onboard buffet with drinks and snacks. On speedboats, you may bring your own food and drinks (no glass containers).',
      ky: '«Алыкул» теплоходунда буфет иштейт. Катерлерге озунуздун тамагыныздын алып кирсе болот (айнек идиштен башка).',
    },
  },
  {
    category: 'trips',
    q: {
      ru: 'Сколько длится круиз?',
      en: 'How long is the cruise?',
      ky: 'Круиз канча убакыт созулат?',
    },
    a: {
      ru: 'Закатный круиз — 2 часа, утренний круиз — 1.5 часа, скоростной тур на катере — 40 минут. Приватный чартер — от 2 до 6 часов по вашему желанию.',
      en: 'Sunset cruise — 2 hours, morning cruise — 1.5 hours, speedboat tour — 40 minutes. Private charter — 2 to 6 hours as you wish.',
      ky: 'Кечки круиз — 2 саат, эртенки круиз — 1.5 саат, ылдам тур — 40 мунот.',
    },
  },
  {
    category: 'general',
    q: {
      ru: 'Где причал отправления?',
      en: 'Where is the departure pier?',
      ky: 'Жонотуу причалы кайда?',
    },
    a: {
      ru: 'Основные причалы: Чолпон-Ата (центральный пляж, координаты на Google Maps) и Бостери (возле аквапарка). Точные координаты отправляются в SMS после бронирования.',
      en: 'Main piers: Cholpon-Ata (central beach, coordinates on Google Maps) and Bosteri (near the waterpark). Exact coordinates are sent via SMS after booking.',
      ky: 'Негизги причалдар: Чолпон-Ата (борбордук пляж) жана Бостери (аквапарктын жанында).',
    },
  },
  {
    category: 'general',
    q: {
      ru: 'Есть ли Wi-Fi на борту?',
      en: 'Is there Wi-Fi on board?',
      ky: 'Бортто Wi-Fi барбы?',
    },
    a: {
      ru: 'На теплоходе «Алыкул» — да, бесплатный Wi-Fi на всех палубах. На скоростных катерах Wi-Fi не предусмотрен из-за удалённости от берега.',
      en: 'On the "Alykul" ship — yes, free Wi-Fi on all decks. Speedboats do not have Wi-Fi due to distance from shore.',
      ky: '«Алыкул» теплоходунда — ооба, бекер Wi-Fi. Катерлерде Wi-Fi жок.',
    },
  },
  {
    category: 'booking',
    q: {
      ru: 'Можно ли арендовать яхту целиком?',
      en: 'Can I rent the whole yacht?',
      ky: 'Яхтаны толугу менен ижарага алса болобу?',
    },
    a: {
      ru: 'Да, приватный чартер доступен от 7,000 KGS. Включает капитана, маршрут по вашему выбору и обслуживание на борту. Забронировать можно через сайт или WhatsApp.',
      en: 'Yes, private charter starts from 7,000 KGS. Includes a captain, your choice of route, and onboard service. Book via our website or WhatsApp.',
      ky: 'Ооба, жеке чартер 7,000 KGS тен. Капитан, маршрут жана тейлоо кирет.',
    },
  },
  {
    category: 'booking',
    q: {
      ru: 'Как организовать детский праздник?',
      en: 'How to organize a kids party?',
      ky: 'Балдар майрамын кантип уюштурса болот?',
    },
    a: {
      ru: 'Заполните форму на странице группового бронирования или свяжитесь с нами через WhatsApp. Мы предлагаем анимацию, торт, украшения и специальное меню для детей от 1,000 KGS/человек.',
      en: "Fill in the form on the group booking page or contact us via WhatsApp. We offer animation, cake, decorations, and a special kids menu from 1,000 KGS/person.",
      ky: 'Топтук брондоо барагындагы форманы толтуруныз же WhatsApp аркылуу байланышыныз.',
    },
  },
  {
    category: 'general',
    q: {
      ru: 'Какие документы нужны?',
      en: 'What documents do I need?',
      ky: 'Кандай документтер керек?',
    },
    a: {
      ru: 'Только телефон с QR-кодом билета. Для иностранных граждан — паспорт (проверка при посадке). Для детей до 12 лет — свидетельство о рождении не требуется, достаточно сопровождения взрослого.',
      en: 'Just your phone with the ticket QR code. Foreign citizens need a passport (checked at boarding). Children under 12 do not need a birth certificate — adult accompaniment is sufficient.',
      ky: 'Билеттин QR-коду бар телефон гана. Чет элдиктерге — паспорт.',
    },
  },
  {
    category: 'general',
    q: {
      ru: 'Есть ли программа лояльности?',
      en: 'Is there a loyalty program?',
      ky: 'Лоялдуулук программасы барбы?',
    },
    a: {
      ru: 'Да, 3 уровня: Standard, Gold, VIP. 10% от каждой покупки начисляются как баллы. Gold — от 5 поездок (скидка 10%), VIP — от 15 поездок (скидка 20% + приоритетная посадка).',
      en: 'Yes, 3 tiers: Standard, Gold, VIP. 10% of every purchase is credited as points. Gold — from 5 trips (10% discount), VIP — from 15 trips (20% discount + priority boarding).',
      ky: 'Ооба, 3 денгээл: Standard, Gold, VIP. Ар бир сатып алуунун 10% упай катары эсептелет.',
    },
  },
  {
    category: 'general',
    q: {
      ru: 'Как связаться с поддержкой?',
      en: 'How to contact support?',
      ky: 'Колдоо менен кантип байланышса болот?',
    },
    a: {
      ru: 'Телефон: +996 550 123-456 (ежедневно 09:00–21:00). WhatsApp: +996 550 123-456. Telegram: @alykul_support. Email: info@alykul.kg. Среднее время ответа — 15 минут.',
      en: 'Phone: +996 550 123-456 (daily 09:00-21:00). WhatsApp: +996 550 123-456. Telegram: @alykul_support. Email: info@alykul.kg. Average response time — 15 minutes.',
      ky: 'Телефон: +996 550 123-456 (кундолук 09:00–21:00). WhatsApp: +996 550 123-456. Telegram: @alykul_support.',
    },
  },
];

/* ═══════════════ ACCORDION ITEM ═══════════════ */
function AccordionItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[#0F2B46]/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
      >
        <span className={`text-[15px] font-medium pr-4 transition-colors ${isOpen ? 'text-[#0F2B46]' : 'text-[#0F2B46]/70 group-hover:text-[#0F2B46]'}`}>
          {question}
        </span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-[#00897B] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
        <p className="text-[#0F2B46]/60 text-sm leading-relaxed px-1">{answer}</p>
      </div>
    </div>
  );
}

/* ═══════════════ FAQ PAGE ═══════════════ */
export default function FAQPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';
  const t = translations[lang as keyof typeof translations] || translations.ru;

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categoryKeys: Category[] = ['all', 'booking', 'payment', 'trips', 'safety', 'cancel', 'general'];

  const filtered = faqs.filter(faq => {
    const matchCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchSearch = search === '' ||
      faq.q[lang as keyof typeof faq.q]?.toLowerCase().includes(search.toLowerCase()) ||
      faq.a[lang as keyof typeof faq.a]?.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0F2B46] pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-white/40 text-xs tracking-[2px] uppercase mb-8 hover:text-white/60 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 19-7-7 7-7"/></svg>
            {t.back}
          </Link>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: 'FAQ' }]} />
      </div>

      {/* Search + Categories */}
      <section className="max-w-3xl mx-auto px-6 -mt-6">
        <div className="bg-white rounded-xl shadow-lg border border-[#0F2B46]/5 p-4">
          <div className="relative mb-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F2B46]/30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 border border-[#0F2B46]/10 rounded-lg text-sm text-[#0F2B46] placeholder:text-[#0F2B46]/30 outline-none focus:border-[#00897B]/40 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryKeys.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#00897B] text-white'
                    : 'bg-[#0F2B46]/5 text-[#0F2B46]/50 hover:bg-[#0F2B46]/10 hover:text-[#0F2B46]/70'
                }`}
              >
                {t.categories[cat]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <p className="text-center text-[#0F2B46]/40 text-sm py-12">
            {lang === 'ru' ? 'Ничего не найдено' : lang === 'ky' ? 'Эч нерсе табылган жок' : 'No results found'}
          </p>
        ) : (
          <div className="divide-y divide-[#0F2B46]/5">
            {filtered.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.q[lang as keyof typeof faq.q] || faq.q.ru}
                answer={faq.a[lang as keyof typeof faq.a] || faq.a.ru}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-[#F7F9FB] py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-[#0F2B46] text-2xl font-bold mb-3">{t.cta.title}</h2>
          <p className="text-[#0F2B46]/50 text-sm mb-8">{t.cta.desc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${lang}/contact`}
              className="bg-[#0F2B46] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#0F2B46]/90 transition-colors"
            >
              {t.cta.contact}
            </Link>
            <a
              href="https://wa.me/996550123456"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#20BD5A] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.634-1.215A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.16 0-4.16-.686-5.795-1.852l-.415-.287-2.748.72.734-2.681-.315-.448A9.72 9.72 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              {t.cta.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
