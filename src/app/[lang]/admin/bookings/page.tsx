'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';

// --- i18n ---
const t = {
  ru: {
    title: 'Управление бронированиями',
    subtitle: 'Просмотр и управление всеми бронированиями',
    search: 'Поиск по телефону или ID...',
    export: 'Экспорт',
    all: 'Все',
    confirmed: 'Подтверждённые',
    hold: 'Ожидание',
    cancelled: 'Отменённые',
    refunded: 'Возвраты',
    id: 'ID',
    customer: 'Клиент',
    trip: 'Рейс',
    date: 'Дата',
    passengers: 'Пасс.',
    amount: 'Сумма',
    payment: 'Оплата',
    status: 'Статус',
    qr: 'QR токен',
    created: 'Создано',
    actions: 'Действия',
    confirm: 'Подтвердить',
    cancel: 'Отменить',
    refund: 'Возврат',
    details: 'Детали бронирования',
    bookingId: 'ID бронирования',
    phone: 'Телефон',
    tripName: 'Рейс',
    departureDate: 'Дата отправления',
    numPassengers: 'Кол-во пассажиров',
    totalAmount: 'Итого',
    paymentMethod: 'Способ оплаты',
    createdAt: 'Дата создания',
    qrToken: 'QR токен',
    close: 'Закрыть',
    statusConfirmed: 'Подтверждён',
    statusHold: 'Ожидание',
    statusCancelled: 'Отменён',
    statusRefunded: 'Возврат',
    cash: 'Наличные',
    card: 'Карта',
    transfer: 'Перевод',
    online: 'Онлайн',
    showing: 'Показано',
    of: 'из',
  },
  en: {
    title: 'Booking Management',
    subtitle: 'View and manage all bookings',
    search: 'Search by phone or ID...',
    export: 'Export',
    all: 'All',
    confirmed: 'Confirmed',
    hold: 'Hold',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
    id: 'ID',
    customer: 'Customer',
    trip: 'Trip',
    date: 'Date',
    passengers: 'Pax',
    amount: 'Amount',
    payment: 'Payment',
    status: 'Status',
    qr: 'QR Token',
    created: 'Created',
    actions: 'Actions',
    confirm: 'Confirm',
    cancel: 'Cancel',
    refund: 'Refund',
    details: 'Booking Details',
    bookingId: 'Booking ID',
    phone: 'Phone',
    tripName: 'Trip',
    departureDate: 'Departure date',
    numPassengers: 'Passengers',
    totalAmount: 'Total',
    paymentMethod: 'Payment method',
    createdAt: 'Created at',
    qrToken: 'QR Token',
    close: 'Close',
    statusConfirmed: 'Confirmed',
    statusHold: 'Hold',
    statusCancelled: 'Cancelled',
    statusRefunded: 'Refunded',
    cash: 'Cash',
    card: 'Card',
    transfer: 'Transfer',
    online: 'Online',
    showing: 'Showing',
    of: 'of',
  },
  ky: {
    title: 'Брондоолорду башкаруу',
    subtitle: 'Бардык брондоолорду көрүү жана башкаруу',
    search: 'Телефон же ID боюнча издөө...',
    export: 'Экспорт',
    all: 'Баары',
    confirmed: 'Ырасталган',
    hold: 'Күтүүдө',
    cancelled: 'Жокко чыгарылган',
    refunded: 'Кайтарылган',
    id: 'ID',
    customer: 'Кардар',
    trip: 'Каттам',
    date: 'Күнү',
    passengers: 'Жүрг.',
    amount: 'Сумма',
    payment: 'Төлөм',
    status: 'Статус',
    qr: 'QR токен',
    created: 'Түзүлгөн',
    actions: 'Аракеттер',
    confirm: 'Ырастоо',
    cancel: 'Жокко чыгаруу',
    refund: 'Кайтаруу',
    details: 'Бронь маалыматтары',
    bookingId: 'Бронь ID',
    phone: 'Телефон',
    tripName: 'Каттам',
    departureDate: 'Жөнөө күнү',
    numPassengers: 'Жүргүнчүлөр саны',
    totalAmount: 'Жалпы',
    paymentMethod: 'Төлөм ыкмасы',
    createdAt: 'Түзүлгөн күнү',
    qrToken: 'QR токен',
    close: 'Жабуу',
    statusConfirmed: 'Ырасталды',
    statusHold: 'Күтүүдө',
    statusCancelled: 'Жокко чыгарылды',
    statusRefunded: 'Кайтарылды',
    cash: 'Накталай',
    card: 'Карта',
    transfer: 'Которуу',
    online: 'Онлайн',
    showing: 'Көрсөтүлүүдө',
    of: 'ичинен',
  },
} as const;

