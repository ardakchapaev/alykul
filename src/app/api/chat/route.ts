import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const MODEL = 'meta-llama/llama-3.1-8b-instruct:free'; // Free model on OpenRouter

const SYSTEM_PROMPT = `Ты — AI-ассистент компании "Алыкул" — платформы водного туризма на озере Иссык-Куль, Кыргызстан.

Ты помогаешь клиентам с:
- Информацией о маршрутах и ценах
- Бронированием рейсов
- Вопросами о флоте и безопасности
- Расписанием рейсов

Ключевая информация:
- Закатный круиз (Чолпон-Ата) — от 1,400 KGS, ежедневно 18:00, 2 часа, теплоход "Алыкул"
- Утренний круиз (Бостери) — от 1,200 KGS, ежедневно 10:00, 1.5 часа
- Скоростной тур — от 2,000 KGS, 12:00/14:00/16:00, 40 мин
- Приватный чартер (яхта "Nomad") — от 7,000 KGS, по запросу, 2-6 часов, до 12 чел
- Детский праздник — от 1,000 KGS/чел, выходные, 2-3 часа

Флот: Теплоход "Алыкул" (200 чел, 2 палубы), Яхта "Nomad" (12 чел, VIP), Скоростные катера (8 чел, 60 км/ч)
Сезон: 1 июня — 15 сентября
Причалы: Чолпон-Ата, Бостери, Каракол, Тамга
Контакты: +996 555 123 456, info@alykul.kg, @alykul (Telegram)
Сайт: alykul.baimuras.pro

Для бронирования направляй на страницу /ru/trips
Для групп 10+ человек — на /ru/group-booking
Для подарочных сертификатов — на /ru/gifts

Отвечай кратко (2-4 предложения), дружелюбно, по-русски (если клиент пишет на русском), по-английски (если на английском), по-кыргызски (если на кыргызском). Используй эмодзи умеренно.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://alykul.baimuras.pro',
        'X-Title': 'Alykul AI Assistant',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; text: string }) => ({
            role: m.role === 'ai' ? 'assistant' : 'user',
            content: m.text,
          })),
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter error:', error);
      // Fallback to decision tree
      return NextResponse.json({ text: null, fallback: true });
    }

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content || null;

    return NextResponse.json({ text: aiText, fallback: !aiText });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ text: null, fallback: true });
  }
}
