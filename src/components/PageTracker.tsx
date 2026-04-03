'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1';

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Generate session ID
    let sessionId = sessionStorage.getItem('alykul-session');
    if (!sessionId) {
      sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem('alykul-session', sessionId);
    }

    // Track pageview
    fetch(`${API_URL}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pathname,
        referrer: document.referrer,
        language: navigator.language,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        session_id: sessionId,
      }),
    }).catch(() => {}); // Silent fail
  }, [pathname]);

  return null;
}
