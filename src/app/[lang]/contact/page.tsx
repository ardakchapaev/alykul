'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

/* ═══════════════ TRANSLATIONS ═══════════════ */
const translations = {
  ru: {
    title: 'Свяжитесь с нами',
    subtitle: 'Мы на связи каждый день с 09:00 до 21:00 в сезон (июнь — сентябрь)',
    back: 'На главную',
    form: {
      name: 'Ваше имя',
      phone: 'Телефон',
      email: 'Email',
      subject: 'Тема обращения',
      subjects: ['Бронирование', 'Возврат средств', 'Приватный чартер', 'Корпоратив / Группа', 'Партнёрство', 'Другое'],
      message: 'Сообщение',
      messagePlaceholder: 'Опишите ваш вопрос...',
      submit: 'Отправить',
      success: 'Сообщение отправлено! Мы ответим в течение 30 минут.',
    },
    info: {
      phone: 'Телефон',
      phoneValue: '+996 550 123-456',
      email: 'Email',
      emailValue: 'info@alykul.kg',
      whatsapp: 'WhatsApp',
      whatsappValue: '+996 550 123-456',
      telegram: 'Telegram',
      telegramValue: '@alykul_support',
      address: 'Адрес',
      addressValue: 'Чолпон-Ата, Центральный пляж, Причал №1',
    },
    hours: 'Пн–Вс 09:00 — 21:00 (сезон: июнь — сентябрь)',
    social: 'Мы в социальных сетях',
    map: 'Наше расположение',
  },
  en: {
    title: 'Contact Us',
    subtitle: 'We are available daily from 09:00 to 21:00 during the season (June — September)',
    back: 'Home',
    form: {
      name: 'Your Name',
      phone: 'Phone',
      email: 'Email',
      subject: 'Subject',
      subjects: ['Booking', 'Refund', 'Private Charter', 'Corporate / Group', 'Partnership', 'Other'],
      message: 'Message',
      messagePlaceholder: 'Describe your question...',
      submit: 'Send',
      success: 'Message sent! We will respond within 30 minutes.',
    },
    info: {
      phone: 'Phone',
      phoneValue: '+996 550 123-456',
      email: 'Email',
      emailValue: 'info@alykul.kg',
      whatsapp: 'WhatsApp',
      whatsappValue: '+996 550 123-456',
      telegram: 'Telegram',
      telegramValue: '@alykul_support',
      address: 'Address',
      addressValue: 'Cholpon-Ata, Central Beach, Pier #1',
    },
    hours: 'Mon-Sun 09:00 — 21:00 (season: June — September)',
    social: 'Follow us',
    map: 'Our Location',
  },
  ky: {
    title: 'Биз менен байланышыныз',
    subtitle: 'Кундолук 09:00 ден 21:00 го чейин сезондо (июнь — сентябрь)',
    back: 'Башкы бет',
    form: {
      name: 'Атыныз',
      phone: 'Телефон',
      email: 'Email',
      subject: 'Тема',
      subjects: ['Брондоо', 'Акча кайтаруу', 'Жеке чартер', 'Корпоратив / Топ', 'Ондоштук', 'Башка'],
      message: 'Билдируу',
      messagePlaceholder: 'Суроонузду сурнотуп жазыныз...',
      submit: 'Жонотуу',
      success: 'Билдируу жиберилди! 30 мунот ичинде жооп беребиз.',
    },
    info: {
      phone: 'Телефон',
      phoneValue: '+996 550 123-456',
      email: 'Email',
      emailValue: 'info@alykul.kg',
      whatsapp: 'WhatsApp',
      whatsappValue: '+996 550 123-456',
      telegram: 'Telegram',
      telegramValue: '@alykul_support',
      address: 'Дарек',
      addressValue: 'Чолпон-Ата, Борбордук пляж, Причал №1',
    },
    hours: 'Дш–Жш 09:00 — 21:00 (сезон: июнь — сентябрь)',
    social: 'Социалдык тармактар',
    map: 'Биздин жайгашкан жерибиз',
  },
};

