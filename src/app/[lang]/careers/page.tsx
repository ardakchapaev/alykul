'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

const translations = {
  ru: {
    back: 'На главную',
    heroTitle: 'Карьера в Алыкул',
    heroSub: 'Работайте на берегу самого красивого озера Центральной Азии',
    breadcrumb: 'Карьера',
    whyTitle: 'Почему Алыкул?',
    whyItems: [
      { icon: '🏔️', title: 'Сезонная работа на озере', desc: 'Работа в одном из самых красивых мест Кыргызстана — на берегу Иссык-Куля' },
      { icon: '💵', title: 'Конкурентная зарплата', desc: 'Достойная оплата труда + бонусы по итогам сезона' },
      { icon: '🤝', title: 'Дружный коллектив', desc: 'Молодая и амбициозная команда профессионалов' },
      { icon: '📈', title: 'Карьерный рост', desc: 'Возможность расти вместе с компанией и занять руководящую позицию' },
    ],
    positionsTitle: 'Открытые вакансии',
    positions: [
      { title: 'Капитан судна', location: 'Чолпон-Ата', type: 'Полная занятость', season: 'Сезон (июнь-сентябрь)', desc: 'Управление судном, обеспечение безопасности пассажиров, навигация по маршрутам Иссык-Куля. Требуется лицензия на управление маломерным судном.' },
      { title: 'Менеджер по бронированию', location: 'Удалённо', type: 'Частичная занятость', season: '', desc: 'Обработка заявок, консультирование клиентов, управление расписанием рейсов. Опыт работы в туризме приветствуется.' },
      { title: 'Маркетолог/SMM', location: 'Бишкек', type: 'Полная занятость', season: '', desc: 'Ведение социальных сетей, создание контента, таргетированная реклама, работа с блогерами и партнёрами.' },
      { title: 'Фотограф/видеограф', location: 'Чолпон-Ата', type: 'Сезон', season: 'Июнь-сентябрь', desc: 'Съёмка круизов, создание контента для сайта и соцсетей. Портфолио обязательно.' },
      { title: 'Стюард/обслуживание', location: 'Чолпон-Ата', type: 'Сезон', season: 'Июнь-сентябрь', desc: 'Обслуживание гостей на борту, сервировка, поддержание чистоты, помощь пассажирам.' },
    ],
    applyBtn: 'Откликнуться',
    formTitle: 'Отклик на вакансию',
    name: 'Ваше имя',
    phone: 'Телефон',
    email: 'Email',
    position: 'Вакансия',
    resume: 'Резюме (файл)',
    resumeHint: 'Перетащите файл или нажмите для выбора',
    message: 'Сопроводительное письмо',
    messagePlaceholder: 'Расскажите о себе и вашем опыте...',
    submit: 'Отправить отклик',
    success: 'Ваш отклик отправлен! Мы рассмотрим его и свяжемся с вами.',
    cancel: 'Отмена',
  },
  en: {
    back: 'Home',
    heroTitle: 'Careers at Alykul',
    heroSub: 'Work on the shores of the most beautiful lake in Central Asia',
    breadcrumb: 'Careers',
    whyTitle: 'Why Alykul?',
    whyItems: [
      { icon: '🏔️', title: 'Seasonal lakeside work', desc: 'Work in one of the most beautiful places in Kyrgyzstan — on the shores of Issyk-Kul' },
      { icon: '💵', title: 'Competitive salary', desc: 'Fair compensation + end-of-season bonuses' },
      { icon: '🤝', title: 'Great team', desc: 'Young and ambitious team of professionals' },
      { icon: '📈', title: 'Career growth', desc: 'Opportunity to grow with the company and take on leadership roles' },
    ],
    positionsTitle: 'Open Positions',
    positions: [
      { title: 'Vessel Captain', location: 'Cholpon-Ata', type: 'Full-time', season: 'Season (June-Sept)', desc: 'Vessel operation, passenger safety, navigation on Issyk-Kul routes. Small vessel license required.' },
      { title: 'Booking Manager', location: 'Remote', type: 'Part-time', season: '', desc: 'Processing requests, client consultation, schedule management. Tourism experience preferred.' },
      { title: 'Marketer/SMM', location: 'Bishkek', type: 'Full-time', season: '', desc: 'Social media management, content creation, targeted advertising, blogger and partner relations.' },
      { title: 'Photographer/Videographer', location: 'Cholpon-Ata', type: 'Seasonal', season: 'June-September', desc: 'Cruise photography, website and social media content creation. Portfolio required.' },
      { title: 'Steward/Service', location: 'Cholpon-Ata', type: 'Seasonal', season: 'June-September', desc: 'Guest service on board, serving, cleanliness, passenger assistance.' },
    ],
    applyBtn: 'Apply',
    formTitle: 'Apply for Position',
    name: 'Your Name',
    phone: 'Phone',
    email: 'Email',
    position: 'Position',
    resume: 'Resume (file)',
    resumeHint: 'Drag a file or click to browse',
    message: 'Cover Letter',
    messagePlaceholder: 'Tell us about yourself and your experience...',
    submit: 'Submit Application',
    success: 'Your application has been submitted! We will review it and get back to you.',
    cancel: 'Cancel',
  },
  ky: {
    back: 'Башкы бет',
    heroTitle: 'Алыкулда карьера',
    heroSub: 'Борбордук Азиядагы эң кооз көлдүн жээгинде иштеңиз',
    breadcrumb: 'Карьера',
    whyTitle: 'Эмне үчүн Алыкул?',
    whyItems: [
      { icon: '🏔️', title: 'Көл боюнда сезондук иш', desc: 'Кыргызстандын эң кооз жерлеринин биринде — Ысык-Көлдүн жээгинде иш' },
      { icon: '💵', title: 'Атаандаш эмгек акы', desc: 'Адилеттүү эмгек акы + сезон боюнча бонустар' },
      { icon: '🤝', title: 'Ынтымактуу жамаат', desc: 'Жаш жана амбициялуу адистер тобу' },
      { icon: '📈', title: 'Карьералык өсүш', desc: 'Компания менен бирге өсүп, жетекчилик кызматка өтүү мүмкүнчүлүгү' },
    ],
    positionsTitle: 'Ачык вакансиялар',
    positions: [
      { title: 'Кеме капитаны', location: 'Чолпон-Ата', type: 'Толук иш күнү', season: 'Сезон (июнь-сентябрь)', desc: 'Кемени башкаруу, жүргүнчүлөрдүн коопсуздугу, Ысык-Көл маршруттары боюнча навигация.' },
      { title: 'Брондоо менеджери', location: 'Алыстан', type: 'Жарым-жартылай', season: '', desc: 'Арыздарды иштетүү, кардарларды кеңештөө, каттамдардын расписаниесин башкаруу.' },
      { title: 'Маркетолог/SMM', location: 'Бишкек', type: 'Толук иш күнү', season: '', desc: 'Социалдык тармактарды жүргүзүү, контент түзүү, максаттуу жарнак.' },
      { title: 'Фотограф/видеограф', location: 'Чолпон-Ата', type: 'Сезондук', season: 'Июнь-сентябрь', desc: 'Круиздерди тартуу, сайт жана соц тармактар үчүн контент түзүү.' },
      { title: 'Стюард/тейлөө', location: 'Чолпон-Ата', type: 'Сезондук', season: 'Июнь-сентябрь', desc: 'Борттогу коноктор үчүн тейлөө, тазалык, жүргүнчүлөргө жардам.' },
    ],
    applyBtn: 'Кайрылуу',
    formTitle: 'Вакансияга кайрылуу',
    name: 'Атыңыз',
    phone: 'Телефон',
    email: 'Email',
    position: 'Вакансия',
    resume: 'Резюме (файл)',
    resumeHint: 'Файлды сүйрөңүз же тандоо үчүн басыңыз',
    message: 'Коштомо кат',
    messagePlaceholder: 'Өзүңүз жана тажрыйбаңыз жөнүндө айтып бериңиз...',
    submit: 'Кайрылуу жөнөтүү',
    success: 'Кайрылууңуз жөнөтүлдү! Биз аны карап чыгып, сиз менен байланышабыз.',
    cancel: 'Жокко чыгаруу',
  },
};

