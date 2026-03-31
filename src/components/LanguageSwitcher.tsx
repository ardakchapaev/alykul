'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const langs = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'ky', label: 'KY' },
] as const;

export default function LanguageSwitcher({ current }: { current: string }) {
  const pathname = usePathname();

  function switchedPath(locale: string) {
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  }

  return (
    <div className="flex gap-1">
      {langs.map(({ code, label }) => (
        <Link
          key={code}
          href={switchedPath(code)}
          className={`px-2 py-1 rounded text-xs font-semibold uppercase transition-colors ${
            current === code
              ? 'bg-ocean text-white'
              : 'text-foam/70 hover:text-white'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
