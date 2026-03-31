'use client';

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
