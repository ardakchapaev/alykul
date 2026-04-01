'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

// --- i18n ---
const t = {
  ru: {
    title: 'Управление рейсами',
    subtitle: 'Расписание и управление рейсами',
    addTrip: 'Добавить рейс',
    id: 'ID',
    route: 'Маршрут',
    vessel: 'Судно',
    date: 'Дата',
    time: 'Время',
    capacity: 'Мест',
    booked: 'Забронировано',
    available: 'Свободно',
    price: 'Цена',
    status: 'Статус',
    actions: 'Действия',
    edit: 'Изменить',
    delete: 'Удалить',
    save: 'Сохранить',
    cancel: 'Отмена',
    active: 'Активный',
    draft: 'Черновик',
    full: 'Заполнен',
    completed: 'Завершён',
    filterByDate: 'По дате',
    filterByVessel: 'По судну',
    filterByRoute: 'По маршруту',
    all: 'Все',
    from: 'С',
    to: 'До',
    newTrip: 'Новый рейс',
    selectRoute: 'Выберите маршрут',
    selectVessel: 'Выберите судно',
    selectStatus: 'Выберите статус',
  },
  en: {
    title: 'Trip Management',
    subtitle: 'Schedule and manage trips',
    addTrip: 'Add Trip',
    id: 'ID',
    route: 'Route',
    vessel: 'Vessel',
    date: 'Date',
    time: 'Time',
    capacity: 'Capacity',
    booked: 'Booked',
    available: 'Available',
    price: 'Price',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    active: 'Active',
    draft: 'Draft',
    full: 'Full',
    completed: 'Completed',
    filterByDate: 'By date',
    filterByVessel: 'By vessel',
    filterByRoute: 'By route',
    all: 'All',
    from: 'From',
    to: 'To',
    newTrip: 'New Trip',
    selectRoute: 'Select route',
    selectVessel: 'Select vessel',
    selectStatus: 'Select status',
  },
  ky: {
    title: 'Каттамдарды башкаруу',
    subtitle: 'Графикти башкаруу',
    addTrip: 'Каттам кошуу',
    id: 'ID',
    route: 'Маршрут',
    vessel: 'Кеме',
    date: 'Күнү',
    time: 'Убакыт',
    capacity: 'Сыйымдуулук',
    booked: 'Брондолгон',
    available: 'Бош',
    price: 'Баасы',
    status: 'Статус',
    actions: 'Аракеттер',
    edit: 'Өзгөртүү',
    delete: 'Жок кылуу',
    save: 'Сактоо',
    cancel: 'Жокко чыгаруу',
    active: 'Активдүү',
    draft: 'Долбоор',
    full: 'Толук',
    completed: 'Аякталды',
    filterByDate: 'Күнү боюнча',
    filterByVessel: 'Кеме боюнча',
    filterByRoute: 'Маршрут боюнча',
    all: 'Баары',
    from: 'Баштап',
    to: 'Чейин',
    newTrip: 'Жаңы каттам',
    selectRoute: 'Маршрут тандаңыз',
    selectVessel: 'Кеме тандаңыз',
    selectStatus: 'Статус тандаңыз',
  },
} as const;

type Lang = keyof typeof t;

// --- Mock data ---
const routes = [
  'Закатный круиз (Чолпон-Ата)',
  'Утренний бриз (Бостери)',
  'Дневная прогулка (Чолпон-Ата)',
  'Приватный чартер',
  'Рыбалка на озере',
  'Тамга — Каджи-Сай',
];

const vessels = ['Алыкул', 'Иссык-Куль', 'Нарын'];

