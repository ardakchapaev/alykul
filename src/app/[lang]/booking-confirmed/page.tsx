'use client';

import { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const t = {
  ru: { title: 'Бронирование подтверждено!', subtitle: 'Покажите QR-код при посадке на судно', booking: 'Бронирование', qr: 'QR-код для посадки', my: 'Мои бронирования', home: 'На главную', trips: 'Ещё рейсы', note: 'Сохраните эту страницу или сделайте скриншот QR-кода', download: 'Скачать билет (PDF)', share: 'Поделиться билетом', calendar: 'Добавить в календарь' },
  en: { title: 'Booking Confirmed!', subtitle: 'Show the QR code when boarding', booking: 'Booking', qr: 'QR code for boarding', my: 'My Bookings', home: 'Home', trips: 'More Trips', note: 'Save this page or take a screenshot of the QR code', download: 'Download Ticket (PDF)', share: 'Share Ticket', calendar: 'Add to Calendar' },
  ky: { title: 'Брондоо ырасталды!', subtitle: 'Кемеге отурганда QR-кодду көрсөтүңүз', booking: 'Брондоо', qr: 'Отуруу үчүн QR-код', my: 'Менин брондоолорум', home: 'Башкы бет', trips: 'Башка рейстер', note: 'Бул баракчаны сактаңыз же QR-коддун скриншотун тартыңыз', download: 'Билетти жүктөө (PDF)', share: 'Билетти бөлүшүү', calendar: 'Календарга кошуу' },
};

export default function BookingConfirmedPage() {
  return <Suspense><ConfirmedInner /></Suspense>;
}

function ConfirmedInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;

  const bookingId = searchParams.get('id');
  const qrToken = searchParams.get('qr');

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`https://alykul.baimuras.pro/api/v1/bookings/${bookingId}/verify-qr?qr_token=${qrToken}`)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F8FB] to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Animated checkmark */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              className="checkmark-path"
              style={{ strokeDasharray: 24, strokeDashoffset: 24, animation: 'draw 0.5s ease-out 0.3s forwards' }}
            />
          </svg>
        </div>

        <h1 className="font-heading font-bold text-3xl uppercase mb-2 confirmed-title-shimmer">{labels.title}</h1>
        <p className="text-muted mb-8">{labels.subtitle}</p>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100/80 mb-6">
          <div className="text-base font-semibold text-[#00897B] mb-4">{labels.booking} <span className="text-lg">#{bookingId}</span></div>

          <div className="mb-4">
            <p className="text-sm text-muted mb-3">{labels.qr}</p>
            <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100 inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="QR Code" className="mx-auto rounded-xl" width={250} height={250} />
            </div>
          </div>

          {/* Download ticket (print-to-PDF) */}
          <button
            onClick={() => {
              const printWindow = window.open('', '_blank');
              if (!printWindow) return;
              printWindow.document.write(`
                <html><head><title>Ticket #${bookingId}</title>
                <style>
                  body { font-family: sans-serif; padding: 40px; text-align: center; }
                  h1 { font-size: 24px; margin-bottom: 8px; }
                  .qr { margin: 20px auto; }
                  .info { margin: 16px 0; font-size: 14px; color: #666; }
                  .footer { margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 16px; }
                </style></head><body>
                  <h1>АЛЫКУЛ — Электронный билет</h1>
                  <div class="info">Бронирование #${bookingId}</div>
                  <img class="qr" src="${qrUrl}" width="200" height="200" />
                  <div class="info">Покажите QR-код при посадке на судно</div>
                  <div class="footer">alykul.baimuras.pro · Озеро Иссык-Куль · +996 555 123 456</div>
                  <script>window.print();</script>
                </body></html>
              `);
            }}
            className="w-full py-3.5 bg-[#0A1628] text-white rounded-xl font-semibold text-sm hover:bg-[#0A1628]/90 transition-all mb-3 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            {labels.download}
          </button>

          {/* Share ticket */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Алыкул — Билет #${bookingId}`,
                  text: `Мой билет на рейс. Бронирование #${bookingId}`,
                  url: window.location.href,
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Ссылка скопирована!');
              }
            }}
            className="w-full py-3.5 border border-gray-200 text-navy rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all mb-3 flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            {labels.share}
          </button>

          {/* Add to calendar */}
          <button
            onClick={() => {
              const event = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'BEGIN:VEVENT',
                `SUMMARY:Алыкул — Рейс #${bookingId}`,
                'LOCATION:Чолпон-Ата, Озеро Иссык-Куль',
                `DESCRIPTION:Покажите QR-код при посадке. Бронирование #${bookingId}`,
                'END:VEVENT',
                'END:VCALENDAR'
              ].join('\r\n');
              const blob = new Blob([event], { type: 'text/calendar' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `alykul-ticket-${bookingId}.ics`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="w-full py-3.5 border border-gray-200 text-navy rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all mb-4 flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {labels.calendar}
          </button>

          <p className="text-xs text-muted">{labels.note}</p>
        </div>

        <div className="flex gap-3">
          <Link href={`/${lang}/account`}
            className="flex-1 py-3 bg-ocean text-white rounded-xl font-semibold text-sm hover:bg-ocean-dark transition-colors">
            {labels.my}
          </Link>
          <Link href={`/${lang}/trips`}
            className="flex-1 py-3 border border-ocean text-ocean rounded-xl font-semibold text-sm hover:bg-ocean/5 transition-colors">
            {labels.trips}
          </Link>
        </div>

        <Link href={`/${lang}`} className="block mt-4 text-muted text-sm hover:text-ocean">
          {labels.home}
        </Link>
      </div>
    </div>
  );
}
