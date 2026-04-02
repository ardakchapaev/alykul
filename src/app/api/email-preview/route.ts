import { NextRequest, NextResponse } from 'next/server';

type Template = 'confirmation' | 'reminder' | 'review' | 'welcome';

const BRAND = '#0F2B46';
const CTA_BG = '#1B7CED';
const GREY_BG = '#F5F7FA';
const BASE_URL = 'https://alykul.kg';

function layout(body: string, preheader: string) {
  return `<!DOCTYPE html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Алыкул</title>
<style>body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f0f2f5}
.cta{display:inline-block;padding:12px 28px;background:${CTA_BG};color:#fff!important;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px}
td,th{padding:8px 12px;text-align:left;border-bottom:1px solid #eee}
</style></head><body>
<div style="display:none;max-height:0;overflow:hidden">${preheader}</div>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5"><tr><td align="center" style="padding:24px 12px">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06)">
<!-- Header -->
<tr><td style="background:${BRAND};padding:24px 32px;text-align:center">
<span style="color:#fff;font-size:24px;font-weight:700;letter-spacing:1px">⛵ АЛЫКУЛ</span>
</td></tr>
<!-- Body -->
<tr><td style="padding:32px">${body}</td></tr>
<!-- Footer -->
<tr><td style="background:${GREY_BG};padding:24px 32px;font-size:12px;color:#888;text-align:center">
<p>Алыкул — водные прогулки по Иссык-Кулю</p>
<p>📞 +996 555 123 456 &nbsp;|&nbsp; ✉️ info@alykul.kg</p>
<p style="margin-top:12px"><a href="${BASE_URL}" style="color:#888">Сайт</a> &nbsp;·&nbsp;
<a href="https://instagram.com/alykul" style="color:#888">Instagram</a> &nbsp;·&nbsp;
<a href="https://wa.me/996555123456" style="color:#888">WhatsApp</a></p>
<p style="margin-top:16px;font-size:11px"><a href="${BASE_URL}/unsubscribe" style="color:#aaa">Отписаться</a></p>
</td></tr>
</table></td></tr></table></body></html>`;
}

function confirmation(bookingId: string) {
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`${BASE_URL}/scan/${bookingId}`)}`;
  return layout(`
<h1 style="color:${BRAND};font-size:22px;margin:0 0 16px">Бронирование подтверждено! ✅</h1>
<p style="color:#555;line-height:1.6">Ваше бронирование <strong>#${bookingId}</strong> успешно оформлено.</p>
<table width="100%" style="margin:20px 0;border-collapse:collapse;font-size:14px">
<tr><th style="background:${GREY_BG}">Маршрут</th><td>Закатный круиз (Чолпон-Ата)</td></tr>
<tr><th style="background:${GREY_BG}">Дата</th><td>15 июля 2026</td></tr>
<tr><th style="background:${GREY_BG}">Время</th><td>18:00</td></tr>
<tr><th style="background:${GREY_BG}">Судно</th><td>Алыкул</td></tr>
<tr><th style="background:${GREY_BG}">Пассажиры</th><td>2 взрослых</td></tr>
<tr><th style="background:${GREY_BG}">Сумма</th><td><strong>2 800 KGS</strong></td></tr>
</table>
<div style="text-align:center;margin:24px 0">
<img src="${qr}" width="180" height="180" alt="QR" style="border-radius:8px">
<p style="color:#888;font-size:13px;margin-top:8px">Покажите QR-код при посадке</p>
</div>
<div style="text-align:center"><a class="cta" href="${BASE_URL}/account">Мои бронирования</a></div>
`, 'Ваше бронирование подтверждено');
}

function reminder(bookingId: string) {
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`${BASE_URL}/scan/${bookingId}`)}`;
  const map = `https://maps.googleapis.com/maps/api/staticmap?center=42.65,77.06&zoom=14&size=560x200&markers=42.65,77.06&key=DEMO`;
  return layout(`
<h1 style="color:${BRAND};font-size:22px;margin:0 0 16px">Ваш рейс через 2 часа! ⏰</h1>
<p style="color:#555;line-height:1.6">Напоминаем: бронирование <strong>#${bookingId}</strong></p>
<table width="100%" style="margin:16px 0;border-collapse:collapse;font-size:14px">
<tr><th style="background:${GREY_BG}">Маршрут</th><td>Закатный круиз (Чолпон-Ата)</td></tr>
<tr><th style="background:${GREY_BG}">Отправление</th><td>18:00, пирс Чолпон-Ата</td></tr>
</table>
<p style="font-size:13px;color:#888;margin:12px 0 4px">📍 Пирс на карте:</p>
<img src="${map}" width="100%" style="border-radius:8px;max-width:560px" alt="Карта">
<p style="margin:16px 0;font-size:14px">☀️ Погода: 28°C, ясно, ветер 8 км/ч</p>
<div style="text-align:center;margin:20px 0">
<img src="${qr}" width="150" height="150" alt="QR" style="border-radius:8px">
<p style="color:#888;font-size:13px;margin-top:8px">Не забудьте QR-код!</p>
</div>
`, 'Ваш рейс через 2 часа');
}

