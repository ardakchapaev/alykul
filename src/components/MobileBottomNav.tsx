'use client';

import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const ShipIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 0V9l3-3m-3 3L9 6m3-.75a.75.75 0 0 1 .75.75v3.378a3 3 0 0 1-.879 2.121L9.75 14.25H6.517a3 3 0 0 0-2.121.879l-1.146 1.146M12 5.25a.75.75 0 0 0-.75.75v3.378a3 3 0 0 0 .879 2.121l2.121 2.121h3.233a3 3 0 0 1 2.121.879l1.146 1.146M3.75 21l.879-.879M20.25 21l-.879-.879" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
  </svg>
);

const BlogIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

export default function MobileBottomNav() {
  const pathname = usePathname();
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';

  const items = [
    { href: `/${lang}`, label: lang === 'ru' ? 'Главная' : lang === 'ky' ? 'Башкы' : 'Home', icon: <HomeIcon />, match: /^\/(ru|en|ky)\/?$/, isCta: false },
    { href: `/${lang}/trips`, label: lang === 'ru' ? 'Рейсы' : lang === 'ky' ? 'Рейстер' : 'Trips', icon: <ShipIcon />, match: /\/trips/, isCta: false },
    { href: `/${lang}/trips`, label: lang === 'ru' ? 'Брон.' : lang === 'ky' ? 'Брон.' : 'Book', icon: <CalendarIcon />, match: /\/checkout|\/payment/, isCta: true },
    { href: `/${lang}/blog`, label: lang === 'ru' ? 'Блог' : 'Blog', icon: <BlogIcon />, match: /\/blog/, isCta: false },
    { href: `/${lang}/account`, label: lang === 'ru' ? 'Профиль' : lang === 'ky' ? 'Профиль' : 'Profile', icon: <UserIcon />, match: /\/account|\/auth/, isCta: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[10001] bg-white/95 backdrop-blur-xl border-t border-gray-200 md:hidden safe-area-pb">
      <div className="flex items-stretch justify-around h-16">
        {items.map(item => {
          const active = item.match.test(pathname);
          return (
            <Link key={item.label} href={item.href}
              className={`flex flex-col items-center justify-center flex-1 gap-0.5 transition-colors ${
                item.isCta
                  ? 'relative -mt-4'
                  : active ? 'text-[#00897B]' : 'text-gray-400'
              }`}>
              {item.isCta ? (
                <div className="w-12 h-12 rounded-full bg-[#00897B] text-white flex items-center justify-center shadow-lg shadow-[#00897B]/30 mb-0.5">
                  {item.icon}
                </div>
              ) : (
                <span>{item.icon}</span>
              )}
              <span className={`text-[10px] font-medium ${item.isCta ? 'text-[#00897B]' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
