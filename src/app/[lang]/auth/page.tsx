'use client';

import { Suspense, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

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
    <div className="min-h-screen bg-sand flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href={`/${lang}`} className="text-muted text-sm hover:text-ocean">&larr; {labels.back}</Link>
          <h1 className="font-heading font-bold text-3xl uppercase mt-4">{labels.title}</h1>
          <p className="text-muted mt-2">{labels.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {step === 'phone' ? (
            <>
              <label className="block text-sm font-medium text-muted mb-2">{labels.phone}</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="+996 555 123 456"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg focus:border-ocean focus:outline-none mb-4" />
              <button onClick={handleSendOtp} disabled={loading || phone.length < 10}
                className="w-full py-3.5 bg-ocean text-white rounded-xl font-bold text-lg hover:bg-ocean-dark transition-colors disabled:opacity-50">
                {loading ? '...' : labels.send}
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted mb-4">{labels.sent} <strong>{phone}</strong></p>

              {devCode && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm">
                  {labels.dev}: <strong className="text-lg">{devCode}</strong>
                </div>
              )}

              <label className="block text-sm font-medium text-muted mb-2">{labels.code}</label>
              <input type="text" value={code} onChange={e => setCode(e.target.value)}
                placeholder="1234" maxLength={4} autoFocus
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-2xl text-center tracking-[0.5em] font-bold focus:border-ocean focus:outline-none mb-4" />
              <button onClick={handleVerify} disabled={loading || code.length < 4}
                className="w-full py-3.5 bg-ocean text-white rounded-xl font-bold text-lg hover:bg-ocean-dark transition-colors disabled:opacity-50">
                {loading ? '...' : labels.verify}
              </button>

              <button onClick={() => { setStep('phone'); setCode(''); setDevCode(''); }}
                className="w-full mt-3 py-2 text-muted text-sm hover:text-ocean">
                &larr; {labels.phone}
              </button>
            </>
          )}

          {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
