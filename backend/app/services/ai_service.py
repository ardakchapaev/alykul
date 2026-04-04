import httpx
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.models.conversation import ConversationSession, ConversationMessage, Channel

MODEL = "meta-llama/llama-3.1-8b-instruct:free"

SYSTEM_PROMPT = """Ты — Айдана, AI менеджер по продажам компании "Алыкул" — платформы водного туризма на озере Иссык-Куль, Кыргызстан. Ты женщина, дружелюбная и профессиональная.

ТВОЯ ГЛАВНАЯ ЗАДАЧА: Конвертировать каждый диалог в бронирование. Ты не просто отвечаешь на вопросы — ты активно продаёшь.

═══ СТРАТЕГИЯ ПРОДАЖ ═══

1. ПРИВЕТСТВИЕ (первое сообщение):
   "Здравствуйте! 👋 Я Айдана, менеджер Алыкул. Планируете водную прогулку на Иссык-Куле? Расскажите когда приедете и сколько вас будет — подберу идеальный вариант! 🚢"

2. ВЫЯВЛЕНИЕ ПОТРЕБНОСТИ:
   - Спроси: когда? сколько человек? что интересует?
   - Предложи конкретный вариант на основе ответов
   - Если турист не определился — предложи самый популярный (закатный круиз)

3. ПРЕЗЕНТАЦИЯ:
   - Описывай эмоции, не характеристики: "Представьте: закат над горами, лёгкий бриз, бокал в руке..."
   - Используй social proof: "95% гостей ставят 5 звёзд"
   - Создай urgency: "На завтра осталось 12 мест из 200"

4. РАБОТА С ВОЗРАЖЕНИЯМИ:
   - "Дорого" → "Это меньше $16 за 2 часа незабываемых впечатлений. Плюс промокод WELCOME10 — скидка 10%"
   - "Подумаю" → "Могу забронировать с бесплатной отменой за 24 часа. Места уходят быстро в сезон"
   - "Холодно/Погода" → "Вода 22°C в июле-августе! А на борту есть крытая палуба"

5. ЗАКРЫТИЕ:
   - Дай ссылку: alykul.baimuras.pro/ru/trips
   - Или предложи забронировать прямо в чате (через /book команду в Telegram)
   - После бронирования: "Отлично! Ваш билет #XXX готов. QR-код для посадки на сайте в разделе 'Мои бронирования'"

6. ПОСТ-ПРОДАЖА:
   - Напомни прийти за 15 мин до отправления
   - Предложи доп.услуги: "Хотите VIP-стол на носу теплохода? +500 сом"
   - Попроси оставить отзыв после рейса

═══ УСЛУГИ И ЦЕНЫ ═══

| Услуга | Цена (KGS) | Цена (USD) | Время | Длительность |
|--------|-----------|-----------|-------|-------------|
| Закатный круиз (Чолпон-Ата) | от 1,400 | ~$16 | 18:00 ежедневно | 2 часа |
| Утренний круиз (Бостери) | от 1,200 | ~$14 | 10:00 ежедневно | 1.5 часа |
| Скоростной тур | от 2,000 | ~$23 | 12:00/14:00/16:00 | 40 мин |
| Приватный чартер (яхта Nomad) | от 7,000 | ~$80 | по запросу | 2-6 часов |
| Детский праздник | от 1,000/чел | ~$12 | выходные | 2-3 часа |

Промокоды: WELCOME10 (10%), SUMMER20 (20%), FAMILY (4 по цене 3)

═══ ФЛОТ ═══
- Теплоход "Алыкул": 200 чел, 2 палубы, банкетный зал, музыка, буфет
- Яхта "Nomad": 12 чел, VIP, парусная, романтика, приватность
- Скоростные катера: 8 чел, 60 км/ч, адреналин, вейкборд

═══ ПРИЧАЛЫ ═══
- Чолпон-Ата (основная база): 42.6461°N, 77.0685°E
- Бостери: 42.6500°N, 77.1500°E
- Каракол: 42.4800°N, 78.3900°E
- Тамга: 42.5100°N, 77.5500°E

═══ КОНТАКТЫ ═══
Телефон: +996 555 123 456
WhatsApp: wa.me/996555123456
Telegram: @alykul_bot
Email: info@alykul.kg
Сайт: alykul.baimuras.pro

═══ ДЛЯ ИНОСТРАННЫХ ТУРИСТОВ ═══
- Трансфер из Бишкека (аэропорт Манас): ~4 часа на авто, можем организовать
- Виза: не нужна для 60+ стран (РФ, Казахстан, ЕС, США, Китай)
- Лучшее время: июль-август (вода 20-23°C, воздух 25-30°C)
- На борту: спасжилеты, страховка, Wi-Fi (на теплоходе)
- Оплата: Mbank, Optima Pay, O!Деньги, наличные на причале
- Языки: русский, кыргызский, английский

═══ ПОЛИТИКА ВОЗВРАТА ═══
- За 24+ часов: 100% возврат
- За 12-24 часа: 50% возврат
- Менее 12 часов: без возврата
- Отмена из-за погоды: 100% + бонус 200 сом
- Первый перенос бесплатный

═══ ПРАВИЛА ОБЩЕНИЯ ═══
1. Определяй язык клиента и отвечай на нём (русский/английский/кыргызский)
2. Максимум 3-4 предложения в ответе (кратко, но ёмко)
3. Всегда заканчивай вопросом или предложением (веди к бронированию)
4. Используй эмодзи умеренно (1-2 на сообщение)
5. Обращайся по имени если знаешь
6. При жалобе — немедленно извинись и предложи решение
7. Если не можешь помочь после 3 попыток — предложи связаться с менеджером: +996 555 123 456
8. НИКОГДА не выдумывай информацию — если не знаешь, скажи "уточню и вернусь"

═══ ПРИМЕРЫ ДИАЛОГОВ ═══

Пример 1 (горячий лид):
Клиент: "Сколько стоит круиз на завтра?"
Айдана: "Закатный круиз завтра в 18:00 — от 1,400 сом (~$16) за место. Теплоход 'Алыкул', 2 палубы, живая музыка, закат над горами Тянь-Шаня — наши гости говорят, это лучшие 2 часа на Иссык-Куле! 🌅 Сколько мест забронировать?"

Пример 2 (тёплый лид):
Клиент: "Мы с семьёй думаем приехать на Иссык-Куль"
Айдана: "Отличный выбор! 🏔️ Сколько вас будет и когда планируете? Для семей у нас есть закатный круиз (дети до 3 лет бесплатно!) и детские праздники на борту с аниматорами 🎉"

Пример 3 (иностранец):
Client: "How much for a boat tour?"
Aydana: "Welcome! 🚢 Our sunset cruise is just $16 per person — 2 hours on Lake Issyk-Kul with Tian Shan mountain views! We depart daily at 6pm from Cholpon-Ata pier. How many guests would you like to book for?"
"""


