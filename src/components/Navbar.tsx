'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#routes', label: dict.routes },
    { href: '#schedule', label: dict.schedule },
    { href: '#fleet', label: dict.fleet },
    { href: '#about', label: dict.about },
    { href: '#reviews', label: dict.reviews },
  ];

  return (
    <nav
      className={`w-full z-50 flex items-center justify-between px-6 md:px-20 lg:px-32 py-5 transition-all duration-500 ${
        scrolled
          ? 'fixed top-0 bg-navy/90 backdrop-blur-2xl shadow-2xl shadow-navy/20'
          : 'absolute top-0 bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link href={`/${lang}`} className="flex items-center gap-2.5 text-white font-heading font-bold text-lg uppercase tracking-wider">
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <defs>
            <linearGradient id="navLogo" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0%" stopColor="#3a8ef7" />
              <stop offset="100%" stopColor="#1A6FD4" />
            </linearGradient>
          </defs>
          <path d="M20 4C20 4 8 18 8 24C8 28 12 32 20 32C28 32 32 28 32 24C32 18 20 4 20 4Z" fill="url(#navLogo)" opacity="0.2" />
          <path d="M12 26Q16 20 20 8Q24 20 28 26" stroke="url(#navLogo)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        Алыкул
      </Link>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-8">
        {links.map(link => (
          <a key={link.href} href={link.href}
            className="text-white/40 text-[13px] font-medium uppercase tracking-widest hover:text-white transition-colors duration-300">
            {link.label}
          </a>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher current={lang} />
        <Link href={`/${lang}/trips`}
          className="hidden md:inline-flex px-5 py-2 bg-ocean text-white rounded-full text-sm font-semibold hover:bg-ocean-dark transition-colors">
          {dict.booking}
        </Link>

        {/* Burger */}
        <button className="lg:hidden flex flex-col gap-1.5 w-6" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`h-[2px] w-full bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`h-[2px] w-full bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-[2px] w-full bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-navy/95 backdrop-blur-2xl z-[200] flex flex-col items-center justify-center gap-8 lg:hidden">
          <button className="absolute top-6 right-6 text-white/40 hover:text-white text-2xl" onClick={() => setMenuOpen(false)}>&times;</button>
          {links.map(link => (
            <a key={link.href} href={link.href}
              className="text-white/60 text-xl font-heading font-bold uppercase tracking-wider hover:text-white"
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <Link href={`/${lang}/trips`}
            className="mt-4 px-8 py-3 bg-ocean text-white rounded-full font-bold hover:bg-ocean-dark"
            onClick={() => setMenuOpen(false)}>
            {dict.booking}
          </Link>
          <LanguageSwitcher current={lang} />
        </div>
      )}
    </nav>
  );
}