// TODO: Replace with API call
const initialTrips = [
  { id: 1, route: 'Закатный круиз (Чолпон-Ата)', vessel: 'Алыкул', date: '2026-07-15', time: '18:00', capacity: 200, booked: 145, price: 1400, status: 'active' },
  { id: 2, route: 'Утренний бриз (Бостери)', vessel: 'Иссык-Куль', date: '2026-07-15', time: '07:00', capacity: 150, booked: 98, price: 1200, status: 'active' },
  { id: 3, route: 'Приватный чартер', vessel: 'Нарын', date: '2026-07-16', time: '10:00', capacity: 20, booked: 20, price: 7000, status: 'full' },
  { id: 4, route: 'Дневная прогулка (Чолпон-Ата)', vessel: 'Алыкул', date: '2026-07-16', time: '12:00', capacity: 200, booked: 67, price: 900, status: 'active' },
  { id: 5, route: 'Рыбалка на озере', vessel: 'Нарын', date: '2026-07-17', time: '05:00', capacity: 20, booked: 15, price: 3500, status: 'active' },
  { id: 6, route: 'Закатный круиз (Чолпон-Ата)', vessel: 'Иссык-Куль', date: '2026-07-17', time: '18:00', capacity: 150, booked: 150, price: 1400, status: 'full' },
  { id: 7, route: 'Тамга — Каджи-Сай', vessel: 'Алыкул', date: '2026-07-18', time: '09:00', capacity: 200, booked: 34, price: 1800, status: 'active' },
  { id: 8, route: 'Утренний бриз (Бостери)', vessel: 'Иссык-Куль', date: '2026-07-18', time: '07:00', capacity: 150, booked: 0, price: 1200, status: 'draft' },
  { id: 9, route: 'Приватный чартер', vessel: 'Нарын', date: '2026-07-19', time: '14:00', capacity: 20, booked: 8, price: 7000, status: 'active' },
  { id: 10, route: 'Закатный круиз (Чолпон-Ата)', vessel: 'Алыкул', date: '2026-07-19', time: '18:00', capacity: 200, booked: 200, price: 1400, status: 'full' },
  { id: 11, route: 'Дневная прогулка (Чолпон-Ата)', vessel: 'Иссык-Куль', date: '2026-07-20', time: '12:00', capacity: 150, booked: 112, price: 900, status: 'active' },
  { id: 12, route: 'Рыбалка на озере', vessel: 'Нарын', date: '2026-07-20', time: '05:00', capacity: 20, booked: 20, price: 3500, status: 'completed' },
];

type TripRow = typeof initialTrips[number];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
  full: 'bg-blue-100 text-blue-700',
  completed: 'bg-purple-100 text-purple-700',
};

function formatNumber(n: number): string {
  return n.toLocaleString('ru-RU');
}

