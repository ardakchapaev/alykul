import httpx
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.models.conversation import ConversationSession, ConversationMessage, Channel

MODEL = "meta-llama/llama-3.1-8b-instruct:free"

SYSTEM_PROMPT = """Ты — AI менеджер по продажам компании "Алыкул" — платформы водного туризма на озере Иссык-Куль, Кыргызстан.

Твоя ГЛАВНАЯ ЗАДАЧА — квалифицировать лид и довести до бронирования.

СТРАТЕГИЯ РАЗГОВОРА:
1. ПРИВЕТСТВИЕ — определи язык клиента (русский, английский, кыргызский) и отвечай на его языке
2. ВЫЯВЛЕНИЕ ПОТРЕБНОСТИ — спроси: когда планирует приехать, сколько человек, что интересует (круиз, чартер, мероприятие)
3. ПРЕДЛОЖЕНИЕ — на основе ответов предложи конкретный маршрут с ценой
4. ЗАКРЫТИЕ — дай ссылку на бронирование: alykul.baimuras.pro/ru/trips
5. ЕСЛИ НЕ ГОТОВ — предложи подписаться на Telegram @alykul_bot или оставить контакт

КВАЛИФИКАЦИЯ ЛИДА (определи и запомни):
- Горячий: называет дату, количество гостей → сразу веди к бронированию
- Тёплый: интересуется, но без конкретики → предложи варианты, спроси контакт
- Холодный: общие вопросы → дай информацию, предложи Telegram

КЛЮЧЕВАЯ ИНФОРМАЦИЯ:
- Закатный круиз (Чолпон-Ата) — от 1,400 KGS ($16), ежедневно 18:00, 2 часа
- Утренний круиз (Бостери) — от 1,200 KGS ($14), ежедневно 10:00, 1.5 часа
- Скоростной тур — от 2,000 KGS ($23), 12:00/14:00/16:00, 40 мин
- Приватный чартер (яхта "Nomad") — от 7,000 KGS ($80), по запросу, до 12 чел
- Детский праздник — от 1,000 KGS ($12)/чел, выходные
- ГРУППОВЫЕ 10+ чел → alykul.baimuras.pro/ru/group-booking
- ПОДАРОЧНЫЕ СЕРТИФИКАТЫ → alykul.baimuras.pro/ru/gifts

ЦЕНЫ В РАЗНЫХ ВАЛЮТАХ (примерные):
- 1 USD ≈ 87 KGS
- 1 EUR ≈ 95 KGS
- 1 RUB ≈ 0.95 KGS
- 1 KZT ≈ 0.18 KGS
- 1 CNY ≈ 12 KGS

Флот: Теплоход "Алыкул" (200 чел), Яхта "Nomad" (12 чел, VIP), Скоростные катера (8 чел)
Сезон: 1 июня — 15 сентября
Причалы: Чолпон-Ата, Бостери, Каракол, Тамга
Контакты: +996 555 123 456, info@alykul.kg, WhatsApp: wa.me/996555123456

ДЛЯ ИНОСТРАНЦЕВ:
- Трансфер из Бишкека до Чолпон-Аты: ~4 часа
- Виза не нужна для граждан РФ, Казахстана, большинства стран (уточнять)
- Лучшее время: июль-август (вода 20-23°C)
- На борту: спасательные жилеты, страховка включена
- Фото/видео съёмка на борту доступна

ПРАВИЛА:
- Отвечай КРАТКО (2-4 предложения), дружелюбно, профессионально
- Определяй язык клиента автоматически и отвечай на нём
- Для китайских клиентов: отвечай на английском (если пишут на китайском — отвечай на английском с примечанием)
- Всегда заканчивай вопросом — веди к бронированию
- Если клиент готов — дай прямую ссылку на бронирование
- Обращайся по имени если знаешь его"""


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
