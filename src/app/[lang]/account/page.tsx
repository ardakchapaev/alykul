'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, type Booking } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import LoyaltyCard from '@/components/LoyaltyCard';
import { SkeletonList } from '@/components/Skeleton';

const t = {
  ru: { title: 'Мой кабинет', bookings: 'Мои бронирования', noBookings: 'Нет бронирований', logout: 'Выйти', home: 'Главная', trips: 'Найти рейс', cancel: 'Отменить', cancelled: 'Отменено', confirmed: 'Подтверждено', pending: 'Ожидание', completed: 'Завершено', phone: 'Телефон', points: 'Баллы лояльности', loading: 'Загрузка...', login: 'Войти', gifts: 'Подарки', group: 'Группы', refund: 'Возврат' },
  en: { title: 'My Account', bookings: 'My Bookings', noBookings: 'No bookings', logout: 'Logout', home: 'Home', trips: 'Find Trip', cancel: 'Cancel', cancelled: 'Cancelled', confirmed: 'Confirmed', pending: 'Pending', completed: 'Completed', phone: 'Phone', points: 'Loyalty points', loading: 'Loading...', login: 'Sign In', gifts: 'Gifts', group: 'Groups', refund: 'Refund' },
  ky: { title: 'Менин кабинетим', bookings: 'Менин брондоолорум', noBookings: 'Брондоо жок', logout: 'Чыгуу', home: 'Башкы бет', trips: 'Рейс издөө', cancel: 'Жокко чыгаруу', cancelled: 'Жокко чыгарылды', confirmed: 'Ырасталды', pending: 'Күтүүдө', completed: 'Аяктады', phone: 'Телефон', points: 'Лоялдуулук баллдары', loading: 'Жүктөлүүдө...', login: 'Кирүү', gifts: 'Белектер', group: 'Топтор', refund: 'Кайтаруу' },
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

const statusBorderColors: Record<string, string> = {
  confirmed: 'border-l-green-500',
  completed: 'border-l-green-500',
  checked_in: 'border-l-green-500',
  pending: 'border-l-yellow-500',
  hold: 'border-l-blue-500',
  cancelled: 'border-l-red-500',
  refunded: 'border-l-gray-400',
};

export default function AccountPage() {
  const params = useParams();
  const router = useRouter();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;
  const { user, token, loading: authLoading, logout } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [openActions, setOpenActions] = useState<number | null>(null);

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

  if (authLoading || loading) return <div className="min-h-screen bg-sand px-6 md:px-14 py-8"><SkeletonList count={3} /></div>;

  return (
    <div className="min-h-screen bg-sand">
      {/* Hero header with background and profile overlay */}
      <div
        className="relative bg-navy text-white h-[200px] overflow-hidden"
        style={{
          backgroundImage: 'url(/images/lake-header.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/90" />
        <div className="relative z-10 px-6 md:px-14 pt-6 h-full flex flex-col justify-between pb-6">
          <Link href={`/${lang}`} className="text-foam/70 text-sm hover:text-white transition-colors">&larr; {labels.home}</Link>
          {user && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00897B] to-[#26A69A] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-[#00897B]/30 flex-shrink-0">
                {(user.name || user.phone).charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="font-heading font-bold text-2xl md:text-3xl">{user.name || user.phone}</h1>
                <div className="text-white/60 text-sm">{user.phone}</div>
                <div className="text-white/60 text-sm">{labels.points}: <strong className="text-[#26A69A]">{user.loyalty_points}</strong></div>
              </div>
              <button onClick={() => { logout(); router.push(`/${lang}`); }}
                className="px-4 py-2 border border-white/20 text-white/70 rounded-xl text-sm hover:bg-white/10 hover:text-white transition-all">
                {labels.logout}
              </button>
            </div>
          )}
          {!user && (
            <h1 className="font-heading font-bold text-3xl uppercase">{labels.title}</h1>
          )}
        </div>
      </div>

      <div className="px-6 md:px-14 py-8 max-w-4xl mx-auto">
        {/* Loyalty Card */}
        {user && (
          <div className="mb-8 -mt-4">
            <LoyaltyCard
              points={user.loyalty_points}
              level={user.loyalty_points >= 15000 ? 'vip' : user.loyalty_points >= 5000 ? 'gold' : 'standard'}
              name={user.name}
              phone={user.phone}
            />
          </div>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <Link href={`/${lang}/trips`} className="flex flex-col items-center gap-2 p-5 bg-white rounded-xl border border-gray-100 hover:border-ocean/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <span className="text-3xl">&#9978;</span>
            <span className="text-sm font-semibold text-center">{labels.trips}</span>
          </Link>
          <Link href={`/${lang}/gifts`} className="flex flex-col items-center gap-2 p-5 bg-white rounded-xl border border-gray-100 hover:border-ocean/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <span className="text-3xl">&#127873;</span>
            <span className="text-sm font-semibold text-center">{labels.gifts}</span>
          </Link>
          <Link href={`/${lang}/group-booking`} className="flex flex-col items-center gap-2 p-5 bg-white rounded-xl border border-gray-100 hover:border-ocean/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <span className="text-3xl">&#128101;</span>
            <span className="text-sm font-semibold text-center">{labels.group}</span>
          </Link>
          <Link href={`/${lang}/account/refund`} className="flex flex-col items-center gap-2 p-5 bg-white rounded-xl border border-gray-100 hover:border-ocean/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <span className="text-3xl">&#8617;</span>
            <span className="text-sm font-semibold text-center">{labels.refund}</span>
          </Link>
        </div>

        {/* Bookings */}
        <h2 className="font-heading font-bold text-2xl uppercase mb-6">{labels.bookings}</h2>

        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-ocean/10 to-[#26A69A]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-ocean/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-muted text-lg mb-2">
              {lang === 'ru' ? 'У вас пока нет бронирований' : lang === 'ky' ? 'Сизде азырынча брондоо жок' : 'No bookings yet'}
            </p>
            <p className="text-muted/60 text-sm mb-6">
              {lang === 'ru' ? 'Забронируйте ваш первый рейс по озеру' : lang === 'ky' ? 'Биринчи рейсиңизди брондоңуз' : 'Book your first lake trip'}
            </p>
            <Link href={`/${lang}/trips`}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#00897B] to-[#26A69A] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#00897B]/30 transition-all duration-200">
              <span>&#9978;</span> {labels.trips}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b.id} className={`bg-white rounded-2xl p-5 border border-gray-100 border-l-4 ${statusBorderColors[b.status] || 'border-l-gray-300'} shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                <div className="flex-1">
                  <div className="text-sm text-muted">#{b.id} &middot; {new Date(b.created_at).toLocaleDateString()}</div>
                  <div className="font-bold text-lg mt-1">{b.num_passengers} {lang === 'ru' ? 'гостей' : lang === 'ky' ? 'конок' : 'guests'}</div>
                  <div className="font-mono font-bold text-xl text-ocean mt-1">{b.total_amount.toLocaleString()} {b.currency}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-lg text-sm font-bold ${statusColors[b.status] || 'bg-gray-100'}`}>
                    {statusLabel(b.status)}
                  </span>
                  {/* Actions dropdown */}
                  {(['pending', 'hold', 'confirmed'].includes(b.status) || b.qr_token || ['confirmed', 'hold'].includes(b.status)) && (
                    <div className="relative">
                      <button
                        onClick={() => setOpenActions(openActions === b.id ? null : b.id)}
                        className="p-3 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                        aria-label="Actions"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      {openActions === b.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl py-1 min-w-[160px] z-20">
                          {b.qr_token && (
                            <Link href={`/${lang}/booking-confirmed?id=${b.id}&qr=${b.qr_token}`}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-ocean hover:bg-ocean/5 transition-colors"
                              onClick={() => setOpenActions(null)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 12a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM11 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zm2 2V5h1v1h-1z" clipRule="evenodd" /></svg>
                              QR-{lang === 'ru' ? 'код' : lang === 'ky' ? 'код' : 'code'}
                            </Link>
                          )}
                          {['confirmed', 'hold'].includes(b.status) && (
                            <Link href={`/${lang}/account/refund?booking=${b.id}`}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                              onClick={() => setOpenActions(null)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              {labels.refund}
                            </Link>
                          )}
                          {['pending', 'hold', 'confirmed'].includes(b.status) && (
                            <button onClick={() => { handleCancel(b.id); setOpenActions(null); }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                              {labels.cancel}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
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