export default function CareersPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';
  const t = translations[lang as keyof typeof translations] || translations.ru;

  const [applyingFor, setApplyingFor] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1'}/forms/careers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          position: applyingFor,
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

      {/* Why Alykul */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-[#0F2B46] text-2xl md:text-3xl font-bold text-center mb-12">{t.whyTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.whyItems.map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-[#0F2B46] font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-[#0F2B46]/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open positions */}
      <section className="bg-[#F7F9FB] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[#0F2B46] text-2xl md:text-3xl font-bold text-center mb-12">{t.positionsTitle}</h2>
          <div className="space-y-4">
            {t.positions.map((pos, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-[#0F2B46]/5 hover:border-[#00897B]/20 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-[#0F2B46] font-bold text-lg mb-1">{pos.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-[#0F2B46]/5 text-[#0F2B46]/70 px-3 py-1 rounded-full">{pos.location}</span>
                      <span className="bg-[#0F2B46]/5 text-[#0F2B46]/70 px-3 py-1 rounded-full">{pos.type}</span>
                      {pos.season && <span className="bg-[#00897B]/10 text-[#00897B] px-3 py-1 rounded-full">{pos.season}</span>}
                    </div>
                    <p className="text-[#0F2B46]/60 text-sm mt-3 leading-relaxed">{pos.desc}</p>
                  </div>
                  <button
                    onClick={() => { setApplyingFor(pos.title); setSubmitted(false); }}
                    className="bg-[#00897B] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#00796B] transition-colors whitespace-nowrap self-start"
                  >
                    {t.applyBtn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form modal */}
      {applyingFor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setApplyingFor(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
            <h3 className="text-[#0F2B46] font-bold text-xl mb-1">{t.formTitle}</h3>
            <p className="text-[#0F2B46]/50 text-sm mb-6">{applyingFor}</p>

            {submitted ? (
              <div className="bg-[#00897B]/5 border border-[#00897B]/20 rounded-xl p-8 text-center">
                <svg className="w-12 h-12 text-[#00897B] mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[#0F2B46] font-semibold">{t.success}</p>
                <button onClick={() => setApplyingFor(null)}
                  className="mt-4 text-[#00897B] text-sm font-medium hover:underline">OK</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.name} *</label>
                  <input type="text" required value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass} />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.phone} *</label>
                    <input type="tel" required value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+996 ..." className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.email}</label>
                    <input type="email" value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.position}</label>
                  <input type="text" readOnly value={applyingFor}
                    className={`${inputClass} bg-gray-50`} />
                </div>
                <div>
                  <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.resume}</label>
                  <div className="border-2 border-dashed border-[#0F2B46]/10 rounded-lg p-6 text-center cursor-pointer hover:border-[#00897B]/30 transition-colors">
                    <svg className="w-8 h-8 text-[#0F2B46]/20 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="text-[#0F2B46]/40 text-xs">{t.resumeHint}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.message}</label>
                  <textarea rows={4} value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.messagePlaceholder}
                    className={`${inputClass} resize-none`} />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={loading}
                    className="flex-1 bg-[#00897B] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#00796B] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading && (
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {t.submit}
                  </button>
                  <button type="button" onClick={() => setApplyingFor(null)}
                    className="px-6 py-3 border border-[#0F2B46]/10 text-[#0F2B46]/60 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    {t.cancel}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
