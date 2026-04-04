'use client';

import { useState } from 'react';
import { openWhatsApp } from '@/components/WhatsAppBooking';

type Dict = {
  booking_widget: {
    pier: string;
    date: string;
    guests: string;
    search: string;
    guests_2: string;
    guests_4: string;
    guests_6: string;
    guests_8: string;
  };
  piers: {
    cholpon: string;
    bosteri: string;
    karakol: string;
    tamga: string;
  };
  whatsapp: {
    hello: string;
    pier: string;
    date: string;
    guests: string;
    confirm: string;
  };
};

export default function HeroBooking({ dict }: { dict: Dict }) {
  function handleBook() {
    const pier = (document.getElementById('pier') as HTMLSelectElement).value;
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const guests = (document.getElementById('guests') as HTMLSelectElement).value;

    const wa = dict.whatsapp;
    const msg = `${wa.hello}\n\n📍 ${wa.pier}: ${pier}\n📅 ${wa.date}: ${date}\n👥 ${wa.guests}: ${guests}\n\n${wa.confirm}`;
    openWhatsApp(msg);
  }

  return (
    <div className="bg-white/[0.12] backdrop-blur-2xl border border-white/15 rounded-2xl p-6 flex flex-col md:flex-row gap-3 items-end" id="booking">
      <div className="flex-1 w-full">
        <label className="block text-foam text-xs font-medium uppercase tracking-wider mb-1.5">{dict.booking_widget.pier}</label>
        <select id="pier" className="w-full px-4 py-3 bg-white/[0.08] border border-white/20 rounded-xl text-white text-sm font-body outline-none focus:border-ocean">
          <option value={dict.piers.cholpon}>{dict.piers.cholpon}</option>
          <option value={dict.piers.bosteri}>{dict.piers.bosteri}</option>
          <option value={dict.piers.karakol}>{dict.piers.karakol}</option>
          <option value={dict.piers.tamga}>{dict.piers.tamga}</option>
        </select>
      </div>
      <div className="flex-1 w-full">
        <label className="block text-foam text-xs font-medium uppercase tracking-wider mb-1.5">{dict.booking_widget.date}</label>
        <input id="date" type="date" defaultValue="2026-07-15" className="w-full px-4 py-3 bg-white/[0.08] border border-white/20 rounded-xl text-white text-sm font-body outline-none focus:border-ocean" />
      </div>
      <div className="flex-1 w-full">
        <label className="block text-foam text-xs font-medium uppercase tracking-wider mb-1.5">{dict.booking_widget.guests}</label>
        <select id="guests" className="w-full px-4 py-3 bg-white/[0.08] border border-white/20 rounded-xl text-white text-sm font-body outline-none focus:border-ocean">
          <option>{dict.booking_widget.guests_2}</option>
          <option>{dict.booking_widget.guests_4}</option>
          <option>{dict.booking_widget.guests_6}</option>
          <option>{dict.booking_widget.guests_8}</option>
        </select>
      </div>
      <button onClick={handleBook} className="px-8 py-3 bg-ocean text-white rounded-xl font-semibold whitespace-nowrap hover:bg-ocean-dark transition-colors w-full md:w-auto">
        {dict.booking_widget.search}
      </button>
    </div>
  );
}

/* ═══════════════ M1 CONTACT FORM ═══════════════ */
type ContactDict = {
  title: string;
  name: string;
  phone: string;
  message: string;
  send: string;
  sent: string;
};

export function M1ContactForm({ dict }: { dict: ContactDict }) {
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
    <div>
      {contactSent ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4 text-ocean">&#10003;</div>
          <p className="text-ocean font-semibold text-lg">{dict.sent}</p>
        </div>
      ) : (
        <form className="space-y-4 mb-8" onSubmit={(e) => { e.preventDefault(); handleContact(); }}>
          <input type="text" placeholder={dict.name} value={contactForm.name} autoComplete="name"
            onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 focus:border-ocean focus:ring-1 focus:ring-ocean rounded-xl outline-none transition-colors" />
          <input type="tel" placeholder={dict.phone} value={contactForm.phone} autoComplete="tel"
            onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 focus:border-ocean focus:ring-1 focus:ring-ocean rounded-xl outline-none transition-colors" />
          <textarea placeholder={dict.message} rows={3} value={contactForm.message}
            onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 focus:border-ocean focus:ring-1 focus:ring-ocean rounded-xl outline-none transition-colors resize-none" />
          <button type="submit" className="w-full py-3 bg-ocean hover:bg-ocean-dark text-white rounded-xl font-semibold transition-colors">
            {dict.send}
          </button>
        </form>
      )}
      <div className="space-y-3">
        <a href="tel:+996555123456" className="flex items-center gap-3 text-navy hover:text-ocean transition-colors text-sm">
          <span>&#128241;</span> +996 555 123 456
        </a>
        <a href="mailto:info@alykul.kg" className="flex items-center gap-3 text-navy hover:text-ocean transition-colors text-sm">
          <span>&#128231;</span> info@alykul.kg
        </a>
        <a href="https://wa.me/996555123456" className="flex items-center gap-3 text-navy hover:text-ocean transition-colors text-sm">
          <span>&#128172;</span> WhatsApp
        </a>
        <a href="https://t.me/alykul_bot" className="flex items-center gap-3 text-navy hover:text-ocean transition-colors text-sm">
          <span>&#129302;</span> Telegram @alykul_bot
        </a>
      </div>
    </div>
  );
}
