'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, type Booking } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

const t = {
  ru: { title: 'Мой кабинет', bookings: 'Мои бронирования', noBookings: 'Нет бронирований', logout: 'Выйти', home: 'Главная', trips: 'Найти рейс', cancel: 'Отменить', cancelled: 'Отменено', confirmed: 'Подтверждено', pending: 'Ожидание', completed: 'Завершено', phone: 'Телефон', points: 'Баллы лояльности', loading: 'Загрузка...', login: 'Войти' },
  en: { title: 'My Account', bookings: 'My Bookings', noBookings: 'No bookings', logout: 'Logout', home: 'Home', trips: 'Find Trip', cancel: 'Cancel', cancelled: 'Cancelled', confirmed: 'Confirmed', pending: 'Pending', completed: 'Completed', phone: 'Phone', points: 'Loyalty points', loading: 'Loading...', login: 'Sign In' },
  ky: { title: 'Менин кабинетим', bookings: 'Менин брондоолорум', noBookings: 'Брондоо жок', logout: 'Чыгуу', home: 'Башкы бет', trips: 'Рейс издөө', cancel: 'Жокко чыгаруу', cancelled: 'Жокко чыгарылды', confirmed: 'Ырасталды', pending: 'Күтүүдө', completed: 'Аяктады', phone: 'Телефон', points: 'Лоялдуулук баллдары', loading: 'Жүктөлүүдө...', login: 'Кирүү' },
};

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  hold: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-600',
  completed: 'bg-green-100 text-green-800',
  checked_in: 'bg-green-100 text-green-800',
};

export default function AccountPage() {
  const params = useParams();
  const router = useRouter();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;
  const { user, token, loading: authLoading, logout } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !token) {
      router.push(`/${lang}/auth?redirect=/${lang}/account`);
      return;
    }
    api.getBookings(token).then(setBookings).catch(console.error).finally(() => setLoading(false));
  }, [user, token, authLoading, lang, router]);

  const handleCancel = async (id: number) => {
    if (!token) return;
    if (!confirm(lang === 'ru' ? 'Отменить бронирование?' : 'Cancel booking?')) return;
    try {
      await api.cancelBooking(token, id);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    } catch (e: unknown) {
      alert((e as Error).message);
    }
  };

  const statusLabel = (s: string) => labels[s as keyof typeof labels] || s;

  if (authLoading || loading) return <div className="min-h-screen flex items-center justify-center text-muted">{labels.loading}</div>;

  return (
    <div className="min-h-screen bg-sand">
      <div className="bg-navy text-white px-6 md:px-14 py-8">
        <Link href={`/${lang}`} className="text-foam/70 text-sm hover:text-white">&larr; {labels.home}</Link>
        <h1 className="font-heading font-bold text-3xl uppercase mt-4">{labels.title}</h1>
      </div>

      <div className="px-6 md:px-14 py-8 max-w-4xl mx-auto">
        {/* Profile */}
        {user && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8 flex justify-between items-center">
            <div>
              <div className="font-bold text-xl">{user.name || user.phone}</div>
              <div className="text-muted text-sm">{labels.phone}: {user.phone}</div>
              <div className="text-muted text-sm">{labels.points}: <strong className="text-ocean">{user.loyalty_points}</strong></div>
            </div>
            <button onClick={() => { logout(); router.push(`/${lang}`); }}
              className="px-4 py-2 border border-red-200 text-red-500 rounded-xl text-sm hover:bg-red-50">
              {labels.logout}
            </button>
          </div>
        )}

        {/* Bookings */}
        <h2 className="font-heading font-bold text-2xl uppercase mb-6">{labels.bookings}</h2>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted mb-4">{labels.noBookings}</p>
            <Link href={`/${lang}/trips`}
              className="inline-block px-6 py-3 bg-ocean text-white rounded-xl font-semibold hover:bg-ocean-dark">
              {labels.trips}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-muted">#{b.id} · {new Date(b.created_at).toLocaleDateString()}</div>
                  <div className="font-bold text-lg">{b.num_passengers} {lang === 'ru' ? 'гостей' : lang === 'ky' ? 'конок' : 'guests'}</div>
                  <div className="font-bold text-ocean">{b.total_amount.toLocaleString()} {b.currency}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${statusColors[b.status] || 'bg-gray-100'}`}>
                    {statusLabel(b.status)}
                  </span>
                  {['pending', 'hold', 'confirmed'].includes(b.status) && (
                    <button onClick={() => handleCancel(b.id)}
                      className="px-3 py-1 border border-red-200 text-red-500 rounded-lg text-sm hover:bg-red-50">
                      {labels.cancel}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
