'use client';

import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Check overlay container first (theme pages)
      const overlay = document.querySelector('[class*="fixed inset-0 z-[9999]"]') as HTMLElement;
      if (overlay) {
        const scrollTop = overlay.scrollTop;
        const scrollHeight = overlay.scrollHeight - overlay.clientHeight;
        setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
        return;
      }
      // Regular page scroll
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    const overlay = document.querySelector('[class*="fixed inset-0 z-[9999]"]');
    if (overlay) overlay.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      if (overlay) overlay.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[10006] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-ocean to-sky transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
