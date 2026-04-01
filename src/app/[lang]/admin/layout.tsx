'use client';

import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect, type ReactNode } from 'react';

// --- i18n ---
const t = {
  ru: {
    brand: 'Alykul Admin',
    dashboard: 'Панель управления',
    trips: 'Рейсы',
    bookings: 'Бронирования',
    backToSite: 'Вернуться на сайт',
    logout: 'Выйти',
    accessDenied: 'Доступ запрещён',
    accessDeniedDesc: 'У вас нет прав администратора.',
    loading: 'Загрузка...',
    loginRequired: 'Необходимо авторизоваться',
    loginRequiredDesc: 'Пожалуйста, войдите в систему.',
    goToLogin: 'Войти',
  },
  en: {
    brand: 'Alykul Admin',
    dashboard: 'Dashboard',
    trips: 'Trips',
    bookings: 'Bookings',
    backToSite: 'Back to site',
    logout: 'Log out',
    accessDenied: 'Access Denied',
    accessDeniedDesc: 'You do not have admin privileges.',
    loading: 'Loading...',
    loginRequired: 'Login Required',
    loginRequiredDesc: 'Please log in to continue.',
    goToLogin: 'Log in',
  },
  ky: {
    brand: 'Alykul Admin',
    dashboard: 'Башкаруу панели',
    trips: 'Каттамдар',
    bookings: 'Брондоолор',
    backToSite: 'Сайтка кайтуу',
    logout: 'Чыгуу',
    accessDenied: 'Кирууге тыюу салынган',
    accessDeniedDesc: 'Сизде администратор укуктары жок.',
    loading: 'Жүктөлүүдө...',
    loginRequired: 'Авторизация керек',
    loginRequiredDesc: 'Системага кириңиз.',
    goToLogin: 'Кирүү',
  },
} as const;

type Lang = keyof typeof t;

const navItems = [
  { href: '', icon: DashboardIcon, labelKey: 'dashboard' as const },
  { href: '/trips', icon: TripIcon, labelKey: 'trips' as const },
  { href: '/bookings', icon: BookingIcon, labelKey: 'bookings' as const },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading, logout } = useAuth();
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as Lang) || 'ru';
  const dict = t[lang] || t.ru;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // --- Loading state ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F9FA]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#0F2B46] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">{dict.loading}</p>
        </div>
      </div>
    );
  }

  // --- Not logged in ---
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F9FA]">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-sm text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m5-7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{dict.loginRequired}</h2>
          <p className="text-sm text-gray-500 mb-4">{dict.loginRequiredDesc}</p>
          <Link href={`/${lang}/auth`} className="inline-block px-4 py-2 bg-[#0F2B46] text-white rounded-lg text-sm hover:bg-[#1a3d5c] transition-colors">
            {dict.goToLogin}
          </Link>
        </div>
      </div>
    );
  }

  // --- Access denied (not admin) ---
  if (user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F9FA]">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-sm text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" /></svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{dict.accessDenied}</h2>
          <p className="text-sm text-gray-500 mb-4">{dict.accessDeniedDesc}</p>
          <Link href={`/${lang}`} className="inline-block px-4 py-2 bg-[#0F2B46] text-white rounded-lg text-sm hover:bg-[#1a3d5c] transition-colors">
            {dict.backToSite}
          </Link>
        </div>
      </div>
    );
  }

  const basePath = `/${lang}/admin`;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-60 bg-[#0F2B46] text-white flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm font-bold">A</div>
          <span className="font-semibold text-sm tracking-wide">{dict.brand}</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(item => {
            const href = `${basePath}${item.href}`;
            const isActive = pathname === href || (item.href !== '' && pathname?.startsWith(href));
            return (
              <Link
                key={item.href}
                href={href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                  ${isActive ? 'bg-white/15 text-white font-medium' : 'text-white/70 hover:bg-white/10 hover:text-white'}
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {dict[item.labelKey]}
              </Link>
            );
          })}
        </nav>

        {/* User info + actions */}
        <div className="border-t border-white/10 p-4 space-y-3">
          <Link href={`/${lang}`} className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {dict.backToSite}
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium">
              {(user.name || user.phone || 'A').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user.name || user.phone}</p>
              <p className="text-[11px] text-white/50">{user.role}</p>
            </div>
            <button onClick={logout} title={dict.logout} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" /></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <span className="text-sm font-semibold text-[#0F2B46]">{dict.brand}</span>
          <div className="w-9" /> {/* spacer */}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// --- Icons ---
function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2" />
    </svg>
  );
}

function TripIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function BookingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}
