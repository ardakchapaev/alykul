'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// --- Types ---
interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  quickReplies?: string[];
  timestamp: number;
}

// --- Decision Tree ---
const INITIAL_QUICK_REPLIES = ['Закатный круиз \u{1F305}', 'Цены в USD \u{1F4B0}', 'Группа/Мероприятие \u{1F389}', 'Помощь с бронью \u{1F4CB}'];

const PRICES_TEXT =
  'Наши цены на сезон 2026:\n\n' +
  '\u2022 Закатный круиз — от 1 400 KGS\n' +
  '\u2022 Утренний круиз — от 1 200 KGS\n' +
  '\u2022 Скоростной тур — от 2 000 KGS\n' +
  '\u2022 Приватный чартер — от 7 000 KGS\n' +
  '\u2022 Детский праздник — от 1 000 KGS/чел';

const SCHEDULE_TEXT =
  'Расписание рейсов:\n\n' +
  '\u2022 Закатный круиз — 18:00, ежедневно (2 ч)\n' +
  '\u2022 Утренний круиз — 10:00, ежедневно (1.5 ч)\n' +
  '\u2022 Скоростной тур — 12:00 / 14:00 / 16:00\n' +
  '\u2022 Приватный чартер — по запросу\n' +
  '\u2022 Детский праздник — выходные, по запросу';

const ABOUT_TEXT =
  'Алыкул — ведущая круизная компания на Иссык-Куле.\n\n' +
  '\u2022 5+ лет на рынке\n' +
  '\u2022 12 000+ довольных гостей\n' +
  '\u2022 Флот из 8 судов\n' +
  '\u2022 15 уникальных маршрутов\n' +
  '\u2022 Профессиональный экипаж с лицензиями\n' +
  '\u2022 Полная страховка пассажиров';

const CONTACT_TEXT =
  'Наш менеджер на связи:\n\n' +
  '\ud83d\udcf1 WhatsApp: +996 555 123 456\n' +
  '\ud83d\udce7 Email: info@alykul.kg\n' +
  '\ud83d\udcac Telegram: @alykul';

const BOOKING_OPTIONS = ['Закатный круиз', 'Скоростной тур', 'Приватный чартер', 'Детский праздник'];

const BOOKING_DETAILS: Record<string, string> = {
  'Закатный круиз':
    'Закатный круиз из Чолпон-Аты\n\n\u2022 Время: 18:00, ежедневно\n\u2022 Длительность: 2 часа\n\u2022 Цена: от 1 400 KGS\n\u2022 Судно: т/х «Алыкул» (до 200 чел)\n\nНезабываемый закат над Иссык-Кулем с видом на горы!',
  'Скоростной тур':
    'Скоростной тур из Чолпон-Аты\n\n\u2022 Время: 12:00, 14:00, 16:00\n\u2022 Длительность: 40 мин\n\u2022 Цена: от 2 000 KGS\n\u2022 Судно: скоростной катер (до 8 чел)\n\nАдреналин и скорость до 60 км/ч!',
  'Приватный чартер':
    'Приватный чартер\n\n\u2022 Время: по запросу\n\u2022 Длительность: 2–6 часов\n\u2022 Цена: от 7 000 KGS\n\u2022 Судно: яхта «Nomad» (до 12 чел)\n\nИндивидуальный маршрут, полная приватность.',
  'Детский праздник':
    'Детский праздник на борту\n\n\u2022 Время: выходные, по запросу\n\u2022 Длительность: 2–3 часа\n\u2022 Цена: от 1 000 KGS/чел\n\u2022 Судно: т/х «Алыкул»\n\nАниматоры, конкурсы, пиратское шоу!',
};

