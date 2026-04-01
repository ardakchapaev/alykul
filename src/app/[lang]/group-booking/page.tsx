'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const t = {
  ru: {
    title: 'Групповое бронирование', subtitle: 'От 10 человек — индивидуальные условия и скидки',
    back: 'На главную',
    org: 'Организация / компания', contact: 'Контактное лицо', phone: 'Телефон', email: 'Email',
    eventType: 'Тип мероприятия', date: 'Желаемая дата', guests: 'Количество гостей',
    vessel: 'Предпочитаемое судно', requests: 'Особые пожелания', budget: 'Бюджет',
    submit: 'Отправить заявку', sending: 'Отправка...',
    successTitle: 'Ваша заявка принята!', successText: 'Менеджер свяжется с вами в течение 2 часов.',
    backHome: 'На главную', another: 'Отправить ещё',
    events: ['Корпоратив', 'Свадьба', 'День рождения', 'Тимбилдинг', 'Другое'],
    vessels: ['Любое', 'Теплоход Алыкул', 'Яхта Nomad'],
    budgets: ['50,000 — 100,000 KGS', '100,000 — 200,000 KGS', '200,000+ KGS', 'Не определён'],
    step: 'Шаг', of: 'из',
    stepLabels: ['Контакты', 'Мероприятие', 'Детали'],
    next: 'Далее', prev: 'Назад',
    required: 'Обязательное поле',
  },
  en: {
    title: 'Group Booking', subtitle: '10+ guests — custom terms and discounts',
    back: 'Home',
    org: 'Organization / Company', contact: 'Contact person', phone: 'Phone', email: 'Email',
    eventType: 'Event type', date: 'Preferred date', guests: 'Number of guests',
    vessel: 'Vessel preference', requests: 'Special requests', budget: 'Budget range',
    submit: 'Submit Request', sending: 'Sending...',
    successTitle: 'Request submitted!', successText: 'A manager will contact you within 2 hours.',
    backHome: 'Home', another: 'Submit another',
    events: ['Corporate', 'Wedding', 'Birthday', 'Team building', 'Other'],
    vessels: ['Any', 'Ship Alykul', 'Yacht Nomad'],
    budgets: ['50,000 — 100,000 KGS', '100,000 — 200,000 KGS', '200,000+ KGS', 'Not decided'],
    step: 'Step', of: 'of',
    stepLabels: ['Contacts', 'Event', 'Details'],
    next: 'Next', prev: 'Back',
    required: 'Required field',
  },
  ky: {
    title: 'Топтук брондоо', subtitle: '10+ адам — жеке шарттар жана арзандатуулар',
    back: 'Башкы бет',
    org: 'Уюм / Компания', contact: 'Байланыш адам', phone: 'Телефон', email: 'Email',
    eventType: 'Иш-чара түрү', date: 'Каалаган дата', guests: 'Конокторо саны',
    vessel: 'Каалаган кеме', requests: 'Өзгөчө каалоолор', budget: 'Бюджет',
    submit: 'Арызды жөнөтүү', sending: 'Жөнөтүлүүдө...',
    successTitle: 'Арызыңыз кабыл алынды!', successText: 'Менеджер 2 сааттын ичинде байланышат.',
    backHome: 'Башкы бет', another: 'Дагы жөнөтүү',
    events: ['Корпоратив', 'Үйлөнүү тою', 'Туулган күн', 'Тимбилдинг', 'Башка'],
    vessels: ['Каалагандай', 'Алыкул теплоходу', 'Nomad яхтасы'],
    budgets: ['50,000 — 100,000 KGS', '100,000 — 200,000 KGS', '200,000+ KGS', 'Аныкталган эмес'],
    step: 'Кадам', of: 'ичинен',
    stepLabels: ['Байланыш', 'Иш-чара', 'Чоо-жайы'],
    next: 'Кийинки', prev: 'Артка',
    required: 'Милдеттүү талаа',
  },
};