/* ═══════════════ SOCIAL ICONS ═══════════════ */
const socials = [
  { name: 'Instagram', href: 'https://instagram.com/alykul.kg', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  )},
  { name: 'Facebook', href: 'https://facebook.com/alykul.kg', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  )},
  { name: 'YouTube', href: 'https://youtube.com/@alykul', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
  { name: 'TikTok', href: 'https://tiktok.com/@alykul.kg', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
  )},
];

/* ═══════════════ CONTACT PAGE ═══════════════ */
export default function ContactPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';
  const t = translations[lang as keyof typeof translations] || translations.ru;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', subject: '', message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1'}/forms/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          subject: formData.subject,
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
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: lang === 'ru' ? 'Контакты' : lang === 'ky' ? 'Байланыштар' : 'Contact' }]} />
      </div>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact form */}
          <div>
            {submitted ? (
              <div className="bg-[#00897B]/5 border border-[#00897B]/20 rounded-xl p-8 text-center">
                <svg className="w-12 h-12 text-[#00897B] mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[#0F2B46] font-semibold text-lg mb-2">{t.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.form.name}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-[#0F2B46]/10 rounded-lg px-4 py-3 text-sm text-[#0F2B46] outline-none focus:border-[#00897B]/40 transition-colors"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.form.phone}</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+996 ..."
                      className="w-full border border-[#0F2B46]/10 rounded-lg px-4 py-3 text-sm text-[#0F2B46] outline-none focus:border-[#00897B]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.form.email}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-[#0F2B46]/10 rounded-lg px-4 py-3 text-sm text-[#0F2B46] outline-none focus:border-[#00897B]/40 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.form.subject}</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full border border-[#0F2B46]/10 rounded-lg px-4 py-3 text-sm text-[#0F2B46] outline-none focus:border-[#00897B]/40 transition-colors appearance-none bg-white"
                  >
                    <option value="">{t.form.subject}...</option>
                    {t.form.subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#0F2B46]/60 text-xs font-medium mb-1.5">{t.form.message}</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.form.messagePlaceholder}
                    className="w-full border border-[#0F2B46]/10 rounded-lg px-4 py-3 text-sm text-[#0F2B46] outline-none focus:border-[#00897B]/40 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00897B] text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-[#00796B] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  {t.form.submit}
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact info + Map */}
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                ), label: t.info.phone, value: t.info.phoneValue, href: `tel:${t.info.phoneValue.replace(/\s/g, '')}` },
                { icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                ), label: t.info.email, value: t.info.emailValue, href: `mailto:${t.info.emailValue}` },
                { icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                ), label: t.info.whatsapp, value: t.info.whatsappValue, href: 'https://wa.me/996550123456' },
                { icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                ), label: t.info.telegram, value: t.info.telegramValue, href: 'https://t.me/alykul_support' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-xl border border-[#0F2B46]/5 hover:border-[#00897B]/20 hover:bg-[#00897B]/[0.02] transition-all group"
                >
                  <div className="text-[#00897B] mt-0.5">{item.icon}</div>
                  <div>
                    <p className="text-[#0F2B46]/40 text-[10px] uppercase tracking-[1px] mb-0.5">{item.label}</p>
                    <p className="text-[#0F2B46] text-sm font-medium group-hover:text-[#00897B] transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-[#0F2B46]/5">
              <svg className="w-5 h-5 text-[#00897B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
              </svg>
              <div>
                <p className="text-[#0F2B46]/40 text-[10px] uppercase tracking-[1px] mb-0.5">{t.info.address}</p>
                <p className="text-[#0F2B46] text-sm font-medium">{t.info.addressValue}</p>
              </div>
            </div>

            {/* Working hours */}
            <div className="flex items-center gap-2 text-[#0F2B46]/50 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.hours}
            </div>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden border border-[#0F2B46]/5">
              <p className="text-[#0F2B46]/40 text-[10px] uppercase tracking-[1px] px-4 pt-3 mb-2">{t.map}</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.5!2d76.98!3d42.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDM5JzAwLjAiTiA3NsKwNTgnNDguMCJF!5e0!3m2!1sru!2skg!4v1"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social links */}
      <section className="border-t border-[#0F2B46]/5 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[#0F2B46]/40 text-xs uppercase tracking-[2px] mb-5">{t.social}</p>
          <div className="flex items-center justify-center gap-6">
            {socials.map(s => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0F2B46]/30 hover:text-[#00897B] transition-colors"
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