// --- Keyword matching fallback ---
function matchKeyword(input: string): { text: string; quickReplies: string[] } | null {
  const lower = input.toLowerCase();
  const keywords: [RegExp, string, string[]][] = [
    [/цен|price|стоим|сколько/, PRICES_TEXT, ['Забронировать', 'Подробнее о рейсах', 'Связаться с менеджером']],
    [/брон|book|заказ|reserv/, 'Отлично! Какой тип отдыха вас интересует?', BOOKING_OPTIONS],
    [/расписан|schedule|врем|когда/, SCHEDULE_TEXT, ['Забронировать', 'Другой вопрос']],
    [/флот|fleet|кораб|судн|яхт/, 'У нас 8 судов: теплоход «Алыкул» (200 чел), яхта «Nomad» (12 чел) и скоростные катера (8 чел). Все суда с лицензиями и страховкой.', ['Забронировать', 'Узнать цены']],
    [/безопас|safety|страхов/, 'Безопасность — наш приоритет:\n\n\u2022 Лицензированный экипаж\n\u2022 Спасательные жилеты для всех\n\u2022 Страхование пассажиров\n\u2022 Регулярное ТО судов\n\u2022 GPS-мониторинг', ['Забронировать', 'О компании']],
    [/возврат|refund|отмен|cancel/, 'Политика возврата:\n\n\u2022 За 24+ часа — полный возврат\n\u2022 За 12–24 часа — возврат 50%\n\u2022 Менее 12 часов — без возврата\n\u2022 Плохая погода — полный возврат/перенос', ['Забронировать', 'Связаться с менеджером']],
    [/дет|kids|ребён|child/, BOOKING_DETAILS['Детский праздник'], ['Забронировать', 'Узнать цены']],
    [/контакт|связ|телефон|whatsapp|telegram/, CONTACT_TEXT, ['Забронировать', 'Другой вопрос']],
    [/компани|about|о вас|кто вы/, ABOUT_TEXT, ['Забронировать', 'Контакты']],
  ];
  for (const [re, text, qr] of keywords) {
    if (re.test(lower)) return { text, quickReplies: qr };
  }
  return null;
}