export default function AdminTrips() {
  const params = useParams();
  const lang = (params?.lang as Lang) || 'ru';
  const dict = t[lang] || t.ru;

  const [trips, setTrips] = useState<TripRow[]>(initialTrips);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Filters
  const [filterVessel, setFilterVessel] = useState('');
  const [filterRoute, setFilterRoute] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  // Form state
  const emptyForm = { route: '', vessel: '', date: '', time: '', price: 0, capacity: 0, status: 'active' };
  const [form, setForm] = useState(emptyForm);

  const statusLabel = (s: string) => {
    const map: Record<string, string> = { active: dict.active, draft: dict.draft, full: dict.full, completed: dict.completed };
    return map[s] || s;
  };

  // Filtered trips
  const filtered = trips.filter(trip => {
    if (filterVessel && trip.vessel !== filterVessel) return false;
    if (filterRoute && trip.route !== filterRoute) return false;
    if (filterDateFrom && trip.date < filterDateFrom) return false;
    if (filterDateTo && trip.date > filterDateTo) return false;
    return true;
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (trip: TripRow) => {
    setEditingId(trip.id);
    setForm({ route: trip.route, vessel: trip.vessel, date: trip.date, time: trip.time, price: trip.price, capacity: trip.capacity, status: trip.status });
    setShowForm(true);
  };

  const handleSave = () => {
    // TODO: Replace with API call
    if (editingId !== null) {
      setTrips(prev => prev.map(t => t.id === editingId ? { ...t, ...form, booked: t.booked } : t));
    } else {
      const newId = Math.max(...trips.map(t => t.id)) + 1;
      setTrips(prev => [...prev, { id: newId, ...form, booked: 0 }]);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    // TODO: Replace with API call
    setTrips(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{dict.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{dict.subtitle}</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F2B46] text-white text-sm font-medium rounded-lg hover:bg-[#1a3d5c] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          {dict.addTrip}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{dict.filterByVessel}</label>
            <select
              value={filterVessel}
              onChange={e => setFilterVessel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
            >
              <option value="">{dict.all}</option>
              {vessels.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{dict.filterByRoute}</label>
            <select
              value={filterRoute}
              onChange={e => setFilterRoute(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
            >
              <option value="">{dict.all}</option>
              {routes.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{dict.from}</label>
            <input
              type="date"
              value={filterDateFrom}
              onChange={e => setFilterDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{dict.to}</label>
            <input
              type="date"
              value={filterDateTo}
              onChange={e => setFilterDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
            />
          </div>
        </div>
      </div>

      {/* Inline form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{editingId ? dict.edit : dict.newTrip}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{dict.route}</label>
              <select
                value={form.route}
                onChange={e => setForm(f => ({ ...f, route: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
              >
                <option value="">{dict.selectRoute}</option>
                {routes.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{dict.vessel}</label>
              <select
                value={form.vessel}
                onChange={e => setForm(f => ({ ...f, vessel: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
              >
                <option value="">{dict.selectVessel}</option>
                {vessels.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{dict.date}</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{dict.time}</label>
              <input
                type="time"
                value={form.time}
                onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{dict.price} (KGS)</label>
              <input
                type="number"
                value={form.price || ''}
                onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{dict.capacity}</label>
              <input
                type="number"
                value={form.capacity || ''}
                onChange={e => setForm(f => ({ ...f, capacity: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{dict.status}</label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
              >
                <option value="active">{dict.active}</option>
                <option value="draft">{dict.draft}</option>
                <option value="full">{dict.full}</option>
                <option value="completed">{dict.completed}</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#0F2B46] text-white text-sm font-medium rounded-lg hover:bg-[#1a3d5c] transition-colors"
              >
                {dict.save}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                {dict.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50">
                <th className="px-4 py-3">{dict.id}</th>
                <th className="px-4 py-3">{dict.route}</th>
                <th className="px-4 py-3">{dict.vessel}</th>
                <th className="px-4 py-3">{dict.date}</th>
                <th className="px-4 py-3">{dict.time}</th>
                <th className="px-4 py-3 text-center">{dict.capacity}</th>
                <th className="px-4 py-3 text-center">{dict.booked}</th>
                <th className="px-4 py-3 text-center">{dict.available}</th>
                <th className="px-4 py-3 text-right">{dict.price}</th>
                <th className="px-4 py-3">{dict.status}</th>
                <th className="px-4 py-3">{dict.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((trip, i) => {
                const available = trip.capacity - trip.booked;
                const fillPercent = Math.round((trip.booked / trip.capacity) * 100);
                return (
                  <tr key={trip.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                    <td className="px-4 py-3 font-medium text-gray-900">#{trip.id}</td>
                    <td className="px-4 py-3 text-gray-700 max-w-[200px] truncate">{trip.route}</td>
                    <td className="px-4 py-3 text-gray-700">{trip.vessel}</td>
                    <td className="px-4 py-3 text-gray-500">{trip.date}</td>
                    <td className="px-4 py-3 text-gray-500">{trip.time}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{trip.capacity}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-gray-900 font-medium">{trip.booked}</span>
                      <span className="text-gray-400 text-xs ml-1">({fillPercent}%)</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={available === 0 ? 'text-red-600 font-medium' : 'text-gray-700'}>{available}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">{formatNumber(trip.price)} KGS</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[trip.status] || 'bg-gray-100 text-gray-600'}`}>
                        {statusLabel(trip.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(trip)}
                          className="text-xs text-[#0F2B46] hover:underline font-medium"
                        >
                          {dict.edit}
                        </button>
                        <button
                          onClick={() => handleDelete(trip.id)}
                          className="text-xs text-red-600 hover:underline font-medium"
                        >
                          {dict.delete}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-gray-400 text-sm">
                    No trips found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
