from datetime import datetime, timezone
from sqlalchemy import String, Integer, Text, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Vessel(Base):
    __tablename__ = "vessels"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    vessel_type: Mapped[str] = mapped_column(String(50))  # steamship, yacht, speedboat
    capacity: Mapped[int] = mapped_column(Integer)
    description_ru: Mapped[str | None] = mapped_column(Text)
    description_en: Mapped[str | None] = mapped_column(Text)
    description_ky: Mapped[str | None] = mapped_column(Text)
    specs: Mapped[dict | None] = mapped_column(JSON)  # {"decks": 2, "banquet": true, "speed_kmh": 60}
    images: Mapped[list | None] = mapped_column(JSON)  # ["/images/vessel1.jpg", ...]
    seat_map_svg: Mapped[str | None] = mapped_column(Text)  # SVG seat layout
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    trips: Mapped[list["Trip"]] = relationship(back_populates="vessel")  # noqa: F821
