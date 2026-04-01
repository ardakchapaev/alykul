'use client';

import { useAuth } from '@/lib/auth-context';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// --- i18n ---
const t = {
  ru: {
    title: 'Панель управления',
    welcome: 'Добро пожаловать',
    totalBookings: 'Всего бронирований',
    revenue: 'Выручка',
    activeTrips: 'Активные рейсы',
    totalPassengers: 'Всего пассажиров',
    recentBookings: 'Последние бронирования',
    id: 'ID',
    passenger: 'Пассажир',
    trip: 'Рейс',
    date: 'Дата',
    amount: 'Сумма',
    status: 'Статус',
    actions: 'Действия',
    viewAll: 'Все бронирования',
    manageTrips: 'Управление рейсами',
    view: 'Просмотр',
    confirmed: 'Подтверждён',
    hold: 'Ожидание',
    cancelled: 'Отменён',
    refunded: 'Возврат',
    passengers: 'пасс.',
  },
  en: {
    title: 'Dashboard',
    welcome: 'Welcome',
    totalBookings: 'Total Bookings',
    revenue: 'Revenue',
    activeTrips: 'Active Trips',
    totalPassengers: 'Total Passengers',
    recentBookings: 'Recent Bookings',
    id: 'ID',
    passenger: 'Passenger',
    trip: 'Trip',
    date: 'Date',
    amount: 'Amount',
    status: 'Status',
    actions: 'Actions',
    viewAll: 'View All Bookings',
    manageTrips: 'Manage Trips',
    view: 'View',
    confirmed: 'Confirmed',
    hold: 'Hold',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
    passengers: 'pax',
  },
  ky: {
    title: 'Башкаруу панели',
    welcome: 'Кош келиңиз',
    totalBookings: 'Жалпы брондоолор',
    revenue: 'Киреше',
    activeTrips: 'Активдүү каттамдар',
    totalPassengers: 'Жалпы жүргүнчүлөр',
    recentBookings: 'Акыркы брондоолор',
    id: 'ID',
    passenger: 'Жүргүнчү',
    trip: 'Каттам',
    date: 'Күнү',
    amount: 'Сумма',
    status: 'Статус',
    actions: 'Аракеттер',
    viewAll: 'Бардык брондоолор',
    manageTrips: 'Каттамдарды башкаруу',
    view: 'Көрүү',
    confirmed: 'Ырасталды',
    hold: 'Күтүүдө',
    cancelled: 'Жокко чыгарылды',
    refunded: 'Кайтарылды',
    passengers: 'жүрг.',
  },
} as const;

type Lang = keyof typeof t;

// --- Mock data ---
// TODO: Replace with API call
const mockStats = {
  bookings: 847,
  revenue: 1_245_600,
  activeTrips: 12,
  passengers: 2_341,
};

// TODO: Replace with API call
const mockBookings = [
  { id: 1001, phone: '+996 555 100 001', trip: 'Закатный круиз', date: '2026-07-15 18:00', amount: 2800, currency: 'KGS', status: 'confirmed', passengers: 2 },
  { id: 1002, phone: '+996 555 200 002', trip: 'Приватный чартер', date: '2026-07-16 10:00', amount: 7000, currency: 'KGS', status: 'hold', passengers: 1 },
  { id: 1003, phone: '+996 700 300 003', trip: 'Утренний бриз', date: '2026-07-16 07:00', amount: 1400, currency: 'KGS', status: 'confirmed', passengers: 4 },
  { id: 1004, phone: '+996 555 400 004', trip: 'Закатный круиз', date: '2026-07-17 18:00', amount: 2800, currency: 'KGS', status: 'cancelled', passengers: 2 },
  { id: 1005, phone: '+996 700 500 005', trip: 'Дневная прогулка', date: '2026-07-17 12:00', amount: 1800, currency: 'KGS', status: 'confirmed', passengers: 3 },
  { id: 1006, phone: '+996 555 600 006', trip: 'Приватный чартер', date: '2026-07-18 14:00', amount: 7000, currency: 'KGS', status: 'refunded', passengers: 1 },
  { id: 1007, phone: '+996 700 700 007', trip: 'Рыбалка на озере', date: '2026-07-18 05:00', amount: 3500, currency: 'KGS', status: 'confirmed', passengers: 2 },
  { id: 1008, phone: '+996 555 800 008', trip: 'Утренний бриз', date: '2026-07-19 07:00', amount: 1400, currency: 'KGS', status: 'hold', passengers: 5 },
  { id: 1009, phone: '+996 700 900 009', trip: 'Закатный круиз', date: '2026-07-19 18:00', amount: 2800, currency: 'KGS', status: 'confirmed', passengers: 2 },
  { id: 1010, phone: '+996 555 000 010', trip: 'Дневная прогулка', date: '2026-07-20 12:00', amount: 1800, currency: 'KGS', status: 'confirmed', passengers: 1 },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  hold: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-purple-100 text-purple-700',
};