function review(bookingId: string) {
  const stars = [1, 2, 3, 4, 5]
    .map((n) => `<a href="${BASE_URL}/review?booking=${bookingId}&rating=${n}" style="text-decoration:none;font-size:32px;margin:0 4px">⭐</a>`)
    .join('');
  return layout(`
<h1 style="color:${BRAND};font-size:22px;margin:0 0 16px">Как прошла поездка? 🚢</h1>
<p style="color:#555;line-height:1.6">Спасибо за поездку с Алыкул! Расскажите о вашем опыте — это поможет нам стать лучше.</p>
<p style="text-align:center;margin:24px 0;font-size:14px;color:#888">Нажмите на звезду:</p>
<div style="text-align:center;margin:16px 0">${stars}</div>
<div style="text-align:center;margin:24px 0"><a class="cta" href="${BASE_URL}/review?booking=${bookingId}">Оставить отзыв</a></div>
`, 'Расскажите о вашей поездке');
}

function welcome() {
  return layout(`
<h1 style="color:${BRAND};font-size:22px;margin:0 0 16px">Добро пожаловать в Алыкул! 🎉</h1>
<p style="color:#555;line-height:1.6">Вы зарегистрировались на платформе водных прогулок по Иссык-Кулю.</p>
<p style="color:#555;line-height:1.6">Мы предлагаем закатные круизы, скоростные туры, приватные чартеры и детские праздники.</p>
<div style="background:${GREY_BG};border-radius:8px;padding:16px;margin:20px 0;text-align:center">
<p style="margin:0 0 4px;font-size:13px;color:#888">Промокод на первую поездку:</p>
<p style="margin:0;font-size:28px;font-weight:700;color:${BRAND};letter-spacing:3px">WELCOME10</p>
<p style="margin:4px 0 0;font-size:13px;color:#888">Скидка 10% на первое бронирование</p>
</div>
<div style="text-align:center;margin:24px 0"><a class="cta" href="${BASE_URL}/trips">Посмотреть рейсы</a></div>
`, 'Добро пожаловать в Алыкул');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const template = (searchParams.get('template') || 'confirmation') as Template;
  const bookingId = searchParams.get('bookingId') || '000';

  let html: string;

  switch (template) {
    case 'confirmation':
      html = confirmation(bookingId);
      break;
    case 'reminder':
      html = reminder(bookingId);
      break;
    case 'review':
      html = review(bookingId);
      break;
    case 'welcome':
      html = welcome();
      break;
    default:
      return NextResponse.json({ error: 'Unknown template. Use: confirmation, reminder, review, welcome' }, { status: 400 });
  }

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
