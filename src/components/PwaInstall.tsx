'use client';

import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIosBanner, setShowIosBanner] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check if dismissed within last 7 days
  const isDismissed = useCallback(() => {
    if (typeof window === 'undefined') return true;
    const dismissed = localStorage.getItem('alykul-pwa-dismissed');
    if (!dismissed) return false;
    const dismissedAt = parseInt(dismissed, 10);
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - dismissedAt < sevenDays;
  }, []);

  // Check if running as installed PWA
  const isStandalone = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  }, []);

  // Detect iOS
  const isIos = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const ua = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(ua);
  }, []);

  useEffect(() => {
    // Don't show if already installed or dismissed
    if (isStandalone() || isDismissed()) return;

    // Listen for beforeinstallprompt (Chrome, Edge, Samsung)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
      // Slide-up animation delay
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
    };

    window.addEventListener('beforeinstallprompt', handler);

    // iOS detection — no beforeinstallprompt, show manual instructions
    if (isIos() && !isStandalone()) {
      setShowIosBanner(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
    }

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      setShowBanner(false);
      setShowIosBanner(false);
      setDeferredPrompt(null);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isDismissed, isStandalone, isIos]);

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('SW registration failed:', err);
      });
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowBanner(false);
      setShowIosBanner(false);
      localStorage.setItem('alykul-pwa-dismissed', Date.now().toString());
    }, 300);
  };

  // Celebration toast
  if (showCelebration) {
    return (
      <div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[10004] bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce"
        role="alert"
      >
        <span className="text-2xl">&#127881;</span>
        <span className="font-medium">
          Приложение установлено! Теперь доступно на домашнем экране.
        </span>
      </div>
    );
  }

  // iOS instructions banner
  if (showIosBanner) {
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-[10004] bg-[#0F2B46] text-white p-4 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        role="banner"
      >
        <div className="max-w-lg mx-auto flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-semibold text-sm leading-tight mb-1">
                Установите приложение Алыкул
              </p>
              <p className="text-xs text-white/80 leading-snug">
                Нажмите{' '}
                <span className="inline-flex items-center mx-0.5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </span>{' '}
                «Поделиться» &rarr; «На экран &laquo;Домой&raquo;» для быстрого
                бронирования и push-уведомлений
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="shrink-0 p-1 text-white/60 hover:text-white transition-colors"
              aria-label="Закрыть"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard install banner (Chrome, Edge, etc.)
  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[10004] bg-[#0F2B46] text-white p-4 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="banner"
    >
      <div className="max-w-lg mx-auto flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <p className="flex-1 text-sm leading-snug">
            Установите приложение Алыкул для быстрого бронирования и
            push-уведомлений
          </p>
          <button
            onClick={handleDismiss}
            className="shrink-0 p-1 text-white/60 hover:text-white transition-colors"
            aria-label="Закрыть"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleInstall}
            className="flex-1 bg-[#246DC9] hover:bg-[#1d5aa8] text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
          >
            Установить
          </button>
          <button
            onClick={handleDismiss}
            className="text-white/60 hover:text-white text-sm py-2.5 px-3 transition-colors"
          >
            Не сейчас
          </button>
        </div>
      </div>
    </div>
  );
}