function formatNumber(n: number): string {
  return n.toLocaleString('ru-RU');
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const params = useParams();
  const lang = (params?.lang as Lang) || 'ru';
  const dict = t[lang] || t.ru;

  const statCards = [
    { label: dict.totalBookings, value: formatNumber(mockStats.bookings), icon: ClipboardIcon, color: 'bg-blue-50 text-blue-600' },
    { label: dict.revenue, value: `${formatNumber(mockStats.revenue)} KGS`, icon: CurrencyIcon, color: 'bg-green-50 text-green-600' },
    { label: dict.activeTrips, value: String(mockStats.activeTrips), icon: ShipIcon, color: 'bg-indigo-50 text-indigo-600' },
    { label: dict.totalPassengers, value: formatNumber(mockStats.passengers), icon: UsersIcon, color: 'bg-orange-50 text-orange-600' },
  ];

  const statusLabel = (s: string) => {
    const map: Record<string, string> = { confirmed: dict.confirmed, hold: dict.hold, cancelled: dict.cancelled, refunded: dict.refunded };
    return map[s] || s;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{dict.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{dict.welcome}, {user?.name || user?.phone || 'Admin'}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg border border-gray-200 p-5 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-xl font-semibold text-gray-900 mt-0.5">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">{dict.recentBookings}</h2>
          <div className="flex gap-2 mt-3 sm:mt-0">
            <Link
              href={`/${lang}/admin/bookings`}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {dict.viewAll}
            </Link>
            <Link
              href={`/${lang}/admin/trips`}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-[#0F2B46] text-white hover:bg-[#1a3d5c] transition-colors"
            >
              {dict.manageTrips}
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50">
                <th className="px-5 py-3">{dict.id}</th>
                <th className="px-5 py-3">{dict.passenger}</th>
                <th className="px-5 py-3">{dict.trip}</th>
                <th className="px-5 py-3">{dict.date}</th>
                <th className="px-5 py-3 text-right">{dict.amount}</th>
                <th className="px-5 py-3">{dict.status}</th>
                <th className="px-5 py-3">{dict.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockBookings.map((b, i) => (
                <tr key={b.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                  <td className="px-5 py-3 font-medium text-gray-900">#{b.id}</td>
                  <td className="px-5 py-3">
                    <div className="text-gray-900">{b.phone}</div>
                    <div className="text-xs text-gray-400">{b.passengers} {dict.passengers}</div>
                  </td>
                  <td className="px-5 py-3 text-gray-700">{b.trip}</td>
                  <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{b.date}</td>
                  <td className="px-5 py-3 text-right font-medium text-gray-900">{formatNumber(b.amount)} {b.currency}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[b.status] || 'bg-gray-100 text-gray-700'}`}>
                      {statusLabel(b.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button className="text-xs text-[#0F2B46] hover:underline font-medium">{dict.view}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Icons ---
function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function CurrencyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ShipIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17l2-1.5L7 17l2-1.5L11 17l2-1.5L15 17l2-1.5L19 17l2-1.5M5 15V8a1 1 0 011-1h4l2 3h6a1 1 0 011 1v4" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}
