from datetime import datetime, timezone
from sqlalchemy import String, Text, DateTime, Integer, Enum as SAEnum, JSON
from sqlalchemy.orm import Mapped, mapped_column
import enum
from app.core.database import Base


class FormType(str, enum.Enum):
    contact = "contact"
    group_booking = "group_booking"
    partner = "partner"
    career = "career"
    review = "review"
    gift_certificate = "gift_certificate"
    newsletter = "newsletter"


class FormSubmission(Base):
    """Универсальная таблица для всех форм"""
    __tablename__ = "form_submissions"

    id: Mapped[int] = mapped_column(primary_key=True)
    form_type: Mapped[FormType] = mapped_column(SAEnum(FormType), index=True)
    data: Mapped[dict] = mapped_column(JSON)  # Все поля формы в JSON
    status: Mapped[str] = mapped_column(String(20), default="new")  # new, processing, done, rejected
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    processed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)  # Заметки менеджера
