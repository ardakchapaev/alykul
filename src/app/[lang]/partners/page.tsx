'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

const translations = {
  ru: {
    back: 'На главную',
    heroTitle: 'Партнёрская программа',
    heroSub: 'Зарабатывайте вместе с Алыкул',
    benefitsTitle: 'Преимущества партнёрства',
    benefits: [
      { icon: '💰', title: 'Комиссия до 15%', desc: 'Получайте до 15% от каждого бронирования, сделанного вашими клиентами' },
      { icon: '👤', title: 'Персональный менеджер', desc: 'Выделенный менеджер для оперативного решения любых вопросов' },
      { icon: '📦', title: 'Маркетинговые материалы', desc: 'Готовые баннеры, буклеты и промо-материалы для привлечения клиентов' },
      { icon: '⭐', title: 'Приоритетное бронирование', desc: 'Гарантированные места для ваших клиентов даже в пиковые даты' },
    ],
    howTitle: 'Как это работает',
    steps: [
      { num: '01', title: 'Заполните заявку', desc: 'Укажите данные вашей компании и контактную информацию' },
      { num: '02', title: 'Подпишите соглашение', desc: 'Мы подготовим договор с индивидуальными условиями' },
      { num: '03', title: 'Начните направлять клиентов', desc: 'Получайте комиссию с каждого подтверждённого бронирования' },
    ],
    typesTitle: 'Кому подходит',
    types: [
      { icon: '🏨', name: 'Отели и гостиницы' },
      { icon: '✈️', name: 'Туристические агентства' },
      { icon: '🧭', name: 'Экскурсоводы и гиды' },
      { icon: '🍽️', name: 'Рестораны и кафе' },
      { icon: '🚐', name: 'Транспортные компании' },
    ],
    formTitle: 'Стать партнёром',
    companyName: 'Название компании',
    contactPerson: 'Контактное лицо',
    phone: 'Телефон',
    email: 'Email',
    partnerType: 'Тип партнёра',
    selectType: 'Выберите тип...',
    clientsPerMonth: 'Клиентов в месяц (примерно)',
    message: 'Комментарий',
    messagePlaceholder: 'Расскажите о вашей компании...',
    submit: 'Отправить заявку',
    success: 'Заявка отправлена! Мы свяжемся с вами в течение 24 часов.',
    stats: { partners: '50+ партнёров', clients: '3000+ клиентов через партнёров', commission: '15% комиссия' },
    breadcrumb: 'Партнёры',
  },
  en: {
    back: 'Home',
    heroTitle: 'Partner Program',
    heroSub: 'Earn together with Alykul',
    benefitsTitle: 'Partnership Benefits',
    benefits: [
      { icon: '💰', title: 'Up to 15% Commission', desc: 'Earn up to 15% from every booking made by your clients' },
      { icon: '👤', title: 'Dedicated Manager', desc: 'A personal manager to handle all your questions promptly' },
      { icon: '📦', title: 'Marketing Materials', desc: 'Ready-made banners, brochures and promo materials for client acquisition' },
      { icon: '⭐', title: 'Priority Booking', desc: 'Guaranteed seats for your clients even on peak dates' },
    ],
    howTitle: 'How It Works',
    steps: [
      { num: '01', title: 'Fill out the application', desc: 'Provide your company details and contact information' },
      { num: '02', title: 'Sign the agreement', desc: 'We will prepare a contract with individual terms' },
      { num: '03', title: 'Start referring clients', desc: 'Earn commission from every confirmed booking' },
    ],
    typesTitle: 'Who Can Join',
    types: [
      { icon: '🏨', name: 'Hotels & Guesthouses' },
      { icon: '✈️', name: 'Travel Agencies' },
      { icon: '🧭', name: 'Tour Guides' },
      { icon: '🍽️', name: 'Restaurants & Cafes' },
      { icon: '🚐', name: 'Transport Companies' },
    ],
    formTitle: 'Become a Partner',
    companyName: 'Company Name',
    contactPerson: 'Contact Person',
    phone: 'Phone',
    email: 'Email',
    partnerType: 'Partner Type',
    selectType: 'Select type...',
    clientsPerMonth: 'Clients per month (estimate)',
    message: 'Message',
    messagePlaceholder: 'Tell us about your company...',
    submit: 'Submit Application',
    success: 'Application submitted! We will contact you within 24 hours.',
    stats: { partners: '50+ partners', clients: '3000+ clients via partners', commission: '15% commission' },
    breadcrumb: 'Partners',
  },
  ky: {
    back: 'Башкы бет',
    heroTitle: 'Өнөктөштүк программа',
    heroSub: 'Алыкул менен бирге табыңыз',
    benefitsTitle: 'Өнөктөштүктүн артыкчылыктары',
    benefits: [
      { icon: '💰', title: '15% ке чейин комиссия', desc: 'Сиздин кардарларыңыздын ар бир брондоосунан 15% ке чейин алыңыз' },
      { icon: '👤', title: 'Жеке менеджер', desc: 'Бардык суроолорду тез чечүү үчүн бөлүнгөн менеджер' },
      { icon: '📦', title: 'Маркетинг материалдары', desc: 'Кардарларды тартуу үчүн даяр баннерлер жана буклеттер' },
      { icon: '⭐', title: 'Артыкчылыктуу брондоо', desc: 'Чоку күндөрдө дагы кардарларыңыз үчүн кепилдик берилген орундар' },
    ],
    howTitle: 'Кантип иштейт',
    steps: [
      { num: '01', title: 'Арызды толтуруңуз', desc: 'Компанияңыздын маалыматтарын жана байланыш маалыматыңызды көрсөтүңүз' },
      { num: '02', title: 'Келишимге кол коюңуз', desc: 'Биз жеке шарттар менен келишим даярдайбыз' },
      { num: '03', title: 'Кардарларды жөнөтө баштаңыз', desc: 'Ар бир ырасталган брондоодон комиссия алыңыз' },
    ],
    typesTitle: 'Ким кошула алат',
    types: [
      { icon: '🏨', name: 'Мейманканалар' },
      { icon: '✈️', name: 'Туристтик агенттиктер' },
      { icon: '🧭', name: 'Экскурсоводдор жана гиддер' },
      { icon: '🍽️', name: 'Ресторандар жана кафелер' },
      { icon: '🚐', name: 'Транспорт компаниялары' },
    ],
    formTitle: 'Өнөктөш болуу',
    companyName: 'Компаниянын аты',
    contactPerson: 'Байланыш адамы',
    phone: 'Телефон',
    email: 'Email',
    partnerType: 'Өнөктөш түрү',
    selectType: 'Түрүн тандаңыз...',
    clientsPerMonth: 'Айына кардарлар саны (болжол менен)',
    message: 'Билдирүү',
    messagePlaceholder: 'Компанияңыз жөнүндө айтып бериңиз...',
    submit: 'Арыз жөнөтүү',
    success: 'Арыз жөнөтүлдү! 24 саат ичинде байланышабыз.',
    stats: { partners: '50+ өнөктөш', clients: '3000+ кардар өнөктөштөр аркылуу', commission: '15% комиссия' },
    breadcrumb: 'Өнөктөштөр',
  },
};

