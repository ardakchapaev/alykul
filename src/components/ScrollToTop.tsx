'use client';
import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Also listen to overlay containers for theme pages
    const overlay = document.querySelector('[class*="fixed inset-0 z-[9999]"]');
    if (overlay) {
      const onOverlayScroll = () => setShow((overlay as HTMLElement).scrollTop > 500);
      overlay.addEventListener('scroll', onOverlayScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScroll);
        overlay.removeEventListener('scroll', onOverlayScroll);
      };
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const overlay = document.querySelector('[class*="fixed inset-0 z-[9999]"]');
    if (overlay) overlay.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button onClick={scrollUp}
      className="fixed bottom-20 right-6 z-[10002] w-11 h-11 rounded-full bg-navy/80 backdrop-blur text-white shadow-lg hover:bg-navy transition-all flex items-center justify-center"
      aria-label="Scroll to top">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
