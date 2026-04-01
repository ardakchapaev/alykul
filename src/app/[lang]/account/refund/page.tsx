'use client';

import { Suspense, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const t = {
  ru: {
    title: 'Перенос / Возврат', back: 'Назад в кабинет', booking: 'Бронирование',
    tabReschedule: 'Перенос даты', tabRefund: 'Возврат',
    tripLabel: 'Рейс', dateLabel: 'Дата', passengersLabel: 'Гости', amountLabel: 'Сумма',
    newDate: 'Выберите новую дату', availableTrips: 'Доступные рейсы на эту дату',
    rescheduleBtn: 'Подтвердить перенос', reschedulePolicy: 'Бесплатный перенос при уведомлении за 6+ часов до отправления',
    refundPolicy: 'Политика возврата', refund24: '24+ часов до рейса — 100% возврат', refund12: '12–24 часа — 50% возврат', refundNo: 'Менее 12 часов — возврат невозможен',
    refundAmount: 'Сумма возврата', reason: 'Причина', refundBtn: 'Запросить возврат',
    reasons: ['Изменились планы', 'Погодные условия', 'Другое'],
    successReschedule: 'Дата успешно перенесена!', successRefund: 'Запрос на возврат отправлен!',
    backToAccount: 'Вернуться в кабинет', loading: 'Загрузка...', noTrips: 'Нет доступных рейсов',
    hoursLeft: 'ч. до рейса', refundPercent: 'возврат',
  },
  en: {
    title: 'Reschedule / Refund', back: 'Back to account', booking: 'Booking',
    tabReschedule: 'Reschedule', tabRefund: 'Refund',
    tripLabel: 'Trip', dateLabel: 'Date', passengersLabel: 'Guests', amountLabel: 'Amount',
    newDate: 'Select new date', availableTrips: 'Available trips on this date',
    rescheduleBtn: 'Confirm Reschedule', reschedulePolicy: 'Free reschedule if notified 6+ hours before departure',
    refundPolicy: 'Refund policy', refund24: '24+ hours before trip — 100% refund', refund12: '12–24 hours — 50% refund', refundNo: 'Less than 12 hours — no refund',
    refundAmount: 'Refund amount', reason: 'Reason', refundBtn: 'Request Refund',
    reasons: ['Changed plans', 'Weather conditions', 'Other'],
    successReschedule: 'Successfully rescheduled!', successRefund: 'Refund request submitted!',
    backToAccount: 'Back to account', loading: 'Loading...', noTrips: 'No available trips',
    hoursLeft: 'h. before trip', refundPercent: 'refund',
  },
  ky: {
    title: 'Которуу / Кайтаруу', back: 'Кабинетке кайтуу', booking: 'Брондоо',
    tabReschedule: 'Дата которуу', tabRefund: 'Кайтаруу',
    tripLabel: 'Рейс', dateLabel: 'Күн', passengersLabel: 'Конокторо', amountLabel: 'Сумма',
    newDate: 'Жаны дата тандаңыз', availableTrips: 'Бул күндөгү рейстер',
    rescheduleBtn: 'Которууну ырастоо', reschedulePolicy: 'Жөнөтүүдөн 6+ саат мурун билдирсеңиз акысыз которуу',
    refundPolicy: 'Кайтаруу саясаты', refund24: 'Рейстен 24+ саат мурун — 100% кайтаруу', refund12: '12–24 саат — 50% кайтаруу', refundNo: '12 сааттан аз — кайтаруу жок',
    refundAmount: 'Кайтаруу суммасы', reason: 'Себеби', refundBtn: 'Кайтарууну суроо',
    reasons: ['Пландар өзгөрдү', 'Аба ырайы', 'Башка'],
    successReschedule: 'Дата ийгиликтүү которулду!', successRefund: 'Кайтаруу сурамы жөнөтүлдү!',
    backToAccount: 'Кабинетке кайтуу', loading: 'Жүктөлүүдө...', noTrips: 'Рейстер жок',
    hoursLeft: 'с. рейске чейин', refundPercent: 'кайтаруу',
  },
};

// TODO: Replace with API call
const mockBooking = {
  id: 1001,
  tripName: { ru: 'Закатный круиз', en: 'Sunset Cruise', ky: 'Кечки сейилдөө' },
  date: '2026-04-15',
  departure: '2026-04-15T18:00:00',
  passengers: 2,
  amount: 2800,
  currency: 'KGS',
};

const mockTrips = [
  { id: 101, time: '10:00', name: { ru: 'Утренний рейс', en: 'Morning trip', ky: 'Эртеңки рейс' }, seats: 12 },
  { id: 102, time: '14:00', name: { ru: 'Дневной круиз', en: 'Day cruise', ky: 'Күндүзгү круиз' }, seats: 8 },
  { id: 103, time: '18:00', name: { ru: 'Закатный круиз', en: 'Sunset cruise', ky: 'Кечки круиз' }, seats: 5 },
];

export default function RefundPage() {
  return <Suspense><RefundInner /></Suspense>;
}

function RefundInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;

  const bookingIdParam = searchParams.get('booking') || String(mockBooking.id);
  void bookingIdParam; // used for future API integration

  const [tab, setTab] = useState<'reschedule' | 'refund'>('reschedule');
  const [newDate, setNewDate] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<number | null>(null);
  const [reason, setReason] = useState(labels.reasons[0]);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const hoursUntilDeparture = useMemo(() => {
    const dep = new Date(mockBooking.departure).getTime();
    const now = Date.now();
    return Math.max(0, Math.round((dep - now) / (1000 * 60 * 60)));
  }, []);

  const refundPercent = hoursUntilDeparture >= 24 ? 100 : hoursUntilDeparture >= 12 ? 50 : 0;
  const refundAmount = Math.round(mockBooking.amount * refundPercent / 100);

  const handleReschedule = async () => {
    if (!newDate || !selectedTrip) return;
    setSubmitting(true);
    // TODO: Replace with real reschedule API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess('reschedule');
    setSubmitting(false);
  };

  const handleRefund = async () => {
    if (refundPercent === 0) return;
    setSubmitting(true);
    // TODO: Replace with real refund API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess('refund');
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="font-heading font-bold text-2xl mb-2">{success === 'reschedule' ? labels.successReschedule : labels.successRefund}</h1>
          <Link href={`/${lang}/account`} className="inline-block mt-6 px-6 py-3 bg-ocean text-white rounded-xl font-semibold hover:bg-ocean-dark transition-colors">
            {labels.backToAccount}
          </Link>
        </div>
      </div>
    );
  }

  const tripNameLocalized = mockBooking.tripName[lang as keyof typeof mockBooking.tripName] || mockBooking.tripName.ru;

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <div className="bg-navy text-white px-6 md:px-14 py-6">
        <Link href={`/${lang}/account`} className="text-foam/70 text-sm hover:text-white">&larr; {labels.back}</Link>
        <h1 className="font-heading font-bold text-2xl md:text-3xl uppercase mt-2">{labels.title}</h1>
      </div>

      <div className="px-6 md:px-14 py-8 max-w-2xl mx-auto space-y-6">
        {/* Booking details */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="text-xs text-muted mb-1">{labels.booking} #{mockBooking.id}</div>
          <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
            <div><span className="text-muted">{labels.tripLabel}:</span> <span className="font-semibold">{tripNameLocalized}</span></div>
            <div><span className="text-muted">{labels.dateLabel}:</span> <span className="font-semibold">{new Date(mockBooking.date).toLocaleDateString(lang === 'ky' ? 'ru' : lang, { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
            <div><span className="text-muted">{labels.passengersLabel}:</span> <span className="font-semibold">{mockBooking.passengers}</span></div>
            <div><span className="text-muted">{labels.amountLabel}:</span> <span className="font-bold text-ocean">{mockBooking.amount.toLocaleString()} {mockBooking.currency}</span></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-xl p-1 border border-gray-100">
          <button onClick={() => setTab('reschedule')}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-colors ${tab === 'reschedule' ? 'bg-ocean text-white' : 'text-muted hover:text-navy'}`}>
            {labels.tabReschedule}
          </button>
          <button onClick={() => setTab('refund')}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-colors ${tab === 'refund' ? 'bg-ocean text-white' : 'text-muted hover:text-navy'}`}>
            {labels.tabRefund}
          </button>
        </div>

        {/* Reschedule tab */}
        {tab === 'reschedule' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
              <label className="block text-sm font-semibold text-navy">{labels.newDate}</label>
              <input type="date" value={newDate} onChange={e => { setNewDate(e.target.value); setSelectedTrip(null); }}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-ocean focus:outline-none" />

              {newDate && (
                <div>
                  <h4 className="text-sm font-semibold text-navy mb-3">{labels.availableTrips}</h4>
                  <div className="space-y-2">
                    {mockTrips.map(trip => (
                      <button key={trip.id} onClick={() => setSelectedTrip(trip.id)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all flex justify-between items-center ${
                          selectedTrip === trip.id ? 'border-ocean bg-ocean/5' : 'border-gray-100 hover:border-gray-200'
                        }`}>
                        <div>
                          <div className="font-semibold">{trip.name[lang as keyof typeof trip.name] || trip.name.ru}</div>
                          <div className="text-muted text-sm">{trip.seats} {lang === 'en' ? 'seats left' : 'мест'}</div>
                        </div>
                        <div className="font-bold text-ocean text-lg">{trip.time}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
              {labels.reschedulePolicy}
            </div>

            <button onClick={handleReschedule} disabled={submitting || !newDate || !selectedTrip}
              className="w-full py-4 bg-ocean text-white rounded-2xl font-bold text-lg hover:bg-ocean-dark transition-colors disabled:opacity-50">
              {submitting ? '...' : labels.rescheduleBtn}
            </button>
          </div>
        )}

        {/* Refund tab */}
        {tab === 'refund' && (
          <div className="space-y-4">
            {/* Policy */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h4 className="font-bold text-sm mb-3">{labels.refundPolicy}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" />{labels.refund24}</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500" />{labels.refund12}</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" />{labels.refundNo}</div>
              </div>
            </div>

            {/* Refund calculation */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted">{hoursUntilDeparture} {labels.hoursLeft}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  refundPercent === 100 ? 'bg-green-100 text-green-800' :
                  refundPercent === 50 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>{refundPercent}% {labels.refundPercent}</span>
              </div>
              <div className="text-center py-4">
                <div className="text-muted text-sm">{labels.refundAmount}</div>
                <div className={`font-bold text-3xl mt-1 ${refundPercent > 0 ? 'text-ocean' : 'text-red-500'}`}>
                  {refundAmount.toLocaleString()} {mockBooking.currency}
                </div>
              </div>
            </div>

            {/* Reason */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <label className="block text-sm font-semibold text-navy mb-2">{labels.reason}</label>
              <select value={reason} onChange={e => setReason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-ocean focus:outline-none bg-white">
                {labels.reasons.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <button onClick={handleRefund} disabled={submitting || refundPercent === 0}
              className="w-full py-4 bg-ocean text-white rounded-2xl font-bold text-lg hover:bg-ocean-dark transition-colors disabled:opacity-50">
              {submitting ? '...' : `${labels.refundBtn} — ${refundAmount.toLocaleString()} ${mockBooking.currency}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}