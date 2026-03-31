from datetime import datetime, timezone
from sqlalchemy import String, Integer, Text, DateTime, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Route(Base):
    __tablename__ = "routes"

    id: Mapped[int] = mapped_column(primary_key=True)
    name_ru: Mapped[str] = mapped_column(String(200))
    name_en: Mapped[str | None] = mapped_column(String(200))
    name_ky: Mapped[str | None] = mapped_column(String(200))
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    departure_pier: Mapped[str] = mapped_column(String(100))  # Cholpon-Ata, Bosteri, etc.
    arrival_pier: Mapped[str | None] = mapped_column(String(100))
    description_ru: Mapped[str | None] = mapped_column(Text)
    description_en: Mapped[str | None] = mapped_column(Text)
    description_ky: Mapped[str | None] = mapped_column(Text)
    duration_minutes: Mapped[int] = mapped_column(Integer)
    distance_km: Mapped[float | None] = mapped_column(Numeric(6, 2))
    category: Mapped[str] = mapped_column(String(50))  # cruise, charter, entertainment, kids
    image: Mapped[str | None] = mapped_column(String(500))
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    trips: Mapped[list["Trip"]] = relationship(back_populates="route")  # noqa: F821
