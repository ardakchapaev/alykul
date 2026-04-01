'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const t = {
  ru: {
    title: 'Подарочные сертификаты', hero: 'Подарите незабываемый отдых на Иссык-Куле',
    heroSub: 'Электронный сертификат — идеальный подарок для близких',
    back: 'На главную',
    templates: [
      { id: 'sunset', name: 'Закатный круиз', price: 1400, desc: 'Романтическая прогулка на закате' },
      { id: 'vip', name: 'VIP-чартер', price: 7000, desc: 'Частная яхта на весь вечер' },
      { id: 'custom', name: 'Произвольная сумма', price: 0, desc: 'От 1,000 до 50,000 KGS' },
    ],
    currency: 'KGS',
    certHeader: 'ПОДАРОЧНЫЙ СЕРТИФИКАТ',
    certSubheader: 'Алыкул — Озеро Иссык-Куль',
    from: 'От', to: 'Кому', message: 'Личное сообщение', validity: 'Действителен 12 месяцев',
    recipientName: 'Имя получателя', recipientContact: 'Телефон или email получателя',
    senderName: 'Ваше имя', customAmount: 'Сумма сертификата',
    purchase: 'Приобрести сертификат', purchasing: 'Оформление...',
    successTitle: 'Сертификат оформлен!', successText: 'Вы можете скачать или отправить его получателю.',
    download: 'Скачать сертификат', sendAnother: 'Оформить ещё один',
    selected: 'Выбрано', preview: 'Предпросмотр сертификата',
  },
  en: {
    title: 'Gift Certificates', hero: 'Give an unforgettable Issyk-Kul experience',
    heroSub: 'E-certificate — the perfect gift for loved ones',
    back: 'Home',
    templates: [
      { id: 'sunset', name: 'Sunset Cruise', price: 1400, desc: 'Romantic sunset boat ride' },
      { id: 'vip', name: 'VIP Charter', price: 7000, desc: 'Private yacht for the evening' },
      { id: 'custom', name: 'Custom Amount', price: 0, desc: 'From 1,000 to 50,000 KGS' },
    ],
    currency: 'KGS',
    certHeader: 'GIFT CERTIFICATE',
    certSubheader: 'Alykul — Lake Issyk-Kul',
    from: 'From', to: 'To', message: 'Personal message', validity: 'Valid for 12 months',
    recipientName: 'Recipient name', recipientContact: 'Recipient phone or email',
    senderName: 'Your name', customAmount: 'Certificate amount',
    purchase: 'Purchase Certificate', purchasing: 'Processing...',
    successTitle: 'Certificate issued!', successText: 'You can download or send it to the recipient.',
    download: 'Download Certificate', sendAnother: 'Create another',
    selected: 'Selected', preview: 'Certificate preview',
  },
  ky: {
    title: 'Белек сертификаттары', hero: 'Ысык-Көлдө унутулгус эс алуу белек кылыңыз',
    heroSub: 'Электрондук сертификат — жакындарыңызга эң сонун белек',
    back: 'Башкы бет',
    templates: [
      { id: 'sunset', name: 'Кечки круиз', price: 1400, desc: 'Кечки романтикалык сейилдөө' },
      { id: 'vip', name: 'VIP-чартер', price: 7000, desc: 'Бүт кечке жеке яхта' },
      { id: 'custom', name: 'Каалаган сумма', price: 0, desc: '1,000 ден 50,000 KGS чейин' },
    ],
    currency: 'KGS',
    certHeader: 'БЕЛЕК СЕРТИФИКАТЫ',
    certSubheader: 'Алыкул — Ысык-Көл',
    from: 'Кимден', to: 'Кимге', message: 'Жеке билдирүү', validity: '12 ай жарактуу',
    recipientName: 'Алуучунун аты', recipientContact: 'Алуучунун телефону же email',
    senderName: 'Сиздин атыңыз', customAmount: 'Сертификат суммасы',
    purchase: 'Сертификат сатып алуу', purchasing: 'Тариздетилүүдө...',
    successTitle: 'Сертификат тариздетилди!', successText: 'Жүктөп алсаңыз же алуучуга жөнөтсөңүз болот.',
    download: 'Сертификатты жүктөө', sendAnother: 'Дагы бирин тариздетүү',
    selected: 'Тандалды', preview: 'Сертификат алдын ала көрүү',
  },
};

