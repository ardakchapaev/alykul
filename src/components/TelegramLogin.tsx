'use client';
import { useEffect, useRef } from 'react';

interface TelegramLoginProps {
  botName: string; // 'alykul_bot'
  onAuth: (user: { id: number; first_name: string; last_name?: string; username?: string; photo_url?: string; auth_date: number; hash: string }) => void;
  buttonSize?: 'large' | 'medium' | 'small';
  cornerRadius?: number;
  lang?: string;
}

export default function TelegramLogin({ botName, onAuth, buttonSize = 'large', cornerRadius = 12, lang = 'ru' }: TelegramLoginProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create callback
    (window as unknown as Record<string, unknown>).__telegram_login_callback = (user: Parameters<typeof onAuth>[0]) => {
      onAuth(user);
    };

    // Load Telegram widget script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', buttonSize);
    script.setAttribute('data-radius', String(cornerRadius));
    script.setAttribute('data-onauth', '__telegram_login_callback(user)');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-lang', lang);
    script.async = true;

    if (ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(script);
    }

    return () => {
      delete (window as unknown as Record<string, unknown>).__telegram_login_callback;
    };
  }, [botName, onAuth, buttonSize, cornerRadius, lang]);

  return <div ref={ref} />;
}
