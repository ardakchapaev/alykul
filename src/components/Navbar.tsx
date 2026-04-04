'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { useAuth } from '@/lib/auth-context';
import CurrencySelector from './CurrencySelector';

type NavDict = {
  routes: string;
  schedule: string;
  fleet: string;
  booking: string;
  about: string;
  reviews: string;
  contacts: string;
};

export default function Navbar({ dict, lang }: { dict: NavDict; lang: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#routes', label: dict.routes },
    { href: '#schedule', label: dict.schedule },
    { href: '#fleet', label: dict.fleet },
    { href: '#booking', label: dict.booking },
    { href: '#about', label: dict.about },
    { href: '#reviews', label: dict.reviews },
    { href: '#contacts', label: dict.contacts },
  ];

  return (
    <nav
      className={`w-full z-50 flex items-center justify-between px-6 md:px-14 py-4 transition-all duration-300 ${
        scrolled
          ? 'fixed top-8 bg-navy/[0.98] backdrop-blur-xl shadow-lg'
          : 'absolute bottom-0 bg-navy/[0.85] backdrop-blur-md'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 text-white font-heading font-bold text-xl uppercase tracking-wide">
        <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0%" stopColor="#3a8ef7" />
              <stop offset="100%" stopColor="#246DC9" />
            </linearGradient>
          </defs>
          <path d="M20 4C20 4 8 18 8 24C8 28 12 32 20 32C28 32 32 28 32 24C32 18 20 4 20 4Z" fill="url(#logoGrad)" opacity="0.15" />
          <path d="M12 26Q16 20 20 8Q24 20 28 26" stroke="url(#logoGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M10 28Q15 24 20 26Q25 28 30 24" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
        Алыкул
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="text-foam text-sm font-medium uppercase tracking-wider hover:text-ocean transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Auth + Language switcher + burger */}
      <div className="flex items-center gap-3">
        {user ? (
          <Link href={`/${lang}/account`}
            className="flex items-center gap-1.5 text-foam text-sm font-medium hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="hidden sm:inline">{user.name || user.phone.slice(-4)}</span>
          </Link>
        ) : (
          <Link href={`/${lang}/auth`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-ocean text-white rounded-lg text-sm font-medium hover:bg-ocean-dark transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            {lang === 'ru' ? 'Войти' : lang === 'ky' ? 'Кирүү' : 'Sign In'}
          </Link>
        )}
        <CurrencySelector />
        <ThemeSwitcher />
        <LanguageSwitcher current={lang} />
        <button
          className="md:hidden flex flex-col gap-1.5 w-7"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`h-0.5 w-full bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`h-0.5 w-full bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-full bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-navy/[0.98] z-[200] flex flex-col items-center justify-center gap-6 md:hidden">
          <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setMenuOpen(false)}>&times;</button>
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-foam text-lg font-medium uppercase tracking-wider"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <LanguageSwitcher current={lang} />
          {user ? (
            <Link href={`/${lang}/account`} onClick={() => setMenuOpen(false)}
              className="mt-4 px-6 py-2 border border-foam/30 text-foam rounded-xl text-sm font-medium">
              {lang === 'ru' ? 'Мой кабинет' : lang === 'ky' ? 'Менин кабинетим' : 'My Account'}
            </Link>
          ) : (
            <Link href={`/${lang}/auth`} onClick={() => setMenuOpen(false)}
              className="mt-4 px-6 py-2 bg-ocean text-white rounded-xl text-sm font-medium">
              {lang === 'ru' ? 'Войти' : lang === 'ky' ? 'Кирүү' : 'Sign In'}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
