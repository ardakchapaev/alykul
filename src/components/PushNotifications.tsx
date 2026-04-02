'use client';

import { useState, useEffect, useCallback } from 'react';

// VAPID Public Key (Private: 3q2ChpNqkaKmttcY-3US5mdXKQnmDW1l7-Y-Ltsz88s — keep in backend env)
const VAPID_PUBLIC_KEY =
  'BAKe4jP-7XybSnJyoS-7q1ceTJGGn9IaiqLccOgmSnVrK_ZD8w9nuUCIlb9Kga5eC9H7ZIuN7JvHy9kHkc7QQZ8';

/** Convert a URL-safe base64 string to a Uint8Array for applicationServerKey */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// ─── Hook: usePushNotifications ──────────────────────────────────────────────

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    const supported =
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window;

    setIsSupported(supported);

    if (supported) {
      // Check existing subscription
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((sub) => {
          if (sub) {
            setIsSubscribed(true);
            setSubscription(sub);
          }
        });
      });
    }
  }, []);

  const subscribe = useCallback(async (): Promise<PushSubscription | null> => {
    if (!isSupported) return null;

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return null;

      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
      });

      setIsSubscribed(true);
      setSubscription(sub);

      // TODO: Send subscription to backend
      // await fetch('/api/push/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(sub),
      // });

      return sub;
    } catch (err) {
      console.error('Push subscription failed:', err);
      return null;
    }
  }, [isSupported]);

  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!subscription) return false;

    try {
      const success = await subscription.unsubscribe();
      if (success) {
        setIsSubscribed(false);
        setSubscription(null);

        // TODO: Remove subscription from backend
        // await fetch('/api/push/unsubscribe', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ endpoint: subscription.endpoint }),
        // });
      }
      return success;
    } catch (err) {
      console.error('Push unsubscribe failed:', err);
      return false;
    }
  }, [subscription]);

  const sendTestNotification = useCallback(async () => {
    if (!isSubscribed) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification('Алыкул — Тест', {
        body: 'Push-уведомления работают! Вы будете получать информацию о рейсах.',
        icon: '/images/icon-192.png',
        badge: '/images/icon-192.png',
        tag: 'test-notification',
      });
    } catch (err) {
      console.error('Test notification failed:', err);
    }
  }, [isSubscribed]);

  return {
    isSupported,
    isSubscribed,
    subscribe,
    unsubscribe,
    sendTestNotification,
  };
}

// ─── Component: PushPermissionBanner ─────────────────────────────────────────

export function PushPermissionBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isSupported, isSubscribed, subscribe } = usePushNotifications();

  // Check if dismissed within last 7 days
  const isDismissed = useCallback(() => {
    if (typeof window === 'undefined') return true;
    const dismissed = localStorage.getItem('alykul-push-dismissed');
    if (!dismissed) return false;
    const dismissedAt = parseInt(dismissed, 10);
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - dismissedAt < sevenDays;
  }, []);

  useEffect(() => {
    // Show after first booking (check localStorage flag)
    const hasBooked = localStorage.getItem('alykul-has-booking');
    if (
      isSupported &&
      !isSubscribed &&
      !isDismissed() &&
      hasBooked === 'true'
    ) {
      setShowBanner(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
    }
  }, [isSupported, isSubscribed, isDismissed]);

  const handleAllow = async () => {
    const sub = await subscribe();
    if (sub) {
      setIsVisible(false);
      setTimeout(() => setShowBanner(false), 300);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowBanner(false);
      localStorage.setItem('alykul-push-dismissed', Date.now().toString());
    }, 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed top-4 left-4 right-4 z-[10004] flex justify-center transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
      role="alert"
    >
      <div className="max-w-sm w-full bg-[#246DC9] text-white rounded-2xl shadow-2xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0 mt-0.5">&#128276;</span>
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1">
              Получайте уведомления о рейсах?
            </p>
            <p className="text-xs text-white/80 leading-snug mb-3">
              Напомним за 2 часа до отправления, пришлём QR-код и спецпредложения
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAllow}
                className="flex-1 bg-white text-[#246DC9] text-sm font-semibold py-2 px-4 rounded-xl hover:bg-white/90 transition-colors"
              >
                Разрешить
              </button>
              <button
                onClick={handleDismiss}
                className="text-white/70 hover:text-white text-sm py-2 px-3 transition-colors"
              >
                Не сейчас
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