// Decision tree fallback — used when AI API is unavailable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAiResponse(userText: string, _history: Message[]): { text: string; quickReplies: string[] } {
  const lower = userText.toLowerCase().trim();

  // Greeting
  if (/привет|здравствуй|hello|hi|салам/.test(lower)) {
    return {
      text: 'Здравствуйте! \ud83d\udc4b Я Айдана, менеджер Алыкул. Планируете водную прогулку на Иссык-Куле? Расскажите когда приедете и сколько вас будет \u2014 подберу идеальный вариант! \u{1F6A2}',
      quickReplies: INITIAL_QUICK_REPLIES,
    };
  }

  // Booking flow
  if (/бронь|забронировать|book|брондоо|помощь с бронью/.test(lower)) {
    return {
      text: 'Отлично! Расскажите: какой маршрут, на какую дату и сколько гостей? Или перейдите на alykul.baimuras.pro/ru/trips для самостоятельного бронирования \u{1F6A2}',
      quickReplies: BOOKING_OPTIONS,
    };
  }

  // Ticket / QR
  if (/билет|ticket|qr/.test(lower)) {
    return {
      text: 'Ваши билеты доступны в личном кабинете: alykul.baimuras.pro/ru/account. Покажите QR-код при посадке на судно \ud83d\udcf1',
      quickReplies: ['Забронировать', 'Связаться с менеджером'],
    };
  }

  // Cancellation / Refund
  if (/отмена|отменить|cancel|возврат|refund/.test(lower)) {
    return {
      text: 'Для отмены или переноса: alykul.baimuras.pro/ru/account/refund. За 24+ часов \u2014 полный возврат, за 12-24ч \u2014 50%. Отмена из-за погоды \u2014 100% + бонус 200 сом \u21a9\ufe0f',
      quickReplies: ['Забронировать', 'Связаться с менеджером'],
    };
  }

  // Weather
  if (/погода|weather|температура/.test(lower)) {
    return {
      text: 'Июль-август на Иссык-Куле: вода 20-23\u00b0C, воздух 25-30\u00b0C. На борту есть крытая палуба и буфет. Идеально для прогулки! \u2600\ufe0f',
      quickReplies: ['Закатный круиз', 'Забронировать', 'Другой вопрос'],
    };
  }

  // Transfer
  if (/трансфер|как добраться|доехать|transfer/.test(lower)) {
    return {
      text: 'Из Бишкека до Чолпон-Аты ~4 часа на авто. Мы можем организовать трансфер \u2014 напишите нам: +996 555 123 456 \ud83d\ude97',
      quickReplies: ['Забронировать', 'Связаться с менеджером'],
    };
  }

  // Promo codes
  if (/промокод|скидка|discount|акция/.test(lower)) {
    return {
      text: 'Актуальные промокоды: WELCOME10 (10% новичкам), SUMMER20 (20% в будни), FAMILY (4 по цене 3). Применить при бронировании на сайте! \ud83c\udf81',
      quickReplies: ['Забронировать', 'Узнать цены', 'Другой вопрос'],
    };
  }

  // Payment
  if (/оплата|оплатить|pay|payment/.test(lower)) {
    return {
      text: 'Принимаем: Mbank, Optima Pay, O!\u0414\u0435\u043d\u044c\u0433\u0438, наличные на причале. Для иностранцев \u2014 банковские карты через сайт \ud83d\udcb3',
      quickReplies: ['Забронировать', 'Связаться с менеджером'],
    };
  }

  // Manager / Human
  if (/менеджер|человек|оператор|manager/.test(lower)) {
    return {
      text: 'Связаться с менеджером:\n\ud83d\udcf1 +996 555 123 456 (WhatsApp/звонок)\n\ud83d\udce7 info@alykul.kg\n\ud83d\udcac @alykul_bot (Telegram)',
      quickReplies: ['Забронировать', 'Другой вопрос'],
    };
  }

  // Booking details for specific trips
  if (BOOKING_DETAILS[userText]) {
    return { text: BOOKING_DETAILS[userText], quickReplies: ['Забронировать', 'Назад к рейсам', 'Связаться с менеджером'] };
  }

  // Sunset cruise quick reply
  if (/закатный круиз/.test(lower)) {
    return { text: BOOKING_DETAILS['Закатный круиз'], quickReplies: ['Забронировать', 'Назад к рейсам', 'Связаться с менеджером'] };
  }

  // Prices in USD
  if (/цен.*usd|usd|узнать цены/.test(lower)) {
    return {
      text: PRICES_TEXT + '\n\nВ USD (курс ~87 KGS):\n\u2022 Закатный круиз \u2014 от $16\n\u2022 Утренний круиз \u2014 от $14\n\u2022 Скоростной тур \u2014 от $23\n\u2022 Приватный чартер \u2014 от $80\n\u2022 Детский праздник \u2014 от $12/чел',
      quickReplies: ['Забронировать', 'Подробнее о рейсах', 'Связаться с менеджером'],
    };
  }

  // Group booking
  if (/групп|мероприят/.test(lower)) {
    return {
      text: 'Групповое бронирование (10+ человек):\n\n\u2022 Скидка 15% от стандартной цены\n\u2022 Персональный менеджер\n\u2022 Индивидуальный маршрут\n\u2022 Кейтеринг на борту\n\nОформите заявку: alykul.baimuras.pro/ru/group-booking\nИли напишите в WhatsApp: +996 555 123 456',
      quickReplies: ['Забронировать', 'Узнать цены', 'Связаться с менеджером'],
    };
  }

  // Gift certificates
  if (/подароч|сертификат|gift/.test(lower)) {
    return {
      text: 'Подарочные сертификаты Алыкул:\n\n\u2022 Закатный круиз \u2014 1,400 KGS ($16)\n\u2022 VIP-чартер на яхте \u2014 7,000 KGS ($80)\n\u2022 Произвольная сумма\n\nКрасивое оформление + доставка.\nОформить: alykul.baimuras.pro/ru/gifts',
      quickReplies: ['Забронировать', 'Другой вопрос'],
    };
  }

  // Schedule
  if (lower === 'расписание') {
    return { text: SCHEDULE_TEXT, quickReplies: ['Забронировать', 'Другой вопрос'] };
  }

  // About
  if (lower === 'о компании') {
    return { text: ABOUT_TEXT, quickReplies: ['Забронировать', 'Контакты'] };
  }

  // Contact shortcuts
  if (['связаться с менеджером', 'контакты'].includes(lower)) {
    return { text: CONTACT_TEXT, quickReplies: ['Забронировать', 'Другой вопрос'] };
  }

  // Browse trips
  if (['подробнее о рейсах', 'назад к рейсам'].includes(lower)) {
    return { text: 'Выберите рейс для подробной информации:', quickReplies: BOOKING_OPTIONS };
  }

  // Other question
  if (lower === 'другой вопрос') {
    return { text: 'Конечно! Чем могу помочь?', quickReplies: INITIAL_QUICK_REPLIES };
  }

  // Keyword fallback
  const kw = matchKeyword(userText);
  if (kw) return kw;

  // No match
  return {
    text: 'Я Айдана, менеджер Алыкул. Не совсем поняла ваш вопрос \u2014 вот чем могу помочь:',
    quickReplies: INITIAL_QUICK_REPLIES,
  };
}

// --- Unique ID ---
let _msgId = 0;
function uid(): string {
  return `msg_${Date.now()}_${++_msgId}`;
}

// --- Storage helpers ---
const STORAGE_KEY = 'alykul_chat_messages';
const OPENED_KEY = 'alykul_chat_auto_opened';

