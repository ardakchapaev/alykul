from datetime import datetime, timezone
from sqlalchemy import String, Text, DateTime, Integer, ForeignKey, Enum as SAEnum, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
from app.core.database import Base


class Channel(str, enum.Enum):
    website = "website"
    telegram = "telegram"
    whatsapp = "whatsapp"
    mobile_app = "mobile_app"


class ConversationSession(Base):
    """One conversation thread per customer per channel"""
    __tablename__ = "conversation_sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    # Customer identification
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    channel: Mapped[Channel] = mapped_column(SAEnum(Channel))
    channel_user_id: Mapped[str] = mapped_column(String(255), index=True)

    # Customer info extracted from conversations
    customer_name: Mapped[str | None] = mapped_column(String(100))
    customer_phone: Mapped[str | None] = mapped_column(String(20))
    customer_language: Mapped[str] = mapped_column(String(5), default="ru")

    # Session metadata
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    last_message_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    message_count: Mapped[int] = mapped_column(Integer, default=0)
    context: Mapped[dict | None] = mapped_column(JSON, nullable=True)

    messages: Mapped[list["ConversationMessage"]] = relationship(back_populates="session", order_by="ConversationMessage.created_at")


class ConversationMessage(Base):
    """Individual message in a conversation"""
    __tablename__ = "conversation_messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    session_id: Mapped[int] = mapped_column(ForeignKey("conversation_sessions.id"))
    role: Mapped[str] = mapped_column(String(20))  # "user" or "assistant"
    content: Mapped[str] = mapped_column(Text)
    channel: Mapped[Channel] = mapped_column(SAEnum(Channel))

    # Metadata
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    tokens_used: Mapped[int | None] = mapped_column(Integer, nullable=True)
    model: Mapped[str | None] = mapped_column(String(100), nullable=True)

    session: Mapped["ConversationSession"] = relationship(back_populates="messages")