export default function GroupBookingPage() {
  const params = useParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [org, setOrg] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('+996 ');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState(labels.events[0]);
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(20);
  const [vessel, setVessel] = useState(labels.vessels[0]);
  const [requests, setRequests] = useState('');
  const [budget, setBudget] = useState(labels.budgets[0]);

  const handleSubmit = async () => {
    setSubmitting(true);
    // TODO: Submit to CRM API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
    setSubmitting(false);
  };

  const resetForm = () => {
    setStep(1); setSuccess(false); setOrg(''); setContact(''); setPhone('+996 ');
    setEmail(''); setEventType(labels.events[0]); setDate(''); setGuests(20);
    setVessel(labels.vessels[0]); setRequests(''); setBudget(labels.budgets[0]);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="font-heading font-bold text-2xl mb-2">{labels.successTitle}</h1>
          <p className="text-muted mb-8">{labels.successText}</p>
          <div className="flex gap-3">
            <Link href={`/${lang}`} className="flex-1 py-3 bg-ocean text-white rounded-xl font-semibold text-sm hover:bg-ocean-dark transition-colors text-center">
              {labels.backHome}
            </Link>
            <button onClick={resetForm} className="flex-1 py-3 border border-ocean text-ocean rounded-xl font-semibold text-sm hover:bg-ocean/5 transition-colors">
              {labels.another}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-ocean focus:outline-none transition-colors';
  const labelClass = 'block text-sm font-semibold text-navy mb-1.5';

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <div className="bg-navy text-white px-6 md:px-14 py-6">
        <Link href={`/${lang}`} className="text-foam/70 text-sm hover:text-white">&larr; {labels.back}</Link>
        <h1 className="font-heading font-bold text-2xl md:text-3xl uppercase mt-2">{labels.title}</h1>
        <p className="text-foam/60 text-sm mt-1">{labels.subtitle}</p>
      </div>

      <div className="px-6 md:px-14 py-8 max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                s <= step ? 'bg-ocean text-white' : 'bg-gray-200 text-muted'
              }`}>{s}</div>
              <span className={`text-xs font-semibold hidden sm:block ${s <= step ? 'text-navy' : 'text-muted'}`}>{labels.stepLabels[s - 1]}</span>
              {s < 3 && <div className={`flex-1 h-0.5 ${s < step ? 'bg-ocean' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          {/* Step 1: Contacts */}
          {step === 1 && (
            <div className="space-y-4">
              <div><label className={labelClass}>{labels.org}</label><input type="text" value={org} onChange={e => setOrg(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>{labels.contact} *</label><input type="text" value={contact} onChange={e => setContact(e.target.value)} className={inputClass} required /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>{labels.phone} *</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} required /></div>
                <div><label className={labelClass}>{labels.email}</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} /></div>
              </div>
            </div>
          )}

          {/* Step 2: Event */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className={labelClass}>{labels.eventType}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {labels.events.map(ev => (
                    <button key={ev} onClick={() => setEventType(ev)}
                      className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                        eventType === ev ? 'border-ocean bg-ocean/5 text-ocean' : 'border-gray-100 text-muted hover:border-gray-200'
                      }`}>{ev}</button>
                  ))}
                </div>
              </div>
              <div><label className={labelClass}>{labels.date} *</label><input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className={inputClass} required /></div>
              <div>
                <label className={labelClass}>{labels.guests}: <span className="text-ocean font-bold">{guests}</span></label>
                <input type="range" min={10} max={200} step={5} value={guests} onChange={e => setGuests(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ocean" />
                <div className="flex justify-between text-xs text-muted mt-1"><span>10</span><span>100</span><span>200</span></div>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className={labelClass}>{labels.vessel}</label>
                <select value={vessel} onChange={e => setVessel(e.target.value)} className={inputClass + ' bg-white'}>
                  {labels.vessels.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>{labels.budget}</label>
                <select value={budget} onChange={e => setBudget(e.target.value)} className={inputClass + ' bg-white'}>
                  {labels.budgets.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>{labels.requests}</label>
                <textarea value={requests} onChange={e => setRequests(e.target.value)} rows={4}
                  className={inputClass + ' resize-none'} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 border border-gray-200 text-muted rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                {labels.prev}
              </button>
            )}
            {step < 3 ? (
              <button onClick={() => setStep(s => s + 1)}
                disabled={step === 1 && (!contact || phone.length < 10)}
                className="flex-1 py-3 bg-ocean text-white rounded-xl font-bold hover:bg-ocean-dark transition-colors disabled:opacity-50">
                {labels.next}
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting}
                className="flex-1 py-4 bg-ocean text-white rounded-2xl font-bold text-lg hover:bg-ocean-dark transition-colors disabled:opacity-50">
                {submitting ? labels.sending : labels.submit}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-muted text-xs mt-6">
          {labels.step} {step} {labels.of} 3 — {labels.stepLabels[step - 1]}
        </p>
      </div>
    </div>
  );
}