'use client';
import { useEffect, useRef, useState } from 'react';

interface TelegramLoginProps {
  botName: string;
  onAuth: (user: TelegramUser) => void;
  buttonSize?: 'large' | 'medium' | 'small';
  cornerRadius?: number;
  lang?: string;
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

declare global {
  interface Window {
    __tg_auth_callback?: (user: TelegramUser) => void;
  }
}

export default function TelegramLogin({ botName, onAuth, buttonSize = 'large', cornerRadius = 12, lang = 'ru' }: TelegramLoginProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Set global callback
    window.__tg_auth_callback = (user: TelegramUser) => {
      onAuth(user);
    };

    // Remove previous script if any
    if (ref.current) {
      ref.current.innerHTML = '';
    }

    // Create and load widget script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', buttonSize);
    script.setAttribute('data-radius', String(cornerRadius));
    script.setAttribute('data-onauth', '__tg_auth_callback(user)');
    script.setAttribute('data-request-access', 'write');
    if (lang !== 'ru') {
      script.setAttribute('data-lang', lang);
    }
    script.async = true;

    script.onerror = () => setError(true);

    // Wait a tick to ensure DOM is ready
    setTimeout(() => {
      if (ref.current) {
        ref.current.appendChild(script);
      }
    }, 100);

    return () => {
      delete window.__tg_auth_callback;
    };
  }, [botName, onAuth, buttonSize, cornerRadius, lang]);

  if (error) {
    return (
      <a
        href={`https://t.me/${botName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0088cc] text-white rounded-xl font-semibold hover:bg-[#0077b5] transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
        {lang === 'ru' ? 'Войти через Telegram' : 'Sign in with Telegram'}
      </a>
    );
  }

  return <div ref={ref} />;
}