export default function PartnersPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';
  const t = translations[lang as keyof typeof translations] || translations.ru;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '', contactPerson: '', phone: '', email: '',
    partnerType: '', clientsPerMonth: '', message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1'}/forms/partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: formData.companyName,
          contact_name: formData.contactPerson,
          phone: formData.phone,
          email: formData.email,
          partner_type: formData.partnerType,
          clients_per_month: formData.clientsPerMonth,
          message: formData.message,
        }),
      });
      if (res.ok) setSubmitted(true);
      else throw new Error('Failed');
    } catch {
      alert(lang === 'ru' ? 'Ошибка отправки. Попробуйте позже.' : lang === 'ky' ? 'Жөнөтүү катасы. Кийинчерээк аракет кылыңыз.' : 'Submit error. Try later.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full border border-[#0F2B46]/10 rounded-lg px-4 py-3 text-sm text-[#0F2B46] outline-none focus:border-[#00897B]/40 transition-colors';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0F2B46] pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-white/40 text-xs tracking-[2px] uppercase mb-8 hover:text-white/60 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 19-7-7 7-7"/></svg>
            {t.back}
          </Link>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto">{t.heroSub}</p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: t.breadcrumb }]} />
      </div>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[t.stats.partners, t.stats.clients, t.stats.commission].map((stat, i) => (
            <div key={i} className="bg-[#00897B]/5 rounded-xl py-6 px-4">
              <span className="text-[#00897B] font-bold text-lg md:text-xl">{stat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-[#0F2B46] text-2xl md:text-3xl font-bold text-center mb-12">{t.benefitsTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.benefits.map((b, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{b.icon}</div>
              <h3 className="text-[#0F2B46] font-bold text-lg mb-2">{b.title}</h3>
              <p className="text-[#0F2B46]/60 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F7F9FB] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[#0F2B46] text-2xl md:text-3xl font-bold text-center mb-12">{t.howTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#00897B] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">{step.num}</div>
                <h3 className="text-[#0F2B46] font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-[#0F2B46]/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner types */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-[#0F2B46] text-2xl md:text-3xl font-bold text-center mb-12">{t.typesTitle}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {t.types.map((type, i) => (
            <div key={i} className="flex items-center gap-3 bg-white border border-[#0F2B46]/10 rounded-xl px-6 py-4 hover:border-[#00897B]/30 transition-colors">
              <span className="text-2xl">{type.icon}</span>
              <span className="text-[#0F2B46] font-medium text-sm">{type.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Partner form */}
      <section className="bg-[#F7F9FB] py-16">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-[#0F2B46] text-2xl md:text-3xl font-bold text-center mb-10">{t.formTitle}</h2>
          {submitted ? (
            <div className="bg-[#00897B]/5 border border-[#00897B]/20 rounded-xl p-8 text-center">
              <svg className="w-12 h-12 text-[#00897B] mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[#0F2B46] font-semibold text-lg">{t.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.companyName} *</label>
                <input type="text" required value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  className={inputClass} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.contactPerson} *</label>
                  <input type="text" required value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.phone} *</label>
                  <input type="tel" required value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+996 ..." className={inputClass} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.email}</label>
                  <input type="email" value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.partnerType} *</label>
                  <select required value={formData.partnerType}
                    onChange={e => setFormData({ ...formData, partnerType: e.target.value })}
                    className={`${inputClass} appearance-none bg-white`}>
                    <option value="">{t.selectType}</option>
                    {t.types.map((type, i) => (
                      <option key={i} value={type.name}>{type.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.clientsPerMonth}</label>
                <input type="number" min="0" value={formData.clientsPerMonth}
                  onChange={e => setFormData({ ...formData, clientsPerMonth: e.target.value })}
                  className={inputClass} />
              </div>
              <div>
                <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.message}</label>
                <textarea rows={4} value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.messagePlaceholder}
                  className={`${inputClass} resize-none`} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#00897B] text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-[#00796B] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {loading && (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {t.submit}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
