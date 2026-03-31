'use client';

import { useTheme, THEMES } from '@/lib/theme-context';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-0.5 bg-white/10 rounded-full p-0.5">
      {THEMES.map(t => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all ${
            theme === t
              ? 'bg-white text-navy shadow-sm'
              : 'text-white/50 hover:text-white'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
