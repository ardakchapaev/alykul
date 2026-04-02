import httpx
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.models.conversation import ConversationSession, ConversationMessage, Channel

MODEL = "meta-llama/llama-3.1-8b-instruct:free"

SYSTEM_PROMPT = """Ты — AI-ассистент компании "Алыкул" — платформы водного туризма на озере Иссык-Куль, Кыргызстан.

Твои задачи:
1. Помогать клиентам выбрать водные развлечения (катамараны, яхты, SUP-борды, каяки)
2. Отвечать на вопросы о ценах, расписании, погоде
3. Помогать с бронированием
4. Давать рекомендации по маршрутам и точкам отдыха на Иссык-Куле

Правила:
- Отвечай кратко и дружелюбно
- Используй русский язык по умолчанию, но можешь переключиться на кыргызский если клиент пишет на кыргызском
- Если не знаешь точный ответ — предложи связаться с менеджером по телефону
- Никогда не придумывай цены — используй только те, что есть в контексте
- Будь проактивным: предлагай доп. услуги (трансфер, еда, фотосессия)

ВАЖНО: Ты помнишь все предыдущие диалоги с этим клиентом. Если он уже что-то спрашивал или бронировал раньше — учитывай это в ответе. Обращайся по имени, если знаешь его."""


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
