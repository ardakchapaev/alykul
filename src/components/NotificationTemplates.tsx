// Notification template definitions for Alykul push notifications
// Used by service worker and backend to construct notification payloads

export interface NotificationPayload {
  title: string;
  body: string;
  icon: string;
  tag: string;
  url: string;
  actions?: { action: string; title: string }[];
}

export const NotificationTemplates = {
  bookingConfirmed: (bookingId: number, tripName: string): NotificationPayload => ({
    title: '\u2705 Бронирование подтверждено!',
    body: `Рейс: ${tripName}. Бронирование #${bookingId}. Покажите QR-код при посадке.`,
    icon: '/images/icon-192.png',
    tag: `booking-${bookingId}`,
    url: `/ru/booking-confirmed?id=${bookingId}`,
    actions: [
      { action: 'open', title: 'Открыть билет' },
    ],
  }),

  tripReminder: (bookingId: number, tripName: string, time: string): NotificationPayload => ({
    title: '\uD83D\uDEA2 Рейс через 2 часа!',
    body: `${tripName} отправляется в ${time}. Не забудьте QR-код!`,
    icon: '/images/icon-192.png',
    tag: `reminder-${bookingId}`,
    url: `/ru/account`,
  }),

  postTrip: (bookingId: number, tripName: string): NotificationPayload => ({
    title: '\u2B50 Как прошла поездка?',
    body: `Оцените рейс "${tripName}" и помогите другим путешественникам!`,
    icon: '/images/icon-192.png',
    tag: `review-${bookingId}`,
    url: `/ru/trips`, // TODO: link to review page
  }),

  promoOffer: (message: string): NotificationPayload => ({
    title: '\uD83C\uDF81 Специальное предложение!',
    body: message,
    icon: '/images/icon-192.png',
    tag: 'promo',
    url: `/ru/trips`,
  }),
};