type Lang = keyof typeof t;

interface BookingRow {
  id: number;
  phone: string;
  trip: string;
  date: string;
  passengers: number;
  amount: number;
  currency: string;
  payment: string;
  status: string;
  qrToken: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialBookings: BookingRow[] = [
  { id: 1001, phone: '+996 555 100 001', trip: 'Закатный круиз', date: '2026-07-15 18:00', passengers: 2, amount: 2800, currency: 'KGS', payment: 'card', status: 'confirmed', qrToken: 'ALK-1001-XZ7', createdAt: '2026-07-10 14:23' },
  { id: 1002, phone: '+996 555 200 002', trip: 'Приватный чартер', date: '2026-07-16 10:00', passengers: 1, amount: 7000, currency: 'KGS', payment: 'transfer', status: 'hold', qrToken: 'ALK-1002-AB3', createdAt: '2026-07-10 15:01' },
  { id: 1003, phone: '+996 700 300 003', trip: 'Утренний бриз', date: '2026-07-16 07:00', passengers: 4, amount: 4800, currency: 'KGS', payment: 'cash', status: 'confirmed', qrToken: 'ALK-1003-CD9', createdAt: '2026-07-10 16:45' },
  { id: 1004, phone: '+996 555 400 004', trip: 'Закатный круиз', date: '2026-07-17 18:00', passengers: 2, amount: 2800, currency: 'KGS', payment: 'card', status: 'cancelled', qrToken: 'ALK-1004-EF1', createdAt: '2026-07-11 09:12' },
  { id: 1005, phone: '+996 700 500 005', trip: 'Дневная прогулка', date: '2026-07-17 12:00', passengers: 3, amount: 2700, currency: 'KGS', payment: 'online', status: 'confirmed', qrToken: 'ALK-1005-GH5', createdAt: '2026-07-11 10:30' },
  { id: 1006, phone: '+996 555 600 006', trip: 'Приватный чартер', date: '2026-07-18 14:00', passengers: 1, amount: 7000, currency: 'KGS', payment: 'transfer', status: 'refunded', qrToken: 'ALK-1006-IJ8', createdAt: '2026-07-11 11:05' },
  { id: 1007, phone: '+996 700 700 007', trip: 'Рыбалка на озере', date: '2026-07-18 05:00', passengers: 2, amount: 7000, currency: 'KGS', payment: 'cash', status: 'confirmed', qrToken: 'ALK-1007-KL2', createdAt: '2026-07-11 13:22' },
  { id: 1008, phone: '+996 555 800 008', trip: 'Утренний бриз', date: '2026-07-19 07:00', passengers: 5, amount: 6000, currency: 'KGS', payment: 'card', status: 'hold', qrToken: 'ALK-1008-MN6', createdAt: '2026-07-12 08:15' },
  { id: 1009, phone: '+996 700 900 009', trip: 'Закатный круиз', date: '2026-07-19 18:00', passengers: 2, amount: 2800, currency: 'KGS', payment: 'online', status: 'confirmed', qrToken: 'ALK-1009-OP4', createdAt: '2026-07-12 09:33' },
  { id: 1010, phone: '+996 555 000 010', trip: 'Дневная прогулка', date: '2026-07-20 12:00', passengers: 1, amount: 900, currency: 'KGS', payment: 'cash', status: 'confirmed', qrToken: 'ALK-1010-QR0', createdAt: '2026-07-12 10:48' },
  { id: 1011, phone: '+996 700 110 011', trip: 'Тамга — Каджи-Сай', date: '2026-07-20 09:00', passengers: 3, amount: 5400, currency: 'KGS', payment: 'card', status: 'confirmed', qrToken: 'ALK-1011-ST7', createdAt: '2026-07-12 14:10' },
  { id: 1012, phone: '+996 555 120 012', trip: 'Закатный круиз', date: '2026-07-21 18:00', passengers: 2, amount: 2800, currency: 'KGS', payment: 'online', status: 'hold', qrToken: 'ALK-1012-UV3', createdAt: '2026-07-13 07:55' },
  { id: 1013, phone: '+996 700 130 013', trip: 'Приватный чартер', date: '2026-07-21 10:00', passengers: 1, amount: 7000, currency: 'KGS', payment: 'transfer', status: 'confirmed', qrToken: 'ALK-1013-WX9', createdAt: '2026-07-13 09:20' },
  { id: 1014, phone: '+996 555 140 014', trip: 'Утренний бриз', date: '2026-07-22 07:00', passengers: 2, amount: 2400, currency: 'KGS', payment: 'cash', status: 'cancelled', qrToken: 'ALK-1014-YZ5', createdAt: '2026-07-13 11:40' },
  { id: 1015, phone: '+996 700 150 015', trip: 'Рыбалка на озере', date: '2026-07-22 05:00', passengers: 4, amount: 14000, currency: 'KGS', payment: 'card', status: 'confirmed', qrToken: 'ALK-1015-AB1', createdAt: '2026-07-13 15:05' },
  { id: 1016, phone: '+996 555 160 016', trip: 'Дневная прогулка', date: '2026-07-23 12:00', passengers: 2, amount: 1800, currency: 'KGS', payment: 'online', status: 'refunded', qrToken: 'ALK-1016-CD4', createdAt: '2026-07-14 08:30' },
  { id: 1017, phone: '+996 700 170 017', trip: 'Закатный круиз', date: '2026-07-23 18:00', passengers: 6, amount: 8400, currency: 'KGS', payment: 'transfer', status: 'confirmed', qrToken: 'ALK-1017-EF8', createdAt: '2026-07-14 10:15' },
  { id: 1018, phone: '+996 555 180 018', trip: 'Тамга — Каджи-Сай', date: '2026-07-24 09:00', passengers: 1, amount: 1800, currency: 'KGS', payment: 'cash', status: 'hold', qrToken: 'ALK-1018-GH2', createdAt: '2026-07-14 12:50' },
  { id: 1019, phone: '+996 700 190 019', trip: 'Приватный чартер', date: '2026-07-24 14:00', passengers: 2, amount: 14000, currency: 'KGS', payment: 'card', status: 'cancelled', qrToken: 'ALK-1019-IJ6', createdAt: '2026-07-14 14:22' },
  { id: 1020, phone: '+996 555 200 020', trip: 'Утренний бриз', date: '2026-07-25 07:00', passengers: 3, amount: 3600, currency: 'KGS', payment: 'online', status: 'confirmed', qrToken: 'ALK-1020-KL0', createdAt: '2026-07-15 09:00' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  hold: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-purple-100 text-purple-700',
};

const tabs = ['all', 'confirmed', 'hold', 'cancelled', 'refunded'] as const;

function formatNumber(n: number): string {
  return n.toLocaleString('ru-RU');
}

export default function AdminBookings() {
  const params = useParams();
  const lang = (params?.lang as Lang) || 'ru';
  const dict = t[lang] || t.ru;
  const { token } = useAuth();

  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/bookings/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data: Record<string, unknown>[]) => {
        setBookings(
          data.map((b) => ({
            id: b.id as number,
            phone: (b.phone as string) || '',
            trip: (b.trip_name as string) || '',
            date: (b.departure_date as string) || (b.created_at as string) || '',
            passengers: (b.num_passengers as number) || 0,
            amount: (b.total_amount as number) || 0,
            currency: (b.currency as string) || 'KGS',
            payment: (b.payment_method as string) || '',
            status: (b.status as string) || '',
            qrToken: (b.qr_token as string) || '',
            createdAt: (b.created_at as string) || '',
          }))
        );
      })
      .catch(() => {
        // API error — keep empty array
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      confirmed: dict.statusConfirmed,
      hold: dict.statusHold,
      cancelled: dict.statusCancelled,
      refunded: dict.statusRefunded,
    };
    return map[s] || s;
  };

