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
    <div className="min-h-screen bg-sand flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="font-heading font-bold text-3xl uppercase mb-2">{labels.title}</h1>
        <p className="text-muted mb-8">{labels.subtitle}</p>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
          <div className="text-sm text-muted mb-2">{labels.booking} #{bookingId}</div>

          <div className="mb-4">
            <p className="text-sm text-muted mb-3">{labels.qr}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} alt="QR Code" className="mx-auto rounded-xl" width={250} height={250} />
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
            className="w-full py-3 bg-navy text-white rounded-xl font-semibold text-sm hover:bg-navy/90 transition-colors mb-3 flex items-center justify-center gap-2"
          >
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
            className="w-full py-3 border border-gray-200 text-navy rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors mb-3 flex items-center justify-center gap-2"
          >
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
            className="w-full py-3 border border-gray-200 text-navy rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors mb-4 flex items-center justify-center gap-2"
          >
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