const templateIcons = { sunset: '🌅', vip: '⛵', custom: '🎁' };

export default function GiftsPage() {
  const params = useParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;

  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [customAmount, setCustomAmount] = useState(5000);
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientContact, setRecipientContact] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const template = labels.templates[selectedTemplate];
  const finalAmount = template.id === 'custom' ? customAmount : template.price;

  const handlePurchase = async () => {
    setSubmitting(true);
    // TODO: Replace with real certificate API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
    setSubmitting(false);
  };

  const handleDownload = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>${labels.certHeader}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Cormorant Garamond', Georgia, serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f0f0f0; padding: 20px; }
        .cert { width: 700px; background: linear-gradient(135deg, #0B1929 0%, #182F48 50%, #246DC9 100%); border-radius: 16px; padding: 48px; color: white; position: relative; overflow: hidden; }
        .cert::before { content: ''; position: absolute; inset: 8px; border: 2px solid rgba(232,184,109,0.4); border-radius: 12px; pointer-events: none; }
        .cert::after { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(ellipse at 30% 20%, rgba(232,184,109,0.08) 0%, transparent 50%); pointer-events: none; }
        h1 { font-size: 28px; letter-spacing: 6px; text-align: center; color: #E8B86D; margin-bottom: 4px; }
        .sub { text-align: center; font-size: 14px; color: rgba(255,255,255,0.6); letter-spacing: 2px; margin-bottom: 32px; }
        .amount { text-align: center; font-size: 56px; font-weight: 700; color: #E8B86D; margin: 24px 0; }
        .details { display: flex; justify-content: space-between; margin: 24px 0; }
        .detail { font-size: 14px; }
        .detail span { display: block; color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 4px; }
        .message { text-align: center; font-style: italic; color: rgba(255,255,255,0.7); margin: 20px 0; font-size: 16px; }
        .validity { text-align: center; font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 24px; letter-spacing: 1px; }
        .template-name { text-align: center; font-size: 18px; color: rgba(255,255,255,0.8); margin-bottom: 8px; }
      </style></head><body>
        <div class="cert">
          <h1>${labels.certHeader}</h1>
          <div class="sub">${labels.certSubheader}</div>
          <div class="template-name">${template.name}</div>
          <div class="amount">${finalAmount.toLocaleString()} ${labels.currency}</div>
          <div class="details">
            <div class="detail"><span>${labels.from}</span>${senderName || '—'}</div>
            <div class="detail"><span>${labels.to}</span>${recipientName || '—'}</div>
          </div>
          ${personalMessage ? `<div class="message">"${personalMessage}"</div>` : ''}
          <div class="validity">${labels.validity}</div>
        </div>
        <script>setTimeout(()=>window.print(),500);<\/script>
      </body></html>
    `);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="font-heading font-bold text-2xl mb-2">{labels.successTitle}</h1>
          <p className="text-muted mb-8">{labels.successText}</p>
          <button onClick={handleDownload}
            className="w-full py-3 bg-navy text-white rounded-xl font-semibold hover:bg-navy/90 transition-colors mb-3">
            {labels.download}
          </button>
          <button onClick={() => { setSuccess(false); setSelectedTemplate(0); setSenderName(''); setRecipientName(''); setRecipientContact(''); setPersonalMessage(''); }}
            className="w-full py-3 border border-ocean text-ocean rounded-xl font-semibold hover:bg-ocean/5 transition-colors">
            {labels.sendAnother}
          </button>
        </div>
      </div>
    );
  }

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-ocean focus:outline-none transition-colors';
  const labelClass = 'block text-sm font-semibold text-navy mb-1.5';

  return (
    <div className="min-h-screen bg-sand">
      {/* Hero */}
      <div className="bg-navy text-white px-6 md:px-14 py-10 text-center">
        <Link href={`/${lang}`} className="text-foam/70 text-sm hover:text-white absolute left-6 top-6">&larr; {labels.back}</Link>
        <div className="text-5xl mb-4">🎁</div>
        <h1 className="font-heading font-bold text-3xl md:text-4xl uppercase mb-2">{labels.hero}</h1>
        <p className="text-foam/60 text-sm max-w-md mx-auto">{labels.heroSub}</p>
      </div>

      <div className="px-6 md:px-14 py-8 max-w-4xl mx-auto space-y-8">
        {/* Template selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {labels.templates.map((tmpl, i) => (
            <button key={tmpl.id} onClick={() => setSelectedTemplate(i)}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                selectedTemplate === i ? 'border-ocean bg-ocean/5 shadow-lg' : 'border-gray-100 bg-white hover:border-gray-200'
              }`}>
              {selectedTemplate === i && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-ocean text-white flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
              <div className="text-3xl mb-3">{templateIcons[tmpl.id as keyof typeof templateIcons]}</div>
              <h3 className="font-bold text-lg text-navy">{tmpl.name}</h3>
              <p className="text-muted text-sm mt-1">{tmpl.desc}</p>
              {tmpl.price > 0 && (
                <div className="font-bold text-xl text-ocean mt-3">{tmpl.price.toLocaleString()} {labels.currency}</div>
              )}
            </button>
          ))}
        </div>

        {/* Custom amount slider */}
        {template.id === 'custom' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <label className={labelClass}>{labels.customAmount}: <span className="text-ocean font-bold text-lg">{customAmount.toLocaleString()} {labels.currency}</span></label>
            <input type="range" min={1000} max={50000} step={500} value={customAmount} onChange={e => setCustomAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ocean mt-2" />
            <div className="flex justify-between text-xs text-muted mt-1"><span>1,000</span><span>25,000</span><span>50,000</span></div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
              <div><label className={labelClass}>{labels.senderName} *</label><input type="text" value={senderName} onChange={e => setSenderName(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>{labels.recipientName} *</label><input type="text" value={recipientName} onChange={e => setRecipientName(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>{labels.recipientContact}</label><input type="text" value={recipientContact} onChange={e => setRecipientContact(e.target.value)} className={inputClass} placeholder="+996..." /></div>
              <div><label className={labelClass}>{labels.message}</label><textarea value={personalMessage} onChange={e => setPersonalMessage(e.target.value)} rows={3} className={inputClass + ' resize-none'} /></div>
            </div>
            <button onClick={handlePurchase} disabled={submitting || !senderName || !recipientName}
              className="w-full py-4 bg-ocean text-white rounded-2xl font-bold text-lg hover:bg-ocean-dark transition-colors disabled:opacity-50">
              {submitting ? labels.purchasing : `${labels.purchase} — ${finalAmount.toLocaleString()} ${labels.currency}`}
            </button>
          </div>

          {/* Certificate preview */}
          <div>
            <h3 className="font-semibold text-sm text-muted mb-3">{labels.preview}</h3>
            <div ref={certRef} className="rounded-2xl overflow-hidden shadow-xl">
              <div className="relative bg-gradient-to-br from-[#0B1929] via-[#182F48] to-[#246DC9] p-8 md:p-10 text-white" style={{ minHeight: 340 }}>
                {/* Gold border inset */}
                <div className="absolute inset-2 border-2 border-[#E8B86D]/30 rounded-xl pointer-events-none" />
                {/* Glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(232,184,109,0.08)_0%,transparent_50%)] pointer-events-none" />

                <div className="relative z-10 text-center">
                  <h2 className="text-xs tracking-[0.3em] text-[#E8B86D] font-bold mb-0.5">{labels.certHeader}</h2>
                  <p className="text-[10px] text-white/40 tracking-widest mb-4">{labels.certSubheader}</p>
                  <p className="text-white/60 text-sm mb-1">{template.name}</p>
                  <div className="text-[#E8B86D] font-heading font-bold text-4xl md:text-5xl my-4">
                    {finalAmount.toLocaleString()} <span className="text-lg">{labels.currency}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-6 px-4">
                    <div className="text-left"><span className="block text-white/40 text-xs">{labels.from}</span>{senderName || '—'}</div>
                    <div className="text-right"><span className="block text-white/40 text-xs">{labels.to}</span>{recipientName || '—'}</div>
                  </div>
                  {personalMessage && (
                    <p className="italic text-white/50 text-sm mt-4 leading-relaxed">&ldquo;{personalMessage}&rdquo;</p>
                  )}
                  <p className="text-white/30 text-[10px] mt-6 tracking-wider">{labels.validity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}