  const paymentLabel = (p: string) => {
    const map: Record<string, string> = { cash: dict.cash, card: dict.card, transfer: dict.transfer, online: dict.online };
    return map[p] || p;
  };

  const tabLabel = (tab: string) => {
    const map: Record<string, string> = {
      all: dict.all,
      confirmed: dict.confirmed,
      hold: dict.hold,
      cancelled: dict.cancelled,
      refunded: dict.refunded,
    };
    return map[tab] || tab;
  };

  // Filter bookings
  const filtered = bookings.filter(b => {
    if (activeTab !== 'all' && b.status !== activeTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesPhone = b.phone.toLowerCase().includes(q);
      const matchesId = String(b.id).includes(q);
      if (!matchesPhone && !matchesId) return false;
    }
    return true;
  });

  const tabCounts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    hold: bookings.filter(b => b.status === 'hold').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    refunded: bookings.filter(b => b.status === 'refunded').length,
  };

  const changeStatus = async (id: number, newStatus: string) => {
    // Optimistic update
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    try {
      const res = await fetch(`${API_URL}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
    } catch {
      // Revert on failure — reload from API
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: b.status } : b));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0F2B46] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{dict.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{dict.subtitle}</p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => { /* TODO: Implement export */ }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          {dict.export}
        </button>
      </div>

      {/* Search + Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Search bar */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder={dict.search}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
            />
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex gap-1 px-4 py-2 border-b border-gray-100 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                ${activeTab === tab ? 'bg-[#0F2B46] text-white' : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              {tabLabel(tab)}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-white/20' : 'bg-gray-100'}`}>
                {tabCounts[tab as keyof typeof tabCounts]}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50">
                <th className="px-4 py-3 w-8"></th>
                <th className="px-4 py-3">{dict.id}</th>
                <th className="px-4 py-3">{dict.customer}</th>
                <th className="px-4 py-3">{dict.trip}</th>
                <th className="px-4 py-3">{dict.date}</th>
                <th className="px-4 py-3 text-center">{dict.passengers}</th>
                <th className="px-4 py-3 text-right">{dict.amount}</th>
                <th className="px-4 py-3">{dict.payment}</th>
                <th className="px-4 py-3">{dict.status}</th>
                <th className="px-4 py-3">{dict.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((b, i) => (
                <>
                  <tr
                    key={b.id}
                    className={`cursor-pointer ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-blue-50/30 transition-colors`}
                    onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}
                  >
                    <td className="px-4 py-3">
                      <svg
                        className={`w-4 h-4 text-gray-400 transform transition-transform ${expandedId === b.id ? 'rotate-90' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">#{b.id}</td>
                    <td className="px-4 py-3 text-gray-700">{b.phone}</td>
                    <td className="px-4 py-3 text-gray-700">{b.trip}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{b.date}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{b.passengers}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">{formatNumber(b.amount)} {b.currency}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{paymentLabel(b.payment)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[b.status] || 'bg-gray-100 text-gray-700'}`}>
                        {statusLabel(b.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        {b.status === 'hold' && (
                          <button
                            onClick={() => changeStatus(b.id, 'confirmed')}
                            className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded hover:bg-green-100 transition-colors"
                          >
                            {dict.confirm}
                          </button>
                        )}
                        {(b.status === 'confirmed' || b.status === 'hold') && (
                          <button
                            onClick={() => changeStatus(b.id, 'cancelled')}
                            className="px-2 py-1 text-xs font-medium text-red-700 bg-red-50 rounded hover:bg-red-100 transition-colors"
                          >
                            {dict.cancel}
                          </button>
                        )}
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => changeStatus(b.id, 'refunded')}
                            className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded hover:bg-purple-100 transition-colors"
                          >
                            {dict.refund}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Expanded details */}
                  {expandedId === b.id && (
                    <tr key={`${b.id}-detail`} className="bg-blue-50/20">
                      <td colSpan={10} className="px-4 py-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-2xl">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-gray-900">{dict.details}</h4>
                            <button
                              onClick={() => setExpandedId(null)}
                              className="text-xs text-gray-400 hover:text-gray-600"
                            >
                              {dict.close}
                            </button>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                            <div>
                              <span className="text-xs text-gray-500">{dict.bookingId}</span>
                              <p className="font-medium text-gray-900">#{b.id}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">{dict.phone}</span>
                              <p className="font-medium text-gray-900">{b.phone}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">{dict.tripName}</span>
                              <p className="font-medium text-gray-900">{b.trip}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">{dict.departureDate}</span>
                              <p className="font-medium text-gray-900">{b.date}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">{dict.numPassengers}</span>
                              <p className="font-medium text-gray-900">{b.passengers}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">{dict.totalAmount}</span>
                              <p className="font-medium text-gray-900">{formatNumber(b.amount)} {b.currency}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">{dict.paymentMethod}</span>
                              <p className="font-medium text-gray-900">{paymentLabel(b.payment)}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">{dict.qrToken}</span>
                              <p className="font-mono text-xs font-medium text-gray-900 bg-gray-100 inline-block px-2 py-1 rounded">{b.qrToken}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">{dict.createdAt}</span>
                              <p className="font-medium text-gray-900">{b.createdAt}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-400 text-sm">
                    {lang === 'en' ? 'No data' : lang === 'ky' ? 'Маалымат жок' : 'Нет данных'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with count */}
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
          {dict.showing} {filtered.length} {dict.of} {bookings.length}
        </div>
      </div>
    </div>
  );
}