function loadMessages(): Message[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: Message[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch {
    /* quota exceeded — ignore */
  }
}

// --- Component ---
export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const [pulse, setPulse] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize messages from session storage or greeting
  useEffect(() => {
    const saved = loadMessages();
    if (saved.length > 0) {
      setMessages(saved);
    } else {
      const greeting: Message = {
        id: uid(),
        role: 'ai',
        text: 'Здравствуйте! \ud83d\udc4b Я Айдана, менеджер Алыкул.\n\nПланируете водную прогулку на Иссык-Куле? Расскажите когда приедете и сколько вас будет \u2014 подберу идеальный вариант! \u{1F6A2}',
        quickReplies: INITIAL_QUICK_REPLIES,
        timestamp: Date.now(),
      };
      setMessages([greeting]);
      saveMessages([greeting]);
    }
    // Auto-open after 30s on first visit
    const wasOpened = localStorage.getItem(OPENED_KEY);
    if (!wasOpened) {
      const timer = setTimeout(() => {
        setOpen(true);
        setUnread(0);
        localStorage.setItem(OPENED_KEY, '1');
      }, 30000);
      return () => clearTimeout(timer);
    } else {
      setPulse(false);
    }
  }, []);

  // Persist messages
  useEffect(() => {
    if (messages.length > 0) saveMessages(messages);
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setUnread(0);
      setPulse(false);
    }
  }, [open]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const userMsg: Message = { id: uid(), role: 'user', text: text.trim(), timestamp: Date.now() };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setTyping(true);

      // Try real AI first, fallback to decision tree
      const tryAiResponse = async (): Promise<{ text: string; quickReplies: string[] }> => {
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [...messages, { role: 'user', text: text.trim() }],
              sessionId: sessionStorage.getItem('alykul-chat-session') || `web_${Date.now()}`,
            }),
          });
          const data = await res.json();
          if (data.text && !data.fallback) {
            if (!sessionStorage.getItem('alykul-chat-session')) {
              sessionStorage.setItem('alykul-chat-session', `web_${Date.now()}`);
            }
            return { text: data.text, quickReplies: ['Забронировать', 'Узнать цены', 'Другой вопрос'] };
          }
        } catch {
          /* fallback to decision tree */
        }
        return getAiResponse(text.trim(), messages);
      };

      tryAiResponse().then((response) => {
        const aiMsg: Message = {
          id: uid(),
          role: 'ai',
          text: response.text,
          quickReplies: response.quickReplies,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setTyping(false);
        if (!open) setUnread((u) => u + 1);
      });
    },
    [messages, open],
  );

  const handleQuickReply = (text: string) => sendMessage(text);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-6 right-6 z-[10003] w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl bg-gradient-to-br from-[#0a1628] via-[#1a3a5c] to-[#246dc9] text-white ${pulse ? 'animate-pulse' : ''}`}
        aria-label="Open chat"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
        )}
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Chat Card */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[10003] w-[min(400px,calc(100vw-2rem))] h-[min(550px,calc(100vh-8rem))] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0a1628] via-[#1a3a5c] to-[#246dc9] px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">AI</div>
              <div>
                <div className="text-white font-semibold text-sm leading-tight">Айдана | Алыкул</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/60 text-[11px]">Онлайн</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors p-1" aria-label="Close chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/80">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0a1628] to-[#246dc9] flex items-center justify-center text-white text-[10px] font-bold mr-2 mt-1 shrink-0">
                      AI
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-[#246dc9] to-[#1a3a5c] text-white rounded-2xl rounded-br-md'
                        : 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
                {/* Quick Replies */}
                {msg.role === 'ai' && msg.quickReplies && msg.quickReplies.length > 0 && msg.id === messages[messages.length - 1]?.id && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-9">
                    {msg.quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => handleQuickReply(qr)}
                        className="px-3 py-1.5 text-xs font-medium rounded-full border border-[#246dc9]/30 text-[#246dc9] bg-white hover:bg-[#246dc9] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Typing indicator */}
            {typing && (
              <div className="flex items-center gap-2 ml-9">
                <div className="bg-white px-4 py-2.5 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-4 py-3 bg-white shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 text-sm px-4 py-2.5 rounded-full border border-gray-200 focus:border-[#246dc9] focus:ring-2 focus:ring-[#246dc9]/20 outline-none transition-all bg-gray-50"
              />
              {/* Voice icon (future) */}
              <button type="button" disabled className="text-gray-300 cursor-not-allowed p-1" title="Голосовой ввод (скоро)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
              </button>
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0a1628] to-[#246dc9] text-white flex items-center justify-center shrink-0 disabled:opacity-40 hover:shadow-lg transition-all duration-200"
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </button>
            </form>
            <div className="text-center mt-2 text-[10px] text-gray-400">Powered by AI</div>
          </div>
        </div>
      )}

      {/* Inline animation keyframes */}
      <style jsx global>{`
        @keyframes animate-in {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-in { animation: animate-in 0.25s ease-out; }
      `}</style>
    </>
  );
}
