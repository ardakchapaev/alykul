'use client';

import { Suspense, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import TelegramLogin from '@/components/TelegramLogin';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1';

const t = {
  ru: { title: 'Вход', subtitle: 'Введите номер телефона для получения кода', phone: 'Номер телефона', send: 'Получить код', code: 'Код из SMS', verify: 'Войти', back: 'Главная', sent: 'Код отправлен на', wrong: 'Неверный код', dev: 'Код для тестирования' },
  en: { title: 'Sign In', subtitle: 'Enter your phone number to receive a code', phone: 'Phone number', send: 'Get Code', code: 'SMS Code', verify: 'Sign In', back: 'Home', sent: 'Code sent to', wrong: 'Invalid code', dev: 'Test code' },
  ky: { title: 'Кирүү', subtitle: 'Код алуу үчүн телефон номериңизди жазыңыз', phone: 'Телефон номери', send: 'Код алуу', code: 'SMS код', verify: 'Кирүү', back: 'Башкы бет', sent: 'Код жөнөтүлдү', wrong: 'Код туура эмес', dev: 'Тест коду' },
};

export default function AuthPage() {
  return <Suspense><AuthInner /></Suspense>;
}

function AuthInner() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;
  const { login } = useAuth();

  const redirect = searchParams.get('redirect') || `/${lang}`;

  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('+996');
  const [code, setCode] = useState('');
  const [devCode, setDevCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.requestOtp(phone);
      setDevCode(res.dev_code);
      setStep('code');
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.verifyOtp(phone, code);
      await login(res.access_token);
      router.push(redirect);
    } catch {
      setError(labels.wrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundImage: 'url(/images/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Gradient overlay on top of background image */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-ocean-dark/80 to-ocean/70" />
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="w-full max-w-md relative z-10 auth-form-animate">
        <div className="mb-8 text-center">
          <Link href={`/${lang}`} className="text-white/50 text-sm hover:text-white transition-colors">&larr; {labels.back}</Link>

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mt-6 mb-3">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 25C8 18 14 28 20 20C26 12 32 26 38 19" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
              <path d="M2 29C8 22 14 32 20 24C26 16 32 30 38 23" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
            </svg>
            <span className="text-white font-heading text-xl font-bold tracking-wide">ALYKUL</span>
          </div>

          <h1 className="font-heading font-bold text-4xl italic uppercase mt-4 text-white tracking-wider">{labels.title}</h1>
          <p className="text-white/70 mt-2">{labels.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-white/10 backdrop-blur-sm">
          {step === 'phone' ? (
            <>
              <label className="block text-sm font-medium text-muted mb-2">{labels.phone}</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="+996 555 123 456"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg focus:border-ocean focus:outline-none mb-1" />
              <p className="text-xs text-muted mt-1 mb-4">{lang === 'ru' ? 'Например: +996 555 123 456' : lang === 'ky' ? 'Мисалы: +996 555 123 456' : 'Example: +996 555 123 456'}</p>
              <button onClick={handleSendOtp} disabled={loading || phone.length < 10}
                className="w-full py-3.5 bg-gradient-to-r from-[#00897B] to-[#26A69A] text-white rounded-xl font-bold text-lg hover:from-[#00796B] hover:to-[#00897B] transition-all disabled:opacity-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                {loading ? '...' : labels.send}
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted mb-4">{labels.sent} <strong>{phone}</strong></p>

              {devCode && process.env.NODE_ENV === 'development' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm">
                  {labels.dev}: <strong className="text-lg">{devCode}</strong>
                </div>
              )}

              <label className="block text-sm font-medium text-muted mb-2">{labels.code}</label>
              <div className="flex gap-3 justify-center mb-4">
                {[0,1,2,3].map(i => (
                  <input key={i} type="text" maxLength={1}
                    value={code[i] || ''}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      const newCode = code.split('');
                      newCode[i] = val;
                      setCode(newCode.join(''));
                      if (val && i < 3) {
                        const next = e.target.parentElement?.children[i+1] as HTMLInputElement;
                        next?.focus();
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Backspace' && !code[i] && i > 0) {
                        const prev = (e.target as HTMLElement).parentElement?.children[i-1] as HTMLInputElement;
                        prev?.focus();
                      }
                    }}
                    className="w-16 h-[4.5rem] border-2 border-gray-200 rounded-xl text-2xl text-center font-bold focus:border-[#00897B] focus:outline-none focus:ring-2 focus:ring-[#00897B]/30 transition-all"
                    autoFocus={i === 0}
                  />
                ))}
              </div>
              <button onClick={handleVerify} disabled={loading || code.length < 4}
                className="w-full py-3.5 bg-gradient-to-r from-[#00897B] to-[#26A69A] text-white rounded-xl font-bold text-lg hover:from-[#00796B] hover:to-[#00897B] transition-all disabled:opacity-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                {loading ? '...' : labels.verify}
              </button>

              <button onClick={() => { setStep('phone'); setCode(''); setDevCode(''); }}
                className="w-full mt-3 py-2 text-muted text-sm hover:text-ocean">
                &larr; {labels.phone}
              </button>
            </>
          )}

          {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-muted text-sm">{lang === 'ru' ? 'или' : lang === 'ky' ? 'же' : 'or'}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Telegram Login */}
          <div className="text-center">
            <TelegramLogin
              botName="alykul_bot"
              lang={lang}
              onAuth={async (tgUser) => {
                try {
                  const res = await fetch(`${API_URL}/auth/telegram`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tgUser),
                  });
                  if (res.ok) {
                    const data = await res.json();
                    await login(data.access_token);
                    router.push(redirect);
                  }
                } catch {
                  setError(lang === 'ru' ? 'Ошибка входа через Telegram' : 'Telegram login error');
                }
              }}
            />
            <p className="text-xs text-muted mt-2">
              {lang === 'ru' ? 'Войдите через Telegram — быстро и бесплатно' : lang === 'ky' ? 'Telegram аркылуу кириңиз' : 'Sign in with Telegram — fast and free'}
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex items-center justify-center gap-4 text-white/40 text-xs">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            {lang === 'ru' ? 'Безопасный вход' : lang === 'ky' ? 'Коопсуз кирүү' : 'Secure login'}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            {lang === 'ru' ? 'Быстрая регистрация' : lang === 'ky' ? 'Тез каттоо' : 'Quick registration'}
          </span>
        </div>
      </div>
    </div>
  );
}