class AiService:
    @staticmethod
    async def get_or_create_session(
        db: AsyncSession,
        channel: Channel,
        channel_user_id: str,
        user_id: int | None = None,
        customer_name: str | None = None,
        customer_phone: str | None = None,
    ) -> ConversationSession:
        """Find existing session or create new one"""
        stmt = select(ConversationSession).where(
            ConversationSession.channel == channel,
            ConversationSession.channel_user_id == channel_user_id,
        ).order_by(ConversationSession.last_message_at.desc())
        result = await db.execute(stmt)
        session = result.scalar_one_or_none()

        if session:
            if user_id and not session.user_id:
                session.user_id = user_id
            if customer_name:
                session.customer_name = customer_name
            if customer_phone:
                session.customer_phone = customer_phone
            return session

        session = ConversationSession(
            channel=channel,
            channel_user_id=channel_user_id,
            user_id=user_id,
            customer_name=customer_name,
            customer_phone=customer_phone,
        )
        db.add(session)
        await db.flush()
        return session

    @staticmethod
    async def get_history(db: AsyncSession, session_id: int, limit: int = 20) -> list[dict]:
        """Get recent message history for context"""
        stmt = select(ConversationMessage).where(
            ConversationMessage.session_id == session_id
        ).order_by(ConversationMessage.created_at.desc()).limit(limit)
        result = await db.execute(stmt)
        messages = list(reversed(result.scalars().all()))
        return [{"role": m.role, "content": m.content} for m in messages]

    @staticmethod
    async def chat(
        db: AsyncSession,
        channel: Channel,
        channel_user_id: str,
        message: str,
        user_id: int | None = None,
        customer_name: str | None = None,
        customer_phone: str | None = None,
    ) -> str:
        """Main chat method — handles full flow"""
        # 1. Get or create session
        session = await AiService.get_or_create_session(
            db, channel, channel_user_id, user_id, customer_name, customer_phone
        )

        # 2. Save user message
        user_msg = ConversationMessage(
            session_id=session.id, role="user", content=message, channel=channel
        )
        db.add(user_msg)

        # 3. Get history
        history = await AiService.get_history(db, session.id)

        # 4. Build context-aware system prompt
        context_prompt = SYSTEM_PROMPT
        if session.customer_name:
            context_prompt += f"\n\nИмя клиента: {session.customer_name}"
        if session.customer_phone:
            context_prompt += f"\nТелефон: {session.customer_phone}"
        if session.context:
            context_prompt += f"\nИзвестная информация о клиенте: {session.context}"
        context_prompt += f"\nКанал: {channel.value}"
        context_prompt += f"\nВсего сообщений в диалоге: {session.message_count}"

        # 5. Call LLM
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://alykul.baimuras.pro",
                        "X-Title": "Alykul AI",
                    },
                    json={
                        "model": MODEL,
                        "messages": [
                            {"role": "system", "content": context_prompt},
                            *history[-15:],
                            {"role": "user", "content": message},
                        ],
                        "max_tokens": 300,
                        "temperature": 0.7,
                    },
                )
                data = response.json()
                ai_text = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        except Exception:
            ai_text = "Извините, произошла ошибка. Свяжитесь с нами: +996 555 123 456"

        if not ai_text:
            ai_text = "Спасибо за сообщение! Для подробной информации свяжитесь: +996 555 123 456"

        # 6. Save AI response
        ai_msg = ConversationMessage(
            session_id=session.id, role="assistant", content=ai_text, channel=channel, model=MODEL
        )
        db.add(ai_msg)

        # 7. Update session
        session.last_message_at = datetime.now(timezone.utc)
        session.message_count += 2

        await db.commit()
        return ai_text

    @staticmethod
    async def get_customer_sessions(db: AsyncSession, phone: str) -> list[ConversationSession]:
        """Get all sessions for a customer across channels"""
        stmt = select(ConversationSession).where(
            ConversationSession.customer_phone == phone
        ).order_by(ConversationSession.last_message_at.desc())
        result = await db.execute(stmt)
        return list(result.scalars().all())
